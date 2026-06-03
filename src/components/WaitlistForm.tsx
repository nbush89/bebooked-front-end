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
      <div className="border border-brand-stone p-8" role="status">
        <p className="text-lg font-bold mb-1">You&apos;re on the list.</p>
        <p className="text-brand-stone">
          We&apos;ll be in touch before we launch in Charlotte.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor="waitlist-name" className="sr-only">
          Your name
        </label>
        <input
          id="waitlist-name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={status === "loading"}
          className="border border-brand-stone bg-transparent px-4 py-3 placeholder:text-muted focus:outline-none focus:border-warm-cream transition-colors disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="waitlist-email" className="sr-only">
          Your email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          placeholder="Your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="border border-brand-stone bg-transparent px-4 py-3 placeholder:text-muted focus:outline-none focus:border-warm-cream transition-colors disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-warm-cream px-6 py-3 font-bold tracking-wide hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Joining..." : "Join as a founding member"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-brand-stone">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
