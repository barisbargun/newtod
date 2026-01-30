<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="flex-center relative container mb-4 justify-around">
    <i18n-t keypath="made_by" tag="footer" class="font-poppins text-sm">
      <template #name>
        <a href="https://barisolgun.com" target="_blank" rel="noopener noreferrer">barisolgun</a>
      </template>
    </i18n-t>
    <RouterLink
      class="text-muted-foreground right-4 text-sm sm:absolute xl:right-8"
      :to="{ name: '/privacy' }"
      :title="t('privacy.title')"
    >
      {{ t('privacy.title') }}
    </RouterLink>
  </div>
</template>
