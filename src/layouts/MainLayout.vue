<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
        <div class="absolute-center">
          <q-icon name="receipt_long" /> 
          Divide Ai
        </div>
        </q-toolbar-title>

      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/guests" icon="groups"/>
        <q-route-tab to="/orders" icon="restaurant" />
        <q-route-tab to="/bill" icon="payments" />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="200"
      :breakpoint="767"
      show-if-above
      bordered
    >
    <q-item-label
          header
        >
          Navigation
        </q-item-label>
      <q-list>
        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import NavLink from 'components/Nav/NavLink.vue'

defineOptions({
  name: 'MainLayout'
})

const navLinks = [
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'About',
    icon: 'chat',
    link: '/about'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
