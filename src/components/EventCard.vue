<script setup lang="ts">
const { name, icon, times } = defineProps<{
  name: string
  icon: any
  times: number
}>()
</script>

<template>
  <div data-slot="card" class="bg-[#fff1e6] p-3 flex-center rounded">
    <component :is="icon" class="size-11 bg-[#ffd6b8] p-2 rounded" />
    <p class="text-xs text-muted-foreground flex-1 ml-2">
      {{ name }}
    </p>
    <p class="text-xs text-muted-foreground">
      {{ times }}x
    </p>
  </div>
</template>
