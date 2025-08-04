<script lang="ts">
	import { onMount } from 'svelte';

	let element: HTMLElement;
	let visible = false;
	export let source: string;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div class="infographic-container" bind:this={element}>
	<div class="chart-container">
		<div class="grid">
			{#each Array(100) as _, i}
				<div
					class="cell"
					class:ready={i < 43}
					class:visible
					style="--delay: {i * 0.01}s"
				></div>
			{/each}
		</div>
	</div>
	<div class="label" class:visible>
		Only <span>43%</span> of graduates are considered truly job-ready.
	</div>
</div>

<style>
	.infographic-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
		margin: var(--space-xl) 0;
		padding: var(--space-lg);
		background: rgba(15, 23, 42, 0.6);
		border-radius: var(--border-radius-lg);
	}

	.chart-container {
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 4px;
	}

	.cell {
		width: 100%;
		padding-bottom: 100%; /* Creates a square aspect ratio */
		background-color: var(--color-background-secondary);
		border-radius: 2px;
		opacity: 0;
		transform: scale(0.5);
		transition:
			transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
			background-color 0.5s ease,
			opacity 0.5s ease;
		transition-delay: var(--delay);
	}

	.cell.visible {
		opacity: 1;
		transform: scale(1);
	}

	.cell.ready {
		background-color: var(--primary-accent);
	}

	.label {
		font-size: var(--font-size-lg);
		font-weight: bold;
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
		transition-delay: 1s; /* Delay label appearance */
	}

	.label.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.label span {
		color: var(--secondary-accent);
	}
</style>