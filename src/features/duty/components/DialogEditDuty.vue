<script setup lang="ts">
import type { Duty } from '../duty-schema'
import { Pencil } from 'lucide-vue-next'

const { duty } = defineProps<{
  duty: Duty
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
        <DialogTitle>Update duty</DialogTitle>
        <DialogDescription>
          Update the duty's information.
        </DialogDescription>
      </DialogHeader>
      <FormDutyEdit :duty="duty" @form-submitted="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
