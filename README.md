# Idael Alfonso: private training website

A scroll driven, matte black website for Idael Alfonso, private trainer in Switzerland, with online booking. Built with React and Vite on the code base of the earlier KNURL gym demo.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173. For a production build: `npm run build`, then `npm run preview` to check it.

## Change the content

Almost everything is in `src/content/site.js`. Lines marked `PLACEHOLDER` are demo content for the pitch and must be confirmed with the client.

| What | Where in `site.js` |
|---|---|
| Name, hero headline, manifesto, bezel engraving | `brand` |
| Email, phone, WhatsApp, city | `contact` |
| Biography, credentials, languages, principles, portraits | `about` |
| Services (one page each at `/services/:slug`) | `services` |
| How it works, step by step | `method` |
| Where sessions take place | `locations` |
| Bookable hours, notice, how far ahead | `availability`, `availabilitySummary` |
| What can be booked | `sessionTypes` |
| Testimonials | `testimonials` |
| Ways to work together, and whether prices are shown | `engagements`, `showFees` |
| Questions | `faqs` |

Writing rules for this site: no dashes or hyphens in visible text, plain sentences, no slogans.

### Photos

Photos are free Unsplash images used as placeholders. To use the client's photos, put them in `public/photos/` and replace the id with the path, for example `image: '/photos/idael-portrait.jpg'`. Every photo gets the same warm black and white grade (`.photo-grade` in `src/styles/index.css`).

### Booking

`/book` has three steps: session type, date and time (a month calendar and one simple time selector), details. All times are Swiss time. It ends with an add to calendar file.

Until a backend is connected it runs in demo mode: availability is generated from `availability` in `site.js` and nothing is sent. To go live, set `VITE_BOOKING_API` to a backend (for example a serverless function in front of the Cal.com API) that answers `GET /slots?type=&from=&to=` and `POST /bookings`. See `src/lib/booking.js`, and allow that host in the `connect-src` of `vercel.json`.

## What is on the site

- Loader (first visit): a bezel draws itself while the minutes count to sixty.
- Hero: a matte black and gold 3D bezel (Three.js) that leans toward the pointer. Scrolling brings it to the centre, opens a photo inside it and flies the camera through, then the manifesto reads in word by word.
- Meet Idael: portrait reveal, credentials, and a marquee of his session types.
- Services: a sideways scrolling strip; the bezel rolls along the bottom and its engraving changes to the service above it. Swipe rail on phones.
- How it works: five steps; the step number rolls over like a watch date as you scroll.
- Where you train, what clients say (drag rail), ways to work together (selector), questions, then an ivory closing section where the name rises out of the page.
- Pages: About, one page per service, Book, Privacy, Imprint, 404.
- A custom cursor shaped like a small bezel that turns as you move, an hour dial in the nav that tracks scroll progress, matte page transitions and smooth scrolling (Lenis with GSAP ScrollTrigger).

Separation between elements uses spacing and background tone only: no divider lines and no pill shapes.

## Tech

React 19, Vite 7, React Router 7, Tailwind CSS 4, GSAP with ScrollTrigger, Lenis, Motion, Three.js with React Three Fiber, Phosphor icons, Cormorant Garamond and Archivo (self hosted).

## Project map

```
src/
  content/site.js      all client content
  pages/               Home, About, Service, Book, Legal, NotFound
  sections/home/       home page sections
  components/          nav, footer, loader, cursor, buttons, monogram
  three/               the 3D bezel, its engraving, lighting, dust, scenes
  lib/                 smooth scroll, page transitions, time zone, booking, calendar file
  styles/index.css     design tokens and global styles
PLAN-IDAEL-ALFONSO.md  the transformation plan
```

## Accessibility and performance

- `prefers-reduced-motion` is respected: no smooth scroll, no pins, a still bezel, instant page changes, native cursor.
- Visible keyboard focus, skip link, real radio inputs and labels in forms, inline errors.
- 3D only renders while on screen and loads as a separate chunk.

## Deploy

Works on Vercel or Netlify out of the box. Build command `npm run build`, output folder `dist`.
