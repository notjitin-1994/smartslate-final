<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let isHovered: boolean = false;
	export let source: string;

	let circle: SVGCircleElement;
	let text: SVGTextElement;
	let tl: gsap.core.Timeline;

	const percentage = 43;
	const circumference = 2 * Math.PI * 40; // r = 40

	onMount(() => {
		const offset = circumference * (1 - percentage / 100);
		gsap.set(circle, { strokeDashoffset: circumference });

		tl = gsap.timeline({ paused: true });

		tl.to(circle, {
			strokeDashoffset: offset,
			duration: 1.5,
			ease: 'power2.inOut'
		}).to(
			text,
			{
				textContent: percentage,
				roundProps: 'textContent',
				duration: 1.5,
				ease: 'power2.inOut'
			},
			'<'
		);
	});

	$: {
		if (isHovered && tl) {
			tl.play();
		}
	}
</script>

<div class="infographic-wrapper">
	<svg viewBox="0 0 100 100">
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="var(--primary-accent)" />
				<stop offset="100%" stop-color="var(--secondary-accent)" />
			</linearGradient>
		</defs>
		<circle class="background-circle" cx="50" cy="50" r="40" />
		<circle
			bind:this={circle}
			class="progress-circle"
			cx="50"
			cy="50"
			r="40"
			stroke-dasharray={circumference}
		/>
		<text bind:this={text} class="percentage-text" x="50" y="55" text-anchor="middle">0%</text>
	</svg>
</div>

<style>
	.infographic-wrapper {
		width: 100%;
		height: 100%;
	}
	svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
		overflow: visible;
	}
	.background-circle {
		fill: none;
		stroke: var(--background-tertiary);
		stroke-width: 12;
	}
	.progress-circle {
		fill: none;
		stroke: url(#gradient);
		stroke-width: 12;
		stroke-linecap: round;
	}
	.percentage-text {
		font-size: 1.8rem;
		font-weight: 700;
		fill: var(--text-primary);
		transform: rotate(90deg);
		transform-origin: 50% 50%;
	}
</style>