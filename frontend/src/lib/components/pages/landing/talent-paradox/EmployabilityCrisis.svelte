<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isVisible = false;

	onMount(() => {
		// In a real app, you'd use an intersection observer.
		// For this component, we'll trigger it on mount.
		const timer = setTimeout(() => {
			isVisible = true;
		}, 300); // Short delay to allow the main section to render

		return () => clearTimeout(timer);
	});

	const totalCandidates = 100;
	const employableCount = 43;

	const candidates = Array.from({ length: totalCandidates }, (_, i) => ({
		id: i,
		isEmployable: i < employableCount
	}));
</script>

<div class="infographic-content">
	<h4>The Employability Crisis</h4>
	<p class="subtitle">
		Only <span class="highlight">{employableCount}%</span> of graduates are considered truly job-ready,
		revealing a major gap between education and industry expectations.
	</p>

	{#if isVisible}
		<div class="grid-container">
			{#each candidates as candidate, i (candidate.id)}
				<div
					class="candidate-dot"
					class:employable={candidate.isEmployable}
					in:fade={{ duration: 500, delay: i * 15 }}
				></div>
			{/each}
		</div>
	{/if}

	<div class="legend">
		<div class="legend-item">
			<span class="legend-dot employable"></span>
			<span>{employableCount}% Job-Ready</span>
		</div>
		<div class="legend-item">
			<span class="legend-dot"></span>
			<span>{100 - employableCount}% Needs Upskilling</span>
		</div>
	</div>
</div>

<style>
	.infographic-content {
		background-color: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		padding: 2.5rem;
		min-height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	h4 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.subtitle {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
		max-width: 50ch;
	}

	.highlight {
		color: var(--primary-accent);
		font-weight: 600;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.candidate-dot {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background-color: var(--border-color);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.candidate-dot.employable {
		background-color: var(--primary-accent);
		border-color: var(--primary-accent);
	}

	.legend {
		display: flex;
		justify-content: center;
		gap: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--border-color);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.legend-dot.employable {
		background-color: var(--primary-accent);
		border-color: var(--primary-accent);
	}
</style>
