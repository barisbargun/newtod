<script setup lang="ts">
import type { Tab } from '../tab-schema'
import { Pencil } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import draggable from 'vuedraggable'
import { useTabsStore } from '../tab-store'

const props = defineProps<{
  tabs: Tab[]
}>()
const tabs = ref<Tab[]>([])

const { t } = useI18n()
const { swapTabs } = useTabsStore()

watch(() => props.tabs, (newTabs) => {
  if (Array.isArray(newTabs)) {
    tabs.value = newTabs
  }
}, {
  deep: true,
  immediate: true,
})

const isDialogOpen = ref(false)
const isPending = ref(false)

async function handleSwap() {
  isPending.value = true
  const result = await swapTabs(tabs.value)
  if (!result.error) {
    toast.success(t('toast.tab_swap_success'))
    isDialogOpen.value = false
  }
  else {
    toast.error(t('toast.an_error_happened', { msg: result.error.message }))
  }
  isPending.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button size="icon" variant="ghost">
        <Pencil class="size-5 text-primary" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('dialog.title_swap_tabs') }}</DialogTitle>
        <DialogDescription>
          {{ t('dialog.desc_swap_tabs') }}
        </DialogDescription>
      </DialogHeader>
      <draggable v-model="tabs" tag="ol">
        <template #item="{ element }">
          <li class="p-2 border mb-2 rounded-md cursor-move text-foreground">
            {{ element.name }}
          </li>
        </template>
      </draggable>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline" :disabled="isPending">
            {{ t('button.cancel') }}
          </Button>
        </DialogClose>
        <Button :onclick="handleSwap" variant="destructive" :disabled="isPending">
          <Spinner v-if="isPending" />
          {{ t('button.swap') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
