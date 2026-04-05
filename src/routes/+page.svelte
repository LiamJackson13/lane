<script>
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	function handleDemoRequest() {
		const input = document.querySelector('.waitlist-input');
		const btn = document.querySelector('.cta-section .btn-primary');

		if (!(input instanceof HTMLInputElement) || !(btn instanceof HTMLButtonElement)) {
			return;
		}

		if (input.value && input.value.includes('@')) {
			btn.textContent = 'Demo requested ✓';
			btn.style.background = '#4ade80';
			input.disabled = true;
			btn.disabled = true;
		} else {
			input.style.borderColor = 'rgba(255,100,100,0.5)';
			setTimeout(() => (input.style.borderColor = ''), 1200);
		}
	}

	onMount(() => {
		const reveals = document.querySelectorAll('.reveal');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		reveals.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});

	/** @param {'monthly' | 'annual'} period */
	function setToggle(period) {
		document.querySelectorAll('.toggle-btn').forEach((b) => b.classList.remove('active'));

		const activeBtn = document.querySelector(`.toggle-btn[data-period="${period}"]`);
		if (activeBtn instanceof HTMLButtonElement) {
			activeBtn.classList.add('active');
		}

		document.querySelectorAll('.price-amount[data-monthly]').forEach((el) => {
			if (el instanceof HTMLElement) {
				el.textContent = el.dataset[period] ?? '';
			}
		});
	}
</script>

<nav>
	<a href={resolve('/')} class="nav-logo">Lane<span>.</span></a>
	<ul class="nav-links">
		<li><a href="#features">Features</a></li>
		<li><a href="#locations">Multi-location</a></li>
		<li><a href="#pricing">Pricing</a></li>
		<li><a href="#demo" class="nav-cta">Book a demo</a></li>
	</ul>
</nav>

<div class="hero">
	<div class="hero-bg">
		<div class="hero-grid"></div>
		<div class="hero-orb orb-1"></div>
		<div class="hero-orb orb-2"></div>
	</div>

	<div class="hero-badge">
		<div class="badge-dot"></div>
		Now accepting early access
	</div>

	<h1>The admin platform<br /><em>swim schools</em> deserve</h1>
	<p>
		Manage students, classes, and attendance across every location — in one clean, unified platform
		built specifically for aquatics.
	</p>

	<div class="hero-actions">
		<a href="#demo" class="btn-primary">
			Book a demo
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none"
				><path
					d="M2 7h10M7 2l5 5-5 5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			>
		</a>
		<a href="#features" class="btn-ghost">See how it works</a>
	</div>

	<p class="hero-sub">
		No credit card required &nbsp;·&nbsp; 14 day free trial during early access
	</p>
</div>

<div class="preview-section reveal">
	<div class="cost-panel">
		<h2 class="cost-title">This is what your current system is costing you.</h2>

		<div class="compare-grid">
			<article class="compare-col compare-now">
				<h3>What it feels like now</h3>
				<ul>
					<li>Payments slip through and revenue is lost.</li>
					<li>Hours disappear into manual admin.</li>
					<li>Parents chase updates and get frustrated.</li>
					<li>Growth stalls because operations are overloaded.</li>
				</ul>
			</article>

			<article class="compare-col compare-lane">
				<h3>What it feels like with Lane</h3>
				<ul>
					<li>Payments and enrolments stay on track.</li>
					<li>Admin is automated and your week opens up.</li>
					<li>Parents get clear, timely communication.</li>
					<li>You can scale locations without chaos.</li>
				</ul>
			</article>
		</div>

		<p class="cost-killer">Most swim schools do not fail on coaching. They fail on operations.</p>
	</div>
</div>

