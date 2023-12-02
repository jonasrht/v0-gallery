import { index, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const projects = mysqlTable('projects', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  projectLink: varchar('project_link', { length: 255 }),
  profileLink: varchar('profile_link', { length: 255 }),
  imageLink: varchar('image_link', { length: 255 }),
  imageAlt: text('image_alt'),
  prompt: text('prompt'),
}, (table) => {
  return { projectLinkIdx: index('projectLink').on(table.projectLink) }
});

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectsSchema = createSelectSchema(projects);

export type Project = z.infer<typeof selectProjectsSchema>;