<script lang="ts">
	import { contactUsModalStore } from '$lib/stores/contactUsModalStore';
	import { onMount } from 'svelte';
	import { auth, functions } from '$lib/services/firebase';
	import { httpsCallable } from 'firebase/functions';
	import { toastStore } from '$lib/stores/toastStore';
	import Modal from '$lib/components/common/Modal.svelte';

	// Form State
	let name = '';
	let email = '';
	let phone = '';
	let organization = '';
	let message = '';
	let loading = false;
	let error: string | null = null;

	let inquiryType: string | null = null;
	contactUsModalStore.subscribe((value) => {
		inquiryType = value.inquiryType;
	});

	function closeModal() {
		contactUsModalStore.closeModal();
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		error = null;

		try {
			const handleFormSubmission = httpsCallable(functions, 'handleFormSubmission');
			await handleFormSubmission({
				type: 'contact',
				formData: {
					name,
					email,
					phone,
					organization,
					message
				}
			});

			toastStore.add('Your message has been sent successfully!', 'success');
			closeModal();
		} catch (e: any) {
			error = 'There was an error submitting your inquiry. Please try again.';
			toastStore.add(error, 'error');
			console.error('Inquiry submission error:', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		// Pre-fill user data if available
		const currentUser = auth.currentUser;
		if (currentUser) {
			name = currentUser.displayName || '';
			email = currentUser.email || '';
		}
	});
</script>

<Modal isOpen={$contactUsModalStore.isOpen} on:close={closeModal} variant="dark">
	<div class="form-container">
		<h2 class="title">Contact <span style="color: var(--primary-accent);">Us</span></h2>
		<p class="subtitle">
			We're here to help. Inquiries for
			<span class="inquiry-type">{inquiryType || 'General'}</span>
		</p>

		<form class="auth-form" on:submit={handleSubmit}>
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
				<label for="phone">Phone Number</label>
				<input
					type="tel"
					id="phone"
					placeholder="Your Phone Number"
					bind:value={phone}
					disabled={loading}
				/>
			</div>
			<div class="input-group">
				<label for="organization">Organization</label>
				<input
					type="text"
					id="organization"
					placeholder="Your Organization"
					bind:value={organization}
					disabled={loading}
				/>
			</div>
			<div class="input-group">
				<label for="message">Message</label>
				<textarea
					id="message"
					placeholder="How can we help you?"
					bind:value={message}
					required
					disabled={loading}
					rows="4"
				></textarea>
			</div>

			{#if error}
				<p class="error-message">{error}</p>
			{/if}
			<button type="submit" class="btn-primary" disabled={loading}>
				{#if loading}
					<span class="loader"></span> Submitting...
				{:else}
					Submit Inquiry
				{/if}
			</button>
		</form>
	</div>
</Modal>

<style>
	.form-container {
		width: 100%;
		color: var(--text-primary);
	}

	.title {
		font-size: 1.75rem;
		font-weight: 600;
		margin-bottom: var(--space-sm);
		text-align: center;
	}

	.subtitle {
		color: var(--text-secondary);
		margin-bottom: var(--space-xl);
		text-align: center;
	}

	.inquiry-type {
		font-weight: bold;
		color: var(--primary-accent);
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

	.input-group input,
	.input-group textarea {
		background-color: rgba(255, 255, 255, 0.05);
		border: var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		color: var(--text-primary);
		font-size: 1rem;
		width: 100%;
		font-family: inherit; /* Ensure textarea inherits font */
	}

	.input-group input:focus,
	.input-group textarea:focus {
		outline: none;
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 2px var(--primary-accent-translucent);
	}

	.input-group textarea {
		resize: vertical;
		min-height: 80px;
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