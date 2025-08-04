<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import {
		School,
		Building,
		ArrowRight,
		Lightbulb,
		BarChart,
		Users,
		Zap,
		PlusCircle,
		MinusCircle
	} from 'lucide-svelte';
	import Container from '$lib/components/pages/common/Container.svelte';
	import { contactUsModalStore } from '$lib/stores/contactUsModalStore';
	import { demoModalStore } from '$lib/stores/demoModalStore';

	type PartnerType = 'institutions' | 'businesses';

	let revealed: Partial<Record<PartnerType, boolean>> = {};

	function toggle(section: PartnerType) {
		revealed[section] = !revealed[section];
	}

	const content = {
		institutions: {
			title: 'For Educational Institutions',
			pitch: 'Stand out by embedding real-world, in-demand skills directly into your curriculum.',
			benefits: [
				{ icon: School, text: 'Industry-Informed Curriculum' },
				{ icon: Zap, text: 'AI-Powered Learning' },
				{ icon: Users, text: 'Enhanced Graduate Employability' }
			],
			cta: 'Explore Our Programs'
		},
		businesses: {
			title: 'For Business Leaders',
			pitch:
				'Stop the endless search for the perfect hire and start cultivating the skills you need.',
			benefits: [
				{ icon: Lightbulb, text: 'Targeted Upskilling at Scale' },
				{ icon: BarChart, text: 'AI-Driven Performance Insights' },
				{ icon: Users, text: 'Boost Retention & Innovation' }
			],
			cta: 'Schedule a Demo'
		}
	};
</script>

