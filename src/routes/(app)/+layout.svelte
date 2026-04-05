<script lang="ts">
	import { resolve } from '$app/paths';
	import { setActiveSchool } from './schools/schools.remote';
	let { children, data } = $props();
</script>

<nav>
	<ul>
		<li><a href={resolve('/dashboard')}>Dashboard</a></li>
		<li><a href={resolve('/students')}>Students</a></li>
		<li><a href={resolve('/schools')}>Schools</a></li>
	</ul>

	<select
		onchange={async (e) => {
			await setActiveSchool({ schoolId: (e.target as HTMLSelectElement).value });
			location.reload(); // simple but effective for now
		}}
	>
		{#each data.schools as school (school.id)}
			<option value={school.id} selected={school.id === data.schoolId}>
				{school.name}
			</option>
		{/each}
	</select>
</nav>
{@render children()}

<style>
	nav {
		background-color: #f8f8f8;
		padding: 1rem;
	}

	nav ul {
		list-style: none;
		display: flex;
		gap: 1rem;
		margin: 0;
		padding: 0;
	}

	nav a {
		text-decoration: none;
		color: #333;
		font-weight: bold;
	}

	nav a:hover {
		color: #0070f3;
	}
</style>
