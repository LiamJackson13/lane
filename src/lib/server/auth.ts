import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { organization } from 'better-auth/plugins';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	plugins: [
		organization(),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	],
	databaseHooks: {
		user: {
			create: {
				after: async (user, ctx) => {
					if (ctx?.path !== '/sign-up/email') return;

					await auth.api.createOrganization({
						body: {
							name: user.name + "'s Organization",
							slug: user.name.toLowerCase().replace(/\s+/g, '-') + '-' + user.id.slice(0, 6),
							userId: user.id,
							keepCurrentActiveOrganization: false
						}
					});
				}
			}
		}
	}
});
