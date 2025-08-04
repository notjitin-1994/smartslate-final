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
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
			title: 'Signature Content Creation',
			description:
				'We build your programs from the ground up. Every module, case study, and assessment is crafted to speak your internal language and solve your specific challenges, ensuring seamless adoption and relevance.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>`,
			title: 'Your Intellectual Property, Guaranteed',
			description:
				'Your custom curriculum is yours alone. It remains a confidential, competitive asset designed exclusively for your teams, never to be shared or resold.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>`,
			title: 'Precision Skill Enhancement',
			description:
				'We deliver laser-focused training that targets your most critical skill gaps. This ensures maximum impact on performance, eliminates wasted training spend, and delivers a clear return on your investment.'
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