<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const activeOrganizationId = () => data.organizationId ?? '';
</script>

<section class="schools-page">
	<header class="card header">
		<h1>Schools</h1>
		<p class="meta">Organization ID: {activeOrganizationId() || 'None selected'}</p>
	</header>
	<section class="card">
		<div class="section-head">
			<h2>Existing schools</h2>
			<span>{data.schools.length} total</span>
		</div>

		{#if data.schools.length === 0}
			<p class="empty">No schools yet.</p>
		{:else}
			<ul class="school-list">
				{#each data.schools as school (school.id)}
					<li>
						<div class="name">{school.name}</div>
						<div class="meta mono">{school.id}</div>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</section>

<style>
	.schools-page {
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
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	h1,
	h2 {
		font-weight: 600;
		margin: 0;
	}

	h1 {
		font-size: 1.5rem;
	}

	h2 {
		font-size: 1.1rem;
	}

	.meta {
		font-size: 0.8rem;
		color: #7f7f7f;
		word-break: break-all;
	}

	.warning {
		margin-top: 0.75rem;
		color: #fed7aa;
		background: rgba(234, 88, 12, 0.12);
		border: 1px solid rgba(251, 146, 60, 0.35);
		padding: 0.65rem;
		border-radius: 8px;
	}

	.school-form {
		display: grid;
		gap: 0.7rem;
		margin-top: 0.7rem;
	}

	label {
		display: grid;
		gap: 0.45rem;
	}

	label span {
		font-size: 12px;
		letter-spacing: 0.03em;
		color: #9b9b9b;
	}

	input {
		padding: 0.65rem 0.8rem;
		background: #161618;
		border: 1px solid rgba(255, 255, 255, 0.13);
		border-radius: 8px;
		color: #f0efe8;
		font-size: 14px;
		outline: none;
		transition: border-color 0.2s;
	}

	input:focus {
		border-color: rgba(79, 195, 247, 0.65);
	}

	button {
		width: fit-content;
		padding: 0.58rem 0.9rem;
		border: none;
		border-radius: 8px;
		background: #4fc3f7;
		color: #0a0a0b;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition:
			opacity 0.2s,
			transform 0.15s;
	}

	button:hover:enabled {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.8rem;
	}

	.section-head span {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #7f7f7f;
	}

	.school-list {
		list-style: none;
		padding: 0;
		margin: 0.9rem 0 0;
		display: grid;
		gap: 0.75rem;
	}

	.school-list li {
		padding: 0.8rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		background: rgba(22, 22, 24, 0.9);
	}

	.name {
		font-weight: 500;
		color: #f0efe8;
	}

	.meta {
		font-size: 0.78rem;
		color: #7f7f7f;
		margin-top: 0.25rem;
		word-break: break-all;
	}

	.mono {
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
	}

	.empty {
		margin-top: 0.9rem;
		color: #9b9b9b;
	}
</style>
