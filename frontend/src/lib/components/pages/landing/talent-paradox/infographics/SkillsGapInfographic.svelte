<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let isHovered: boolean = false;
	export let source: string;

	let gapRect: SVGRectElement;
	let tl: gsap.core.Timeline;

	onMount(() => {
		tl = gsap.timeline({ paused: true });
		tl.from(gapRect, {
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
		<!-- Gap bar (40%) -->
		<rect bind:this={gapRect} x="10" y="40" width="32" height="20" class="gap-bar" />
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
	.gap-bar {
		fill: var(--primary-accent);
	}
</style>