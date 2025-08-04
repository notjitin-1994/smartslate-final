import { writable } from 'svelte/store';

function createModalStore() {
	const { subscribe, set } = writable(false);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false)
	};
}

export const solaraInterestModalStore = createModalStore();