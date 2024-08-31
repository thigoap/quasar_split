<template>
  <q-item dense clickable>
    <q-item-section 
    :class="[
        useLightOrDark('text-grey-7', 'text-grey-3'),
        storeOrders.updateGuestListDisplay(guest.id)
    ]"
    @click="storeOrders.updateSelectedGuestList(guest.id, guest.name)"
    >
      {{ guest.name }}
    </q-item-section>
  </q-item>

</template>

<script setup>
import { useLightOrDark } from 'src/use/useLightOrDark'
import { useStoreOrders } from 'src/stores/storeOrders';

/* props */
const props = defineProps({
  guest: {
    type: Object,
    required: true
  }
})

/* stores */
const storeOrders = useStoreOrders()
</script>