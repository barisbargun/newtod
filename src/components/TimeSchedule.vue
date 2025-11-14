<script setup lang="ts">
import { Pencil, X } from 'lucide-vue-next'

const duties = ref([
  { time: 7, duty: null },
  { time: 8, duty: 'Workout' },
  { time: 9, duty: null },
  { time: 10, duty: 'Reading a book' },
  { time: 11, duty: null },
  { time: 12, duty: null },
  { time: 13, duty: null },
  { time: 14, duty: null },
  { time: 15, duty: null },
  { time: 16, duty: null },
  { time: 17, duty: 'Studying English' },
  { time: 18, duty: null },
  { time: 19, duty: null },
  { time: 20, duty: null },
  { time: 21, duty: null },
  { time: 22, duty: null },
  { time: 23, duty: null },
  { time: 0, duty: null },
])
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        Today's Time Schedule
      </CardTitle>
      <Button size="icon" variant="ghost">
        <Pencil class="size-5 text-primary" />
      </Button>
    </CardHeader>
    <CardContent class="grid grid-cols-3 gap-4">
      <div v-for="duty in duties" :key="duty.time" class="relative flex-center flex-col p-10 bg-red-200 rounded">
        <p>{{ duty.time < 10 ? `0${duty.time}` : duty.time }}:00</p>
        <div class="bg-background/50 rounded py-0.5 px-1">
          <p>{{ duty.duty }}</p>
          <X class="text-red-500 absolute -top-1" />
        </div>
      </div>
    </CardContent>
    <CardFooter />
  </Card>
</template>
