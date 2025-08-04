import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

const createToastStore = () => {
	const { subscribe, update } = writable<Toast[]>([]);

	const addToast = (message: string, type: ToastType = 'info') => {
		const newToast: Toast = {
			id: Date.now(),
			message,
			type
		};
		update((toasts) => [...toasts, newToast]);
		setTimeout(() => {
			removeToast(newToast.id);
		}, 5000); // Auto-dismiss after 5 seconds
	};

	const removeToast = (id: number) => {
		update((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	return {
		subscribe,
		add: addToast,
		remove: removeToast
	};
};

export const toastStore = createToastStore();
