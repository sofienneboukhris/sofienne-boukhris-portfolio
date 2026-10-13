import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 50 }).default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
});


import { jsonb } from 'drizzle-orm/pg-core';

export const siteConfig = pgTable('site_config', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(), // e.g., 'calculator_config', 'services', 'projects'
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const calculatorLeads = pgTable('calculator_leads', {
  id: serial('id').primaryKey(),
  clientName: text('client_name'),
  clientEmail: text('client_email'),
  clientPhone: text('client_phone'),
  clientCompany: text('client_company'),
  projectTypeId: text('project_type_id'),
  projectTypeName: text('project_type_name'),
  selectedFeatures: jsonb('selected_features'),
  options: jsonb('options'),
  calculatedPrice: integer('calculated_price'),
  currency: text('currency'),
  costBreakdown: jsonb('cost_breakdown'),
  status: varchar('status', { length: 50 }).default('new'), // new, contacted, won, lost
  createdAt: timestamp('created_at').defaultNow(),
});

export const formSubmissions = pgTable('form_submissions', {
  id: serial('id').primaryKey(),
  clientName: text('client_name'),
  clientEmail: text('client_email'),
  clientPhone: text('client_phone'),
  source: text('source'),
  message: text('message'),
  status: varchar('status', { length: 50 }).default('new'), // new, read, replied, archived
  createdAt: timestamp('created_at').defaultNow(),
});
