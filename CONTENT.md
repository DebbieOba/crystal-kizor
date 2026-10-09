# Content Status

What is final, what needs Crystal's sign-off, and what is still required. All copy lives in `data/` unless noted.

## Content matrix

| Section | Visitor question | Content | Action |
| --- | --- | --- | --- |
| Hero | Who is Crystal? | Roles, positioning headline, intro, portrait, ecosystem index | Explore the work · Invite Crystal to speak |
| Positioning | How does it fit together? | "One body of work. Many expressions." + ecosystem map | Jump to any initiative |
| Ecosystem | What is she building? | Three threads, seven initiatives | Visit / Explore / Enquire about each |
| Selected work | What has she made? | One lead project + two supporting | More from the initiative |
| Ideas | What does she think? | Research, writing, media | Discuss research or writing |
| Speaking | Can I invite her? | Six topics from the brief | Invite Crystal to speak |
| About | Who is behind this? | Short bio, roles | — |
| What brings you here? | What do I do next? | Four visitor intents | Collaborate · Speak · Explore · Follow ideas |

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
