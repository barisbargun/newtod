import type { Duty, DutyAdd, DutyUpdate } from '~/types/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '~/lib/supabaseClient'

export const useDutiesStore = defineStore('duties', () => {
  const duties = ref<Duty[]>([])
  const isLoading = ref(false)

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
    catch (err) {
      console.error('Görevler yüklenirken bir hata oluştu:', err)
      duties.value = []
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Belirtilen ID'ye sahip görevi Supabase'den siler ve Pinia State'i günceller.
   * @param {number} id - Silinecek görevin ID'si.
   */
  const deleteDuty = async (id: string) => {
    try {
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
    catch (err) {
      console.error(`ID ${id} silinirken bir hata oluştu:`, err)
      // Hata durumunda kullanıcıya bildirim gösterilebilir
    }
  }

  /**
   * Belirtilen ID'ye sahip görevi Supabase'de günceller ve Pinia State'i günceller.
   * @param {number} id - Güncellenecek görevin ID'si.
   * @param {object} new_data - Güncellenecek sütunları içeren nesne (Örn: { name: 'Yeni Ad', completed: true }).
   */
  const updateDuty = async (id: string, new_data: DutyUpdate) => {
    try {
      const { data, error } = await supabase
        .from('duties')
        .update(new_data)
        .eq('id', id)
        .select()

      if (error)
        throw error

      const updatedDuty = data[0]

      const index = duties.value.findIndex(duty => duty.id === id)
      if (index !== -1) {
        duties.value[index] = updatedDuty
      }
    }
    catch (err) {
      console.error(`ID ${id} güncellenirken bir hata oluştu:`, err)
    }
  }

  // Yeni bir görev ekleme fonksiyonu (opsiyonel ancak faydalı)
  const addDuty = async (new_data: DutyAdd) => {
    try {
      const { data, error } = await supabase
        .from('duties')
        .insert(new_data)
        .select()

      if (error)
        throw error

      const newDuty = data[0]
      // State'e ekle
      duties.value.push(newDuty)
    }
    catch (err) {
      console.error('Görev eklenirken bir hata oluştu:', err)
    }
  }

  // TODO: add functions for times

  return {
    duties,
    isLoading,
    fetchDuties,
    deleteDuty,
    updateDuty,
    addDuty,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDutiesStore as any, import.meta.hot))
