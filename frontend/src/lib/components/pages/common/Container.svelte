<div class="container">
	<slot />
</div>

<style>
	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 var(--space-md);
		}
	}
</style>
