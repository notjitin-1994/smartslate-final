<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Container from '$lib/components/pages/common/Container.svelte';
	import EmployabilityCrisis from './talent-paradox/EmployabilityCrisis.svelte';
	import SkillsGap from './talent-paradox/SkillsGap.svelte';
	import IndustryDemand from './talent-paradox/IndustryDemand.svelte';
	import EconomicImpact from './talent-paradox/EconomicImpact.svelte';
	import { ShieldAlert, Puzzle, TrendingUp, Landmark, LayoutGrid } from 'lucide-svelte';
	import AnimatedButton from '$lib/components/common/animated-button.svelte';

	type Section = 'crisis' | 'gap' | 'demand' | 'impact';

	const dispatch = createEventDispatcher();

	const sections = [
		{
			id: 'impact',
			label: 'The Economic Impact',
			component: EconomicImpact,
			icon: Landmark
		},
		{
			id: 'crisis',
			label: 'The Employability Crisis',
			component: EmployabilityCrisis,
			icon: ShieldAlert
		},
		{
			id: 'gap',
			label: 'The Critical Skills Gap',
			component: SkillsGap,
			icon: Puzzle
		},
		{
			id: 'demand',
			label: 'Evolving Industry Demand',
			component: IndustryDemand,
			icon: TrendingUp
		}
	];

	let activeSection: Section = 'impact';
</script>

<section class="talent-paradox-section">
	<Container>
		<div class="grid-layout">
			<div class="left-panel">
				<div class="section-header">
					<h2>
						The <span class="accent">Talent Paradox</span>: A
						<span class="accent">Crisis</span> of Scale
					</h2>
					<p>
						India's potential is immense, but it's constrained by a persistent skills gap. The
						numbers paint a clear picture of a crisis of scale.
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
							<svelte:component this={sections.find((s) => s.id === activeSection)?.component} />
						</div>
					{/key}
				</div>
			</div>
		</div>
		<div class="discover-framework">
			<AnimatedButton
				text="Discover the Framework"
				icon={LayoutGrid}
				animatedIcon={true}
				on:click={() => dispatch('revealNext')}
			/>
		</div>
	</Container>
</section>

<style>
	.talent-paradox-section {
		padding: var(--space-xxl) 0;
		background-color: transparent;
	}

	.grid-layout {
		display: grid;
		grid-template-columns: 1fr 1.25fr;
		gap: var(--space-xl);
	}

	.left-panel {
		position: sticky;
		top: var(--space-xxl); /* Adjust based on header height */
	}

	.section-header h2 {
		font-size: 3rem;
		margin-bottom: var(--space-md);
	}

	.accent {
		color: var(--primary-accent);
	}

	.section-header p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 700px;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-xl);
	}

	.button-group button {
		background: transparent;
		border: var(--border-subtle);
		color: var(--text-secondary);
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		text-align: left;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: var(--transition-medium);
		display: flex;
		align-items: center;
		gap: var(--space-md);
		box-shadow: 0 0 0px rgba(167, 218, 219, 0);
	}

	.button-group button:not(.active) {
		animation: pulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
	}

	.button-group button:hover {
		background-color: var(--primary-tint-lighter);
		border-color: var(--primary-shade-dark);
		color: var(--primary-shade-darker);
		transform: translateY(-2px);
	}

	.button-group button.active {
		background-color: var(--secondary-accent);
		color: #ffffff;
		border-color: var(--secondary-accent);
		font-weight: 600;
		animation: none;
		box-shadow: var(--shadow-lg);
	}

	.right-panel-wrapper > :global(div) {
		height: 100%;
	}
	.right-panel {
		min-height: 400px; /* Ensure panel has height for transitions */
		transition: var(--transition-medium);
	}

	.right-panel:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
	}

	@media (max-width: 992px) {
		.grid-layout {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}
		.left-panel {
			position: static;
			top: auto;
			display: contents; /* Allows children to be grid items */
		}

		/* Reorder the elements for the mobile layout */
		.section-header {
			grid-row: 1;
		}
		.right-panel {
			grid-row: 2;
		}
		.button-group {
			grid-row: 3;
		}
	}

	@media (max-width: 768px) {
		.talent-paradox-section {
			padding: var(--space-xl) 0;
		}
		.section-header h2 {
			font-size: 2.25rem;
		}
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

	.discover-framework {
		text-align: left;
		margin-top: var(--space-xl);
	}
</style>
