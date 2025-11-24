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
  <div data-slot="card" class="p-3 flex-center relative z-10">
    <div class="size-full absolute top-0 left-0 opacity-50 -z-10 rounded" :style="{ backgroundColor: duty.color }" />
    <div class="relative flex-center p-2">
      <component :is="dutyIcons[duty.icon]" class="size-7" />
      <div class="size-full absolute top-0 left-0 -z-10 rounded" :style="{ backgroundColor: duty.color }" />
    </div>
    <p class="text-sm flex-1 ml-2 pr-3 line-clamp-3" :title="duty.name">
      {{ duty.name }}
    </p>
    <p class="text-xs text-muted-foreground">
      {{ duty.total_times }}x
    </p>
    <DropdownMenu v-if="!largerThanLg">
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon-lg" class="min-h-full ml-2" @click.stop>
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
