<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';
	import { createClass, getClasses } from './classes.remote';

	let { data }: PageProps = $props();

	const schoolId = () => data.schoolId ?? '';
	const hasSchool = () => schoolId().length > 0;

	const createClassForm = createClass.enhance(async ({ submit }) => {
		await submit();
	});

	const classes = getClasses(schoolId());
</script>

<h1>Classes</h1>
<p>Manage your classes</p>

{#if !hasSchool()}
	<p>No active school selected. Choose a school from the top navigation before creating classes.</p>
	<a href={resolve('/schools')}>Go to schools</a>
{:else}
	<form {...createClassForm}>
		<input type="hidden" name="schoolId" value={schoolId()} />

		<label>
			<span>Class name</span>
			<input name="name" required placeholder="e.g. Learn to Swim Level 1" />
		</label>

		<label>
			<span>Instructor name</span>
			<input name="instructorName" required placeholder="e.g. Jordan Lee" />
		</label>

		<label>
			<span>Capacity</span>
			<input type="number" min="1" name="capacity" required placeholder="e.g. 12" />
		</label>

		<label>
			<span>Days (comma separated)</span>
			<input name="days" required placeholder="e.g. Monday, Wednesday, Friday" />
		</label>

		<label>
			<span>Start time</span>
			<input type="time" name="startTime" required />
		</label>

		<label>
			<span>End time</span>
			<input type="time" name="endTime" required />
		</label>

		<label>
			<span>Start date</span>
			<input type="date" name="startDate" required />
		</label>

		<label>
			<span>End date (optional)</span>
			<input type="date" name="endDate" />
		</label>

		<button type="submit" disabled={createClass.pending > 0}>
			{#if createClass.pending > 0}
				Creating...
			{:else}
				Create class
			{/if}
		</button>
	</form>
{/if}

{#each classes.current as schoolClass (schoolClass.id)}
	<a href={resolve(`/classes/${schoolClass.id}`)}>
		{schoolClass.name} | Instructor: {schoolClass.instructorName} | Capacity: {schoolClass.capacity}
	</a>
{/each}
