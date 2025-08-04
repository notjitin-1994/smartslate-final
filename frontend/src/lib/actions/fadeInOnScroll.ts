export function fadeInOnScroll(node: HTMLElement, { delay = 0, duration = 500 } = {}) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.transition = `opacity ${duration}ms ease-out ${delay}ms`;
					node.style.opacity = '1';
					observer.unobserve(node);
				}
			});
		},
		{
			threshold: 0.1
		}
	);

	node.style.opacity = '0';
	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}