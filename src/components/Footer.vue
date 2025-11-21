<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="relative flex-center mb-4 justify-around container">
    <i18n-t keypath="made_by" tag="footer" class="font-poppins text-sm">
      <template #name>
        <a href="https://barisolgun.com" target="_blank" rel="noopener noreferrer">barisolgun</a>
      </template>
    </i18n-t>
    <RouterLink class="text-muted-foreground text-sm sm:absolute right-4 xl:right-8" :to="{ name: '/privacy' }" :title="t('privacy.title')">
      {{ t('privacy.title') }}
    </RouterLink>
  </div>
</template>
