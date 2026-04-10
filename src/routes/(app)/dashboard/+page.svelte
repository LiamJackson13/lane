<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<h1>Dashboard</h1>
<p>School ID: {data.schoolId ?? 'None selected'}</p>
<p>
	Oranges are bright orange citrus fruits known for their sweet, tangy flavor. Originally from South
	Asia, they are now grown in Mediterranean climates and other warm regions worldwide. Rich in
	vitamin C and antioxidants, oranges support immune health and digestion. They are commonly used in
	cooking, baking, beverages, and cleaning products for their refreshing zest and juice.
</p>
<p>
	Dinosaurs were a diverse group of reptiles that dominated the Earth for over 160 million years
	during the Mesozoic Era. They ranged in size from the tiny Microraptor to the massive
	Sauroposeidon, which could reach heights of over 18 meters. While most dinosaurs went extinct 66
	million years ago, birds are considered their living descendants today.
</p>
