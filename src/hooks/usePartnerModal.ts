import { useState } from 'react';

type PartnerType = 'institution' | 'business' | 'technology' | 'consulting' | 'research';

export function usePartnerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<PartnerType>('business');

  const openModal = (type: PartnerType = 'business') => {
    setPartnerType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    partnerType,
    openModal,
    closeModal,
  };
}
