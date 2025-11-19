<script setup lang="ts">
import type { Duty } from '../duty-schema'
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
import { dutyColors, dutyIcons } from '~/config/duty'
import { dutyUpdateSchema } from '../duty-schema'
import { useDutiesStore } from '../duty-store'

const { duty } = defineProps<{
  duty: Duty
}>()

const emit = defineEmits(['formSubmitted'])

const { editDuty } = useDutiesStore()
const isPending = ref(false)

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(dutyUpdateSchema),
  initialValues: {
    name: duty.name,
    color: duty.color,
    icon: duty.icon,
  },
})

const onSubmit = handleSubmit(async (data) => {
  isPending.value = true
  const result = await editDuty(duty.id, data)
  if (!result.error) {
    toast.success(`Duty "${result.data[0].name}" edited successfully!`)
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
  <form id="form-duty" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ field, errors }" name="name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-duty-name">
            Duty name
          </FieldLabel>
          <Input
            id="form-duty-name"
            v-bind="field"
            placeholder="Enter duty name"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <VeeField v-slot="{ field, errors }" name="color">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-duty-color">
            Color
          </FieldLabel>
          <ul class="flex gap-3 flex-row">
            <li
              v-for="color in dutyColors"
              :key="color"
              class="size-6 rounded-full cursor-pointer relative transition-all duration-150"
              :class="{ 'ring-2 ring-offset-2 ring-indigo-500': field.value === color }"
              :style="{ backgroundColor: color }"
              @click="field.onChange(color)"
            />
          </ul>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <VeeField v-slot="{ field, errors }" name="icon">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-duty-icon">
            Icon
          </FieldLabel>
          <ul class="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
            <li
              v-for="(IconComponent, iconKey) in dutyIcons"
              :key="iconKey"
              class="size-10 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200"
              :class="{
                'bg-white text-gray-700 hover:bg-gray-100': field.value !== iconKey,
                'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-300': field.value === iconKey,
              }"
              @click="field.onChange(iconKey)"
            >
              <component :is="IconComponent" class="size-6" />
            </li>
          </ul>
          <!-- Hidden input field for the actual value (optional, but good for accessibility/form submission) -->
          <!-- Since the selection is visual, we can use a hidden input just to store the validated value -->
          <input
            id="form-duty-icon"
            type="hidden"
            v-bind="field"
            autocomplete="off"
          >
          <!-- Removed visible Input as requested -->
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
    <Button form="form-duty" type="submit" :disabled="isPending">
      <Spinner v-if="isPending" />
      Submit
    </Button>
  </DialogFooter>
</template>
