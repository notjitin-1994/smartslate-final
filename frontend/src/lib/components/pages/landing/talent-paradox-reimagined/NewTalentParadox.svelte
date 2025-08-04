<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { LayoutGrid, Landmark, ShieldAlert, Puzzle, TrendingUp } from 'lucide-svelte';
	import Container from '$lib/components/pages/common/Container.svelte';
	import AnimatedButton from '$lib/components/common/animated-button.svelte';
	import EconomicEquationInfographic from './EconomicEquationInfographic.svelte';
	import EmployabilityCrisisInfographic from './EmployabilityCrisisInfographic.svelte';
	import CriticalSkillsShiftInfographic from './CriticalSkillsShiftInfographic.svelte';
	import HiddenOpportunityInfographic from './HiddenOpportunityInfographic.svelte';

	const dispatch = createEventDispatcher();

	type Section = 'economic' | 'employability' | 'skills' | 'opportunity';

	const sections = [
		{
			id: 'economic',
			label: 'The Economic Equation',
			icon: Landmark,
			component: EconomicEquationInfographic,
			title: 'The Economic Equation: A Nation\'s Potential on the Line',
			description: 'The talent paradox isn\'t just an abstract challenge; it\'s a direct threat to our economic momentum. When a nation\'s workforce can\'t keep pace with digital transformation, the cost is measured in lost growth and missed opportunities.'
		},
		{
			id: 'employability',
			label: 'The Employability Crisis',
			icon: ShieldAlert,
			component: EmployabilityCrisisInfographic,
			title: 'The Employability Crisis: The Gap Between Campus and Career',
			description: 'The root of the economic risk lies in a fundamental disconnect between education and industry. We have millions of graduates, but are they truly ready for the modern workplace?'
		},
		{
			id: 'skills',
			label: 'Critical Skills Shift',
			icon: Puzzle,
			component: CriticalSkillsShiftInfographic,
			title: 'The Moving Target of Talent',
			description: 'The skills that defined a valuable employee yesterday are quickly becoming obsolete. By 2030, the very definition of "core skill" will be transformed.'
		},
		{
			id: 'opportunity',
			label: 'Hidden Opportunity',
			icon: TrendingUp,
			component: HiddenOpportunityInfographic,
			title: 'Your Workforce is Ready to Evolve',
			description: 'Here is the most hopeful part of the paradox. The desire to adapt is already there. Your future leaders and innovators aren\'t waiting to be told; they are actively seeking ways to stay relevant.'
		}
	];

	let activeSection: Section = 'economic';
</script>

