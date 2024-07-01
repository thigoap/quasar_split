<template>
  <q-layout view='hHh lpR lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon='menu' @click='toggleLeftDrawer' />
        <q-toolbar-title>
        <div class='absolute-center'>
          <q-icon name='receipt_long' /> 
          {{ $t('app.appName') }}
        </div>
        </q-toolbar-title>

      </q-toolbar>
      <q-tabs align='center'>
        <q-route-tab to='/guests' icon='groups'/>
        <q-route-tab to='/orders' icon='restaurant' />
        <q-route-tab to='/bill' icon='payments' />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model='leftDrawerOpen'
      class='bg-primary'
      :width='200'
      :breakpoint='767'
      show-if-above
      bordered
    >
    <q-item-label
          header
        >
        {{ $t('app.drawerTitle') }}
        </q-item-label>
      <q-list>
        <NavLink
          v-for='link in navLinks'
          :key='link.title'
          v-bind='link'
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
})

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavLink from 'components/Nav/NavLink.vue'

const { t } = useI18n()

const navLinks = [
  {
    title: t('app.settings'),
    icon: 'settings',
    link: '/settings'
  },
  {
    title: t('app.about'),
    icon: 'chat',
    link: '/about'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
