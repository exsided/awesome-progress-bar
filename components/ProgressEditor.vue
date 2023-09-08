<template>
	<div class="progress-editor">
		<div class="progress-editor__header">
			<h2 class="progress-editor__header-title">
				Таблица с результатами
			</h2>
			<button
				class="button button--red"
				@click="reset"
			>
				RESET
			</button>
		</div>
		<div class="progress-editor__table">
			<template
				v-for="stage in playersStore.results"
			>
				<div
					v-for="game, i in stage.games"
					:key="`stage-${stage.id}-game-${i}`"
					class="progress-editor__table-row"
				>
					<div class="progress-editor__table-cell">
						{{ stage.name }}
					</div>
					<div class="progress-editor__table-cell">
						{{ game.name }}
					</div>
					<div class="progress-editor__table-cell">
						<Checkbox v-model="game.isPlayed" />
					</div>
					<div class="progress-editor__table-cell">
						<UiCounter
							v-model="game.bestResult"
							:min="0"
						/>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
import UiCounter from '~/components/UI/Counter.vue';
import Checkbox from '~/components/UI/Checkbox.vue';

import { usePlayersStore } from '~/store';

const emit = defineEmits(['reset']);

const playersStore = usePlayersStore();

const reset = () => emit('reset');
</script>

<style lang="scss">
	.progress-editor__header
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40px;
	}
	.progress-editor__header-title
	{
		margin: 0;
	}
	.progress-editor__table-row
	{
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		align-items: center;
		padding: 10px 30px;
		background-color: $c-gray;

		@include transition();

		&:hover
		{
			background-color: $c-white;
			box-shadow: 0px 0px 13px 0px rgba(93, 95, 107, 0.10);
		}

		&:first-child
		{
			border-radius: 15px 15px 0 0;
		}
		&:last-child
		{
			border-radius: 0 0 15px 15px;
		}
	}
</style>
