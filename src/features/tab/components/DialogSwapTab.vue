<script setup lang="ts">
import type { Tab } from '../tab-schema'
import { Pencil } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import draggable from 'vuedraggable'
import { useTabsStore } from '../tab-store'

const tabsStore = useTabsStore()
const { tabs: refTabs } = storeToRefs(tabsStore)
const tabs = ref<Tab[]>([])

watch(refTabs, (newTabs) => {
  if (Array.isArray(newTabs)) {
    tabs.value = newTabs
  }
}, {
  deep: true,
})

const isDialogOpen = ref(false)
const isPending = ref(false)

async function handleSwap() {
  isPending.value = true
  const result = await tabsStore.swapTabs(tabs.value)
  if (!result.error) {
    toast.success('Tab swapped successfully!')
    isDialogOpen.value = false
  }
  else {
    toast.error(`An error happened: "${result.error.message}"`)
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
        <DialogTitle> Swap tabs </DialogTitle>
        <DialogDescription>
          Select the tab you want to swap with.
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
            Cancel
          </Button>
        </DialogClose>
        <Button :onclick="handleSwap" variant="destructive" :disabled="isPending">
          <Spinner v-if="isPending" />
          Swap
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
