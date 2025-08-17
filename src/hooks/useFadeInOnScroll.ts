import { useEffect, useRef, useState } from 'react';

/** Options to configure the IntersectionObserver used by `useFadeInOnScroll`. */
interface UseFadeInOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * React hook that toggles `isVisible` when the referenced element enters the viewport.
 * Uses `IntersectionObserver` under the hood and unobserves after first intersection.
 *
 * Example:
 * ```tsx
 * const { ref, isVisible } = useFadeInOnScroll({ threshold: 0.2 });
 * return <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'} />
 * ```
 *
 * @param options Optional IntersectionObserver settings.
 * @returns An object with the `ref` to attach and `isVisible` boolean state.
 */
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