<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const { t } = useI18n()
const isDialogOpen = ref(false)

function closeDialog() {
  isDialogOpen.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button size="icon" variant="ghost" v-bind="attrs">
        <Plus class="size-5 text-primary" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('button.new_tab') }}</DialogTitle>
      </DialogHeader>
      <FormTabCreate @form-submitted="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
