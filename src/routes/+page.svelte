<script lang="ts">
	import { resolve } from '$app/paths';

	const features = [
		{
			title: 'One operating system for every pool',
			description:
				'See students, schedules, staff, and attendance across locations without jumping between tools.'
		},
		{
			title: 'Fast roll marking and follow-up',
			description:
				'Instructors mark attendance in seconds, and managers instantly spot no-shows, trends, and class health.'
		},
		{
			title: 'Built for swim-school workflows',
			description:
				'Lane is shaped around learn-to-swim operations, not generic school software bent into place.'
		}
	] as const;

	const stats = [
		{ label: 'Admin time saved weekly', value: '8 hrs' },
		{ label: 'Attendance visibility', value: '100%' },
		{ label: 'Locations managed per org', value: '1 - 25+' },
		{ label: 'Onboarding time', value: '< 2 days' }
	] as const;

	const plans = [
		{
			name: 'Starter',
			price: '$159',
			detail: 'Great for one location getting organized.',
			cta: 'Start Starter',
			featured: false
		},
		{
			name: 'Growth',
			price: '$239',
			detail: 'Multi-location coordination with stronger reporting.',
			cta: 'Start Growth',
			featured: true
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			detail: 'Franchises and larger operators with custom needs.',
			cta: 'Contact Sales',
			featured: false
		}
	] as const;
</script>

<div class="relative flex min-h-screen flex-col items-center overflow-x-clip bg-bg text-fg">
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 -top-56 mx-auto h-136 w-136 rounded-full bg-primary/15 blur-3xl"
	></div>

	<header
		class="ui-shell relative z-10 flex flex-row items-center justify-between gap-4 py-6 text-center"
	>
		<a class="font-serif text-3xl tracking-tight" href={resolve('/')}>
			Lane<span class="text-primary">.</span>
		</a>

		<nav
			class="hidden items-center justify-center gap-6 text-sm text-text-secondary md:absolute md:left-1/2 md:flex md:-translate-x-1/2"
		>
			<a class="transition hover:text-fg" href="#features">Features</a>
			<a class="transition hover:text-fg" href="#stats">Outcomes</a>
			<a class="transition hover:text-fg" href="#pricing">Pricing</a>
		</nav>

		<div class="flex items-center gap-2">
			<a class="ui-btn-secondary hidden text-sm sm:inline-flex" href={resolve('/sign-in')}
				>Sign in</a
			>
			<a class="ui-btn-primary text-sm" href={resolve('/sign-up')}>Get Started</a>
		</div>
	</header>

	<main class="ui-shell relative z-10 flex flex-1 flex-col items-center pb-20 text-center">
		<section class="py-10 md:py-14">
			<div class="mx-auto flex max-w-3xl flex-col items-center">
				<p class="ui-kicker">Swim school admin, simplified</p>
				<h1
					class="mt-3 font-serif text-5xl leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-7xl"
				>
					Run every location from one place.
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
					Lane helps operators manage students, classes, staff, and attendance across all sites
					without the spreadsheet mess.
				</p>

				<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
					<a class="ui-btn-primary" href={resolve('/sign-up')}>Create your account</a>
					<a class="ui-btn-secondary" href={resolve('/sign-in')}>Book a demo</a>
				</div>

				<p class="mt-5 text-sm text-text-secondary">
					No credit card required. Invite your team when ready.
				</p>
			</div>
		</section>

		<section id="features" class="space-y-7 py-12 text-center md:py-16">
			<div class="mx-auto max-w-2xl">
				<p class="ui-kicker">Features</p>
				<h2 class="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
					Everything needed to run modern swim operations
				</h2>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature (feature.title)}
					<article class="ui-card h-full text-center">
						<h3 class="text-xl font-semibold text-fg">{feature.title}</h3>
						<p class="mt-3 leading-relaxed text-text-secondary">{feature.description}</p>
					</article>
				{/each}
			</div>
		</section>

		<section id="stats" class="py-10 text-center md:py-14">
			<div class="ui-card bg-primary text-primary-contrast">
				<p class="text-xs font-semibold tracking-[0.16em] text-primary-contrast/80 uppercase">
					Outcomes
				</p>
				<div class="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{#each stats as item (item.label)}
						<div>
							<p class="text-3xl font-semibold">{item.value}</p>
							<p class="mt-1 text-sm text-primary-contrast/80">{item.label}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<section id="pricing" class="space-y-7 py-12 text-center md:py-16">
			<div class="mx-auto max-w-2xl">
				<p class="ui-kicker">Pricing snapshot</p>
				<h2 class="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
					Simple per-location pricing
				</h2>
			</div>

			<div class="grid gap-4 lg:grid-cols-3">
				{#each plans as plan (plan.name)}
					<article
						class={`ui-card flex h-full flex-col items-center text-center ${plan.featured ? 'ring-2 ring-primary' : ''}`}
					>
						<p class="text-sm font-medium text-text-secondary">{plan.name}</p>
						<p class="mt-2 text-4xl font-semibold tracking-tight text-fg">{plan.price}</p>
						<p class="mt-3 grow leading-relaxed text-text-secondary">{plan.detail}</p>
						<a
							class={plan.featured ? 'ui-btn-primary mt-6' : 'ui-btn-secondary mt-6'}
							href={plan.name === 'Enterprise' ? 'mailto:hello@lane.app' : resolve('/sign-up')}
						>
							{plan.cta}
						</a>
					</article>
				{/each}
			</div>
		</section>
	</main>

	<footer class="w-full border-t border-border bg-surface/70">
		<div
			class="ui-shell flex flex-col items-center justify-center gap-4 py-8 text-center text-sm text-text-secondary"
		>
			<p>Lane. Swim-school operations software.</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<a class="transition hover:text-fg" href={resolve('/sign-up')}>Create account</a>
				<a class="transition hover:text-fg" href={resolve('/sign-in')}>Sign in</a>
				<a class="transition hover:text-fg" href="mailto:hello@lane.app">Contact</a>
			</div>
		</div>
	</footer>
</div>
