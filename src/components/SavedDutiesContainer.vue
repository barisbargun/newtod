<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'
import { storeToRefs } from 'pinia'
import { useDutiesStore } from '~/features/duty/duty-store'
import { useTabsStore } from '~/features/tab/tab-store'

const { t } = useI18n()
const tabsStore = useTabsStore()
const dutiesStore = useDutiesStore()
const { tabs, isLoading: tabsLoading } = storeToRefs(tabsStore)
const { duties, isLoading: dutiesLoading } = storeToRefs(dutiesStore)

const active_tab_id = ref<string | null>(null)

watch(tabs, (newTabs) => {
  if (newTabs && newTabs.length) {
    active_tab_id.value = newTabs[0].id
  }
})

const isLoading = computed(() => tabsLoading.value || dutiesLoading.value)

function handleDragStart(event: DragEvent, duty: Duty): void {
  if (event.dataTransfer) {
    // 1. Veriyi kaydet
    event.dataTransfer.setData('application/json', JSON.stringify(duty))
    event.dataTransfer.effectAllowed = 'copy'

    // 2. Sürükleme Görselini Ayarla (Drag Image)
    const target = event.target as HTMLElement

    // Sürüklenen öğe üzerine tıklanan öğeyi (target) kullan
    // x ve y, imlecin öğe üzerindeki konumunu ayarlar (örneğimizde ortalanmıştır).
    const x = target.offsetWidth / 2
    const y = target.offsetHeight / 2

    // Öğenin kendisini sürükleme görseli olarak ayarla
    event.dataTransfer.setDragImage(target, x, y)

    // İsteğe bağlı: Sürükleme başladığında orijinal öğeyi şeffaflaştırabiliriz
    setTimeout(() => {
      target.style.opacity = '0.4'
    }, 0)
  }
}

function handleDragEnd(event: DragEvent): void {
  const target = event.target as HTMLElement
  target.style.opacity = '1'
}

provide('active_tab_id', active_tab_id)
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between! -mt-1.5">
      <CardTitle>
        {{ t("saved_duties") }}
      </CardTitle>
      <DialogSwapTab class="absolute" />
    </CardHeader>
    <template v-if="!isLoading">
      <CardContent class="flex justify-between relative">
        <Tabs default-value="work" class="w-full">
          <div class="flex justify-between items-center gap-2">
            <div class="w-full overflow-x-scroll pb-2">
              <TabsList class="justify-start">
                <TabContextMenu v-for="tab in tabs" :key="tab.id" :tab="tab">
                  <TabsTrigger :value="tab.name" @click="active_tab_id = tab.id">
                    {{ tab.name }}
                  </TabsTrigger>
                </TabContextMenu>
              </TabsList>
            </div>
            <DialogNewTab />
          </div>
          <TabsContent v-for="tab in tabs" :key="tab.id" :tab="tab" :value="tab.name">
            <DutyContextMenu v-for="duty in duties.filter(d => tab.id === d.tab_id)" :key="duty.id" :duty="duty">
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
        <DialogNewDuty v-if="active_tab_id" class="mx-auto" :tab-id="active_tab_id" />
      </CardFooter>
    </template>
    <Spinner v-else class="m-auto size-20" />
  </Card>
</template>
