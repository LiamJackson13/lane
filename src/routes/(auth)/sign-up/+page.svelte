<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';

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
</script>

<div class="auth-page">
	<div class="auth-bg">
		<div class="auth-grid"></div>
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
	</div>

	<nav class="auth-nav">
		<a href={resolve('/')} class="nav-logo">Lane<span>.</span></a>
	</nav>

	<main class="auth-shell">
		<section class="auth-copy">
			<p class="eyebrow">Early access</p>
			<h1>Set up your school and start running clean operations.</h1>
			<p>
				Create your account to bring scheduling, attendance, and parent communication into one
				system.
			</p>
		</section>

		<section class="auth-card">
			<p class="card-eyebrow">Create account</p>
			<h2>Sign up for Lane</h2>

			<form class="auth-form" onsubmit={handleSubmit}>
				<label class="field" for="name">
					<span>Name</span>
					<input type="text" id="name" bind:value={name} required placeholder="Your full name" />
				</label>

				<label class="field" for="email">
					<span>Email</span>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						placeholder="you@swimschool.com"
					/>
				</label>

				<label class="field" for="password">
					<span>Password</span>
					<input
						type="password"
						id="password"
						bind:value={password}
						required
						placeholder="Create a password"
					/>
				</label>

				<label class="field" for="confirm-password">
					<span>Confirm password</span>
					<input
						type="password"
						id="confirm-password"
						bind:value={confirmPassword}
						required
						placeholder="Repeat your password"
					/>
				</label>

				<button class="submit" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Creating account...' : 'Create account'}
				</button>
			</form>

			{#if authError}
				<p class="auth-error">{authError}</p>
			{/if}

			<a href={resolve('/sign-in')} class="switch-link">Already have an account? Sign in</a>
		</section>
	</main>
</div>

<style>
	:global(body) {
		background: #0a0a0b;
	}

	.auth-page {
		min-height: 100dvh;
		color: #f0efe8;
		font-family: 'DM Sans', system-ui, sans-serif;
		position: relative;
		overflow: hidden;
	}

	.auth-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.auth-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, transparent 100%);
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		opacity: 0.15;
	}

	.orb-1 {
		width: 440px;
		height: 440px;
		top: -180px;
		left: 15%;
		background: #4fc3f7;
	}

	.orb-2 {
		width: 380px;
		height: 380px;
		bottom: -160px;
		right: 8%;
		background: #7c6af7;
	}

	.auth-nav {
		position: relative;
		z-index: 2;
		height: 64px;
		display: flex;
		align-items: center;
		padding: 0 2rem;
	}

	.nav-logo {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 26px;
		text-decoration: none;
		color: #f0efe8;
		letter-spacing: -0.02em;
	}

	.nav-logo span {
		color: #4fc3f7;
	}

	.auth-shell {
		position: relative;
		z-index: 2;
		max-width: 1060px;
		margin: 0 auto;
		padding: 3rem 2rem 4rem;
		display: grid;
		grid-template-columns: 1fr 460px;
		gap: 3rem;
		align-items: center;
		min-height: calc(100dvh - 64px);
	}

	.auth-copy h1 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(38px, 6vw, 64px);
		line-height: 1.05;
		font-weight: 400;
		letter-spacing: -0.025em;
		max-width: 550px;
		margin: 0 0 1.1rem;
	}

	.auth-copy p {
		max-width: 460px;
		font-size: 16px;
		line-height: 1.7;
		color: #9b9b9b;
	}

	.eyebrow {
		margin-bottom: 0.85rem;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #4fc3f7;
		font-weight: 600;
	}

	.auth-card {
		background: rgba(17, 17, 19, 0.85);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		padding: 2rem;
		box-shadow:
			0 0 60px rgba(79, 195, 247, 0.07),
			0 35px 70px rgba(0, 0, 0, 0.5);
	}

	.card-eyebrow {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #8a8a8a;
		margin-bottom: 0.45rem;
	}

	.auth-card h2 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 38px;
		font-weight: 400;
		line-height: 1;
		margin: 0 0 1.5rem;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.field span {
		font-size: 12px;
		letter-spacing: 0.03em;
		color: #9b9b9b;
	}

	input {
		width: 100%;
		background: #161618;
		color: #f0efe8;
		border: 1px solid rgba(255, 255, 255, 0.13);
		border-radius: 10px;
		padding: 0.8rem 0.95rem;
		font-size: 14px;
		outline: none;
		transition: border-color 0.2s;
	}

	input::placeholder {
		color: #666;
	}

	input:focus {
		border-color: rgba(79, 195, 247, 0.65);
	}

	.submit {
		width: 100%;
		margin-top: 0.3rem;
		padding: 0.82rem;
		background: #4fc3f7;
		color: #0a0a0b;
		border: none;
		border-radius: 10px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition:
			opacity 0.2s,
			transform 0.15s;
	}

	.submit:hover:enabled {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.submit:disabled {
		opacity: 0.7;
		cursor: default;
	}

	.auth-error {
		margin-top: 0.9rem;
		font-size: 13px;
		color: #fca5a5;
	}

	.switch-link {
		display: block;
		text-align: center;
		margin-top: 1.2rem;
		font-size: 13px;
		color: #8a8a8a;
		text-decoration: none;
		transition: color 0.2s;
	}

	.switch-link:hover {
		color: #f0efe8;
	}

	@media (max-width: 900px) {
		.auth-shell {
			grid-template-columns: 1fr;
			gap: 1.6rem;
			padding-top: 2rem;
		}

		.auth-copy h1 {
			font-size: clamp(34px, 10vw, 52px);
		}

		.auth-card {
			padding: 1.4rem;
		}
	}
</style>
