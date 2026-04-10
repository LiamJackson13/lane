# Agent Instructions

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes mode on by default, use `$props()`, `$state()`, etc.)
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin, not a separate config file)
- Better Auth for auth (`better-auth/svelte-kit` integration)
- Drizzle ORM with PostgreSQL/Neon
- TypeScript throughout

## Key Commands

```sh
npm run dev          # dev server
npm run build        # production build
npm run check        # typecheck (runs svelte-kit sync first)
npm run lint         # prettier + eslint
npm run format       # auto-format
npm run db:push      # push schema to DB
npm run db:generate  # generate migrations
npm run db:migrate   # apply migrations
npm run db:studio    # Drizzle Studio
npm run auth:schema  # regenerate auth schema from better-auth
```

## Verification Order

Run `check` after `format`/`lint` before committing.

## Routes

- `(app)/` — protected routes (redirects to `/sign-in` if no user)
- `(auth)/` — auth routes (redirects to `/dashboard` if already logged in)
- Root `+layout.svelte` is a pass-through; `(app)` and `(auth)` have their own layouts

## Auth & Context

- `hooks.server.ts` populates `locals.user`, `locals.session`, `locals.schoolId` (from cookie)
- `app.d.ts` defines the `App.Locals` shape

## DB

- Schema lives in `src/lib/server/db/schema.ts` (re-exports from auth/students/schools/classes schemas)
- `drizzle.config.ts` requires `DATABASE_URL` env var — will throw if not set
- Drizzle queries use `db.query.<table>.findMany()` etc. from the generated query client

## Svelte 5 Patterns

- Use runes (`$props()`, `$state()`, `$derived()`, `$effect()`) — not legacy stores
- Svelte 5 async experimental enabled in `svelte.config.js`
- Server-side: `+page.server.ts` / `+layout.server.ts` with `export const load`
- Form actions: use SvelteKit's standard form action pattern with `$form()` rune where applicable

## Styling

- Global styles in `src/routes/layout.css`
- Tailwind utility classes in component markup
- No separate tailwind.config — v4 uses CSS-based config
