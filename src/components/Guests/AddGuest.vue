<template>
	<q-form
    @submit="addGuestFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
    <div class="col">
      <q-input
        v-model="addGuestForm.name"
        ref="nameRef"
        placeholder="Name"
        bg-color="white"
        outlined
        dense
      >
      </q-input>
		</div>
		<div class="col col-auto">
			<q-btn
				color="primary"
				icon="add"
				type="submit"
				round
			/>
		</div>
	</q-form>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { useStoreGuests } from 'src/stores/storeGuests'

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
  storeGuests.addGuest(addGuestForm)
  addGuestFormReset()
}

</script>