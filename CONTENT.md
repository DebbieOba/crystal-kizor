# Content Status

What is final, what needs Crystal's sign-off, and what is still required. All copy lives in `data/` unless noted.

## Needs validation (creative direction, not from the brief)

| Where | Copy |
| --- | --- |
| Hero headline (`data/site.ts`) | "Building better ways for people, places and ideas to thrive." |
| Hero intro (`data/site.ts`) | "…one practice, expressed in many forms." |
| Positioning (`Positioning.tsx`) | "Architecture is where Crystal's work begins, not where it ends…" |
| Thread names & summaries (`data/initiatives.ts`) | Places & objects · Knowledge · People |
| Studio COKA description | "…from first sketch to finished space…" |
| Speaking intro (`Speaking.tsx`) | Invitation to keynotes, panels and conversations |
| Section headlines | "Ideas, built." · "Thinking that travels beyond the studio." · "Conversations about how we build — and who we build for." |

## Required before launch

| Item | Where it goes |
| --- | --- |
| Enquiry email | `NEXT_PUBLIC_CONTACT_EMAIL` |
| Production domain | `NEXT_PUBLIC_SITE_URL` |
| Hero portrait of Crystal | `site.portrait.src` |
| Secondary portrait (About) | `site.aboutPortrait.src` |
| Studio COKA, ELEvated, TEA imagery | `initiatives[].media.src` |
| Official initiative URLs | `initiatives[].href` |
| Initiative logos (optional) | `initiatives[].logo` |
| 3 selected projects: name, location, year, photo | `data/content.ts` → `work` (set `pending: false`) |
| Latest research / writing / media pieces | `data/content.ts` → `ideaStreams[].latest` |
| Extended biography, credentials, recognition | `About.tsx` (replace the pending marker) |
| Social profiles (if any) | Footer; tracked as `social_click` |

To find anything still missing in the browser, run `document.querySelectorAll('[data-placeholder]')`.
