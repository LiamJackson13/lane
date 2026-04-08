<script lang="ts">
	import type { PageProps } from './$types';
	import { getClassById } from '../classes.remote';
	let { params }: PageProps = $props();
	const schoolClass = $derived(await getClassById(params.id));
</script>

{#if schoolClass}
	<p>class detail page for {schoolClass.name}</p>
	<p>Capacity: {schoolClass.capacity}</p>
	<p>Instructor: {schoolClass.instructorName}</p>
	<p>Start Time: {schoolClass.startTime} | End Time: {schoolClass.endTime}</p>
{:else}
	<p>Loading...</p>
{/if}
