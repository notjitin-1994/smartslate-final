<script lang="ts">
	import { toastStore, type Toast } from '$lib/stores/toastStore';
	import { fly } from 'svelte/transition';

	export let toast: Toast;

	const typeClasses = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		info: 'bg-blue-500'
	};

	const icons = {
		success: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
		error: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
		info: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
	};
</script>

<div
	in:fly={{ y: 50, duration: 300 }}
	out:fly={{ y: 50, duration: 200 }}
	class="toast {typeClasses[toast.type]}"
>
	<div class="icon">
		{@html icons[toast.type]}
	</div>
	<p class="message">{toast.message}</p>
	<button
		class="close-button"
		on:click={() => toastStore.remove(toast.id)}
		aria-label="Close notification"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		color: white;
		box-shadow: var(--shadow-lg);
		margin-bottom: var(--space-md);
		min-width: 300px;
	}
	.icon {
		margin-right: var(--space-md);
	}
	.message {
		flex-grow: 1;
		margin: 0;
	}
	.close-button {
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		padding: 0;
		opacity: 0.7;
		transition: opacity var(--transition-fast);
	}
	.close-button:hover {
		opacity: 1;
	}
</style>
