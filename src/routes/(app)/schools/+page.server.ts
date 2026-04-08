import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const organizationId =
		(locals.session as { activeOrganizationId?: string } | undefined)?.activeOrganizationId ?? null;

	return { organizationId };
};
