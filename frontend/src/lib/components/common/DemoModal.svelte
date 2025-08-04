<script lang="ts">
	import { demoModalStore } from '$lib/stores/demoModalStore';
	import { toastStore } from '$lib/stores/toastStore';
	import { functions } from '$lib/services/firebase';
	import { httpsCallable } from 'firebase/functions';
	import Modal from '$lib/components/common/Modal.svelte';

	let name = '';
	let email = '';
	let phone = '';
	let organization = '';
	let jobTitle = '';
	let preferredDate = '';
	let preferredTime = '';
	let message = '';
	let loading = false;

	// Debug logging
	demoModalStore.subscribe((isOpen) => {
		console.log('Demo Modal Store Updated:', isOpen);
	});

	const resetForm = () => {
		name = '';
		email = '';
		phone = '';
		organization = '';
		jobTitle = '';
		preferredDate = '';
		preferredTime = '';
		message = '';
	};

	const handleSubmit = async () => {
		if (!name || !email || !phone || !organization) {
			toastStore.add('Please fill out all required fields.', 'error');
			return;
		}

		loading = true;
		try {
			const handleFormSubmission = httpsCallable(functions, 'handleFormSubmission');
			await handleFormSubmission({
				type: 'demoRequest',
				formData: {
					name,
					email,
					phone,
					organization,
					jobTitle,
					preferredDate,
					preferredTime,
					message
				}
			});

			toastStore.add('Thank you for your demo request! We will contact you within 24 hours to schedule your demo.', 'success');
			demoModalStore.close();
			resetForm();
		} catch (error) {
			console.error('Error submitting demo request:', error);
			toastStore.add((error as Error).message, 'error');
		} finally {
			loading = false;
		}
	};
</script>

<Modal isOpen={$demoModalStore} on:close={() => demoModalStore.close()} variant="dark">
	<h2>Schedule Your Demo</h2>
	<p>
		Experience the future of workforce development. Schedule a personalized demo to see how SmartSlate can transform your organization.
	</p>

	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-grid">
			<div class="form-group">
				<label for="name">Full Name *</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					placeholder="Enter your full name"
					required
				/>
			</div>

			<div class="form-group">
				<label for="email">Email Address *</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="Enter your email address"
					required
				/>
			</div>

			<div class="form-group">
				<label for="phone">Phone Number *</label>
				<input
					id="phone"
					type="tel"
					bind:value={phone}
					placeholder="Enter your phone number"
					required
				/>
			</div>

			<div class="form-group">
				<label for="organization">Organization *</label>
				<input
					id="organization"
					type="text"
					bind:value={organization}
					placeholder="Enter your organization name"
					required
				/>
			</div>

			<div class="form-group">
				<label for="jobTitle">Job Title</label>
				<input
					id="jobTitle"
					type="text"
					bind:value={jobTitle}
					placeholder="Enter your job title"
				/>
			</div>

			<div class="form-group">
				<label for="preferredDate">Preferred Date</label>
				<input
					id="preferredDate"
					type="date"
					bind:value={preferredDate}
					min={new Date().toISOString().split('T')[0]}
				/>
			</div>

			<div class="form-group">
				<label for="preferredTime">Preferred Time</label>
				<select id="preferredTime" bind:value={preferredTime}>
					<option value="">Select a time</option>
					<option value="09:00">9:00 AM</option>
					<option value="10:00">10:00 AM</option>
					<option value="11:00">11:00 AM</option>
					<option value="12:00">12:00 PM</option>
					<option value="13:00">1:00 PM</option>
					<option value="14:00">2:00 PM</option>
					<option value="15:00">3:00 PM</option>
					<option value="16:00">4:00 PM</option>
					<option value="17:00">5:00 PM</option>
				</select>
			</div>
		</div>

		<div class="form-group">
			<label for="message">Additional Information</label>
			<textarea
				id="message"
				bind:value={message}
				placeholder="Tell us about your specific needs or questions..."
				rows="4"
			></textarea>
		</div>

		<div class="form-actions">
			<button type="button" class="btn-secondary" on:click={() => demoModalStore.close()}>
				Cancel
			</button>
			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Scheduling...' : 'Schedule Demo'}
			</button>
		</div>
	</form>
</Modal>

<style>
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	.form-group {
		margin-bottom: var(--space-md);
	}

	.form-group label {
		display: block;
		margin-bottom: var(--space-xs);
		font-weight: 600;
		color: var(--text-primary);
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: var(--space-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background-color: var(--input-bg);
		color: var(--text-primary);
		font-size: 1rem;
		transition: var(--transition-fast);
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--primary-accent);
		box-shadow: 0 0 0 2px rgba(167, 218, 219, 0.2);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 100px;
	}

	.form-actions {
		display: flex;
		gap: var(--space-md);
		justify-content: flex-end;
		margin-top: var(--space-lg);
	}

	.btn-primary,
	.btn-secondary {
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-md);
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition-fast);
		border: none;
		font-size: 1rem;
	}

	.btn-primary {
		background-color: var(--primary-accent);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: var(--primary-accent-dark);
		transform: translateY(-1px);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-secondary {
		background-color: transparent;
		color: var(--text-secondary);
		border: 1px solid var(--border-color);
	}

	.btn-secondary:hover {
		background-color: var(--background-light);
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column;
		}
	}
</style> 