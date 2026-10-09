import { site } from "@/data/site";
import type { EnquiryIntent, Initiative } from "@/data/types";

const subjects: Record<EnquiryIntent, string> = {
  collaboration: "Collaboration enquiry",
  speaking: "Speaking enquiry",
  general: "Enquiry",
};

/**
 * Resolves an intent-tagged enquiry link. Each intent pre-fills a distinct
 * subject so enquiries arrive already routed.
 *
 * Returns `null` when no contact address is configured, so callers can show
 * an honest "pending" state instead of a fabricated address.
 */
export function enquiryHref(intent: EnquiryIntent, topic?: string): string | null {
  if (!site.contactEmail) return null;
  const subject = topic ? `${subjects[intent]} — ${topic}` : subjects[intent];
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;
}

/** Enquiry link, or the on-page contact section when no address is set. */
export function enquiryHrefOrContact(intent: EnquiryIntent, topic?: string): string {
  return enquiryHref(intent, topic) ?? "#contact";
}

/**
 * Where an initiative card leads: its verified website, its on-page section,
 * or an enquiry tagged with the initiative's name.
 */
export function initiativeDestination(initiative: Initiative): {
  href: string;
  external: boolean;
  label: string;
} {
  const name = initiative.shortName ?? initiative.name;
  if (initiative.href) return { href: initiative.href, external: true, label: `Visit ${name}` };
  if (initiative.anchor) return { href: initiative.anchor, external: false, label: `Explore ${name}` };
  return {
    href: enquiryHrefOrContact("collaboration", initiative.name),
    external: false,
    label: `Enquire about ${name}`,
  };
}
