'use client';

import { create } from 'zustand';

interface ConsultationModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useConsultationModal = create<ConsultationModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
