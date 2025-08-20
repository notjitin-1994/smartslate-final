'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ModalStates {
  demo: boolean;
  caseStudy: boolean;
  consultation: boolean;
  ssaInterest: boolean;
  solaraInterest: boolean;
  partner: boolean;
}

export interface ModalActions {
  openDemoModal: () => void;
  closeDemoModal: () => void;
  openCaseStudyModal: () => void;
  closeCaseStudyModal: () => void;
  openConsultationModal: () => void;
  closeConsultationModal: () => void;
  openSSAInterestModal: () => void;
  closeSSAInterestModal: () => void;
  openSolaraInterestModal: () => void;
  closeSolaraInterestModal: () => void;
  openPartnerModal: (type: 'institution' | 'business' | 'technology' | 'consulting' | 'research') => void;
  closePartnerModal: () => void;
}

interface ModalContextType {
  modalStates: ModalStates;
  actions: ModalActions;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModalManager() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalManager must be used within a ModalProvider');
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStates, setModalStates] = useState<ModalStates>({
    demo: false,
    caseStudy: false,
    consultation: false,
    ssaInterest: false,
    solaraInterest: false,
    partner: false,
  });

  const openDemoModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, demo: true }));
  }, []);

  const closeDemoModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, demo: false }));
  }, []);

  const openCaseStudyModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, caseStudy: true }));
  }, []);

  const closeCaseStudyModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, caseStudy: false }));
  }, []);

  const openConsultationModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, consultation: true }));
  }, []);

  const closeConsultationModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, consultation: false }));
  }, []);

  const openSSAInterestModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, ssaInterest: true }));
  }, []);

  const closeSSAInterestModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, ssaInterest: false }));
  }, []);

  const openSolaraInterestModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, solaraInterest: true }));
  }, []);

  const closeSolaraInterestModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, solaraInterest: false }));
  }, []);

  const openPartnerModal = useCallback((type: 'institution' | 'business' | 'technology' | 'consulting' | 'research') => {
    setModalStates(prev => ({ ...prev, partner: true }));
  }, []);

  const closePartnerModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, partner: false }));
  }, []);

  const value: ModalContextType = {
    modalStates,
    actions: {
      openDemoModal,
      closeDemoModal,
      openCaseStudyModal,
      closeCaseStudyModal,
      openConsultationModal,
      closeConsultationModal,
      openSSAInterestModal,
      closeSSAInterestModal,
      openSolaraInterestModal,
      closeSolaraInterestModal,
      openPartnerModal,
      closePartnerModal,
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
