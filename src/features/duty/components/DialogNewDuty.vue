<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineOptions({
  inheritAttrs: false,
})

const { t } = useI18n()

const attrs = useAttrs()

const isDialogOpen = ref(false)

function closeDialog() {
  isDialogOpen.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button v-bind="attrs">
        <Plus class="size-5" />
        {{ t('button.new_duty') }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('button.new_duty') }}</DialogTitle>
      </DialogHeader>
      <FormDutyCreate @form-submitted="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
