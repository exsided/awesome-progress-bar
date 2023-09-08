import { defineStore } from 'pinia';

export const usePlayersStore = defineStore('players', {
	state: () => ({
		results: [],
	}),

	actions:
	{
		async fetchResults()
		{
			const { data, error } = await useFetch('/api/player-result');

			if (error.value)
				return;

			this.results = data.value;
		},
	}
});
