<script lang="ts">
	import AnimatedCounter from '$lib/components/pages/common/AnimatedCounter.svelte';
	import { fadeInOnScroll } from '$lib/actions/fadeInOnScroll';
	import { parallax } from '$lib/actions/parallax';
	import Container from '$lib/components/pages/common/Container.svelte';
</script>

<svelte:head>
	<title>The Smartslate Difference</title>
	<meta name="description" content="Discover why our intelligent learning systems create agile, future-proof professionals." />
</svelte:head>

<div class="page-container">
	<!-- Section 1: Hero -->
	<section class="hero-section" use:fadeInOnScroll>
		<Container>
			<h1>Don't Just Learn. Evolve.</h1>
			<p class="subheading">In an era of unprecedented change, generic learning is a dead end. We don't just teach skills; we build intelligent learning systems that create agile, future-proof professionals.</p>
		</Container>
	</section>

	<!-- Section 2: The Data-Driven Argument -->
	<section class="data-section" use:fadeInOnScroll={{ delay: 250 }}>
		<Container>
			<h2>The Future is Personalized. The Data is Clear.</h2>
			<p class="subheading">The one-size-fits-all model is failing. The most successful organizations and individuals are embracing a new paradigm.</p>
			<div class="stats-grid">
				<div class="stat-card">
					<span class="stat-number"><AnimatedCounter endValue={50} /></span>
					<p class="stat-label">Learners retain up to 50% more information through personalized, self-paced learning compared to traditional methods.</p>
				</div>
				<div class="stat-card">
					<span class="stat-number"><AnimatedCounter endValue={200} /></span>
					<p class="stat-label">Companies that invest in personalized AI-driven training see, on average, a 200% higher revenue per employee.</p>
				</div>
				<div class="stat-card">
					<span class="stat-number"><AnimatedCounter endValue={94} /></span>
					<p class="stat-label">94% of learners prefer to study at their own pace, leading to higher completion rates and greater job satisfaction.</p>
				</div>
			</div>
		</Container>
	</section>

	<!-- Section 3: Our Unique Approach -->
	<section class="approach-section" use:fadeInOnScroll={{ delay: 250 }}>
		<Container>
			<h2>This Isn't Just Different. It's a New Class of Learning.</h2>
			<div class="approach-grid">
				<div class="approach-card">
					<div class="approach-text">
						<h3>Your Personal AI Tutor</h3>
						<p>Imagine a guide that knows your learning style, anticipates your questions, and provides real-time feedback. Every Smartslate Ignite course is embedded with an AI Tutor that provides a truly personalized one-on-one learning experience, a feature available for integration into our custom Strategic Skills Architecture.</p>
					</div>
					<div class="approach-visual" use:parallax={{ speed: 0.2 }}>
						<div class="visual-shape shape-1"></div>
					</div>
				</div>
				<div class="approach-card">
					<div class="approach-text">
						<h3>Intelligence-Led Curriculum Design</h3>
						<p>Our course catalog isn't based on trends; it's forged from deep industry intelligence. We collaborate directly with top industry leaders and hiring managers to build our Ignite Series, ensuring every module is hyper-relevant and delivers skills that companies are hiring for right now.</p>
					</div>
					<div class="approach-visual" use:parallax={{ speed: 0.2 }}>
						<div class="visual-shape shape-2"></div>
					</div>
				</div>
				<div class="approach-card">
					<div class="approach-text">
						<h3>Engineered for Measurable Impact</h3>
						<p>Our Strategic Skills Architecture is more than just training; it's a bespoke solution. We work with you to build learning programs from the ground up, designed for targeted skill acquisition and measurable business outcomes. No guesswork, just results.</p>
					</div>
					<div class="approach-visual" use:parallax={{ speed: 0.2 }}>
						<div class="visual-shape shape-3"></div>
					</div>
				</div>
			</div>
		</Container>
	</section>

	<!-- Section 4: The Final Call to Action -->
	<section class="cta-section" use:fadeInOnScroll={{ delay: 250 }}>
		<Container>
			<h2>Join the Vanguard.</h2>
			<p class="subheading">The choice is between being shaped by the future or being one of its architects. Let's build your advantage.</p>
			<a href="/courses" class="btn-primary">Explore Our Courses</a>
		</Container>
	</section>
</div>

<style>
	.page-container {
		--section-padding: clamp(4rem, 10vh, 8rem);
		display: flex;
		flex-direction: column;
		gap: var(--section-padding);
		padding: var(--section-padding) 0;
	}

	section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: center;
	}

	h1, h2 {
		font-family: var(--font-display);
		font-weight: 600;
		line-height: 1.2;
		color: var(--text-primary);
		text-align: left;
	}

	h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
	}

	h2 {
		font-size: clamp(2rem, 4vw, 3rem);
	}

	.subheading {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--text-secondary);
		max-width: 60ch;
		text-align: left;
		margin: 1rem 0 0;
	}

	/* Hero Section */
	.hero-section {
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
	}

	/* Data Section */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 4rem;
		width: 100%;
	}

	.stat-card {
		background-color: rgba(9, 21, 33, 0.25);
		border: var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: 2rem;
		text-align: left;
	}

	.stat-number {
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 700;
		color: var(--primary-accent);
		display: block;
		line-height: 1;
	}

	.stat-label {
		margin-top: 1rem;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* Approach Section */
	.approach-section .approach-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
		margin-top: 4rem;
	}

	.approach-card {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: center;
	}
	
	.approach-text {
		grid-row: 1;
	}

	.approach-card h3 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-family: var(--font-display);
		color: var(--primary-accent);
		margin-bottom: 1rem;
	}

	.approach-card p {
		color: var(--text-secondary);
		max-width: 65ch;
		margin: 0;
	}

	.approach-visual {
		display: none; /* Hidden on mobile */
		position: relative;
		height: 200px;
	}

	.visual-shape {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		opacity: 0.1;
	}

	.shape-1 {
		width: 150px;
		height: 150px;
		background: radial-gradient(circle, var(--primary-accent), transparent 60%);
		animation: morph 8s ease-in-out infinite;
	}

	.shape-2 {
		width: 180px;
		height: 180px;
		background: radial-gradient(circle, var(--secondary-accent), transparent 60%);
		animation: morph 10s ease-in-out infinite reverse;
	}

	.shape-3 {
		width: 120px;
		height: 120px;
		background: radial-gradient(circle, #4f46e5, transparent 60%);
		animation: morph 9s ease-in-out infinite;
	}

	@keyframes morph {
		0% {
			border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		}
		50% {
			border-radius: 60% 40% 30% 70% / 70% 60% 40% 30%;
		}
		100% {
			border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		}
	}

	/* CTA Section */
	.cta-section {
		text-align: left;
	}

	.btn-primary {
		background-color: #4f46e5;
		color: #ffffff;
		padding: 1rem 2.5rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		font-weight: bold;
		font-size: 1rem;
		transition: var(--transition-fast);
		display: inline-block;
		margin-top: 2rem;
	}

	.btn-primary:hover {
		opacity: 0.9;
		transform: translateY(-2px);
	}

	/* Responsive Layouts */
	@media (min-width: 768px) {
		.approach-visual {
			display: block;
		}

		.approach-card {
			grid-template-columns: 1fr 1fr;
		}

		.approach-card:nth-child(even) .approach-text {
			grid-column: 2 / 3;
			text-align: left;
		}

		.approach-card:nth-child(even) .approach-visual {
			grid-column: 1 / 2;
			grid-row: 1;
		}
	}
</style>