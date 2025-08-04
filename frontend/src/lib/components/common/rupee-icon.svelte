<script lang="ts">
	import { IndianRupee, Circle } from 'lucide-svelte';
</script>

<div class="icon-container">
	<Circle size="1.5em" />
	<div class="rupee-icon">
		<IndianRupee size="0.9em" />
	</div>
</div>

<style>
	.icon-container {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		animation: pulse 2s infinite;
	}

	.rupee-icon {
		position: absolute;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
</style>
