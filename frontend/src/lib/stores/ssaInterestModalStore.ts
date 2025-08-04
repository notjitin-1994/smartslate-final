import { writable } from 'svelte/store';

const createModalStore = () => {
	const { subscribe, set } = writable(false);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false)
	};
};

export const ssaInterestModalStore = createModalStore();