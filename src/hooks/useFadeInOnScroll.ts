import { useEffect, useRef, useState } from 'react';

interface UseFadeInOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useFadeInOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseFadeInOnScrollOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}