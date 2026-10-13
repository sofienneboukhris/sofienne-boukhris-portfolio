import { db } from './index.ts';
import { siteConfig } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getConfig(key: string) {
  try {
    const result = await db.select().from(siteConfig).where(eq(siteConfig.key, key)).limit(1);
    return result[0]?.value || null;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
}

export async function setConfig(key: string, value: any) {
  try {
    const existing = await getConfig(key);
    if (existing !== null) {
      await db.update(siteConfig)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteConfig.key, key));
    } else {
      await db.insert(siteConfig).values({ key, value });
    }
  } catch (error) {
    console.error("Database update failed:", error);
    throw error;
  }
}
