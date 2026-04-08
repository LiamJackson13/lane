// src/lib/db/schema/schools.ts

import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const schools = pgTable('schools', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	organizationId: text('organization_id').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
