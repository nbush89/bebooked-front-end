import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  // Allow build to succeed without DB — queries will fail at runtime
  console.warn("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL ?? "postgresql://localhost/bebooked");
