<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTabsStore } from '~/features/tab/tab-store'

const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()
const { tabs, isLoading: tabsLoading } = storeToRefs(tabsStore)
const { duties, isLoading: dutiesLoading } = storeToRefs(dutiesStore)

const isLoading = computed(() => tabsLoading.value || dutiesLoading.value)
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        Saved Duties
      </CardTitle>
      <DialogSwapTab />
    </CardHeader>
    <template v-if="!isLoading">
      <CardContent class="flex justify-between relative">
        <Tabs default-value="work" class="w-full">
          <div class="flex justify-between items-center gap-2">
            <div class="w-full overflow-x-scroll pb-2">
              <TabsList class="justify-start">
                <TabContextMenu v-for="tab in tabs" :key="tab.id" :tab="tab">
                  <TabsTrigger :value="tab.name">
                    {{ tab.name }}
                  </TabsTrigger>
                </TabContextMenu>
              </TabsList>
            </div>
            <DialogNewTab />
          </div>
          <TabsContent value="work">
            <CardEvent
              v-for="duty in duties"
              :key="duty.name"
              :duty="duty"
              class="not-last:mb-4 w-full"
              color="#9784eb"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <DialogNewDuty />
      </CardFooter>
    </template>
    <Spinner v-else class="m-auto size-20" />
  </Card>
</template>
