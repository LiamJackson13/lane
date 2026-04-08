<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import GoogleSignInButton from '$lib/components/GoogleSignInButton.svelte';

	let email = $state('');
	let password = $state('');
	let authError = $state('');
	let isSubmitting = $state(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		authError = '';
		isSubmitting = true;

		await authClient.signIn.email(
			{
				email,
				password,
				rememberMe: true
			},
			{
				onSuccess: () => {
					goto(resolve('/dashboard'));
				},
				onError: (ctx) => {
					authError = ctx.error.message;
					isSubmitting = false;
				},
				onResponse: () => {
					isSubmitting = false;
				}
			}
		);
	};

	const handleGoogleError = (message: string) => {
		authError = message;
	};
</script>

<div>
	<main>
		<section>
			<h2>Sign in to Lane</h2>

			<form onsubmit={handleSubmit}>
				<label for="email">
					<span>Email</span>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						placeholder="you@swimschool.com"
					/>
				</label>

				<label for="password">
					<span>Password</span>
					<input
						type="password"
						id="password"
						bind:value={password}
						required
						placeholder="Your password"
					/>
				</label>

				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Signing in...' : 'Sign in'}
				</button>
				<GoogleSignInButton
					text="Sign in with Google"
					pendingText="Signing in..."
					disabled={isSubmitting}
					onError={handleGoogleError}
				/>
			</form>

			{#if authError}
				<p>{authError}</p>
			{/if}

			<a href={resolve('/sign-up')}>Don't have an account? Create one</a>
		</section>
	</main>
</div>
