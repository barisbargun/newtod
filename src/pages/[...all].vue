<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
useHead({
  title: () => t('not-found')
})
</script>

<template>
  <main class="flex-center flex-1 flex-col text-center">
    <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
      {{ t('page_not_exist') }}
    </h1>

    <p class="mx-auto mt-4 mb-3 text-lg leading-relaxed">
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
