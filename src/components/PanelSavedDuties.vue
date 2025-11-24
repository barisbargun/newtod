<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'

const { t } = useI18n()
const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()

const { tabs, activeTabId } = storeToRefs(tabsStore)
const { duties } = storeToRefs(dutiesStore)

const dutiesByTab = computed(() => {
  const map = new Map<string, Duty[]>()

  for (const tab of tabs.value) {
    map.set(tab.id, [])
  }

  for (const duty of duties.value) {
    if (map.has(duty.tab_id)) {
      map.get(duty.tab_id)!.push(duty)
    }
  }
  return map
})

function handleDragStart(event: DragEvent, duty: Duty): void {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(duty))
    event.dataTransfer.effectAllowed = 'copy'

    const target = event.target as HTMLElement

    const x = target.offsetWidth / 2
    const y = target.offsetHeight / 2

    event.dataTransfer.setDragImage(target, x, y)

    setTimeout(() => {
      target.style.opacity = '0.4'
    }, 0)
  }
}

function handleDragEnd(event: DragEvent): void {
  const target = event.target as HTMLElement
  target.style.opacity = '1'
}

function setActiveTab(tabId: string): void {
  activeTabId.value = tabId
}
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        {{ t("saved_duties") }}
      </CardTitle>
    </CardHeader>
    <CardContent class="relative">
      <div class="flex justify-end items-center gap-2">
        <DialogSwapTab v-if="tabs.length > 1" :tabs="tabs" />
        <DialogNewTab />
      </div>
      <Tabs v-if="activeTabId" :default-value="activeTabId" class="w-full">
        <div class="flex justify-between items-center gap-2">
          <div class="w-full overflow-auto pb-2">
            <TabsList class="justify-start">
              <TabContextMenu v-for="tab in tabs" :key="tab.id" :tab="tab">
                <TabsTrigger :value="tab.id" @click="setActiveTab(tab.id)">
                  {{ tab.name }}
                </TabsTrigger>
              </TabContextMenu>
            </TabsList>
          </div>
        </div>
        <TabsContent
          v-for="tab in tabs"
          :key="tab.id"
          :value="tab.id"
        >
          <DutyContextMenu
            v-for="duty of dutiesByTab.get(tab.id)"
            :key="duty.id"
            :duty="duty"
          >
            <CardEvent
              :duty="duty"
              class="not-last:mb-4 w-full cursor-move"
              color="#9784eb"
              draggable="true"
              @dragstart="handleDragStart($event, duty)"
              @dragend="handleDragEnd"
            />
          </DutyContextMenu>
        </TabsContent>
      </Tabs>
    </CardContent>
    <CardFooter>
      <DialogNewDuty v-if="activeTabId" class="mx-auto" />
    </CardFooter>
  </Card>
</template>
