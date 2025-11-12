<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Home',
})

const instruments = ref([])

async function getInstruments() {
  const { data } = await supabase.from('users').select()
  console.log('data', data)
  instruments.value = data
}

onMounted(() => {
  getInstruments()
})

const { t } = useI18n()
useHead({
  title: () => t('button.home'),
})
</script>

<template>
  <p>Abc</p>
  <ul>
    <li v-for="instrument in instruments" :key="instrument.id">
      {{ instrument }}
    </li>
  </ul>
  <!-- <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <Button size="sm">
        Click me
      </Button>
    </div>
  </div> -->
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
