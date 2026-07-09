import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
      <p className="mt-4 text-muted">
        Send a message and we&apos;ll get back to you.
        {siteConfig.contactEmail && (
          <>
            {" "}
            Or email us directly at{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline">
              {siteConfig.contactEmail}
            </a>
            .
          </>
        )}
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
