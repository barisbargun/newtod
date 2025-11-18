<script setup lang="ts">
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { useTabsStore } from '../tab-store'

const tabsStore = useTabsStore()
const { tabs: refTabs } = storeToRefs(tabsStore)
const tabs = ref(refTabs.value)
</script>

<template>
  <draggable v-model="tabs" tag="ol">
    <template #item="{ element }">
      <li class="p-2 border mb-2 rounded-md cursor-move text-foreground">
        {{ element.name }}
      </li>
    </template>
  </draggable>
</template>
