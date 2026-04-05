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

<section class="add-page">
	<header class="card header">
		<div>
			<h1>Add student</h1>
			<p class="subtle">Create a new student profile for the active school.</p>
		</div>
		<a class="inline-link" href={resolve('/students')}>Back to students</a>
	</header>

	<section class="card">
		<div class="section-head">
			<h2>Student details</h2>
			<span>Required fields</span>
		</div>

		{#if !hasSchool()}
			<p class="warning">
				No active school selected. Choose a school from the top navigation before creating students.
			</p>
			<a class="inline-link" href={resolve('/schools')}>Go to schools</a>
		{:else}
			<form {...createStudentForm} class="student-form">
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
	</section>
</section>

<style>
	.add-page {
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

	.subtle {
		margin-top: 0.35rem;
		font-size: 0.88rem;
		color: #9b9b9b;
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 0.85rem;
	}

	.section-head span {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #7f7f7f;
	}

	.warning {
		margin-top: 0.75rem;
		color: #fed7aa;
		background: rgba(234, 88, 12, 0.12);
		border: 1px solid rgba(251, 146, 60, 0.35);
		padding: 0.65rem;
		border-radius: 8px;
	}

	.student-form {
		display: grid;
		gap: 0.7rem;
		margin-top: 0.2rem;
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
		margin-top: 0.25rem;
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

	.inline-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.75rem;
		padding: 0.52rem 0.82rem;
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		border-radius: 8px;
		color: #4fc3f7;
		border: 1px solid rgba(79, 195, 247, 0.35);
		background: rgba(79, 195, 247, 0.08);
		transition: opacity 0.2s;
	}

	.inline-link:hover {
		opacity: 0.9;
	}
</style>
