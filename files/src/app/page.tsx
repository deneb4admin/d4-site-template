import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          {siteConfig.name}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            Get in touch
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-heading/15 px-6 py-3 text-sm font-medium text-heading transition-colors hover:border-accent hover:text-accent"
          >
            Learn more
          </Link>
        </div>
      </section>

      <section className="border-t border-heading/10 bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {[
            {
              title: "What we do",
              body: "Summarize the core service or product in plain language a first-time visitor understands immediately.",
            },
            {
              title: "Who we serve",
              body: "Name the customers this business exists for and the problem it takes off their plate.",
            },
            {
              title: "Why it works",
              body: "State the proof: years in business, results delivered, or the approach that sets this business apart.",
            },
          ].map((card) => (
            <div key={card.title}>
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
