<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '../auth-client';

	let isPending = $state(false);

	const handleLogout = async () => {
		if (isPending) return;
		isPending = true;

		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto(resolve('/sign-in'));
				},
				onError: () => {
					isPending = false;
				}
			}
		});
	};
</script>

<button onclick={handleLogout} disabled={isPending}>
	{isPending ? 'Signing out...' : 'Sign out'}
</button>

<style>
	button {
		padding: 0.6rem 0.95rem;
		background: rgba(244, 63, 94, 0.1);
		color: #fecdd3;
		border: 1px solid rgba(244, 63, 94, 0.35);
		border-radius: 9px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s,
			opacity 0.2s,
			transform 0.15s;
	}

	button:hover:enabled {
		background: rgba(244, 63, 94, 0.18);
		color: #ffe4e6;
		transform: translateY(-1px);
	}

	button:disabled {
		opacity: 0.7;
		cursor: default;
	}
</style>
