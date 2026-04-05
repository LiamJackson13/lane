<script lang="ts">
	import SignOutButton from '../../../lib/components/SignOutButton.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<section class="page">
	<header class="card header">
		<div>
			<h1>Dashboard</h1>
			<p class="muted">Signed in as {data.user.email}</p>
		</div>
	</header>

	<section class="card">
		<h2>Overview</h2>
		<dl class="overview">
			<div>
				<dt>Active school</dt>
				<dd class="mono">{data.schoolId ?? 'None selected'}</dd>
			</div>
			<div>
				<dt>Schools available</dt>
				<dd>{data.schools.length}</dd>
			</div>
		</dl>
	</section>
</section>
<SignOutButton />

<style>
	.page {
		display: grid;
		gap: 1rem;
	}

	.card {
		background: rgba(17, 17, 19, 0.84);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 12px;
		padding: 1rem;
	}

	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}

	h2 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 0.8rem;
	}

	.muted {
		margin-top: 0.35rem;
		font-size: 0.85rem;
		color: #9b9b9b;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-primary,
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.55rem 0.85rem;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
	}

	.btn-primary {
		background: #4fc3f7;
		color: #0a0a0b;
	}

	.btn-ghost {
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #c7c7c7;
	}

	.btn-ghost:hover {
		border-color: rgba(255, 255, 255, 0.3);
		color: #f0efe8;
	}

	.overview {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		margin: 0;
	}

	.overview div {
		background: rgba(22, 22, 24, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		padding: 0.75rem;
	}

	.overview dt {
		font-size: 11px;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: #7f7f7f;
		margin: 0 0 0.35rem;
	}

	.overview dd {
		margin: 0;
		font-size: 14px;
		color: #f0efe8;
	}

	.mono {
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		word-break: break-all;
	}

	@media (max-width: 600px) {
		.overview {
			grid-template-columns: 1fr;
		}
	}
</style>
