<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <template v-if="!user">
    <Navbar />
    <main class="flex w-full flex-1 flex-col">
      <RouterView />
      <Footer />
    </main>
  </template>
  <Spinner v-else class="m-auto size-8" />
</template>
