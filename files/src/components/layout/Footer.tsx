import Link from "next/link";
import { siteConfig, baseNav, tailNav } from "@/config/site";
import { moduleNav } from "@/config/nav.generated";

const nav = [...baseNav, ...moduleNav, ...tailNav];

export default function Footer() {
  return (
    <footer className="border-t border-heading/10 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <p className="font-semibold text-heading">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-muted">
          {siteConfig.contactEmail && (
            <a href={`mailto:${siteConfig.contactEmail}`} className="block hover:text-accent">
              {siteConfig.contactEmail}
            </a>
          )}
          {siteConfig.phone && <p className="mt-1">{siteConfig.phone}</p>}
        </div>
      </div>
      <div className="border-t border-heading/10 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
