<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Container from '$lib/components/pages/common/Container.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import AnimatedButton from '$lib/components/common/animated-button.svelte';
	import BrandAnimatedBackground from '$lib/components/pages/landing/BrandAnimatedBackground.svelte';

	const dispatch = createEventDispatcher();

	const titleWords = [
		'Build',
		'Your',
		'<span class="accent">Future-Ready Workforce</span>'
	];
	const fullTitleForAria = 'Build Your Future-Ready Workforce';

	let readyToAnimate = false;
	let finalColorChange = false;
	onMount(() => {
		// Timeout ensures styles are applied before class is added, allowing transition to run.
		setTimeout(() => {
			readyToAnimate = true;
		}, 100);

		// Trigger for the final color change, synced with the button reveal.
		setTimeout(() => {
			finalColorChange = true;
		}, 3100);
	});
</script>

<section>
	<BrandAnimatedBackground
		backgroundColor="var(--background-dark)"
		particleColor="var(--primary-accent)"
		linkColor="var(--secondary-accent)"
	/>
	<Container>
		<div class="content" class:animate-in={readyToAnimate}>
			<h1 aria-label={fullTitleForAria} class:final-color={finalColorChange}>
				{#each titleWords as word, index}
					<span class="word-wrapper">
						<span class="word" style="transition-delay: {index * 400}ms">{@html word}</span>
					</span>
				{/each}
			</h1>
			<p class="fade-in" style="transition-delay: 1600ms;">
				India is on the cusp of a major economic expansion, fueled by its vibrant young population.
				However, a
				<strong>significant skills gap</strong> threatens progress—companies need
				<strong>job-ready talent</strong> but emerging professionals aren't yet prepared.
			</p>
			<p class="fade-in" style="transition-delay: 2100ms;">
				The future of business is being written in India, yet a <strong>silent crisis</strong>
				threatens to derail it all. Millions of ambitious individuals are entering the workforce, but
				they lack the specific, critical skills your company needs to innovate and compete. This
				<strong>talent paradox</strong> isn't just a statistic—it's a
				<strong>direct threat to your bottom line and future success</strong>.
			</p>
			<div class="fade-in" style="transition-delay: 3100ms;">
				<AnimatedButton
					text="Uncover the Crisis"
					icon={ChevronDown}
					animatedIcon={true}
					on:click={() => dispatch('revealNext')}
				/>
			</div>
		</div>
	</Container>
</section>

<style>
	section {
		position: relative;
		min-height: 60vh;
		display: flex;
		align-items: center;
		padding: var(--space-xl) 0;
		overflow: hidden;
	}

	.content {
		width: 100%;
		text-align: left;
		z-index: 1; /* Ensures content is above the background */
		position: relative; /* Required for z-index to take effect */
		background-color: rgba(9, 21, 33, 0.25); /* Semi-transparent background for the glass effect */
		backdrop-filter: blur(12px); /* The core of the glassmorphism effect */
		-webkit-backdrop-filter: blur(12px); /* Vendor prefix for Safari support */
		border: var(--border-subtle);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		padding: var(--space-xl);
	}

	h1 {
		font-size: 3rem;
		margin-bottom: var(--space-lg);
		max-width: none;
		color: white;
	}

	.word-wrapper {
		display: inline-block;
		vertical-align: bottom; /* Aligns all wrappers to the same baseline */
	}

	.word {
		display: inline-block;
		opacity: 0;
		transform: translateX(-20px);
		transition:
			opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		padding-right: 0.25em; /* space between words */
	}

	.animate-in .word {
		opacity: 1;
		transform: translateX(0);
	}

	.accent {
		color: var(--primary-accent);
	}

	/* Use :global() because the .accent span is rendered with @html and is not scoped by Svelte */
	.final-color :global(.accent) {
		color: var(--brand-accent-color-1);
		transition: color 0.8s ease-in-out;
	}

	p {
		font-size: 1.1rem;
		margin-bottom: var(--space-md);
		max-width: none;
		color: var(--text-secondary);
	}

	strong {
		color: var(--text-primary);
		font-weight: 700;
	}

	.fade-in {
		opacity: 0;
		transform: translateY(15px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	.animate-in .fade-in {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.word,
		.fade-in {
			transform: none;
			opacity: 1;
			transition: none;
		}
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2.5rem;
		}
		p {
			font-size: 1rem;
		}
		.content {
			padding: var(--space-lg);
		}
	}

	@media (max-width: 480px) {
		.content {
			padding: var(--space-md);
		}
	}
</style>
