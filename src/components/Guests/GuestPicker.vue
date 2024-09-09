<template>
	<div class='text-center q-mb-sm'
    :class='useLightOrDark("shadow-up-3 bg-white", "bg-black")'>
    <q-list
      v-if='storeGuests.guests.length'
      class="guests"
    >
    <GuestPick 
      v-for='guest in storeGuests.guests'
      :key='guest.id'
      :guest='guest'
    />
    </q-list>
	</div>

</template>

<script setup>
import { useLightOrDark } from 'src/use/useLightOrDark'
import { useStoreGuests } from 'src/stores/storeGuests'
import { useI18n } from 'vue-i18n'
import GuestPick from 'src/components/Guests/GuestPick.vue'

/* quasar */
const { t } = useI18n()

/* stores */
const storeGuests = useStoreGuests()


</script>