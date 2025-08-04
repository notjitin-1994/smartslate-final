import { writable } from 'svelte/store';

export const mobileMenuStore = writable({
	isOpen: false
});
