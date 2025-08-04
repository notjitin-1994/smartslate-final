<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isVisible = false;

	onMount(() => {
		const timer = setTimeout(() => {
			isVisible = true;
		}, 300);
		return () => clearTimeout(timer);
	});

	const startYear = 2024;
	const endYear = 2030;
	const disruptionPercentage = 40;

	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

	const currentSkills = [
		{ name: 'Technical Proficiency', icon: '🔧' },
		{ name: 'Communication', icon: '🤝' },
		{ name: 'Domain Knowledge', icon: '📚' },
		{ name: 'Digital Literacy', icon: '💻' }
	];

	const futureSkills = [
		{ name: 'AI & ML Literacy', icon: '🧠' },
		{ name: 'Analytical Thinking', icon: '💡' },
		{ name: 'Emotional Intelligence', icon: '❤️' },
		{ name: 'Adaptability & Resilience', icon: '🔄' }
	];
</script>

<div class="infographic-content">
	<h4>The Critical Skills Gap</h4>
	<p class="subtitle">
		An estimated <span class="highlight">{disruptionPercentage}%</span> of core job skills are
		expected to change by {endYear}, demanding a new approach to talent development.
	</p>

	{#if isVisible}
		<div class="timeline-wrapper">
			<div class="progress-bar-container" in:fade={{ delay: 200, duration: 500 }}>
				<div class="progress-bar"></div>
				<div class="disruption-marker" style:left={`${100 - disruptionPercentage}%`}>
					<div class="marker-label">{disruptionPercentage}% Skills Shift</div>
				</div>
			</div>
			<div class="years-container">
				{#each years as year, i}
					<div class="year-marker" in:fade={{ delay: 400 + i * 100, duration: 400 }}>
						<div class="year-dot" class:future={year >= 2028}></div>
						<div class="year-label">{year}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="skills-comparison">
			<div class="skill-card" in:fade={{ delay: 800, duration: 500 }}>
				<h5>Current Core Skills</h5>
				<ul>
					{#each currentSkills as skill}
						<li>
							<span>{skill.icon}</span>
							{skill.name}
						</li>
					{/each}
				</ul>
			</div>
			<div class="skill-card future" in:fade={{ delay: 900, duration: 500 }}>
				<h5>{endYear} Core Skills</h5>
				<ul>
					{#each futureSkills as skill}
						<li>
							<span>{skill.icon}</span>
							{skill.name}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
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
		margin-bottom: 2.5rem;
		max-width: 60ch;
	}

	.highlight {
		color: var(--primary-accent);
		font-weight: 600;
	}

	.timeline-wrapper {
		margin-bottom: 3rem;
	}

	.progress-bar-container {
		position: relative;
		height: 8px;
		background-color: var(--border-color);
		border-radius: 4px;
		margin: 0 auto;
	}

	.progress-bar {
		height: 100%;
		width: 100%;
		background: linear-gradient(90deg, var(--primary-accent), var(--secondary-accent));
		border-radius: 4px;
		transform-origin: left;
	}

	.disruption-marker {
		position: absolute;
		top: -4px;
		height: 16px;
		width: 4px;
		background-color: var(--primary-accent);
		border-radius: 2px;
		transform: translateX(-50%);
	}

	.marker-label {
		position: absolute;
		bottom: 120%;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--primary-accent);
		color: white;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.years-container {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
	}

	.year-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.year-dot {
		width: 12px;
		height: 12px;
		background-color: var(--border-color);
		border-radius: 50%;
		margin-bottom: 0.5rem;
	}
	.year-dot.future {
		background-color: var(--primary-accent);
	}

	.year-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.skills-comparison {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.skills-comparison {
			grid-template-columns: 1fr 1fr;
		}
	}

	.skill-card {
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.skill-card.future {
		border-color: rgba(167, 218, 219, 0.3);
	}

	.skill-card h5 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.skill-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.skill-card li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--text-secondary);
	}

	.skill-card li span {
		font-size: 1.25rem;
	}
</style>
