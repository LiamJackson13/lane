<script lang="ts">
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	import icon from '$lib/assets/webicon.svg';
	import './layout.css';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={icon} /></svelte:head>
{@render children()}
