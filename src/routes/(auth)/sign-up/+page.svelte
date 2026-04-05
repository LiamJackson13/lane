<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let authError = $state('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			authError = 'Passwords do not match';
			return;
		}
		const { data, error } = await authClient.signUp.email(
			{
				email, // user email address
				password, // user password -> min 8 characters by default
				name // user display name
			},
			{
				onRequest: () => {
					//show loading
				},
				onSuccess: () => {
					goto(resolve('/dashboard'));
				},
				onError: (ctx) => {
					// display the error message
					authError = ctx.error.message;
				}
			}
		);
	};
</script>

<div class="container">
	<h1>Sign Up</h1>
	<form onsubmit={handleSubmit}>
		<div class="form-group">
			<label for="name">Name</label>
			<input type="text" id="name" bind:value={name} required placeholder="Enter your name" />
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} required placeholder="Enter your email" />
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				placeholder="Enter your password"
			/>
		</div>

		<div class="form-group">
			<label for="confirm-password">Confirm Password</label>
			<input
				type="password"
				id="confirm-password"
				bind:value={confirmPassword}
				required
				placeholder="Confirm your password"
			/>
		</div>

		<button type="submit">Sign Up</button>
		<a href={resolve('/sign-in')} class="link">Already have an account? Sign In</a>
	</form>
	{#if authError}
		<p style="color: red; text-align: center; margin-top: 15px;">{authError}</p>
	{/if}
</div>

<style>
	.container {
		max-width: 400px;
		margin: 50px auto;
		padding: 20px;
	}

	h1 {
		text-align: center;
		margin-bottom: 30px;
	}

	.form-group {
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 5px;
		font-weight: 500;
	}

	input {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
	}

	button {
		width: 100%;
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	.link {
		display: block;
		text-align: center;
		margin-top: 15px;
		color: #007bff;
		text-decoration: none;
	}
</style>
