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
		<q-item>
			<q-item-section>
				{{ guest.name }}
			</q-item-section>
		</q-item>
	</q-slide-item>
</template>

<script setup>

import { useQuasar } from 'quasar'
import { useStoreGuests } from 'src/stores/storeGuests'
import { useStoreSettings } from 'src/stores/storeSettings';
import { useI18n } from 'vue-i18n'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeGuests = useStoreGuests()
const storeSettings = useStoreSettings()

/* props */
const props = defineProps({
  guest: {
    type: Object,
    required: true
  }
})

const onGuestSlideRight = ({ reset }) => {
  if (!storeGuests.getGuestDelStatus(props.guest)) {
    if (storeSettings.settings.promptToDelete)
      promptToDelete(reset)
    else
      storeGuests.deleteGuest(props.guest.id)
    }
  else {
    promptForbidden(reset)
  }
}

const promptForbidden = (reset) => {
  $q.dialog({
    title: t('pageGuests.deletedForbiddenModalTitle'),
    message: `<span class='q-mt-sm text-weight-bold'>${ props.guest.name } 
       <span class='text-weight-regular'> ${ t('pageGuests.deletedForbiddenModalMsg') }</span>
    `,
    persistent: true,
    html: true,
    ok: {
      label: 'Ok',
      color: 'primary',
      noCaps: true
    },
      }).onOk(() => {
        reset()
      })
}

const promptToDelete = (reset) => {
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