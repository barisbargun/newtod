<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'

import { toast } from 'vue-sonner'

const { t } = useI18n()
const dutiesStore = useDutiesStore()
const { scheduledDuties } = storeToRefs(dutiesStore)

const isPending = ref(false)
const assignedHour = ref<number | null>(null)

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

async function handleSelectDuty(duty: Duty, scheduledDuty: typeof scheduledDuties.value[0], closeDialog: any): Promise<void> {
  closeDialog()
  const timeboxLength = scheduledDuty.duties.length
  const time = scheduledDuty.time

  if (isPending.value || timeboxLength >= 2) {
    toast.error(t('toast.cannot_assign_duties'))
    return
  }

  isPending.value = true
  assignedHour.value = time
  try {
    if (scheduledDuty.duties.find(d => d.id === duty.id)) {
      toast.error(t('toast.duty_already_scheduled'))
    }
    else {
      scheduledDuty.duties.push(duty)
      await dutiesStore.assignHourDuty(duty, time)
    }
  }
  catch (e) {
    toast.error(t('console.dropped_data_error'))
    console.error(`${t('console.dropped_data_error')}:`, e)
  }

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
      <DialogTimeBox
        v-for="(dutySlot, index) in scheduledDuties"
        :key="dutySlot.time"
        :scheduled-duty="dutySlot"
        :index="index"
        :is-pending="isPending"
        :assigned-hour="assignedHour"
        :remove-duty="removeDuty"
        :handle-pending="(v: boolean) => isPending = v"
        :handle-assign-hour="(v: number | null) => assignedHour = v"
        :handle-select-duty="handleSelectDuty"
      />
    </CardContent>
  </Card>
</template>
