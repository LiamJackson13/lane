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

<button class="lane-button-danger" onclick={handleLogout} disabled={isPending}>
	{isPending ? 'Signing out...' : 'Sign out'}
</button>
