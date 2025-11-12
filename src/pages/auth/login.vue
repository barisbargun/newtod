<script setup lang="ts">
import { supabase } from '~/lib/supabaseClient'

definePage({
  meta: {
    requiresGuest: true,
    layout: 'homes',
  },
})

function signWithGoogle() {
  supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
</script>

<template>
  <Button @click="signWithGoogle">
    Sign with Google
  </Button>
</template>
