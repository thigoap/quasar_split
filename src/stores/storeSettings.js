import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark, LocalStorage } from 'quasar'

export const useStoreSettings = defineStore('settings', () => {

  /* states */
  const settings = reactive({
    promptToDelete: true,
    currencySymbol: '$',
    darkMode: false,
    tax: 0
  })

  // watch darkMode
  watch(() => settings.darkMode, value => {
    Dark.set(value)
  }, { immediate: true })

  // watch settings
  watch(settings, () => {
    saveSettings()
  })

  // watch tax
  watch(() => settings.tax, value => {
    if (settings.tax < 0) { settings.tax = 0}
    if (settings.tax > 50) { settings.tax = 50}
  })

  /* getters */



  /* actions */
  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) Object.assign(settings, savedSettings)
  }


  /* return */
  return { 
    // state
    settings,

    // getters

    // actions
    loadSettings
  }
})