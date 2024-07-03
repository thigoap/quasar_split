import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uid, Notify } from 'quasar'
import { useI18n } from 'vue-i18n'


export const useStoreGuests = defineStore('guests', () => {
  /* states */
	const { t } = useI18n()

	const guests = ref([])

  /* getters */
	function capitalize(name){
		let nameTrim = name.trim()
		let nameArray = nameTrim.split(' ')
		const capitalizedName = nameArray.map(word =>
			word[0].toUpperCase() + word.slice(1).toLowerCase()
		).join(' ')
		return capitalizedName
	}

  /* actions */
	const addGuest = (addGuestForm) => {
		const newGuest = Object.assign({}, {name: capitalize(addGuestForm.name)}, { id: uid() })
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
		capitalize,

		/* actions */
		addGuest,	deleteGuest
	}
})