import { command, form, query, getRequestEvent } from '$app/server';
import * as v from 'valibot';
import { db } from '../../../lib/server/db';
import { schools } from '../../../lib/server/db/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const createSchool = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty()),
		organizationId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ name, organizationId }) => {
		await db.insert(schools).values({
			name,
			organizationId
		});
	}
);

export const getSchools = query(v.string(), async (organizationId) => {
	return db.query.schools.findMany({
		where: (schools) => eq(schools.organizationId, organizationId)
	});
});

export const setActiveSchool = command(
	v.object({
		schoolId: v.pipe(v.string(), v.uuid())
	}),
	async ({ schoolId }) => {
		const event = getRequestEvent();

		event.cookies.set('schoolId', schoolId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax'
		});

		return { success: true };
	}
);
