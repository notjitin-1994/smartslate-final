<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let isOpen = false;
	export let title: string;
	export let formFields: { name: string; label: string; type: string }[];

	const dispatch = createEventDispatcher();

	let formData: { [key: string]: string } = {};

	function closeModal() {
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	function handleSubmit() {
		// In a real application, you would handle form submission here,
		// likely sending the formData to a backend API.
		console.log('Form submitted:', formData);
		alert(`Thank you for your interest! We have received your submission for "${title}".`);
		closeModal();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div
		class="modal-backdrop"
		on:click={closeModal}
		transition:fade={{ duration: 200 }}
		role="button"
		tabindex="-1"
		aria-label="Close modal"
	></div>

	<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" transition:fly={{ y: 50, duration: 300, easing: quintOut }}>
		<header class="modal-header">
			<h2 id="modal-title" class="modal-title">{title}</h2>
			<button class="close-button" on:click={closeModal} aria-label="Close">
				&times;
			</button>
		</header>
		<div class="modal-body">
			<form on:submit|preventDefault={handleSubmit}>
				{#each formFields as field}
					<div class="form-group">
						<label for={field.name}>{field.label}</label>
						<input
							type={field.type}
							id={field.name}
							name={field.name}
							bind:value={formData[field.name]}
							required
						/>
					</div>
				{/each}
				<button type="submit" class="submit-button">Submit</button>
			</form>
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
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(5px);
		z-index: 999;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		max-width: 500px;
		background-color: var(--background);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		z-index: 1000;
		overflow: hidden;
		border: var(--border-subtle);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-lg);
		border-bottom: var(--border-subtle);
	}

	.modal-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	.modal-body {
		padding: var(--space-lg);
	}

	.form-group {
		margin-bottom: var(--space-lg);
	}

	.form-group label {
		display: block;
		margin-bottom: var(--space-sm);
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.form-group input {
		width: 100%;
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: var(--border-subtle);
		background-color: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
		font-size: 1rem;
	}

	.submit-button {
		width: 100%;
		padding: var(--space-md);
		background-color: var(--brand-accent-color-2);
		color: #ffffff;
		border: none;
		border-radius: var(--radius-md);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition-fast);
	}

	.submit-button:hover {
		background-color: var(--button-primary-hover-bg);
	}
</style>