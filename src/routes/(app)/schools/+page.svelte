<script lang="ts">
	import { createSchool } from './schools.remote.js';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const activeOrganizationId = data.organizationId ?? '';

	const createSchoolForm = createSchool.enhance(async ({ submit }) => {
		await submit();
		location.reload();
	});
</script>

<section class="schools-page">
	<h1>Schools</h1>
	<p>Org ID: {activeOrganizationId}</p>

	{#if !activeOrganizationId}
		<p class="warning">No active organization found. Select an organization first.</p>
	{:else}
		<form {...createSchoolForm} class="school-form">
			<input type="hidden" name="organizationId" value={activeOrganizationId} />

			<label>
				School name
				<input name="name" required placeholder="e.g. Northside Primary" />
			</label>

			<button type="submit" disabled={createSchool.pending > 0}>
				{#if createSchool.pending > 0}
					Creating...
				{:else}
					Create school
				{/if}
			</button>
		</form>
	{/if}

	<h2>Existing schools</h2>

	{#if data.schools.length === 0}
		<p>No schools yet.</p>
	{:else}
		<ul class="school-list">
			{#each data.schools as school (school.id)}
				<li>
					<div class="name">{school.name}</div>
					<div class="meta">{school.id}</div>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.schools-page {
		max-width: 48rem;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.warning {
		color: #9a3412;
		background: #ffedd5;
		border: 1px solid #fdba74;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}

	.school-form {
		display: grid;
		gap: 0.75rem;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		margin-bottom: 1.5rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
	}

	input {
		padding: 0.5rem 0.6rem;
		border: 1px solid #ccc;
		border-radius: 0.35rem;
	}

	button {
		width: fit-content;
		padding: 0.55rem 0.9rem;
		border: 1px solid #111;
		border-radius: 0.35rem;
		background: #111;
		color: #fff;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.school-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.75rem;
	}

	.school-list li {
		padding: 0.9rem;
		border: 1px solid #e5e5e5;
		border-radius: 0.5rem;
	}

	.name {
		font-weight: 600;
	}

	.meta {
		font-size: 0.85rem;
		color: #666;
		margin-top: 0.25rem;
		word-break: break-all;
	}
</style>
