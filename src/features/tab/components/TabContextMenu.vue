<script setup lang="ts">
import type { Tab } from '~/features/tab/tab-schema'

const { tab } = defineProps<{
  tab: Tab
}>()
</script>

<template>
  <ContextMenu v-if="tab.id">
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="[&>button]:flex [&>button]:w-full [&>button]:justify-start">
      <DialogEditTab :tab="tab" />
      <DialogDeleteTab :id="tab.id" />
    </ContextMenuContent>
  </ContextMenu>
</template>
