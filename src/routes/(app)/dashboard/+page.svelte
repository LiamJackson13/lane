<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<h1>Dashboard</h1>

<p>School ID: {data.schoolId ?? 'None selected'}</p>
