<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let heading: string;
	export let tagline: string;
	export let description: string;
	export let features: { icon: string; text: string }[];
	export let oneLinerFeatures: { icon: string; text: string }[] | undefined = undefined;
	export let cta: { text: string; link?: string; icon?: string };
	export let secondaryCta: { text: string; link: string } | undefined = undefined;
	export let reverse = false;
	export let status: 'live' | 'coming-soon' = 'live';
</script>

<section class="product-section" class:reverse class:coming-soon={status === 'coming-soon'}>
	{#if status === 'coming-soon'}
		<div class="coming-soon-badge">Coming Soon</div>
	{/if}
	<div class="details-main">
		<h2>{heading}</h2>
		<p class="tagline">{tagline}</p>
		<p class="description">
			{@html description}
		</p>
	</div>

	<dl class="features" class:one-liner-features={oneLinerFeatures}>
		{#if oneLinerFeatures}
			{#each oneLinerFeatures as feature}
				<div class="feature" transition:fade>
					<div class="icon-wrapper">
						{@html feature.icon}
					</div>
					<p>{@html feature.text}</p>
				</div>
			{/each}
		{:else}
			{#each features as feature}
				<div class="feature" transition:fade>
					<div class="icon-wrapper">
						{@html feature.icon}
					</div>
					<p>{@html feature.text}</p>
				</div>
			{/each}
		{/if}
	</dl>

	<div class="cta-wrapper">
		<button
			on:click={() => (cta.link ? (window.location.href = cta.link) : dispatch('ctaClick'))}
			class="btn btn-primary"
		>
			<span>{cta.text}</span>
			{#if cta.icon}
				<span class="arrow">
					{@html cta.icon}
				</span>
			{/if}
		</button>
		{#if secondaryCta}
			<a href={secondaryCta.link} class="btn btn-secondary">
				<span>{secondaryCta.text}</span>
				<span class="arrow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						></path>
					</svg>
				</span>
			</a>
		{/if}
	</div>
	<div class="visual" class:has-content={$$slots.visual}>
		<slot name="visual" />
	</div>
</section>

<style>
	.product-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto 1fr;
		grid-template-areas:
			'details-main visual'
			'features visual'
			'cta-wrapper visual';
		gap: var(--space-xxl);
		padding: var(--space-xxl) 0;
	}

	.product-section.reverse {
		grid-template-areas:
			'visual details-main'
			'visual features'
			'visual cta-wrapper';
	}

	.details-main {
		grid-area: details-main;
	}

	.features {
		grid-area: features;
	}

	.cta-wrapper {
		grid-area: cta-wrapper;
		align-self: start;
	}

	.visual {
		grid-area: visual;
	}

	h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.tagline {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary-accent);
		margin-bottom: var(--space-lg);
	}

	.description {
		font-size: 1.1rem;
		color: var(--text-secondary);
		max-width: 60ch;
	}

	.features {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.one-liner-features .feature {
		align-items: center;
	}

	.one-liner-features .feature p {
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.icon-wrapper {
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		background-color: var(--container-bg);
		color: var(--primary-accent);
		border: 1px solid var(--border-color);
	}

	.icon-wrapper :global(svg) {
		width: 24px;
		height: 24px;
	}

	.feature p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.cta-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.arrow {
		display: flex;
		align-items: center;
	}

	.arrow :global(svg) {
		width: 18px;
		height: 18px;
	}

	.arrow :global(.book-icon) {
		transition: transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease;
	}

	.btn:hover .arrow :global(.book-icon),
	.btn:active .arrow :global(.book-icon) {
		fill: #14b8a6;
		stroke: #A7F3D0;
		transform: scale(1.1);
	}

	.arrow :global(.static-icon) {
		animation: none;
	}

	.arrow :global(.gear-icon) {
		transition: transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease;
	}

	.btn:hover .arrow :global(.gear-icon),
	.btn:active .arrow :global(.gear-icon) {
		transform: scale(1.1);
		stroke: #ffc107;
		filter: drop-shadow(0 0 5px rgba(255, 193, 7, 0.7));
	}

	.arrow :global(.heart-icon) {
		animation: none;
		transition: transform 0.3s ease, fill 0.3s ease;
	}

	.btn:hover .arrow :global(.heart-icon) {
		transform: scale(1.1);
		fill: #ef4444;
		stroke: #ef4444;
		filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.7));
	}


	@keyframes flip-page {
		0% {
			transform: perspective(400px) rotateY(0deg);
		}
		50% {
			transform: perspective(400px) rotateY(20deg);
		}
		100% {
			transform: perspective(400px) rotateY(0deg);
		}
	}


	.visual {
		display: none;
	}

	.visual.has-content {
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		background: linear-gradient(145deg, var(--background-light), var(--container-bg));
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-lg);
	}

	.product-section.coming-soon {
		position: relative;
		overflow: hidden;
	}

	.product-section.coming-soon .tagline {
		color: #ffc107;
	}

	.coming-soon-badge {
		position: absolute;
		top: var(--space-lg);
		right: var(--space-lg);
		z-index: 10;
		background-color: #ffc107; /* A vibrant yellow */
		color: #000;
		padding: var(--space-xs) var(--space-md);
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: uppercase;
		box-shadow: var(--shadow-lg);
	}

	@media (max-width: 768px) {
		.product-section,
		.product-section.reverse {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			grid-template-areas:
				'details-main'
				'visual'
				'features'
				'cta-wrapper';
		}

		.visual.has-content {
			display: flex;
		}
	}
</style>