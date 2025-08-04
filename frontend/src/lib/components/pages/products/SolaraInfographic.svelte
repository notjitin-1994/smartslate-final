<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let visible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		const element = document.querySelector('.infographic-container');
		if (element) observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	});

	const features = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.32 1.011l-4.194 4.011a.563.563 0 0 0-.162.524l1.28 5.318a.563.563 0 0 1-.844.57l-4.796-2.927a.563.563 0 0 0-.576 0l-4.796 2.927a.563.563 0 0 1-.844-.57l1.28-5.318a.563.563 0 0 0-.162-.524l-4.194-4.011a.563.563 0 0 1 .32-1.011l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>`,
			title: 'Solara Polaris',
			description:
				'Instantly translate stakeholder needs into actionable learning requirements, ensuring that every course is aligned with business goals from the start.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" /></svg>`,
			title: 'Solara Constellation',
			description:
				'Transform raw content into structured learning blueprints automatically, saving countless hours of manual instructional design work.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 013.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.575L16.5 21.75l-.398-1.175a3.375 3.375 0 00-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 002.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 00-2.456 2.456z" /></svg>`,
			title: 'Solara Nova',
			description:
				'Build powerful, interactive learning experiences with an AI-assisted authoring tool that makes content creation fast, easy, and engaging.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.667a8.25 8.25 0 0 1 11.667 0l3.181 3.183m-14.85-3.183L16.023 9.348" /></svg>`,
			title: 'Solara Orbit',
			description:
				'Deliver personalized learning journeys and host all your courses in one place, creating a seamless and unified learning experience for your users.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>`,
			title: 'Solara Spectrum',
			description:
				'Reveal deep insights into your learning effectiveness by analyzing complex data and presenting it with clarity.'
		}
	];
</script>

<div class="infographic-container" in:fade={{ duration: 600 }}>
	<div class="infographic">
		{#each features as feature, i (i)}
			<div
				class="feature"
				in:fly={{
					y: 50,
					duration: 600,
					delay: i * 100,
					easing: quintOut
				}}
				out:fade
			>
				<div class="icon">
					{@html feature.icon}
				</div>
				<h3 class="title">{feature.title}</h3>
				<p class="description">{feature.description}</p>
			</div>
		{/each}

		<div
			class="sparkle"
			class:visible
			in:fade={{
				delay: 1000,
				duration: 1000
			}}
		>
			<div class="sparkle-dot dot-1"></div>
			<div class="sparkle-dot dot-2"></div>
		</div>
	</div>
</div>

<style>
	.infographic-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.infographic {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		counter-reset: feature;
	}

	.feature {
		position: relative;
		padding: 2rem 1.5rem;
		background: var(--container-bg);
		border-radius: 12px;
		box-shadow: var(--shadow-lg);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		z-index: 1;
		overflow: hidden;
		border: 1px solid var(--border-color);
	}

	.feature::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #4F46E5, #7C3AED);
	}

	.feature:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-xl);
	}

	.icon {
		margin-bottom: 1.5rem;
		opacity: 0.9;
		color: var(--text-secondary);
	}

	.icon :global(svg) {
		width: 40px;
		height: 40px;
	}

	.title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.description {
		color: var(--text-secondary);
		line-height: 1.6;
		font-size: 0.95rem;
	}

	.sparkle {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0;
		transition: opacity 1s ease;
	}

	.sparkle.visible {
		opacity: 1;
	}

	.sparkle-dot {
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: linear-gradient(135deg, #8B5CF6, #4F46E5);
		filter: blur(1px);
		opacity: 0;
	}

	.dot-1 {
		top: 20%;
		left: 15%;
		animation: float 6s ease-in-out infinite;
	}

	.dot-2 {
		top: 60%;
		right: 20%;
		animation: float 7s ease-in-out 1s infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) scale(1);
			opacity: 0.7;
		}
		50% {
			transform: translateY(-20px) scale(1.2);
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.infographic {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.feature {
			padding: 1.5rem;
		}
	}
</style>