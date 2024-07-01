<template>
  <q-page>
    <div class='q-pa-md'>

      <NoGuest 
        v-if='!storeGuests.guests.length'
      />

      <q-list
        v-else
        bordered
        separator
      >
        <Guest 
          v-for='guest in storeGuests.guests'
          :key='guest.id'
          :guest='guest'
        />
      </q-list>

    </div>
    <q-footer
      class='bg-transparent'
    >
    <AddGuest />
    </q-footer>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'PageGuests'
});

import { useStoreGuests } from 'src/stores/storeGuests'
import AddGuest from 'src/components/Guests/AddGuest.vue'
import Guest from 'src/components/Guests/Guest.vue'
import NoGuest from 'src/components/Guests/NoGuest.vue'

/* stores */
const storeGuests = useStoreGuests()

</script>
