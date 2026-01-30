<script setup lang="ts">
useHead({
  title: () => 'NewTod'
})

const { t } = useI18n()
</script>

<template>
  <h1 class="m-auto text-4xl font-extrabold tracking-tight sm:text-5xl">
    {{ t('coming_soon') }}
  </h1>
</template>

<route lang="yaml">
meta:
  layout: index
</route>
