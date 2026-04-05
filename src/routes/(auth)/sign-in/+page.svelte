<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';

	let email = $state('');
	let password = $state('');
	let authError = $state('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const { data, error } = await authClient.signIn.email(
			{
				email, // user email address
				password, // user password -> min 8 characters by default
				rememberMe: true // optional, default is false. If true, the session will persist even after the browser is closed.
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
	<h1>Sign In</h1>
	<form onsubmit={handleSubmit}>
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

		<button type="submit">Sign In</button>
		<a href={resolve('/sign-up')} class="link">Don't have an account? Sign Up</a>
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
