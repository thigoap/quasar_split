import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'
import { useI18n } from 'vue-i18n'


export const useStoreGuests = defineStore('guests', () => {
  /* states */
	const { t } = useI18n()

	const guests = ref([])

  watch(guests.value, () => {
    saveGuests()
  })

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
    console.log(guests.value)
	}

	const deleteGuest = (guestId) => {
		const index = guests.value.findIndex(guest => guest.id === guestId)
		guests.value.splice(index, 1)
		Notify.create({
			message: t('pageGuests.deletedToast'),
			position: 'top-right'
		})
	}

  const saveGuests = () => {
    LocalStorage.set('guests', guests.value)
  }

  const loadGuests = () => {
    const savedGuests = LocalStorage.getItem('guests')
    if (savedGuests) Object.assign(guests.value, savedGuests)
  }


  /* return */
  return { 
		/* states */ 
		guests,
		
		/* getters */
		capitalize,

		/* actions */
		addGuest,	deleteGuest, loadGuests
	}
})