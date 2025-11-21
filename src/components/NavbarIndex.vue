<script setup lang="ts">
import { Languages, Moon, SunMedium } from 'lucide-vue-next'
import { site } from '~/config/site'

import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <header class="bg-card w-full py-2">
    <div class="container flex items-center justify-between">
      <div class="flex items-center justify-center gap-2">
        <img src="/assets/logo.avif" alt="logo" class="size-5 rounded-full">
        <p class="font-poppins font-medium">
          {{ site.title }}
        </p>
      </div>
      <nav class="flex justify-center items-center gap-4">
        <RouterLink icon-btn :to="{ name: '/home' }" :title="t('button.dashboard')">
          <Button>
            {{ t('button.dashboard') }}
          </Button>
        </RouterLink>

        <Languages class="size-5 cursor-pointer" :title="t('button.toggle_langs')" @click="toggleLocales()" />
        <component :is="isDark ? SunMedium : Moon" class="size-5 cursor-pointer" :title="t('button.toggle_dark')" @click="toggleDark()" />
      </nav>
    </div>
  </header>
</template>
