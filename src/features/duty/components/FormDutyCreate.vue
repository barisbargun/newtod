<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { toast } from 'vue-sonner'
import { dutyColors, dutyIcons } from '~/config/duty'
import { useDutyCreateSchema } from '../duty-schema'

const emit = defineEmits(['formSubmitted'])

const { t } = useI18n()
const { addDuty } = useDutiesStore()
const isPending = ref(false)

const tabsStore = useTabsStore()
const { activeTabId } = storeToRefs(tabsStore)

const dutyCreateSchema = useDutyCreateSchema()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(dutyCreateSchema),
  initialValues: {
    name: '',
    color: '#F87171',
    icon: 'bookOpen',
  },
})

const onSubmit = handleSubmit(async (data) => {
  isPending.value = true
  if (activeTabId.value) {
    const result = await addDuty(data, activeTabId.value)
    if (!result.error) {
      toast.success(t('toast.duty_add_success'))
      resetForm()
      emit('formSubmitted')
    }
    else {
      toast.error(t('toast.an_error_happened', { msg: result.error.message }))
    }
  }

  isPending.value = false
})
</script>

<template>
  <form v-if="activeTabId" id="form-duty" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ field, errors }" name="name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-duty-name">
            {{ t('label.duty_name') }}
          </FieldLabel>
          <Input
            id="form-duty-name"
            v-bind="field"
            :placeholder="t('label.duty_input_placeholder')"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <VeeField v-slot="{ field, errors }" name="color">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-duty-color">
            {{ t('label.color') }}
          </FieldLabel>
          <ul class="flex gap-3 flex-row">
            <li
              v-for="color in dutyColors"
              :key="color"
              class="size-6 rounded-full cursor-pointer relative transition-all duration-150"
              :class="{ 'ring-2 ring-offset-2 ring-primary': field.value === color }"
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
            {{ t('label.icon') }}
          </FieldLabel>
          <ul class="flex flex-wrap gap-2 p-2 border rounded-lg bg-card max-h-40 overflow-y-auto">
            <li
              v-for="(IconComponent, iconKey) in dutyIcons"
              :key="iconKey"
              class="size-10 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200"
              :class="{
                'bg-foreground text-background hover:brightness-125': field.value !== iconKey,
                'bg-secondary text-secondary-foreground shadow-lg ring-2 ring-primary': field.value === iconKey,
              }"
              @click="field.onChange(iconKey)"
            >
              <component :is="IconComponent" class="size-6" />
            </li>
          </ul>
          <input
            id="form-duty-icon"
            type="hidden"
            v-bind="field"
            autocomplete="off"
          >
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
    <Button form="form-duty" type="submit" :disabled="isPending">
      <Spinner v-if="isPending" />
      {{ t('button.submit') }}
    </Button>
  </DialogFooter>
</template>
