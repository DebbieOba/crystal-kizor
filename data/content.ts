import type { IdeaStream, NavItem, VisitorIntent, WorkItem } from "./types";

export const navigation: NavItem[] = [
  { label: "Work", href: "#ecosystem" },
  { label: "Ideas", href: "#ideas" },
  { label: "About", href: "#about" },
  { label: "Speaking", href: "#speaking" },
  { label: "Contact", href: "#contact" },
];

/**
 * Selected work slots. No project names, locations or dates were supplied,
 * so each item is an explicit, replaceable slot (`pending: true`).
 */
export const work: WorkItem[] = [
  {
    id: "studio-coka-featured",
    initiativeId: "studio-coka",
    title: "Featured architecture project",
    context: "Architecture · Interiors · Construction",
    pending: true,
    media: {
      alt: "Featured Studio COKA project",
      placeholder: "Featured project photograph — asset required",
      monogram: "SC",
      tone: "stone",
    },
  },
  {
    id: "elevated-featured",
    initiativeId: "elevated",
    title: "Featured furniture piece",
    context: "Furniture · Product Design",
    pending: true,
    media: {
      alt: "Featured ELEvated product",
      placeholder: "Product photograph — asset required",
      monogram: "EL",
      tone: "sand",
    },
  },
  {
    id: "studio-coka-interior",
    initiativeId: "studio-coka",
    title: "Featured interior",
    context: "Interior Design",
    pending: true,
    media: {
      alt: "Studio COKA interior",
      placeholder: "Interior photograph — asset required",
      monogram: "SC",
      tone: "clay",
    },
  },
];

export const ideaStreams: IdeaStream[] = [
  {
    id: "research",
    title: "Research",
    description: "Inquiry into architecture, the built environment and how places shape the people in them.",
  },
  {
    id: "writing",
    title: "Writing",
    description: "Essays and authorship that carry ideas beyond the studio and into wider conversation.",
  },
  {
    id: "media",
    title: "Media",
    description: "Conversations and content that make architectural thinking accessible to more people.",
  },
];

/** Speaking topics, exactly as listed in the brief. */
export const speakingTopics: string[] = [
  "Architecture",
  "Climate-responsive design",
  "African cities",
  "Design",
  "Entrepreneurship",
  "The built environment",
];

export const visitorIntents: VisitorIntent[] = [
  {
    id: "collaborate",
    prompt: "I want to work with Crystal",
    action: "Start a collaboration",
    target: { type: "enquiry", intent: "collaboration" },
  },
  {
    id: "speak",
    prompt: "I want Crystal to speak",
    action: "Send a speaking enquiry",
    target: { type: "enquiry", intent: "speaking" },
  },
  {
    id: "explore",
    prompt: "I want to explore her work",
    action: "Explore the ecosystem",
    target: { type: "anchor", href: "#ecosystem" },
  },
  {
    id: "follow",
    prompt: "I want to follow her ideas",
    action: "Read research & writing",
    target: { type: "anchor", href: "#ideas" },
  },
];
