<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'

const { t } = useI18n()
const dutiesStore = useDutiesStore()
const { duties: unsortedDuties } = storeToRefs(dutiesStore)

const duties = ref<Duty[]>()

const totalDuties = computed(() => duties.value?.reduce((prev, curr) => {
  return prev + curr.tw_times
}, 0))

const colors = computed(() => duties.value?.map(item => item.color))

watchEffect(() => {
  if (unsortedDuties.value.length) {
    duties.value = unsortedDuties.value.filter(d => d.tw_times).sort((a, b) => b.tw_times - a.tw_times)
  }
})

function getPercentage(partial: number, total: number) {
  return ((partial / total) * 100).toFixed()
}
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        {{ t("week_activites") }}
      </CardTitle>
    </CardHeader>
    <template v-if="duties?.length">
      <CardContent class="flex justify-between relative mt-[20%]">
        <DonutChart
          index="name"
          category="tw_times"
          :data="duties || []"
          :total-value="totalDuties"
          :colors="colors"
        />
      </CardContent>
      <CardFooter v-if="totalDuties" class="mt-[25%]">
        <ul class="w-full">
          <li v-for="duty in duties" :key="duty.name" class="flex items-center gap-2 not-last:mb-2">
            <span class="size-3 rounded-full" :style="{ backgroundColor: duty.color }" />
            <p class="line-clamp-2 flex-1 pl-1 pr-2" :title="duty.name">
              {{ duty.name }}
            </p>
            <p class="ml-auto text-sm text-muted-foreground">
              {{ getPercentage(duty.tw_times, totalDuties) }}%
            </p>
          </li>
        </ul>
      </CardFooter>
    </template>
    <p v-else class="px-6">
      {{ t("info.no_activities_yet") }}
      <strong class="block mt-4 font-normal">{{ t("info.activities_reset") }}</strong>
    </p>
  </Card>
</template>
