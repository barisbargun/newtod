<script setup lang="ts">
import { Toaster } from './components/ui/sonner'

useHead({
  title: 'New App',
  meta: [
    {
      name: 'theme-color',
      content: () => isDark.value ? '#0f0f1a' : '#ffffff',
    },
  ],
})
</script>

<template>
  <Toaster />
  <RouterView />
</template>
