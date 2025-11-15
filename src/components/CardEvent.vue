<script setup lang="ts">
const { name, icon, times } = defineProps<{
  color: string
  iconColor: string
  name: string
  icon: any
  times: number
}>()
</script>

<template>
  <div data-slot="card" class="p-3 flex-center relative z-10">
    <div class="size-full absolute top-0 left-0 opacity-30 -z-10 rounded" :style="{ backgroundColor: color }" />
    <div class="relative flex-center p-2">
      <component :is="icon" class="size-7" />
      <div class="size-full absolute top-0 left-0 opacity-40 -z-10 rounded" :style="{ backgroundColor: color }" />
    </div>
    <p class="text-xs text-muted-foreground flex-1 ml-2">
      {{ name }}
    </p>
    <p class="text-xs text-muted-foreground">
      {{ times }}x
    </p>
  </div>
</template>
