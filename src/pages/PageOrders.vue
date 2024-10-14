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

      <q-page-sticky
        position='bottom-right'
        :offset='[8, 8]'
        @click='removeAll'
      >
      <q-btn
          round
          icon='delete'
          color='negative'
          :disable='!storeOrders.orders.length'
        />
      </q-page-sticky>

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

import { useQuasar } from 'quasar'
import { useStoreOrders } from 'src/stores/storeOrders';
import { useI18n } from 'vue-i18n'
import AddOrder from 'src/components/Orders/AddOrder.vue'
import Order from 'src/components/Orders/Order.vue'
import NoOrder from 'src/components/Orders/NoOrder.vue'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeOrders = useStoreOrders()

const removeAll = () => { 
  $q.dialog({
    title: t('pageOrders.removeAllModalTitle'),
    message: t('pageOrders.removeAllModalMsg'),
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: t('pageOrders.removeModalMsg'),
      color: 'negative',
      noCaps: true
    },
    cancel: {
      label: t('app.modalMsgCancel'),
      color: 'primary',
      noCaps: true
    },
      }).onOk(() => {
        storeOrders.removeAllOrders()
      }).onCancel(() => {
      })
 }

</script>
