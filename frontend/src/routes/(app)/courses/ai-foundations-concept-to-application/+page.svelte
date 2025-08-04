<!--
  Landing Page: AI Foundations: From Concept to Application
  Version: 2.0 (High-Conversion Redesign)
  Justification: This component is structured for high performance and maintainability.
  - It is a single, self-contained file for this specific course page, which is appropriate for a unique landing page.
  - State management is handled locally with Svelte's reactive statements, which is efficient for component-level interactivity.
  - Styling is scoped using Svelte's `<style>` tag to prevent global CSS conflicts.
  - The code is organized by the logical sections defined in the architectural plan, making it easy to navigate and update.
-->
<script lang="ts">
	import { authModalStore } from '$lib/stores/authModalStore';
	import Container from '$lib/components/pages/common/Container.svelte';
	import AnimatedButton from '$lib/components/common/animated-button.svelte';
	import {
		ArrowRight,
		BarChart,
		Briefcase,
		GraduationCap,
		CheckCircle,
		Award,
		Users,
		Sparkles,
		ChevronDown,
		BookOpen,
		Lightbulb,
		MessageSquare,
		Infinity
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// --- Configuration & Data ---

	const course = {
		name: 'AI Foundations: From Concept to Application',
		price: 50000,
		offerPrice: 29999
	};

	$: discountPercentage = Math.round(((course.price - course.offerPrice) / course.price) * 100);

	const animatedStats = [
		{
			icon: BarChart,
			endValue: 85,
			unit: '%',
			text: 'of Indian enterprises are expected to use AI in some form by the end of this year.'
		},
		{
			icon: Briefcase,
			endValue: 45,
			unit: '%',
			text: 'increase in demand for AI specialists in India over the last 24 months.'
		}
	];

	const personas = [
		{
			id: 'professionals',
			title: 'For Professionals',
			icon: Sparkles,
			before: {
				title: 'Before: Overwhelmed by AI Hype',
				description: 'Struggling to distinguish valuable AI knowledge from noise and feeling left behind in technical conversations.'
			},
			after: {
				title: 'After: Confident AI Practitioner',
				description: 'You will confidently apply AI concepts, lead strategic discussions, and position yourself for high-impact roles.'
			}
		},
		{
			id: 'leaders',
			title: 'For Leaders',
			icon: Users,
			before: {
				title: 'Before: Strategic Uncertainty',
				description: 'Unsure how to integrate AI into your business strategy or how to upskill your team for the future.'
			},
			after: {
				title: 'After: Visionary AI Leadership',
				description: 'You will identify high-ROI AI opportunities, foster a culture of innovation, and drive competitive advantage.'
			}
		},
		{
			id: 'educators',
			title: 'For Educators',
			icon: GraduationCap,
			before: {
				title: 'Before: Outdated Curriculum',
				description: 'Facing the challenge of preparing students for a job market that is being rapidly transformed by AI.'
			},
			after: {
				title: 'After: Future-Ready Institution',
				description: 'You will enrich your curriculum with practical, in-demand AI knowledge, boosting student employability.'
			}
		}
	];

	const curriculum = [
		{
			title: 'Module 1: Deconstructing AI: Core Concepts & Landscape',
			description: 'Go beyond the buzzwords. Understand the history, types, and real-world impact of AI, establishing a rock-solid foundation.',
			keyApplication: 'Articulate the business value of different AI types.'
		},
		{
			title: 'Module 2: Machine Learning: The Engine of Modern AI',
			description: 'Explore the core of AI decision-making. Learn how algorithms learn from data through supervised, unsupervised, and reinforcement learning.',
			keyApplication: 'Identify the right ML approach for a given problem.'
		},
		{
			title: 'Module 3: The Anatomy of a Neural Network',
			description: 'Peek under the hood of deep learning. Demystify the structure of neural networks and how they power today’s most advanced AI.',
			keyApplication: 'Explain how deep learning solves complex pattern recognition tasks.'
		},
		{
			title: 'Module 4: AI Ethics & Responsible Innovation',
			description: 'Navigate the critical landscape of AI ethics. Learn frameworks for building fair, transparent, and accountable AI systems.',
			keyApplication: 'Conduct a basic AI ethics and bias audit.'
		},
		{
			title: 'Module 5: Capstone: From Concept to Application',
			description: 'Synthesize your knowledge. Develop a strategic proposal for an AI initiative to solve a real-world problem in your domain.',
			keyApplication: 'Create a business case for an AI project.'
		}
	];

	const valuePropositions = [
		{
			headline: 'Expert-Led Modules',
			description: 'Master AI from core concepts to strategic application.',
			icon: BookOpen
		},
		{
			headline: 'Real-World Case Studies',
			description: 'Apply knowledge to practical, industry-relevant problems.',
			icon: Lightbulb
		},
		{
			headline: 'Direct Instructor Interaction',
			description: 'Get your questions answered in dedicated Q&A sessions.',
			icon: MessageSquare
		},
		{
			headline: 'Founding Member Certificate',
			description: 'Earn a special designation on your official certificate.',
			icon: Award
		},
		{
			headline: 'Lifetime Access',
			description: 'Revisit all course materials and future updates, forever.',
			icon: Infinity
		},
		{
			headline: 'Exclusive Professional Community',
			description: 'Network with a curated group of AI professionals and leaders.',
			icon: Users
		}
	];

	// --- State ---

	let activePersona = 'professionals';
	let openModule: number | null = null;
	let countdown = { days: 14, hours: 8, minutes: 42 }; // Placeholder
	let activeEnrollmentTab: 'receive' | 'individual' | 'teams' = 'individual';
	let openValueProposition: number | null = null;
	let isFooterIntersecting = false;
	let stickyFooterRef: HTMLElement;
	let footerStopperRef: HTMLElement;
	let isDesktop = false;

	// --- Logic ---

	const openAuthModal = (view: 'login' | 'register', title: string, subtitle: string) => {
		authModalStore.set({ isOpen: true, view, title, subtitle });
	};

	// Simple countdown logic for demonstration
	onMount(() => {
		const mediaQuery = window.matchMedia('(min-width: 1024px)');
		const updateDesktopStatus = () => (isDesktop = mediaQuery.matches);
		updateDesktopStatus();
		mediaQuery.addEventListener('change', updateDesktopStatus);

		const interval = setInterval(() => {
			if (countdown.minutes > 0) {
				countdown.minutes--;
			} else if (countdown.hours > 0) {
				countdown.hours--;
				countdown.minutes = 59;
			} else if (countdown.days > 0) {
				countdown.days--;
				countdown.hours = 23;
				countdown.minutes = 59;
			}
		}, 60000);

		// Intersection Observer for the sticky footer
		const observer = new IntersectionObserver(
			([entry]) => {
				isFooterIntersecting = entry.isIntersecting;
			},
			{ rootMargin: '0px 0px 100% 0px' } // Observe when the stopper is at the bottom of the viewport
		);

		if (footerStopperRef) {
			observer.observe(footerStopperRef);
		}

		return () => {
			clearInterval(interval);
			mediaQuery.removeEventListener('change', updateDesktopStatus);
			if (footerStopperRef) {
				observer.unobserve(footerStopperRef);
			}
		};
	});
</script>

<main>
	<!-- Section 1: Hero Section -->
	<section class="hero-section">
		<Container>
			<div class="hero-content">
				<h1 class="headline">Master the Language of the Future</h1>
				<p class="subheading">
					Our "AI Foundations" course is the definitive journey from theoretical concepts to practical
					application. Go from being curious about AI to confidently leveraging it for professional
					growth.
				</p>
				<div class="cta-group">
					<AnimatedButton
						text={`Join Waitlist & Save ${discountPercentage}%`}
						icon={ArrowRight}
						on:click={() =>
							openAuthModal(
								'register',
								'Secure Your Launch Offer',
								`Join the waitlist for ${course.name} and get a ${discountPercentage}% discount.`
							)}
						variant="primary"
					/>
					<AnimatedButton
						text="Request a Demo for Your Team"
						icon={ArrowRight}
						on:click={() =>
							openAuthModal(
								'register',
								'Request an Enterprise Demo',
								'Learn how our team solutions can accelerate your business.'
							)}
						variant="secondary"
					/>
				</div>
			</div>
		</Container>
	</section>

	<!-- Section 2: The "Why Now?" Section -->
	<section class="section">
		<Container>
			<div class="two-column-layout">
				<div class="text-content">
					<h2 class="section-headline">The AI Revolution Isn't Coming. It's Here.</h2>
					<p class="section-body">
						Artificial Intelligence is no longer a futuristic concept; it's a fundamental driver of
						modern business and innovation. AI literacy has become a non-negotiable career skill,
						separating those who will shape the future from those who will be shaped by it. Acting
						now is not just an opportunity—it's a necessity for relevance and growth.
					</p>
				</div>
				<div class="stats-content">
					{#each animatedStats as stat}
						<div class="stat-item">
							<div class="stat-icon-wrapper">
								<svelte:component this={stat.icon} class="stat-icon" />
							</div>
							<div class="stat-text">
								<span class="stat-number">{stat.endValue}{stat.unit}</span>
								<p>{stat.text}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</Container>
	</section>

	<!-- Section 3: The Transformation Section -->
	<section class="section">
		<Container>
			<div class="text-center mb-16">
				<h2 class="section-headline">From Theory to Tangible Transformation</h2>
				<p class="section-body max-w-3xl mx-auto">
					This course is designed to create a clear "before and after" in your professional life.
					Select your profile to see the specific impact you can expect.
				</p>
			</div>
			<div class="transformation-container">
				<div class="persona-tabs">
					{#each personas as persona}
						<button
							class="persona-tab"
							class:active={activePersona === persona.id}
							on:click={() => (activePersona = persona.id)}
						>
							<svelte:component this={persona.icon} />
							<span>{persona.title}</span>
						</button>
					{/each}
				</div>

				<div class="persona-content">
					{#each personas as persona}
						{#if activePersona === persona.id}
							<div in:fade={{ duration: 300 }} class="transformation-card">
								<div class="state-card before">
									<h3>{persona.before.title}</h3>
									<p>{persona.before.description}</p>
								</div>
								<div class="transformation-arrow">
									<ArrowRight />
								</div>
								<div class="state-card after">
									<h3>{persona.after.title}</h3>
									<p>{persona.after.description}</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</Container>
	</section>

	<!-- Section 4: The Curriculum Section -->
	<section class="section">
		<Container>
			<div class="text-center mb-16">
				<h2 class="section-headline">Your Journey from Concept to Application</h2>
				<p class="section-body max-w-3xl mx-auto">
					Our curriculum is a structured journey, with each module building logically on the last to
					take you from foundational knowledge to strategic application.
				</p>
			</div>
			<div class="curriculum-timeline">
				{#each curriculum as module, i}
					<div class="module-item">
						<button class="module-header" on:click={() => (openModule = openModule === i ? null : i)}>
							<div class="module-title">
								<div class="module-number">{i + 1}</div>
								<h3>{module.title}</h3>
							</div>
							<ChevronDown class="module-chevron {openModule === i ? 'rotated' : ''}" />
						</button>
						{#if openModule === i}
							<div class="module-content">
								<p>{module.description}</p>
								<div class="key-application">
									<strong>Key Application:</strong>
									<span>{module.keyApplication}</span>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</Container>
	</section>

	<!-- Section 6: The Opportunity Section (Exclusivity) -->
	<section class="section opportunity-section">
		<Container>
			<div class="text-center">
				<h2 class="section-headline text-primary-accent">
					An Exclusive Invitation: Join Our Founding Cohort
				</h2>
				<p class="section-body max-w-3xl mx-auto">
					As a new course in our "Ignite Series," this is a unique opportunity. By joining now,
					you're not just a student; you're a founding member. You'll not only master AI but also
					help shape the future of this course with direct feedback opportunities. Be part of the
					very first group to gain this expertise and receive a special 'Founding Member'
					designation on your certificate of completion.
				</p>
				<div class="mt-8">
					<AnimatedButton
						text="Secure Your Founding Member Spot"
						icon={ArrowRight}
						on:click={() =>
							openAuthModal(
								'register',
								'Secure Your Launch Offer',
								`Join the waitlist for ${course.name} and get a ${discountPercentage}% discount.`
							)}
						variant="primary"
					/>
				</div>
			</div>
		</Container>
	</section>

	<!-- Section 7: Enrollment & Pricing Section (Redesigned for Clarity) -->
	<section id="enroll" class="section">
		<Container>
			<div class="text-center mb-16">
				<h2 class="section-headline">Unlock Your Potential Today</h2>
				<p class="section-body max-w-3xl mx-auto">
					This is more than a course; it's an investment in your future. Secure your spot in the
					founding cohort and gain a career-defining skill set.
				</p>
			</div>

			<div class="enrollment-layout-v2">
				<!-- Tab Navigation for Mobile -->
				<div class="mobile-enrollment-tabs">
					<button
						class="enrollment-tab"
						class:active={activeEnrollmentTab === 'receive'}
						on:click={() => (activeEnrollmentTab = 'receive')}>What You'll Receive</button
					>
					<button
						class="enrollment-tab"
						class:active={activeEnrollmentTab === 'individual'}
						on:click={() => (activeEnrollmentTab = 'individual')}>Individual</button
					>
					<button
						class="enrollment-tab"
						class:active={activeEnrollmentTab === 'teams'}
						on:click={() => (activeEnrollmentTab = 'teams')}>For Teams</button
					>
				</div>

				<!-- Tab Content Area -->
				<div class="enrollment-content-wrapper">
					<!-- Mobile View: Tabbed Content -->
					{#if !isDesktop}
						{#if activeEnrollmentTab === 'receive'}
							<div class="value-proposition-banner" transition:fade={{ duration: 200 }}>
								<h3 class="text-3xl font-bold mb-8 text-center">What You'll Receive</h3>
								<div class="feature-accordion">
									{#each valuePropositions as item, i}
										<div class="accordion-item">
											<button
												class="accordion-header"
												on:click={() =>
													(openValueProposition = openValueProposition === i ? null : i)}
											>
												<div class="accordion-title">
													<div class="feature-icon-container">
														<svelte:component this={item.icon} class="feature-icon" />
													</div>
													<h4 class="feature-headline">{item.headline}</h4>
												</div>
												<ChevronDown
													class="accordion-chevron {openValueProposition === i ? 'rotated' : ''}"
												/>
											</button>
											{#if openValueProposition === i}
												<div class="accordion-content" transition:fade={{ duration: 200 }}>
													<p class="feature-description">{item.description}</p>
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}

						{#if activeEnrollmentTab === 'individual'}
							<div class="pricing-card primary" transition:fade={{ duration: 200 }}>
								<div class="corner-badge">
									{@html `${discountPercentage}% Off!<br />Launch Offer!!`}
								</div>
								<div class="card-content">
									<h3 class="card-title">Individual Plan</h3>
									<div class="price-display">
										<span class="offer-price">₹{course.offerPrice.toLocaleString('en-IN')}</span>
										<span class="original-price">₹{course.price.toLocaleString('en-IN')}</span>
									</div>
									<div class="urgency-section">
										<p class="urgency-label">Launch Offer Ends In:</p>
										<div class="countdown-timer">
											<span>{countdown.days}</span>d <span>{countdown.hours}</span>h
											<span>{countdown.minutes}</span>m
										</div>
									</div>
									<AnimatedButton
										text={`Join & Secure ${discountPercentage}% Off`}
										icon={ArrowRight}
										on:click={() =>
											openAuthModal(
												'register',
												'Secure Your Launch Offer',
												`Join the waitlist for ${course.name} and get a ${discountPercentage}% discount.`
											)}
										variant="primary"
										customClass="w-full justify-center text-lg py-3 mt-auto"
									/>
								</div>
							</div>
						{/if}

						{#if activeEnrollmentTab === 'teams'}
							<div class="pricing-card enterprise" transition:fade={{ duration: 200 }}>
								<div class="card-content">
									<h3 class="card-title">For Teams & Enterprise</h3>
									<div class="enterprise-features">
										<div class="enterprise-feature-item">
											<div class="feature-icon-wrapper">
												<CheckCircle size={18} />
											</div>
											<span>Equip your entire team with critical AI skills.</span>
										</div>
										<div class="enterprise-feature-item">
											<div class="feature-icon-wrapper">
												<CheckCircle size={18} />
											</div>
											<span>Custom curriculum options & dedicated support.</span>
										</div>
										<div class="enterprise-feature-item">
											<div class="feature-icon-wrapper">
												<CheckCircle size={18} />
											</div>
											<span>Volume discounts & measurable ROI.</span>
										</div>
									</div>
									<AnimatedButton
										text="Request a Demo"
										icon={ArrowRight}
										on:click={() =>
											openAuthModal(
												'register',
												'Request an Enterprise Demo',
												'Learn how our team solutions can accelerate your business.'
											)}
										variant="secondary"
										customClass="w-full justify-center text-lg py-3 mt-auto"
									/>
								</div>
							</div>
						{/if}
					{/if}

					<!-- Desktop View: Grid Content -->
					{#if isDesktop}
						<div class="value-proposition-banner">
							<h3 class="text-3xl font-bold mb-8 text-center">What You'll Receive</h3>
							<div class="feature-accordion">
								{#each valuePropositions as item, i}
									<div class="accordion-item">
										<div class="accordion-header">
											<div class="accordion-title">
												<div class="feature-icon-container">
													<svelte:component this={item.icon} class="feature-icon" />
												</div>
												<div>
													<h4 class="feature-headline">{item.headline}</h4>
													<p class="feature-description">{item.description}</p>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
						<div class="pricing-card primary">
							<div class="corner-badge">
								{@html `${discountPercentage}% Off!<br />Launch Offer!!`}
							</div>
							<div class="card-content">
								<h3 class="card-title">Individual Plan</h3>
								<div class="price-display">
									<span class="offer-price">₹{course.offerPrice.toLocaleString('en-IN')}</span>
									<span class="original-price">₹{course.price.toLocaleString('en-IN')}</span>
								</div>
								<div class="urgency-section">
									<p class="urgency-label">Launch Offer Ends In:</p>
									<div class="countdown-timer">
										<span>{countdown.days}</span>d <span>{countdown.hours}</span>h
										<span>{countdown.minutes}</span>m
									</div>
								</div>
								<AnimatedButton
									text={`Join & Secure ${discountPercentage}% Off`}
									icon={ArrowRight}
									on:click={() =>
										openAuthModal(
											'register',
											'Secure Your Launch Offer',
											`Join the waitlist for ${course.name} and get a ${discountPercentage}% discount.`
										)}
									variant="primary"
									customClass="w-full justify-center text-lg py-3 mt-auto"
								/>
							</div>
						</div>
						<div class="pricing-card enterprise">
							<div class="card-content">
								<h3 class="card-title">For Teams & Enterprise</h3>
								<div class="enterprise-features">
									<div class="enterprise-feature-item">
										<div class="feature-icon-wrapper">
											<CheckCircle size={18} />
										</div>
										<span>Equip your entire team with critical AI skills.</span>
									</div>
									<div class="enterprise-feature-item">
										<div class="feature-icon-wrapper">
											<CheckCircle size={18} />
										</div>
										<span>Custom curriculum options & dedicated support.</span>
									</div>
									<div class="enterprise-feature-item">
										<div class="feature-icon-wrapper">
											<CheckCircle size={18} />
										</div>
										<span>Volume discounts & measurable ROI.</span>
									</div>
								</div>
								<AnimatedButton
									text="Request a Demo"
									icon={ArrowRight}
									on:click={() =>
										openAuthModal(
											'register',
											'Request an Enterprise Demo',
											'Learn how our team solutions can accelerate your business.'
										)}
									variant="secondary"
									customClass="w-full justify-center text-lg py-3 mt-auto"
								/>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</Container>
	</section>

</main>
<div class="footer-stopper" bind:this={footerStopperRef}></div>

<!-- Section 8: Sticky Mobile CTA Footer -->
<div
	class="sticky-cta-footer"
	class:unstick={isFooterIntersecting}
	bind:this={stickyFooterRef}
>
	<div class="footer-content">
		<div class="price-info">
			<span class="final-price">₹{course.offerPrice.toLocaleString('en-IN')}</span>
			<span class="original-price-footer">₹{course.price.toLocaleString('en-IN')}</span>
		</div>
		<AnimatedButton
			text="Join & Secure {discountPercentage}% Off"
			icon={ArrowRight}
			on:click={() =>
				openAuthModal(
					'register',
					'Secure Your Launch Offer',
					`Join the waitlist for ${course.name} and get a ${discountPercentage}% discount.`
				)}
			variant="primary"
			customClass="w-full justify-center"
		/>
	</div>
</div>

<style>
	main {
		padding-bottom: 120px; /* Increase padding to ensure main footer is visible below sticky footer */
	}

	.section {
		padding: 4rem 0; /* Reduced padding for mobile */
	}

	@media (min-width: 1024px) {
		main {
			padding-bottom: 0; /* Remove padding on desktop */
		}
		.section {
			padding: 6rem 0; /* Restore original padding on desktop */
		}
	}


	.section-headline {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 1.5rem;
	}

	.section-body {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 48rem;
	}

	/* Hero Section */
	.hero-section {
		position: relative;
		display: flex;
		align-items: center;
		text-align: left;
		overflow: hidden;
		padding: 4rem 0; /* Mobile padding */
	}
	@media (min-width: 1024px) {
		.hero-section {
			padding: 8rem 0; /* Desktop padding */
		}
	}
	.hero-content {
		position: relative;
		z-index: 3;
	}
	.headline {
		font-size: 2.5rem; /* Mobile font size */
		font-weight: 800;
		margin-bottom: 1rem;
	}
	@media (min-width: 1024px) {
		.headline {
			font-size: 3.5rem; /* Desktop font size */
		}
	}
	.subheading {
		font-size: 1.25rem;
		max-width: 48rem;
		margin: 0 0 2rem;
		color: var(--text-secondary);
	}
	.cta-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 1rem;
	}

	/* Two Column Layout */
	.two-column-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
	}
	@media (min-width: 768px) {
		.two-column-layout {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.stats-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.stat-item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
	.stat-icon-wrapper {
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(79, 209, 197, 0.1);
		color: var(--primary-accent);
	}
	:global(.stat-icon) {
		width: 2rem;
		height: 2rem;
	}
	.stat-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary-accent);
	}
	.stat-text p {
		color: var(--text-secondary);
	}

	/* Transformation Section */
	.transformation-container {
		max-width: 64rem;
		margin: auto;
	}
	.persona-tabs {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 3rem;
	}
	.persona-tab {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		border: 1px solid var(--border-color);
		background-color: transparent;
		color: var(--text-secondary);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	.persona-tab:hover {
		border-color: var(--primary-accent);
		color: var(--primary-accent);
	}
	.persona-tab.active {
		background-color: var(--primary-accent);
		color: var(--background-dark);
		border-color: var(--primary-accent);
		box-shadow: 0 0 20px rgba(8, 217, 214, 0.3);
	}
	.persona-content {
		position: relative;
	}
	.transformation-card {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	@media (min-width: 1024px) {
		.transformation-card {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			align-items: stretch;
		}
	}
	.state-card {
		padding: 2.5rem;
		border-radius: 1rem;
		background-color: var(--container-bg);
		border: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.state-card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}
	.state-card p {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}
	.state-card.before h3 {
		color: var(--text-muted);
	}
	.state-card.after h3 {
		color: var(--primary-accent);
	}
	.transformation-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primary-accent);
		opacity: 0.6;
		transform: rotate(90deg);
	}
	@media (min-width: 1024px) {
		.transformation-arrow {
			transform: rotate(0deg);
		}
	}

	/* Curriculum Section */
	.curriculum-timeline {
		max-width: 100%;
		margin: auto;
	}
	.module-item {
		margin-bottom: 1rem;
	}
	.module-header {
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		padding: 1rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: left;
	}
	.module-title {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.module-number {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background-color: var(--background-dark);
		border: 1px solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: var(--primary-accent);
		flex-shrink: 0; /* Prevent the circle from being squashed */
	}
	.module-header h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
	}
	:global(.module-chevron) {
		color: var(--text-secondary);
		transition: transform 0.2s ease-in-out;
	}
	:global(.module-chevron.rotated) {
		transform: rotate(180deg);
	}
	.module-content {
		padding: 1rem 0 1rem 3.5rem;
		color: var(--text-secondary);
	}
	.key-application {
		margin-top: 1rem;
		padding: 1rem;
		background-color: var(--background-dark);
		border-radius: 0.5rem;
		border: 1px solid var(--border-color);
		font-size: 0.9rem;
	}
	.key-application strong {
		color: var(--primary-accent);
	}

	/* Opportunity Section */
	.opportunity-section {
		background-color: var(--background-dark);
		border-top: 1px solid var(--primary-accent);
		border-bottom: 1px solid var(--primary-accent);
	}
	.text-primary-accent {
		color: var(--primary-accent);
	}

	/* Section 7: Enrollment & Pricing Section (Mobile-First Interactive Layout) */
	.mobile-enrollment-tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		padding: 0.5rem;
		background-color: var(--background-dark);
		border-radius: 9999px;
		border: 1px solid var(--border-color);
	}

	.enrollment-tab {
		flex: 1;
		padding: 0.75rem 0.5rem;
		border-radius: 9999px;
		border: 1px solid transparent;
		background-color: transparent;
		color: var(--text-secondary);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
	}

	.enrollment-tab.active {
		background-color: var(--primary-accent);
		color: var(--background-dark);
		box-shadow: 0 0 15px rgba(8, 217, 214, 0.25);
	}

	.enrollment-content-wrapper {
		/* This wrapper is for logical grouping and desktop layout */
	}

	/* Desktop Layout Restoration */
	@media (min-width: 1024px) {
		.mobile-enrollment-tabs {
			display: none; /* Hide mobile tabs on desktop */
		}

		.enrollment-layout-v2 {
			display: flex;
			flex-direction: column;
			gap: 4rem;
			max-width: 72rem;
			margin: auto;
		}

		/* On desktop, we use a grid for the pricing cards */
		.enrollment-content-wrapper {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
			align-items: stretch;
		}

		/* The "What you receive" banner should span both columns */
		.value-proposition-banner {
			grid-column: 1 / -1;
		}

		/* The Svelte {#if} blocks handle visibility, so we just need to ensure
		   the elements are displayed correctly inside the grid. */
		.pricing-card {
			display: flex;
		}
	}

	/* --- Original Styles for Components (must be preserved) --- */

	/* Full-Width Banner */
	.value-proposition-banner {
		background-color: var(--container-bg);
		padding: 3rem 2.5rem;
		border-radius: 1rem;
		border: 1px solid var(--border-color);
		width: 100%;
		flex-direction: column; /* Ensure it behaves correctly when display:flex is added */
	}

	.feature-accordion {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.accordion-item {
		border: 1px solid var(--border-color);
		border-radius: 0.75rem;
		background-color: rgba(255, 255, 255, 0.03);
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1rem 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	.accordion-title {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.accordion-content {
		padding: 0 1.5rem 1.5rem 5rem; /* Align with headline text */
	}

	:global(.accordion-chevron) {
		color: var(--text-secondary);
		transition: transform 0.2s ease-in-out;
		flex-shrink: 0;
	}

	:global(.accordion-chevron.rotated) {
		transform: rotate(180deg);
	}

	/* Desktop: Revert to Grid Layout */
	@media (min-width: 1024px) {
		.feature-accordion {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 2.5rem;
		}

		.accordion-item {
			/* Reset accordion-specific styles */
			border: 1px solid transparent;
			padding: 1.5rem;
			transition: all 0.3s ease;
		}

		.accordion-item:hover {
			transform: translateY(-5px);
			border-color: var(--primary-accent);
		}

		.accordion-header {
			padding: 0;
			pointer-events: none; /* Disable button behavior on desktop */
		}

		.accordion-title {
			flex-direction: row;
			align-items: flex-start;
		}

		:global(.accordion-chevron) {
			display: none; /* Hide chevron on desktop */
		}

		.accordion-content {
			display: block !important; /* Ensure content is always visible */
			padding: 0;
			margin-top: 0.25rem;
		}
	}

	.feature-icon-container {
		flex-shrink: 0;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(145deg, rgba(8, 217, 214, 0.1), rgba(8, 217, 214, 0.05));
		color: var(--primary-accent);
	}

	:global(.feature-icon) {
		width: 1.75rem;
		height: 1.75rem;
	}

	.feature-headline {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.25rem 0;
	}

	.feature-description {
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	.pricing-card {
		border-radius: 1rem;
		display: flex; /* Use flexbox to help with alignment */
		flex-direction: column;
		text-align: center;
		overflow: hidden; /* Important for corner badge */
	}

	.pricing-card.primary {
		border: 1px solid var(--primary-accent);
		box-shadow: 0 10px 30px -15px rgba(8, 217, 214, 0.3), 0 4px 6px -2px rgba(8, 217, 214, 0.1);
		position: relative;
		background: linear-gradient(145deg, var(--container-bg) 0%, var(--background-dark) 100%);
	}

	.pricing-card.enterprise {
		border: 1px solid var(--border-color);
		background: linear-gradient(145deg, hsl(220, 15%, 20%) 0%, hsl(220, 15%, 15%) 100%);
		box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.pricing-card.enterprise:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px -15px rgba(8, 217, 214, 0.3), 0 8px 10px -4px rgba(8, 217, 214, 0.1);
		border-color: var(--primary-accent-hover);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1; /* This makes the content fill the card, aligning footers */
		padding: 2.5rem;
	}

	.pricing-card .card-title {
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.enterprise-features {
		display: flex;
		flex-direction: column;
		gap: 1.25rem; /* Vertical space between feature items */
		margin: 1.5rem 0 2.5rem 0; /* Top and bottom margin */
		flex-grow: 1;
		color: var(--text-secondary);
	}

	.enterprise-feature-item {
		display: flex;
		align-items: center;
		gap: 1rem; /* Space between icon and text */
		text-align: left;
	}

	.feature-icon-wrapper {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(8, 217, 214, 0.1);
		color: var(--primary-accent);
	}


	.corner-badge {
		position: absolute;
		top: 35px;
		right: -50px;
		background-color: var(--primary-accent);
		color: var(--background-dark);
		padding: 0.75rem 0;
		font-weight: 700;
		font-size: 0.875rem;
		transform: rotate(45deg);
		width: 250px;
		text-align: center;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	/* Mobile-specific adjustments for the banner */
	@media (max-width: 767px) {
		.corner-badge {
			top: 20px;
			right: -60px;
			width: 200px;
			font-size: 0.75rem;
			padding: 0.5rem 0;
			line-height: 1.2;
			padding-top: 0.75rem; /* Add padding to accommodate two lines */
			top: 25px;
			right: -55px;
		}
	}

	.price-display {
		margin: 1.5rem 0;
	}

	.offer-price {
		font-size: 4.5rem;
		font-weight: 900;
		color: var(--primary-accent);
		line-height: 1;
		display: block;
	}

	.original-price {
		font-size: 1.75rem;
		text-decoration: line-through;
		color: var(--text-muted);
		opacity: 0.8;
		display: block;
		margin-top: 0.5rem;
	}

	.urgency-section {
		margin: 1.5rem 0;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 0.75rem;
		border: 1px solid var(--border-color);
	}

	.urgency-label {
		font-weight: 600;
		color: var(--text-secondary);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.countdown-timer {
		color: var(--text-primary);
		font-size: 1.5rem;
		font-weight: 700;
	}
	.countdown-timer span {
		color: var(--primary-accent);
	}

	/* Sticky CTA Footer */
	.sticky-cta-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--background-dark);
		border-top: 1px solid var(--border-color);
		padding: 1rem 1.5rem;
		z-index: 1000;
		box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
		display: none; /* Hidden by default */
		transition: transform 0.3s ease-in-out;
	}

	.sticky-cta-footer.unstick {
		position: absolute;
		transform: translateY(100%);
	}

	.footer-stopper {
		height: 1px;
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.price-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex-shrink: 0;
	}

	.final-price {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-accent);
	}

	.original-price-footer {
		font-size: 1rem;
		text-decoration: line-through;
		color: var(--text-muted);
	}

	/* Show footer only on mobile screens */
	@media (max-width: 1023px) {
		.sticky-cta-footer {
			display: block;
		}
	}
</style>