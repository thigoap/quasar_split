<template>
	<q-slide-item
		@right="onGuestSlideRight"
		right-color="red"
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
</template>

<script setup>

import { useQuasar } from 'quasar'
import { useStoreGuests } from 'src/stores/storeGuests'

/* quasar */
const $q = useQuasar()

/* stores */
const storeGuests = useStoreGuests()

/* props */
const props = defineProps({
  guest: {
    type: Object,
    required: true
  }
})

/* slide items */
const onGuestSlideRight = ({ reset }) => {
  $q.dialog({
    title: 'Delete Guest',
    message: `Delete this Guest?
    <div class="q-mt-sm text-weight-bold">
      ${ props.guest.name }
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
        storeGuests.deleteGuest(props.guest.id)
      }).onCancel(() => {
        reset()
      })
  }

</script>