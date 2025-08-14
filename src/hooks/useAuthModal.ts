import { create } from 'zustand';

interface AuthModalState {
  isOpen: boolean;
  defaultTab: 'signin' | 'signup' | null;
  open: (tab?: 'signin' | 'signup') => void;
  close: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  defaultTab: null,
  open: (tab) => set({ isOpen: true, defaultTab: tab ?? null }),
  close: () => set({ isOpen: false, defaultTab: null }),
}));


