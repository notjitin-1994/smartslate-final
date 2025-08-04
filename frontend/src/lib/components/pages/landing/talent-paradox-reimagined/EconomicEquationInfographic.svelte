<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let element: HTMLElement;
	let visible = false;
	export let source: string;

	const number1 = tweened(0, { duration: 2000, easing: cubicOut });
	const number2 = tweened(0, { duration: 2000, easing: cubicOut });

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					number1.set(570);
					number2.set(29);
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
	<div class="card" class:visible>
		<div class="card-content">
			<div class="data-viz">
				<span class="symbol">$</span>{Math.round($number1)}<span class="unit">Billion</span>
			</div>
			<div class="label">Untapped Annual Revenue</div>
			<div class="sub-text">AWS study on digital skills gap</div>
		</div>
		<div class="card-background"></div>
	</div>
	<div class="card" class:visible style="transition-delay: 0.2s;">
		<div class="card-content">
			<div class="data-viz">{Math.round($number2)}<span class="unit">%</span></div>
			<div class="label">Productivity Drag</div>
			<div class="sub-text">Gallup report on employee development</div>
		</div>
		<div class="card-background"></div>
	</div>
</div>

<style>
	.infographic-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-xl);
		margin: var(--space-xl) 0;
	}

	.card {
		position: relative;
		border-radius: var(--border-radius-lg);
		overflow: hidden;
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.card.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card-content {
		position: relative;
		z-index: 2;
		padding: var(--space-xl);
		text-align: center;
		background: rgba(15, 23, 42, 0.6);
		backdrop-filter: blur(10px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
	}

	.card-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(
			circle at top left,
			var(--primary-accent),
			transparent 70%
		);
		opacity: 0;
		transform: scale(1.5);
		transition:
			opacity 1s ease-in-out,
			transform 1s ease-in-out;
	}

	.card.visible .card-background {
		opacity: 1;
		transform: scale(1);
	}

	.data-viz {
		font-size: 4rem;
		font-weight: 800;
		color: var(--color-text-light);
		margin-bottom: var(--space-sm);
		line-height: 1;
	}

	.data-viz .symbol {
		font-size: 2rem;
		color: var(--secondary-accent);
		vertical-align: super;
	}

	.data-viz .unit {
		font-size: 1.5rem;
		color: var(--color-text-muted);
		margin-left: 0.25em;
	}

	.label {
		font-size: var(--font-size-md);
		font-weight: bold;
		margin-bottom: var(--space-xs);
	}

	.sub-text {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}
	@media (max-width: 768px) {
		.infographic-container {
			grid-template-columns: 1fr;
		}
		.data-viz {
			font-size: 3rem;
		}

		.data-viz .symbol {
			font-size: 1.5rem;
		}

		.data-viz .unit {
			font-size: 1rem;
		}

		.label {
			font-size: var(--font-size-sm);
		}

		.sub-text {
			font-size: var(--font-size-xs);
		}
	}
</style>