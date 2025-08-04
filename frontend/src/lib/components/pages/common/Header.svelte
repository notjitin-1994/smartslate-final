<script lang="ts">
	import logo from '$lib/assets/images/Final-Dark-BG.png';
	import Container from '$lib/components/pages/common/Container.svelte';
	import { authModalStore } from '$lib/stores/authModalStore';
	import { authStore } from '$lib/stores/authStore';
	import { auth } from '$lib/services/firebase';
	import { signOut } from 'firebase/auth';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { mobileMenuStore } from '$lib/stores/mobileMenuStore';

	let showUserDropdown = false;
	let isMobileMenuOpen = false;

	function toggleUserDropdown() {
		showUserDropdown = !showUserDropdown;
	}

	function closeDropdowns() {
		showUserDropdown = false;
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', closeDropdowns);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', closeDropdowns);
		}
	});

	function toggleMobileMenu(event: MouseEvent) {
		event.stopPropagation();
		const newState = !isMobileMenuOpen;
		isMobileMenuOpen = newState;
		// Ensure we're not in SSR
		if (typeof window !== 'undefined') {
			mobileMenuStore.set({ isOpen: newState });
		}
	}

	function closeMobileMenu(event?: MouseEvent) {
		event?.stopPropagation();
		isMobileMenuOpen = false;
		mobileMenuStore.set({ isOpen: false });
	}

	function openAuthModal() {
		authModalStore.update((state) => ({ ...state, isOpen: true }));
	}

	async function handleSignOut() {
		await signOut(auth);
		// onAuthStateChanged will handle the rest
	}

	// Prevent body scroll when mobile menu is open
	$: {
		if (typeof document !== 'undefined') {
			if (isMobileMenuOpen) {
				document.body.classList.add('no-scroll');
			} else {
				document.body.classList.remove('no-scroll');
			}
		}
	}
</script>