<section id="features">
	<span class="section-label reveal">Everything you need</span>
	<h2 class="section-title reveal">Built for the <em>full picture</em> of running a swim school</h2>
	<p class="section-desc reveal">
		No more spreadsheets, disconnected apps, or manual roll calls. Lane brings every operational
		piece into one place.
	</p>

	<div class="features-grid reveal">
		<div class="feature-card">
			<div class="feature-icon">🏊</div>
			<div class="feature-title">Student management</div>
			<div class="feature-desc">
				Full student profiles with enrolment history, skill progression, medical notes, and parent
				contacts — all in one place.
			</div>
		</div>
		<div class="feature-card">
			<div class="feature-icon">📅</div>
			<div class="feature-title">Class scheduling</div>
			<div class="feature-desc">
				Build class timetables visually. Assign instructors, set capacities, and handle recurring
				sessions with ease.
			</div>
		</div>
		<div class="feature-card">
			<div class="feature-icon">✅</div>
			<div class="feature-title">Attendance tracking</div>
			<div class="feature-desc">
				Mark rolls in seconds. Track patterns over time, flag absences automatically, and generate
				reports for any period.
			</div>
		</div>
		<div class="feature-card">
			<div class="feature-icon">🏢</div>
			<div class="feature-title">Multi-location</div>
			<div class="feature-desc">
				Manage every pool under one login. Unified dashboards, per-location views, and
				cross-location reporting.
			</div>
		</div>
		<div class="feature-card">
			<div class="feature-icon">📊</div>
			<div class="feature-title">Insights & reporting</div>
			<div class="feature-desc">
				Understand your business at a glance. Enrolment trends, attendance rates, class utilisation
				— all exportable.
			</div>
		</div>
		<div class="feature-card">
			<div class="feature-icon">👥</div>
			<div class="feature-title">Team access controls</div>
			<div class="feature-desc">
				Give staff the right level of access. Instructors see their classes; managers see everything
				across locations.
			</div>
		</div>
	</div>
</section>
<section id="locations">
	<div class="locations-split">
		<div>
			<span class="section-label reveal">Multi-location</span>
			<h2 class="section-title reveal">One login for <em>every pool</em> you operate</h2>
			<p class="section-desc reveal">
				Whether you run one pool or fifteen, Lane gives you a unified view. Switch between locations
				instantly, or see everything at once from the top-level dashboard.
			</p>
		</div>
		<div class="location-cards reveal">
			<div class="location-card selected">
				<div class="loc-info">
					<span class="loc-name">Northside Aquatic Centre</span>
					<span class="loc-meta">48 students &nbsp;&middot;&nbsp; 6 classes today</span>
				</div>
				<span class="loc-badge loc-badge-green">Active</span>
			</div>
			<div class="location-card">
				<div class="loc-info">
					<span class="loc-name">City Centre Pool</span>
					<span class="loc-meta">61 students &nbsp;&middot;&nbsp; 8 classes today</span>
				</div>
				<span class="loc-badge loc-badge-green">Active</span>
			</div>
			<div class="location-card">
				<div class="loc-info">
					<span class="loc-name">Southbank Learn-to-Swim</span>
					<span class="loc-meta">39 students &nbsp;&middot;&nbsp; 4 classes today</span>
				</div>
				<span class="loc-badge loc-badge-blue">3 trials</span>
			</div>
			<div class="location-card">
				<div class="loc-info">
					<span class="loc-name">Riverside Swim Academy</span>
					<span class="loc-meta">Coming soon</span>
				</div>
				<span class="loc-badge" style="background:rgba(255,255,255,0.05);color:#555">Setup</span>
			</div>
		</div>
	</div>
</section>

<div class="proof-section reveal">
	<div class="proof-strip">
		<div class="proof-stat">
			<span class="proof-number">20+</span>
			<span class="proof-label">Schools on waitlist</span>
		</div>
		<div class="proof-divider"></div>
		<div class="proof-stat">
			<span class="proof-number">12</span>
			<span class="proof-label">Schools in early access</span>
		</div>
		<div class="proof-divider"></div>
		<div class="proof-stat">
			<span class="proof-number">2</span>
			<span class="proof-label">Locations per school avg.</span>
		</div>
		<div class="proof-divider"></div>
		<div class="proof-stat">
			<span class="proof-number">100%</span>
			<span class="proof-label">Built for aquatics</span>
		</div>
	</div>
