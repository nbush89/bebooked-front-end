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

    await resend.emails.send({
      from: "Bebooked <noreply@bebookedtoday.com>",
      to: process.env.NOTIFY_EMAIL!,
      subject: `New waitlist signup: ${name}`,
      text: `${name} (${email}) joined the Bebooked waitlist.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
