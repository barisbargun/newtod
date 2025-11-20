<script setup lang="ts">
import type { PostgrestError } from '@supabase/supabase-js'
import { Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useDutiesStore } from '../duty-store'

const { id } = defineProps<{
  id: string
}>()

const { t } = useI18n()
const { deleteDuty } = useDutiesStore()
const isDialogOpen = ref(false)
const isPending = ref(false)

async function handleDelete() {
  isPending.value = true
  try {
    await deleteDuty(id)
    toast.success(t('toast.duty_delete_success'))
    isDialogOpen.value = false
  }
  catch (error) {
    toast.error(t('toast.an_error_happened', { msg: (error as PostgrestError).message }))
  }

  isPending.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <Trash2 /> {{ t('button.delete') }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('dialog.title_sure') }}</DialogTitle>
        <DialogDescription>
          {{ t('dialog.desc_delete_duty') }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline" :disabled="isPending">
            {{ t('button.cancel') }}
          </Button>
        </DialogClose>
        <Button :onclick="handleDelete" variant="destructive" :disabled="isPending">
          <Spinner v-if="isPending" />
          {{ t('button.delete') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
