import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/sign-in');

	const activeOrganizationId = (locals.session as { activeOrganizationId?: string } | undefined)
		?.activeOrganizationId;

	const availableSchools = activeOrganizationId
		? await db.query.schools.findMany({
				where: (school) => eq(school.organizationId, activeOrganizationId)
			})
		: await db.query.schools.findMany();

	const schoolId = locals.schoolId ?? availableSchools[0]?.id ?? null;

	return {
		user: locals.user,
		session: locals.session,
		schools: availableSchools,
		schoolId
	};
};
