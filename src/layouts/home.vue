<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div v-if="user" class="flex h-screen w-full flex-col overflow-hidden">
    <Navbar :user="user" />
    <RouterView />
  </div>
  <Spinner v-else class="m-auto size-8" />
</template>
