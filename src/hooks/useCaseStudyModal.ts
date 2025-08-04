'use client';

import { create } from 'zustand';

interface CaseStudyModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useCaseStudyModal = create<CaseStudyModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));