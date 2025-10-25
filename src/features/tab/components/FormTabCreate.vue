<script setup lang="ts">
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
import { tabCreateSchema } from '~/lib/models/tabs-schema'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(tabCreateSchema),
  initialValues: {
    name: '',
  },
})

const onSubmit = handleSubmit((data) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4' }, h('code', JSON.stringify(data, null, 2))),
    position: 'bottom-right',
    class: 'flex flex-col gap-2',
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    },
  })
})
</script>

<template>
  <form id="form-vee-demo" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ field, errors }" name="name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-vee-demo-name">
            Duty name
          </FieldLabel>
          <Input
            id="form-vee-demo-name"
            v-bind="field"
            placeholder="Enter duty name"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
    </FieldGroup>
    <Button class="mt-4" type="submit">
      Submit
    </Button>
  </form>
</template>
