<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let isVisible = false;

	const gdpLoss = tweened(0, { duration: 1500, easing: cubicOut });
	const productivityDip = tweened(0, { duration: 1500, easing: cubicOut });

	onMount(() => {
		const timer = setTimeout(() => {
			isVisible = true;
			gdpLoss.set(2.5);
			productivityDip.set(15);
		}, 300);
		return () => clearTimeout(timer);
	});
</script>

<div class="infographic-content">
	<h4>The Economic Impact</h4>
	<p class="subtitle">
		The talent paradox isn't just an academic problem; it has tangible economic consequences that
		affect national growth and innovation.
	</p>

	{#if isVisible}
		<div class="stats-grid">
			<div class="stat-card" in:fly={{ y: 20, delay: 200, duration: 500 }}>
				<div class="stat-value">
					<span class="value">{$gdpLoss.toFixed(1)}</span>
					<span class="unit">Trillion</span>
				</div>
				<div class="stat-label">Projected GDP Loss by 2030</div>
				<p class="stat-description">
					Failure to bridge the skills gap could cost India trillions in lost GDP, hindering its
					path to becoming a global economic powerhouse.
				</p>
			</div>

			<div class="stat-card" in:fly={{ y: 20, delay: 400, duration: 500 }}>
				<div class="stat-value">
					<span class="value">{$productivityDip.toFixed(0)}%</span>
					<span class="unit">Decline</span>
				</div>
				<div class="stat-label">In Innovation & Productivity</div>
				<p class="stat-description">
					A workforce unable to keep pace with technological change leads to a direct decline in
					productivity and a nation's capacity for innovation.
				</p>
			</div>
		</div>
	{/if}
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
		margin-bottom: 2.5rem;
		max-width: 60ch;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.stat-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 2rem;
		text-align: center;
	}

	.stat-value {
		margin-bottom: 1rem;
		color: var(--primary-accent);
	}

	.stat-value .value {
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1;
	}

	.stat-value .unit {
		font-size: 1.25rem;
		font-weight: 500;
		margin-left: 0.5rem;
		color: var(--primary-accent-light);
	}

	.stat-label {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.stat-description {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}
</style>
