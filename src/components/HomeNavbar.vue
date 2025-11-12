<script setup lang="ts">
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
        <div class="bg-primary size-5" />
        <p>{{ site.title }}</p>
      </div>
      <nav class="flex justify-center items-center gap-4">
        <div class="bg-primary size-6 rounded-full" />

        <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
          <div i-carbon-language />
        </a>

        <button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
          <div i="carbon-sun dark:carbon-moon" />
        </button>
        <!-- Todo: Fill here -->
      </nav>
    </div>
  </header>
</template>
