<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'
import { CircleX } from 'lucide-vue-next'

const { scheduledDuty, index, isPending, assignedHour, removeDuty, handleSelectDuty,
} = defineProps<{
  scheduledDuty: { time: number, duties: Duty[] }
  index: number
  isPending: boolean
  assignedHour: number | null
  removeDuty: (index: number, duty: Duty) => Promise<void>
  handlePending: (p: boolean) => void
  handleAssignHour: (v: number | null) => void
  handleSelectDuty: (duty: Duty, scheduledDuty: { time: number, duties: Duty[] }, closeDialog: () => void) => Promise<void>
}>()

const { t } = useI18n()
const isDialogOpen = ref(false)

const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()
const { tabs, activeTabId } = storeToRefs(tabsStore)
const { duties } = storeToRefs(dutiesStore)

async function handleSelect(duty: Duty): Promise<void> {
  handleSelectDuty(duty, scheduledDuty, () => isDialogOpen.value = false)
}

function setActiveTab(tabId: string): void {
  activeTabId.value = tabId
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <div
        class="flex-center flex-col h-28 rounded transition-all duration-200 bg-secondary relative px-2"
        :style="scheduledDuty.duties.length ? { backgroundColor: scheduledDuty.duties[0].color } : {}"
      >
        <Spinner v-if="isPending && assignedHour && assignedHour - 7 === index" class="absolute top-2 right-2 size-6" />
        <p class="font-semibold text-lg">
          {{ scheduledDuty.time === 24 ? '00' : scheduledDuty.time < 10 ? `0${scheduledDuty.time}` : scheduledDuty.time }}:00
        </p>
        <div v-for="duty in scheduledDuty.duties" :key="duty.id" class="bg-background/50 rounded py-0.5 px-1 relative mt-2 shadow-md">
          <p class="font-medium text-sm text-blue-700 dark:text-blue-300 line-clamp-1" :title="duty.name">
            {{ duty.name }}
          </p>
          <CircleX
            class="text-destructive fill-destructive-foreground absolute -top-2 -right-2 size-4 hover:text-red-700"
            title="remove event"
            @click.stop="removeDuty(index, duty)"
          />
        </div>
      </div>
    </DialogTrigger>
    <DialogContent class="h-[80vh] overflow-auto flex flex-col">
      <DialogHeader>
        <DialogTitle>
          {{ t("saved_duties") }}
        </DialogTitle>
      </DialogHeader>
      <div>
        <div class="flex justify-end items-center gap-2">
          <DialogSwapTab v-if="tabs.length > 1" :tabs="tabs" />
          <DialogNewTab />
        </div>
        <Tabs :default-value="tabs.length ? tabs[0].name : ''" class="w-full">
          <div class="flex justify-between items-center gap-2">
            <div class="w-full overflow-auto pb-2">
              <TabsList class="justify-start">
                <TabContextMenu v-for="tab in tabs" :key="tab.id" :tab="tab">
                  <TabsTrigger :value="tab.name" @click="setActiveTab(tab.id)">
                    {{ tab.name }}
                  </TabsTrigger>
                </TabContextMenu>
              </TabsList>
            </div>
          </div>
          <TabsContent v-for="tab in tabs" :key="tab.id" class="flex-1 h-full" :tab="tab" :value="tab.name">
            <DutyContextMenu v-for="duty in duties.filter(d => tab.id === d.tab_id)" :key="duty.id" :duty="duty">
              <CardEvent
                :duty="duty"
                class="not-last:mb-3 w-full"
                color="#9784eb"
                @click="handleSelect(duty)"
              />
            </DutyContextMenu>
          </TabsContent>
        </Tabs>
      </div>
      <DialogNewDuty v-if="activeTabId" class="mx-auto mt-" :tab-id="activeTabId" />
    </DialogContent>
  </Dialog>
</template>
