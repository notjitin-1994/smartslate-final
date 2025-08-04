<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Zap, Network, Layers, ChevronRight } from 'lucide-svelte';
	import AnimatedButton from '$lib/components/common/animated-button.svelte';
	import RupeeIcon from '$lib/components/common/rupee-icon.svelte';
	import Container from '$lib/components/pages/common/Container.svelte';
	import { ssaInterestModalStore } from '$lib/stores/ssaInterestModalStore';

	const dispatch = createEventDispatcher();

	type Section = 'ignite' | 'architecture' | 'solara';

	const frameworkSteps: {
		id: Section;
		icon: any;
		title: string;
		subtitle: string;
		description: string;
		buttonText: string;
		href: string;
	}[] = [
		{
			id: 'ignite',
			icon: Zap,
			title: 'Ignite Series',
			subtitle: 'AI-Powered Learning',
			description:
				'Experience the future of education with our pre-built AI-assisted courses, featuring your personal AI tutor.',
			buttonText: 'Explore our Courses',
			href: '/courses'
		},
		{
			id: 'architecture',
			icon: Network,
			title: 'Strategic Skill Architecture',
			subtitle: 'Future-Proof Workforce',
			description:
				'We conduct comprehensive skill gap analysis and design custom learning ecosystems that evolve with your needs.',
			buttonText: 'Create your Strategic Skills Architecture',
			href: '/solutions'
		},
		{
			id: 'solara',
			icon: Layers,
			title: 'Solara',
			subtitle: 'End-to-End Learning Platform',
			description:
				'Revolutionize learning content creation with our all-in-one platform featuring interactive elements and a custom interaction builder.',
			buttonText: 'Learn More',
			href: '/solara'
		}
	];

	let activeStep: Section = 'ignite';

	function selectStep(section: Section) {
		activeStep = section;
	}

	$: activeContent = frameworkSteps.find((s) => s.id === activeStep);

	function handleButtonClick() {
		if (activeContent?.id === 'architecture') {
			ssaInterestModalStore.open();
		} else if (activeContent?.href) {
			window.location.href = activeContent.href;
		}
	}
</script>

<section class="framework-section">
	<Container>
		<div class="section-header">
			<h2>The Smartslate <span class="accent-animate">Framework</span></h2>
			<p>
				We don't just train; we <span class="accent-animate">transform</span>. Our integrated
				ecosystem bridges the critical gap between education and industry.
			</p>
		</div>

		<div class="interactive-layout">
			<div class="stepper-navigation">
				{#each frameworkSteps as step, i (step.id)}
					<button
						class="step"
						class:active={activeStep === step.id}
						on:click={() => selectStep(step.id)}
					>
						<div class="step-icon">
							<svelte:component this={step.icon} size={28} />
						</div>
						<div class="step-label">
							<span class="title">{step.title}</span>
							<span class="subtitle">{step.subtitle}</span>
						</div>
					</button>
				{/each}
			</div>

			<div class="content-panel">
				{#if activeContent}
					{#key activeStep}
						<div
							class="content-body"
							in:fade={{ duration: 300, delay: 200 }}
							out:fade={{ duration: 200 }}
						>
							<h3 in:slide={{ duration: 400, easing: quintOut, axis: 'y' }}>
								{activeContent.title}
							</h3>
							<p in:slide={{ duration: 400, delay: 50, easing: quintOut, axis: 'y' }}>
								{activeContent.description}
							</p>
							<div in:fade={{ duration: 300, delay: 300 }}>
								<AnimatedButton
									text={activeContent.buttonText}
									icon={ChevronRight}
									variant="secondary"
									on:click={handleButtonClick}
								/>
							</div>
						</div>
					{/key}
				{/if}
			</div>
		</div>

		<div class="roi-button-container">
			<AnimatedButton
				text="Unearth your ROI"
				icon={RupeeIcon}
				on:click={() => dispatch('revealNext')}
			/>
		</div>
	</Container>
</section>

<style>
	.framework-section {
		padding: var(--space-xxl) 0;
		background-color: var(--color-background-dark);
		color: var(--color-text-light);
		border-top: 1px solid var(--color-border-subtle);
		overflow: hidden;
	}

	.section-header {
		text-align: left;
		margin-bottom: var(--space-xxl);
	}

	.section-header h2 {
		font-size: 3rem;
		margin-bottom: var(--space-md);
		color: var(--text-primary);
		font-weight: 700;
	}

	.section-header p {
		font-size: 1.2rem;
		color: var(--text-secondary);
		margin: 0;
		max-width: 65ch;
	}

	.accent-animate {
		color: var(--text-primary);
		animation: color-change-once 1s ease-in-out 0.5s forwards;
	}

	@keyframes color-change-once {
		to {
			color: var(--primary-accent);
		}
	}

	.interactive-layout {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: var(--space-xxl);
		align-items: flex-start;
	}

	.stepper-navigation {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.step {
		display: flex;
		align-items: center;
		background: none;
		border: none;
		text-align: left;
		color: var(--text-secondary);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.3s ease;
		border-left: 3px solid var(--color-border-subtle);
		margin-bottom: var(--space-lg);
	}

	.step:hover {
		background-color: rgba(255, 255, 255, 0.03);
		color: var(--text-primary);
	}

	.step.active {
		background-color: rgba(167, 218, 219, 0.08);
		color: var(--text-primary);
		border-left-color: var(--primary-accent);
		transform: translateX(10px);
	}

	.step-icon {
		flex-shrink: 0;
		margin-right: var(--space-lg);
		color: var(--secondary-accent);
		transition: all 0.3s ease;
		background-color: rgba(167, 218, 219, 0.1);
		border-radius: 50%;
		padding: var(--space-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step.active .step-icon {
		color: var(--primary-accent);
		transform: scale(1.15);
		box-shadow: 0 0 15px rgba(167, 218, 219, 0.3);
	}

	.step-label .title {
		font-size: 1.25rem;
		font-weight: 600;
		display: block;
	}

	.step-label .subtitle {
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.content-panel {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		border: 1px solid var(--color-border-subtle);
		min-height: 350px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.content-body h3 {
		font-size: 2rem;
		color: var(--primary-accent);
		margin: 0 0 var(--space-md) 0;
	}

	.content-body p {
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--text-secondary);
		margin: 0 0 var(--space-xl) 0;
		max-width: 55ch;
	}

	.roi-button-container {
		text-align: left;
		margin-top: var(--space-xxl);
	}

	@media (max-width: 900px) {
		.interactive-layout {
			grid-template-columns: 1fr;
		}
		.content-panel {
			min-height: auto;
			margin-top: var(--space-xl);
		}
		.step.active {
			transform: none;
		}
	}

	@media (max-width: 768px) {
		.section-header h2 {
			font-size: 2.5rem;
		}
		.section-header p {
			font-size: 1.1rem;
		}
	}
</style>
