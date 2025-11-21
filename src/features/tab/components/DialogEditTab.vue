<script setup lang="ts">
import type { Tab } from '../tab-schema'
import { Pencil } from 'lucide-vue-next'

const { tab } = defineProps<{
  tab: Tab
}>()

const { t } = useI18n()
const isDialogOpen = ref(false)

function closeDialog() {
  isDialogOpen.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <Pencil /> {{ t('button.edit') }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('button.upd_tab') }}</DialogTitle>
        <DialogDescription>
          {{ t('button.upd_tab_desc') }}
        </DialogDescription>
      </DialogHeader>
      <FormTabEdit :tab="tab" @form-submitted="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
