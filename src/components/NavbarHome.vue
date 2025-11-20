<script setup lang="ts">
import { ChevronDown, Languages, Moon, SunMedium } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { site } from '~/config/site'

import { useUserStore } from '~/features/user/user-store'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

async function toggleLocales() {
  // change to some real logic
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
        <p class="font-poppins font-medium">
          {{ site.title }}
        </p>
      </div>
      <nav v-if="user" class="flex justify-center items-center gap-4">
        <Avatar>
          <AvatarImage :src="user.avatar_url || ''" alt="current_user" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
              <ChevronDown class="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{{ user.email }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogLogout />
          </DropdownMenuContent>
        </DropdownMenu>
        <Languages class="size-5 cursor-pointer" :title="t('button.toggle_langs')" @click="toggleLocales()" />
        <component :is="isDark ? SunMedium : Moon" class="size-5 cursor-pointer" :title="t('button.toggle_dark')" @click="toggleDark()" />
      </nav>
    </div>
  </header>
</template>
