<script lang="ts">
	import SignOutButton from '../../../lib/components/SignOutButton.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<h1>Welcome, {data.user.name}!</h1>
<p>Your email is {data.user.email}</p>

<SignOutButton />
