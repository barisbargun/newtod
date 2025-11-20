import type { Tab, TabCreate, TabUpdate } from './tab-schema'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { supabase } from '~/lib/supabaseClient'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<Tab[]>([])
  const isLoading = ref(false)

  const { t } = useI18n()

  const fetchTabs = async () => {
    isLoading.value = true

    try {
      const { data, error } = await supabase
        .from('tabs')
        .select('*')

      if (error) {
        throw error
      }

      tabs.value = data.sort((a, b) => a.order - b.order)
    }
    catch {
      toast.error(t('console.tab_load_error'))
      tabs.value = []
    }
    finally {
      isLoading.value = false
    }
  }

  const addTab = async (new_data: TabCreate) => {
    const { data: maxOrderData, error: maxOrderError } = await supabase
      .from('tabs')
      .select('order')
      .order('order', { ascending: false }) // Büyükten küçüğe sırala
      .limit(1) // Sadece en üstteki (en büyük) değeri al
      .maybeSingle()

    if (maxOrderError)
      throw maxOrderError

    const newOrderNumber = (maxOrderData?.order || 0) + 1

    const result = await supabase
      .from('tabs')
      .insert({ ...new_data, order: newOrderNumber })
      .select()

    if (!result.error && result.data) {
      tabs.value.push(result.data[0])
    }
    return result
  }

  const deleteTab = async (id: string) => {
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

  const editTab = async (id: string, new_data: TabUpdate) => {
    const result = await supabase
      .from('tabs')
      .update(new_data)
      .eq('id', id)
      .select()

    if (!result.error && result.data) {
      const index = tabs.value.findIndex(tab => tab.id === id)
      if (index !== -1) {
        tabs.value[index] = result.data[0]
      }
    }
    return result
  }

  const swapTabs = async (newOrder: Tab[]) => {
    const updates = newOrder.map((tab, index) => ({
      ...tab,
      order: index + 1,
    }))
    const result = await supabase
      .from('tabs')
      .upsert(updates, {
        onConflict: 'id',
      })

    if (!result.error) {
      tabs.value = newOrder
    }
    return result
  }

  return {
    tabs,
    isLoading,
    fetchTabs,
    addTab,
    deleteTab,
    editTab,
    swapTabs,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabsStore as any, import.meta.hot))
