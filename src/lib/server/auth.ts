import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { organization } from 'better-auth/plugins';
import { schools } from './db/schools.schema';
import { member, session as sessionTable } from './db/auth.schema';
import { asc, eq } from 'drizzle-orm';
import { dash } from '@better-auth/infra';

export const auth = betterAuth({
	baseURL: env.PUBLIC_VITE_ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	plugins: [
		dash(),
		organization({
			organizationHooks: {
				afterCreateOrganization: async ({ organization }) => {
					try {
						await db.insert(schools).values({
							name: `${organization.name} - Main Location`,
							organizationId: organization.id
						});
					} catch (err) {
						console.error('Failed to create default school:', err);
					}
				}
			}
		}),
		sveltekitCookies(getRequestEvent)
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
		},
		session: {
			create: {
				after: async (createdSession) => {
					if (createdSession.activeOrganizationId) return;

					const firstMembership = await db
						.select({ organizationId: member.organizationId })
						.from(member)
						.where(eq(member.userId, createdSession.userId))
						.orderBy(asc(member.createdAt))
						.limit(1);

					const organizationId = firstMembership[0]?.organizationId;
					if (!organizationId) return;

					await db
						.update(sessionTable)
						.set({ activeOrganizationId: organizationId })
						.where(eq(sessionTable.id, createdSession.id));
				}
			}
		}
	}
});
