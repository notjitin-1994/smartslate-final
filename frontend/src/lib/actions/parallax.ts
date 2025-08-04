import { onMount, onDestroy } from 'svelte';

export function parallax(node: HTMLElement, { speed = 0.5 } = {}) {
    let windowHeight = 0;
    let nodeRect: DOMRect;

    function handleResize() {
        windowHeight = window.innerHeight;
        nodeRect = node.getBoundingClientRect();
    }

    function handleScroll() {
        if (!nodeRect) return;
        const scrollY = window.scrollY;
        const start = nodeRect.top + scrollY - windowHeight;
        const end = nodeRect.bottom + scrollY;

        if (scrollY > start && scrollY < end) {
            const progress = (scrollY - start) / (end - start);
            const y = (progress - 0.5) * speed * 100;
            node.style.transform = `translateY(${y}px)`;
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', handleResize);
            handleResize();
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            }
        };
    });

    return {
        destroy() {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            }
        }
    };
}