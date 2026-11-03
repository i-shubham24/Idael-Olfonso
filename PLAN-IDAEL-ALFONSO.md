# Idael Alfonso: transformation plan

How we turn the KNURL gym template in this folder into a premium private training website for Idael Alfonso (current site: okyfit.com).


## 1. The client brief, restated

| # | Requirement (from the client) | What it means for the build |
|---|---|---|
| R1 | Full rework of the main website | New brand, new content, new design system. Nothing from okyfit.com's look survives. |
| R2 | Idael Alfonso is the main person | It is a personal brand site, not a gym or app. Every page sells him: his story, his method, his presence. |
| R3 | Calendar system so people can book appointments with him | A real booking flow with live availability, confirmations, reminders and calendar sync. This is the core feature. |
| R4 | Matte black, high end design | Dark, quiet, editorial. Serif display type, lots of space, slow motion, one restrained metallic accent. |
| R5 | Must not look like a cheap service; he trains high end network people | No discounts, no "free trial", no "cancel anytime", no price cards up front. Discretion, exclusivity, by-appointment tone. |

What okyfit.com does today that contradicts the brief (and must go):
- Leads with CHF 17 / 47 / 167 subscription tiers and a 7 day free trial (R5).
- Idael is a small "Meet the trainer" block lower on the page (R2).
- Light grey template look, generic "Start Now" buttons (R4).
- No way to book him (R3).


## 2. What we have in this folder

KNURL Strength Club: a React 19 + Vite 7 + Tailwind 4 site with GSAP ScrollTrigger, Lenis smooth scroll, Motion and Three.js. It's built for a big group-class gym in Bengaluru.

Strengths we keep:
- **All content lives in one file**: `src/content/site.js`. Components read from it, so a rebrand is mostly data.
- **High quality motion engine**: Lenis + GSAP pinned scroll, word-by-word reveals, page transitions (`lib/transition.jsx`), magnetic buttons, image reveals. Premium sites live on this.
- **A working 3 step booking UI** (`pages/Join.jsx`): validation, accessible radios, animated steps and an add-to-calendar `.ics` file. It's demo only, with no backend.
- **Time zone logic** (`lib/time.js`, `lib/ics.js`): already does "club time", so we switch it to `Europe/Zurich`.
- **Accessibility and performance**: reduced motion support, focus states, skip link, lazy 3D, GPU fallback.
- **Deploy and security**: `vercel.json` with a strict CSP and security headers.

What's wrong for this client:
- **The whole concept is a powerlifting gym**: barbell plates, plate colours as intensity, "rubber" floor texture, a loader that loads a barbell, 3D bumper plates.
- **Group class model**: weekly timetable, capacity and "spots left", "Today on the floor", facility zones and 1,800 m² of floor.
- **Loud industrial typography**: Archivo stretched to width 125, weight 900, all caps.
- **Multi-coach structure**: 4 coaches. Idael is one person.
- **Price model**: ₹ monthly memberships with billing discounts.

**Verdict:** keep the engine and the craft, replace the concept. Roughly 60% of the code (infrastructure, motion, layout patterns, booking UI) is reused. 100% of the visual identity and content is new. The 3D plate system is removed.


## 3. Brand and design direction (R4, R5)

### Positioning
- **Name:** "IDAEL ALFONSO" as the primary wordmark, with a line like *Private Training · Zürich*. OkyFit becomes either a secondary label for his online programme or is retired. *Needs client decision (Q1).*
- **Tone:** quiet confidence. Short sentences. No exclamation marks, no hype, no "transform your life".
- **Voice examples:**
  - Hero: *"Private training for people who don't have time to waste."*
  - CTA: *"Request a consultation"* (never "Start now" or "Join").
  - Pricing: *"Engagements are tailored. Fees are shared after the consultation."*

### Design tokens (replace `@theme` in `src/styles/index.css`)

