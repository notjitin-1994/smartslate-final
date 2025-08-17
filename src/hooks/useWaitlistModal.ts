'use client';

import { create } from 'zustand';

interface WaitlistModalStore {
  isOpen: boolean;
  source: string;
  courseName?: string;
  openModal: (source: string, courseName?: string) => void;
  closeModal: () => void;
}

export const useWaitlistModal = create<WaitlistModalStore>((set) => ({
  isOpen: false,
  source: '',
  courseName: undefined,
  openModal: (source: string, courseName?: string) => set({ 
    isOpen: true, 
    source, 
    courseName 
  }),
  closeModal: () => set({ 
    isOpen: false, 
    source: '', 
    courseName: undefined 
  }),
}));


