<template>
	<q-form
    @submit='addGuestFormSubmit'
    class='row q-px-sm q-pb-sm q-col-gutter-sm bg-primary'>
    <div class='col'>
      <q-input
        v-model='addGuestForm.name'
        ref='nameRef'
        :placeholder= "$t('pageGuests.addGuestInputPlaceholder')"
        bg-color='white'
        outlined
        dense
      >
      </q-input>
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
import { useStoreGuests } from 'src/stores/storeGuests'
import { useI18n } from 'vue-i18n'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeGuests = useStoreGuests()

/* guests */
const nameRef = ref(null)

/* add Guest */
const addGuestFormDefault = {
  name: ''  
}

const addGuestForm = reactive({
  ...addGuestFormDefault
})

const addGuestFormReset = () => {
  Object.assign(addGuestForm, addGuestFormDefault)
  nameRef.value.focus()
}

const addGuestFormSubmit = () => {
  if (addGuestForm.name.trim().length) {
    if (!checkDuplicatedGuest()) {
      storeGuests.addGuest(addGuestForm)
      addGuestFormReset()
    } else {
      $q.dialog({
        message: t('pageGuests.addGuestModalDupMsg'),
        ok: {
          label: 'Ok',
          color: 'primary',
          noCaps: true
        },
      })
      addGuestFormReset()
    }
  } else { 
    $q.dialog({
      message: t('pageGuests.addGuestModalEmptyMsg'),
      ok: {
        label: 'Ok',
        color: 'primary',
        noCaps: true
      },
    })
  }
}

const checkDuplicatedGuest = () => {
  return storeGuests.guests.find(guest => guest.name === storeGuests.capitalize(addGuestForm.name))
}
</script>