</div>

<section class="pricing-section" id="pricing">
	<span class="section-label reveal">Pricing</span>
	<h2 class="section-title reveal" style="margin: 0 auto 1rem; text-align:center; max-width:100%;">
		Simple, <em>per-location</em> pricing
	</h2>
	<p class="section-desc reveal" style="margin: 0 auto 2.5rem; text-align:center; max-width:480px;">
		Pay for what you run. Add locations as you grow - no per-seat fees, no hidden costs.
	</p>

	<div class="pricing-toggle reveal">
		<button class="toggle-btn active" data-period="monthly" onclick={() => setToggle('monthly')}>
			Monthly
		</button>
		<button class="toggle-btn" data-period="annual" onclick={() => setToggle('annual')}>
			Annual <span class="toggle-save">Save 20%</span>
		</button>
	</div>

	<div class="pricing-grid reveal">
		<!-- STARTER -->
		<div class="pricing-card">
			<div class="pricing-empty-badge"></div>
			<div class="pricing-tier">Starter</div>
			<div class="pricing-price">
				<span class="price-currency">$</span>
				<span class="price-amount" data-monthly="99" data-annual="79">99</span>
				<span class="price-period">/ location / mo</span>
			</div>
			<p class="pricing-desc">Perfect for single-location swim schools getting started.</p>
			<div class="pricing-divider"></div>
			<ul class="pricing-features">
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					1 location
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Up to 100 students
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Class scheduling & attendance
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Student profiles & enrolment
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Up to 3 staff accounts
				</li>
				<li class="pricing-feature">
					<svg class="feature-check feature-check-muted" viewBox="0 0 16 16" fill="none"
						><path
							d="M4 4l8 8M12 4l-8 8"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/></svg
					>
					<span style="color:var(--text-muted)">Advanced reporting</span>
				</li>
				<li class="pricing-feature">
					<svg class="feature-check feature-check-muted" viewBox="0 0 16 16" fill="none"
						><path
							d="M4 4l8 8M12 4l-8 8"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/></svg
					>
					<span style="color:var(--text-muted)">Multi-location dashboard</span>
				</li>
			</ul>
			<a href="#demo" class="pricing-cta pricing-cta-outline">Book a demo</a>
		</div>

		<!-- GROWTH (featured) -->
		<div class="pricing-card featured">
			<div class="pricing-popular">
				<svg width="8" height="8" viewBox="0 0 8 8"
					><circle cx="4" cy="4" r="3" fill="currentColor" /></svg
				>
				Most popular
			</div>
			<div class="pricing-tier">Growth</div>
			<div class="pricing-price">
				<span class="price-currency">$</span>
				<span class="price-amount" data-monthly="159" data-annual="127">159</span>
				<span class="price-period">/ location / mo</span>
			</div>
			<p class="pricing-desc">For growing schools managing multiple pools and larger teams.</p>
			<div class="pricing-divider"></div>
			<ul class="pricing-features">
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Up to 5 locations
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Unlimited students
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Class scheduling & attendance
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Student profiles & enrolment
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Up to 15 staff accounts
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Advanced reporting & exports
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Multi-location dashboard
				</li>
			</ul>
			<a href="#demo" class="pricing-cta pricing-cta-filled">Book a demo</a>
		</div>

		<!-- ENTERPRISE -->
		<div class="pricing-card">
			<div class="pricing-empty-badge"></div>
			<div class="pricing-tier">Enterprise</div>
			<div class="pricing-price">
				<span class="price-amount" style="font-size:36px; line-height:1.2;">Custom</span>
			</div>
			<p class="pricing-desc">For large operators and franchises running 6+ locations.</p>
			<div class="pricing-divider"></div>
			<ul class="pricing-features">
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Unlimited locations
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Unlimited students
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Everything in Growth
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Unlimited staff accounts
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Dedicated onboarding & support
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Custom integrations & API access
				</li>
				<li class="pricing-feature">
					<svg class="feature-check" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8l3.5 3.5L13 4.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					SLA & priority support
				</li>
			</ul>
			<a href="mailto:hello@lane.app" class="pricing-cta pricing-cta-outline">Talk to us</a>
		</div>
	</div>
	<p class="pricing-note reveal">All plans include a 14-day free trial. No credit card required.</p>
