<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'

import { toast } from 'vue-sonner'

const { t } = useI18n()
const dutiesStore = useDutiesStore()
const { scheduledDuties } = storeToRefs(dutiesStore)

const isPending = ref(false)
const assignedHour = ref<number | null>(null)

function handleDragOver(event: DragEvent): void {
  if (isPending.value)
    return
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}

async function handleDrop(event: DragEvent, index: number): Promise<void> {
  const timeboxLength = scheduledDuties.value[index].duties.length

  if (timeboxLength >= 2) {
    toast.error(t('toast.cannot_assign_duties'))
    return
  }
  if (isPending.value)
    return

  isPending.value = true
  event.preventDefault()

  if (event.dataTransfer) {
    try {
      const data = event.dataTransfer.getData('application/json')
      const droppedDuty: Duty = JSON.parse(data)

      if (scheduledDuties.value[index].duties.find(d => d.id === droppedDuty.id)) {
        toast.error(t('toast.duty_already_scheduled'))
      }
      else {
        scheduledDuties.value[index].duties.push(droppedDuty)
        assignedHour.value = scheduledDuties.value[index].time
        await dutiesStore.assignHourDuty(droppedDuty, scheduledDuties.value[index].time)
      }
    }
    catch (e) {
      toast.error(t('console.dropped_data_error'))
      console.error(`${t('console.dropped_data_error')}:`, e)
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
    <CardHeader class="flex-center! justify-between! ">
      <CardTitle>
        {{ t("time_schedule") }}
      </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <TimeBox
        v-for="(dutySlot, index) in scheduledDuties"
        :key="dutySlot.time"
        :scheduled-duty="dutySlot"
        :index="index"
        :is-pending="isPending"
        :assigned-hour="assignedHour"
        :handle-drag-over="handleDragOver"
        :handle-drop="handleDrop"
        :remove-duty="removeDuty"
      />
    </CardContent>
  </Card>
</template>
