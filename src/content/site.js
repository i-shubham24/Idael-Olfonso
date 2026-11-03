/*
  ============================================================
  CLIENT CONTENT: edit this file to change the whole site.
  ============================================================
  Everything about Idael's offer lives here: name, contact
  details, services, availability, locations, testimonials,
  engagements, FAQs and photos.

  Lines marked PLACEHOLDER are demo content written for the
  pitch. Replace them with the client's confirmed details
  before launch.

  Writing rules for this site: no dashes or hyphens in visible
  text, plain sentences, no slogans.

  Photos: each `image` can be either
    - an Unsplash photo id like 'photo-1643142313112-3b9faa5dc015', or
    - a full URL ('https://...') or a path in /public ('/photos/idael-portrait.jpg').
  Drop the client's own photos into /public/photos and point to them.
*/

export const brand = {
  name: 'Idael Alfonso',
  short: 'IA',
  role: 'Private trainer',
  region: 'Switzerland',
  // Hero headline: the second part is set in italic.
  headline: 'Private training,',
  headlineEm: 'by appointment.',
  // Engraved around the 3D bezel in the hero.
  engraving: 'IDAEL ALFONSO  ·  PRIVATE TRAINING  ·  SWITZERLAND  ·  ',
  subline:
    'Personal training at your home, your hotel or a private studio. Planned around your week and coached one to one by Idael himself.',
  manifesto:
    'Every session is planned before you arrive. Idael knows your numbers, your injuries and your calendar, and he adjusts the plan to how you feel that day.',
}

// PLACEHOLDER: confirm every contact detail with the client.
export const contact = {
  city: 'Zürich',
  area: 'Zürich and Central Switzerland',
  phone: '+41 79 000 00 00',
  whatsapp: '41790000000',
  email: 'private@idaelalfonso.com',
  instagram: 'https://instagram.com/',
}

// Idael's own time zone. Booking times are always shown in this zone.
export const timeZone = 'Europe/Zurich'

export const currency = { symbol: 'CHF', locale: 'de-CH' }

export const about = {
  portrait: 'photo-1612150672144-9f07b4d0fdb5',
  standing: 'photo-1733231291539-a1b0305c210a',
  gallery: ['photo-1741211699653-5e90542f9cda', 'photo-1766910275320-d7c03647a9eb'],
  intro:
    'Idael holds a diploma in Personal Training from the Swiss Academy of Fitness and Sports and leads fitness programmes at some of the best known sports centres in Switzerland.',
  story: [
    'Idael grew up dancing. It gave him rhythm, balance and a feel for how people move, and it is still part of how he trains clients today.',
    'He works with a small group of private clients, most of them with full diaries and little patience for wasted time. Keeping the group small means he can prepare properly for every session and stay flexible when plans change.',
    'Expect to work hard and to understand why you are doing each exercise. Most clients also say they leave a session with more energy than they arrived with.',
  ],
  credentials: [
    { title: 'Diploma in Personal Training', detail: 'Swiss Academy of Fitness and Sports' },
    { title: 'Programme lead', detail: 'Leading sports centres in Switzerland' },
    { title: 'Dance and movement', detail: 'Latin dance and body flow, used in his conditioning work' },
  ],
  // PLACEHOLDER: confirm languages.
  languages: ['English', 'German', 'Spanish'],
  principles: [
    {
      title: 'Your privacy',
      text: 'No photos, no names and nothing on social media unless you ask for it. A confidentiality agreement is available if you need one.',
    },
    {
      title: 'A written plan',
      text: 'You get a programme built around your calendar, your travel and any injuries, and you see it before the first session.',
    },
    {
      title: 'Sessions you enjoy',
      text: 'Hard work goes better with good energy. Idael brings both, and that is usually why clients stay for years.',
    },
  ],
}

