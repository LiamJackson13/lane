<script lang="ts">
	import { resolve } from '$app/paths';
	import { setActiveSchool } from './schools/schools.remote';
	let { children, data } = $props();
</script>

<div class="app-shell">
	<div class="app-bg">
		<div class="app-grid"></div>
		<div class="app-orb orb-a"></div>
		<div class="app-orb orb-b"></div>
	</div>

	<header class="app-nav">
		<a class="brand" href={resolve('/dashboard')}>Lane<span>.</span></a>

		<nav class="app-links">
			<a href={resolve('/dashboard')}>Dashboard</a>
			<a href={resolve('/students')}>Students</a>
			<a href={resolve('/schools')}>Schools</a>
			<a href={resolve('/classes')}>Classes</a>
		</nav>

		<div class="app-controls">
			<label class="school-label" for="school-picker">Active school</label>
			<select
				id="school-picker"
				onchange={async (e) => {
					await setActiveSchool({ schoolId: (e.target as HTMLSelectElement).value });
					location.reload();
				}}
			>
				{#each data.schools as school (school.id)}
					<option value={school.id} selected={school.id === data.schoolId}>
						{school.name}
					</option>
				{/each}
			</select>
		</div>
	</header>

	<main class="app-main">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		background: #0a0a0b;
		color: #f0efe8;
		font-family: 'DM Sans', system-ui, sans-serif;
	}

	.app-shell {
		min-height: 100dvh;
		position: relative;
		overflow: hidden;
	}

	.app-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.app-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
		background-size: 56px 56px;
		mask-image: radial-gradient(ellipse 85% 68% at 50% 0%, black 0%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 85% 68% at 50% 0%, black 0%, transparent 100%);
	}

	.app-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		opacity: 0.14;
	}

	.orb-a {
		width: 400px;
		height: 400px;
		top: -180px;
		left: -80px;
		background: #4fc3f7;
	}

	.orb-b {
		width: 320px;
		height: 320px;
		top: 40px;
		right: -90px;
		background: #7c6af7;
	}

	.app-nav {
		position: sticky;
		top: 0;
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
		padding: 0 1.5rem;
		background: rgba(10, 10, 11, 0.84);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.brand {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 25px;
		letter-spacing: -0.02em;
		text-decoration: none;
		color: #f0efe8;
	}

	.brand span {
		color: #4fc3f7;
	}

	.app-links {
		display: flex;
		gap: 1rem;
	}

	.app-links a {
		font-size: 13px;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		text-decoration: none;
		color: #8a8a8a;
		padding: 0.35rem 0.6rem;
		border-radius: 7px;
		transition:
			color 0.2s,
			background 0.2s;
	}

	.app-links a:hover {
		color: #f0efe8;
		background: rgba(255, 255, 255, 0.05);
	}

	.app-controls {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.school-label {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #777;
	}

	select {
		background: #161618;
		color: #f0efe8;
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 8px;
		padding: 0.4rem 0.6rem;
		font-size: 13px;
	}

	.app-main {
		position: relative;
		z-index: 2;
		max-width: 1120px;
		margin: 0 auto;
		padding: 2rem 1.5rem 3rem;
	}

	@media (max-width: 760px) {
		.app-nav {
			flex-wrap: wrap;
			height: auto;
			padding: 0.8rem 1rem;
			gap: 0.7rem;
		}

		.app-links {
			order: 3;
			width: 100%;
			overflow-x: auto;
			padding-bottom: 0.15rem;
		}

		.school-label {
			display: none;
		}
	}
</style>
