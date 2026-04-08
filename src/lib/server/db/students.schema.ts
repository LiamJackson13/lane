// src/lib/db/schema/students.ts

import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	parentName: text('parent_name'),
	parentEmail: text('parent_email'),
	parentPhone: text('parent_phone'),
	schoolId: uuid('school_id').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
