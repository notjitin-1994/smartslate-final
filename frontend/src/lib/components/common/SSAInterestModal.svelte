<script lang="ts">
	import { ssaInterestModalStore } from '$lib/stores/ssaInterestModalStore';
	import { toastStore } from '$lib/stores/toastStore';
	import { functions } from '$lib/services/firebase';
	import { httpsCallable } from 'firebase/functions';
	import Modal from '$lib/components/common/Modal.svelte';

	let name = '';
	let email = '';
	let phone = '';
	let organization = '';
	let jobTitle = '';
	let companySize: '' | '<50' | '50-200' | '200-1000' | '1000+' = '';
	let message = '';
	let loading = false;

	// Debug logging
	ssaInterestModalStore.subscribe((isOpen) => {
		console.log('SSA Modal Store Updated:', isOpen);
	});

	const resetForm = () => {
		name = '';
		email = '';
		phone = '';
		organization = '';
		jobTitle = '';
		companySize = '';
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
				type: 'ssaInterest',
				formData: {
					name,
					email,
					phone,
					organization,
					jobTitle,
					companySize,
					message
				}
			});

			toastStore.add('Thank you for your interest! We will be in touch.', 'success');
			ssaInterestModalStore.close();
			resetForm();
		} catch (error) {
			console.error('Error submitting interest:', error);
			toastStore.add((error as Error).message, 'error');
		} finally {
			loading = false;
		}
	};
</script>

<Modal isOpen={$ssaInterestModalStore} on:close={() => ssaInterestModalStore.close()} variant="dark">
	<h2>Set up your Strategic Skills Architecture</h2>
	<p>
		Unlock your organization's potential. Provide your details below, and our experts will contact
		you for a personalized consultation.
	</p>

	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-grid">
			<div class="form-group">
				<label for="name">Name</label>
				<input type="text" id="name" bind:value={name} placeholder="Your Name" required />
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="your.email@company.com"
					required
				/>
			</div>
			<div class="form-group">
				<label for="phone">Phone Number</label>
				<input type="tel" id="phone" bind:value={phone} placeholder="+1 (555) 123-4567" required />
			</div>
			<div class="form-group">
				<label for="organization">Organization</label>
				<input
					type="text"
					id="organization"
					bind:value={organization}
					placeholder="Your Company, Inc."
					required
				/>
			</div>
			<div class="form-group">
				<label for="jobTitle">Job Title (Optional)</label>
				<input
					type="text"
					id="jobTitle"
					bind:value={jobTitle}
					placeholder="e.g., Head of Talent"
				/>
			</div>
			<div class="form-group">
				<label for="companySize">Company Size (Optional)</label>
				<select id="companySize" bind:value={companySize}>
					<option disabled value="">Select size...</option>
					<option value="<50">Less than 50 employees</option>
					<option value="50-200">50-200 employees</option>
					<option value="200-1000">200-1000 employees</option>
					<option value="1000+">More than 1000 employees</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<label for="message">Brief Message (Optional)</label>
			<textarea
				id="message"
				bind:value={message}
				rows="4"
				placeholder="Tell us a bit about your goals..."
			/>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-primary" disabled={loading}>
				{loading ? 'Submitting...' : 'Request Consultation'}
			</button>
		</div>
	</form>
</Modal>

<style>
	h2 {
		margin-bottom: 1rem;
		color: var(--text-primary);
		text-align: center;
	}

	p {
		margin-bottom: 2rem;
		color: var(--text-secondary);
		text-align: center;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		margin-bottom: 0;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-color);
		background-color: var(--container-bg);
		color: var(--text-primary);
		transition: border-color 0.2s;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--primary-accent);
	}

	textarea {
		resize: vertical;
	}

	.form-actions {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.btn-primary {
		width: 100%;
		max-width: 250px;
	}

	@media (max-width: 640px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>