'use client';

import { create } from 'zustand';

interface DemoModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useDemoModal = create<DemoModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
