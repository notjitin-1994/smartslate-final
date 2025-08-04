<!-- /frontend/src/routes/(app)/courses/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Container from '$lib/components/pages/common/Container.svelte';
	import Pagination from '$lib/components/common/Pagination.svelte';

	// Import local images
	import aiLiteracy from '$lib/assets/images/courses/AILiteracy.jpg';
	import dataScience from '$lib/assets/images/courses/applieddatascience.jpg';
	import awsArchitect from '$lib/assets/images/courses/awssolutionsarchitect.jpg';
	import ethicalHacker from '$lib/assets/images/courses/certifiedethicalhacker.jpg';
	import fullStack from '$lib/assets/images/courses/advancedfullstackdevelopment.jpg';
	import productManagement from '$lib/assets/images/courses/technicalproductmanagement.jpg';
	import performanceMarketing from '$lib/assets/images/courses/performancemarketing.jpg';
	import blockchain from '$lib/assets/images/courses/enterpriseblockchain.jpg';
	import devops from '$lib/assets/images/courses/advanceddevops.jpg';
	import generativeAi from '$lib/assets/images/courses/generativeaiaps.jpg';

	interface Course {
		title: string;
		description: string;
		status: string;
		statusColor: 'releasing-soon' | 'unscheduled' | 'horizon';
		imageUrl: string;
		slug: string;
	}

	const allCourses: Course[] = [
		{
			title: '<span class="highlight">AI Foundations</span>: Concept to Application',
			description: 'Unlock the power of AI and learn to leverage it for personal and professional growth.',
			status: 'Releasing in Aug',
			statusColor: 'releasing-soon',
			imageUrl: aiLiteracy,
			slug: 'ai-foundations-concept-to-application'
		},
		{
			title: 'Applied Data Science with Python',
			description: 'Master the tools and techniques to analyze data and build predictive models.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: dataScience,
			slug: 'applied-data-science-with-python'
		},
		{
			title: 'AWS Solutions Architect - Professional',
			description: 'Design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: awsArchitect,
			slug: 'aws-solutions-architect-professional'
		},
		{
			title: 'Certified Ethical Hacker (CEH)',
			description: 'Learn to think like a hacker to defend against and identify network vulnerabilities.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: ethicalHacker,
			slug: 'certified-ethical-hacker'
		},
		{
			title: 'Advanced Full-Stack Development with TypeScript',
			description: 'Build robust, scalable, and maintainable web applications from end to end.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: fullStack,
			slug: 'advanced-full-stack-development-with-typescript'
		},
		{
			title: 'Technical Product Management & Agile Leadership',
			description: 'Lead product teams and drive the development of successful tech products.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: productManagement,
			slug: 'technical-product-management-agile-leadership'
		},
		{
			title: 'Data-Driven Performance Marketing',
			description: 'Optimize marketing campaigns and maximize ROI with data-driven strategies.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: performanceMarketing,
			slug: 'data-driven-performance-marketing'
		},
		{
			title: 'Enterprise Blockchain Solutions',
			description: 'Explore the potential of blockchain technology for enterprise applications.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: blockchain,
			slug: 'enterprise-blockchain-solutions'
		},
		{
			title: 'Advanced DevOps: Kubernetes and CI/CD Pipelines',
			description: 'Automate and streamline the software development and deployment lifecycle.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: devops,
			slug: 'advanced-devops-kubernetes-ci-cd-pipelines'
		},
		{
			title: 'Building Applications with Generative AI',
			description: 'Harness the power of generative AI to build innovative applications.',
			status: 'Release not scheduled yet',
			statusColor: 'unscheduled',
			imageUrl: generativeAi,
			slug: 'building-applications-with-generative-ai'
		}
	];

	let itemsPerPage = 9;
	let currentPage = 1;
	let searchTerm = '';
	let sortOrder = 'featured';
	let filterStatus = 'all';

	let displayedCourses: Course[] = [];

	$: {
		let filtered = allCourses.filter((course) => {
			const titleMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
			const statusMatch = filterStatus === 'all' || course.statusColor === filterStatus;
			return titleMatch && statusMatch;
		});

		let sorted = [...filtered];
		if (sortOrder === 'asc') {
			sorted.sort((a, b) => a.title.localeCompare(b.title));
		} else if (sortOrder === 'desc') {
			sorted.sort((a, b) => b.title.localeCompare(a.title));
		}

		// Add the "More on the horizon..." card if no filters are active.
		// This ensures it's part of the list for pagination.
		if (searchTerm === '' && filterStatus === 'all') {
			sorted.push({
				title: 'More on the horizon...',
				description: '',
				status: 'Check back for new releases',
				statusColor: 'horizon',
				imageUrl: '',
				slug: ''
			});
		}

		// Reset to page 1 if the current page is out of bounds after filtering
		if (currentPage > Math.ceil(sorted.length / itemsPerPage)) {
			currentPage = 1;
		}

		displayedCourses = sorted;
	}

	$: paginatedCourses = displayedCourses.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	function updateURL(page: number, pageStore: any) {
		const url = new URL(pageStore.url);
		url.searchParams.set('page', page.toString());
		history.pushState({}, '', url);
	}

	function handlePageChange(event: CustomEvent<{ page: number }>) {
		currentPage = event.detail.page;
		updateURL(currentPage, $page);
	}

	onMount(() => {
		const urlPage = $page.url.searchParams.get('page');
		if (urlPage) {
			currentPage = parseInt(urlPage, 10);
		}

		function handleResize() {
			if (window.innerWidth < 768) {
				itemsPerPage = 5;
			} else {
				itemsPerPage = 9;
			}
		}

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial check

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<svelte:head>
	<title>Ignite Series | Smartslate</title>
	<meta name="description" content="Explore our catalog of professional courses." />
</svelte:head>

<main id="main-content">
	<Container>
		<div class="hero-section">
			<h1>Ignite your <span class="highlight">Growth</span></h1>
			<p>
				<span class="highlight">Ignite the future.</span> The Ignite Series is the official blueprint
				for the <span class="highlight">next generation of work</span>—a definitive collection of
				courses designed to equip the <span class="highlight">architects of our world</span>—digital
				and physical.
			</p>
		</div>

		<div class="controls-container">
			<div class="control-wrapper search-container">
				<div class="icon-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
						/></svg
					>
				</div>
				<input type="text" bind:value={searchTerm} placeholder="Search courses..." />
			</div>
			<div class="control-wrapper sort-container">
				<div class="icon-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M11 16.764V4h2v12.764l3.132-3.132 1.414 1.414L12 20.586l-5.546-5.54 1.414-1.414z"
						/></svg
					>
				</div>
				<select bind:value={sortOrder}>
					<option value="featured">Sort by Featured</option>
					<option value="asc">Sort by Title (A-Z)</option>
					<option value="desc">Sort by Title (Z-A)</option>
				</select>
			</div>
			<div class="control-wrapper filter-container">
				<div class="icon-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M21.947 3.344a1 1 0 0 0-.947-.344H3a1 1 0 0 0-.553 1.832l6.999 5.444v6.38l4 2.5v-8.88l6.999-5.444a1 1 0 0 0 .502-1.488zM5.863 5h12.274l-6.137 4.779L5.863 5z"
						/></svg
					>
				</div>
				<select bind:value={filterStatus}>
					<option value="all">Filter by Status (All)</option>
					<option value="releasing-soon">Releasing Soon</option>
					<option value="unscheduled">Unscheduled</option>
				</select>
			</div>
		</div>

		<div class="courses-grid">
			{#each paginatedCourses as course}
				<div
					class="course-card"
					class:horizon-card={course.statusColor === 'horizon'}
				>
					<div
						class="card-image"
						style:--bg-image={course.imageUrl ? `url(${course.imageUrl})` : 'none'}
					></div>
					<div class="card-content">
						<div class="card-header">
							<h2>{@html course.title}</h2>
							{#if course.statusColor !== 'horizon'}
								<span class="status-badge {course.statusColor}">
									{course.status}
								</span>
							{/if}
						</div>
						<p class="description">{course.description}</p>
						{#if course.statusColor !== 'horizon'}
							<div class="card-buttons">
								<a href="/courses/{course.slug}" class="btn btn-secondary">Learn More</a>
								<button
									class="btn btn-primary"
									on:click={() => console.log('Waitlist button clicked for', course.title)}
									>Join Waitlist</button
								>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<div class="pagination-wrapper">
			<Pagination
				{currentPage}
				totalItems={displayedCourses.length}
				{itemsPerPage}
				on:pageChange={handlePageChange}
			/>
		</div>
	</Container>
</main>

<style>
	.controls-container {
		display: flex;
		gap: var(--space-lg);
		margin-bottom: var(--space-xxl);
		padding: var(--space-md);
		background-color: var(--container-bg);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-color);
	}

	.control-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-container {
		flex-grow: 1;
	}

	.icon-wrapper {
		position: absolute;
		left: var(--space-md);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		color: var(--text-muted);
		pointer-events: none; /* Allows clicking through the icon */
	}

	.control-wrapper svg {
		width: 100%;
		height: 100%;
	}

	.search-container input,
	.sort-container select,
	.filter-container select {
		width: 100%;
		height: 48px;
		padding: 0 var(--space-md) 0 calc(var(--space-md) * 2 + 20px); /* Left padding for icon */
		border-radius: var(--radius-md);
		border: 1px solid var(--input-border);
		background-color: var(--input-bg);
		color: var(--text-primary);
		font-size: 0.9rem;
		transition: var(--transition-fast);
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	.sort-container,
	.filter-container {
		position: relative;
	}

	.sort-container::after,
	.filter-container::after {
		content: '';
		position: absolute;
		right: var(--space-md);
		top: 50%;
		transform: translateY(-50%);
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid var(--text-muted);
		pointer-events: none;
	}

	.search-container input:focus,
	.sort-container select:focus,
	.filter-container select:focus {
		outline: none;
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 3px rgba(167, 218, 219, 0.2);
	}

	.control-wrapper:focus-within .icon-wrapper {
		color: var(--primary-accent);
	}
	.hero-section {
		text-align: left;
		padding: var(--space-xxl) 0;
	}

	.hero-section h1 {
		font-size: 3.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.hero-section p {
		font-size: 1.25rem;
		color: var(--text-secondary);
		max-width: 60ch;
		margin-top: var(--space-md);
	}

	.hero-section .highlight {
		color: var(--primary-accent);
	}

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xl);
	}

	.course-card {
		border-radius: var(--radius-lg);
		border: var(--border-subtle);
		box-shadow: var(--shadow-md);
		overflow: hidden;
		transition: var(--transition-medium);
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: var(--container-bg);
		min-height: 350px;
	}

	.course-card .card-image {
		height: 150px;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
	}



	.card-content {
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		position: relative;
		z-index: 1;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.card-header h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		min-height: calc(1.25rem * 1.4 * 4);
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 700;
		font-family: var(--font-body);
		white-space: nowrap;
		height: fit-content;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.status-badge.releasing-soon {
		background-color: rgba(255, 229, 100, 0.15); /* Contrast-adjusted yellow */
		color: #ffc700; /* A more vibrant, readable yellow */
	}

	.status-badge.unscheduled {
		background-color: rgba(255, 165, 0, 0.15); /* Contrast-adjusted orange */
		color: #FF8C00; /* A deeper, more distinct orange */
	}

	.description {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.5;
		margin: var(--space-md) 0;
		flex-grow: 1;
	}

	.btn {
		/* margin-top is now handled by card-buttons */
		white-space: nowrap;
	}

	.card-buttons {
		display: flex;
		gap: var(--space-sm);
		margin-top: auto;
		flex-wrap: wrap;
	}

	@media (min-width: 768px) {
		.btn {
			font-size: 0.875rem;
		}
	}

	.pagination-wrapper {
		margin-top: var(--space-xxl);
		display: flex;
		justify-content: center;
	}

	.horizon-card {
		background: repeating-linear-gradient(
			-45deg,
			var(--container-bg),
			var(--container-bg) 10px,
			#0f1e30 10px,
			#0f1e30 20px
		);
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.horizon-card .card-content {
		background: transparent;
		backdrop-filter: none;
		align-items: center;
	}

	.horizon-card .card-header h2 {
		color: var(--primary-accent);
		font-size: 1.5rem;
		-webkit-line-clamp: unset;
		min-height: auto;
		text-align: center;
		width: 100%;
	}

	.horizon-card .description {
		display: none;
	}
	@media (max-width: 768px) {
		.controls-container {
			flex-direction: column;
			gap: var(--space-md);
		}

		.hero-section {
			padding: var(--space-xl) 0;
		}

		.hero-section h1 {
			font-size: 2.5rem;
		}

		.hero-section p {
			font-size: 1.1rem;
			max-width: none;
		}

		.courses-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}

		.course-card {
			min-height: 300px;
		}

		.card-content {
			margin: var(--space-sm);
			padding: var(--space-md);
		}

		.card-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.card-header h2 {
			font-size: 1.1rem;
			min-height: auto;
			-webkit-line-clamp: 3;
		}

		.description {
			font-size: 0.875rem;
			margin: var(--space-sm) 0;
		}

		.card-buttons {
			gap: var(--space-xs);
		}

		.btn {
			font-size: 0.8rem;
			padding: var(--space-xs) var(--space-sm);
		}
	}
</style>