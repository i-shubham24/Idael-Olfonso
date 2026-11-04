# Idael Alfonso: private training website

A scroll driven, matte black and gold website for Idael Alfonso, private trainer in Zürich. German first, with an English version. Its job is to reach new clients and get them to book a free first conversation; everything else Idael agrees with them in person. Built with React and Vite on the code base of the earlier KNURL gym demo.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173. For a production build: `npm run build`, then `npm run preview` to check it.

## Settings

`.env` holds two values:

| Name | What it is |
|---|---|
| `VITE_SITE_URL` | The public address of the site, used for link previews and search engines. PLACEHOLDER: `https://www.idaelalfonso.ch` until the domain is chosen. Also update `public/robots.txt` and `public/sitemap.xml`. |
| `VITE_BOOKING_API` | The booking backend. Empty means demo mode (see Booking). |

## Change the content

Words and data are kept apart:

| File | What is in it |
|---|---|
| `src/content/site.js` | Everything that is the same in both languages: contact details, photos and videos, service durations, availability, ids. |
| `src/content/copy/de.js` | All German text (Swiss spelling, formal "Sie"). The main language. |
| `src/content/copy/en.js` | All English text. Same shape as the German file. |

Lines marked `PLACEHOLDER` are prototype content and must be confirmed or replaced by the client: contact details, testimonials, legal texts, photos and videos.

Writing rules: no dashes or hyphens in visible text, plain sentences, no slogans, short texts.

### Languages

German for visitors whose browser asks for German, English for everyone else. The flag switch in the navigation (and in the mobile menu) changes it, and the choice is remembered. Logic: `src/lib/i18n.jsx`.

### Photos and videos

- Photos can be an Unsplash id, a full URL or a path in `/public`.
- Idael's own photos are in `public/media/ig/`, saved from his Instagram for the prototype. Replace them with the original files.
- Videos (`videos` in `site.js`) are currently Idael's two clips streamed from the OkyFit site. Before launch, put the final files in `public/videos/` and point to them, for example `'/videos/idael-core.mp4'`. Phones get a lighter 480p version automatically.
- Every photo gets the same warm black and white grade (`.photo-grade` in `src/styles/index.css`); videos use `.video-grade` or `.video-dark`.

### Booking

The calendar is on the home page (`#book`) and on `/book`. Three steps: appointment (free consultation or meeting in person), date and time (month calendar and a time dropdown in Swiss time), details. No payments.

Until a backend is connected it runs in demo mode: availability is generated from `availability` in `site.js` and nothing is sent. To go live, set `VITE_BOOKING_API` to a backend (for example a serverless function in front of the Cal.com API connected to Idael's calendar) that answers `GET /slots?type=&from=&to=` and `POST /bookings`. See `src/lib/booking.js`, and allow that host in the `connect-src` of `vercel.json`.

## The home page, in order

1. **Hero**: a 3D bezel that leans toward the pointer. Scrolling flies the camera through it into a clip of Idael training, then a short line reads in.
2. **Pain points**: six problems with Idael's answer. The section pins; each photo wipes over the last and the number rolls over.
3. **Meet Idael**: a clip of him dancing, credentials, and a marquee of his sessions.
4. **Idael in motion**: a full width showreel that opens as you scroll in; click or use the arrows to switch clips.
5. **Why Idael**: six large figures that roll up from zero, next to his photo.
6. **Book a time**: the booking flow.
7. **Services**: a strip that pans sideways while the bezel rolls underneath, engraved with the service in view.
8. **How it works**: five steps, the step number rolls as you read.
9. **Where you train**, **What clients say**, **Questions**, then an ivory closing section where the name rises out of the page.

Other pages: About, one page per service, Book, Privacy, Imprint, 404.

Everywhere: a cursor shaped like a small bezel (black on light surfaces), headings that rise into view, gold hover fill on buttons, an hour dial in the navigation that tracks scroll progress, matte page transitions and smooth scrolling (Lenis with GSAP ScrollTrigger). The pinned sections work on phones and tablets too.

## Tech

React 19, Vite 7, React Router 7, Tailwind CSS 4, GSAP with ScrollTrigger, Lenis, Motion, Three.js with React Three Fiber, Phosphor icons, Cormorant Garamond and Archivo (self hosted).

## Project map

```
src/
  content/site.js          shared content (both languages)
  content/copy/de.js, en.js all visible words
  pages/                   Home, About, Service, Book, Legal, NotFound
  sections/home/           home page sections
  components/              nav, footer, loader, cursor, buttons, video, reveal, tilt
  components/booking/      the booking flow (home page and /book)
  three/                   the 3D bezel, its engraving, lighting, dust, scenes
  lib/                     i18n, smooth scroll, page transitions, time zone, booking, calendar file
  styles/index.css         design tokens and global styles
public/media/ig/           Idael's photos (placeholders from Instagram)
PLAN-V2-CLIENT-FLOW.md     the plan for the client's flow
DESIGN.md                  design system
```

## Accessibility and performance

- `prefers-reduced-motion`: no smooth scroll, no pins, a still bezel, no autoplay, native cursor, instant page changes.
- Visible keyboard focus, skip link, real radio inputs and labels in forms, inline errors. The time dropdown works with the arrow keys, Enter and Escape.
- Text contrast is AA or better.
- Videos only play while on screen; 3D only renders while on screen and loads as a separate chunk.

## Deploy

Works on Vercel or Netlify. Build command `npm run build`, output folder `dist`. Security headers are in `vercel.json`.
