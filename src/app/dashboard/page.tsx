import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { sql } from "@/lib/db";
import Wordmark from "@/components/Wordmark";
import { Avatar, Button, EyebrowLabel } from "@/components/ui";
import SlotCard, { type SlotCardData } from "./_components/SlotCard";

// ── Helpers ────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatSlotWhen(slotDate: string, slotTime: string): string {
  // slotDate: "2026-06-07", slotTime: "14:00:00"
  const [year, month, day] = slotDate.split("-").map(Number);
  const [hour, minute] = slotTime.split(":").map(Number);

  const d = new Date(year, month - 1, day);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = d.toDateString() === today.toDateString();
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  const dayStr = isToday
    ? "Today"
    : isTomorrow
    ? "Tomorrow"
    : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const ap = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const timeStr = `${h12}:${String(minute).padStart(2, "0")} ${ap}`;

  return `${dayStr} · ${timeStr}`;
}

function formatPrice(priceCents: number): string {
  return `$${(priceCents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();

  // ── Fetch or auto-create stylist record ──────────────────────────────────
  let stylistRows: Record<string, unknown>[] = [];
  let dbError = false;

  try {
    stylistRows = await sql`
      SELECT * FROM stylists WHERE clerk_user_id = ${userId} LIMIT 1
    `;
  } catch {
    dbError = true;
  }

  let stylist = stylistRows[0] as Record<string, unknown> | undefined;

  if (!dbError && !stylist && clerkUser) {
    // Auto-create profile on first login using Clerk data
    const name =
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
      clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] ||
      "stylist";

    const baseSlug = slugify(name) || "stylist";
    let slug = baseSlug;
    let attempt = 0;

    while (attempt < 10) {
      try {
        const existing = await sql`SELECT id FROM stylists WHERE slug = ${slug}`;
        if (existing.length === 0) break;
      } catch {
        break;
      }
      attempt++;
      slug = `${baseSlug}-${attempt}`;
    }

    try {
      const created = await sql`
        INSERT INTO stylists (clerk_user_id, name, slug, location)
        VALUES (${userId}, ${name}, ${slug}, 'Charlotte, NC')
        RETURNING *
      `;
      stylist = created[0] as Record<string, unknown>;
    } catch {
      dbError = true;
    }
  }

  // ── Fetch open slots ──────────────────────────────────────────────────────
  let slots: SlotCardData[] = [];

  if (!dbError && stylist) {
    try {
      const rows = await sql`
        SELECT id, service_name, duration_mins, price_cents, slot_date, slot_time, short_code
        FROM slots
        WHERE stylist_id = ${stylist.id as number}
          AND status = 'open'
          AND slot_date >= CURRENT_DATE
        ORDER BY slot_date ASC, slot_time ASC
      `;

      slots = rows.map((r) => ({
        id: r.id as number,
        name: r.service_name as string,
        when: formatSlotWhen(r.slot_date as string, r.slot_time as string),
        mins: r.duration_mins as number,
        priceDisplay: formatPrice(r.price_cents as number),
        shortCode: r.short_code as string,
      }));
    } catch {
      // Slots query failed — empty state handles it
    }
  }

  const stylistName = (stylist?.name as string) ?? clerkUser?.firstName ?? "there";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--warm-linen)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          background: "var(--warm-cream)",
          borderBottom: "1px solid var(--hairline)",
          padding: "14px var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Wordmark size="sm" />
        <Avatar
          name={stylistName}
          src={(stylist?.photo_url as string) ?? undefined}
          size={34}
          aria-label={`Signed in as ${stylistName}`}
        />
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "24px var(--gutter) 64px",
        }}
      >
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 4,
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "var(--weight-bold)",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            My slots
          </h1>
          <EyebrowLabel tone="muted" style={{ marginBottom: 4 }}>
            Charlotte, NC
          </EyebrowLabel>
        </div>

        {/* Subtitle / status */}
        <p
          style={{
            fontSize: "var(--size-sm)",
            color: "var(--text-muted)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: slots.length > 0 ? "var(--sage)" : "var(--stone)",
              flexShrink: 0,
            }}
          />
          {dbError
            ? "Database not connected yet"
            : slots.length === 0
            ? "No open slots · post one to get started"
            : `${slots.length} open slot${slots.length === 1 ? "" : "s"} · share to fill them`}
        </p>

        {/* Action row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <Link href="/dashboard/create" style={{ flex: 1, textDecoration: "none" }}>
            <Button variant="primary" style={{ width: "100%" }}>
              + Post a new slot
            </Button>
          </Link>
          <ShareProfileButton slug={stylist?.slug as string | undefined} />
        </div>

        {/* Slot list / empty state */}
        {slots.length === 0 ? (
          <EmptyState dbError={dbError} />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
            role="list"
            aria-label="Your open slots"
          >
            {slots.map((s) => (
              <div key={s.id} role="listitem">
                <SlotCard slot={s} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ── Share profile button ───────────────────────────────────────────────────

function ShareProfileButton({ slug }: { slug?: string }) {
  const href = slug ? `https://bebookedtoday.com/${slug}` : "#";
  return (
    <a
      href={href}
      target={slug ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label="View your public profile"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "13px 24px",
        fontFamily: "var(--font-sans)",
        fontSize: "15px",
        fontWeight: "var(--weight-bold)",
        letterSpacing: "0.04em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        border: "1.5px solid var(--border-default)",
        background: "transparent",
        color: "var(--text-primary)",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      Share profile
    </a>
  );
}

// ── Empty / error states ───────────────────────────────────────────────────

function EmptyState({ dbError }: { dbError: boolean }) {
  if (dbError) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "48px 24px",
          color: "var(--text-muted)",
        }}
      >
        <p
          style={{
            fontSize: "var(--size-sm)",
            lineHeight: 1.6,
            maxWidth: 320,
            margin: "0 auto",
          }}
        >
          Database isn&apos;t connected yet. Add your{" "}
          <code
            style={{
              fontFamily: "monospace",
              background: "var(--warm-linen)",
              padding: "1px 5px",
              borderRadius: 2,
            }}
          >
            DATABASE_URL
          </code>{" "}
          to{" "}
          <code style={{ fontFamily: "monospace" }}>.env.local</code> and run
          the setup SQL in Neon.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "56px 24px",
        color: "var(--text-muted)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "var(--radius-md)",
          background: "var(--stone)",
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
        aria-hidden="true"
      >
        ✂️
      </div>
      <p
        style={{
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--size-body)",
          color: "var(--text-primary)",
          marginBottom: 8,
          margin: "0 0 8px",
        }}
      >
        No open slots yet
      </p>
      <p
        style={{
          fontSize: "var(--size-sm)",
          color: "var(--text-muted)",
          lineHeight: 1.6,
          maxWidth: 280,
          margin: "0 auto 24px",
        }}
      >
        Post your first opening and share the link to get booked in minutes.
      </p>
      <Link href="/dashboard/create" style={{ textDecoration: "none" }}>
        <Button variant="accent" size="sm">
          Post your first slot
        </Button>
      </Link>
    </div>
  );
}
