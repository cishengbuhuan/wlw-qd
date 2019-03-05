<template>
	<div id="app">
		<Header  v-if="$route.name != 'login' && $route.name != 'forget'" />
		<Aside  v-if="$route.name != 'login' && $route.name != 'forget'" />

		<router-view/>
	</div>
</template>
<script>
	// @ is an alias to /src
	import Header from '@/components/header.vue'
	import Aside from '@/components/aside.vue'

	export default {
		name: 'app',
		components: {
			Header,
			Aside
		}
	}
</script>
<style>
	@import './assets/baseCss.css';
</style>
