import { useModalManager } from '@/hooks/useModalManager';

export function useCultureModal() {
  const { modalStates, actions } = useModalManager();

  return {
    isOpen: modalStates.culture,
    open: actions.openCultureModal,
    close: actions.closeCultureModal,
  };
}