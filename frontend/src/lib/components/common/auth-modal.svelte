<script lang="ts">
	import { authModalStore } from '$lib/stores/authModalStore';
	import { fly, fade } from 'svelte/transition';
	import SocialButton from './social-button.svelte';
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup,
		updateProfile
	} from 'firebase/auth';
	import { auth } from '$lib/services/firebase';
	import Modal from '$lib/components/common/Modal.svelte';

	type Tab = 'signin' | 'signup';
	let activeTab: Tab = 'signin';
	let showContent = true;

	// Form State
	let email = '';
	let password = '';
	let name = ''; // For sign-up
	let loading = false;
	let error: string | null = null;

	function closeModal() {
		authModalStore.update((state) => ({ ...state, isOpen: false }));
	}

	function switchTab(newTab: Tab) {
		if (newTab === activeTab) return;

		// Reset state when switching tabs
		error = null;
		email = '';
		password = '';
		name = '';

		showContent = false;
		setTimeout(() => {
			activeTab = newTab;
			showContent = true;
		}, 200); // Corresponds to the fade duration
	}

	async function handleSignUp(event: Event) {
		event.preventDefault();
		loading = true;
		error = null;
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			if (userCredential.user) {
				await updateProfile(userCredential.user, {
					displayName: name
				});
			}
			// User is automatically signed in, onAuthStateChanged will handle the rest.
			closeModal();
		} catch (e: any) {
			if (e.code === 'auth/email-already-in-use') {
				error = 'This email address is already in use.';
			} else if (e.code === 'auth/weak-password') {
				error = 'Password should be at least 6 characters.';
			} else {
				error = 'An unexpected error occurred. Please try again.';
			}
			console.error('Sign up error:', e);
		} finally {
			loading = false;
		}
	}

	async function handleSignIn() {
		loading = true;
		error = null;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			closeModal();
		} catch (e: any) {
			error = 'Invalid email or password. Please try again.';
			console.error('Sign in error:', e);
		} finally {
			loading = false;
		}
	}

	async function handleGoogleSignIn() {
		loading = true;
		error = null;
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			closeModal();
		} catch (e: any) {
			if (e.code !== 'auth/popup-closed-by-user') {
				error = 'Failed to sign in with Google. Please try again.';
				console.error('Google sign in error:', e);
			}
		} finally {
			loading = false;
		}
	}

	// SVG icons for social buttons
	const icons = {
		google: `<path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.76,4.73 16.04,5.7 17.26,6.88L19.43,4.72C17.56,2.93 15.1,2 12.19,2C6.92,2 2.71,6.62 2.71,12C2.71,17.38 6.92,22 12.19,22C17.6,22 21.54,18.33 21.54,12.29C21.54,11.88 21.48,11.49 21.35,11.1Z" fill-rule="evenodd" clip-rule="evenodd"></path>`
	};
</script>

