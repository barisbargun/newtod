<script setup lang="ts">
import type { User } from '~/features/user/user-store'
import { ChevronDown, CircleUser, Languages, Moon, SunMedium } from 'lucide-vue-next'

import { site } from '~/config/site'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

defineProps<{
  user?: User
}>()

const { t, locale } = useI18n()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <header class="bg-card w-full py-2 border-b">
    <div class="container flex items-center justify-between">
      <div class="flex items-center justify-center gap-2">
        <img src="/assets/logo.avif" alt="logo" class="size-5 rounded-full">
        <RouterLink class="font-poppins font-medium" :to="{ name: '/' }">
          {{ site.title }}
        </RouterLink>
      </div>
      <nav class="flex justify-center items-center gap-4">
        <template v-if="user">
          <Avatar>
            <AvatarImage :src="user.avatar_url || ''" alt="current_user" />
            <AvatarFallback><CircleUser /></AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon">
                <ChevronDown class="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{{ user.email }}</DropdownMenuLabel>
              <DropdownMenuItem @click="toggleLocales()">
                {{ t('button.toggle_langs') }}
              </DropdownMenuItem>
              <DropdownMenuItem @click="toggleDark()">
                {{ t('button.toggle_dark') }}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogLogout />
            </DropdownMenuContent>
          </DropdownMenu>
        </template>
        <template v-else>
          <RouterLink icon-btn :to="{ name: '/home' }" :title="t('button.dashboard')">
            <Button>
              {{ t('button.dashboard') }}
            </Button>
          </RouterLink>

          <Languages class="size-5 cursor-pointer" :title="t('button.toggle_langs')" @click="toggleLocales()" />
          <component :is="isDark ? SunMedium : Moon" class="size-5 cursor-pointer" :title="t('button.toggle_dark')" @click="toggleDark()" />
        </template>
      </nav>
    </div>
  </header>
</template>
