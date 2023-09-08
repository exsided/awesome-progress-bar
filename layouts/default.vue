<template>
	<div class="layout">
		<slot />
		<MainLoader />
	</div>
</template>

<script setup>
import MainLoader from '~/components/MainLoader.vue';
</script>

<style lang="scss">
</style>
