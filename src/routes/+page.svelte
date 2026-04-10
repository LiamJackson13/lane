<script lang="ts">
	import { resolve } from '$app/paths';

	const features = [
		{
			title: 'Enrollment & Waitlists',
			description:
				'Capture inquiries, convert prospects quickly, and move families into classes with fewer front-desk handoffs.'
		},
		{
			title: 'Scheduling & Classes',
			description:
				'Standardize lesson structures, instructor assignments, and progression levels across every location.'
		},
		{
			title: 'Billing & Autopay',
			description:
				'Automate tuition, track failed charges, and recover revenue with clear workflows for your staff.'
		},
		{
			title: 'Deck Attendance',
			description:
				'Instructors take roll in seconds while managers monitor no-shows, makeup demand, and class consistency.'
		},
		{
			title: 'Family Communication',
			description:
				'Coordinate onboarding, progress touchpoints, and account notices from one parent-ready timeline.'
		},
		{
			title: 'Multi-location Reporting',
			description:
				'Get one operating view of utilization, retention risk, staffing needs, and school-level performance.'
		}
	];

	const plans = [
		{
			name: 'Professional',
			price: '$299',
			description: 'For single-location teams ready to move beyond spreadsheets.',
			features: [
				'Enrollment & waitlists',
				'Billing & autopay',
				'Attendance & classes',
				'Family communication'
			]
		},
		{
			name: 'Performance',
			price: '$549',
			description: 'For operators managing multiple schools with stronger controls.',
			features: [
				'Everything in Professional',
				'Multi-location dashboards',
				'Retention risk alerts',
				'Advanced staffing insights'
			],
			featured: true
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			description: 'For franchises and organizations with governance needs.',
			features: [
				'Everything in Performance',
				'Custom implementation',
				'Priority support',
				'Executive reviews'
			]
		}
	];
</script>

<svelte:head>
	<title>Lane — Swim School Operations Platform</title>
	<meta
		name="description"
		content="Lane helps swim businesses run enrollment, scheduling, attendance, billing, and reporting from one system."
	/>
</svelte:head>

<div class="min-h-screen bg-bg">
	<header class="fixed top-0 right-0 left-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
		<div class="ui-shell flex h-16 items-center justify-between">
			<a class="font-serif text-2xl tracking-tight" href={resolve('/')}> Lane </a>

			<nav class="hidden items-center gap-8 text-sm md:flex">
				<a class="text-text-secondary transition-colors hover:text-fg" href="#features">Features</a>
				<a class="text-text-secondary transition-colors hover:text-fg" href="#pricing">Pricing</a>
			</nav>

			<div class="flex items-center gap-3">
				<a
					class="text-sm text-text-secondary transition-colors hover:text-fg"
					href={resolve('/sign-in')}
				>
					Sign in
				</a>
				<a class="ui-btn-primary" href={resolve('/sign-up')}>Start free trial</a>
			</div>
		</div>
	</header>

	<main>
		<section class="ui-section pt-32">
			<div class="ui-shell">
				<div class="mx-auto max-w-3xl text-center">
					<p class="ui-kicker">Swim School Operations</p>
					<h1 class="mt-4 font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
						One platform to run your swim school
					</h1>
					<p class="mt-6 text-lg text-text-secondary md:text-xl">
						Enrollment, scheduling, attendance, billing, and reporting — finally in one place.
					</p>
					<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a class="ui-btn-primary px-8 py-3" href={resolve('/sign-up')}>Start free trial</a>
						<a class="ui-btn-secondary px-8 py-3" href={resolve('/sign-in')}>Book a demo</a>
					</div>
				</div>
			</div>
		</section>

		<section class="ui-section">
			<div class="ui-shell">
				<div class="ui-card relative overflow-hidden rounded-3xl">
					<div class="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200"></div>
					<div class="absolute inset-0 flex items-center justify-center text-text-tertiary">
						Dashboard preview
					</div>
				</div>
			</div>
		</section>

		<section id="features" class="ui-section">
			<div class="ui-shell">
				<div class="mx-auto max-w-2xl text-center">
					<p class="ui-kicker">Features</p>
					<h2 class="mt-4 font-serif text-3xl tracking-tight md:text-4xl">
						Everything you need to operate and scale
					</h2>
				</div>

				<div class="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each features as feature}
						<article class="ui-card-hover">
							<h3 class="text-lg font-semibold">{feature.title}</h3>
							<p class="mt-3 leading-relaxed text-text-secondary">{feature.description}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="pricing" class="ui-section">
			<div class="ui-shell">
				<div class="mx-auto max-w-2xl text-center">
					<p class="ui-kicker">Pricing</p>
					<h2 class="mt-4 font-serif text-3xl tracking-tight md:text-4xl">
						Simple, transparent pricing
					</h2>
					<p class="mt-4 text-text-secondary">Per location, billed monthly.</p>
				</div>

				<div class="mt-16 grid gap-6 lg:grid-cols-3">
					{#each plans as plan}
						<article class={`ui-card flex flex-col ${plan.featured ? 'ring-2 ring-primary' : ''}`}>
							<div class="flex-1">
								<p class="text-sm font-medium text-text-secondary">{plan.name}</p>
								<p class="mt-2 text-4xl font-semibold tracking-tight">
									{plan.price === 'Custom' ? plan.price : `From ${plan.price}`}
								</p>
								<p class="mt-3 text-text-secondary">{plan.description}</p>

								<ul class="mt-6 space-y-3">
									{#each plan.features as feature}
										<li class="flex items-center gap-3 text-sm">
											<svg
												class="h-4 w-4 shrink-0 text-primary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												/>
											</svg>
											{feature}
										</li>
									{/each}
								</ul>
							</div>

							<a
								class={`mt-8 ${plan.featured ? 'ui-btn-primary' : 'ui-btn-secondary'}`}
								href={plan.price === 'Custom' ? 'mailto:hello@lane.app' : resolve('/sign-up')}
							>
								{plan.price === 'Custom' ? 'Contact sales' : 'Start free trial'}
							</a>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="ui-section">
			<div class="ui-shell">
				<div class="ui-card text-center">
					<h2 class="font-serif text-2xl tracking-tight md:text-3xl">
						Ready to streamline your swim school?
					</h2>
					<p class="mt-4 text-text-secondary">Join hundreds of swim schools running on Lane.</p>
					<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a class="ui-btn-primary px-8 py-3" href={resolve('/sign-up')}>Start free trial</a>
						<a class="ui-btn-secondary px-8 py-3" href={resolve('/sign-in')}>Talk to sales</a>
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer class="border-t border-border">
		<div
			class="ui-shell flex flex-col items-center justify-between gap-4 py-8 text-sm text-text-secondary md:flex-row"
		>
			<p>Lane — Swim school operations software</p>
			<div class="flex items-center gap-6">
				<a class="transition-colors hover:text-fg" href={resolve('/sign-up')}>Start free trial</a>
				<a class="transition-colors hover:text-fg" href={resolve('/sign-in')}>Sign in</a>
				<a class="transition-colors hover:text-fg" href="mailto:hello@lane.app">Contact</a>
			</div>
		</div>
	</footer>
</div>
