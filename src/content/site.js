/*
  ============================================================
  SHARED CONTENT: everything that is the same in every language.
  ============================================================
  Photos, contact details, durations, availability and ids live
  here. All visible words live in the language files:
    src/content/copy/de.js  (German, the main language)
    src/content/copy/en.js  (English)
  Both files have exactly the same shape.

  Lines marked PLACEHOLDER are demo content for the prototype.
  The client will supply real photos, details and quotes.

  Photos: each `image` can be either
    - an Unsplash photo id like 'photo-1643142313112-3b9faa5dc015', or
    - a full URL ('https://...') or a path in /public ('/photos/idael-portrait.jpg').
*/

export const brand = {
  name: 'Idael Alfonso',
  short: 'IA',
}

// PLACEHOLDER: confirm every contact detail with the client.
export const contact = {
  phone: '+41 79 000 00 00',
  whatsapp: '41790000000',
  email: 'private@idaelalfonso.com',
  instagram: 'https://www.instagram.com/idael_fit/',
  instagramHandle: '@idael_fit',
  // Public follower count on Instagram (November 2026).
  followers: '186K',
}

// Idael's own time zone. Booking times are always shown in this zone.
export const timeZone = 'Europe/Zurich'

/*
  PLACEHOLDER: Idael's own clips, streamed from the OkyFit site (Wix) for the
  prototype. Before launch, replace with the client's final videos in
  /public/videos (for example '/videos/idael-core.mp4').
*/
export const videos = {
  // Core work with a medicine ball, 10.8 s, light studio backdrop.
  core: '24a38b_f7da36fdf8fc4973877ce327bbffa82e',
  // Dance and footwork, 7.6 s, light studio backdrop.
  dance: '24a38b_cb3eb53eb78b418081c1a1680bec7790',
}

export const images = {
  // Professional shoot from the OkyFit site (PLACEHOLDER until the client sends originals).
  closing: '/media/okyfit/idael-stretch.jpg',
  host: '/media/okyfit/idael-laugh.jpg',
  // Shown behind the "Where" word in the menu.
  manifesto: 'photo-1526506118085-60ce8714f8c5',
  why: '/media/ig/idael-hiit.jpg',
  book: 'photo-1643142313112-3b9faa5dc015',
}

/*
  PLACEHOLDER: photos of Idael saved from his Instagram (@idael_fit) for the
  prototype. Replace with the original, full resolution files from the client.
*/
export const about = {
  // Casual selfie, used small next to the booking form.
  portrait: '/media/ig/idael-portrait.jpg',
  // Zurich Film Festival red carpet.
  standing: '/media/ig/idael-zff.jpg',
  gallery: ['/media/ig/idael-hiit.jpg', '/media/ig/idael-dance.jpg'],
}

/*
  PLACEHOLDER: more covers from Idael's public Instagram (@idael_fit), saved at
  the size Instagram shows them (about 360 x 640). Replace with original files.
*/
// Real sessions with clients, shown with the client quotes.
export const clientPhotos = [
  '/media/ig/idael-duo-jumps.jpg',
  '/media/ig/idael-client-class.jpg',
  '/media/ig/idael-studio-duo.jpg',
  '/media/ig/idael-group-dance.jpg',
]

// The running gallery: Idael training. `tag` picks the caption, `wide` a landscape frame.
export const wall = [
  { image: '/media/ig/idael-hiit.jpg', tag: 'hiit' },
  { image: '/media/okyfit/idael-dance-class.jpg', tag: 'group', wide: true },
  { image: '/media/ig/idael-solo-dance.jpg', tag: 'footwork' },
  { image: '/media/okyfit/idael-gym-portrait.jpg', tag: 'strength', wide: true },
  { image: '/media/ig/idael-high-knees.jpg', tag: 'knees' },
  { image: '/media/ig/idael-dance-night.jpg', tag: 'night' },
  { image: '/media/ig/idael-dance.jpg', tag: 'rhythm' },
  { image: '/media/ig/idael-portrait.jpg', tag: 'offduty' },
]

/* The problems people bring to Idael (text in the language files). */
export const pains = [
  { id: 'time', image: 'photo-1634746827413-125b8a9c8eea' },
  { id: 'travel', image: 'photo-1742175615285-d7b5c0d7cf2d' },
  { id: 'dining', image: 'photo-1731941465921-eb4285693713' },
  { id: 'desk', image: 'photo-1573748616237-0ae070127575' },
  { id: 'gyms', image: 'photo-1689877020200-403d8542d95d' },
  { id: 'energy', image: 'photo-1758520144705-b39e11ff32e3' },
]

/*
  Services. Each has a page at /services/:slug. `session` is the length of
  each block of one session in minutes (block names are in the language files).
*/
export const services = [
  { slug: 'private', duration: 60, image: '/media/ig/idael-strength.jpg', photo: '/media/ig/idael-hiit.jpg', hero: '/media/okyfit/idael-mat.jpg', heroFocus: '34% 30%', session: [5, 10, 25, 12, 8] },
  { slug: 'latin-conditioning', duration: 50, image: 'photo-1774966425655-7b632a38702e', video: 'dance', photo: '/media/ig/idael-dance-night.jpg', hero: '/media/okyfit/idael-dance-class.jpg', heroFocus: '48% 25%', session: [8, 10, 20, 7, 5] },
  { slug: 'nutrition', duration: 45, image: 'photo-1703793578040-07e1778b6b2c', session: [10, 15, 15, 5] },
  { slug: 'online', duration: 45, image: 'photo-1611672585731-fa10603fb9e0', photo: '/media/ig/idael-portrait.jpg', hero: '/media/okyfit/idael-gym-portrait.jpg', heroFocus: '49% 15%', session: [5, 8, 22, 6, 4] },
]

export const locations = [
  { id: 'studio', image: 'photo-1770513649465-2c60c8039806' },
  { id: 'residence', image: 'photo-1640357897497-599b4fc84f51' },
  { id: 'hotel', image: 'photo-1758448756350-3d0eec02ba37' },
  { id: 'outdoors', image: '/media/ig/idael-outdoor-class.jpg' },
  { id: 'online', image: 'photo-1611672585731-fa10603fb9e0' },
]

/*
  Booking. Only first appointments are booked online; everything else is
  agreed with Idael in person. No payments on the site.
  0 = Monday ... 6 = Sunday, Swiss time. Until the live calendar is
  connected, the booking page generates demo availability from these windows.
*/
export const availability = {
  week: [
    { day: 0, from: '06:00', to: '12:00' },
    { day: 0, from: '15:00', to: '21:00' },
    { day: 1, from: '06:00', to: '12:00' },
    { day: 1, from: '15:00', to: '21:00' },
    { day: 2, from: '06:00', to: '12:00' },
    { day: 2, from: '15:00', to: '21:00' },
    { day: 3, from: '06:00', to: '12:00' },
    { day: 3, from: '15:00', to: '21:00' },
    { day: 4, from: '06:00', to: '12:00' },
    { day: 4, from: '15:00', to: '19:00' },
    { day: 5, from: '08:00', to: '13:00' },
  ],
  stepMinutes: 30,
  minNoticeHours: 12,
  daysAhead: 42,
}

/* What can be booked. `confirm: true` means Idael confirms the request personally. */
export const sessionTypes = [
  { id: 'consultation', duration: 20, confirm: false, places: ['video', 'phone'] },
  { id: 'meeting', duration: 45, confirm: true, places: ['studio', 'home', 'hotel'] },
]
