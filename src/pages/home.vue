<script setup lang="ts">
import { breakpoint } from '~/composables/breakpoint'
import { useDutiesStore } from '~/features/duty/duty-store'
import { useTabsStore } from '~/features/tab/tab-store'

defineOptions({
  name: 'Home',
})

const { t } = useI18n()
const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()
const largerThanLg = breakpoint.greater('lg')

useHead({
  title: () => t('button.dashboard'),
})

onMounted(() => {
  tabsStore.fetchTabs()
  dutiesStore.fetchDuties()
})
</script>

<template>
  <div v-if="largerThanLg" class="flex justify-between gap-5 container mx-auto flex-1 overflow-hidden py-4">
    <PanelSavedDuties class="flex-1/4 overflow-auto" />
    <PanelSchedule class="flex-1/2 overflow-auto" />
    <PanelActivites class="flex-1/4 overflow-auto" />
  </div>
  <Tabs v-else default-value="schedule" class="container flex-1 overflow-hidden py-4">
    <TabsList class="mx-auto mb-4 h-auto *:text-base">
      <TabsTrigger value="schedule" class="px-6 py-2">
        {{ t('schedule') }}
      </TabsTrigger>
      <TabsTrigger value="activities" class="px-6 py-2">
        {{ t('activites') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="schedule" class="flex-1 overflow-auto">
      <PanelScheduleMobile class="h-full overflow-auto" />
    </TabsContent>
    <TabsContent value="activities" class="flex-1 overflow-auto">
      <PanelActivites class="h-full overflow-auto" />
    </TabsContent>
  </Tabs>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
