import type { UserModule } from './types'

import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'

import { supabase } from '~/lib/supabaseClient'
import { useUserStore } from '~/stores/user'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './main.css'
import 'uno.css'

// export const createApp = ViteSSG(
//   App,
//   {
//     routes: setupLayouts(routes),
//     base: import.meta.env.BASE_URL,
//   },
//   (ctx) => {
//     // install all modules under `modules/`
//     Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
//       .forEach(i => i.install?.(ctx))
//     // ctx.app.use(Previewer)
//   },
// )

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

    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }),
    ).forEach(i => i.install?.(extendedCtx))

    if (ctx.isClient)
      pinia.state.value = ctx.initialState.pinia || {}
    else
      ctx.initialState.pinia = pinia.state.value
    // ---------------------------------

    // --- Initialize Auth State ---
    const userStore = useUserStore(pinia) // <-- 5. Pass pinia instance directly

    // 1. Get the initial session from Supabase
    const { data } = await supabase.auth.getSession()
    const { session } = data

    const isLoggedIn = !!session

    // userStore.setUser(session?.user?.user_metadata ?? null)

    // 2. Listen for future auth changes (login/logout)
    supabase.auth.onAuthStateChange((event, session) => {
      userStore.setUser(session?.user ?? null)
    })

    // --- Add Router Navigation Guard ---
    // This guard now runs *after* the initial user state is set
    ctx.router.beforeEach((to, from, next) => {
      // Re-fetch store inside guard just to be safe
      // const store = useUserStore(pinia) // <-- 6. Pass pinia instance directly
      const requiresAuth = to.meta.requiresAuth
      const requiresGuest = to.meta.requiresGuest

      if (requiresAuth && !isLoggedIn) {
        // Redirect to login if not authenticated
        next({
          path: '/auth/login', // Or use route name: { name: 'login' }
          query: { redirect: to.fullPath },
        })
      }
      else if (requiresGuest && isLoggedIn) {
        // Redirect from login page if already logged in
        next({ path: '/home' }) // Or use route name: { name: 'home' }
      }
      else {
        // Allow navigation
        next()
      }
    })
  },
)
