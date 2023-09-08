<template>
	<NuxtLayout name="default">
		<div class="main-page">
			<section class="container">
				<ProgressBar :stages="computedData" />
			</section>
			<section class="container">
				<ProgressEditor @reset="fetchResults" />
			</section>
		</div>
	</NuxtLayout>
</template>

<script setup>
import ProgressBar from '~/components/ProgressBar.vue';
import ProgressEditor from '~/components/ProgressEditor.vue';

import { usePlayersStore, useMainStore } from '~/store';

const instance = getCurrentInstance();

const playersStore = usePlayersStore();
const mainStore    = useMainStore();

const computedData = computed(() =>
{
	return playersStore.results.map((stage) =>
	{
		const gameData = getGamesData(stage.games);

		return {
			id: stage.id,
			thresholdPoints: stage.thresholdPoints,
			...gameData,
		};
	});
});

const fetchResults = async () =>
{
	mainStore.enableLoading(instance.uid);

	await playersStore.fetchResults();

	mainStore.disableLoading(instance.uid);
};

fetchResults();

useHead({
	title: 'div. - тестовое задание',
});
</script>

<style lang="scss">
	.main-page
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		grid-gap: 40px;
		min-height: 100vh;
		max-width: 1280px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
