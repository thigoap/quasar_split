<template>
	<q-slide-item
		@right='onOrderSlideRight'
		right-color='red'
	>
		<template v-slot:right>
			<q-icon name='delete' />
		</template>

		<q-item>
			<q-item-section>
        <q-item-label>
          {{ order.qtt }} x {{ order.item }}
        </q-item-label>
        <q-item-label caption>
          {{ order.displayGuestList }}
        </q-item-label>
			</q-item-section>
			<q-item-section side>
				{{ useCurrencify(order.price * order.qtt) }}
			</q-item-section>
		</q-item>
	</q-slide-item>
</template>

<script setup>

import { useQuasar } from 'quasar'
import { useCurrencify } from 'src/use/useCurrencify'
import { useStoreOrders } from 'src/stores/storeOrders'
import { useStoreSettings } from 'src/stores/storeSettings'
import { useI18n } from 'vue-i18n'

/* quasar */
const $q = useQuasar()
const { t } = useI18n()

/* stores */
const storeOrders = useStoreOrders()
const storeSettings = useStoreSettings()

/* props */
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const onOrderSlideRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) promptToDelete(reset)
  else storeOrders.removeOrder(props.order.id)
}

const promptToDelete = (reset) => {
  $q.dialog({
    title: t('pageOrders.removeModalTitle'),
    message: `${ t('pageOrders.removeModalMsg') }
    <span class='q-mt-sm text-weight-bold'>
      ${ props.order.item }</span>?
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: t('pageOrders.removeModalMsg'),
      color: 'negative',
      noCaps: true
    },
    cancel: {
      label: t('app.modalMsgCancel'),
      color: 'primary',
      noCaps: true
    },
      }).onOk(() => {
        storeOrders.removeOrder(props.order.id)
      }).onCancel(() => {
        reset()
      })
}
</script>