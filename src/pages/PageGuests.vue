<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-slide-item
          @right="onGuestSlideRight($event, guest)"
          right-color="red"
          v-for="guest in guests"
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

    <q-footer>
      <q-form
      @submit="addGuest"
      class="row q-pa-sm q-col-gutter-sm">
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
import { ref, reactive } from 'vue';
import { uid, useQuasar } from 'quasar';

defineOptions({
  name: 'Index'
});

/* quasar */
const $q = useQuasar()

/* guests */
const nameRef = ref(null)

const guests = ref([
  {
    id: '1',
    name: 'Thiago',
    deleted: false
  },
  {
    id: '2',
    name: 'Verônica',
    deleted: false
  }
])

/* add guest */
const addGuestFormDefault = {
  name: ''  
}

const addGuestForm = reactive({
  ...addGuestFormDefault
})

const addGuest = () => {
  const newGuest = {
    // id: uid(),
    id: guests.value.length + 1,
    name: addGuestForm.name,
    deleted: false
  }
  console.log(newGuest)
  guests.value.push(newGuest)
  addGuestFormReset()
}

const addGuestFormReset = () => {
  Object.assign(addGuestForm, addGuestFormDefault)
  nameRef.value.focus()
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
        deleteGuest(guest.id)
      }).onCancel(() => {
        reset()
      })
}
/* delete Guest */
const deleteGuest = (guestId) => {
  const index = guests.value.findIndex(guest => guest.id === guestId)
  guests.value.splice(index, 1)
  $q.notify({
    message: 'Guest deleted',
    position: 'top-right'
  })
}

</script>
