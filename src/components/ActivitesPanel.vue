<script setup lang="ts">
import { duties as _duties } from '~/config/data'

const duties = _duties.sort((a, b) => b.times - a.times)

const totalDuties = computed(() => duties.reduce((prev, curr) => {
  return prev + curr.times
}, 0))

const colors = computed(() => duties.map(item => item.color))

function getPercentage(partial: number, total: number) {
  return ((partial / total) * 100).toFixed()
}
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        This Week's Activities
      </CardTitle>
    </CardHeader>
    <CardContent class="flex justify-between relative mt-[20%]">
      <DonutChart
        index="name"
        category="times"
        :data="duties"
        :total-value="totalDuties"
        :colors="colors"
      />
    </CardContent>
    <CardFooter class="mt-[25%]">
      <ul class="w-full">
        <li v-for="duty in duties" :key="duty.name" class="flex items-center gap-2 not-last:mb-2">
          <span class="size-3 rounded-full" :style="{ backgroundColor: duty.color }" />
          <p>{{ duty.name }}</p>
          <p class="ml-auto text-sm text-muted-foreground">
            {{ getPercentage(duty.times, totalDuties) }}%
          </p>
        </li>
      </ul>
    </CardFooter>
  </Card>
</template>
