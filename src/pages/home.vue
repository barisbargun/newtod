<script setup lang="ts">
defineOptions({
  name: 'Home',
})

const { t } = useI18n()

useHead({
  title: () => t('button.dashboard'),
})
</script>

<template>
  <div class="flex justify-between gap-5 w-full flex-1 p-4">
    <SavedDutiesContainer class="flex-1/4" />
    <TimeSchedule class="flex-1/2" />
    <ActivitesPanel class="flex-1/4" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