<section class="talent-paradox-section">
	<Container>
		<div class="grid-layout">
			<div class="left-panel">
				<div class="section-header">
					<h2>
						India's <span class="accent">Talent Paradox</span>: Bridging the
						<span class="accent">Billion-Person Opportunity Gap</span>
					</h2>
					<p>
						India's potential is a force of nature. But this immense human capital is facing a
						widening chasm between aspiration and reality. This isn't just a challenge; it's a
						multi-trillion-dollar crisis of scale. Let's break it down.
					</p>
				</div>

				<div class="button-group">
					{#each sections as { id, label, icon }}
						<button
							class:active={activeSection === id}
							on:click={() => (activeSection = id as Section)}
						>
							<svelte:component this={icon} size={20} />
							<span>{label}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="right-panel">
				<div class="right-panel-wrapper">
					{#key activeSection}
						<div in:fade={{ duration: 300 }}>
							{#each sections as section}
								{#if section.id === activeSection}
									<div class="content-card">
										<h3>{@html section.title.replace(/(Economic Equation|Employability Crisis|Moving Target of Talent|Workforce is Ready to Evolve)/g, '<span class="accent">$1</span>')}</h3>
										<p>{section.description}</p>
										<div class="infographic-container">
											<svelte:component this={section.component} 
												source={section.id === 'economic' ? "Based on World Bank and national economic projections." :
													   section.id === 'employability' ? "Data from NASSCOM, AICTE, and industry surveys." :
													   section.id === 'skills' ? "Analysis from World Economic Forum 'Future of Jobs' report." :
													   "LinkedIn Learning and Coursera workforce trend reports."} 
											/>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					{/key}
				</div>
			</div>
		</div>
		
		<div class="discover-framework">
			<h4>Your <span class="accent">Workforce is Ready to Evolve</span></h4>
			<p>
				Understanding the problem is the first step. Solving it is the next. Smartslate is
				designed to be the bridge across this divide—connecting motivated talent with the
				future-focused skills your company needs to thrive.
			</p>
			<AnimatedButton
				text="Discover our Framework"
				icon={LayoutGrid}
				on:click={() => dispatch('revealNext')}
			/>
		</div>
	</Container>
</section>

<style>
	.talent-paradox-section {
		padding: var(--space-xxl) 0;
		background-color: transparent;
		border-top: var(--border-subtle);
	}

	.grid-layout {
		display: grid;
		grid-template-columns: 1fr 1.25fr;
		gap: var(--space-xl);
		margin-bottom: var(--space-xxl);
	}

	.left-panel {
		position: sticky;
		top: calc(80px + var(--space-xl)); /* Header height + spacing */
		align-self: start;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: var(--space-lg);
		color: var(--text-primary);
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	.accent {
		color: var(--primary-accent);
		font-weight: 800;
	}

	.section-header p {
		font-size: 1.0625rem;
		color: var(--text-secondary);
		line-height: 1.7;
		max-width: 600px;
		opacity: 0.9;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-xl);
	}

	.button-group button {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		color: var(--text-secondary);
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		text-align: left;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		gap: var(--space-md);
		box-shadow: 0 0 0px rgba(167, 218, 219, 0);
		border-left: 3px solid transparent;
		position: relative;
		overflow: hidden;
	}

	.button-group button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.1), transparent);
		transition: left 0.5s ease;
	}

	.button-group button:hover::before {
		left: 100%;
	}

	.button-group button:not(.active) {
		animation: subtle-pulse 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
	}

	.button-group button:hover {
		background-color: rgba(167, 218, 219, 0.06);
		border-color: rgba(167, 218, 219, 0.4);
		color: var(--text-primary);
		transform: translateX(4px);
		box-shadow: 0 2px 10px rgba(167, 218, 219, 0.15);
	}

	.button-group button.active {
		background: linear-gradient(135deg, rgba(167, 218, 219, 0.1), rgba(79, 70, 229, 0.05));
		color: var(--text-primary);
		border-left-color: var(--primary-accent);
		border-color: rgba(167, 218, 219, 0.3);
		font-weight: 600;
		animation: none;
		box-shadow: 0 4px 20px rgba(167, 218, 219, 0.2);
		transform: translateX(8px) scale(1.02);
	}

	.button-group button :global(svg) {
		color: var(--secondary-accent);
		transition: var(--transition-fast);
	}

	.button-group button.active :global(svg) {
		color: var(--primary-accent);
		transform: scale(1.15);
		filter: drop-shadow(0 0 8px rgba(167, 218, 219, 0.5));
	}

	.right-panel {
		min-height: 450px;
		position: relative;
	}

	.right-panel-wrapper > :global(div) {
		height: 100%;
	}

	.content-card {
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(10px);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		border: 1px solid var(--border-color);
		height: 100%;
		display: flex;
		flex-direction: column;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		position: relative;
		overflow: hidden;
	}

	.content-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--primary-accent), var(--secondary-accent));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.content-card:hover::before {
		transform: scaleX(1);
	}

	.content-card:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(167, 218, 219, 0.3);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
		transform: translateY(-2px);
	}

	.content-card h3 {
		font-size: 1.875rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-lg) 0;
		line-height: 1.4;
		letter-spacing: -0.02em;
	}

	.content-card h3 :global(.accent) {
		color: var(--primary-accent);
		font-weight: 700;
	}

	.content-card p {
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--text-secondary);
		margin: 0 0 var(--space-xl) 0;
		max-width: 100%;
		opacity: 0.9;
	}

	.infographic-container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: var(--space-lg);
		padding: var(--space-lg) 0;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		min-height: 300px;
	}

	.infographic-container :global(.infographic-container) {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	.discover-framework {
		text-align: left;
		margin-top: var(--space-xxl);
		padding-top: var(--space-xl);
		border-top: 1px solid rgba(167, 218, 219, 0.1);
	}

	.discover-framework h4 {
		font-size: 2rem;
		color: var(--text-primary);
		margin-bottom: var(--space-md);
	}

	.discover-framework h4 .accent {
		color: var(--primary-accent);
	}

	.discover-framework p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 55ch;
		margin-bottom: var(--space-xl);
	}

	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 15px rgba(167, 218, 219, 0.2);
		}
		50% {
			box-shadow: 0 0 25px rgba(167, 218, 219, 0.4);
		}
	}

	@keyframes subtle-pulse {
		0%,
		100% {
			opacity: 1;
			box-shadow: 0 0 0 rgba(167, 218, 219, 0);
		}
		50% {
			opacity: 0.95;
			box-shadow: 0 0 8px rgba(167, 218, 219, 0.15);
		}
	}

	@media (max-width: 992px) {
		.grid-layout {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}
		
		.left-panel {
			position: static;
			top: auto;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.section-header p {
			font-size: 1rem;
		}
		
		.right-panel {
			min-height: auto;
		}

		.content-card {
			padding: var(--space-lg);
		}

		.content-card h3 {
			font-size: 1.5rem;
		}

		.content-card p {
			font-size: 1rem;
		}

		.button-group {
			flex-direction: row;
			flex-wrap: wrap;
			gap: var(--space-sm);
			margin-top: var(--space-lg);
		}

		.button-group button {
			flex: 1 1 calc(50% - var(--space-sm));
			min-width: 150px;
			font-size: 0.875rem;
			padding: var(--space-sm) var(--space-md);
		}

		.button-group button:hover {
			transform: translateX(2px);
		}

		.button-group button.active {
			transform: translateX(4px) scale(1.01);
		}

		.infographic-container {
			min-height: 250px;
			padding: var(--space-md) 0;
		}

		.discover-framework h4 {
			font-size: 1.5rem;
		}

		.discover-framework p {
			font-size: 1rem;
		}
	}

	@media (max-width: 768px) {
		.talent-paradox-section {
			padding: var(--space-xl) 0;
		}
		
		.section-header h2 {
			font-size: 2.25rem;
		}

		.content-card {
			padding: var(--space-lg);
		}

		.content-card h3 {
			font-size: 1.5rem;
		}

		.content-card p {
			font-size: 1rem;
		}
	}
</style>