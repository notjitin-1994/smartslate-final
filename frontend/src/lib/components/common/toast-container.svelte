<script lang="ts">
	import { toastStore } from '$lib/stores/toastStore';
	import Toast from './Toast.svelte';
	import { flip } from 'svelte/animate';
</script>

<div class="toast-container">
	{#each $toastStore as toast (toast.id)}
		<div animate:flip={{ duration: 300 }}>
			<Toast {toast} />
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: var(--space-lg);
		right: var(--space-lg);
		z-index: 9999;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
