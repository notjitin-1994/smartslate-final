<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Container from '$lib/components/pages/common/Container.svelte';
	import PersonaSelector from './roi-calculator/PersonaSelector.svelte';
	import MetricCard from './roi-calculator/MetricCard.svelte';
	import {
		TrendingUp,
		Award,
		Link as LinkIcon,
		Clock,
		ArrowLeft,
		Briefcase,
		GraduationCap,
		User,
		Handshake
	} from 'lucide-svelte';
	import AnimatedButton from '$lib/components/common/animated-button.svelte';

	type Persona = 'businessman' | 'educator' | 'student';

	const dispatch = createEventDispatcher();

	let persona: Persona | null = null;

	// State for sliders
	let teamSize = 50;
	let studentCount = 500;
	let currentSalary = 180000;

	// --- Business Metric Calculations ---
	$: retentionSavings = teamSize * 0.2 * 0.5 * 75000;
	$: productivityBoost = Math.floor(teamSize * 2000 * 0.25);
	$: aiRevenueLift = teamSize * 10000;

	// --- Education Metric Calculations ---
	$: employabilityBoost = Math.round(studentCount * 0.15);
	const fasterPlacement = 6;
	$: industryPartnerships = Math.ceil(studentCount / 100);

	// --- Student Metric Calculations ---
	$: salaryIncrease = currentSalary * 0.22; // 22% average increase
	const promotionTime = 18; // 18 months average
	$: fasterPromotion = promotionTime * 0.35; // 35% faster
	const jobOpportunities = 5; // 5x multiplier

	const tweenedOptions = {
		duration: 800,
		easing: cubicOut
	};

	const animatedSavings = tweened(0, tweenedOptions);
	const animatedProductivity = tweened(0, tweenedOptions);
	const animatedRevenue = tweened(0, tweenedOptions);
	const animatedEmployability = tweened(0, tweenedOptions);
	const animatedPartnerships = tweened(0, tweenedOptions);
	const animatedSalary = tweened(0, tweenedOptions);
	const animatedPromotion = tweened(0, tweenedOptions);

	$: animatedSavings.set(retentionSavings);
	$: animatedProductivity.set(productivityBoost);
	$: animatedRevenue.set(aiRevenueLift);
	$: animatedEmployability.set(employabilityBoost);
	$: animatedPartnerships.set(industryPartnerships);
	$: animatedSalary.set(salaryIncrease);
	$: animatedPromotion.set(fasterPromotion);

	let headlines: Record<Persona, string> = {
		businessman: 'Turn <strong>Talent</strong> into Your <strong>Greatest Financial Asset</strong>',
		educator: 'Forge the <strong>Future of Graduate Success</strong>',
		student: 'Engineer Your <strong>Career Trajectory</strong>'
	};

	let closingArguments: Record<Persona, string> = {
		businessman: `The data is clear: investing in your team is the most direct path to <strong>sustainable growth</strong>. Beyond the numbers, a culture of learning fosters <strong>unmatched loyalty</strong> and creates a <strong>resilient workforce</strong> ready to outmaneuver the competition. Let's build your competitive advantage, together.`,
		educator: `These numbers represent more than just statistics; they represent <strong>enhanced institutional prestige</strong> and a direct answer to the demands of the modern economy. By producing <strong>verifiably skilled graduates</strong>, you create a powerful flywheel of <strong>industry partnerships and top-tier student recruitment</strong>. Let's build the future of education, together.`,
		student: `Your career is your most valuable asset. The right skills don't just lead to a better salary; they unlock <strong>accelerated career paths</strong>, greater <strong>professional influence</strong>, and the freedom to pursue <strong>opportunities you're truly passionate about</strong>. Invest in yourself and take control of your future.`
	};

	function handlePersonaSelect(event: CustomEvent) {
		persona = event.detail.persona;
	}
</script>

