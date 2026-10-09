/**
 * Content model for the site. Everything rendered on the page is described by
 * these types so copy and assets can change (or move to a CMS) without
 * touching presentation components.
 */

/** Visual tone used by placeholder plates and accents. Keeps the palette restrained. */
export type Tone = "clay" | "sand" | "stone" | "olive" | "ink";

/**
 * An image slot. `src` is optional: when it is missing, the UI renders a
 * clearly labelled placeholder plate using `placeholder` as its caption.
 * Drop a file into /public/images and set `src` to replace it.
 */
export type MediaAsset = {
  src?: string;
  alt: string;
  /** Visible caption shown while the real asset is missing. */
  placeholder: string;
  /** Short monogram drawn on the placeholder plate. */
  monogram?: string;
  tone?: Tone;
  /** CSS object-position for art-directed crops, e.g. "50% 20%". */
  focus?: string;
};

export type ThreadId = "places" | "knowledge" | "people";

/** The three threads that organise Crystal's body of work. */
export type Thread = {
  id: ThreadId;
  index: string;
  title: string;
  summary: string;
};

export type EnquiryIntent = "collaboration" | "speaking" | "general";

export type Initiative = {
  id: string;
  name: string;
  /** Short name used in compact UI (e.g. "TEA"). */
  shortName?: string;
  category: string;
  description: string;
  thread: ThreadId;
  /** Featured initiatives receive a large, image-led treatment. */
  featured: boolean;
  media?: MediaAsset;
  logo?: string;
  /** Verified external website. Leave undefined until a URL is confirmed. */
  href?: string;
  /** On-page destination for initiatives that live on this page (e.g. "#speaking"). */
  anchor?: string;
};

export type WorkItem = {
  id: string;
  initiativeId: string;
  title: string;
  context: string;
  media: MediaAsset;
  href?: string;
  /** True while the item is a slot awaiting real project content. */
  pending: boolean;
};

export type IdeaStream = {
  id: string;
  title: string;
  description: string;
  /** Latest published piece, once available. */
  latest?: { title: string; href: string };
};

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type VisitorIntent = {
  id: string;
  prompt: string;
  action: string;
  /** Either an enquiry type (resolved to a mailto) or an on-page anchor. */
  target: { type: "enquiry"; intent: EnquiryIntent } | { type: "anchor"; href: `#${string}` };
};
