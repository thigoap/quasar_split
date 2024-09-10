<template>
  <q-page class='flex column'>
    <div class='q-pa-md'>
    <q-list bordered padding>
      <q-item-label header>{{ $t('app.settings') }}</q-item-label>

      <q-separator  />

      <q-item tag='label' v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.includeTax') }}</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-input
            v-model.number='storeSettings.settings.tax'
            input-class='text-center'
            ref='tax'
            placeholder= '10'
            :bg-color='useLightOrDark("white", "black")'
            type='number'
            step='1'
            min='0'
            max='99'
            outlined
            dense
          >
          </q-input>
        </q-item-section>
      </q-item>

      <q-separator  />

      <q-item tag='label' v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.promptToDelete') }}</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle
            v-model='storeSettings.settings.promptToDelete'
          />
        </q-item-section>
      </q-item>

      <q-separator  />

      <q-item tag='label' v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model='storeSettings.settings.darkMode'
            :val='false'
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Light</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag='label' v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model='storeSettings.settings.darkMode'
            :val='true'
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dark</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag='label' v-ripple>
        <q-item-section avatar top>
          <q-radio
            v-model='storeSettings.settings.darkMode'
            val='auto'
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Auto</q-item-label>
          <q-item-label caption>{{ $t('settings.darkModeAuto')}}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'Settings'
});

import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { useStoreSettings } from 'src/stores/storeSettings';
import { useLightOrDark } from 'src/use/useLightOrDark'

/* stores */
const { t } = useI18n()
const storeSettings = useStoreSettings()

/* add Tax */
const addTaxFormDefault = {
  tax: null
}

const addTaxForm = reactive({
  ...addTaxFormDefault
})
</script>
