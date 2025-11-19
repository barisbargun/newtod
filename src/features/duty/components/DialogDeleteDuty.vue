<script setup lang="ts">
import type { PostgrestError } from '@supabase/supabase-js'
import { Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useDutiesStore } from '../duty-store'

const { id } = defineProps<{
  id: string
}>()
const { deleteDuty } = useDutiesStore()
const isDialogOpen = ref(false)
const isPending = ref(false)

async function handleDelete() {
  isPending.value = true
  try {
    await deleteDuty(id)
    toast.success('Duty deleted successfully!')
    isDialogOpen.value = false
  }
  catch (error) {
    toast.error(`An error happened: "${(error as PostgrestError).message}"`)
  }

  isPending.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <Trash2 /> Delete
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the duty.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline" :disabled="isPending">
            Cancel
          </Button>
        </DialogClose>
        <Button :onclick="handleDelete" variant="destructive" :disabled="isPending">
          <Spinner v-if="isPending" />
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
