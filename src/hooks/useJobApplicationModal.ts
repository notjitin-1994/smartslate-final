import { useModalManager } from '@/hooks/useModalManager';

export function useJobApplicationModal() {
  const { modalStates, actions } = useModalManager();

  return {
    isOpen: modalStates.jobApplication,
    open: actions.openJobApplicationModal,
    close: actions.closeJobApplicationModal,
  };
}