<script lang="ts">
	import Container from '$lib/components/pages/common/Container.svelte';
	import ProductSection from '$lib/components/pages/products/ProductSection.svelte';
	import IgniteInfographic from '$lib/components/pages/products/IgniteInfographic.svelte';
	import StrategicSkillsInfographic from '$lib/components/pages/products/StrategicSkillsInfographic.svelte';
	import SolaraInfographic from '$lib/components/pages/products/SolaraInfographic.svelte';
	import { flip } from 'svelte/animate';
	import { solaraInterestModalStore } from '$lib/stores/solaraInterestModalStore';
	import { ssaInterestModalStore } from '$lib/stores/ssaInterestModalStore';
	import SSAInterestModal from '$lib/components/common/SSAInterestModal.svelte';

	interface Product {
		heading: string;
		tagline: string;
		description: string;
		features: { icon: string; text: string }[];
		oneLinerFeatures?: { icon: string; text: string }[];
		cta: { text: string; link?: string; icon?: string };
		secondaryCta?: { text: string; link: string };
		reverse?: boolean;
		status?: 'live' | 'coming-soon';
	}

	const products: Product[] = [
		{
			heading: 'Ignite Series',
			tagline: 'From Classroom to Career: A Direct Pipeline to Verified Talent',
			description:
				"We bridge the critical gap between academic knowledge and real-world impact. Our pre-built courses are engineered in collaboration with industry leaders to cultivate the next generation of market-ready professionals. We transform promising students into high-performing new hires, creating a seamless talent pipeline for leading companies.",
			features: [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9a9 9 0 1 1 9 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75a9 9 0 0 0-9 0m9 0a9 9 0 0 1-9 0m9 0h-9m9 0h-9" /></svg>`,
					text: '<strong>Industry-Forged Curriculum:</strong> Market-driven courses designed with industry leaders to build in-demand skills.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
					text: '<strong>A Trusted Signal for Top Talent:</strong> Smartslate Certification validates career-focused education and de-risks hiring for businesses.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
					text: '<strong>A Commitment to Excellence:</strong> Rigorous, earned certification ensures every professional is ready to make an immediate impact.'
				}
			],
			oneLinerFeatures: [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9a9 9 0 1 1 9 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75a9 9 0 0 0-9 0m9 0a9 9 0 0 1-9 0m9 0h-9m9 0h-9" /></svg>`,
					text: 'Industry-forged curriculum for in-demand skills.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
					text: 'A trusted signal for top talent, de-risking hiring.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
					text: 'Rigorous certification for immediate impact.'
				}
			],
			cta: {
				text: 'Explore our Courses',
				link: '/courses',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="book-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>`
			},
			secondaryCta: { text: 'Learn more', link: '/products/ignite' }
		},
		{
			heading: 'Strategic Skills Architecture',
			tagline: 'Bespoke Learning Solutions, Built for Your Business DNA',
			description:
				"When off-the-shelf training falls short, we step in. We partner with you to architect learning experiences that are a true reflection of your organization's unique culture, challenges, and vision. This is not just customized content; this is your strategic vision, transformed into a powerful and proprietary learning asset.",
			features: [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
					text: '<strong>Signature Content Creation:</strong> We build your programs from the ground up. Every module, case study, and assessment is crafted to speak your internal language and solve your specific challenges, ensuring seamless adoption and relevance.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>`,
					text: '<strong>Your Intellectual Property, Guaranteed:</strong> Your custom curriculum is yours alone. It remains a confidential, competitive asset designed exclusively for your teams, never to be shared or resold.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>`,
					text: '<strong>Precision Skill Enhancement:</strong> We deliver laser-focused training that targets your most critical skill gaps. This ensures maximum impact on performance, eliminates wasted training spend, and delivers a clear return on your investment.'
				}
			],
			oneLinerFeatures: [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`,
					text: 'Signature content creation for your unique challenges.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>`,
					text: 'Your intellectual property, guaranteed.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>`,
					text: 'Precision skill enhancement for maximum impact.'
				}
			],
			cta: {
				text: 'Set up your Strategic Skills Architecture',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="gear-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.227l.128-.054a2 2 0 012.115 0l.128.054c.55.22 1.02.685 1.11 1.227l.068.416a2 2 0 001.943 1.542l.433-.064a2 2 0 012.23 2.23l-.064.433a2 2 0 001.542 1.943l.416.068c.542.09 1.007.56 1.227 1.11l.054.128a2 2 0 010 2.115l-.054.128c-.22.55-.685 1.02-1.227 1.11l-.416.068a2 2 0 00-1.542 1.943l.064.433a2 2 0 01-2.23 2.23l-.433-.064a2 2 0 00-1.943 1.542l-.068.416c-.09.542-.56 1.007-1.11 1.227l-.128.054a2 2 0 01-2.115 0l-.128-.054c-.55-.22-1.02-.685-1.11-1.227l-.068-.416a2 2 0 00-1.943-1.542l-.433.064a2 2 0 01-2.23-2.23l.064-.433a2 2 0 00-1.542-1.943l-.416-.068c-.542-.09-1.007-.56-1.227-1.11l-.054-.128a2 2 0 010-2.115l.054.128c.22-.55.685-1.02 1.227-1.11l.416-.068a2 2 0 001.542-1.943l-.064-.433a2 2 0 012.23-2.23l.433.064a2 2 0 001.943-1.542l.068-.416zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>`,
				link: undefined
			},
			secondaryCta: { text: 'Learn more', link: '/products/ssa' },
			reverse: true
		},
		{
			heading: 'Solara',
			tagline: 'The Future of Learning: An All-in-One AI-Powered Platform',
			description:
				"For too long, learning has been fragmented, inefficient, and impossible to measure effectively. That era is over. Enter Solara, the singular, intelligent platform engineered to unify every facet of learning design and delivery. We're not just improving the old model; we are building its replacement—an engine for continuous growth and unparalleled insight. The future of learning isn’t coming. It's being built, and Solara is the blueprint.",
			features: [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.32 1.011l-4.194 4.011a.563.563 0 0 0-.162.524l1.28 5.318a.563.563 0 0 1-.844.57l-4.796-2.927a.563.563 0 0 0-.576 0l-4.796 2.927a.563.563 0 0 1-.844-.57l1.28-5.318a.563.563 0 0 0-.162-.524l-4.194-4.011a.563.563 0 0 1 .32-1.011l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>`,
					text: '<strong>Solara Polaris:</strong> Instantly translate stakeholder needs into actionable learning requirements, ensuring that every course is aligned with business goals from the start.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" /></svg>`,
					text: '<strong>Solara Constellation:</strong> Transform raw content into structured learning blueprints automatically, saving countless hours of manual instructional design work.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 1-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.898 20.575L16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 0 0 2.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 0 0-2.456 2.456z" /></svg>`,
					text: '<strong>Solara Nova:</strong> Build powerful, interactive learning experiences with an AI-assisted authoring tool that makes content creation fast, easy, and engaging.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.667a8.25 8.25 0 0 1 11.667 0l3.181 3.183m-14.85-3.183L16.023 9.348" /></svg>`,
					text: '<strong>Solara Orbit:</strong> Deliver personalized learning journeys and host all your courses in one place, creating a seamless and unified learning experience for your users.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>`,
					text: '<strong>Solara Spectrum:</strong> Reveal deep insights into your learning effectiveness by analyzing complex data and presenting it with clarity.'
				}
			],
			oneLinerFeatures: [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.32 1.011l-4.194 4.011a.563.563 0 0 0-.162.524l1.28 5.318a.563.563 0 0 1-.844.57l-4.796-2.927a.563.563 0 0 0-.576 0l-4.796 2.927a.563.563 0 0 1-.844-.57l1.28-5.318a.563.563 0 0 0-.162-.524l-4.194-4.011a.563.563 0 0 1 .32-1.011l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>`,
					text: 'Translate stakeholder needs into learning requirements.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" /></svg>`,
					text: 'Transform raw content into structured learning blueprints.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 1-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.898 20.575L16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 0 0 2.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 0 0-2.456 2.456z" /></svg>`,
					text: 'Build interactive learning experiences with AI.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.667a8.25 8.25 0 0 1 11.667 0l3.181 3.183m-14.85-3.183L16.023 9.348" /></svg>`,
					text: 'Deliver personalized learning journeys and hosting.'
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>`,
					text: 'Reveal deep insights with AI-powered analytics.'
				}
			],
			cta: {
				text: 'Register Interest & Support Development',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heart-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`,
				link: undefined
			},
			secondaryCta: { text: 'Learn more', link: '/products/solara' },
			status: 'coming-soon'
		}
	];

	function handleSolaraCtaClick() {
		solaraInterestModalStore.open();
	}

	function handleSsaCtaClick() {
		ssaInterestModalStore.open();
	}
