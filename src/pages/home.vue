<script setup lang="ts">
import { useTabsStore } from '~/features/tab/tab-store'
import { useDutiesStore } from '~/stores/duties'

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
    <SavedDutiesContainer class="flex-1/4 overflow-hidden" />
    <TimeSchedule class="flex-1/2 overflow-hidden" />
    <ActivitesPanel class="flex-1/4 overflow-hidden" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
