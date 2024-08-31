import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useStoreGuests } from 'src/stores/storeGuests'
//import { useDisplayList } from 'src/use/useDisplayList';


export const useStoreOrders = defineStore('orders', () => {
  /* states */
  const { t } = useI18n()

  const storeGuests = useStoreGuests()
  const orders = ref([])
  const selectedGuestList = ref([])
  const displayList = []

  watch(orders.value, () => {
    saveOrders()
  })

  /* getters */
  const updateGuestListDisplay = (guestId) => {
    const matchId = selectedGuestList.value.find(listId => listId === guestId)
    if (matchId) {
      return 'text-weight-bold text-green-8 text-body1'
    } else {
      return 'text-weight-regular text-body2'
    }
  }

  const stringifyDisplayList = (displayList) => {
    if (displayList) {
      // console.log('useDisplayList', displayList)
      const liststring = displayList.join(', ')
      // console.log('useList: ', liststring)
      return liststring
    }
  }

  /* actions */
  const updateSelectedGuestList = (guestId, guestName) => {
    const matchId = selectedGuestList.value.find(listId => listId === guestId)
    if (matchId) {
      const index = selectedGuestList.value.findIndex(listId => listId === guestId)
		  selectedGuestList.value.splice(index, 1)
      displayList.splice(index, 1)
      // console.log('remove displayList', displayList)    
    } else {
      const newGuest = Object.assign({}, { id: guestId })
      selectedGuestList.value.push(newGuest.id)
      displayList.push(guestName)
      // console.log('add displayList', displayList)
      // console.log('guestList', selectedGuestList.value) 
    }
    updateGuestListDisplay(guestId)
  }

  const clearGuestList = () => {
    selectedGuestList.value.length = 0
    displayList.length = 0
  }

	const addOrder = (addOrderForm) => {
    const savedGuestList = [...displayList]
		const newOrder = Object.assign(
      {}, addOrderForm, 
      { displayGuestList: stringifyDisplayList(displayList) },
      { guestList: savedGuestList },
      { id: uid() }
    )
		orders.value.push(newOrder)
    console.log('orders', orders.value)
    storeGuests.addOrderToGuest(newOrder)
	}

	const deleteOrder = (orderId) => {
		const index = orders.value.findIndex(order => order.id === orderId)
		orders.value.splice(index, 1)
		Notify.create({
			message: t('pageOrders.deletedToast'),
			position: 'top-right'
		})
	}

  const saveOrders = () => {
    LocalStorage.set('orders', orders.value)
  }

  const loadOrders = () => {
    const savedOrders = LocalStorage.getItem('orders')
    if (savedOrders) Object.assign(orders.value, savedOrders)
  }

  /* helpers */
  // const getOrderIndexById = orderId => {
  //   return orders.value.findIndex(order => order.id === orderId)
  // }


  /* return */
  return { 
		/* states */ 
		orders,
    selectedGuestList,
    displayList,
		
		/* getters */
    updateGuestListDisplay,

		/* actions */
		updateSelectedGuestList, clearGuestList,
    addOrder,	deleteOrder,
    loadOrders
	}
})