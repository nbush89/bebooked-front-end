import Ticker from "@/components/Ticker";
import WaitlistForm from "@/components/WaitlistForm";
import Wordmark from "@/components/Wordmark";

const steps = [
  {
    n: "01",
    title: "Post an opening",
    body: "Log in and create a last-minute slot in seconds — service, time, and price.",
  },
  {
    n: "02",
    title: "Share your link",
    body: "Get a unique booking link for that slot. Post it to your Instagram story, text a client, share it anywhere.",
  },
  {
    n: "03",
    title: "Get booked",
    body: "Clients book directly through your link. You confirm, and that slot is filled.",
  },
];

const tools = ["Vagaro", "Booksy", "Square", "GlossGenius"];

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="bg-warm-cream px-8 py-6 flex items-center justify-between">
        <Wordmark size="sm" />
        <span
          className="text-xs tracking-[0.12em] uppercase text-near-black hidden sm:block"
          aria-hidden="true"
        >
          Charlotte, NC
        </span>
      </nav>

      {/* Hero */}
      <section className="bg-near-black text-warm-cream px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16 max-w-5xl">
          <div className="flex-1">
            <p className="text-xs tracking-[0.18em] uppercase text-brand-stone mb-8">
              Launching in Charlotte, NC
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] max-w-xl mb-6">
              Your calendar,
              <br />
              fully loaded.
            </h1>
            <p className="text-lg text-brand-stone max-w-md leading-relaxed">
              The fastest way to fill a last-minute opening — post a slot,
              share your link, get booked.
            </p>
          </div>

          {/* Phone mockup — decorative, hidden from assistive tech */}
          <div
            aria-hidden="true"
            className="hidden md:block flex-shrink-0 rounded-[32px] p-4 w-72"
            style={{
              border: "1.5px solid rgba(216,208,196,0.35)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div className="bg-warm-linen rounded-[22px] p-4">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-near-black mb-4">
                My Slots
              </p>
              <div className="bg-warm-cream rounded-xl p-4 mb-3">
                <p className="text-base font-bold text-near-black">
                  Highlight + Cut
                </p>
                <p className="text-sm text-warm-gray mt-1">
                  Today · 2:00 PM · $220
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-warm-linen rounded px-2 py-1.5 text-xs text-warm-gray overflow-hidden whitespace-nowrap">
                    bebookedtoday.com/b/k2x
                  </div>
                  <div className="bg-near-black text-warm-cream rounded px-3 py-1.5 text-xs font-bold flex-shrink-0">
                    Copy
                  </div>
                </div>
              </div>
              <div className="bg-near-black rounded-xl py-3 text-center">
                <p className="text-sm font-bold text-warm-cream tracking-wide">
                  + Post a new slot
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* Positioning */}
      <section
        className="bg-warm-linen px-8 py-16"
        aria-labelledby="positioning-heading"
      >
        <h2
          id="positioning-heading"
          className="text-xs tracking-[0.15em] uppercase text-near-black mb-5"
        >
          How we fit in
        </h2>
        <p className="text-2xl font-bold leading-snug text-near-black max-w-xl mb-4">
          Every empty slot is money you don&apos;t get back.
        </p>
        <p className="text-lg leading-relaxed text-near-black max-w-xl">
          Bebooked turns last-minute openings into booked appointments — post a
          slot, share your link, fill the chair in 30 seconds. At $35 a month,
          your first booking covers it. Every slot after that is revenue you
          kept. Works alongside Vagaro, Booksy, and Square.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-xs tracking-[0.1em] uppercase text-near-black font-light mr-2">
            Works alongside →
          </span>
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-xs tracking-[0.06em] uppercase text-near-black font-light px-2 py-1 border border-brand-stone"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        className="bg-warm-cream px-8 py-20"
        aria-labelledby="how-it-works-heading"
      >
        <h2
          id="how-it-works-heading"
          className="text-xs tracking-[0.15em] uppercase text-near-black mb-12"
        >
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl">
          {steps.map(({ n, title, body }) => (
            <div key={n}>
              <p className="text-xs tracking-[0.2em] text-accent mb-4" aria-hidden="true">
                {n}
              </p>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-warm-gray leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founding member CTA */}
      <section className="bg-near-black text-warm-cream px-8 py-20">
        <div className="max-w-lg">
          <p
            className="text-xs tracking-[0.15em] uppercase text-brand-stone mb-6"
            aria-hidden="true"
          >
            Founding members · Charlotte, NC
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for beauty.
            <br />
            <span className="font-light">Claim your founding spot.</span>
          </h2>
          <p className="text-brand-stone leading-relaxed mb-10">
            Charlotte&apos;s founding cohort gets 3 months free and direct
            input on how we build. Spots are limited.
          </p>
          <WaitlistForm />
          <p className="text-xs text-brand-stone mt-4">
            Charlotte stylists only at launch. Founding spots are limited.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-cream px-8 py-8 flex justify-between items-center border-t border-brand-stone">
        <Wordmark size="sm" />
        <div className="flex items-center gap-6">
          {/* TODO: update with real Instagram handle */}
          <span className="text-xs text-near-black font-light tracking-[0.08em] uppercase">
            @bebookedtoday
          </span>
          <span className="text-xs text-near-black font-light">
            Charlotte, NC · 2026
          </span>
        </div>
      </footer>
    </main>
  );
}
