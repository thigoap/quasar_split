<template>
  <q-page class='flex column'>
    <div class='q-pa-md'>
    <q-list bordered padding>
      <!-- <q-item-label header>{{ $t('app.settings') }}</q-item-label>

      <q-separator  /> -->

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
    <p
    :class='useLightOrDark("text-grey-6", "text-grey-6")'
    class='q-pt-sm'><br>
      Você está usando uma versão para testes desse aplicativo.<br>
      Caso encontre algum bug (erro / problema), ou tenha sugestões de melhorias, sinta-se a vontade para entrar em contato por email ou como preferir.<br>
      Muito obrigado por me ajudar no desenvolvimento!<br><br>
      Email: <a href="mailto:appthigo@gmail.com">appthigo@gmail.com</a>
    </p>
    <p 
    :class='useLightOrDark("text-grey-6", "text-grey-9")'
    class='fixed-bottom-right q-pr-md'
    >
    v 0.0.1</p>
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