<section class="partners-section">
	<Container>
		<div class="section-header">
			<h2>Who We <span class="accent-animate">Partner</span> With</h2>
			<p>
				We collaborate with forward-thinking organizations to build the future of education and
				workforce development.
			</p>
		</div>

		<div class="accordion-wrapper">
			<!-- Institutions Section -->
			<div class="subsection">
				<button
					class="section-header interactive"
					class:revealed={revealed.institutions}
					on:click={() => toggle('institutions')}
				>
					<div class="header-content">
						<h3>
							<span class="accent-animate">{content.institutions.title}</span>
						</h3>
						<p>{content.institutions.pitch}</p>
					</div>
					<div class="icon-wrapper">
						{#if revealed.institutions}
							<MinusCircle />
						{:else}
							<PlusCircle />
						{/if}
					</div>
				</button>
				{#if revealed.institutions}
					<div
						class="content-body"
						transition:slide|local={{ duration: 500, easing: quintOut }}
					>
						<ul class="benefits-list">
							{#each content.institutions.benefits as benefit}
								<li>
									<svelte:component this={benefit.icon} size={22} />
									<span>{benefit.text}</span>
								</li>
							{/each}
						</ul>
						<div class="cta-wrapper">
							<button class="cta-button primary">
								{content.institutions.cta}
								<ArrowRight size={16} class="animated-icon" />
							</button>
							<button
								class="cta-button secondary"
								on:click={() => contactUsModalStore.openModal('Educational Institution')}>Contact Us</button
							>
						</div>
					</div>
				{/if}
			</div>

			<!-- Businesses Section -->
			<div class="subsection">
				<button
					class="section-header interactive"
					class:revealed={revealed.businesses}
					on:click={() => toggle('businesses')}
				>
					<div class="header-content">
						<h3>
							<span class="accent-animate">{content.businesses.title}</span>
						</h3>
						<p>{content.businesses.pitch}</p>
					</div>
					<div class="icon-wrapper">
						{#if revealed.businesses}
							<MinusCircle />
						{:else}
							<PlusCircle />
						{/if}
					</div>
				</button>
				{#if revealed.businesses}
					<div
						class="content-body"
						transition:slide|local={{ duration: 500, easing: quintOut }}
					>
						<ul class="benefits-list">
							{#each content.businesses.benefits as benefit}
								<li>
									<svelte:component this={benefit.icon} size={22} />
									<span>{benefit.text}</span>
								</li>
							{/each}
						</ul>
						<div class="cta-wrapper">
							<button class="cta-button primary" on:click={() => demoModalStore.open()}>
								{content.businesses.cta}
								<ArrowRight size={16} class="animated-icon" />
							</button>
							<button
								class="cta-button secondary"
								on:click={() => contactUsModalStore.openModal('Business Leader')}>Contact Us</button
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</Container>
</section>

<style>
	.partners-section {
		background-color: var(--color-background-dark);
		color: var(--color-text-light);
		padding: var(--space-xxl) 0;
		border-top: 1px solid var(--color-border-subtle);
	}

	.section-header {
		text-align: left;
		margin-bottom: var(--space-lg);
	}

	.section-header.interactive {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: var(--space-md);
		border-radius: var(--border-radius-md);
		transition: var(--transition-fast);
		width: 100%;
		background-color: transparent;
		border: none;
		text-align: left;
		color: inherit; /* Keep inherit to not affect children by default */
		font-family: inherit;
		cursor: pointer;
	}

	.section-header.interactive:hover {
		background-color: var(--secondary-accent);
		color: var(--text-primary); /* Change children color on hover */
		border-color: var(--secondary-accent);
	}

	.section-header.interactive.revealed {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		margin-bottom: -1px;
	}

	.header-content {
		flex-grow: 1;
	}

	.icon-wrapper {
		flex-shrink: 0;
		margin-left: var(--space-lg);
		color: var(--primary-accent);
		transition: transform 0.3s ease-in-out;
		cursor: pointer;
		animation: pulse-glow 2s infinite ease-in-out;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			filter: drop-shadow(0 0 4px rgba(167, 218, 219, 0.5));
		}
		50% {
			filter: drop-shadow(0 0 8px rgba(167, 218, 219, 0.9));
		}
	}

	.section-header h2 {
		font-size: 3rem;
		margin-bottom: var(--space-md);
		color: var(--text-primary);
		font-weight: 700;
	}

	.section-header h3 {
		font-size: 1.75rem;
		margin-bottom: var(--space-sm);
		color: var(--text-primary);
		font-weight: 600;
	}

	.section-header p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 75ch;
		margin-top: 0;
	}

	.subsection {
		margin-bottom: var(--space-lg);
		border-radius: var(--border-radius-lg);
		overflow: hidden;
	}
	.subsection:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.accent-animate {
		color: var(--text-primary);
		transition: color 0.5s ease-in-out;
	}

	.interactive.revealed .accent-animate,
	.section-header:not(.interactive) .accent-animate {
		color: var(--primary-accent);
	}

	.content-body {
		padding: var(--space-lg) var(--space-md);
		border: none;
		border-bottom-left-radius: var(--border-radius-md);
		border-bottom-right-radius: var(--border-radius-md);
	}

	.benefits-list {
		list-style: none;
		padding: 0;
		margin: 0 0 var(--space-xl) 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.benefits-list li {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--text-light);
	}

	.benefits-list li :global(svg) {
		color: var(--secondary-accent);
		flex-shrink: 0;
	}

	.cta-wrapper {
		margin-top: var(--space-xl);
		display: flex;
		gap: var(--space-md);
	}

	.cta-button {
		padding: var(--space-sm) var(--space-lg);
		font-size: 1rem;
		font-weight: 700;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: var(--transition-fast);
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		border: 1px solid transparent;
	}

	.cta-button.primary {
		background: var(--secondary-accent);
		color: var(--color-background-dark);
		border-color: var(--secondary-accent);
	}

	.cta-button.primary:hover {
		background: var(--secondary-accent-dark);
		border-color: var(--secondary-accent-dark);
	}

	.cta-button.secondary {
		background: transparent;
		color: var(--secondary-accent);
		border-color: var(--secondary-accent);
	}

	.cta-button.secondary:hover {
		background: var(--secondary-accent);
		color: var(--color-background-dark);
	}

	.animated-icon {
		animation: slide-right 2s infinite;
	}

	@keyframes slide-right {
		0%, 100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(4px);
		}
	}

	@media (max-width: 768px) {
		.section-header h2 {
			font-size: 2.5rem;
		}
		.section-header p {
			font-size: 1rem;
		}
		.section-header.interactive {
			flex-direction: column;
			align-items: flex-start;
		}
		.icon-wrapper {
			margin-left: 0;
			margin-top: var(--space-md);
		}
		.cta-wrapper {
			flex-direction: column;
		}

		.cta-button {
			width: 100%;
			justify-content: center;
		}
	}
</style>
