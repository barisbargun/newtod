<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto max-w-4xl py-12">
    <!-- Header -->
    <h1 class="mb-6 border-b pb-2 text-4xl font-extrabold">
      {{ t('privacy.title') }}
    </h1>

    <!-- Last Update Date -->
    <p class="mb-8 text-sm">
      {{ t('privacy.last_upd_date') }}
    </p>

    <div class="space-y-6 leading-relaxed">
      <!-- Section 1: Information Collected -->
      <h2 class="pt-4 text-2xl font-semibold">1. {{ t('privacy.collected_data') }}</h2>
      <p>{{ t('privacy.collected_data_desc') }}:</p>

      <h3 class="mt-4 text-xl font-medium">a) {{ t('privacy.google_auth') }}</h3>
      <ul class="ml-4 list-inside list-disc space-y-1">
        <li>
          <b>{{ t('privacy.email_bold') }}: </b>{{ t('privacy.email_desc') }}
        </li>
        <li>
          <b>{{ t('privacy.username_bold') }}: </b>{{ t('privacy.username_desc') }}
        </li>
        <li>
          <b>{{ t('privacy.img_bold') }}: </b>{{ t('privacy.img_desc') }}
        </li>
      </ul>

      <h3 class="mt-4 text-xl font-medium">b) {{ t('privacy.app_data_title') }}</h3>
      <ul class="ml-4 list-inside list-disc space-y-1">
        <li>
          <b>{{ t('privacy.duties_bold') }}: </b>{{ t('privacy.duties_desc') }}
        </li>
      </ul>

      <!-- Section 2: Storage and Usage -->
      <h2 class="pt-4 text-2xl font-semibold">2. {{ t('privacy.storage_and_usage_title') }}</h2>
      <p>{{ t('privacy.stg_usg_desc1', { provider: 'Supabase' }) }}</p>
      <p>{{ t('privacy.stg_usg_desc2') }}</p>

      <!-- Section 3: Third-Party Services -->
      <h2 class="pt-4 text-2xl font-semibold">3. {{ t('privacy.thrd_prty_services_title') }}</h2>
      <p>{{ t('privacy.thrd_prty_services_desc') }}:</p>
      <ul class="ml-4 list-inside list-disc space-y-1">
        <li><b>Supabase: </b>{{ t('privacy.thrd_prty_services_supb') }}</li>
        <li><b>Google: </b>{{ t('privacy.thrd_prty_services_googl') }}</li>
      </ul>

      <h2 class="pt-4 text-2xl font-semibold">4. {{ t('privacy.contact_title') }}</h2>
      <p>
        {{ t('privacy.contact_qst_desc') }}
        <a href="mailto:barisolgu@gmail.com" class="font-medium underline hover:text-blue-800">
          {{ t('privacy.contact_us') }}
        </a>
      </p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: index
</route>
