// src/lib/stores/authStore.ts

import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '$lib/services/firebase';

type Role = 'smartslateAdmin' | 'smartslateManager' | 'smartslateClientManager' | 'learner';

interface AppUser extends User {
	role: Role;
}

export interface AuthState {
	user: AppUser | null;
	loading: boolean;
	error: Error | null;
	role: Role | null;
}

function createAuthStore() {
	const { subscribe, set } = writable<AuthState>({
		user: null,
		loading: true, // Assume loading until the first auth state check completes
		error: null,
		role: null
	});

	const listen = () => {
		onAuthStateChanged(
			auth,
			async (user) => {
				if (user) {
					const tokenResult = await user.getIdTokenResult();
					const role = (tokenResult.claims.role as Role) || 'learner';
					const appUser: AppUser = Object.assign(user, { role });
					set({ user: appUser, loading: false, error: null, role: role });
				} else {
					set({ user: null, loading: false, error: null, role: null });
				}
			},
			(error) => {
				set({ user: null, loading: false, error, role: null });
			}
		);
	};

	listen(); // Start listening when the store is created

	return {
		subscribe
	};
}

export const authStore = createAuthStore();
