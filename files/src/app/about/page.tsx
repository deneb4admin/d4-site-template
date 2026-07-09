import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        About {siteConfig.name}
      </h1>
      <div className="mt-8 space-y-5 leading-7">
        <p>{siteConfig.description}</p>
        <p>
          Replace this section with the story of the business: how it started, what it
          stands for, and the people behind it. Keep it in the client&apos;s own words
          and grounded in facts they supplied.
        </p>
      </div>
    </section>
  );
}
