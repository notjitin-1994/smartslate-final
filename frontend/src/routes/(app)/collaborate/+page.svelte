<script lang="ts">
	import Container from '$lib/components/pages/common/Container.svelte';
	import ContactModal from '$lib/components/common/ContactModal.svelte';
	import { fadeInOnScroll } from '$lib/actions/fadeInOnScroll';

	let isModalOpen = false;
	let modalConfig = {
		title: '',
		formFields: [] as { name: string; label: string; type: string }[]
	};

	const partnershipOpportunities = [
		{
			title: 'Become a Course Architect',
			description:
				'You are a leader in your field with deep, practical expertise. Partner with us to transform your knowledge into world-class courses that will shape the next generation of talent and elevate your professional brand.',
			buttonText: 'Share Your Expertise',
			modalConfig: {
				title: 'Become a Course Architect',
				formFields: [
					{ name: 'name', label: 'Name', type: 'text' },
					{ name: 'email', label: 'Email', type: 'email' },
					{ name: 'linkedin', label: 'Link to LinkedIn/Portfolio', type: 'url' }
				]
			}
		},
		{
			title: 'Drive Strategic Growth',
			description:
				"Your organization has unique challenges and skill gaps. Let's collaborate to build bespoke learning solutions and talent pipelines that deliver measurable ROI and a decisive competitive advantage.",
			buttonText: 'Form a Partnership',
			modalConfig: {
				title: 'Strategic Partnership Inquiry',
				formFields: [
					{ name: 'name', label: 'Name', type: 'text' },
					{ name: 'email', label: 'Email', type: 'email' },
					{ name: 'company', label: 'Company/Institution', type: 'text' },
					{ name: 'role', label: 'Your Role', type: 'text' }
				]
			}
		},
		{
			title: 'Invest in the Revolution',
			description:
				'Smartslate is at the forefront of the AI-driven education market. We are building the future with our next-gen platform, Solara. We invite visionary investors to join our journey and share in our success.',
			buttonText: 'Explore Investment',
			modalConfig: {
				title: 'Investment Opportunities',
				formFields: [
					{ name: 'name', label: 'Name', type: 'text' },
					{ name: 'email', label: 'Email', type: 'email' },
					{ name: 'fund', label: 'Fund/Organization Name', type: 'text' }
				]
			}
		},
		{
			title: 'Build the Future with Us',
			description:
				'Are you an AI engineer, developer, or designer passionate about solving hard problems? Join our core team to build cutting-edge products that will redefine how the world learns and works.',
			buttonText: 'Join the Team',
			modalConfig: {
				title: 'Build with Us',
				formFields: [
					{ name: 'name', label: 'Name', type: 'text' },
					{ name: 'email', label: 'Email', type: 'email' },
					{ name: 'github', label: 'Link to GitHub/Portfolio', type: 'url' }
				]
			}
		}
	];

	function openModal(config: typeof modalConfig) {
		modalConfig = config;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<svelte:head>
	<title>Collaborate & Partner | Smartslate</title>
	<meta
		name="description"
		content="Explore partnership opportunities with Smartslate. Let's shape the future of learning together, whether you're an expert, organization, investor, or technologist."
	/>
</svelte:head>

<div class="page-wrapper">
	<Container>
		<header class="page-header" use:fadeInOnScroll>
			<h1 class="main-heading">Let's Shape the Future of Learning, Together.</h1>
			<p class="subheading">
				The AI revolution in education requires a symphony of diverse talents and visionary partners. We
				believe in the power of collaboration to build something truly transformative. Find your role
				in our journey.
			</p>
		</header>

		<div class="partnership-list">
			{#each partnershipOpportunities as card, i}
				<section class="partnership-section" use:fadeInOnScroll={{ delay: i * 150 }}>
					<h2 class="section-heading">{card.title}</h2>
					<p class="section-description">{card.description}</p>
					<button class="btn btn-primary" on:click={() => openModal(card.modalConfig)}>
						<span>{card.buttonText}</span>
					</button>
				</section>
				{#if i < partnershipOpportunities.length - 1}
					<hr class="separator" use:fadeInOnScroll={{ delay: i * 150 + 200 }} />
				{/if}
			{/each}
		</div>
	</Container>
</div>

<ContactModal
	isOpen={isModalOpen}
	title={modalConfig.title}
	formFields={modalConfig.formFields}
	on:close={closeModal}
/>

<style>
	.page-wrapper {
		padding: var(--space-3xl) 0;
		background-color: var(--background);
	}

	.page-header {
		text-align: left;
		padding-bottom: var(--space-xxl);
	}

	.main-heading {
		font-size: 3.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.subheading {
		font-size: 1.25rem;
		color: var(--text-secondary);
		max-width: 70ch;
		margin: var(--space-md) 0 0;
	}

	.partnership-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xl);
		max-width: 800px;
		margin: 0;
	}

	.partnership-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
	}

	.section-heading {
		font-size: var(--font-size-h2);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-md);
	}

	.section-description {
		font-size: var(--font-size-md);
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-lg);
	}

	.btn.btn-primary {
		background-color: var(--brand-accent-color-2);
		color: #ffffff;
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-sm);
		text-decoration: none;
		font-weight: 600;
		font-size: var(--font-size-md);
		transition:
			background-color var(--transition-fast),
			transform var(--transition-fast);
		border: 1px solid var(--brand-accent-color-2);
		cursor: pointer;
		font-family: inherit;
	}

	.btn.btn-primary:hover {
		background-color: var(--button-primary-hover-bg);
		transform: translateY(-2px);
	}

	.separator {
		border: none;
		height: 1px;
		background-color: var(--border-subtle);
		margin: var(--space-xl) 0;
	}
</style>