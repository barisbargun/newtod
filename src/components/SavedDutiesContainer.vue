<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useDutiesStore } from '~/stores/duties'

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
      <Button size="icon" variant="ghost">
        <Pencil class="size-5 text-primary" />
      </Button>
    </CardHeader>
    <template v-if="!isLoading">
      <CardContent class="flex justify-between relative">
        <Tabs default-value="work" class="w-full">
          <TabsList>
            <TabsTrigger v-for="tab in tabs" :key="tab.id" class="capitalize" :value="tab.name">
              {{ tab.name }}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="work">
            <CardEvent
              v-for="duty in duties"
              :key="duty.name"
              :duty="duty"
              class="not-last:mb-4 w-full"
              color="#9784eb"
            />
          </TabsContent>
          <TabsContent value="fun">
            Change your password here.
          </TabsContent>
        </Tabs>
        <!-- <Button class="absolute top-0 right-6" size="icon" variant="ghost">
          <Plus class="size-5 text-primary" />
        </Button> -->
        <DialogNewTab class="absolute top-0 right-6" />
      </CardContent>
      <CardFooter>
        <DialogNewDuty />
      </CardFooter>
    </template>
    <Spinner v-else class="m-auto size-20" />
  </Card>
</template>
