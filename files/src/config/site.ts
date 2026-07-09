import type { NavItem } from "@/types";

/**
 * Site identity. d4-site-builder rewrites the values in this file from the
 * build config when assembling a client site.
 */
export const siteConfig = {
  name: "New Site",
  tagline: "A clear, direct statement of what this business does.",
  description:
    "Replace this with two or three sentences about the business: who it serves, what it delivers, and why clients choose it.",
  contactEmail: "hello@example.com",
  phone: "",
  address: "",
};

/** Base navigation. Module nav entries are appended after these. */
export const baseNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

/** Nav entries pinned to the end (after module entries). */
export const tailNav: NavItem[] = [{ label: "Contact", href: "/contact" }];
