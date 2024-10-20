<template>
  <q-page class='flex column'>
    <div class='q-pa-md'>
      
    <q-list bordered>
      <q-item tag='label' v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.includeTax') }}</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-input
            v-model.number='storeSettings.settings.tax'
            input-class='text-center'
            ref='tax'
            placeholder='10'
            :bg-color='useLightOrDark("white", "black")'
            type='number'
            step='1'
            min='0'
            max='50'
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
        <q-item-section>
          <q-item-label>{{ $t('settings.darkMode') }}</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle
            v-model='storeSettings.settings.darkMode'
          />
        </q-item-section>
      </q-item>

    </q-list>

    <q-btn-toggle
      @update:model-value="languageChanged"
      v-model='locale'
      spread
      class='q-pt-sm'
      no-caps
      rounded
      unelevated
      toggle-color='primary'
      color='white'
      text-color='primary'
      :options="[
        {label: `${ t('settings.english')}`, value: 'en-US'},
        {label: `${ t('settings.portuguese')}`, value: 'pt-BR'}
      ]"
    />

    <p 
    :class='useLightOrDark("text-grey-6", "text-grey-9")'
    class='fixed-bottom-right q-pr-md'
    >
    v 0.2.0</p>

    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'Settings'
});

import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { useStoreSettings } from 'src/stores/storeSettings'
import { useLightOrDark } from 'src/use/useLightOrDark'

/* stores */
const { t } = useI18n()
const storeSettings = useStoreSettings()

// Use the global Vue-i18n instance and retrieve the current locale
const { locale } = useI18n({ useScope: 'global' })

const languageChanged = (locale) => {
  storeSettings.updateLanguage(locale)
}


/* add Tax */
const addTaxFormDefault = {
  tax: null
}

const addTaxForm = reactive({
  ...addTaxFormDefault
})
</script>
