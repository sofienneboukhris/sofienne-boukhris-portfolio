import { db } from './index.ts';
import { calculatorLeads, formSubmissions } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function createCalculatorLead(data: any) {
  return await db.insert(calculatorLeads).values(data).returning();
}

export async function getCalculatorLeads() {
  return await db.select().from(calculatorLeads).orderBy(desc(calculatorLeads.createdAt));
}

export async function updateCalculatorLeadStatus(id: number, status: string) {
  return await db.update(calculatorLeads).set({ status }).where(eq(calculatorLeads.id, id)).returning();
}

export async function deleteCalculatorLead(id: number) {
  return await db.delete(calculatorLeads).where(eq(calculatorLeads.id, id)).returning();
}

export async function createFormSubmission(data: any) {
  return await db.insert(formSubmissions).values(data).returning();
}

export async function getFormSubmissions() {
  return await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));
}

export async function updateFormSubmissionStatus(id: number, status: string) {
  return await db.update(formSubmissions).set({ status }).where(eq(formSubmissions.id, id)).returning();
}

export async function deleteFormSubmission(id: number) {
  return await db.delete(formSubmissions).where(eq(formSubmissions.id, id)).returning();
}
