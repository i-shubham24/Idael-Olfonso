# Idael Alfonso: plan for the client's new flow

**Status (November 2026): built.** The flow below is live in the prototype, with two changes agreed since: prices were removed (Idael pitches in person after the first meeting, no payments online) and a showreel of Idael in motion was added after Meet Idael. Still open: the client's original photos and videos, the live calendar connection, real contact details, testimonials and legal texts.

What has to change on the current site so it follows the flow the client asked for: pain points first, then Idael, then why him, then the booking calendar, then everything else.

## 1. What the client told us

| Input | What it means for the site |
|---|---|
| OkyFit was the company Idael worked under. This is his own brand, on his own name. | No OkyFit name, logo or link anywhere. The site is "Idael Alfonso". Own domain (for example idaelalfonso.ch). |
| He trains very wealthy people in Switzerland: gym, diet and more. | Nutrition has to be part of the offer, not only training. The tone stays private, calm and expensive. |
| Ultra classy, modern and interactive. | Keep the matte black and gold system, the bezel, the scroll motion. Every new section gets its own scroll interaction. |
| A calendar so people can book appointments with him. | Booking moves onto the home page, so nobody has to leave the page to book. The /book page stays for direct links. |
| Flow: pain points, then the trainer, then why choose him, then the calendar, then more. | The home page order changes, and two sections are new (pain points and why Idael). |

## 2. The home page today

Hero, Meet Idael, Services, How it works, Where you train, What clients say, Ways to work together, Questions, closing section and footer. Booking only exists on its own page.

What already fits and stays: the hero with the bezel fly through, Meet Idael, the services strip with the rolling bezel, How it works, locations, testimonials, prices, questions, footer, the cursor, the booking engine and its calendar.

What is missing: pain points, a clear "why Idael" section, nutrition, and booking on the home page.

## 3. The new home page, section by section

| # | Section | Status | Built from | What it does |
|---|---|---|---|---|
| 1 | Hero | Rework copy | `Hero.jsx` | Same bezel and fly through. The "Book a free consultation" button scrolls down to the calendar on the same page. |
| 2 | Bridge line | Rework | Manifesto inside `Hero.jsx` | The line that reads in after the fly through leads into the pain points: "Most of Idael's clients come to him for the same few reasons." |
| 3 | Pain points | **New** | `PainPoints.jsx`, scroll pattern from `Method.jsx` | See 3.1 |
| 4 | Meet Idael | Move up, trim | `Trainer.jsx` | Portrait, short story, credentials. The marquee moves down to sit before Services. |
| 5 | Why Idael | **New** | `WhyIdael.jsx`, selector from `Engagements.jsx` | See 3.2 |
| 6 | Book a time | **New on home** | Booking components taken out of `Book.jsx` | See 3.3 |
| 7 | Services | Keep, add nutrition | `Services.jsx` | Adds "Nutrition Coaching" so the offer covers gym and diet. Marquee of service names sits just above. |
| 8 | How it works | Keep | `Method.jsx` | Five steps, step number rolls as you scroll. |
| 9 | Where you train | Keep | `Locations.jsx` | Home, hotel, studio, outdoors, online. |
| 10 | What clients say | Keep | `Testimonials.jsx` | Real quotes needed before launch. |
| 11 | Ways to work together | Keep | `Engagements.jsx` | Prices stay "on request" unless the client wants them shown. |
| 12 | Questions | Keep, add three | `Faq.jsx` | New questions on diet, travel and privacy. |
| 13 | Closing section and footer | Keep | `Footer.jsx` | Button scrolls to the calendar on the home page. |

### 3.1 Pain points (new)

Heading: "Sound familiar?"

Six problems his clients actually have, each with the answer Idael gives. Draft copy, to be checked with him:

| The problem | What Idael does about it |
|---|---|
| Training is the first thing that gets cancelled when the diary fills up. | Sessions are booked around your week, early mornings and evenings included, and moved when your plans move. |
| A different city every week, and the routine never survives the trip. | Online sessions and a hotel gym plan keep the programme going while you travel. |
| Business lunches and dinners decide what you eat. | A nutrition plan built for restaurants and travel, not for a perfect week at home. |
| Long days at a desk and long flights show up in your back, neck and hips. | Mobility and Body Flow sessions built into every programme. |
| Gyms are crowded, and you would rather not be recognised. | Training at home, in a private studio or in a hotel gym, with no photos and no names. |
| Trainers who give everyone the same workout. | One written plan for you, reviewed every six weeks with measurements. |

Interaction: on desktop the section pins. One problem at a time is set large in the serif. As you keep scrolling, its words dim and the answer types in underneath in gold, then the next problem slides up. A counter on the side ("2 of 6") and the bezel engraving style marks progress. On phones it becomes a stack of cards: the problem, then the answer, revealed as each card enters.

### 3.2 Why Idael (new)

