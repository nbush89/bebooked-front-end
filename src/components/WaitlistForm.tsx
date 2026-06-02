"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-brand-stone p-8">
        <p className="text-lg font-bold mb-1">You&apos;re on the list.</p>
        <p className="font-light text-muted">
          We&apos;ll be in touch before we launch in Charlotte.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={status === "loading"}
        className="border border-brand-stone bg-transparent px-4 py-3 font-light placeholder:text-muted focus:outline-none focus:border-near-black transition-colors disabled:opacity-50"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="border border-brand-stone bg-transparent px-4 py-3 font-light placeholder:text-muted focus:outline-none focus:border-near-black transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-near-black text-warm-cream px-6 py-3 font-bold tracking-wide hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Joining..." : "Join as a founding member"}
      </button>

      {status === "error" && (
        <p className="text-sm text-muted">
          Something went wrong. Try again or email us directly.
        </p>
      )}
    </form>
  );
}
