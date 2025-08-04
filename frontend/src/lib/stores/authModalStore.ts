import { writable } from 'svelte/store';

/**
 * A writable Svelte store to control the visibility of the authentication modal.
 *
 * @property {boolean} isOpen - If true, the modal is visible. Defaults to false.
 */
export const authModalStore = writable({
	isOpen: false,
	view: 'login' as 'login' | 'register',
	title: '',
	subtitle: ''
});
