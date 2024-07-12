<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: 'App'
});

import { onMounted } from 'vue';
import { useStoreSettings } from './stores/storeSettings'
import { useStoreGuests } from './stores/storeGuests'

/* stores */
const storeSettings = useStoreSettings()
const storeGuests = useStoreGuests()

onMounted(() => {
  storeSettings.loadSettings()
  storeGuests.loadGuests()
}) 
</script>
