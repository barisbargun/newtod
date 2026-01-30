<script setup lang="ts">
import { supabase } from '~/lib/supabaseClient'

const route = useRoute()
const { t } = useI18n()

function signWithGoogle() {
  const redirectToPath = (route.query.redirect as string) || '/'
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${redirectToPath}`
    }
  })
}
</script>

<template>
  <div class="flex-center flex-1">
    <Button
      class="border-foreground/15 text-foreground border bg-white shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-900 dark:hover:bg-gray-950"
      size="lg"
      @click="signWithGoogle"
    >
      <img src="/assets/icons/icon-google.svg" class="size-5" />
      {{ t('button.login_google') }}
    </Button>
  </div>
</template>

<route lang="yaml">
meta:
  requiresGuest: true
  layout: auth
</route>
