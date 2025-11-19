<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'

const { duty } = defineProps<{
  duty: Duty
}>()
</script>

<template>
  <ContextMenu v-if="duty.id">
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="[&>button]:flex [&>button]:w-full [&>button]:justify-start">
      <DialogEditDuty :duty="duty" />
      <DialogDeleteDuty :id="duty.id" />
    </ContextMenuContent>
  </ContextMenu>
</template>
