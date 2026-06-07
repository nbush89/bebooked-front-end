"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";

function generateShortCode(): string {
  // 6 alphanumeric chars — e.g. "k2x9rq"
  return Math.random().toString(36).slice(2, 8);
}

export async function createSlot(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // Get stylist id
  const stylistRows = await sql`
    SELECT id FROM stylists WHERE clerk_user_id = ${userId} LIMIT 1
  `;
  const stylist = stylistRows[0];
  if (!stylist) throw new Error("No stylist profile found. Complete your profile first.");

  const serviceName = (formData.get("service_name") as string)?.trim();
  const slotDate = formData.get("slot_date") as string;   // "YYYY-MM-DD"
  const slotTime = formData.get("slot_time") as string;   // "HH:MM"
  const durationMins = parseInt(formData.get("duration_mins") as string, 10);
  const priceRaw = parseFloat(formData.get("price") as string);
  const priceCents = Math.round(priceRaw * 100);
  const note = (formData.get("note") as string)?.trim() || null;

  if (!serviceName || !slotDate || !slotTime || isNaN(durationMins) || isNaN(priceCents)) {
    throw new Error("Missing required fields");
  }

  // Generate a unique short_code (retry on collision)
  let shortCode = generateShortCode();
  for (let i = 0; i < 5; i++) {
    const existing = await sql`SELECT id FROM slots WHERE short_code = ${shortCode}`;
    if (existing.length === 0) break;
    shortCode = generateShortCode();
  }

  await sql`
    INSERT INTO slots
      (stylist_id, service_name, duration_mins, price_cents, slot_date, slot_time, short_code, note)
    VALUES
      (${stylist.id as number}, ${serviceName}, ${durationMins}, ${priceCents},
       ${slotDate}, ${slotTime}, ${shortCode}, ${note})
  `;

  redirect("/dashboard");
}
