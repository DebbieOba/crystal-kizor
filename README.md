# Crystal Kizor — Personal Brand Website

A single-page website that acts as the front door to Crystal Kizor's ecosystem — architect, designer, entrepreneur, speaker and researcher — and her initiatives: Studio COKA, ELEvated, The Effective Architect (TEA), AKO Alliance, Alive and Free, Speaking, and her own research and writing.

The page is built to let a first-time visitor answer four questions in seconds: **who is Crystal, what does she do, what is she building, and where should I go next?**

## Product thinking

The brief's central risk is seven initiatives reading as seven unrelated businesses. The page answers it with one organising idea:

> **One person → three threads → seven expressions.**

| Thread | Expressions |
| --- | --- |
| 01 Places & objects | Studio COKA, ELEvated |
| 02 Knowledge | The Effective Architect, Speaking, Research & Writing |
| 03 People | AKO Alliance, Alive and Free |

That model is introduced as a hairline "ecosystem map" (Positioning), then expanded section by section. Hierarchy is deliberate: Crystal is always the largest brand; featured initiatives get image-led treatments; the rest are typographic entries. See [DECISIONS.md](DECISIONS.md).

### Page flow

| # | Section | Visitor question | Primary action |
| --- | --- | --- | --- |
| — | Hero + ecosystem index | Who is Crystal? | Explore the work · Invite Crystal to speak |
| 01 | Positioning / map | How does it fit together? | Jump to any initiative |
| 02 | Ecosystem | What is she building? | Visit / enquire per initiative |
| 03 | Selected work | What has she made? | More from the initiative |
| 04 | Ideas | What does she think? | Discuss research or writing |
| 05 | Speaking | Can I invite her? | Invite Crystal to speak |
| 06 | About | Who is behind this? | — |
| 07 | What brings you here? | What do I do next? | Four intent-based routes |

## Technology

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) + React 19 | Static prerendering, image/font optimisation, metadata API, room to grow |
| Language | TypeScript (strict) | Typed content model; no `any` |
| Styling | CSS Modules + design tokens in `app/globals.css` | Full art-direction control, zero runtime cost |
| Fonts | `next/font` — Instrument Serif + Inter | Self-hosted, no layout shift, no third-party requests |
| Motion | Native CSS (scroll-driven `view()` timeline, keyframes) | No animation library; respects `prefers-reduced-motion` |
| Analytics | Provider-agnostic `lib/analytics.ts` (+ optional GA4) | One delegated listener; no vendor lock-in |
| Testing | Playwright | End-to-end checks of the flows that matter |
| Hosting | Vercel | Zero-config for Next.js, global CDN |

Runtime dependencies: `next`, `react`, `react-dom` — nothing else.

## Architecture

```
app/                 Route, metadata, robots, sitemap, OG image, 404
components/
  layout/            Header (sticky + accessible small-screen menu), Footer, Analytics
  sections/          Hero, Positioning, Ecosystem, SelectedWork, Ideas, Speaking, About, FinalCTA
  ecosystem/         InitiativeFeature (image-led), InitiativeEntry (typographic)
  ui/                Container, SectionHeading, Button, ArrowLink, Media, Pending
data/                Typed content: site facts, initiatives & threads, work, ideas, speaking, intents
lib/                 analytics (events), enquiry (intent-tagged links), cn
public/images/       Asset folders per initiative (empty until assets are supplied)
tests/e2e/           Playwright specs
```

- **Content is separate from presentation.** Every initiative, topic, work slot and CTA lives in `data/`. Components render whatever the data describes, so content can move to a CMS later without rewriting UI.
- **Server components by default.** Only `Header` (menu state) and `Analytics` (listeners) ship JavaScript. Sections declare analytics with `data-track` attributes instead of client-side handlers.
- **Fully static.** Every route prerenders at build time (`○ Static`).

### Adding real assets

No photographs or logos were supplied with the brief, so every image slot renders a labelled placeholder plate (e.g. `[Crystal portrait — asset required]`). To replace one:

1. Put the file in `public/images/<initiative>/`.
2. Set `src` on the matching `MediaAsset` in `data/` (e.g. `site.portrait.src = "/images/crystal/portrait.jpg"`).
3. Optionally set `focus` (CSS `object-position`) for art-directed cropping.

`Media` then renders an optimised `next/image` (AVIF/WebP, responsive `sizes`, hero preloaded, the rest lazy-loaded). Any remaining placeholder can be found with the selector `[data-placeholder]`.

## Running locally

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Purpose | When empty |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, robots | Falls back to Vercel production URL, then `http://localhost:3000` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Enquiry address; CTAs become pre-subjected `mailto:` links | CTAs route to the contact section; enquiry routes show a "pending" marker |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID | No third-party script loads; events still fire as DOM events |

Never commit `.env.local`; `.env.example` documents the variables.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run check` | Type-check + lint + production build |
| `npm run test:e2e` | Build, then run Playwright (Chrome, Edge, 375px small-screen) |
| `CROSS_BROWSER=1 npm test` | Also run Firefox and WebKit (Safari engine) |

First-time test setup: `npx playwright install chromium` (add `firefox webkit` for cross-browser runs).

## Testing

`tests/e2e/home.spec.ts` covers: no console errors · SEO metadata, JSON-LD, robots, sitemap, OG image · one `h1` and no skipped heading levels · unique ids and no broken in-page links · descriptive link text · image alt text · no horizontal overflow at 375–1440px · desktop navigation reaches each section · small-screen menu (open, Escape, focus return, scroll lock, close on selection) · skip link · hero and intent CTAs · analytics events · branded 404.

## Analytics

Events (typed in `lib/analytics.ts`): `page_view`, `nav_click`, `hero_cta_click`, `ecosystem_view`, `speaking_view`, `initiative_click`, `initiative_external_click`, `work_item_click`, `speaking_cta_click`, `contact_click`, `email_click`, `social_click`, `scroll_25/50/75/90`, `web_vitals`.

Each event carries only a label and page location, never personal data. Funnel: hero understood → ecosystem viewed → initiative clicked → intent chosen → enquiry. With GA4 configured, `send_page_view` is disabled so page views are not double counted.

## Performance

- Fully static HTML from the CDN; only two small client components hydrate.
- Self-hosted, subset fonts with `display: swap`; no third-party requests unless GA4 is enabled.
- The LCP element is the hero headline. It animates with `transform` only and is never hidden.
- Images (when supplied): AVIF/WebP, responsive `sizes`, hero preloaded, the rest lazy-loaded. Fixed aspect-ratio frames prevent layout shift.
- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1. They are measured in production through `web_vitals` events.

## Deployment

1. Push the repository to GitHub.
2. Import it in Vercel; the framework preset is detected automatically.
3. Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` and (optionally) `NEXT_PUBLIC_GA_ID`.
4. Deploy, then verify metadata, OG preview, robots/sitemap and analytics on the live URL.

## Before launch

See [CONTENT.md](CONTENT.md) for copy that needs Crystal's sign-off and the full list of required assets, and [RESEARCH.md](RESEARCH.md) for what could and could not be verified.

## Future improvements

- Real photography, logos and verified initiative URLs
- Project detail and article content (via a headless CMS when volume justifies it)
- Speaking enquiry form with server-side validation and spam protection
- Newsletter, and the TEA Career & Practice Copilot (AI proposal in the spec)
