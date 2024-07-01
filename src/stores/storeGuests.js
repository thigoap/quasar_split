import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uid, Notify } from 'quasar'
import { useI18n } from 'vue-i18n'


export const useStoreGuests = defineStore('guests', () => {
  /* states */
	const { t } = useI18n()

	const guests = ref([
		{
			id: '1',
			name: 'Thiago'
		},
		{
			id: '2',
			name: 'Verônica'
		}
	])

  /* getters */

  /* actions */
	const addGuest = (addGuestForm) => {
		const newGuest = Object.assign({}, addGuestForm, { id: uid() })
		guests.value.push(newGuest)
	}

	const deleteGuest = (guestId) => {
		const index = guests.value.findIndex(guest => guest.id === guestId)
		guests.value.splice(index, 1)
		Notify.create({
			message: t('pageGuests.deletedToast'),
			position: 'top-right'
		})
	}

  /* return */
  return { 
		/* states */ 
		guests,
		
		/* getters */


		/* actions */
		addGuest,	deleteGuest
	}
})