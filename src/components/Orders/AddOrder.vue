<template>
  <q-item-label
      @click='guestListToggle'
      :class='useLightOrDark("text-grey-6", "text-grey-3")'
      class='text-caption text-center q-mb-sm q-mt-xs text-weight-bolder'
      style='text-decoration: underline'
    >{{ t('pageOrders.guestsList') }}
  </q-item-label>
  <transition
    appear
    enter-active-class='animated fadeInUp'
    leave-active-class='animated fadeOutDown'
  >
  <GuestPicker v-if='guestListDisplay'/>
  </transition>
  <!-- <GuestPicker /> -->
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

/* order */
const itemRef = ref(null)
let guestListDisplay = ref(false)

/* add Order */
const addOrderFormDefault = {
  item: '',
  price: null,
  qtt: null,
  displayGuestList: null
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
      && addOrderForm.price != null && addOrderForm.price != '' 
      && addOrderForm.qtt != null && addOrderForm.qtt != ''
      && storeOrders.selectedGuestList.length > 0
    ) {
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

const guestListToggle = () => {
  guestListDisplay.value = !guestListDisplay.value
  console.log(guestListDisplay.value)
}

</script>