<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'
import { CircleX } from 'lucide-vue-next'

const { scheduledDuty, index, isPending, assignedHour, handleDragOver, handleDrop, removeDuty } = defineProps<{
  scheduledDuty: { time: number, duties: Duty[] }
  index: number
  isPending: boolean
  assignedHour: number | null
  handleDragOver: (event: DragEvent) => void
  handleDrop: (event: DragEvent, index: number) => Promise<void>
  removeDuty: (index: number, duty: Duty) => Promise<void>
}>()
</script>

<template>
  <div
    class="flex-center flex-col h-28 rounded transition-all duration-200 bg-secondary relative px-2"
    :style="scheduledDuty.duties.length ? { backgroundColor: scheduledDuty.duties[0].color } : {}"
    @dragover="handleDragOver($event)" @drop="handleDrop($event, index)"
  >
    <Spinner v-if="isPending && assignedHour && assignedHour - 7 === index" class="absolute top-2 right-2 size-6" />
    <p class="font-semibold text-lg">
      {{ scheduledDuty.time === 24 ? '00' : scheduledDuty.time < 10 ? `0${scheduledDuty.time}` : scheduledDuty.time }}:00
    </p>
    <div v-for="duty in scheduledDuty.duties" :key="duty.id" class="bg-background/50 rounded py-0.5 px-1 relative mt-2 shadow-md">
      <p class="font-medium text-sm text-blue-700 dark:text-blue-300 line-clamp-1" :title="duty.name">
        {{ duty.name }}
      </p>
      <CircleX
        class="text-destructive fill-destructive-foreground absolute -top-2 -right-2 size-4 cursor-pointer hover:text-red-700"
        title="remove event"
        @click.stop="removeDuty(index, duty)"
      />
    </div>
  </div>
</template>
