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
import { useStoreOrders } from './stores/storeOrders'

/* stores */
const storeSettings = useStoreSettings()
const storeGuests = useStoreGuests()
const storeOrders = useStoreOrders()

onMounted(() => {
  storeSettings.loadSettings()
  storeGuests.loadGuests()
  storeOrders.loadOrders()
}) 
</script>
