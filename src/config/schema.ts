import { text } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const schedule = pgTable("schedule", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  start_time: timestamp(),
  end_time: timestamp(),
  participants : text().array()
});
