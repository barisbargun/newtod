<script setup lang="ts">
import type { Duty } from '../duty-schema'
import { Pencil } from 'lucide-vue-next'

const { duty } = defineProps<{
  duty: Duty
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
        <DialogTitle>{{ t('button.upd_duty') }}</DialogTitle>
        <DialogDescription>
          {{ t('button.upd_duty_desc') }}
        </DialogDescription>
      </DialogHeader>
      <FormDutyEdit :duty="duty" @form-submitted="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
