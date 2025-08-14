import { create } from 'zustand';

interface SolaraInterestModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSolaraInterestModal = create<SolaraInterestModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));