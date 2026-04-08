import { date, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { schools } from './schema';

export const classes = pgTable('classes', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	instructorName: text('instructor_name').notNull(),
	schoolId: uuid('school_id')
		.notNull()
		.references(() => schools.id, { onDelete: 'cascade' }),
	capacity: integer('capacity').notNull(),
	days: text('days').array().notNull(),
	startTime: text('start_time').notNull(),
	endTime: text('end_time').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
	startDate: date('start_date').notNull(),
	endDate: date('end_date')
});
