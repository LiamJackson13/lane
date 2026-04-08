<script lang="ts">
	import { resolve } from '$app/paths';
	import { setActiveSchool } from './schools/schools.remote';
	let { children, data } = $props();
</script>

<div>
	<header>
		<nav>
			<a href={resolve('/dashboard')}>Dashboard</a>
			<a href={resolve('/students')}>Students</a>
			<a href={resolve('/schools')}>Schools</a>
			<a href={resolve('/classes')}>Classes</a>
		</nav>

		<div>
			<label>Active school</label>
			<select
				id="school-picker"
				onchange={async (e) => {
					await setActiveSchool({ schoolId: (e.target as HTMLSelectElement).value });
					location.reload();
				}}
			>
				{#each data.schools as school (school.id)}
					<option value={school.id} selected={school.id === data.schoolId}>
						{school.name}
					</option>
				{/each}
			</select>
		</div>
	</header>

	<main>
		{@render children()}
	</main>
</div>
