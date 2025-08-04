<script lang="ts">
	import Container from '$lib/components/pages/common/Container.svelte';
	import { authStore } from '$lib/stores/authStore';
	import { auth, db } from '$lib/services/firebase';
	import { updateProfile } from 'firebase/auth';
	import { doc, updateDoc } from 'firebase/firestore';
	import { toastStore } from '$lib/stores/toastStore';

	let displayName = '';
	let phoneNumber = '';
	let photoURL = '';
	let isEditing = false;

	authStore.subscribe((store) => {
		if (store.user) {
			displayName = store.user.displayName || '';
			phoneNumber = store.user.phoneNumber || '';
			photoURL = store.user.photoURL || '';
		}
	});

	async function handleProfileUpdate() {
		if (!$authStore.user) return;

		try {
			if (!auth.currentUser) {
				throw new Error('User not authenticated');
			}
			// Update profile in Firebase Auth
			await updateProfile(auth.currentUser, {
				displayName,
				photoURL
			});

			// Update profile in Firestore
			const userRef = doc(db, 'users', $authStore.user.uid);
			await updateDoc(userRef, {
				displayName,
				phoneNumber,
				photoURL
			});

			toastStore.add('Profile updated successfully!', 'success');
			isEditing = false;
		} catch (error) {
			console.error('Error updating profile:', error);
			toastStore.add('Failed to update profile.', 'error');
		}
	}
</script>

<Container>
	<div class="profile-page">
		{#if $authStore.user}
			<h1>Welcome, {$authStore.user.displayName || 'User'}</h1>
			<p>This is your profile page.</p>
			<div class="profile-details">
				{#if isEditing}
					<form on:submit|preventDefault={handleProfileUpdate}>
						<div class="form-group">
							<label for="displayName">Display Name</label>
							<input type="text" id="displayName" bind:value={displayName} />
						</div>
						<div class="form-group">
							<label for="phoneNumber">Phone Number</label>
							<input type="tel" id="phoneNumber" bind:value={phoneNumber} />
						</div>
						<div class="form-group">
							<label for="photoURL">Photo URL</label>
							<input type="text" id="photoURL" bind:value={photoURL} />
						</div>
						<button type="submit" class="btn btn-primary">Save</button>
						<button type="button" on:click={() => (isEditing = false)}>Cancel</button>
					</form>
				{:else}
					{#if photoURL}
						<img src={photoURL} alt="User avatar" class="profile-avatar" />
					{/if}
					<p><strong>Email:</strong> {$authStore.user.email}</p>
					<p><strong>Display Name:</strong> {displayName}</p>
					<p><strong>Phone Number:</strong> {phoneNumber || 'Not set'}</p>
					<p><strong>UID:</strong> {$authStore.user.uid}</p>
					<button on:click={() => (isEditing = true)}>Edit Profile</button>
				{/if}
			</div>
		{:else if $authStore.loading}
			<p>Loading profile...</p>
		{:else}
			<p>Please sign in to view your profile.</p>
		{/if}
	</div>
</Container>

<style>
	.profile-page {
		padding: var(--space-xl) 0;
		color: var(--text-primary);
	}

	.profile-details {
		margin-top: var(--space-lg);
		background-color: var(--background-secondary);
		padding: var(--space-lg);
		border-radius: var(--radius-md);
	}

	.profile-avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: var(--space-md);
	}
</style>
