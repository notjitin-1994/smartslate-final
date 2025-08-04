import { writable } from 'svelte/store';

type InquiryType = 'Educational Institution' | 'Business Leader' | null;

interface ContactUsModalStore {
	isOpen: boolean;
	inquiryType: InquiryType;
}

function createContactUsModalStore() {
	const { subscribe, set, update } = writable<ContactUsModalStore>({
		isOpen: false,
		inquiryType: null
	});

	return {
		subscribe,
		openModal: (type: InquiryType) => {
			if (!type) {
				console.error('Inquiry type must be provided to open the contact modal.');
				return;
			}
			set({ isOpen: true, inquiryType: type });
		},
		closeModal: () => set({ isOpen: false, inquiryType: null })
	};
}

export const contactUsModalStore = createContactUsModalStore();