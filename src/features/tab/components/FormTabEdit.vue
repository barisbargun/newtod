<script setup lang="ts">
import type { Tab } from '../tab-schema'
import { toTypedSchema } from '@vee-validate/zod'

import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useTabUpdateSchema } from '../tab-schema'
import { useTabsStore } from '../tab-store'

const { tab } = defineProps<{
  tab: Tab
}>()

const emit = defineEmits(['formSubmitted'])

const { t } = useI18n()
const { editTab } = useTabsStore()
const isPending = ref(false)

const tabUpdateSchema = useTabUpdateSchema()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(tabUpdateSchema),
  initialValues: {
    name: tab.name,
  },
})

const onSubmit = handleSubmit(async (data) => {
  isPending.value = true
  const result = await editTab(tab.id, data)
  if (!result.error) {
    toast.success(t('toast.tab_edit_success'))
    resetForm()
    emit('formSubmitted')
  }
  else {
    toast.error(t('toast.an_error_happened', { msg: result.error.message }))
  }
  isPending.value = false
})
</script>

<template>
  <form id="form-tab" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ field, errors }" name="name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-tab-name">
            {{ t('label.tab_name') }}
          </FieldLabel>
          <Input
            id="form-tab-name"
            v-bind="field"
            :placeholder="t('label.tab_input_placeholder')"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
    </FieldGroup>
  </form>
  <DialogFooter>
    <DialogClose as-child>
      <Button variant="outline" :disabled="isPending">
        {{ t('button.cancel') }}
      </Button>
    </DialogClose>
    <Button form="form-tab" type="submit" :disabled="isPending">
      <Spinner v-if="isPending" />
      {{ t('button.submit') }}
    </Button>
  </DialogFooter>
</template>