<header>
	<div class="header-background"></div>
	<Container>
		<div class="content">
			<a href="/" class="logo-link" on:click={closeMobileMenu}>
				<img src={logo} alt="Smartslate Logo" />
			</a>

			<div class="nav-and-actions">
				<!-- Desktop Nav -->
				<nav class="desktop-nav">
					<a href="/products">Products</a>
					<a href="/the-smartslate-difference">The Smartslate Difference</a>
					<a href="/collaborate">Partner & Collaborate</a>
				</nav>

				<div class="actions">
					{#if $authStore.loading}
						<div class="loader"></div>
					{:else if $authStore.user}
						<div
							class="dropdown-container"
							on:click|stopPropagation
							on:keydown|stopPropagation={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									toggleUserDropdown();
								}
							}}
							role="button"
							tabindex="0"
						>
							<div class="user-avatar-button" on:click={toggleUserDropdown}>
								{#if $authStore.user.photoURL}
									<img src={$authStore.user.photoURL} alt="User avatar" class="user-avatar" />
								{:else}
									<div class="user-avatar-placeholder">
										{$authStore.user.email?.charAt(0).toUpperCase()}
									</div>
								{/if}
							</div>
							{#if showUserDropdown}
								<div
									class="dropdown-menu user-dropdown"
									transition:fly={{ y: -5, duration: 300, easing: quintOut }}
								>
									<div class="user-info">
										<p class="user-name">{$authStore.user.displayName || 'User'}</p>
										<p class="user-email">{$authStore.user.email}</p>
									</div>
									<hr />
									<a href="/profile" class="dropdown-item" on:click={closeDropdowns}>Profile</a>
									<hr />
									{#if $authStore.role && ['smartslateAdmin', 'smartslateManager', 'smartslateClientManager'].includes($authStore.role)}
										<a href="/admin" class="dropdown-item" on:click={closeDropdowns}>Admin Dashboard</a>
									{/if}
									<button on:click={handleSignOut} class="dropdown-item">Sign Out</button>
								</div>
							{/if}
						</div>
					{:else}
						<button on:click={openAuthModal} class="btn-signin">Sign In</button>
					{/if}
				</div>
			</div>

			<!-- Hamburger Button -->
			<button
				class="hamburger"
				class:is-active={isMobileMenuOpen}
				on:click={toggleMobileMenu}
				on:keydown={(e) => e.key === 'Enter' && toggleMobileMenu(e as unknown as MouseEvent)}
				aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isMobileMenuOpen}
				aria-controls="mobile-nav-panel"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</Container>

	<!-- Mobile Nav Panel -->
	{#if isMobileMenuOpen}
		<div
			class="mobile-nav-backdrop"
			on:click|self={closeMobileMenu}
			on:keydown={(e) => {
				if (e.key === 'Escape') closeMobileMenu();
			}}
			transition:fade={{ duration: 300 }}
			role="button"
			tabindex="0"
			aria-label="Close menu"
		></div>
		<aside class="mobile-nav-panel" transition:fly={{ duration: 300, x: '100%', easing: quintOut }}>
			<div class="mobile-nav-header">
				<h2 class="mobile-nav-title">Menu</h2>
			</div>
			<nav class="mobile-nav">
				<a href="/products" on:click={closeMobileMenu}>Products</a>
				<a href="/the-smartslate-difference" on:click={closeMobileMenu}>The Smartslate Difference</a>
				<a href="/collaborate" on:click={closeMobileMenu}>Partner & Collaborate</a>
			</nav>
			<div class="mobile-actions">
				<hr />
				{#if $authStore.user}
					<a href="/profile" class="mobile-user-profile-link" on:click={closeMobileMenu}>
						<div class="mobile-user-info">
							<div class="user-avatar-link">
								{#if $authStore.user.photoURL}
									<img src={$authStore.user.photoURL} alt="User avatar" class="user-avatar" />
								{:else}
									<div class="user-avatar-placeholder">
										{$authStore.user.email?.charAt(0).toUpperCase()}
									</div>
								{/if}
							</div>
							<div class="user-details">
								<p class="user-name">{$authStore.user.displayName || 'User'}</p>
								<p class="user-email">{$authStore.user.email}</p>
							</div>
						</div>
					</a>

					{#if $authStore.role && ['smartslateAdmin', 'smartslateManager', 'smartslateClientManager'].includes($authStore.role)}
						<a href="/admin" class="mobile-admin-link" on:click={closeMobileMenu}>Admin Dashboard</a>
					{/if}

					<button
						on:click={() => {
							closeMobileMenu();
							handleSignOut();
						}}
						class="btn-signout"
					>
						Sign Out
					</button>
				{:else}
					<button
						on:click={() => {
							closeMobileMenu();
							openAuthModal();
						}}
						class="btn-signin"
					>
						Sign In
					</button>
				{/if}
			</div>
		</aside>
	{/if}
</header>

<style>
	header {
		position: sticky;
		top: var(--space-md);
		z-index: 50;
		max-width: 1200px;
		margin: 0 auto;
		width: calc(100% - var(--space-lg));
	}

	.header-background {
		position: absolute;
		inset: 0;
		background-color: rgba(9, 21, 33, 0.25); /* Using a specific rgba for the glass effect */
		backdrop-filter: blur(12px);
		border: var(--border-subtle);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding: var(--space-md) 0;
	}

	.logo-link img {
		height: 28px;
		display: block;
	}

	.nav-and-actions {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	/* --- Desktop Navigation --- */
	.desktop-nav {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	.desktop-nav a {
		color: var(--text-primary);
		text-decoration: none;
		font-size: 0.9rem;
		position: relative;
		transition: var(--transition-fast);
	}

	.desktop-nav a:hover {
		color: var(--primary-accent);
	}

	.dropdown-container {
		position: relative;
	}


	.dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(9, 21, 33, 0.5);
		backdrop-filter: blur(12px);
		border: var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-sm) 0;
		min-width: 240px;
		z-index: 11;
		box-shadow: var(--shadow-lg);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.dropdown-menu a {
		padding: var(--space-sm) var(--space-lg);
		white-space: nowrap;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.dropdown-menu a:hover {
		background-color: var(--primary-accent);
		color: #0D1B2A; /* Darker text for better contrast on hover */
		text-decoration: none;
	}

	.actions .btn-signin,
	.mobile-actions .btn-signin {
		background-color: var(--secondary-accent);
		color: #ffffff;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-sm);
		text-decoration: none;
		font-weight: bold;
		font-size: 0.9rem;
		transition: var(--transition-fast);
		border: none;
		cursor: pointer;
		font-family: inherit;
	}

	.actions .btn-signin:hover {
		opacity: 0.9;
	}

	.user-avatar-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border: 2px solid transparent;
		transition: border-color var(--transition-fast);
	}

	.user-avatar-button:hover {
		border-color: var(--primary-accent);
	}

	.user-avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-avatar-placeholder {
		width: 100%;
		height: 100%;
		background-color: var(--primary-accent);
		color: var(--background);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1rem;
	}

	.user-dropdown {
		right: 0;
		left: auto;
		transform: translateX(0);
		transform-origin: top right;
	}

	.user-info {
		padding: var(--space-sm) var(--space-lg);
		font-size: 0.9rem;
	}

	.user-name {
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}

	.user-email {
		color: var(--text-secondary);
		margin: 0;
	}

	.user-dropdown hr {
		border: none;
		border-top: var(--border-subtle);
		margin: var(--space-sm) 0;
	}

	.dropdown-item {
		background: none;
		border: none;
		color: var(--text-secondary);
		padding: var(--space-sm) var(--space-lg);
		width: 100%;
		text-align: left;
		cursor: pointer;
		font-size: 0.9rem;
		text-decoration: none;
		display: block;
	}

	.dropdown-item:hover {
		background-color: var(--primary-accent);
		color: #0D1B2A; /* Darker text for better contrast on hover */
	}

	.loader {
		width: 20px;
		height: 20px;
		border: 2px solid var(--text-primary);
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

	/* --- Hamburger & Mobile Nav --- */
	.hamburger {
		display: none; /* Hidden by default */
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 1003;
		width: 44px;
		height: 44px;
		position: relative;
	}

	.hamburger span {
		display: block;
		width: 25px;
		height: 3px;
		background-color: var(--text-primary);
		transition: var(--transition-medium);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		transform-origin: center;
		border-radius: var(--radius-sm);
	}

	.hamburger span:nth-child(1) {
		top: 10px;
	}
	.hamburger span:nth-child(2) {
		top: 20px;
	}
	.hamburger span:nth-child(3) {
		top: 30px;
	}

	.hamburger.is-active {
		position: relative;
	}

	.hamburger.is-active span:nth-child(1) {
		transform: translate(-50%, 10px) rotate(45deg);
	}
	.hamburger.is-active span:nth-child(2) {
		opacity: 0;
	}
	.hamburger.is-active span:nth-child(3) {
		transform: translate(-50%, -10px) rotate(-45deg);
	}

	.mobile-nav-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(5px);
		z-index: 998;
	}

	.mobile-nav-panel {
		position: fixed;
		top: 0;
		right: 0;
		width: 80%;
		max-width: 320px;
		height: 100%;
		background-color: var(--background);
		z-index: 1002;
		padding: var(--space-xl);
		box-shadow: var(--shadow-lg);
		display: flex;
		flex-direction: column;
		border-left: 1px solid var(--primary-accent);
	}

	.mobile-user-profile-link {
		display: block;
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: background-color var(--transition-fast);
		margin-bottom: var(--space-md);
	}

	.mobile-user-profile-link:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.mobile-user-info {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-sm);
	}

	.user-avatar-link {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
	}

	.mobile-user-info .user-avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.mobile-user-info .user-avatar-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-accent);
		color: var(--background);
		font-weight: bold;
		font-size: 1rem;
	}

	.mobile-user-info .user-details {
		font-size: 0.9rem;
		overflow: hidden;
	}

	.mobile-user-info .user-name {
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mobile-user-info .user-email {
		color: var(--text-secondary);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mobile-nav-header {
		padding-bottom: var(--space-lg);
		border-bottom: var(--border-subtle);
		margin-bottom: var(--space-lg);
	}

	.mobile-nav-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--primary-accent);
		margin: 0;
	}

	.mobile-nav {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-lg);
		padding-top: var(--space-lg);
	}

	.mobile-nav a {
		text-decoration: none;
		font-size: 1.1rem;
		font-family: var(--font-body);
	}

	.mobile-nav > a {
		color: var(--text-primary);
		font-weight: 500;
	}

	.mobile-actions {
		margin-top: auto;
		padding-top: var(--space-lg);
	}

	.mobile-actions hr {
		border: none;
		border-top: var(--border-subtle);
		margin-bottom: var(--space-lg);
	}

	.mobile-actions .btn-signin,
	.mobile-actions .btn-signout {
		display: block;
		width: 100%;
		text-align: center;
		background-color: var(--secondary-accent);
		color: #ffffff;
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: bold;
		font-size: 1.1rem;
		border: none;
		cursor: pointer;
		font-family: inherit;
	}

	.mobile-actions .btn-signout {
		background-color: transparent;
		border: 1px solid var(--secondary-accent);
		color: var(--secondary-accent);
	}

	.mobile-admin-link {
		display: block;
		width: 100%;
		text-align: center;
		background-color: transparent;
		color: var(--text-primary);
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: bold;
		font-size: 1.1rem;
		border: 1px solid var(--text-primary);
		cursor: pointer;
		font-family: inherit;
		margin-bottom: var(--space-md);
	}

	/* --- Responsive Breakpoint --- */
	@media (max-width: 768px) {
		.nav-and-actions {
			display: none;
		}
		.hamburger {
			display: flex;
		}
		.content {
			padding: var(--space-sm) 0; /* Reduce padding on mobile */
		}
	}
</style>
