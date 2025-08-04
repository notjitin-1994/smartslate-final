<script lang="ts">
	import { tick } from 'svelte';
	import Hero from '$lib/components/pages/landing/Hero.svelte';
	import NewTalentParadox from '$lib/components/pages/landing/talent-paradox-reimagined/NewTalentParadox.svelte';
	import Framework from '$lib/components/pages/landing/Framework.svelte';
	import ROICalculator from '$lib/components/pages/landing/ROICalculator.svelte';
	import Partners from '$lib/components/pages/landing/Partners.svelte';
	import Container from '$lib/components/pages/common/Container.svelte';
	import { contactUsModalStore } from '$lib/stores/contactUsModalStore';
	import SSAInterestModal from '$lib/components/common/SSAInterestModal.svelte';
	import DemoModal from '$lib/components/common/DemoModal.svelte';
	import { ssaInterestModalStore } from '$lib/stores/ssaInterestModalStore';
	import { demoModalStore } from '$lib/stores/demoModalStore';

	let revealedSections = {
		paradox: false,
		framework: false,
		roi: false,
		partners: false
	};

	let paradoxSection: HTMLElement;
	let frameworkSection: HTMLElement;
	let roiSection: HTMLElement;
	let partnersSection: HTMLElement;

	async function revealNext(section: keyof typeof revealedSections) {
		revealedSections[section] = true;
		await tick(); // Wait for the DOM to update

		let elementToScrollTo;
		switch (section) {
			case 'paradox':
				elementToScrollTo = paradoxSection;
				break;
			case 'framework':
				elementToScrollTo = frameworkSection;
				break;
			case 'roi':
				elementToScrollTo = roiSection;
				break;
			case 'partners':
				elementToScrollTo = partnersSection;
				break;
		}

		if (elementToScrollTo) {
			const headerHeight = 80; // Approximate height of the sticky header
			const elementRect = elementToScrollTo.getBoundingClientRect();
			const elementTop = elementRect.top + window.pageYOffset;
			const offsetPosition = elementTop - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
</script>

<!-- Test buttons for debugging -->
<div style="position: fixed; top: 10px; right: 10px; z-index: 1000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; color: white;">
	<button on:click={() => { console.log('Opening SSA Modal'); ssaInterestModalStore.open(); }}>Test SSA Modal</button>
	<button on:click={() => { console.log('Opening Demo Modal'); demoModalStore.open(); }}>Test Demo Modal</button>
	<button on:click={() => { console.log('Opening Contact Modal'); contactUsModalStore.openModal('Business Leader'); }}>Test Contact Modal</button>
</div>

<Hero on:revealNext={() => revealNext('paradox')} />
{#if revealedSections.paradox}
	<div bind:this={paradoxSection}>
		<NewTalentParadox on:revealNext={() => revealNext('framework')} />
	</div>
{/if}
{#if revealedSections.framework}
	<div bind:this={frameworkSection}>
		<Framework on:revealNext={() => revealNext('roi')} />
	</div>
{/if}
{#if revealedSections.roi}
	<div bind:this={roiSection}>
		<ROICalculator on:revealNext={() => revealNext('partners')} />
	</div>
{/if}
{#if revealedSections.partners}
	<div bind:this={partnersSection}>
		<Partners />
	</div>
{/if}

<SSAInterestModal />
<DemoModal />

<style>
</style>
