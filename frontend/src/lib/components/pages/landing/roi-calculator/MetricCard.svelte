<script lang="ts">
	import type { SvelteComponent, ComponentType } from 'svelte';
	import { Info, type Icon as IconType } from 'lucide-svelte';

	export let icon: ComponentType<IconType>;
	export let title: string;
	export let value: number;
	export let unit: string = '';
	export let description: string;
	export let source: string;
	export let isCurrency: boolean = false;

	$: formattedValue = isCurrency
		? `₹${Math.round(value).toLocaleString('en-IN')}`
		: `${Math.round(value).toLocaleString()}${unit}`;
</script>

<div class="metric-card">
	<div class="card-header">
		<div class="icon-wrapper">
			<svelte:component this={icon} size={24} />
		</div>
		<div class="tooltip-wrapper">
			<Info size={16} />
			<span class="tooltip-text">{source}</span>
		</div>
	</div>
	<h3>{title}</h3>
	<p class="value">{formattedValue}</p>
	<p class="description">{description}</p>
</div>

<style>
	.metric-card {
		background: var(--background-light);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		border: var(--border-subtle);
		display: flex;
		flex-direction: column;
		text-align: left;
		height: 100%;
		transition: var(--transition-medium);
	}

	.metric-card:hover {
		transform: translateY(-4px);
		border-color: var(--primary-accent);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.icon-wrapper {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(167, 218, 219, 0.1);
		color: var(--primary-accent);
	}

	h3 {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.value {
		font-family: var(--font-heading);
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--primary-accent);
		margin-bottom: 0.75rem;
	}

	.description {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
		flex-grow: 1;
	}

	.tooltip-wrapper {
		position: relative;
		color: var(--text-muted);
	}

	.tooltip-wrapper .tooltip-text {
		visibility: hidden;
		width: 220px;
		background-color: var(--container-bg);
		color: var(--text-primary);
		text-align: center;
		border-radius: var(--radius-md);
		padding: var(--space-md);
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		margin-left: -110px;
		opacity: 0;
		transition: opacity 0.3s;
		font-size: 0.875rem;
		border: var(--border-subtle);
		box-shadow: var(--shadow-lg);
	}

	.tooltip-wrapper:hover .tooltip-text {
		visibility: visible;
		opacity: 1;
	}
</style>
