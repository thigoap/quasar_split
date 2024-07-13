<template>
  <!-- <transition
    appear
    enter-active-class='animated fadeInUp'
    leave-active-class='animated fadeOutDown'
  >
    <GuestPicker v-show='guestsList'/>
  </transition> -->
  <GuestPicker /> 
	<q-form
    @submit='addOrderFormSubmit'
    class='row q-px-sm q-pb-sm q-col-gutter-sm bg-primary'>
    <div class='col'>
      <q-input
        v-model='addOrderForm.item'
        ref='itemRef'
        :placeholder= '$t("pageOrders.addOrderInputPlaceholder")'
        :bg-color='useLightOrDark("white", "black")'
        outlined
        dense
      >
      </q-input>
		</div>
    <div class='col-2'>
      <q-input
        v-model.number='addOrderForm.price'
        input-class='text-left'
        :placeholder='$t("pageOrders.addPriceInputPlaceholder")'
        :bg-color='useLightOrDark("white", "black")'
        type='number'
        step='0.01'
        min='0'
        v-select-all
        outlined
        dense
      />
    </div>
    <div class='col-2'>
      <q-input
        v-model.number='addOrderForm.qtt'
        input-class='text-left'
        :placeholder='$t("pageOrders.addQttInputPlaceholder")'
        :bg-color='useLightOrDark("white", "black")'
        type='number'
        step='1'
        min='1'
        v-select-all
        outlined
        dense
      />
    </div>
    <div class='col col-auto'>
      <q-btn
        color='primary'
        icon='add'
        type='submit'
        round
      />
    </div>
	</q-form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { useLightOrDark } from 'src/use/useLightOrDark'
import { useStoreOrders } from 'src/stores/storeOrders'
import { useI18n } from 'vue-i18n'
import GuestPicker from 'src/components/Guests/GuestPicker.vue'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeOrders = useStoreOrders()
// const guestsList = ref(true)

/* order */
const itemRef = ref(null)

/* add Order */
const addOrderFormDefault = {
  item: '',
  price: null,
  qtt: null,
  who: []
}

const addOrderForm = reactive({
  ...addOrderFormDefault
})

const addOrderFormReset = () => {
  Object.assign(addOrderForm, addOrderFormDefault)
  itemRef.value.focus()
}

const addOrderFormSubmit = () => {
  if (addOrderForm.item.trim().length 
      && addOrderForm.price != '' 
      && addOrderForm.qtt != ''
      && storeOrders.guestList.length > 0
    ) {
    console.log(addOrderForm.price)
    storeOrders.addOrder(addOrderForm)
    addOrderFormReset()
    storeOrders.clearGuestList()
  }
  else { 
    $q.dialog({
      message: t('pageOrders.addOrderModalMsg'),
      ok: {
        label: 'Ok',
        color: 'primary',
        noCaps: true
      },
    })
    itemRef.value.focus()
  }
}


</script>