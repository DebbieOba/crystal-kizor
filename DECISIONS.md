# Engineering & Design Decisions

Short log of significant decisions and why they were made.

### 1. Next.js (App Router), fully static
The product is a fast content/brand page that may grow into articles, projects and AI tools. Next.js gives static prerendering, image and font optimisation, and a metadata API today, with routing and server capabilities ready for later. Every route prerenders at build time.

### 2. No backend, database or CMS for the MVP
The brief asks for a single landing page. A backend would add attack surface and complexity without improving the core outcome. Enquiries use intent-tagged `mailto:` links configured by environment variable. A form and server endpoint are a documented future step.

### 3. One organising model: one person → three threads → seven expressions
Seven initiatives in a flat grid read as a directory. Grouping them into *Places & objects*, *Knowledge* and *People* explains how they relate. A hairline "ecosystem map" makes the model visible before any detail. The grouping is a product decision, not a claim from the brief.

### 4. Deliberate, unequal hierarchy
Crystal is always the largest brand (header wordmark, hero, map root). Featured initiatives (Studio COKA, ELEvated, TEA) get image-led layouts. The rest are typographic entries. Layout is derived from data (`featured`, thread), so promoting an initiative is a data change.

### 5. Content as typed data
All initiatives, topics, work slots and CTAs live in `data/` with TypeScript types. Nothing is duplicated across components. This makes copy edits safe and a later CMS migration straightforward.

### 6. No invented facts; explicit placeholders
No assets, links, contact details or biography beyond the brief were supplied, and nothing could be verified publicly (see RESEARCH.md). Missing content renders as clearly labelled placeholders (`[… — content required]`, `data-placeholder`). Initiative links fall back to an enquiry tagged with the initiative's name, never a guessed URL.

### 7. Intent-based conversion
The final section asks "What brings you here?" and offers four routes: collaborate, invite to speak, explore, follow ideas. Each enquiry pre-fills a distinct subject so it arrives already routed and can be measured separately.

### 8. CSS Modules + design tokens; no Tailwind, no UI kit
An editorial, art-directed layout needs fine control over type, grid and hairlines. Tokens in `globals.css` (colour, type scale, 8px spacing, motion) keep the system consistent. Dark sections remap tokens via `[data-theme="inverse"]`, so components need no variants.

### 9. No animation library
Reveals use CSS scroll-driven animations (`animation-timeline: view()`) as progressive enhancement; content is always visible without them. The hero headline (LCP) animates `transform` only. Everything respects `prefers-reduced-motion`. Framer Motion would add bundle weight for no user benefit here.

### 10. Minimal client JavaScript
Only `Header` (menu state) and `Analytics` (listeners) are client components. Sections stay server-rendered and declare tracking with `data-track` attributes, handled by one delegated listener. Header scroll state is written to the DOM directly, so scrolling never re-renders React.

### 11. Provider-agnostic analytics
`track()` forwards to GA4 only when `NEXT_PUBLIC_GA_ID` is set, and always emits a DOM event (`ck:analytics`) that tests and other tools can consume. No personal data is sent.

### 12. Accessibility built in, not bolted on
Semantic landmarks and one `h1`, no skipped heading levels, a skip link, and visible focus states. Links name their destination ("Enquire about AKO Alliance"). Measured contrast ratios are noted next to each colour token. The small-screen menu supports Escape, focus return, a focus loop and scroll lock with guaranteed cleanup.

### 13. Testing focus
Playwright tests cover what would embarrass a launch: broken anchors, duplicate ids, overflow, a broken menu, missing metadata, console errors. One of these tests caught a real duplicate-id bug during development.
