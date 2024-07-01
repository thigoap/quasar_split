<template>
	<q-slide-item
		@right='onGuestSlideRight'
		right-color='red'
	>
		<!-- <template v-slot:left>
			<q-icon name='done' />
		</template> -->
		<template v-slot:right>
			<q-icon name='delete' />
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
import { useI18n } from 'vue-i18n'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

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
    title: t('pageGuests.deletedModalTitle'),
    message: `${ t('pageGuests.deletedModalMsg') }
    <span class='q-mt-sm text-weight-bold'>
      ${ props.guest.name }</span>?
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: t('pageGuests.deletedModalMsg'),
      color: 'negative',
      noCaps: true
    },
    cancel: {
      label: t('app.modalMsgCancel'),
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