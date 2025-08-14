'use client';

import { create } from 'zustand';

interface Course {
  title: string;
  description: string;
  status: string;
  statusColor: string;
  imageUrl: string;
  slug: string;
}

interface CourseWaitlistModalStore {
  isOpen: boolean;
  selectedCourse: Course | null;
  openModal: (course: Course) => void;
  closeModal: () => void;
}

export const useCourseWaitlistModal = create<CourseWaitlistModalStore>((set) => ({
  isOpen: false,
  selectedCourse: null,
  openModal: (_course) => {},
  closeModal: () => {},
}));