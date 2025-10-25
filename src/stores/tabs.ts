import type { Tab, TabCreate, TabUpdate } from '~/lib/models/tabs-schema'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '~/lib/supabaseClient'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<Tab[]>([])
  const isLoading = ref(false)

  const fetchTabs = async () => {
    isLoading.value = true

    try {
      // Supabase sorgusu
      const { data, error } = await supabase
        .from('tabs')
        .select('*')

      if (error) {
        throw error
      }

      tabs.value = data
    }
    catch (err) {
      console.error('Görevler yüklenirken bir hata oluştu:', err)
      tabs.value = []
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Belirtilen ID'ye sahip görevi Supabase'den siler ve Pinia State'i günceller.
   * @param {number} id - Silinecek görevin ID'si.
   */
  const deleteTab = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tabs')
        .delete()
        .eq('id', id)

      if (error)
        throw error

      const newTabs = []
      for (const tab of tabs.value) {
        if (tab.id !== id) {
          newTabs.push(tab)
        }
      }
      tabs.value = newTabs
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
  const updateTab = async (id: string, new_data: TabUpdate) => {
    try {
      const { data, error } = await supabase
        .from('tabs')
        .update(new_data)
        .eq('id', id)
        .select()

      if (error)
        throw error

      const updatedTab = data[0]

      const index = tabs.value.findIndex(tab => tab.id === id)
      if (index !== -1) {
        tabs.value[index] = updatedTab
      }
    }
    catch (err) {
      console.error(`ID ${id} güncellenirken bir hata oluştu:`, err)
    }
  }

  // Yeni bir görev ekleme fonksiyonu (opsiyonel ancak faydalı)
  const addTab = async (new_data: TabCreate) => {
    try {
      const { data, error } = await supabase
        .from('tabs')
        .insert(new_data)
        .select()

      if (error)
        throw error

      const newTab = data[0]
      // State'e ekle
      tabs.value.push(newTab)
    }
    catch (err) {
      console.error('Görev eklenirken bir hata oluştu:', err)
    }
  }

  return {
    tabs,
    isLoading,
    fetchTabs,
    deleteTab,
    updateTab,
    addTab,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabsStore as any, import.meta.hot))
