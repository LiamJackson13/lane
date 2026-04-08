import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const schoolId = locals.schoolId ?? cookies.get('schoolId') ?? null;
	return { schoolId };
};
