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

  function getGuestTotal(guest) {
    let guestTotal = 0
    guest.orders.forEach(
      (order) => {
        guestTotal = guestTotal + order.order_splitted
      }
    )
    return guestTotal
  }

  /* actions */
	const addGuest = (addGuestForm) => {
		const newGuest = Object.assign(
      {}, addGuestForm, 
      { name: capitalize(addGuestForm.name) }, 
      { id: uid() }
    )
		guests.value.push(newGuest)
    // console.log(guests.value)
    location.reload();
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
        // console.log(guests.value[index].name)
        guests.value[index].orders.push({
          'order_id': orderForm.id,
          'order_item': orderForm.item,
          'order_splitted': splitted })
      }
    )
    console.log('guest list updated', guests.value)
  }

  const deleteOrderFromGuest = (orderId, orderGuestList) => {
    // console.log('delete guest list', orderGuestList)
    orderGuestList.forEach(
      (guestName) => {
        const guestIndex = getGuestIndexByName(guestName)
        if (guestIndex != undefined) {
          // console.log('guest name', guests.value[index].name)
          // console.log('guest obj', guests.value[guestIndex])
          // console.log('guest orders', guests.value[guestIndex].orders)
          const orderIndex = guests.value[guestIndex].orders.findIndex(order => order.order_id === orderId)
          // console.log('order index', orderIndex)
          guests.value[guestIndex].orders.splice(orderIndex, 1)
          // console.log('guest orders', guests.value[guestIndex].orders)
        }
      }
    )
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
		capitalize, getGuestTotal,

		/* actions */
		addGuest, deleteGuest, loadGuests,
    addOrderToGuest, deleteOrderFromGuest
	}
})