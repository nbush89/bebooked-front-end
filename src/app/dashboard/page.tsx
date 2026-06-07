import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Temporary placeholder — will be replaced by MySlotsScreen
export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--surface-page)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans)",
        color: "var(--text-primary)",
      }}
    >
      <p style={{ fontSize: "var(--size-body)", color: "var(--text-muted)" }}>
        Dashboard coming soon.
      </p>
    </main>
  );
}
