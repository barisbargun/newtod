<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { useDutiesStore } from '~/features/duty/duty-store'
import { useTabsStore } from '~/features/tab/tab-store'

defineOptions({
  name: 'Home',
})

const { t } = useI18n()
const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()
const breakpoint = useBreakpoints(breakpointsTailwind)

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
  <Tabs v-else default-value="saved_duties" class="container flex-1 overflow-hidden py-4">
    <TabsList class="mx-auto mb-4">
      <TabsTrigger value="saved_duties">
        {{ t('saved_duties') }}
      </TabsTrigger>
      <TabsTrigger value="schedule">
        {{ t('schedule') }}
      </TabsTrigger>
      <TabsTrigger value="activities">
        {{ t('activites') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="saved_duties" class="flex-1 overflow-auto">
      <PanelSavedDuties class="h-full overflow-auto" />
    </TabsContent>
    <TabsContent value="schedule" class="flex-1 overflow-auto">
      <PanelSchedule class="h-full overflow-auto" />
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
