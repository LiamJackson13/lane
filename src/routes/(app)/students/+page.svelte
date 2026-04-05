<script lang="ts">
	import { createStudent, getStudents } from './students.remote.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const schoolId = $derived(data.schoolId ?? '');

	const students = getStudents(schoolId);

	const createStudentForm = createStudent.enhance(async ({ submit }) => {
		await submit().updates(students);
	});
</script>

<section class="students-page">
	<h1>Students</h1>
	<p class="school-id">School: {schoolId}</p>

	<form {...createStudentForm} class="student-form">
		<input type="hidden" name="schoolId" value={schoolId} />

		<label>
			Student name
			<input name="name" required />
		</label>

		<label>
			Parent name
			<input name="parentName" required />
		</label>

		<label>
			Parent email
			<input type="email" name="parentEmail" required />
		</label>

		<label>
			Parent phone
			<input name="parentPhone" required />
		</label>

		<button type="submit" disabled={createStudent.pending > 0}>
			{#if createStudent.pending > 0}
				Creating...
			{:else}
				Create student
			{/if}
		</button>
	</form>

	{#if students.loading && !students.ready}
		<p>Loading students...</p>
	{:else if students.error}
		<p>Could not load students.</p>
	{:else if students.current && students.current.length === 0}
		<p>No students found for this school yet.</p>
	{:else}
		<ul class="student-list">
			{#each students.current as student (student.id)}
				<li>
					<h2>{student.name}</h2>
					<p>Parent: {student.parentName ?? 'N/A'}</p>
					<p>Email: {student.parentEmail ?? 'N/A'}</p>
					<p>Phone: {student.parentPhone ?? 'N/A'}</p>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.students-page {
		max-width: 48rem;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.school-id {
		color: #666;
		margin-bottom: 1rem;
		word-break: break-all;
	}

	.student-form {
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

	.student-list {
		display: grid;
		gap: 0.75rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.student-list li {
		border: 1px solid #e5e5e5;
		border-radius: 0.5rem;
		padding: 0.9rem;
	}

	.student-list h2 {
		margin: 0 0 0.35rem 0;
		font-size: 1.05rem;
	}
</style>
