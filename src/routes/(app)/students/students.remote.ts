import { form, query } from '$app/server';
import * as v from 'valibot';
import { db } from '../../../lib/server/db';
import { students } from '../../../lib/server/db/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const createStudent = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty()),
		parentName: v.pipe(v.string(), v.nonEmpty()),
		parentEmail: v.pipe(v.string(), v.email()),
		parentPhone: v.pipe(v.string(), v.nonEmpty()),
		schoolId: v.pipe(v.string(), v.uuid())
	}),
	async ({ name, parentName, parentEmail, parentPhone, schoolId }) => {
		// Insert into the database
		await db.insert(students).values({
			name,
			parentName,
			parentEmail,
			parentPhone,
			schoolId
		});
	}
);

export const getStudents = query(v.string(), async (schoolId) => {
	return db.query.students.findMany({
		where: (students) => eq(students.schoolId, schoolId)
	});
});
