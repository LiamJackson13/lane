<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import GoogleSignInButton from '$lib/components/GoogleSignInButton.svelte';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let authError = $state('');
	let isSubmitting = $state(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		authError = '';
		if (password !== confirmPassword) {
			authError = 'Passwords do not match';
			return;
		}

		isSubmitting = true;

		await authClient.signUp.email(
			{
				email,
				password,
				name
			},
			{
				onSuccess: () => {
					goto(resolve('/dashboard'));
				},
				onError: (ctx) => {
					authError = ctx.error.message;
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
			<p>Create account</p>
			<h2>Sign up for Lane</h2>

			<form onsubmit={handleSubmit}>
				<label for="name">
					<span>Name</span>
					<input type="text" id="name" bind:value={name} required placeholder="Your full name" />
				</label>

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
						placeholder="Create a password"
					/>
				</label>

				<label for="confirm-password">
					<span>Confirm password</span>
					<input
						type="password"
						id="confirm-password"
						bind:value={confirmPassword}
						required
						placeholder="Repeat your password"
					/>
				</label>

				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Creating account...' : 'Create account'}
				</button>
				<GoogleSignInButton
					text="Sign up with Google"
					pendingText="Signing up..."
					disabled={isSubmitting}
					onError={handleGoogleError}
				/>
			</form>

			{#if authError}
				<p>{authError}</p>
			{/if}

			<a href={resolve('/sign-in')}>Already have an account? Sign in</a>
		</section>
	</main>
</div>
