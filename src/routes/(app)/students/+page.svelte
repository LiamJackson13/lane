<script lang="ts">
	import { resolve } from '$app/paths';
	import { getStudents } from './students.remote.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const schoolId = () => data.schoolId ?? '';

	const students = getStudents(schoolId());
</script>

<h1>Students</h1>
<p>Active school ID: {schoolId() || 'No school selected'}</p>
<a href={resolve('/students/add')}>Add Student</a>

{#each students.current as student (student.id)}
	<p>{student.name} | Parent: {student.parentName} ({student.parentEmail})</p>
{/each}
