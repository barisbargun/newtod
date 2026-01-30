<script setup lang="ts">
import type { Duty } from '~/features/duty/duty-schema'
import { ChevronDown } from 'lucide-vue-next'
import { dutyIcons } from '~/config/duty'

const { duty } = defineProps<{
  duty: Duty
}>()

const largerThanLg = breakpoint.greater('lg')
</script>

<template>
  <div data-slot="card" class="flex-center relative z-10 p-3">
    <div
      class="absolute top-0 left-0 -z-10 size-full rounded opacity-50"
      :style="{ backgroundColor: duty.color }"
    />
    <div class="flex-center relative p-2">
      <component :is="dutyIcons[duty.icon]" class="size-7" />
      <div
        class="absolute top-0 left-0 -z-10 size-full rounded"
        :style="{ backgroundColor: duty.color }"
      />
    </div>
    <p class="ml-2 line-clamp-3 flex-1 pr-3 text-sm" :title="duty.name">
      {{ duty.name }}
    </p>
    <p class="text-muted-foreground text-xs">{{ duty.total_times }}x</p>
    <DropdownMenu v-if="!largerThanLg">
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon-lg" class="ml-2 min-h-full" @click.stop>
          <ChevronDown class="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="flex flex-col [&>button]:justify-start">
        <DialogEditDuty :duty="duty" class="justify-start" />
        <DialogDeleteDuty :id="duty.id" />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
