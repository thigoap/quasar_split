<template>
  <q-page>
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-slide-item
          @right="onGuestSlideRight($event, guest)"
          right-color="red"
          v-for="guest in storeGuests.guests"
          :key="guest.id"
        >
          <!-- <template v-slot:left>
            <q-icon name="done" />
          </template> -->
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item
          >
            <q-item-section>
              {{ guest.name }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>

    <q-footer
      class="bg-transparent"
    >
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
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useStoreGuests } from 'src/stores/storeGuests'

defineOptions({
  name: 'Index'
});

/* quasar */
const $q = useQuasar()

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

/* slide items */
const onGuestSlideRight = ({ reset }, guest) => {
  $q.dialog({
    title: 'Delete Guest',
    message: `Delete this Guest?
    <div class="q-mt-sm text-weight-bold">
      ${ guest.name }
    </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    },
      }).onOk(() => {
        storeGuests.deleteGuest(guest.id)
      }).onCancel(() => {
        reset()
      })
}

</script>
