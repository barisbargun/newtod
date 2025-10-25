<script setup lang="ts">
import { useDutiesStore } from '~/stores/duties'
import { useTabsStore } from '~/stores/tabs'

defineOptions({
  name: 'Home',
})

const { t } = useI18n()
const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()

useHead({
  title: () => t('button.dashboard'),
})

onMounted(() => {
  tabsStore.fetchTabs()
  dutiesStore.fetchDuties()
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
