<template>
  
  <q-item>
    <q-item-section >
      <q-item-label
        class='text-subtitle1 text-weight-bold'
      >{{ guest.name }}</q-item-label>
      <q-item-label
        v-for='order in guest.orders'
        :key='order.order_id'
      >
      {{ order.order_item }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label
        class='text-subtitle1 text-weight-bold'
      >{{ useCurrencify(storeGuests.getGuestTotal(guest)) }}</q-item-label>
      <q-item-label
        v-for='order in guest.orders'
        :key='order.order_id'
      >
      {{ useCurrencify(order.order_splitted) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>

import { useQuasar } from 'quasar'
import { useStoreGuests } from 'src/stores/storeGuests'
import { useCurrencify } from 'src/use/useCurrencify'
import { useI18n } from 'vue-i18n'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeGuests = useStoreGuests()

/* props */
const props = defineProps({
  guest: {
    type: Object,
    required: true
  }
})

</script>