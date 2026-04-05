<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '../auth-client';

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto(resolve('/sign-in')); // redirect to login page
				}
			}
		});
	};
</script>

<button onclick={handleLogout}>Logout</button>

<style>
	button {
		padding: 0.5em 1em;
		background-color: #e53e3e;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
