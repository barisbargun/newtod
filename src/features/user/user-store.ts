import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { supabase } from '~/lib/supabaseClient'

interface User {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  picture: string
  provider_id: string
  sub: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const isLoggedIn = computed(() => user.value !== null)

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error)
      throw error

    setUser(null)
  }

  return {
    user,
    isLoggedIn,
    setUser,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
