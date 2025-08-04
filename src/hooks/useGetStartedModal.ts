'use client';

import { create } from 'zustand';

interface GetStartedModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useGetStartedModal = create<GetStartedModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));