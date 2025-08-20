import { useState } from 'react';

export function useWaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');

  const openModal = (sourceParam?: string, courseNameParam?: string) => {
    setSource(sourceParam || '');
    setCourseName(courseNameParam || '');
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setSource('');
    setCourseName('');
  };

  return {
    isOpen,
    source,
    courseName,
    openModal,
    closeModal,
  };
}
