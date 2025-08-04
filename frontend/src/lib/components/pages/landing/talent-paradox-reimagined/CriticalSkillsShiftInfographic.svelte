<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Code,
		MessageSquare,
		Book,
		Laptop,
		BrainCircuit,
		BarChart2,
		HeartHandshake,
		Wind
	} from 'lucide-svelte';

	let element: HTMLElement;
	let visible = false;
	export let source: string;

	const skills = {
		today: [
			{ text: 'Technical Proficiency', icon: Code },
			{ text: 'Communication', icon: MessageSquare },
			{ text: 'Domain Knowledge', icon: Book },
			{ text: 'Digital Literacy', icon: Laptop }
		],
		future: [
			{ text: 'AI & ML Literacy', icon: BrainCircuit },
			{ text: 'Analytical Thinking', icon: BarChart2 },
			{ text: 'Emotional Intelligence', icon: HeartHandshake },
			{ text: 'Adaptability & Resilience', icon: Wind }
		]
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div class="infographic-container" bind:this={element}>
	<div class="column" class:visible>
		<h3>Core Skills: Today</h3>
		<ul>
			{#each skills.today as skill, i}
				<li style="transition-delay: {i * 100}ms">
					<svelte:component this={skill.icon} size={20} />
					<span>{skill.text}</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="arrow-container" class:visible>
		<svg viewBox="0 0 100 150" preserveAspectRatio="none">
			<path
				d="M50,10 C80,40 20,110 50,140"
				stroke="url(#gradient)"
				stroke-width="4"
				fill="transparent"
				stroke-linecap="round"
				class="arrow-path"
			/>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0" />
					<stop offset="100%" stop-color="var(--color-primary)" stop-opacity="1" />
				</linearGradient>
			</defs>
		</svg>
		<div class="label">40% Skills Shift</div>
	</div>

	<div class="column" class:visible style="transition-delay: 200ms">
		<h3>Core Skills: 2030</h3>
		<ul>
			{#each skills.future as skill, i}
				<li style="transition-delay: {i * 100 + 200}ms">
					<svelte:component this={skill.icon} size={20} />
					<span>{skill.text}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.infographic-container {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: var(--space-lg);
		margin: var(--space-xl) 0;
		padding: var(--space-lg);
		background: rgba(15, 23, 42, 0.6);
		border-radius: var(--border-radius-lg);
	}

	.column {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	.column.visible {
		opacity: 1;
		transform: translateY(0);
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-lg);
		text-align: center;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		margin-bottom: var(--space-md);
		font-size: 1rem;
		opacity: 0;
		transform: translateX(-20px);
		transition:
			opacity 0.5s ease-out,
			transform 0.5s ease-out;
	}

	.column.visible li {
		opacity: 1;
		transform: translateX(0);
	}

	li :global(svg) {
		color: var(--primary-accent);
	}

	.arrow-container {
		width: 80px;
		height: 150px;
		position: relative;
		opacity: 0;
		transform: scale(0.8);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
		transition-delay: 0.4s;
	}

	.arrow-container.visible {
		opacity: 1;
		transform: scale(1);
	}

	.arrow-path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: draw 2s ease-in-out forwards;
		animation-delay: 0.5s;
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	.arrow-container .label {
		font-size: var(--font-size-sm);
		font-weight: bold;
		color: var(--secondary-accent);
		margin-top: var(--space-xs);
		opacity: 0;
		animation: fadeIn 1s ease-in-out forwards;
		animation-delay: 1.5s;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
	@media (max-width: 768px) {
		.infographic-container {
			grid-template-columns: 1fr;
			gap: var(--space-md);
			padding: var(--space-md);
		}

		.arrow-container {
			transform: rotate(90deg) scale(0.8);
			margin: -20px 0;
		}

		.arrow-container.visible {
			transform: rotate(90deg) scale(1);
		}
	}
</style>