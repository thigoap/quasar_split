import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useStoreSettings } from 'src/stores/storeSettings';
import { useStoreOrders } from './storeOrders';


export const useStoreGuests = defineStore('guests', () => {
  /* states */
  const storeSettings = useStoreSettings()
  const storeOrders = useStoreOrders()
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

  function getGuestDelStatus(guest) {
    return guest.orders.length > 0 ? true : false
  }

  function getGuestTotal(guest) {
    let guestTotal = 0
    guest.orders.forEach(
      (order) => {
        guestTotal = guestTotal + order.order_splitted
      }
    )
    guestTotal = guestTotal + (storeSettings.settings.tax * guestTotal / 100)
    return guestTotal
  }

  function getTotal() {
    let total = 0
    guests.value.forEach(
      (guest) => {
        total = total + getGuestTotal(guest)
      }
    )
    return total
  }

  /* actions */
	const addGuest = (addGuestForm) => {
		const newGuest = Object.assign(
      {}, addGuestForm, 
      { name: capitalize(addGuestForm.name) }, 
      { id: uid() }
    )
		guests.value.push(newGuest)
    location.reload();
	}

	const removeGuest = (guestId) => {
		const index = guests.value.findIndex(guest => guest.id === guestId)
		guests.value.splice(index, 1)
		Notify.create({
			message: t('pageGuests.removedToast'),
			position: 'top'
		})   
	}

  const removeAllGuests = () => {
    storeOrders.removeAllOrders()
		guests.value.splice(0)
		Notify.create({
			message: t('pageGuests.removedAllToast'),
			position: 'top'
		}) 
	}
  
  const addOrderToGuest = (orderForm) => {
    const splitted = Math.round(((orderForm.price * orderForm.qtt) / orderForm.guestList.length) * 100) / 100
    orderForm.guestList.forEach(
      (guestName) => {
        const index = getGuestIndexByName(guestName)
        guests.value[index].orders.push({
          'order_id': orderForm.id,
          'order_item': orderForm.item,
          'order_splitted': splitted })
      }
    )
    console.log('guest list updated', guests.value)
  }

  const removeOrderFromGuest = (orderId, orderGuestList) => {
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

  const removeAllOrdersFromAllGuests = () => {
    guests.value.forEach(
      (guest) => { 
        // console.log('guest orders', guest.orders)
        guest.orders.splice(0)
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
    getGuestDelStatus, getTotal,

		/* actions */
		addGuest, removeGuest, removeAllGuests, removeAllOrdersFromAllGuests,
    loadGuests, addOrderToGuest, removeOrderFromGuest
	}
})