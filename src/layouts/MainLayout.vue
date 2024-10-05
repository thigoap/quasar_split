<template>
  <q-layout view='hHh lpR lFf'>
    <q-header
      :elevated='useLightOrDark(true, false)'
    >
      <q-toolbar>
        <q-toolbar-title>
        <div class='absolute-center'>
          <q-icon name='receipt_long' /> 
          {{ $t('app.appName') }}
        </div>
        </q-toolbar-title>
        <q-btn dense flat round icon='settings' to='/settings'/>
      </q-toolbar>
      <q-tabs align='center'>
        <q-route-tab to='/guests' icon='groups'/>
        <q-route-tab to='/orders' icon='restaurant' />
        <q-route-tab to='/bill' icon='payments' />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
})

import { useI18n } from 'vue-i18n'
import { useLightOrDark } from 'src/use/useLightOrDark'

const { t } = useI18n()

</script>
