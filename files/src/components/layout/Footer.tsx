import Link from "next/link";
import { siteConfig, baseNav, tailNav } from "@/config/site";
import { moduleNav } from "@/config/nav.generated";

const nav = [...baseNav, ...moduleNav, ...tailNav];

export default function Footer() {
  return (
    <footer className="border-t border-heading/10 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-6">
        <div className="max-w-sm">
          <p className="text-lg font-semibold text-heading">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Pages</p>
          <nav className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Contact</p>
          <div className="mt-4 space-y-2.5 text-sm text-muted">
            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="block break-words transition-colors hover:text-accent"
              >
                {siteConfig.contactEmail}
              </a>
            )}
            {siteConfig.phone && <p>{siteConfig.phone}</p>}
            {siteConfig.address && <p className="leading-6">{siteConfig.address}</p>}
          </div>
        </div>
      </div>
      <div className="border-t border-heading/10 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
