<template>
	<div class='text-center q-pt-xl'>
		<q-icon 
			name='groups'
			size='100px'
			:color='useLightOrDark("grey-4", "grey-10")'
		/>
		<div 
    :class='useLightOrDark("text-grey-6", "text-grey-9")'
     >
			Adicione convidados.
		</div>
	</div>
</template>

<script setup>
import { useLightOrDark } from 'src/use/useLightOrDark'
</script>