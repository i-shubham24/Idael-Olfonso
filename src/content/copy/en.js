/*
  English copy. Same shape as de.js. Keep it short: no dashes or hyphens,
  plain sentences, no slogans.
*/
const en = {
  lang: 'en',
  locale: 'en-GB',

  meta: {
    title: 'Idael Alfonso | Private trainer in Zürich',
    description:
      'Personal training and nutrition with Idael Alfonso in Zürich. At your home, private studio, outdoors or online. Book a free first consultation.',
  },

  brand: {
    role: 'Private trainer',
    area: 'Zürich and Central Switzerland',
  },

  nav: {
    about: 'About',
    services: 'Training',
    places: 'Where',
    book: 'Book',
    menu: 'Menu',
    close: 'Close',
    home: 'Home',
    skip: 'Skip to content',
    language: 'Language',
    appointment: 'By appointment only',
  },


  hero: {
    headline: 'Private training|in Zürich',
    subline: 'Training and nutrition, one to one, around your calendar.',
    cta: 'Book your free session',
    note: 'Free, 20 minutes, no obligation.',
    scroll: 'Scroll down',
    aside: 'Training, nutrition, recovery',
  },


  pains: {
    title: 'Sound familiar?',
    lead: 'Most people come to Idael for one of three reasons.',
    leadA: 'Most people come to Idael',
    leadB: 'for one of three reasons.',
    card: { title: 'Free first session', text: 'Twenty minutes by phone or video. No obligation.' },
    answerLabel: 'With Idael',
    featured: ['time', 'desk', 'energy'],
    items: {
      time: { problem: 'Training is the first thing you cancel.', answer: 'Flexible sessions that fit your daily schedule.' },
      travel: { problem: 'Constantly busy, always on the go.', answer: 'In-person or guided online sessions keep you on track.' },
      dining: { problem: 'No time to cook, eating on the run.', answer: 'A realistic nutrition plan built for your real routine.' },
      desk: { problem: 'Long hours sitting, stiff neck and back.', answer: 'Targeted mobility and posture relief in every workout.' },
      gyms: { problem: 'Crowded gyms, waiting for equipment, no guidance.', answer: 'Focused personal training in a private studio or at home.' },
      energy: { problem: 'Tired by the afternoon, low on energy.', answer: 'Training, nutrition and recovery unified in one plan.' },
    },
  },


  trainer: {
    kicker: 'The trainer',
    title: 'Meet Idael',
    intro: 'Cuban roots, Swiss qualified. He trains a small group of private clients in Zürich and plans their training and food together.',
    credentials: [
      { title: 'Diploma in Personal Training', detail: 'Swiss Academy of Fitness and Sports' },
      { title: 'Programme lead', detail: 'Leading sports centres in Switzerland' },
      { title: 'Latin Dance and HIIT', detail: 'Creator of the workouts 186K people follow' },
    ],
    cta: 'His story',
  },

  gallery: {
    kicker: 'On Instagram',
    title: 'Idael in training',
    intro: (n) => `From his Instagram, where ${n} people follow his workouts.`,
    prev: 'Previous',
    next: 'Next',
    labels: {
      hiit: 'HIIT',
      footwork: 'Latin footwork',
      knees: 'Conditioning',
      night: 'Dance night',
      rhythm: 'Rhythm',
      strength: 'Strength floor',
      group: 'Group class',
      offduty: 'Off duty',
    },
  },

  why: {
    kicker: 'Why Idael',
    title: 'What clients notice first',
    facts: [
      { value: '1:1', label: 'Every session is just you and Idael. No groups, no handovers.' },
      { value: '2 in 1', label: 'Training and nutrition in one plan, so both pull the same way.' },
      { value: '5', label: 'Places to train, your home and the lakeside included.' },
      { value: '186K', label: 'People follow his training on Instagram.' },
      { value: '0', label: 'Photos or names shared without your written consent.' },
      { value: 'CH', label: 'Swiss qualified and based in Zürich.' },
    ],
  },



  bookSection: {
    title: 'Book your free session',
    intro: 'Twenty minutes by phone or video. Tell Idael your goal and he takes it from there.',
  },

  services: {
    kicker: 'Training',
    title: 'Ways to train',
    intro: 'Four ways to work with Idael. Each one starts with a free first session.',
    prev: 'Previous',
    next: 'Next',
    session: 'Session',
    format: 'Format',
    see: 'See the session',
    items: {
      private: {
        name: 'Private Training',
        kicker: 'One to one',
        summary: 'Strength, conditioning and mobility, one to one or as a pair.',
        description:
          'Structured training blocks that adapt to your schedule, your fitness level and how you feel on the day. At home, in a private studio, outdoors or online.',
        format: 'One to one',
        where: 'Studio, home, outdoors or online',
        forWho: ['You want steady progress you can measure', 'You need flexible times that fit your week', 'You want personal guidance and accountability'],
        session: ['Check in', 'Mobility', 'Strength', 'Conditioning', 'Cool down'],
      },
      nutrition: {
        name: 'Nutrition Coaching',
        kicker: 'Food and recovery',
        summary: 'A practical nutrition plan that fits your family, work and daily routine.',
        description:
          'Sustainable habits for eating at home, dining out and busy weekdays. Built together with your training, so both pull in the same direction.',
        format: 'One to one, in person or by video',
        where: 'Anywhere',
        forWho: ['You want healthy eating without extreme diets', 'You juggle work, family and fitness', 'You want energy that lasts all day'],
        session: ['Check in', 'Review', 'Plan', 'Next steps'],
      },
      'latin-conditioning': {
        name: 'Latin Conditioning',
        kicker: 'Signature session',
        summary: 'Intervals, footwork and music, from Latin dance.',
        description: 'Short intervals set to music and full body movement. No dance experience needed, only good shoes.',
        format: 'One to one or duo',
        where: 'Studio, home, outdoors or online',
        forWho: ['Treadmills bore you', 'You want your fitness back quickly', 'You like music when you train'],
        session: ['Warm up', 'Footwork', 'Intervals', 'Core', 'Cool down'],
      },
      online: {
        name: 'Online Coaching',
        kicker: 'Train anywhere',
        summary: 'Live video sessions and a tailored plan you can follow anywhere.',
        description: 'Train live with Idael by video and keep consistent progress with whatever equipment you have.',
        format: 'Live video',
        where: 'Anywhere',
        forWho: ['You want flexible workouts from home or on the go', 'You want the same dedicated trainer anywhere', 'You prefer working out in your own space'],
        session: ['Check in', 'Warm up', 'Main block', 'Finisher', 'Review'],
      },
    },
  },

  method: {
    kicker: 'How it works',
    title: 'From first call to first review',
    items: [
      { title: 'Free call', text: 'Twenty minutes about your goals and your week.' },
      { title: 'Assessment', text: 'How you move, how strong you are, how you recover.' },
      { title: 'Your plan', text: 'Training and food, written around your calendar.' },
      { title: 'Training', text: 'At home, in a private studio, outdoors or online.' },
      { title: 'Review', text: 'Every six weeks, with measurements.' },
    ],
  },

  // PLACEHOLDER: demo quotes. Replace with real ones, shared with the client's permission.
  clients: {
    kicker: 'Past clients',
    title: 'In their words',
    note: 'Names withheld, as they prefer.',
    prev: 'Previous',
    next: 'Next',
    items: [
      { quote: 'The first trainer who fits around my calendar, not the other way round.', who: 'Architect', place: 'Zürich' },
      { quote: 'Six in the morning at home, done by seven. I feel the energy all day.', who: 'Software engineer', place: 'Zug' },
      { quote: 'Latin Conditioning is the only workout my partner and I look forward to.', who: 'Teacher', place: 'Lucerne' },
      { quote: 'With a busy job and a family, his guidance kept me consistent.', who: 'Project manager', place: 'Geneva' },
    ],
  },


  locations: {
    kicker: 'Places',
    title: 'Where you train',
    intro: 'Idael comes to you. Just the two of you, always.',
    featured: ['studio', 'residence', 'outdoors', 'online'],
    zones: {
      studio: { name: 'Private studio', detail: 'One client at a time.' },
      residence: { name: 'Your home', detail: 'Idael brings the equipment.' },
      hotel: { name: 'Partner gym or workplace', detail: 'Across Switzerland.' },
      outdoors: { name: 'Outdoors', detail: 'By the lake when the weather is good.' },
      online: { name: 'Online', detail: 'When you are away.' },
    },
  },

  availabilitySummary: [
    { label: 'Monday to Friday', value: '6:00 to 21:00' },
    { label: 'Saturday', value: '8:00 to 13:00' },
    { label: 'Sunday', value: 'On request' },
  ],


  faq: {
    kicker: 'FAQ',
    title: 'Questions',
    intro: 'Anything else? Message Idael on',
    items: [
      { q: 'Do I need to be fit to start?', a: 'No. The assessment shows where you are and the plan starts there.' },
      { q: 'Do you help with diet as well?', a: 'Yes. Nutrition is part of the plan, with practical guidance for family meals, dining out and busy workdays.' },
      { q: 'What happens when I travel or have a busy week?', a: 'Sessions continue online, or you get an adapted workout you can do anywhere with minimal gear.' },
      { q: 'How does the first appointment work?', a: 'Book a free consultation below. Everything else is agreed with Idael in person.' },
      { q: 'Is everything confidential?', a: 'Yes. No photos, no names, nothing on social media without your written consent.' },
    ],
  },

  booking: {
    steps: ['Your goal', 'Date and time', 'Your details'],
    goalTitle: 'What is your goal?',
    goalHint: 'Pick the closest one. You can tell Idael more on the call.',
    goalOptions: {
      strength: 'Get stronger',
      weight: 'Lose weight',
      move: 'Move without pain',
      energy: 'More energy, less stress',
    },
    typeTitle: 'Choose your appointment',
    typeHint: 'Not sure? Start with the free consultation.',
    startHere: 'Start here',
    min: 'min',
    chooseTime: 'Choose a time',
    types: {
      consultation: { name: 'Free consultation', format: 'Phone or video', note: 'Your goals, your week and how Idael can help.' },
      meeting: { name: 'Meet in person', format: 'Studio, home or outdoors', note: 'A first meeting and a short movement check.' },
    },
    places: {
      video: 'Video call',
      phone: 'Phone call',
      studio: 'Private studio',
      home: 'My home',
      hotel: 'Workplace or partner gym',
    },
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    timesAvailable: (n) => `${n} times available`,
    unavailable: 'unavailable',
    checking: 'Checking availability',
    legend: 'Marks today. Faded days are fully booked.',
    timeTitle: 'Choose a date and time',
    timeIntro: (name, minutes) => `${name}, ${minutes} minutes. Swiss time.`,
    chooseDay: 'Choose a day',
    loadError: 'Availability could not be loaded. Please try again, or message Idael on WhatsApp.',
    noneThisMonth: 'No times left this month. Try the next month.',
    startTime: 'Start time',
    timesFree: (n) => `${n} ${n === 1 ? 'time' : 'times'} free on this day`,
    until: 'until',
    swissTime: 'Swiss time',
    parts: ['Morning', 'Afternoon', 'Evening'],
    back: 'Back',
    addDetails: 'Add your details',
    detailsTitle: 'Your details',
    detailsNote: 'Only Idael sees these.',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    phoneHint: 'For a reminder the day before.',
    where: 'Where would you like to meet?',
    goals: 'What would you like to change? (optional)',
    goalsHint: 'Goals, injuries, anything Idael should know.',
    referral: 'Referred by (optional)',
    consent: 'Idael may contact me about this appointment by email, phone or WhatsApp.',
    errors: {
      name: 'Please enter your full name.',
      email: 'Please enter an email address like name@example.com.',
      phone: 'Please enter a phone number with the country code, like +41.',
      place: 'Please choose where you would like to meet.',
      consent: 'Please tick this so Idael can confirm.',
    },
    sending: 'Sending',
    request: 'Request this time',
    confirm: 'Book my consultation',
    taken: 'That time was just taken. Please choose another one.',
    failed: 'Something went wrong. Please try again, or message Idael on WhatsApp.',
    received: 'Request received',
    confirmed: 'Booked',
    thanks: 'Thank you,',
    receivedText: 'Idael will confirm your time himself, usually within a few hours.',
    confirmedText: 'You will get an email with the details and a reminder the day before.',
    summary: { session: 'Appointment', goal: 'Goal', when: 'When', where: 'Where', status: 'Status' },
    awaiting: 'Awaiting confirmation',
    addToCalendar: 'Add to calendar',
    backHome: 'Back to the home page',
    whatsapp: 'Prefer to talk? Message Idael',
    personal: 'Every request goes to Idael himself.',
    whatsappText: (name, when) => `Hello Idael, I would like to book ${name ? `a ${name.toLowerCase()}` : 'an appointment'}${when ? ` on ${when}` : ''}.`,
    pageTitle: 'Book your free session',
    pageIntro: 'Pick your goal, a day and a time, then add your details. About two minutes.',
    icsTitle: (name) => `${name} with Idael Alfonso`,
    icsRequested: 'Requested. Idael will confirm.',
    icsConfirmed: 'Booked.',
  },

  footer: {
    kicker: 'Your first step',
    title: 'Start with a free session.',
    intro: 'Twenty minutes by phone or video. No obligation.',
    cta: 'Book a consultation',
    where: 'Where',
    whereText: 'Your home, private studio, outdoors or online.',
    availability: 'Availability',
    contact: 'Contact',
    message: 'Message Idael',
    explore: 'Explore',
    follow: 'Follow',
    about: 'About Idael',
    services: 'Training',
    book: 'Book a consultation',
    rights: 'All rights reserved.',
    privacy: 'Privacy',
    imprint: 'Imprint',
    photos: 'Demo photography from Unsplash',
  },

  newsletter: {
    kicker: 'Notes from Idael',
    title: 'Stay close to the training.',
    text: 'A short email when there is something worth sharing: new sessions, training tips, events in Zürich. A few times a year, never offers.',
    email: 'Email address',
    cta: 'Keep me posted',
    sending: 'Sending',
    privacy: 'You can unsubscribe at any time.',
    privacyLink: 'Privacy',
    done: 'Thank you.',
    doneText: 'You are on the list. Watch your inbox.',
    error: 'Please enter an email address like name@example.com.',
    failed: 'Something went wrong. Please try again.',
    close: 'Close',
    open: 'Newsletter',
  },

  aboutPage: {
    title: 'About',
    based: 'Based in',
    languages: 'Languages',
    languageList: 'Spanish, German, English',
    intro:
      'Idael holds a diploma in Personal Training from the Swiss Academy of Fitness and Sports and leads programmes at leading sports centres in Switzerland.',
    story: [
      'Idael grew up in Cuba with music and dance. Rhythm, balance and a feel for movement are still part of every session.',
      'He works with a small group of private clients, so he can prepare properly and stay flexible when plans change.',
      'Training and food are planned together, because one without the other rarely lasts.',
    ],
    principlesTitle: 'How he works',
    principles: [
      { title: 'Your privacy', text: 'No photos, no names, nothing shared without your consent.' },
      { title: 'One plan', text: 'Training, food and recovery, written around your calendar.' },
      { title: 'Good energy', text: 'Hard work goes better with music and a smile.' },
    ],
    credentialsTitle: 'Training and experience',
    cta: 'Book a free consultation',
    services: 'Ways to train',
    portraitAlt: 'Idael Alfonso at the Zurich Film Festival',
  },

  servicePage: {
    all: 'All training',
    session: 'Session',
    format: 'Format',
    where: 'Where',
    book: 'Book a consultation',
    plan: 'The session plan',
    planTitle: (minutes) => `What ${minutes} minutes look like`,
    planIntro: 'A set plan, adjusted on the day to how you feel.',
    minutes: 'min',
    range: (from, to) => `${from} to ${to} min`,
    suitsYou: 'This suits you if',
    start: 'Getting started',
    startText: 'Book a free consultation. Idael will suggest how to begin.',
    next: 'Keep exploring',
    more: 'Other ways to train',
  },

  legal: {
    label: 'Legal',
    privacy: {
      title: 'Privacy',
      intro: 'How your information is handled on this website.',
      sections: [
        { h: 'What we collect', p: 'Your name, email, phone number and the appointment you book. No advertising or tracking cookies.' },
        { h: 'Why', p: 'Only to arrange and confirm your appointment.' },
        { h: 'Who sees it', p: 'Idael Alfonso and the booking service that runs the calendar. Never sold or shared.' },
        { h: 'Your rights', p: 'Ask to see, correct or delete your information at any time.' },
      ],
    },
    imprint: {
      title: 'Imprint',
      intro: 'Legal information for this website.',
      sections: [
        { h: 'Responsible', p: 'Idael Alfonso, Zürich. Full address to be added.' },
        { h: 'Contact', p: 'See the contact details in the footer.' },
        { h: 'Liability', p: 'Training advice on this website does not replace an individual assessment.' },
      ],
    },
  },

  notFound: {
    title: 'Page not found',
    text: 'This page does not exist, or the link is out of date.',
    home: 'Back to the home page',
    book: 'Book a consultation',
  },

  routes: { about: 'About', book: 'Book', privacy: 'Privacy', imprint: 'Imprint', lost: 'Lost?' },
}

export default en
