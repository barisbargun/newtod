<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/features/user/user-store'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div v-if="user" class="flex flex-col w-full overflow-hidden h-screen">
    <Navbar :user="user" />
    <RouterView />
    <Footer />
  </div>
</template>
