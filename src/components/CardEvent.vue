<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'
import { dutyIcons } from '~/config/duty'

const { duty } = defineProps<{
  duty: Duty
}>()
</script>

<template>
  <div data-slot="card" class="p-3 flex-center relative z-10">
    <div class="size-full absolute top-0 left-0 opacity-50 -z-10 rounded" :style="{ backgroundColor: duty.color }" />
    <div class="relative flex-center p-2">
      <component :is="dutyIcons[duty.icon]" class="size-7" />
      <div class="size-full absolute top-0 left-0 -z-10 rounded" :style="{ backgroundColor: duty.color }" />
    </div>
    <p class="text-xs text-muted-foreground flex-1 ml-2">
      {{ duty.name }}
    </p>
    <p class="text-xs text-muted-foreground">
      {{ duty.total_times }}x
    </p>
  </div>
</template>
