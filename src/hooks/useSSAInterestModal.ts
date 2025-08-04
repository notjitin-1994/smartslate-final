import { create } from 'zustand';

interface SSAInterestModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSSAInterestModal = create<SSAInterestModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));