<script lang="ts">
	import { resolve } from '$app/paths';
	import { createStudent, getStudents } from '../students.remote';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	const schoolId = () => data.schoolId ?? '';
	const hasSchool = () => schoolId().length > 0;
	const students = getStudents(schoolId());

	const createStudentForm = createStudent.enhance(async ({ submit }) => {
		await submit().updates(students);
		goto(resolve('/students'));
	});
</script>

<h1>Add student</h1>
<a href={resolve('/students')}>Back to students</a>

{#if !hasSchool()}
	<p>
		No active school selected. Choose a school from the top navigation before creating students.
	</p>
	<a href={resolve('/schools')}>Go to schools</a>
{:else}
	<form {...createStudentForm}>
		<input type="hidden" name="schoolId" value={schoolId()} />

		<label>
			<span>Student name</span>
			<input name="name" required placeholder="e.g. Maya Chen" />
		</label>

		<label>
			<span>Parent name</span>
			<input name="parentName" required placeholder="e.g. Alex Chen" />
		</label>

		<label>
			<span>Parent email</span>
			<input type="email" name="parentEmail" required placeholder="parent@email.com" />
		</label>

		<label>
			<span>Parent phone</span>
			<input name="parentPhone" required placeholder="0400 000 000" />
		</label>

		<button type="submit" disabled={createStudent.pending > 0}>
			{#if createStudent.pending > 0}
				Creating...
			{:else}
				Create student
			{/if}
		</button>
	</form>
{/if}
