<script lang="ts">
	import { resolve } from '$app/paths';
	import { getStudents } from './students.remote.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const schoolId = () => data.schoolId ?? '';

	const students = getStudents(schoolId());
</script>

<section class="students-page">
	<header class="card header">
		<div>
			<h1>Students</h1>
			<p class="school-id">Active school ID: {schoolId() || 'No school selected'}</p>
		</div>
		<a href={resolve('/students/add')} class="add-btn">Add Student</a>
	</header>

	<section class="card">
		<div class="section-head">
			<h2>Student list</h2>
			{#if students.current}
				<span>{students.current.length} total</span>
			{/if}
		</div>

		{#if students.loading && !students.ready}
			<p class="empty">Loading students...</p>
		{:else if students.error}
			<p class="warning">Could not load students for this school.</p>
		{:else if students.current && students.current.length === 0}
			<p class="empty">No students found for this school yet.</p>
		{:else}
			<ul class="student-list">
				{#each students.current as student (student.id)}
					<li>
						<h3>{student.name}</h3>
						<p><span>Parent</span> {student.parentName ?? 'N/A'}</p>
						<p><span>Email</span> {student.parentEmail ?? 'N/A'}</p>
						<p><span>Phone</span> {student.parentPhone ?? 'N/A'}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</section>

<style>
	.students-page {
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

	.add-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.58rem 0.9rem;
		border-radius: 8px;
		background: #4fc3f7;
		color: #0a0a0b;
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		transition:
			opacity 0.2s,
			transform 0.15s;
	}

	.add-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	h1,
	h2,
	h3 {
		font-weight: 600;
		margin: 0;
	}

	h1 {
		font-size: 1.5rem;
	}

	h2 {
		font-size: 1.1rem;
	}

	h3 {
		font-size: 1.05rem;
	}

	.school-id {
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

	.student-list {
		display: grid;
		gap: 0.75rem;
		list-style: none;
		padding: 0;
		margin: 0.9rem 0 0;
	}

	.student-list li {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 0.8rem;
		background: rgba(22, 22, 24, 0.9);
	}

	.student-list p {
		margin-top: 0.35rem;
		font-size: 14px;
		color: #acacac;
	}

	.student-list p span {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #7f7f7f;
		margin-right: 0.45rem;
	}

	.empty {
		margin-top: 0.9rem;
		color: #9b9b9b;
	}
</style>