| Token | Value | Use |
|---|---|---|
| `onyx` | `#0A0A0B` | page base (matte black, not pure #000) |
| `onyx-2` | `#111113` | alternate sections |
| `graphite` | `#1A1A1D` | raised surfaces, inputs, cards |
| `hairline` | `#2A2A2E` | thin 1px rules (fine in luxury, unlike KNURL's no-rules rule) |
| `ivory` | `#EDE9E1` | primary text |
| `stone` | `#8F8B84` | secondary text (check AA on onyx) |
| `champagne` | `#B89A67` | the single accent: focus ring, active states, small details. Max ~3% of any screen. |

- **Matte finish:** keep the `Grain` layer but tune it finer and subtler (opacity ~0.035). That's what makes black read as matte instead of flat digital.
- **Photography:** keep the `.photo-grade` idea but make it a deeper monochrome with crushed blacks and a slight warm tone. Black and white photography of Idael is the single biggest premium signal. Drop the colour-on-hover.
- **Typography:**
  - Display: a high-contrast serif, e.g. *Cormorant Garamond* or *Bodoni Moda* (self-hosted via @fontsource, like Archivo now). Light/regular weights, large sizes, sentence case.
  - Body and UI: a refined sans, e.g. *Inter Tight* or *Manrope*, 16 to 18 px, generous leading.
  - Small labels: tracked uppercase sans at 11 to 12 px (allowed here; KNURL banned it).
  - Remove Archivo and all `font-stretch` utilities.
- **Shape:** sharp corners stay (0 to 2 px). Buttons are thin outlined or solid ivory rectangles, never pills.
- **Layout:** more air than KNURL. Section padding of 160 to 240 px on desktop, max text width 56ch, asymmetric 12-column grid kept.
- **Motion:** slow it down. Ease-out-expo already exists. Durations of 0.9 to 1.4 s, small distances, opacity plus slight blur or mask reveals. No bouncing, rolling or magnetic gimmicks on primary CTAs.
- **Logo:** monogram "IA" (or the existing crown Ö if they keep OkyFit). Needed in SVG. *Asset (A1).*

### What gets removed visually
Plate colours (`p25`, `p20`…), `PlateGlyph`, `knurl-pattern`, the yellow focus ring, the barbell loader, all Three.js scenes, uppercase wide headings.


## 4. New sitemap

```
/                     Home
/about                Idael: story, credentials, philosophy
/services/:slug       One page per service (reuses Program.jsx)
/book                 Booking flow (reuses Join.jsx, real backend)
/book/confirmed       Confirmation (or an in-flow state)
/privacy              Privacy policy (Swiss nFADP / GDPR)
/imprint              Impressum (expected for Swiss/EU sites)
*                     404 (restyled)
```
Removed: `/timetable`.

Optional, pending Q2: `/online` for the existing CHF 17/47/167 online programme, kept off the main navigation so it doesn't cheapen the private offer.

Navigation: `About · Services · Method · Book` plus a language switch and a "Request a consultation" button.


## 5. Home page: section by section (reuse map)

| # | New section | Purpose | Built from |
|---|---|---|---|
| 1 | **Intro loader** (first visit) | Monogram fades in, a fine champagne line draws, then the page opens. 1.2 s max. | `components/Loader.jsx`: replace barbell/plates with SVG monogram stroke |
| 2 | **Hero** | Full-bleed B&W video or photo of Idael training a client. Name set large in serif. One line. One CTA. | `sections/home/Hero.jsx`: keep the pinned structure and word reveal; delete `HeroScene` (3D plate) and the fly-through-the-hole effect, replace with a slow scale/mask reveal of the image |
| 3 | **Philosophy statement** | 2 to 3 sentences on his approach, revealed word by word on scroll | Manifesto scrub already inside `Hero.jsx` (`.word` reveal) |
| 4 | **Services** | Private 1:1, Duo, At home / hotel, Performance & Latin conditioning, Online coaching | `sections/home/Programs.jsx`: keep the pinned horizontal pan; remove the rolling 3D plate; each panel is a large photo, title and one line |
| 5 | **About teaser** | Portrait plus credentials: Swiss Academy of Fitness and Sports, prestigious Swiss sports centres, his Latin energy. Links to /about | New, simple split layout. Reuse `Img` reveal |
| 6 | **The method** | How an engagement works: Consultation → Assessment → Personal plan → Sessions → Review | Reuse the session timeline component from `pages/Program.jsx` (timed sequence bar) |
| 7 | **Where we train** | Private studio, client's residence, hotel gym, outdoors, online | `sections/home/Floor.jsx` bento, cut to 4 or 5 cells; remove the live open/closed status |
| 8 | **Client voices** | 3 to 5 discreet testimonials ("Founder, Zürich", initials only) | `sections/home/LiftLogs.jsx` drag carousel; remove the plates-on-bar drawing |
| 9 | **Engagements** | "How would you like to work with Idael?" selector morphing one panel: Single sessions, 10 session series, Monthly retainer. Price shown as "From CHF X" or "On request" | `sections/home/Membership.jsx` selector; remove the billing toggle and rolling price, or keep the rolling digits only if prices are shown (Q3) |
| 10 | **FAQ** | Cancellation policy, locations, languages, confidentiality, what to expect | `sections/home/Faq.jsx`: content only |
| 11 | **Closing CTA + footer** | The one theme switch, to ivory, with the large name wordmark and "Request a consultation" | `components/Footer.jsx`: keep the stretching wordmark idea but animate letter spacing/opacity, since the serif has no width axis |

Removed sections: `Today.jsx` (live class timetable) and `Coaches.jsx` (multi-coach list). The cursor-follow portrait technique from `Coaches.jsx` can be reused on the Services list if wanted.


## 6. Other pages

### /about (new)
- Long-form story: Cuban/Latin roots (to confirm), dance background, Swiss certification, years coaching at top Swiss centres.
- Credentials list, languages spoken.
- 2 to 3 large editorial photos.
- Optional "As seen in" or "Trusted by" row with logos only if the client has permission. With high-net-worth clients, discretion usually wins.

### /services/:slug (from `pages/Program.jsx`)
Keep the structure: hero, description, "who it's for", "what a session looks like" timeline, and a CTA that pre-selects this service in `/book?service=slug` (the query param logic already exists in `Join.jsx: initialState`).

Remove: plate colour hero, coach list, weekly slots from the timetable.

Add: duration, location options, "from" fee (if Q3 allows).


## 7. The booking system (R3): the core build

### 7.1 What the client needs
1. Visitors see Idael's **real availability** and pick a time.
2. Bookings land in **his calendar** (Google or Apple/iCloud, Q5) and block the slot.
3. **Confirmation and reminder** emails (and ideally WhatsApp/SMS).
4. **Reschedule and cancel** links with a policy (e.g. 24 h).
5. Optional **payment or deposit** at booking (Q4).
6. High-end touch: new clients go through a **consultation first**. Approved/returning clients can book sessions directly.

### 7.2 Recommended architecture

**Our own branded front end (the existing Join flow, restyled) and Cal.com as the scheduling engine behind it, through its API.**

```
Browser (/book, React)
   │  GET slots / POST booking
   ▼
Vercel serverless functions  (/api/slots, /api/book)   ← API keys stay server side
   │
   ▼
Cal.com (API v2)  ── syncs ──► Idael's Google/Apple calendar
   │                          (busy times block slots automatically)
   ├── sends confirmation, reminder, reschedule/cancel emails
   └── Stripe integration for paid event types (CHF)
```

Why this, and not the alternatives:
- **Plain Calendly or Cal.com embed (iframe):** fastest, but it looks like a third-party widget inside a luxury site. It breaks R4 and R5. Keep it only as a **fallback / phase 0**.
- **Fully custom scheduling (Google Calendar API + our own DB + emails + payments):** total control, but we'd rebuild time zones, double-booking guards, reminders and refunds. That's weeks of work and ongoing risk.
- **Our UI on top of the Cal.com API:** the visitor never leaves the black, branded experience. Cal.com handles calendar sync, conflicts, buffers, reminders, reschedule links and Stripe. Idael manages availability in Cal.com's app on his phone.

### 7.3 Event types to set up in Cal.com

| Event type | Length | Who can book | Payment |
|---|---|---|---|
| Private consultation (video or phone) | 20 to 30 min | Anyone | Free |
| Assessment session (in person) | 75 min | Anyone, or after consultation | Paid / deposit (Q4) |
| Private session | 60 min | Returning clients (requires confirmation, or a private link) | Paid or invoiced |
| Duo session | 60 min | Returning clients | Paid or invoiced |
| Online session | 45 to 60 min | Anyone | Paid |

Use Cal.com's **"requires confirmation"** on in-person sessions so Idael approves new people. That's exclusivity built into the system.

Buffers: 15 to 30 min between in-person sessions for travel. Minimum notice: 12 to 24 h. Booking window: 4 to 6 weeks.

### 7.4 Changes in `src/pages/Join.jsx` → `src/pages/Book.jsx`

| Current | New |
|---|---|
| Step 1 "Pick a program" from `programs` with plate glyphs | Step 1 **"Choose your session"**: event types (above), with duration, format and "complimentary"/fee note |
| Step 2 "Pick a time" from the static weekly `schedule` with capacity | Step 2 **"Choose a date and time"**: month calendar plus time list, fetched live from `/api/slots`. Loading skeleton, empty state ("No times this week, message Idael directly"). Show times in Zürich time with the visitor's local time as a hint if different. |
| Step 3 details: name, phone (10 digit rule), email, experience, notes, consent | Step 3 **"About you"**: name, email, phone (international format, drop the 10-digit India rule), preferred location (studio / my residence / hotel / online), goals, how you heard about Idael / referred by, health notes (optional), privacy consent |
|: | Step 4 (only if paid): Stripe checkout via Cal.com, then return |
| `setTimeout` demo submit | `POST /api/book`, which creates the Cal.com booking; handle "slot just taken" by going back to step 2 with a message |
| Done screen with `.ics` download and "Get directions" | Keep the done screen and `.ics` (`lib/ics.js` works as is); text says *"Request received. Idael will confirm personally within 24 hours."* for confirm-required types |
| "Prefer WhatsApp? Message the front desk" | "Prefer to speak directly? Message Idael on WhatsApp" (`contact.whatsapp`) |

Supporting changes:
- `src/content/site.js`: `timeZone = 'Europe/Zurich'`, `currency = { symbol: 'CHF', locale: 'de-CH' }`; replace `schedule` with `services` (each linked to a Cal.com event type id).
- `lib/time.js`: drop `classesFor`, `classStatus`, `openStatus` and `enrich` (class model). Keep the time zone helpers.
- New `/api/slots.js` and `/api/book.js` (Vercel functions). Secrets go in Vercel env vars: `CAL_API_KEY`, event type ids.
- `vercel.json` CSP: add `connect-src` for our own `/api` (already `self`), plus Stripe (`js.stripe.com`, `checkout.stripe.com`) if payment is in the flow. Allow the image/video host if media isn't self-hosted. Remove `images.unsplash.com` once real photos are in.
- Anti-spam: honeypot field plus Cloudflare Turnstile or rate limiting on `/api/book`.

### 7.5 Phase 0 fallback
If the client wants something live in days: put a Cal.com inline embed, themed dark with the champagne brand colour, on `/book`, and swap in the custom UI later. The URL and CTAs stay the same.


## 8. Content model: new `src/content/site.js`

```js
brand      { name: 'Idael Alfonso', short: 'IA', tagline, heroLine, philosophy }
contact    { city: 'Zürich', email, whatsapp, instagram, phone }   // no public street address unless he has a studio
timeZone   'Europe/Zurich'
currency   { symbol: 'CHF', locale: 'de-CH' }
about      { intro, story[], credentials[], languages[], portrait, gallery[] }
services   [{ slug, name, summary, description, duration, formats[], forWho[], session[], image, calEventTypeId, fee? }]
method     [{ step, title, text }]
locations  [{ id, name, detail, image }]
testimonials [{ attribution: 'Founder, Zürich', quote }]
engagements [{ id, choice, name, pitch, includes[], fromPrice? }]
faqs       [{ q, a }]
images     { hero, heroVideo, philosophy, closing }
```
Removed: `plates`, `programs`, `coaches`, `schedule`, `floor`, `liftLogs`, `billing`, `plans`, `hours`, `hoursSummary`.


## 9. File-by-file action list

| File | Action |
|---|---|
| `src/content/site.js` | **Rewrite** (new model above) |
| `src/styles/index.css` | **Rewrite tokens and type utilities**; keep base, Lenis, `.rail`, reduced motion |
| `index.html` | New title, meta description, theme-color `#0A0A0B`, OG image, `lang` per locale |
| `public/favicon.svg` | New monogram |
| `src/App.jsx` | Routes: remove `timetable`, add `about`, `services/:slug`, `book`, `privacy`, `imprint` |
| `components/Loader.jsx` | **Rework**: monogram line-draw |
| `components/Nav.jsx` | Rework: wordmark, new links, language switch, remove `LoadMeter` (barbell meter) |
| `components/MobileMenu.jsx` | Restyle, new links |
| `components/Footer.jsx` | Rework closing CTA and wordmark; add privacy/imprint links |
| `components/Button.jsx` | Restyle (outlined/solid, no magnetic on primary) |
| `components/Grain.jsx` | Keep, tune finer |
| `components/Img.jsx`, `lib/img.js` | Keep; support local `/media` paths and AVIF/WebP |
| `components/PlateGlyph.jsx`, `RollingNumber.jsx`, `LoadedBar.jsx`, `ClassRow.jsx`, `DayTabs.jsx` | **Delete** (keep `RollingNumber` only if prices are shown) |
| `src/three/*` (all 7 files), `lib/plates.js`, `lib/gpu.js` | **Delete**, remove `three` and `@react-three/fiber` from `package.json` (lighter, faster site) |
| `sections/home/Hero.jsx` | Heavy rework (no 3D, video/photo hero, keep word reveal) |
| `sections/home/Programs.jsx` → `Services.jsx` | Rework (keep horizontal pan, drop plate) |
| `sections/home/Floor.jsx` → `Locations.jsx` | Rework (bento, no open status) |
| `sections/home/LiftLogs.jsx` → `Testimonials.jsx` | Rework (carousel only) |
| `sections/home/Membership.jsx` → `Engagements.jsx` | Rework |
| `sections/home/Faq.jsx` | Restyle only |
| `sections/home/Today.jsx`, `Coaches.jsx` | **Delete** (new `AboutTeaser.jsx`, `Method.jsx`) |
| `pages/Program.jsx` → `Service.jsx` | Rework |
| `pages/Timetable.jsx` | **Delete** |
| `pages/Join.jsx` → `Book.jsx` | Rework plus real backend (section 7) |
| `pages/About.jsx`, `Privacy.jsx`, `Imprint.jsx` | **New** |
| `pages/NotFound.jsx` | Restyle |
| `lib/time.js` | Trim to time zone helpers |
| `lib/ics.js`, `lib/scroll.jsx`, `lib/transition.jsx`, `lib/reveal.js`, `lib/media.js`, `lib/useInView.js`, `lib/useFitText.js`, `lib/useDocumentTitle.js` | Keep. Transition panel colour becomes onyx/champagne instead of plate colours. |
| `api/slots.js`, `api/book.js` | **New** (Vercel functions) |
| `vercel.json` | Update CSP |
| `README.md`, `DESIGN.md` | Rewrite for the new brand |
| `dist/` | Delete; it's a build output of the old site |


## 10. Multilingual (Switzerland)
Zürich-based clientele typically expects **EN + DE** at minimum, with **FR** and **ES** optional (Q6).

Approach: `src/content/site.<lang>.js` per language plus a small `useLocale` context, with the route prefix `/de/...`. No heavy i18n library needed, since the content is already centralised. Set `<html lang>` per route and add `hreflang` tags.


## 11. Legal, privacy and trust
- Privacy policy (Swiss nFADP + GDPR) covering booking data, Cal.com, Stripe and email as processors.
- Impressum page.
- Cookie-free analytics (Plausible or Vercel Analytics) means no cookie banner, which looks cleaner and more premium.
- Health information in the booking form stays optional and is only sent to Cal.com, never stored in our code.
- Testimonials anonymised by default, with written consent from each client.


## 12. Performance targets
- Removing Three.js cuts roughly 600 KB+ of JS.
- Hero video: muted, 6 to 10 s loop, 1080p, AV1/H.264, ≤ 3 MB, poster image first, paused under reduced motion.
- Lighthouse ≥ 90 on mobile; LCP < 2.5 s.


## 13. Delivery phases

| Phase | Work | Rough effort |
|---|---|---|
| **0. Decisions and assets** | Client answers the questions in section 14; photoshoot or video brief; Cal.com account and calendar connected | Client side, 1 to 2 weeks (in parallel) |
| **1. Design system** | Tokens, fonts, grain, buttons, monogram, loader; strip 3D and plates; new routes skeleton | 2 to 3 days |
| **2. Home page** | All 11 sections with placeholder copy and moody stock images | 4 to 5 days |
| **3. Inner pages** | About, Service detail, Privacy, Imprint, 404 | 2 to 3 days |
| **4. Booking** | Cal.com event types, `/api/slots` + `/api/book`, Book.jsx rework, Stripe (if needed), emails, anti-spam, edge cases | 4 to 6 days |
| **5. Content and i18n** | Final copy (EN), translations, real photos/video, SEO meta, OG images | 2 to 4 days |
| **6. QA and launch** | Cross-browser and mobile, accessibility, Lighthouse, test bookings end to end, domain/DNS (okyfit.com or a new domain), redirects from old Wix URLs | 2 days |

Total build: about **3 to 4 weeks**, assuming assets and answers arrive on time.

Suggested client checkpoints: after Phase 1 (look and feel sign-off on a homepage hero mock), after Phase 2, and before launch.


## 14. Questions for the client (blocking items in bold)

1. **Brand name:** "Idael Alfonso" as the main brand? Keep OkyFit (and the crown logo) at all?
2. **Online programme:** do the current CHF 17/47/167 online subscriptions continue? If yes, on a separate quiet page or not on this site at all?
3. **Prices:** show "From CHF X", or "on request" only?
4. **Payment:** pay at booking, a deposit, or invoice afterwards? Cancellation policy (e.g. 24 h)?
5. **Calendar:** which calendar does Idael use daily (Google, Apple/iCloud, Outlook)?
6. **Languages:** EN + DE? FR, ES?
7. **Services list:** exact services, durations, locations (own studio? client homes? hotels? which cities?) and whether new clients must start with a consultation.
8. **Media:** do professional photos/video of Idael exist? If not, we need a shoot (B&W, editorial, low-key lighting). Brief to follow.
9. **Testimonials:** any clients willing to give an anonymised quote?
10. **Domain:** keep okyfit.com or move to e.g. idaelalfonso.com (with okyfit.com redirecting)?
11. **References:** 2 or 3 websites (any industry) whose feel they like.
12. **Updates:** will they edit content themselves? If yes we add a light CMS (e.g. Sanity or Decap) later; otherwise edits go through us via `site.js`.


## 15. Assets needed from the client

| ID | Asset |
|---|---|
| A1 | Logo / monogram preference (or approval of ours) |
| A2 | 15 to 25 high-res photos: portraits, training clients (with consent), detail shots, environments |
| A3 | 1 to 3 short video clips for the hero (horizontal, 4K if possible) |
| A4 | Bio facts: background, certifications, years of experience, notable venues |
| A5 | Services, durations, fees, policies |
| A6 | Contact channels: email, WhatsApp, Instagram |
| A7 | Legal entity details for the Impressum |
| A8 | Cal.com (or Google) account access, Stripe account if taking payments |
