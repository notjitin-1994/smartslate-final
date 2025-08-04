<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, signInWithCustomToken } from '$lib/services/firebase';
	import { toastStore } from '$lib/stores/toastStore';

	onMount(() => {
		const hash = window.location.hash.substring(1);
		const params = new URLSearchParams(hash);
		const token = params.get('token');

		if (token) {
			signInWithCustomToken(auth, token)
				.then(() => {
					toastStore.add('Impersonation successful!', 'success');
					goto('/profile');
				})
				.catch((error) => {
					console.error('Impersonation sign-in error:', error);
					toastStore.add('Impersonation failed. Invalid token.', 'error');
					goto('/login');
				});
		} else {
			toastStore.add('No impersonation token found.', 'error');
			goto('/login');
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<p>Impersonating user...</p>
</div>
