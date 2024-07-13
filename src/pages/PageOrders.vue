<template>
  <q-page>
    <div class='q-pa-md'>
      <transition
        appear
        enter-active-class='animated fadeIn slower'
      >
        <NoOrder
          v-if='!storeOrders.orders.length'
        />
      </transition>
      <q-list
        v-if='storeOrders.orders.length'
        bordered
        separator
        class='orders'
      >
        <Order 
          v-for='order in storeOrders.orders'
          :key='order.id'
          :order='order'
        />
      </q-list>
 

    </div>
    <q-footer
      class='bg-transparent'
    >
    <AddOrder />
    </q-footer>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'PageOrders'
})

import { useStoreOrders } from 'src/stores/storeOrders';
import AddOrder from 'src/components/Orders/AddOrder.vue'
import Order from 'src/components/Orders/Order.vue'
import NoOrder from 'src/components/Orders/NoOrder.vue'

/* stores */
const storeOrders = useStoreOrders()
</script>