<section id="roi-calculator">
	<Container>
		<div class="section-header">
			<h2>Choose your <span class="accent">Persona</span></h2>
			<p>
				Your goals are <span class="accent">unique</span>. Your data should be too. Select the role
				that best describes you to unlock a
				<span class="accent">personalized impact analysis</span>.
			</p>
		</div>

		<div class="calculator-wrapper">
			{#if !persona}
				<PersonaSelector on:select={handlePersonaSelect} />
			{:else}
				<div class="calculator-view">
					<div class="calculator-header">
						<h2>{@html headlines[persona]}</h2>
						<button on:click={() => (persona = null)} class="back-button">
							<ArrowLeft size={16} />
							<span>Go Back</span>
						</button>
					</div>

					<div class="calculator-body">
						{#if persona === 'businessman'}
							<div class="slider-container">
								<label for="team-size-slider">How large is your team?</label>
								<div class="slider-wrapper">
									<input
										id="team-size-slider"
										type="range"
										min="10"
										max="1000"
										step="10"
										bind:value={teamSize}
									/>
									<span class="slider-value">{teamSize}</span>
								</div>
							</div>
							<div class="metrics-grid">
								<MetricCard
									icon={TrendingUp}
									title="Turnover Costs Saved"
									value={$animatedSavings}
									isCurrency={true}
									description="Annually, by cutting attrition in half through targeted upskilling."
									source="Based on Gallup and LinkedIn Learning data on employee replacement costs."
								/>
								<MetricCard
									icon={TrendingUp}
									title="Productivity Hours Gained"
									value={$animatedProductivity}
									unit="+"
									description="Per year, from a more efficient and capable workforce."
									source="Based on ATD findings on productivity increases from effective training."
								/>
								<MetricCard
									icon={TrendingUp}
									title="AI-Driven Revenue Lift"
									value={$animatedRevenue}
									isCurrency={true}
									description="Potential annual gain by equipping your team with strategic AI skills."
									source="Modeled on McKinsey & Accenture reports on AI adoption and revenue growth."
								/>
							</div>
						{/if}

						{#if persona === 'educator'}
							<div class="slider-container">
								<label for="student-count-slider">How many students in your program?</label>
								<div class="slider-wrapper">
									<input
										id="student-count-slider"
										type="range"
										min="50"
										max="2000"
										step="50"
										bind:value={studentCount}
									/>
									<span class="slider-value">{studentCount}</span>
								</div>
							</div>
							<div class="metrics-grid">
								<MetricCard
									icon={Award}
									title="Higher Employability"
									value={$animatedEmployability}
									unit="+ Students"
									description="Placed in high-demand roles within six months of graduation."
									source="Based on Burning Glass data on the value of industry-recognized credentials."
								/>
								<MetricCard
									icon={Clock}
									title="Faster Placements"
									value={fasterPlacement}
									unit=" Weeks"
									description="Average reduction in time-to-hire for skilled graduates."
									source="Industry benchmark for graduates with specialized, in-demand skill sets."
								/>
								<MetricCard
									icon={LinkIcon}
									title="New Industry Partners"
									value={$animatedPartnerships}
									unit="+"
									description="Attracted by a curriculum that produces work-ready talent."
									source="Modeled on the flywheel effect of universities supplying skilled graduates to corporate ecosystems."
								/>
							</div>
						{/if}

						{#if persona === 'student'}
							<div class="slider-container">
								<label for="salary-slider">What is your current annual salary?</label>
								<div class="slider-wrapper">
									<input
										id="salary-slider"
										type="range"
										min="180000"
										max="20000000"
										step="10000"
										bind:value={currentSalary}
									/>
									<span class="slider-value">₹{currentSalary.toLocaleString('en-IN')}</span>
								</div>
							</div>
							<div class="metrics-grid">
								<MetricCard
									icon={TrendingUp}
									title="Potential Salary Increase"
									value={$animatedSalary}
									isCurrency={true}
									description="Annual lift by acquiring in-demand skills in your field."
									source="Based on World Economic Forum data on salary premiums for upskilling."
								/>
								<MetricCard
									icon={TrendingUp}
									title="Faster Promotion"
									value={$animatedPromotion}
									unit=" Months"
									description="Potential time saved to reach your next career milestone."
									source="Analysis of career progression data from leading HR analytics firms."
								/>
								<MetricCard
									icon={LinkIcon}
									title="Job Opportunities"
									value={jobOpportunities}
									unit="x"
									description="Multiplier for relevant job openings unlocked with new skills."
									source="Data compiled from major job boards on skill-based role availability."
								/>
							</div>
						{/if}
					</div>

					<div class="closing-argument">
						<p>{@html closingArguments[persona]}</p>
					</div>
				</div>
			{/if}
		</div>
		<AnimatedButton
			text="Explore Our Partnerships"
			icon={Handshake}
			on:click={() => dispatch('revealNext')}
			customClass="discover-button"
		/>
	</Container>
</section>

<style>
	:global(.discover-button) {
		margin-top: var(--space-xl);
		background-color: var(--primary-accent);
		color: var(--background-dark);
	}
	#roi-calculator {
		padding: var(--space-xxl) 0;
	}

	.section-header {
		max-width: 100%;
		margin: 0 0 var(--space-xl) 0;
		text-align: left;
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
		max-width: 60ch;
	}

	.calculator-wrapper {
		background: var(--container-bg);
		border: var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-xl) var(--space-xxl);
		min-height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.calculator-view {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.calculator-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-lg);
	}

	.calculator-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		flex-grow: 1;
	}

	.calculator-header :global(strong) {
		font-weight: 700;
		color: var(--primary-accent);
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-secondary);
		background: none;
		border: none;
		cursor: pointer;
		transition: var(--transition-fast);
		flex-shrink: 0;
	}

	.back-button:hover {
		color: var(--text-primary);
	}

	.slider-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		margin-bottom: var(--space-md);
	}

	.slider-container label {
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.slider-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	input[type='range'] {
		flex-grow: 1;
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: var(--input-bg);
		border-radius: var(--radius-sm);
		outline: none;
		transition: var(--transition-fast);
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: var(--primary-accent);
		cursor: pointer;
		border-radius: 50%;
		border: 3px solid var(--container-bg);
		transition: var(--transition-fast);
	}

	input[type='range']::-webkit-slider-thumb:hover {
		background: var(--text-primary);
	}

	input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: var(--primary-accent);
		cursor: pointer;
		border-radius: 50%;
		border: 3px solid var(--container-bg);
		transition: var(--transition-fast);
	}

	input[type='range']::-moz-range-thumb:hover {
		background: var(--text-primary);
	}

	.slider-value {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 2rem;
		color: var(--primary-accent);
		min-width: 150px;
		text-align: right;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
	}

	.closing-argument {
		padding-top: var(--space-xl);
		margin-top: var(--space-lg);
		border-top: var(--border-subtle);
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
		max-width: 80ch;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}

	.closing-argument :global(strong) {
		font-weight: 600;
		color: var(--primary-accent);
	}

	@media (max-width: 768px) {
		.section-header h2 {
			font-size: 2.5rem;
		}
		.section-header p {
			font-size: 1rem;
		}
		.calculator-header {
			flex-direction: column;
			align-items: flex-start;
		}
		.calculator-header h2 {
			font-size: 2rem;
		}
		.slider-wrapper {
			flex-direction: column;
			align-items: stretch;
		}
		.slider-value {
			text-align: left;
		}
	}
</style>