Heading: "Why clients choose Idael"

Six reasons, each with something concrete behind it:

1. Training and nutrition in one plan, from one person.
2. He comes to you: home, hotel, office gym, outdoors, or online when you are away.
3. Swiss qualified (Swiss Academy of Fitness and Sports) and leading programmes at top Swiss sports centres.
4. A small client list, so there is always time to prepare and room to reschedule.
5. Complete discretion, with a confidentiality agreement if you want one.
6. Sessions people enjoy. His Latin dance background keeps the energy high.

Interaction: a comparison you can flip. Two tabs, "A typical gym or trainer" and "With Idael", built on the same sliding selector as the prices section. Each of the six rows changes its text when you switch, so the difference is obvious without a table full of ticks. On desktop, a portrait of Idael sits beside it and shifts slightly with the pointer.

### 3.3 Book a time (new on the home page)

Heading: "Book your first conversation"

The full booking flow (session, date and time, details) runs inside the home page, opening on the free consultation by default. Every booking button on the home page scrolls here instead of loading a new page.

How: move `Calendar`, `TimeSelect`, the three steps and the confirmation out of `pages/Book.jsx` into `src/components/booking/`, wrapped in one `BookingFlow` component. `pages/Book.jsx` and the new home section both use it, so there is one booking system to maintain. The engine in `lib/booking.js` does not change.

Still demo mode until the live calendar is connected (section 6).

## 4. Other changes

| Area | Change |
|---|---|
| Navigation | Links become: About, Why Idael, Services, Prices, and a Book button that scrolls to the calendar on the home page. Same in the mobile menu. |
| Services | New `Nutrition Coaching` service with its own page: food plan, restaurant and travel guidance, check ins. |
| Questions | Add: "Do you help with diet as well?", "What happens when I travel?", "Can sessions be kept confidential?" (merge with the existing one). |
| About page | Add a short line on nutrition and lifestyle, so it matches the home page. |
| Branding | Confirm nothing references OkyFit. Page titles and the meta description say "Idael Alfonso, private trainer in Switzerland". |
| Copy rules | No dashes or hyphens, plain sentences, no slogans. Labels only where they help. |
| Design rules | No divider lines, no pill shapes, separation by spacing and background tone, gold only as the accent. |

## 5. Files

| File | Action |
|---|---|
| `src/content/site.js` | Add `painPoints`, `reasons`, `comparison`, the nutrition service, new FAQs; rewrite the hero and bridge lines |
| `src/sections/home/PainPoints.jsx` | New |
| `src/sections/home/WhyIdael.jsx` | New |
| `src/sections/home/BookSection.jsx` | New, wraps `BookingFlow` |
| `src/components/booking/*` | New: `BookingFlow`, `Calendar`, `TimeSelect`, steps, confirmation (moved from `Book.jsx`) |
| `src/pages/Book.jsx` | Slimmed down to the page shell around `BookingFlow` |
| `src/pages/Home.jsx` | New section order |
| `src/sections/home/Hero.jsx` | Copy, button scrolls to `#book` |
| `src/sections/home/Trainer.jsx` | Marquee moved out into its own small section |
| `src/components/Nav.jsx`, `MobileMenu.jsx`, `Footer.jsx` | New links, booking buttons scroll to `#book` |

## 6. Booking: what is needed to make it real

The calendar, time selector and form work today, but nothing is sent. To take real bookings:

1. Idael's calendar (Google, Apple or Outlook) connected to Cal.com.
2. Session types set up there (free consultation, assessment, sessions).
3. A small server function between the site and Cal.com, so keys stay private.
4. Decide on payment: pay when booking, a deposit, or an invoice afterwards (Stripe, in CHF).

## 7. Order of work

| Step | Work | Time |
|---|---|---|
| 1 | Content: pain points, reasons, nutrition, FAQs in `site.js` | half a day |
| 2 | Pain points section with its scroll interaction | 1 day |
| 3 | Why Idael section with the comparison | 1 day |
| 4 | Booking moved into `BookingFlow`, home booking section, scroll links | 1 day |
| 5 | New order, nav, nutrition service page, FAQ | half a day |
| 6 | Testing on phone, tablet and desktop, reduced motion, build | half a day |

About four and a half days. Connecting the live calendar comes after, once the client has a Cal.com account.

## 8. Questions for the client

1. Which problems do new clients mention most? We will use his words in the pain points section.
2. What exactly does the diet side include: a written meal plan, regular check ins, working with a private chef?
3. Is nutrition sold on its own, or only together with training?
4. Can we name the sports centres where he leads programmes, or keep it general?
5. Which calendar does he use every day, and how should payment work?
6. Prices on the site or only on request?
7. Languages: English and German at launch, French later?
8. Domain name, and photos or video of Idael (we still use stock images).
9. Two or three clients willing to give an anonymous quote.
