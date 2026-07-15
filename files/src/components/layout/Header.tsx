"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig, baseNav, tailNav } from "@/config/site";
import { moduleNav } from "@/config/nav.generated";

const nav = [...baseNav, ...moduleNav, ...tailNav];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-heading/10 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-heading">
          {siteConfig.name}
        </Link>

        <nav className="hidden h-16 items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-full items-center border-b-2 text-sm transition-colors hover:text-accent ${
                pathname === item.href
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-body"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-heading transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-5 bg-heading transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-5 bg-heading transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-heading/10 bg-surface px-4 py-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm ${
                pathname === item.href ? "font-medium text-accent" : "text-body"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
