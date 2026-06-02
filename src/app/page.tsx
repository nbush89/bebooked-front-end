import WaitlistForm from "@/components/WaitlistForm";
import Wordmark from "@/components/Wordmark";

const steps = [
  {
    n: "01",
    title: "Post an opening",
    body: "Log in and create a last-minute slot in seconds — choose your service, set the time and price.",
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

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="bg-warm-cream px-8 py-6">
        <Wordmark size="sm" />
      </nav>

      {/* Hero */}
      <section className="bg-near-black text-warm-cream px-8 py-24 md:py-32">
        <p className="text-xs tracking-[0.2em] uppercase text-brand-stone mb-8">
          Launching in Charlotte, NC
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] max-w-2xl mb-6">
          Your calendar,
          <br />
          fully loaded.
        </h1>
        <p className="text-lg md:text-xl font-light text-brand-stone max-w-lg leading-relaxed">
          Bebooked helps beauty professionals fill last-minute openings — no
          more empty chairs, no more lost revenue.
        </p>
      </section>

      {/* How it works */}
      <section className="bg-warm-linen px-8 py-20">
        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-12">
          How it works
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl">
          {steps.map(({ n, title, body }) => (
            <div key={n}>
              <p className="text-xs tracking-[0.2em] text-muted mb-4">{n}</p>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="font-light text-muted leading-relaxed text-sm">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Founding member CTA */}
      <section className="bg-warm-cream px-8 py-20">
        <div className="max-w-lg">
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">
            Founding members
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for beauty.
            <br />
            <span className="font-light">Starting in Charlotte.</span>
          </h2>
          <p className="font-light text-muted leading-relaxed mb-10">
            We&apos;re recruiting our founding cohort of Charlotte-area stylists
            and beauty professionals. Founding members get their first 3 months
            free and direct input into how Bebooked is built.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-near-black text-warm-cream px-8 py-8 flex justify-between items-center">
        <Wordmark size="sm" />
        <p className="text-xs text-brand-stone font-light tracking-wide">
          Charlotte, NC · 2026
        </p>
      </footer>
    </main>
  );
}
