<script setup lang="ts">
import type { Tab } from '../tab-schema'
import { Pencil } from 'lucide-vue-next'

const { tab } = defineProps<{
  tab: Tab
}>()

const isDialogOpen = ref(false)

function closeDialog() {
  isDialogOpen.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <Pencil /> Edit
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update tab</DialogTitle>
        <DialogDescription>
          Update the tab's information.
        </DialogDescription>
      </DialogHeader>
      <FormTabEdit :tab="tab" @form-submitted="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