</script>

<Container>
	<div class="hero-section">
		<h1>Our Products</h1>
		<p>
			Discover our suite of solutions designed to bridge the talent gap and empower organizations to
			thrive.
		</p>
	</div>

	<div class="products-grid">
		{#each products as product, i}
			<ProductSection
				heading={product.heading}
				tagline={product.tagline}
				description={product.description}
				features={product.features}
				oneLinerFeatures={product.oneLinerFeatures}
				cta={product.cta}
				on:ctaClick={
					product.heading === 'Solara'
						? handleSolaraCtaClick
						: product.heading === 'Strategic Skills Architecture'
						? handleSsaCtaClick
						: () => {}
				}
				secondaryCta={product.secondaryCta}
				reverse={product.reverse}
				status={product.status}
			>
				<svelte:fragment slot="visual">
					{#if product.heading === 'Ignite Series'}
						<IgniteInfographic />
					{:else if product.heading === 'Strategic Skills Architecture'}
						<StrategicSkillsInfographic />
					{:else if product.heading === 'Solara'}
						<SolaraInfographic />
					{/if}
				</svelte:fragment>
			</ProductSection>
		{/each}
	</div>
</Container>

<SSAInterestModal />

<style>
	.hero-section {
		text-align: left;
		padding-bottom: var(--space-xxl);
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
		margin: var(--space-md) 0 0;
	}

	.products-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxl);
	}

	.visual-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.visual-placeholder span {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-muted);
		opacity: 0.5;
		transform: rotate(-15deg);
	}
</style>