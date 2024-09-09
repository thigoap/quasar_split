<template>
  <q-page>
    <div class='q-pa-md'>
      <transition
        appear
        enter-active-class="animated fadeIn slower"
      >
        <NoBill
          v-if='!storeGuests.guests.length'
        />
      </transition>
  
      <q-list
        v-if='storeGuests.guests.length'
        class="guests"
      >
        <GuestBill
          v-for='guest in storeGuests.guests'
          :key='guest.id'
          :guest='guest'
        />
      </q-list>
    </div>
    <q-footer>
    <AddGuest />
    </q-footer>
  </q-page>
</template>
  
<script setup>
  defineOptions({
    name: 'PageBill'
  })
  
  import GuestBill from 'src/components/Bill/GuestBill.vue'
  import NoBill from 'src/components/Bill/NoBill.vue'
  import { useStoreGuests } from 'src/stores/storeGuests'

  /* stores */
  const storeGuests = useStoreGuests()
  
</script>
  