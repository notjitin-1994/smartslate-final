<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Container from '$lib/components/pages/common/Container.svelte';

	const paradoxData = [
		{
			superhead: 'The Economic Impact',
			stat: '$2.5T',
			subhead: 'Projected GDP Loss by 2030',
			description:
				"Failure to bridge the skills gap could cost India trillions in lost GDP, hindering its path to becoming a global economic powerhouse."
		},
		{
			superhead: 'The Employability Crisis',
			stat: '43%',
			subhead: 'Of Graduates are Job-Ready',
			description:
				'A stark gap between academic curricula and industry demands leaves a majority of the emerging workforce unprepared for modern roles.'
		},
		{
			superhead: 'The Critical Skills Gap',
			stat: '40%',
			subhead: 'Of Core Skills Will Change by 2030',
			description:
				'The relentless pace of technological evolution means today’s critical skills are rapidly becoming obsolete, demanding continuous adaptation.'
		},
		{
			superhead: 'Evolving Industry Demand',
			stat: '97%',
			subhead: 'Of Professionals Seek On-the-Job Training',
			description:
				'The workforce itself recognizes the urgency, with an overwhelming majority demanding opportunities for continuous learning and development.'
		}
	];

	import gsap from 'gsap';
	import { SplitText } from 'gsap/dist/SplitText';
	import EconomicImpactInfographic from './infographics/EconomicImpactInfographic.svelte';
	import EmployabilityCrisisInfographic from './infographics/EmployabilityCrisisInfographic.svelte';
	import SkillsGapInfographic from './infographics/SkillsGapInfographic.svelte';
	import IndustryDemandInfographic from './infographics/IndustryDemandInfographic.svelte';

	let cards: HTMLElement[] = [];
	let visibleStates = Array(paradoxData.length).fill(false);

	onMount(() => {
		gsap.registerPlugin(SplitText);

		const observers: IntersectionObserver[] = [];

		cards.forEach((card, index) => {
			const stat = card.querySelector('.stat');
			if (!stat) return;

			const tl = gsap.timeline({ paused: true });

			try {
				const split = new SplitText(stat, { type: 'chars' });
				tl.from(split.chars, {
					duration: 0.8,
					opacity: 0,
					y: 80,
					rotationX: -90,
					stagger: {
						each: 0.05,
						from: 'random'
					}
				});
			} catch (e) {
				console.warn('SplitText plugin not available, using fallback.');
				tl.from(stat, { duration: 0.5, autoAlpha: 0, y: 20 });
			}

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							visibleStates[index] = true;
							tl.play();
							observer.unobserve(card);
						}
					});
				},
				{ threshold: 0.2 }
			);

			observer.observe(card);
			observers.push(observer);
		});

		return () => {
			observers.forEach((observer) => observer.disconnect());
		};
	});
</script>

<div class="narrative-container">
	<Container>
		<div class="header-content">
			<h2>The Talent Paradox</h2>
			<p>
				India stands at a critical juncture. The path to becoming a global economic leader is paved
				with talent, yet a multifaceted skills crisis threatens to undermine this ambition. The
				following narrative breaks down the urgency of this challenge.
			</p>
		</div>

		<div class="cards-wrapper">
			{#each paradoxData as item, i}
				<div class="paradox-card" bind:this={cards[i]}>
					<div class="card-content">
						<span class="superhead">{item.superhead}</span>
						<h3 class="stat">{item.stat}</h3>
						<h4 class="subhead">{item.subhead}</h4>
						<p class="description">{item.description}</p>
					</div>
					<div class="infographic-container">
						{#if i === 0}
							<EconomicImpactInfographic isHovered={visibleStates[i]} source="Based on World Bank and national economic projections." />
						{:else if i === 1}
							<EmployabilityCrisisInfographic isHovered={visibleStates[i]} source="Data from NASSCOM, AICTE, and industry surveys." />
						{:else if i === 2}
							<SkillsGapInfographic isHovered={visibleStates[i]} source="Analysis from World Economic Forum 'Future of Jobs' report." />
						{:else if i === 3}
							<IndustryDemandInfographic isHovered={visibleStates[i]} source="LinkedIn Learning and Coursera workforce trend reports." />
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</Container>
</div>

<style>
	.narrative-container {
		padding: 6rem 0;
		color: var(--text-primary);
	}

	.header-content {
		text-align: left;
		margin-bottom: 5rem;
	}

	.header-content h2 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.header-content p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 65ch;
		line-height: 1.7;
	}

	.cards-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
	}

	.paradox-card {
		background-color: var(--background-secondary);
		border-radius: 12px;
		padding: 2.5rem;
		display: grid;
		grid-template-columns: 1fr 150px;
		gap: 1.5rem;
		align-items: center;
		overflow: hidden;
		border: 1px solid transparent;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.paradox-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		border-color: var(--primary-accent);
	}

	.card-content {
		text-align: left;
	}

	.infographic-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.superhead {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		color: var(--primary-accent);
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat {
		font-size: 5rem;
		font-weight: 800;
		line-height: 1;
		margin-bottom: 1.5rem;
		color: var(--primary-accent);
	}

	.subhead {
		font-size: 1.75rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.description {
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.narrative-container {
			padding: 4rem 1rem;
		}
		.header-content h2 {
			font-size: 2rem;
		}
		.header-content p {
			font-size: 1rem;
		}
		.cards-wrapper {
			gap: 6rem;
		}
		.stat {
			font-size: 4.5rem;
		}
		.subhead {
			font-size: 1.25rem;
		}
	}
</style>