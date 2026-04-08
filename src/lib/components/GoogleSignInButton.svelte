<script lang="ts">
	import { authClient } from '$lib/auth-client';

	type Props = {
		text?: string;
		pendingText?: string;
		disabled?: boolean;
		onError?: (message: string) => void;
	};

	let {
		text = 'Sign in with Google',
		pendingText = 'Signing in...',
		disabled = false,
		onError
	}: Props = $props();

	let isPending = $state(false);

	const handleGoogleSignIn = async () => {
		if (disabled || isPending) return;

		isPending = true;

		await authClient.signIn.social(
			{
				provider: 'google',
				callbackURL: '/dashboard'
			},
			{
				onError: (ctx) => {
					onError?.(ctx.error.message);
					isPending = false;
				},
				onResponse: () => {
					isPending = false;
				}
			}
		);
	};
</script>

<button
	type="button"
	class="lane-social-button"
	onclick={handleGoogleSignIn}
	disabled={disabled || isPending}
>
	<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<path
			fill="#EA4335"
			d="M12 10.2v3.9h5.5c-0.2 1.3-1.5 3.9-5.5 3.9c-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2 0.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4c0-0.6-0.1-1.1-0.1-1.6z"
		/>
		<path
			fill="#34A853"
			d="M2.4 7.9l3.2 2.4C6.5 8 9 6 12 6c1.9 0 3.2 0.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4c-3.7 0-6.9 2.1-8.6 5.5z"
		/>
		<path
			fill="#FBBC05"
			d="M12 21.6c2.6 0 4.8-0.9 6.4-2.5l-3-2.3c-0.8 0.6-1.9 1.2-3.4 1.2c-3.9 0-5.2-2.6-5.5-3.9l-3.2 2.4c1.7 3.4 4.9 5.1 8.7 5.1z"
		/>
		<path
			fill="#4285F4"
			d="M21.2 12.2c0-0.6-0.1-1.1-0.1-1.6H12v3.9h5.5c-0.3 1.3-1.5 3.1-3.4 4.3l3 2.3c1.8-1.7 4.1-4.9 4.1-8.9z"
		/>
	</svg>
	{isPending ? pendingText : text}
</button>
