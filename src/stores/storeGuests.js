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
		const newGuest = Object.assign(
      {}, addGuestForm, 
      { name: capitalize(addGuestForm.name) }, 
      { id: uid() }
    )
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

  const addOrderToGuest = (orderForm) => {
    const splitted = Math.round(((orderForm.price * orderForm.qtt) / orderForm.guestList.length) * 100) / 100
    orderForm.guestList.forEach(
      (guestName) => {
        const index = getGuestIndexByName(guestName)
        guests.value[index].orders.push({
          'order id': orderForm.id,
          'order item': orderForm.item,
          'order splitted': splitted })
        console.log('guest orders', guests.value[index].orders)
      }
    );
  }

  const saveGuests = () => {
    LocalStorage.set('guests', guests.value)
  }

  const loadGuests = () => {
    const savedGuests = LocalStorage.getItem('guests')
    if (savedGuests) Object.assign(guests.value, savedGuests)
  }

  /* helpers */
  const getGuestIndexByName = guestName => {
    return guests.value.findIndex(guest => guest.name === guestName)
  }


  /* return */
  return { 
		/* states */ 
		guests,
		
		/* getters */
		capitalize,

		/* actions */
		addGuest, deleteGuest, loadGuests,
    addOrderToGuest
	}
})