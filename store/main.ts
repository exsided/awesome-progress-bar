import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
	state: () => ({
		loadingUids: [],
	}),

	actions:
	{
		enableLoading(uid: Number)
		{
			this.loadingUids.push(uid);
		},
		disableLoading(uid: Number)
		{
			this.loadingUids = this.loadingUids.filter(el => el !== uid);
		},
	}
});
