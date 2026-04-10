<script lang="ts">
	import { resolve } from '$app/paths';
	import { setActiveSchool } from './schools/schools.remote';
	let { children, data } = $props();
</script>

<div class="min-h-screen bg-bg">
	<header class="border-b border-border bg-surface">
		<div class="ui-shell flex h-14 items-center justify-between">
			<nav class="flex items-center gap-1">
				<a
					href={resolve('/dashboard')}
					class="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-fg"
					>Dashboard</a
				>
				<a
					href={resolve('/students')}
					class="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-fg"
					>Students</a
				>
				<a
					href={resolve('/classes')}
					class="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-fg"
					>Classes</a
				>
				<a
					href={resolve('/schools')}
					class="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-fg"
					>Schools</a
				>
			</nav>

			<div class="flex items-center gap-3">
				<label for="school-picker" class="sr-only">School</label>
				<select
					id="school-picker"
					class="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-focus focus:outline-none"
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
		</div>
	</header>

	<main class="ui-shell py-8">
		{@render children()}
	</main>
</div>
