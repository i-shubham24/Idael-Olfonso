# Idael Alfonso: design system

Matte black, high end, quiet. The site sells one person, Idael Alfonso, to a small private clientele in Switzerland. Shared data lives in `src/content/site.js`, words in `src/content/copy/de.js` and `en.js`.

## Concept: the bezel

A black ceramic watch bezel with gold edges is the signature object. It stands for a planned, private session: minute marks around the ring, Idael's name engraved on it. It appears in the hero (the camera flies through its opening), rolls under the services strip, turns on each service page, draws itself in the loader, and the cursor is a small version of it.

## Tokens

Colour
- `onyx` `#0A0A0B` page base, with a fine grain so the black reads as matte
- `onyx-2` `#111113` and `graphite` `#19191C` raised blocks, inputs, cards
- `line` `#2A2A2E` hover state for filled blocks (never used as a divider)
- `ivory` `#ECE8E0` text and the main button
- `stone` `#8F8B84` secondary text
- `gold` `#B89A67` and `gold-2` `#D2B98A` the only accent: italic words, small labels, focus ring, active states

Type
- Display and headings: Cormorant Garamond, light, sentence case.
- Body and interface: Archivo, with small tracked capitals for labels and buttons.
- Serif numbers use lining figures.

Shape: 2 px corners on buttons, blocks, inputs and images. No pill shapes.

Separation: spacing and background tone only. No divider lines or rules.

Photography: one warm black and white grade on every image. Idael himself, never stock, wherever he appears. Keep his head in frame: photos zoom from the top edge instead of sliding.

Video: short, muted loops of Idael, only playing while on screen. Light studio clips get `.video-grade`; behind text they get `.video-dark`.

Language switch: two square flags in one control (Swiss for German, British for English), the active one in colour.

## Writing

- Plain, natural sentences. No slogans, no "X, not Y" lines, no stacked one word sentences.
- No dashes or hyphens in visible text. Ranges use "to".
- Section labels only where they help: the hero, the service kicker, booking status.
- Italic gold words sparingly: the hero, the booking title, the closing section.

## Motion

- Slow, smooth easing (expo out), long durations, small distances.
- Every animation explains something: the bezel fly through opens the story, the rolling bezel tracks the service in view, the step number rolls as you read.
- Headings rise out of a mask the first time they scroll into view.
- Buttons fill with gold from the left on hover; service photos tilt toward the pointer.
- The booking confirmation draws a small bezel and a check.
- Pinned, scroll driven sections work on phones and tablets too, not only on desktop.
- `prefers-reduced-motion`: no smooth scroll, no pins, still 3D, no autoplay, native cursor, instant page changes.