</section>

<div class="cta-section" id="demo">
	<div class="cta-glow"></div>
	<h2 class="reveal">Book a demo<br />with <em>Lane</em></h2>
	<p class="reveal">
		See how Lane fits your swim school in a short walkthrough. No commitment, no credit card.
	</p>
	<div class="waitlist-form reveal">
		<input type="email" class="waitlist-input" placeholder="your@swimschool.com" />
		<button class="btn-primary" onclick={handleDemoRequest}>
			Book a demo
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none"
				><path
					d="M2 7h10M7 2l5 5-5 5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			>
		</button>
	</div>
	<p class="cta-fine reveal">We'll reach out personally to schedule your demo.</p>
</div>

<footer>
	<span class="footer-logo">Lane<span>.</span></span>
	<span class="footer-copy">&copy; 2026 Lane. All rights reserved.</span>
</footer>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:root {
		--bg: #0a0a0b;
		--bg-surface: #111113;
		--bg-card: #161618;
		--bg-card-hover: #1c1c1f;
		--border: rgba(255, 255, 255, 0.07);
		--border-hover: rgba(255, 255, 255, 0.14);
		--text-primary: #f0efe8;
		--text-secondary: #8a8a8a;
		--text-muted: #555;
		--accent: #4fc3f7;
		--accent-dim: rgba(79, 195, 247, 0.12);
		--accent-glow: rgba(79, 195, 247, 0.25);
		--font-display: 'Instrument Serif', Georgia, serif;
		--font-body: 'DM Sans', system-ui, sans-serif;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		background: var(--bg);
		color: var(--text-primary);
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		overflow-x: hidden;
	}

	/* NAV */
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 0 2rem;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(10, 10, 11, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}

	.nav-logo {
		font-family: var(--font-display);
		font-size: 22px;
		color: var(--text-primary);
		letter-spacing: -0.02em;
		text-decoration: none;
	}

	.nav-logo span {
		color: var(--accent);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
		list-style: none;
	}

	.nav-links a {
		font-size: 13px;
		color: var(--text-secondary);
		text-decoration: none;
		letter-spacing: 0.01em;
		transition: color 0.2s;
	}

	.nav-links a:hover {
		color: var(--text-primary);
	}

	.nav-cta {
		background: var(--accent);
		color: #0a0a0b !important;
		padding: 7px 16px;
		border-radius: 6px;
		font-weight: 500;
		font-size: 13px !important;
		transition: opacity 0.2s !important;
	}

	.nav-cta:hover {
		opacity: 0.88;
	}

	/* HERO */
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 6rem 2rem 4rem;
		position: relative;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.hero-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.18;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		top: -200px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--accent);
		animation: orb-drift 12s ease-in-out infinite alternate;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		bottom: 0;
		right: 10%;
		background: #7c6af7;
		opacity: 0.1;
		animation: orb-drift 16s ease-in-out infinite alternate-reverse;
	}

	@keyframes orb-drift {
		from {
			transform: translateX(-50%) translateY(0);
		}
		to {
			transform: translateX(-50%) translateY(40px);
		}
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: var(--accent-dim);
		border: 1px solid rgba(79, 195, 247, 0.2);
		color: var(--accent);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 5px 14px;
		border-radius: 100px;
		margin-bottom: 2rem;
		animation: fade-up 0.6s ease both;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	.hero h1 {
		font-family: var(--font-display);
		font-size: clamp(42px, 7vw, 80px);
		font-weight: 400;
		line-height: 1.08;
		letter-spacing: -0.03em;
		max-width: 820px;
		margin-bottom: 1.5rem;
		animation: fade-up 0.6s 0.1s ease both;
		color: var(--text-primary);
	}

	.hero h1 em {
		font-style: italic;
		color: var(--accent);
	}

	.hero p {
		font-size: clamp(16px, 2vw, 19px);
		color: var(--text-secondary);
		max-width: 520px;
		line-height: 1.7;
		margin-bottom: 2.5rem;
		font-weight: 300;
		animation: fade-up 0.6s 0.2s ease both;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		animation: fade-up 0.6s 0.3s ease both;
	}

	.btn-primary {
		background: var(--accent);
		color: #0a0a0b;
		border: none;
		padding: 13px 28px;
		border-radius: 8px;
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 500;
		cursor: pointer;
		transition:
			opacity 0.2s,
			transform 0.15s;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.btn-primary:hover {
		opacity: 0.88;
		transform: translateY(-1px);
	}

	.btn-ghost {
		background: transparent;
		color: var(--text-secondary);
		border: 1px solid var(--border-hover);
		padding: 12px 24px;
		border-radius: 8px;
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 400;
		cursor: pointer;
		transition:
			border-color 0.2s,
			color 0.2s,
			transform 0.15s;
		text-decoration: none;
	}

	.btn-ghost:hover {
		border-color: rgba(255, 255, 255, 0.25);
		color: var(--text-primary);
		transform: translateY(-1px);
	}

	.hero-sub {
		margin-top: 3rem;
		font-size: 12px;
		color: var(--text-muted);
		animation: fade-up 0.6s 0.4s ease both;
	}

	/* COST SECTION */
	.preview-section {
		padding: 0 2rem 6rem;
		display: flex;
		justify-content: center;
	}

	.cost-panel {
		width: 100%;
		max-width: 940px;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: clamp(1.5rem, 4vw, 3rem);
		box-shadow:
			0 0 80px rgba(79, 195, 247, 0.06),
			0 40px 80px rgba(0, 0, 0, 0.45);
	}

	.cost-title {
		font-family: var(--font-display);
		font-size: clamp(30px, 4vw, 48px);
		font-weight: 400;
		line-height: 1.1;
		letter-spacing: -0.02em;
		max-width: 780px;
		margin-bottom: 1.25rem;
	}

	.compare-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		margin-bottom: 1.5rem;
	}

	.compare-col {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1rem;
		color: var(--text-primary);
	}

	.compare-col h3 {
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.85rem;
		font-weight: 600;
	}

	.compare-col ul {
		list-style: none;
		display: grid;
		gap: 0.7rem;
	}

	.compare-col li {
		font-size: 14px;
		line-height: 1.45;
		color: var(--text-secondary);
		padding-left: 0.8rem;
		border-left: 2px solid var(--border);
	}

	.compare-now h3 {
		color: #fca5a5;
	}

	.compare-lane h3 {
		color: #4ade80;
	}

	.cost-killer {
		font-family: var(--font-display);
		font-size: clamp(22px, 2.6vw, 30px);
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: var(--text-primary);
		margin-top: 0.25rem;
		max-width: 760px;
	}

	/* SECTIONS */
	section {
		padding: 6rem 2rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.section-label {
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
		display: block;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: clamp(30px, 4vw, 48px);
		font-weight: 400;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: var(--text-primary);
		margin-bottom: 1rem;
		max-width: 600px;
	}

	.section-title em {
		font-style: italic;
		color: var(--accent);
	}

	.section-desc {
		font-size: 16px;
		color: var(--text-secondary);
		max-width: 480px;
		line-height: 1.7;
		font-weight: 300;
		margin-bottom: 3rem;
	}

	/* FEATURES GRID */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
	}

	.feature-card {
		background: var(--bg-card);
		padding: 2rem;
		transition: background 0.2s;
	}

	.feature-card:hover {
		background: var(--bg-card-hover);
	}

	.feature-icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: var(--accent-dim);
		border: 1px solid rgba(79, 195, 247, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
		font-size: 18px;
	}

	.feature-title {
		font-size: 15px;
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.feature-desc {
		font-size: 14px;
		color: var(--text-secondary);
		line-height: 1.65;
		font-weight: 300;
	}

	/* LOCATIONS SECTION */
	.locations-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.location-cards {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.location-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 16px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition:
			border-color 0.2s,
			transform 0.2s;
		cursor: default;
	}

	.location-card:hover {
		border-color: var(--border-hover);
		transform: translateX(4px);
	}

	.location-card.selected {
		border-color: rgba(79, 195, 247, 0.35);
		background: var(--accent-dim);
	}

	.loc-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.loc-name {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-primary);
	}
	.loc-meta {
		font-size: 12px;
		color: var(--text-muted);
	}

	.loc-badge {
		font-size: 11px;
		font-weight: 500;
		padding: 3px 10px;
		border-radius: 100px;
	}

	.loc-badge-green {
		background: rgba(74, 222, 128, 0.1);
		color: #4ade80;
	}
	.loc-badge-blue {
		background: var(--accent-dim);
		color: var(--accent);
	}

	/* SOCIAL PROOF */
	.proof-section {
		text-align: center;
		padding: 5rem 2rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.proof-strip {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
		padding: 2rem 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		margin: 2rem 0;
	}

	.proof-stat {
		text-align: center;
	}

	.proof-number {
		font-family: var(--font-display);
		font-size: 36px;
		font-weight: 400;
		color: var(--text-primary);
		display: block;
	}

	.proof-label {
		font-size: 13px;
		color: var(--text-muted);
	}

	.proof-divider {
		width: 1px;
		height: 40px;
		background: var(--border);
	}

	/* CTA SECTION */
	.cta-section {
		padding: 6rem 2rem;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.cta-glow {
		position: absolute;
		width: 600px;
		height: 300px;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background: radial-gradient(ellipse, rgba(79, 195, 247, 0.08) 0%, transparent 70%);
		pointer-events: none;
	}

	.cta-section h2 {
		font-family: var(--font-display);
		font-size: clamp(32px, 5vw, 58px);
		font-weight: 400;
		letter-spacing: -0.025em;
		color: var(--text-primary);
		margin-bottom: 1.25rem;
		line-height: 1.1;
	}

	.cta-section h2 em {
		font-style: italic;
		color: var(--accent);
	}

	.cta-section p {
		color: var(--text-secondary);
		font-size: 17px;
		font-weight: 300;
		max-width: 400px;
		margin: 0 auto 2.5rem;
		line-height: 1.7;
	}

	.waitlist-form {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.waitlist-input {
		background: var(--bg-card);
		border: 1px solid var(--border-hover);
		border-radius: 8px;
		padding: 12px 18px;
		font-family: var(--font-body);
		font-size: 15px;
		color: var(--text-primary);
		width: 280px;
		outline: none;
		transition: border-color 0.2s;
	}

	.waitlist-input::placeholder {
		color: var(--text-muted);
	}
	.waitlist-input:focus {
		border-color: rgba(79, 195, 247, 0.5);
	}

	.cta-fine {
		font-size: 12px;
		color: var(--text-muted);
		margin-top: 1rem;
	}

	/* FOOTER */
	footer {
		border-top: 1px solid var(--border);
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1100px;
		margin: 0 auto;
	}

	.footer-logo {
		font-family: var(--font-display);
		font-size: 18px;
		color: var(--text-primary);
		letter-spacing: -0.02em;
	}

	.footer-logo span {
		color: var(--accent);
	}
	.footer-copy {
		font-size: 12px;
		color: var(--text-muted);
	}

	/* ANIMATIONS */
	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.reveal {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease,
			transform 0.7s ease;
	}

	:global(.reveal.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* PRICING */
	.pricing-section {
		padding: 6rem 2rem;
		max-width: 1100px;
		margin: 0 auto;
		text-align: center;
	}

	.pricing-toggle {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 100px;
		padding: 4px;
		margin-bottom: 3.5rem;
	}

	.toggle-btn {
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		padding: 7px 18px;
		border-radius: 100px;
		border: none;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
		background: transparent;
		color: var(--text-muted);
	}

	.toggle-btn.active {
		background: var(--bg-surface);
		color: var(--text-primary);
		border: 1px solid var(--border-hover);
	}

	.toggle-save {
		font-size: 11px;
		font-weight: 500;
		color: #4ade80;
		background: rgba(74, 222, 128, 0.1);
		padding: 3px 8px;
		border-radius: 100px;
		margin-left: 2px;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
		text-align: left;
	}

	.pricing-card {
		background: var(--bg-card);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		transition: background 0.2s;
		position: relative;
	}

	.pricing-card:hover {
		background: var(--bg-card-hover);
	}

	.pricing-card.featured {
		background: var(--bg-card-hover);
		border-top: 2px solid var(--accent);
	}

	.pricing-popular {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: var(--accent-dim);
		border: 1px solid rgba(79, 195, 247, 0.2);
		color: var(--accent);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 3px 10px;
		border-radius: 100px;
		margin-bottom: 1.25rem;
		width: fit-content;
	}

	.pricing-empty-badge {
		height: 24px;
		margin-bottom: 1.25rem;
	}

	.pricing-tier {
		font-size: 13px;
		font-weight: 500;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.pricing-price {
		display: flex;
		align-items: baseline;
		gap: 4px;
		margin-bottom: 0.25rem;
	}

	.price-currency {
		font-size: 18px;
		font-weight: 400;
		color: var(--text-secondary);
		font-family: var(--font-display);
	}

	.price-amount {
		font-family: var(--font-display);
		font-size: 48px;
		font-weight: 400;
		letter-spacing: -0.03em;
		color: var(--text-primary);
		line-height: 1;
	}

	.price-period {
		font-size: 13px;
		color: var(--text-muted);
		margin-left: 2px;
	}

	.pricing-desc {
		font-size: 13px;
		color: var(--text-muted);
		margin-bottom: 1.75rem;
		line-height: 1.5;
		min-height: 36px;
	}

	.pricing-divider {
		height: 1px;
		background: var(--border);
		margin-bottom: 1.5rem;
	}

	.pricing-features {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
		margin-bottom: 2rem;
	}

	.pricing-feature {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13px;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.feature-check {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		margin-top: 1px;
		color: var(--accent);
	}

	.feature-check-muted {
		color: var(--text-muted);
	}

	.pricing-cta {
		display: block;
		text-align: center;
		padding: 11px 20px;
		border-radius: 8px;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition:
			opacity 0.2s,
			transform 0.15s;
		border: none;
		margin-top: auto;
	}

	.pricing-cta-outline {
		background: transparent;
		border: 1px solid var(--border-hover);
		color: var(--text-secondary);
	}

	.pricing-cta-outline:hover {
		border-color: rgba(255, 255, 255, 0.25);
		color: var(--text-primary);
		transform: translateY(-1px);
	}

	.pricing-cta-filled {
		background: var(--accent);
		color: #0a0a0b;
	}

	.pricing-cta-filled:hover {
		opacity: 0.88;
		transform: translateY(-1px);
	}

	.pricing-note {
		font-size: 12px;
		color: var(--text-muted);
		margin-top: 1.5rem;
		text-align: center;
	}

	/* RESPONSIVE */
	@media (max-width: 680px) {
		.compare-grid {
			grid-template-columns: 1fr;
		}
		.cost-panel {
			padding: 1.2rem;
		}
		.locations-split {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		nav .nav-links {
			display: none;
		}
		.hero-actions {
			flex-direction: column;
		}
		.pricing-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
