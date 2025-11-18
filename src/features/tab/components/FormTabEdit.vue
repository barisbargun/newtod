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
import { tabUpdateSchema } from '../tab-schema'
import { useTabsStore } from '../tab-store'

const { tab } = defineProps<{
  tab: Tab
}>()

const emit = defineEmits(['formSubmitted'])

const { editTab } = useTabsStore()
const isPending = ref(false)

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
    toast.success(`Tab "${result.data[0].name}" edited successfully!`)
    resetForm()
    emit('formSubmitted')
  }
  else {
    toast.error(`An error happened: "${result.error.message}"`)
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
            Tab name
          </FieldLabel>
          <Input
            id="form-tab-name"
            v-bind="field"
            placeholder="Enter tab name"
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
        Cancel
      </Button>
    </DialogClose>
    <Button form="form-tab" type="submit" :disabled="isPending">
      <Spinner v-if="isPending" />
      Submit
    </Button>
  </DialogFooter>
</template>
