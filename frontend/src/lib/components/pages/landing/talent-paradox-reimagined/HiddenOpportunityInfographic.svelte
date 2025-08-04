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
		<div class="waffle-chart">
			{#each Array(100) as _, i}
				<div
					class="person-icon"
					class:visible
					class:seeking={i < 97}
					style="--delay: {Math.random() * 0.5}s"
				>
					<svg viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
						/>
					</svg>
				</div>
			{/each}
		</div>
	</div>
	<div class="label" class:visible>
		An overwhelming <span>97%</span> of young professionals actively seek on-the-job training.
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
	}

	.waffle-chart {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--space-sm);
	}

	.person-icon {
		color: var(--color-background-secondary);
		opacity: 0;
		transform: translateY(20px);
		transition:
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			color 0.6s ease,
			opacity 0.6s ease;
		transition-delay: var(--delay);
	}

	.person-icon.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.person-icon.seeking {
		color: var(--primary-accent);
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