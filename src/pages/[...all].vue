<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
useHead({
  title: () => t('not-found'),
})
</script>

<template>
  <main class="flex-center text-center flex-col flex-1">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">
      {{ t('page_not_exist') }}
    </h1>

    <p class="text-lg mx-auto mt-4 mb-3 leading-relaxed">
      {{ t('head_back_page') }}
    </p>
    <Button variant="outline" @click="router.back()">
      {{ t('button.back') }}
    </Button>
  </main>
</template>

<route lang="yaml">
meta:
  layout: index
</route>
