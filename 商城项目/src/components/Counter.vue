<template>
	<div>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<p><span>{{num}}</span></p>
	</div>
</template>

<script>
	export default{
		props:['num'],
		data(){
			return {}
		},	
		methods:{
			increment(){
				this.$emit('incre')
				import('./../until')
			},
			decrement(){
				this.$emit('decre')
			}
		}
	}
</script>

<style>
</style>