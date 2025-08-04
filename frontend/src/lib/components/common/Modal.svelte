<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	export let isOpen: boolean = false;
	export let variant: 'light' | 'dark' = 'light';
	export let title: string = '';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isOpen && event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="modal-backdrop"
		on:click={closeModal}
		transition:fade={{ duration: 200 }}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="modal-content"
			class:dark={variant === 'dark'}
			role="dialog"
			aria-modal="true"
			on:click|stopPropagation
			transition:fly={{ y: 50, duration: 300 }}
		>
			<button class="modal-close-button" on:click={closeModal} aria-label="Close modal">
				{#if variant === 'dark'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg
					>
				{:else}
					&times;
				{/if}
			</button>
			{#if title}
				<h2 class="modal-title">{title}</h2>
			{/if}
			<div class="modal-body">
				<slot />
			</div>
			<div class="modal-footer">
				<slot name="footer" />
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		padding: 1rem;
		overflow-y: auto;
	}

	.modal-content {
		background: white;
		color: #1a202c;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		position: relative;
		max-height: calc(100vh - 4rem);
		overflow-y: auto;
		width: 100%;
		max-width: 500px; /* Max width for desktop */
		margin: 2rem auto;
		display: flex;
		flex-direction: column;
	}


	.modal-close-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		border: none;
		background: transparent;
		font-size: 1.5rem;
		cursor: pointer;
		line-height: 1;
		padding: 0.5rem;
		color: #1a202c;
	}

	/* Dark Variant Styles */
	.modal-content.dark {
		background-color: #1a202c;
		color: var(--text-primary);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		max-width: 480px;
		box-shadow: var(--shadow-lg);
		border: var(--border-subtle);
	}

	.dark .modal-close-button {
		color: var(--text-secondary);
		top: var(--space-md);
		right: var(--space-md);
		padding: var(--space-xs);
		line-height: 0;
	}

	.dark .modal-close-button:hover {
		color: var(--text-primary);
	}

	/* Mobile responsive styles */
	@media (max-width: 768px) {
		.modal-backdrop {
			padding: 0.5rem;
		}

		.modal-content {
			max-height: calc(100vh - 2rem);
			margin: 1rem auto;
			padding: 1.5rem;
			max-width: calc(100vw - 2rem);
		}

		.modal-body {
			max-height: calc(100vh - 8rem);
			overflow-y: auto;
		}

		.modal-title {
			font-size: 1.25rem;
			margin-bottom: 1rem;
		}
		
		.modal-footer {
			position: sticky;
			bottom: 0;
			background: inherit;
			padding-top: 1rem;
			border-top: 1px solid var(--border-color, #e2e8f0);
			margin-top: auto;
		}
	}
</style>