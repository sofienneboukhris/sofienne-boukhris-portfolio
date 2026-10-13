import { db } from './index.ts';
import { admins } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function createAdmin(name: string, email: string, passwordHash: string) {
  try {
    const result = await db.insert(admins)
      .values({ name, email, passwordHash })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to create admin.", { cause: error });
  }
}

export async function getAdminByEmail(email: string) {
  try {
    const result = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to get admin.", { cause: error });
  }
}
