<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { User } from 'lucide-svelte';

	let isVisible = false;

	onMount(() => {
		const timer = setTimeout(() => {
			isVisible = true;
		}, 300);
		return () => clearTimeout(timer);
	});

	const totalPeople = 100;
	const learningCount = 97;

	const people = Array.from({ length: totalPeople }, (_, i) => ({
		id: i,
		wantsToLearn: i < learningCount
	}));
</script>

<div class="infographic-content">
	<h4>Evolving Industry Demand</h4>
	<p class="subtitle">
		An overwhelming <span class="highlight">{learningCount}%</span> of young professionals actively seek
		on-the-job training opportunities to stay relevant.
	</p>

	{#if isVisible}
		<div class="grid-container">
			{#each people as person, i (person.id)}
				<div class="person-icon" in:fade={{ duration: 500, delay: i * 10 }}>
					<User
						size={20}
						strokeWidth={1.5}
						class={person.wantsToLearn ? 'wants-learn' : 'content'}
					/>
				</div>
			{/each}
		</div>
	{/if}

	<div class="legend">
		<div class="legend-item">
			<div class="legend-icon-wrapper">
				<User size={16} class="wants-learn" />
			</div>
			<span>{learningCount}% Demand Learning</span>
		</div>
		<div class="legend-item">
			<div class="legend-icon-wrapper">
				<User size={16} class="content" />
			</div>
			<span>{100 - learningCount}% Content</span>
		</div>
	</div>
</div>

<style>
	.infographic-content {
		background-color: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		padding: 1.5rem;
		min-height: 400px;
	}

	h4 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.subtitle {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
		max-width: 50ch;
	}

	.highlight {
		color: var(--secondary-accent);
		font-weight: 600;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.person-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1 / 1;
	}

	.person-icon :global(.wants-learn) {
		color: var(--secondary-accent);
	}

	.person-icon :global(.content) {
		color: var(--border-color);
	}

	.legend {
		display: flex;
		justify-content: center;
		gap: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.legend-icon-wrapper {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.05);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.legend-icon-wrapper :global(.wants-learn) {
		color: var(--secondary-accent);
	}

	.legend-icon-wrapper :global(.content) {
		color: var(--border-color);
	}
</style>
