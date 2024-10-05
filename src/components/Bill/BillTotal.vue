<template>
  
  <q-item>
    <q-item-section >
      <q-item-label
        class='text-subtitle1 text-weight-bold'
      >Total
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label
        class='text-subtitle1 text-weight-bold'
      >{{ useCurrencify(storeGuests.getTotal()) }}</q-item-label>
    </q-item-section>
  </q-item>
  <hr>
</template>

<script setup>

import { useQuasar } from 'quasar'
import { useStoreGuests } from 'src/stores/storeGuests'
import { useStoreSettings } from 'src/stores/storeSettings';
import { useCurrencify } from 'src/use/useCurrencify'
import { useI18n } from 'vue-i18n'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeGuests = useStoreGuests()
const storeSettings = useStoreSettings()

</script>