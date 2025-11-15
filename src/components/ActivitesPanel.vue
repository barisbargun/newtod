<script setup lang="ts">
const data = [
  { name: 'Jan', total: 50 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]

const valueFormatter = (tick: number | Date) => typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}` : ''
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        This Week's Activities
      </CardTitle>
    </CardHeader>
    <CardContent class="flex justify-between relative">
      <DonutChart
        index="name"
        category="total"
        :data="data"
        :value-formatter="valueFormatter"
        :colors="['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']"
      />
    </CardContent>
    <CardFooter />
  </Card>
</template>