/*
  Services. Each one has its own page at /services/:slug and can be booked
  at /book?type=:slug. `session` is the minute by minute shape of one session.
*/
export const services = [
  {
    slug: 'private',
    name: 'Private Training',
    kicker: 'One to one',
    summary: 'Strength, conditioning and mobility in one session, built around your goals.',
    description:
      'The core of what Idael does. Your programme runs in six week blocks and changes with your schedule, your travel and how you feel on the day. Train at home, at your hotel, in a private studio or outdoors.',
    duration: 60,
    format: 'One to one',
    where: 'Studio, home, hotel or outdoors',
    image: 'photo-1643142313112-3b9faa5dc015',
    forWho: [
      'You want progress you can measure',
      'Your calendar changes from week to week',
      'You would rather have one trainer who knows your history',
    ],
    session: [
      { name: 'Check in', minutes: 5 },
      { name: 'Mobility', minutes: 10 },
      { name: 'Strength', minutes: 25 },
      { name: 'Conditioning', minutes: 12 },
      { name: 'Cool down', minutes: 8 },
    ],
  },
  {
    slug: 'duo',
    name: 'Duo Sessions',
    kicker: 'For two',
    summary: 'Train with your partner or a friend. One session, two programmes.',
    description:
      'You train together and each of you follows your own programme. It works well for couples and friends with different goals who still want to spend the hour together.',
    duration: 60,
    format: 'Two people',
    where: 'Studio, home or hotel',
    image: 'photo-1648542036561-e1d66a5ae2b1',
    forWho: [
      'You train better with someone next to you',
      'You and your partner have different goals',
      'You want a regular hour together',
    ],
    session: [
      { name: 'Check in', minutes: 5 },
      { name: 'Warm up', minutes: 10 },
      { name: 'Strength', minutes: 22 },
      { name: 'Partner circuit', minutes: 15 },
      { name: 'Cool down', minutes: 8 },
    ],
  },
  {
    slug: 'latin-conditioning',
    name: 'Latin Conditioning',
    kicker: 'Signature session',
    summary: 'Intervals, footwork and music. Conditioning built on Latin dance.',
    description:
      'Idael’s own format. Short intervals set to music, footwork drills and full body movement that raise your heart rate quickly. You do not need any dance experience, only good shoes.',
    duration: 50,
    format: 'One to one or duo',
    where: 'Studio, home or hotel',
    image: 'photo-1774966425655-7b632a38702e',
    forWho: [
      'You get bored on a treadmill',
      'You want your fitness back quickly',
      'You like music when you train',
    ],
    session: [
      { name: 'Warm up', minutes: 8 },
      { name: 'Footwork', minutes: 10 },
      { name: 'Intervals', minutes: 20 },
      { name: 'Core', minutes: 7 },
      { name: 'Cool down', minutes: 5 },
    ],
  },
  {
    slug: 'body-flow',
    name: 'Body Flow',
    kicker: 'Mobility and recovery',
    summary: 'Mobility, breathing and slow strength for stiff backs and tired legs.',
    description:
      'Useful after long flights and long days at a desk. Each session works through the joints one by one, adds breathing and finishes with slow, controlled strength work. Many clients add one a week to their training.',
    duration: 45,
    format: 'One to one',
    where: 'Studio, home, hotel or online',
    image: 'photo-1741211699653-5e90542f9cda',
    forWho: [
      'You feel stiff after travel or meetings',
      'You are coming back from an injury',
      'You want to sleep and recover better',
    ],
    session: [
      { name: 'Breathing', minutes: 5 },
      { name: 'Joint prep', minutes: 10 },
      { name: 'Mobility flow', minutes: 20 },
      { name: 'Recovery', minutes: 10 },
    ],
  },
  {
    slug: 'online',
    name: 'Online Coaching',
    kicker: 'While you travel',
    summary: 'Live video sessions and a written plan that works in any hotel gym.',
    description:
      'For clients who spend a lot of time away. You train live with Idael by video, follow a plan that needs very little equipment and check in with him once a week.',
    duration: 45,
    format: 'Live video',
    where: 'Anywhere with a good connection',
    image: 'photo-1611672585731-fa10603fb9e0',
    forWho: [
      'You are away more than you are home',
      'You want the same trainer wherever you are',
      'You often train with little equipment',
    ],
    session: [
      { name: 'Check in', minutes: 5 },
      { name: 'Warm up', minutes: 8 },
      { name: 'Main block', minutes: 22 },
      { name: 'Finisher', minutes: 6 },
      { name: 'Review', minutes: 4 },
    ],
  },
]

/* How working with Idael starts, shown as "How it works" on the home page. */
export const method = [
  {
    title: 'Consultation',
    text: 'A free 20 minute call about your goals, your training history, your schedule and where you would like to train.',
  },
  {
    title: 'Assessment',
    text: 'Your first session. Idael tests how you move, how strong you are and how quickly you recover.',
  },
  {
    title: 'Your plan',
    text: 'A written programme built around your calendar, your travel and any injuries. You see it before training starts.',
  },
  {
    title: 'Training',
    text: 'Sessions at your home, your hotel, a private studio or outdoors, at times that suit you.',
  },
  {
    title: 'Review',
    text: 'Every six weeks you go through the results together and the plan is adjusted for the next block.',
  },
]

export const locations = {
  headline: 'Where you train',
  intro: 'Idael comes to you, or you meet him at a private studio. Either way it is just the two of you.',
  zones: [
    {
      id: 'studio',
      name: 'Private studio',
      detail: 'A fully equipped studio, booked for one client at a time.',
      image: 'photo-1770513649465-2c60c8039806',
    },
    {
      id: 'residence',
      name: 'Your home',
      detail: 'Idael brings the equipment. You only need a little space.',
      image: 'photo-1640357897497-599b4fc84f51',
    },
    {
      id: 'hotel',
      name: 'Hotels and private gyms',
      detail: 'Hotel gyms and residential clubs across Switzerland.',
      image: 'photo-1758448756350-3d0eec02ba37',
    },
    {
      id: 'outdoors',
      name: 'Outdoors',
      detail: 'By the lake or in the park when the weather is good.',
      image: 'photo-1791362795879-399d563981f1',
    },
    {
      id: 'online',
      name: 'Online',
      detail: 'Live video sessions when you are away.',
      image: 'photo-1611672585731-fa10603fb9e0',
    },
  ],
}