<Modal isOpen={$authModalStore.isOpen} on:close={closeModal} variant="dark">
	<div class="tabs">
		<button class:active={activeTab === 'signin'} on:click={() => switchTab('signin')}>
			Sign In
		</button>
		<button class:active={activeTab === 'signup'} on:click={() => switchTab('signup')}>
			Create Account
		</button>
	</div>

	<div class="auth-modal-content">
		{#if showContent}
			<div class="form-container" transition:fade={{ duration: 200 }}>
				{#if activeTab === 'signin'}
					<h2 class="title">
						<span style="color: var(--primary-accent);">Welcome</span> back
					</h2>
					<p class="subtitle">Sign in to your account to continue</p>

					<form class="auth-form" on:submit|preventDefault={handleSignIn}>
						<div class="input-group">
							<label for="email">Email Address</label>
							<input
								type="email"
								id="email"
								placeholder="you@example.com"
								bind:value={email}
								required
								disabled={loading}
							/>
						</div>
						<div class="input-group">
							<label for="password">Password</label>
							<input
								type="password"
								id="password"
								bind:value={password}
								required
								disabled={loading}
							/>
						</div>
						{#if error}
							<p class="error-message">{error}</p>
						{/if}
						<button type="submit" class="btn-primary" disabled={loading}>
							{#if loading}
								<span class="loader"></span> Signing In...
							{:else}
								Sign In
							{/if}
						</button>
					</form>

					<div class="separator">Or continue with</div>

					<div class="social-logins">
						<SocialButton
							provider="Google"
							icon={icons.google}
							on:click={handleGoogleSignIn}
							disabled={loading}
						/>
					</div>
				{:else}
					<h2 class="title">
						Create your <span style="color: var(--primary-accent);">Account</span>
					</h2>
					<p class="subtitle">Get started with Smartslate</p>

					<form class="auth-form" on:submit={handleSignUp}>
						<div class="input-group">
							<label for="name">Full Name</label>
							<input
								type="text"
								id="name"
								placeholder="Your Name"
								bind:value={name}
								required
								disabled={loading}
							/>
						</div>
						<div class="input-group">
							<label for="signup-email">Email Address</label>
							<input
								type="email"
								id="signup-email"
								placeholder="you@example.com"
								bind:value={email}
								required
								disabled={loading}
							/>
						</div>
						<div class="input-group">
							<label for="signup-password">Password</label>
							<input
								type="password"
								id="signup-password"
								placeholder="6+ characters"
								bind:value={password}
								required
								disabled={loading}
							/>
						</div>
						{#if error}
							<p class="error-message">{error}</p>
						{/if}
						<button type="submit" class="btn-primary" disabled={loading}>
							{#if loading}
								<span class="loader"></span> Creating Account...
							{:else}
								Create Account
							{/if}
						</button>
					</form>
				{/if}
			</div>
		{/if}
	</div>
</Modal>

<style>
	.tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-md);
		padding: var(--space-xs);
	}

	.tabs button {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-weight: 500;
		transition: var(--transition-fast);
	}

	.tabs button.active {
		background-color: #1a202c; /* Match modal content background */
		color: var(--text-primary);
		font-weight: 600;
		box-shadow: var(--shadow-sm);
	}

	.auth-modal-content {
		text-align: center;
		min-height: 450px; /* Prevents layout shift when switching tabs */
		position: relative;
		display: flex;
		align-items: center;
		color: var(--text-primary);
	}

	.form-container {
		width: 100%;
	}

	.title {
		font-size: 1.75rem;
		font-weight: 600;
		margin-bottom: var(--space-sm);
	}

	.subtitle {
		color: var(--text-secondary);
		margin-bottom: var(--space-xl);
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		text-align: left;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.input-group label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.input-group input {
		background-color: rgba(255, 255, 255, 0.05);
		border: var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		color: var(--text-primary);
		font-size: 1rem;
		width: 100%;
	}

	.input-group input:focus {
		outline: none;
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 2px var(--primary-accent-translucent);
	}

	.btn-primary {
		background-color: var(--secondary-accent);
		color: var(--text-primary);
		font-weight: bold;
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: var(--transition-fast);
		margin-top: var(--space-md);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--space-sm);
	}

	.btn-primary:hover:not(:disabled) {
		opacity: 0.9;
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.separator {
		display: flex;
		align-items: center;
		text-align: center;
		color: var(--text-secondary);
		margin: var(--space-xl) 0;
		font-size: 0.9rem;
	}

	.separator::before,
	.separator::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid var(--border-subtle);
	}

	.separator:not(:empty)::before {
		margin-right: 0.5em;
	}

	.separator:not(:empty)::after {
		margin-left: 0.5em;
	}

	.social-logins {
		display: flex;
		gap: var(--space-md);
		justify-content: center;
	}

	.error-message {
		color: var(--destructive);
		font-size: 0.9rem;
		text-align: center;
		margin-top: calc(-1 * var(--space-md));
		margin-bottom: var(--space-sm);
	}

	.loader {
		width: 16px;
		height: 16px;
		border: 2px solid #fff;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
