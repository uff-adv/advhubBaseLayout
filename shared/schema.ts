import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email"),
  displayName: text("display_name"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  samlProfile: json("saml_profile"),
  samlRoles: text("saml_roles").array(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  displayName: true,
  firstName: true,
  lastName: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