/*
  Booking. These are the times Idael can be booked (Swiss time).
  0 = Monday ... 6 = Sunday. Until the live calendar is connected, the
  booking page generates demo availability from these windows.
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

export const availabilitySummary = [
  { label: 'Monday to Friday', value: '6:00 to 21:00' },
  { label: 'Saturday', value: '8:00 to 13:00' },
  { label: 'Sunday', value: 'On request' },
]

/*
  What can be booked. The consultation is where new clients start.
  `confirm: true` means Idael confirms the request personally.
*/
export const sessionTypes = [
  {
    id: 'consultation',
    name: 'Free consultation',
    duration: 20,
    format: 'Video or phone',
    note: 'The place to start if you have not trained with Idael before.',
    confirm: false,
    places: ['Video call', 'Phone call'],
  },
  {
    id: 'assessment',
    name: 'Assessment',
    duration: 75,
    format: 'In person',
    note: 'Your first session: movement, strength and fitness tests.',
    confirm: true,
    places: ['Private studio', 'My home', 'Hotel or private gym'],
  },
  ...services.map((s) => ({
    id: s.slug,
    name: s.name,
    duration: s.duration,
    format: s.format,
    note: s.summary,
    confirm: true,
    places: s.slug === 'online' ? ['Video call'] : ['Private studio', 'My home', 'Hotel or private gym', 'Outdoors'],
  })),
]

// PLACEHOLDER: demo quotes for the pitch. Replace with real testimonials, shared with permission.
export const testimonials = [
  {
    quote:
      'I have had trainers in three countries. Idael is the first one who fits the sessions around my calendar instead of the other way round.',
    attribution: 'Founder',
    place: 'Zürich',
    focus: 'Strength training',
  },
  {
    quote: 'He comes to the house at six and we are done by seven. I feel the difference for the rest of the day.',
    attribution: 'Private banker',
    place: 'Zug',
    focus: 'Early sessions at home',
  },
  {
    quote: 'My wife and I book Latin Conditioning every Saturday. It is the only cardio either of us has ever looked forward to.',
    attribution: 'Entrepreneur',
    place: 'Lucerne',
    focus: 'Duo sessions',
  },
  {
    quote: 'After my knee operation he rebuilt my training step by step and never rushed it. I am stronger now than before.',
    attribution: 'Surgeon',
    place: 'Basel',
    focus: 'Back from injury',
  },
  {
    quote: 'I travel two weeks a month. With the online sessions I keep the same trainer in London, Dubai and at home.',
    attribution: 'Executive',
    place: 'Geneva',
    focus: 'Online coaching',
  },
]

/*
  Ways to work together. Set `showFees` to true to show prices; otherwise
  the site says fees are discussed in the consultation.
  PLACEHOLDER: fees are examples only.
*/
export const showFees = false

export const engagements = [
  {
    id: 'single',
    choice: 'Single sessions',
    name: 'Single sessions',
    fee: 180,
    unit: 'per session',
    pitch: 'Book a session whenever your week allows. Good if you travel a lot.',
    includes: ['Free consultation', 'Assessment before the first session', 'Studio, home, hotel or outdoors', 'Free rescheduling up to 24 hours before'],
  },
  {
    id: 'series',
    choice: 'Ten session block',
    name: 'Ten session block',
    fee: 1650,
    unit: 'for ten sessions',
    pitch: 'Ten sessions over six weeks, with a written plan and a review at the end.',
    featured: true,
    includes: ['Everything in single sessions', 'Written six week programme', 'Review with measurements', 'First choice of times'],
  },
  {
    id: 'retainer',
    choice: 'Monthly',
    name: 'Monthly coaching',
    fee: 1900,
    unit: 'per month',
    pitch: 'Two or three sessions a week, online sessions while you travel and help with food and recovery.',
    includes: ['Two or three sessions a week', 'Online sessions when you are away', 'Nutrition and recovery advice', 'Direct contact on WhatsApp'],
  },
]

export const faqs = [
  {
    q: 'Do I need to be fit to start?',
    a: 'No. The assessment shows where you are today and the plan starts from there. Some clients have never trained before and some compete.',
  },
  {
    q: 'Where do sessions take place?',
    a: 'At your home, your hotel or private gym, outdoors, or at a private studio. Online sessions work anywhere with a good connection.',
  },
  {
    q: 'How does booking work?',
    a: 'New clients start with a free consultation, which you can book online. After that you book sessions directly. All times are Swiss time.',
  },
  {
    q: 'What if I need to cancel?',
    a: 'You can move or cancel a session free of charge up to 24 hours before. Later than that, the session is charged.',
  },
  {
    q: 'Is everything confidential?',
    a: 'Yes. No photos, no names and nothing on social media without your written consent. A confidentiality agreement is available on request.',
  },
]

export const images = {
  // Seen through the bezel in the hero, then full screen behind the manifesto.
  manifesto: 'photo-1526506118085-60ce8714f8c5',
}
