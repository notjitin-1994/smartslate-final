<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { quintOut } from 'svelte/easing';

	export let endValue: number;
	export let duration = 1500;

	let element: HTMLElement;
	let isVisible = false;

	const counter = tweened(0, {
		duration,
		easing: quintOut
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					isVisible = true;
					counter.set(endValue);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<span bind:this={element}>
	{Math.round($counter)}%
</span>