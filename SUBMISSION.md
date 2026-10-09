# Stage 1 Submission — Crystal Kizor Website

- **Live site:** _[add production URL after deployment]_
- **Source code:** _[add GitHub repository URL]_

---

## 1. Thinking note

**Problem.** Crystal's work spans seven initiatives. The main risk was a page that reads like a directory of unrelated businesses.

**Structure.** I organised everything around one model: *one person, three threads, seven expressions*. Places & objects (Studio COKA, ELEvated); Knowledge (The Effective Architect, Speaking, Research & Writing); People (AKO Alliance, Alive and Free). A simple "ecosystem map" shows this model before any detail.

**Hierarchy.** Crystal is always the largest brand. Initiatives with the strongest visual work get image-led layouts; the rest are typographic. Every initiative is one click from the first screen. The page ends by asking "What brings you here?" and sends clients, event organisers, explorers and readers to different next steps.

**Design.** An editorial, architectural style: warm neutrals, one clay accent, serif headlines, thin lines instead of shadows, and gentle motion that respects reduced-motion settings.

**Technology.** Next.js and TypeScript, fully static and fast. Content lives in typed data files, separate from the layout, so it can move to a CMS later. No assets were supplied, so missing images and facts are clearly marked placeholders. Nothing is invented.

---

## 2. AI tool proposal — TEA Career & Practice Copilot

**Problem.** Architects and built-environment professionals know they want to grow, but struggle to turn a goal like "get better at project management" into a concrete plan. The Effective Architect already has the knowledge. It needs a personal way in.

**Users.** Architecture students, early-career architects and built-environment professionals.

**How it works.**
1. The user describes a goal in plain language.
2. The Copilot asks two or three short questions about career stage, current role and available time.
3. It returns a plan: skill gaps, a step-by-step learning path, the most relevant TEA resources, practical exercises and a progress checklist.
4. The user returns later, updates progress, and the plan adapts.

**Technology.** A chat interface in the existing Next.js site and a small server API, using retrieval-augmented generation (RAG) over approved TEA content. TEA articles, videos and courses are split into passages and indexed for search. Each answer is built from the retrieved passages and cites them. Answers therefore come from Crystal's own material, not from the model's general knowledge.

**MVP.** Goal input, TEA content ingestion, search over that content, cited answers, and thumbs-up/down feedback. No accounts at first; progress can be saved later.

**Risks and safeguards.**
- *Made-up answers:* answer only from retrieved TEA content and show citations; say "I don't know" when nothing relevant is found.
- *Advice treated as authoritative:* clear disclaimer; no legal, licensing or safety rulings.
- *Privacy:* collect no personal data beyond the conversation; no training on user input.
- *Outdated content:* a human reviews the content library on a schedule.

**Success measures.** Plans completed, return visits, helpful-answer rate, and clicks through to TEA resources.

---

## 3. Analytics scenario — 5,000 visitors, 5 enquiries

5 enquiries from 5,000 visitors is a 0.1% conversion rate. Before redesigning anything, I would find where visitors drop off.

**1. Check traffic quality.** Segment by source, landing page and device, and remove bots. If most visits come from social media or unrelated searches, the problem is who is arriving, not the page.

**2. Map the funnel.** The site already tracks each step: hero viewed → `ecosystem_view` → `initiative_click` → `speaking_cta_click` / `contact_click` → `email_click`. The step with the largest drop is the priority.

**3. Check the enquiry step itself.** Enquiries currently open the visitor's email app. Many visitors, especially on phones or work computers, have no email app set up, so a click can silently fail. Compare `email_click` with enquiries actually received; a big gap points to this problem. The fix is a short on-page form with a clear confirmation.

**4. Watch real behaviour.** Session recordings (e.g. Microsoft Clarity) show how far people scroll, rage clicks, and CTAs they never reach.

**5. Test one change at a time,** running each long enough to compare fairly: clearer CTA wording, a speaking CTA earlier on the page, stronger proof (real projects and testimonials), and the short form.

**How performance is measured overall:** GA4 for traffic, behaviour and conversions; Search Console for search visibility; Core Web Vitals reported from real visitors.
