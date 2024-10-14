<template>
  <q-page>
    <div class='q-pa-md'>

      <transition
        appear
        enter-active-class="animated fadeIn slower"
      >
        <NoGuest 
          v-if='!storeGuests.guests.length'
        />
      </transition>
  
      <q-list
        v-if='storeGuests.guests.length'
        class="guests"
      >
        <Guest 
          v-for='guest in storeGuests.guests'
          :key='guest.id'
          :guest='guest'
        />
      </q-list>

      <q-page-sticky
        position='bottom-right'
        :offset='[8, 16]'
        @click='removeAll'
      >
        <q-btn
          round
          icon='delete'
          color='negative'
          :disable='!storeGuests.guests.length'
        />
      </q-page-sticky>

    </div>
    <q-footer>
    <AddGuest />
    </q-footer>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'PageGuests'
})

import { useQuasar } from 'quasar'
import { useStoreGuests } from 'src/stores/storeGuests'
import { useI18n } from 'vue-i18n'
import AddGuest from 'src/components/Guests/AddGuest.vue'
import Guest from 'src/components/Guests/Guest.vue'
import NoGuest from 'src/components/Guests/NoGuest.vue'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeGuests = useStoreGuests()

const removeAll = () => { 
  $q.dialog({
    title: t('pageGuests.removeAllModalTitle'),
    message: `${t('pageGuests.removeAllModalMsg1')}<br>
    ${t('pageGuests.removeAllModalMsg2')}
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: t('pageGuests.removeModalMsg'),
      color: 'negative',
      noCaps: true
    },
    cancel: {
      label: t('app.modalMsgCancel'),
      color: 'primary',
      noCaps: true
    },
      }).onOk(() => {
        storeGuests.removeAllGuests()
      }).onCancel(() => {
      })
 }

</script>
