<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let isHovered: boolean = false;
	export let source: string;

	let bars: SVGRectElement[] = [];
	let tl: gsap.core.Timeline;

	onMount(() => {
		tl = gsap.timeline({ paused: true });
		tl.from(bars, {
			scaleY: 0,
			duration: 0.8,
			ease: 'power3.out',
			stagger: 0.2,
			transformOrigin: 'bottom'
		});
	});

	$: {
		if (isHovered && tl) {
			tl.play();
		}
	}
</script>

<div class="infographic-wrapper">
	<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
		<!-- Axes -->
		<line x1="10" y1="90" x2="90" y2="90" stroke="var(--text-secondary)" stroke-width="1" />
		<line x1="10" y1="10" x2="10" y2="90" stroke="var(--text-secondary)" stroke-width="1" />

		<!-- Bars -->
		<g class="chart-bars">
			<rect bind:this={bars[0]} x="20" y="30" width="15" height="60" class="bar" />
			<rect bind:this={bars[1]} x="45" y="50" width="15" height="40" class="bar" />
			<rect bind:this={bars[2]} x="70" y="70" width="15" height="20" class="bar" />
		</g>
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
		overflow: visible;
	}
	.bar {
		fill: var(--primary-accent);
	}
</style>