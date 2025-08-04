<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let provider: 'Google' | 'Microsoft' | 'SSO';
	export let icon: string;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class="social-button" {disabled} on:click={handleClick}>
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		{@html icon}
	</svg>
	<span>{provider}</span>
</button>

<style>
	.social-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		width: 100%;
		padding: var(--space-md);
		background-color: transparent;
		border: var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.9rem;
		cursor: pointer;
		transition: var(--transition-fast);
	}

	.social-button:hover:not(:disabled) {
		background-color: rgba(255, 255, 255, 0.05);
		border-color: var(--primary-accent);
	}

	.social-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
