import type { Duty, DutyCreate, DutyUpdate } from './duty-schema'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { supabase } from '~/lib/supabaseClient'

export const useDutiesStore = defineStore('duties', () => {
  const duties = ref<Duty[]>([])
  const isLoading = ref(false)

  const { t } = useI18n()

  const fetchDuties = async () => {
    isLoading.value = true

    try {
      // Supabase sorgusu
      const { data, error } = await supabase
        .from('duties')
        .select('*')

      if (error) {
        throw error
      }

      duties.value = data
    }
    catch {
      toast.error(t('console.duty_load_error'))
      duties.value = []
    }
    finally {
      isLoading.value = false
    }
  }

  const addDuty = async (new_data: DutyCreate, tab_id: string) => {
    const result = await supabase
      .from('duties')
      .insert({ ...new_data, tab_id })
      .select()

    if (!result.error && result.data) {
      duties.value.push(result.data[0])
    }
    return result
  }

  const deleteDuty = async (id: string) => {
    const { error } = await supabase
      .from('duties')
      .delete()
      .eq('id', id)

    if (error)
      throw error

    const newDuties = []
    for (const duty of duties.value) {
      if (duty.id !== id) {
        newDuties.push(duty)
      }
    }
    duties.value = newDuties
  }

  const editDuty = async (id: string, new_data: DutyUpdate) => {
    const result = await supabase
      .from('duties')
      .update(new_data)
      .eq('id', id)
      .select()

    if (!result.error && result.data) {
      const index = duties.value.findIndex(duty => duty.id === id)
      if (index !== -1) {
        duties.value[index] = result.data[0]
      }
    }
    return result
  }

  const assignHourDuty = async (duty: Duty, hour: number) => {
    const hours = duty.assigned_hours || []
    hours.push(hour)

    const result = await supabase
      .from('duties')
      .update({ assigned_hours: hours })
      .eq('id', duty.id)
      .select()

    if (!result.error && result.data) {
      const index = duties.value.findIndex(d => d.id === duty.id)
      if (index !== -1) {
        duties.value[index] = result.data[0]
      }
    }
    return result
  }

  const reAssignHourDuty = async (duty: Duty, hour: number) => {
    const hours = duty.assigned_hours?.filter(h => h !== hour) || []

    const result = await supabase
      .from('duties')
      .update({ assigned_hours: hours })
      .eq('id', duty.id)
      .select()

    if (!result.error && result.data) {
      const index = duties.value.findIndex(d => d.id === duty.id)
      if (index !== -1) {
        duties.value[index] = result.data[0]
      }
    }
    return result
  }

  return {
    duties,
    isLoading,
    fetchDuties,
    addDuty,
    deleteDuty,
    editDuty,
    assignHourDuty,
    reAssignHourDuty,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDutiesStore as any, import.meta.hot))
