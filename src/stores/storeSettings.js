import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark } from 'quasar'

export const useStoreSettings = defineStore('settings', () => {

	/* states */
	const settings = reactive({
		promptToDelete: true,
		currencySymbol: '$',
		darkMode: true
	})

	watch(() => settings.darkMode, value => {
		Dark.set(value)
	}, { immediate: true })


	/* getters */



	/* actions */



	/* return */

	return { 
		// state
		settings

		// getters

		// actions
	}
	
})