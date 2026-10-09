import type { MediaAsset } from "./types";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/**
 * Site-wide facts. Every statement here comes from the assessment brief.
 * The headline and intro are creative direction and must be validated
 * against Crystal's own positioning before launch (see CONTENT.md).
 */
export const site = {
  name: "Crystal Kizor",
  url: resolveSiteUrl(),
  /** Public enquiry address. `undefined` until provided via environment. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  roles: ["Architect", "Designer", "Entrepreneur", "Speaker", "Researcher", "Creator"],
  headline: "Building better ways for people, places and ideas to thrive.",
  intro:
    "Crystal Kizor is an architect, designer, entrepreneur, speaker and researcher. Her work moves between buildings, objects, education and community — one practice, expressed in many forms.",
  seoDescription:
    "Crystal Kizor — architect, designer, entrepreneur, speaker and researcher. Discover Studio COKA, ELEvated, The Effective Architect, AKO Alliance, Alive and Free, speaking and her research and writing.",
  tagline: "Architecture. Design. Ideas. People.",
  /** Static year avoids a request-time Date in a fully prerendered page. */
  copyrightYear: 2026,
  portrait: {
    alt: "Portrait of Crystal Kizor",
    placeholder: "Crystal portrait — asset required",
    monogram: "CK",
    tone: "clay",
    focus: "50% 25%",
  } satisfies MediaAsset,
  aboutPortrait: {
    alt: "Crystal Kizor at work",
    placeholder: "Secondary portrait of Crystal — asset required",
    monogram: "CK",
    tone: "stone",
  } satisfies MediaAsset,
} as const;
