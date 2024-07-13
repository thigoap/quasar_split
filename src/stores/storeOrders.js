import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'
import { useI18n } from 'vue-i18n'


export const useStoreOrders = defineStore('orders', () => {
  /* states */
	const { t } = useI18n()

	const orders = ref([])
  const guestList = []

  watch(orders.value, () => {
    saveOrders()
  })

  /* getters */


  /* actions */
  const createGuestList = (guestId) => {
    const matchId = guestList.find(listId => listId === guestId)
    if (matchId) {
      console.log('remove')
      const index = guestList.findIndex(listId => listId === guestId)
		  guestList.splice(index, 1)
    } else {
      console.log('add')
      const newGuest = Object.assign({}, { id: guestId })
      guestList.push(newGuest.id)
    }
    //console.log(guestList)
  }

  const clearGuestList = () => {
    guestList.length = 0
    console.log('clear')
    console.log(guestList)
  }


	const addOrder = (addOrderForm) => {
		const newOrder = Object.assign({}, addOrderForm, {  }, { id: uid() })
		orders.value.push(newOrder)
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


  /* return */
  return { 
		/* states */ 
		orders,
    guestList,
		
		/* getters */

		/* actions */
		createGuestList, clearGuestList,
    addOrder,	deleteOrder,
    loadOrders
	}
})