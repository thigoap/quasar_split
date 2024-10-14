<template>
	<div class='text-center q-pt-xl'>
		<q-icon 
			name='restaurant'
			size='100px'
			:color='useLightOrDark("grey-4", "grey-10")'
		/>
		<div 
    :class='useLightOrDark("text-grey-6", "text-grey-9")'
     >
     {{ $t('pageOrders.addOrders')}}<br><br>
     {{ $t('pageOrders.addOrdersHowtoDel')}}
		</div>
	</div>
</template>

<script setup>
import { useLightOrDark } from 'src/use/useLightOrDark'
import { useI18n } from 'vue-i18n'

/* stores */
const { t } = useI18n()
</script>