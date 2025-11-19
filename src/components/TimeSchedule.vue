<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'
import { CircleX } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useDutiesStore } from '~/features/duty/duty-store'

const { t } = useI18n()
const dutiesStore = useDutiesStore()
const { duties, isLoading } = storeToRefs(dutiesStore)

const isPending = ref(false)
const assignedHour = ref<number | null>()

const scheduledDuties = ref<{ time: number, duties: Duty[] }[]>(
  Array.from({ length: 18 }, (_, i) => ({ time: 7 + i, duties: [] })),
)

watch(
  duties,
  (newDuties) => {
    if (newDuties && newDuties.length) {
      const updatedSchedule: { time: number, duties: Duty[] }[] = []

      for (const slot of scheduledDuties.value) {
        const updatedDuty = newDuties.filter(d => d.assigned_hours?.includes(slot.time))

        updatedSchedule.push({
          time: slot.time,
          duties: updatedDuty || null,
        })
      }

      scheduledDuties.value = updatedSchedule
    }
    else if (newDuties && newDuties.length === 0) {
      for (const slot of scheduledDuties.value) {
        slot.duties = []
      }
    }
  },
)

function handleDragOver(event: DragEvent): void {
  if (isPending.value)
    return
  event.preventDefault()
  if (event.dataTransfer) {
    // Kullanıcıya izin verilen eylemi göster
    event.dataTransfer.dropEffect = 'copy'
  }
}

async function handleDrop(event: DragEvent, index: number): Promise<void> {
  if (isPending.value)
    return
  isPending.value = true
  event.preventDefault()

  if (event.dataTransfer) {
    try {
      const data = event.dataTransfer.getData('application/json')
      const droppedDuty: Duty = JSON.parse(data)

      if (scheduledDuties.value[index].duties.find(d => d.id === droppedDuty.id)) {
        toast.error(`Duty "${droppedDuty.name}" is already scheduled at ${scheduledDuties.value[index].time}:00`)
      }
      else {
        scheduledDuties.value[index].duties.push(droppedDuty)
        assignedHour.value = scheduledDuties.value[index].time
        await dutiesStore.assignHourDuty(droppedDuty, scheduledDuties.value[index].time)
      }
    }
    catch (e) {
      console.error('Dropped data could not be parsed as Duty:', e)
    }
  }
  isPending.value = false
  assignedHour.value = null
}

async function removeDuty(index: number, duty: Duty): Promise<void> {
  if (isPending.value)
    return
  isPending.value = true
  assignedHour.value = scheduledDuties.value[index].time

  scheduledDuties.value[index].duties = scheduledDuties.value[index].duties.filter(d => d.id !== duty.id)
  await dutiesStore.reAssignHourDuty(duty, scheduledDuties.value[index].time)

  isPending.value = false
  assignedHour.value = null
}
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        {{ t("time_schedule") }}
      </CardTitle>
    </CardHeader>
    <template v-if="!isLoading">
      <CardContent class="grid grid-cols-3 gap-4">
        <div
          v-for="(dutySlot, index) in scheduledDuties"
          :key="dutySlot.time"
          class="flex-center flex-col h-28 rounded transition-all duration-200 bg-secondary relative"
          :style="dutySlot.duties.length ? { backgroundColor: dutySlot.duties[0].color } : {}"
          @dragover="handleDragOver" @drop="handleDrop($event, index)"
        >
          <Spinner v-if="isPending && assignedHour && assignedHour - scheduledDuties[0].time === index" class="absolute top-2 right-2 size-6" />
          <p class="font-semibold text-lg">
            {{ dutySlot.time === 24 ? '00' : dutySlot.time < 10 ? `0${dutySlot.time}` : dutySlot.time }}:00
          </p>
          <div v-for="duty in dutySlot.duties" :key="duty.id" class="bg-background/50 rounded py-0.5 px-1 relative mt-2 shadow-md">
            <p class="font-medium text-sm text-blue-700 dark:text-blue-300">
              {{ duty.name }}
            </p>
            <CircleX
              class="text-destructive fill-destructive-foreground absolute -top-2 -right-2 size-4 cursor-pointer hover:text-red-700"
              title="remove event"
              @click.stop="removeDuty(index, duty)"
            />
          </div>
        </div>
      </CardContent>
    </template>
    <Spinner v-else class="m-auto size-20" />
  </Card>
</template>
