import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    await sql`
      INSERT INTO waitlist (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (email) DO NOTHING
    `;
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  try {
    const { error } = await resend.emails.send({
      from: "BeBooked <onboarding@resend.dev>", // TODO: swap to noreply@bebookedtoday.com after domain verification
      to: process.env.NOTIFY_EMAIL!,
      subject: `New waitlist signup: ${name}`,
      text: `${name} (${email}) joined the BeBooked waitlist.`,
    });

    if (error) {
      console.error("Resend error:", error);
      // DB insert succeeded — still return success to the user,
      // but log so we know the notification didn't fire
    }
  } catch (err) {
    console.error("Resend exception:", err);
  }

  return NextResponse.json({ success: true });
}
