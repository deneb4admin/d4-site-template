export interface NavItem {
  label: string;
  href: string;
  /** Optional supporting line, shown in mega-menu rows and panels. */
  description?: string;
  /**
   * Nested entries. An item with children renders as a mega-menu group in
   * the header (and a column in the footer). One level of children renders
   * as description rows; when children themselves have children, the panel
   * adds a category rail. Items without children render as plain links.
   */
  children?: NavItem[];
}

/** Site-wide announcement bar above the header; configured per build. */
export interface Announcement {
  text: string;
  /** Optional destination; when set the announcement text links there. */
  href?: string;
  /** Label for the link arrow; defaults to "Learn more". */
  linkLabel?: string;
}

/** Quote-request modal configuration. */
export interface QuoteConfig {
  /** When false, quote CTAs fall back to linking the contact page. */
  enabled: boolean;
  /** Topic choices for the request select; the select is hidden when empty. */
  topics: string[];
}

/** Social profile link shown in the footer. */
export interface SocialLink {
  /** Platform name; known names (LinkedIn, Facebook, X, Instagram, YouTube) get their icon. */
  label: string;
  href: string;
}
