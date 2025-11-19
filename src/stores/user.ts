import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

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
  /**
   * The current authenticated Supabase user.
   * Will be null if not logged in.
   */
  const user = ref<User | null>(null)
  /**
   * A computed getter to easily check if the user is authenticated.
   */
  const isLoggedIn = computed(() => user.value !== null)

  /**
   * Sets the current user.
   * @param newUser The user object from Supabase, or null.
   */
  function setUser(newUser: User | null) {
    user.value = newUser
  }

  return {
    user,
    isLoggedIn,
    setUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
