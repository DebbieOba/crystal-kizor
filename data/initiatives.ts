import type { Initiative, Thread, ThreadId } from "./types";

/**
 * The three threads are the page's organising idea: one person, three
 * threads, seven expressions. Groupings are a product decision (DECISIONS.md),
 * not a claim from the brief.
 */
export const threads: Thread[] = [
  {
    id: "places",
    index: "01",
    title: "Places & objects",
    summary: "Designing and making the spaces and things people live with.",
  },
  {
    id: "knowledge",
    index: "02",
    title: "Knowledge",
    summary: "Sharing what architecture teaches — through education, research, writing and the stage.",
  },
  {
    id: "people",
    index: "03",
    title: "People",
    summary: "Opening doors for young people and nurturing lives of purpose.",
  },
];

/**
 * Descriptions paraphrase the assessment brief only. `href` stays undefined
 * until an official URL is verified (see RESEARCH.md); the UI then routes
 * visitors to an intent-tagged enquiry instead of a guessed link.
 */
export const initiatives: Initiative[] = [
  {
    id: "studio-coka",
    name: "Studio COKA",
    category: "Architecture, Interior Design & Construction",
    description:
      "Crystal's architecture practice — carrying ideas from first sketch to finished space across architecture, interiors and construction.",
    thread: "places",
    featured: true,
    media: {
      alt: "Studio COKA project",
      placeholder: "Studio COKA project photograph — asset required",
      monogram: "SC",
      tone: "stone",
    },
  },
  {
    id: "elevated",
    name: "ELEvated",
    category: "Furniture & Product Design",
    description: "Furniture and products rooted in African context, materials and ideas.",
    thread: "places",
    featured: true,
    media: {
      alt: "ELEvated furniture piece",
      placeholder: "ELEvated product photograph — asset required",
      monogram: "EL",
      tone: "sand",
    },
  },
  {
    id: "tea",
    name: "The Effective Architect",
    shortName: "TEA",
    category: "Architecture Education & Media",
    description:
      "Education and media for architects and built-environment professionals who want to learn, grow and practise well.",
    thread: "knowledge",
    featured: true,
    media: {
      alt: "The Effective Architect",
      placeholder: "TEA brand imagery — asset required",
      monogram: "TEA",
      tone: "olive",
    },
  },
  {
    id: "speaking-engagements",
    name: "Speaking",
    category: "Talks & Conversations",
    description:
      "Talks on architecture, climate-responsive design, African cities, design, entrepreneurship and the built environment.",
    thread: "knowledge",
    featured: false,
    anchor: "#speaking",
  },
  {
    id: "research-writing",
    name: "Research & Writing",
    category: "Ideas, Research & Media",
    description: "Crystal's own research, writing and media on architecture and the ideas behind it.",
    thread: "knowledge",
    featured: false,
    anchor: "#ideas",
  },
  {
    id: "ako-alliance",
    name: "AKO Alliance",
    category: "Education & Opportunity",
    description: "Widening access to education and opportunity for children and young people.",
    thread: "people",
    featured: false,
  },
  {
    id: "alive-and-free",
    name: "Alive and Free",
    category: "Christian Youth Movement",
    description:
      "A Christian youth movement centred on truth, healing, freedom, identity, purpose and life in Christ.",
    thread: "people",
    featured: false,
  },
];

export function initiativesByThread(thread: ThreadId): Initiative[] {
  return initiatives.filter((initiative) => initiative.thread === thread);
}

export function getInitiative(id: string): Initiative | undefined {
  return initiatives.find((initiative) => initiative.id === id);
}
