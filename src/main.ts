import type { UserModule } from './types'

import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'

import { supabase } from '~/lib/supabaseClient'
import { useUserStore } from '~/stores/user'
import App from './App.vue'

import './main.css'

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  async (ctx) => {
    const pinia = createPinia()
    ctx.app.use(pinia)

    const extendedCtx = { ...ctx, pinia }

    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }),
    ).forEach(i => i.install?.(extendedCtx))

    if (ctx.isClient)
      pinia.state.value = ctx.initialState.pinia || {}
    else
      ctx.initialState.pinia = pinia.state.value

    const userStore = useUserStore()
    const { data } = await supabase.auth.getSession()

    const isLoggedIn = !!data.session

    supabase.auth.onAuthStateChange((event, session) => {
      userStore.setUser(session?.user?.user_metadata as any ?? null)
    })

    ctx.router.beforeEach((to, from, next) => {
      const requiresAuth = to.meta.requiresAuth
      const requiresGuest = to.meta.requiresGuest

      if (requiresAuth && !isLoggedIn) {
        next({
          path: '/auth/login',
          query: { redirect: to.fullPath },
        })
      }
      else if (requiresGuest && isLoggedIn) {
        next({ path: '/home' })
      }
      else {
        next()
      }
    })
  },
)
