import { form, query } from '$app/server';
import * as v from 'valibot';
import { db } from '../../../lib/server/db';
import { classes } from '../../../lib/server/db/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const createClass = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty()),
		instructorName: v.pipe(v.string(), v.nonEmpty()),
		schoolId: v.pipe(v.string(), v.uuid()),
		capacity: v.pipe(v.string(), v.nonEmpty()),
		days: v.pipe(v.string(), v.nonEmpty()),
		startTime: v.pipe(v.string(), v.nonEmpty()),
		endTime: v.pipe(v.string(), v.nonEmpty()),
		startDate: v.pipe(v.string(), v.nonEmpty()),
		endDate: v.string()
	}),
	async ({
		name,
		instructorName,
		schoolId,
		capacity,
		days,
		startTime,
		endTime,
		startDate,
		endDate
	}) => {
		const parsedCapacity = Number.parseInt(capacity, 10);
		if (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
			throw new Error('Capacity must be a positive integer.');
		}

		const parsedDays = days
			.split(',')
			.map((day) => day.trim())
			.filter(Boolean);

		if (parsedDays.length === 0) {
			throw new Error('At least one class day is required.');
		}

		await db.insert(classes).values({
			name,
			instructorName,
			schoolId,
			capacity: parsedCapacity,
			days: parsedDays,
			startTime,
			endTime,
			startDate,
			endDate: endDate.trim() ? endDate : null
		});
	}
);

export const getClasses = query(v.string(), async (schoolId) => {
	return db.query.classes.findMany({
		where: (classes) => eq(classes.schoolId, schoolId)
	});
});

export const getClassById = query(v.string(), async (classId) => {
	return db.query.classes.findFirst({
		where: (classes) => eq(classes.id, classId)
	});
});
