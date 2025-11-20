<script setup lang="ts">
import { supabase } from '~/lib/supabaseClient'

const route = useRoute()

function signWithGoogle() {
  const redirectToPath = (route.query.redirect as string) || '/'
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${redirectToPath}`,
    },
  })
}
</script>

<template>
  <Button @click="signWithGoogle">
    Sign with Google
  </Button>
</template>

<route lang="yaml">
meta:
  requiresGuest: true
</route>
