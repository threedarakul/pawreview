import { pgTable, uuid, varchar, date, timestamp } from "drizzle-orm/pg-core";

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  startDate: date("start_date").notNull(),
  reviewDueDate: date("review_due_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
