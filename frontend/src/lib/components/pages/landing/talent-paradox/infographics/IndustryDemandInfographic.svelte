<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let isHovered: boolean = false;
	export let source: string;

	let bar: SVGRectElement;
	let tl: gsap.core.Timeline;
	const percentage = 97;

	onMount(() => {
		tl = gsap.timeline({ paused: true });
		tl.from(bar, {
			attr: { width: 0 },
			duration: 1.5,
			ease: 'power3.inOut'
		});
	});

	$: {
		if (isHovered && tl) {
			tl.play();
		}
	}
</script>

<div class="infographic-wrapper">
	<svg viewBox="0 0 100 100">
		<!-- Background bar -->
		<rect x="10" y="40" width="80" height="20" class="background-bar" />
		<!-- Demand bar (97%) -->
		<rect
			bind:this={bar}
			x="10"
			y="40"
			width={(80 * percentage) / 100}
			height="20"
			class="demand-bar"
		/>
	</svg>
</div>

<style>
	.infographic-wrapper {
		width: 100%;
		height: 100%;
	}
	.background-bar {
		fill: var(--background-tertiary);
	}
	.demand-bar {
		fill: var(--primary-accent);
	}
</style>