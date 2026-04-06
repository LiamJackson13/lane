<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const activeOrganizationId = () => data.organizationId ?? '';
</script>

<h1>Schools</h1>
<p>Organization ID: {activeOrganizationId() || 'None selected'}</p>

<h2>Existing schools</h2>
<span>{data.schools.length} total</span>

{#if data.schools.length === 0}
	<p>No schools yet.</p>
{:else}
	<ul>
		{#each data.schools as school (school.id)}
			<li>
				<div>{school.name}</div>
				<div>{school.id}</div>
			</li>
		{/each}
	</ul>
{/if}
