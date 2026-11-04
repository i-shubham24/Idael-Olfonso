/*
  Deutsche Texte (Schweizer Schreibweise: ss statt ß, Anrede Sie).
  Gleiche Struktur wie en.js. Kurz halten: keine Gedankenstriche oder
  Bindestriche im sichtbaren Text, klare Sätze, keine Slogans.
*/
const de = {
  lang: 'de',
  locale: 'de-CH',

  meta: {
    title: 'Idael Alfonso | Personal Trainer in Zürich',
    description:
      'Privates Training und Ernährung mit Idael Alfonso in Zürich. Bei Ihnen zu Hause, im Hotel oder im privaten Studio. Jetzt ein kostenloses Erstgespräch buchen.',
  },

  brand: {
    role: 'Personal Trainer',
    area: 'Zürich und Zentralschweiz',
  },

  nav: {
    about: 'Über Idael',
    why: 'Warum Idael',
    services: 'Angebot',
    book: 'Termin',
    menu: 'Menü',
    close: 'Schliessen',
    home: 'Start',
    skip: 'Zum Inhalt',
    language: 'Sprache',
    appointment: 'Nur nach Vereinbarung',
  },

  cursor: { view: 'Ansehen', drag: 'Ziehen', next: 'Weiter' },

  hero: {
    role: 'Personal Trainer in Zürich',
    headline: 'Privates Training,',
    headlineEm: 'nach Vereinbarung.',
    subline: 'Training und Ernährung, eins zu eins, wo immer Sie sind.',
    cta: 'Kostenloses Erstgespräch',
    secondary: 'Kommt Ihnen das bekannt vor?',
    bridge: 'Die meisten Kunden kommen aus denselben Gründen zu Idael.',
    scroll: 'Scrollen',
  },

  pains: {
    title: 'Kommt Ihnen das bekannt vor?',
    answerLabel: 'Mit Idael',
    items: {
      time: { problem: 'Das Training fällt als Erstes weg.', answer: 'Termine passen in Ihre Woche, früh oder spät.' },
      travel: { problem: 'Jede Woche eine andere Stadt.', answer: 'Per Video trainieren Sie einfach weiter.' },
      dining: { problem: 'Geschäftsessen bestimmen, was Sie essen.', answer: 'Ein Ernährungsplan, der im Restaurant funktioniert.' },
      desk: { problem: 'Lange Tage, lange Flüge, steifer Rücken.', answer: 'Mobilität in jeder Einheit.' },
      gyms: { problem: 'Volle Studios. Erkannt werden.', answer: 'Bei Ihnen, im Hotel oder im privaten Studio.' },
      energy: { problem: 'Am Nachmittag schon müde.', answer: 'Training, Ernährung und Schlaf in einem Plan.' },
    },
  },

  trainer: {
    title: 'Das ist Idael',
    intro: 'Kubanische Wurzeln, Schweizer Diplom. Leitet Programme in führenden Sportzentren, 186K Menschen folgen seinem Training online.',
    credentials: [
      { title: 'Diplom Personal Training', detail: 'Swiss Academy of Fitness and Sports' },
      { title: 'Programmleitung', detail: 'Führende Sportzentren der Schweiz' },
      { title: 'Latin Dance und HIIT', detail: 'Seine Workouts verfolgen 186K Menschen' },
    ],
    cta: 'Seine Geschichte',
  },

  showreel: {
    title: 'Idael',
    titleEm: 'in Bewegung',
    intro: 'Kurze Clips aus seinem Training. Antippen für den nächsten.',
    prev: 'Vorheriger Clip',
    next: 'Nächster Clip',
    clips: [
      { id: 'core', label: 'Rumpfkraft' },
      { id: 'dance', label: 'Latin Schritte' },
    ],
  },

  why: {
    title: 'Warum Idael',
    intro: 'Sechs Dinge, die Kunden im ersten Monat merken.',
    facts: [
      { value: '1:1', label: 'Jede Einheit nur Sie und Idael' },
      { value: '2 in 1', label: 'Training und Ernährung in einem Plan' },
      { value: '5', label: 'Orte zum Trainieren, auch bei Ihnen' },
      { value: '186K', label: 'Menschen folgen seinem Training auf Instagram' },
      { value: '0', label: 'Fotos oder Namen werden geteilt' },
      { value: 'CH', label: 'In der Schweiz ausgebildet, in Zürich zu Hause' },
    ],
  },

  bookSection: {
    title: 'Ein erstes',
    titleEm: 'Gespräch buchen',
    intro: 'Kostenlos, 20 Minuten, per Telefon oder Video. Den Rest bespricht Idael mit Ihnen.',
  },

  services: {
    title: 'So trainieren Sie mit Idael',
    intro: 'Eins zu eins oder zu zweit.',
    session: 'Einheit',
    format: 'Format',
    see: 'Zur Einheit',
    items: {
      private: {
        name: 'Private Training',
        kicker: 'Eins zu eins',
        summary: 'Kraft, Kondition und Mobilität, ganz auf Sie abgestimmt.',
        description:
          'Blöcke von sechs Wochen, angepasst an Ihren Kalender, Ihre Reisen und Ihre Tagesform. Bei Ihnen zu Hause, im Hotel, im privaten Studio oder draussen.',
        format: 'Eins zu eins',
        where: 'Studio, zu Hause, Hotel oder draussen',
        forWho: ['Sie wollen messbare Fortschritte', 'Keine Woche ist wie die andere', 'Sie wollen einen Trainer, der Sie kennt'],
        session: ['Check in', 'Mobilität', 'Kraft', 'Kondition', 'Ausklang'],
      },
      nutrition: {
        name: 'Ernährungscoaching',
        kicker: 'Ernährung und Erholung',
        summary: 'Ein Plan, der mit Restaurants, Reisen und späten Abenden funktioniert.',
        description:
          'Einfache Regeln fürs Essen auswärts, ein Plan für Reisetage und ein kurzer Check in pro Woche. Abgestimmt auf Ihr Training.',
        format: 'Eins zu eins, persönlich oder per Video',
        where: 'Überall',
        forWho: ['Sie essen öfter auswärts als zu Hause', 'Sie reisen viel', 'Sie wollen Energie für den ganzen Tag'],
        session: ['Check in', 'Rückblick', 'Plan', 'Nächste Schritte'],
      },
      duo: {
        name: 'Duo Training',
        kicker: 'Zu zweit',
        summary: 'Mit Partnerin, Partner oder Freund. Zwei Pläne, eine Stunde.',
        description: 'Sie trainieren gemeinsam, jeder mit dem eigenen Programm. Ideal für Paare mit unterschiedlichen Zielen.',
        format: 'Zwei Personen',
        where: 'Studio, zu Hause oder Hotel',
        forWho: ['Sie trainieren lieber gemeinsam', 'Sie haben unterschiedliche Ziele', 'Sie wollen eine feste gemeinsame Stunde'],
        session: ['Check in', 'Aufwärmen', 'Kraft', 'Partnerzirkel', 'Ausklang'],
      },
      'latin-conditioning': {
        name: 'Latin Conditioning',
        kicker: 'Idaels eigenes Format',
        summary: 'Intervalle, Schrittfolgen und Musik aus dem Latin Dance.',
        description: 'Kurze Intervalle zur Musik und Bewegung für den ganzen Körper. Keine Tanzerfahrung nötig, nur gute Schuhe.',
        format: 'Eins zu eins oder zu zweit',
        where: 'Studio, zu Hause oder Hotel',
        forWho: ['Das Laufband langweilt Sie', 'Sie wollen schnell wieder fit sein', 'Sie trainieren gern mit Musik'],
        session: ['Aufwärmen', 'Schritte', 'Intervalle', 'Rumpf', 'Ausklang'],
      },
      'body-flow': {
        name: 'Body Flow',
        kicker: 'Mobilität und Erholung',
        summary: 'Mobilität, Atmung und ruhige Kraft.',
        description: 'Für den steifen Rücken nach Flügen und langen Tagen. Gelenk für Gelenk, dann ruhige, kontrollierte Kraft.',
        format: 'Eins zu eins',
        where: 'Studio, zu Hause, Hotel oder online',
        forWho: ['Sie sind nach Reisen steif', 'Sie kommen von einer Verletzung zurück', 'Sie wollen besser schlafen'],
        session: ['Atmung', 'Gelenke', 'Mobilität', 'Erholung'],
      },
      online: {
        name: 'Online Coaching',
        kicker: 'Unterwegs',
        summary: 'Live per Video und ein Plan für jedes Hotelstudio.',
        description: 'Trainieren Sie live mit Idael per Video und behalten Sie denselben Plan in jeder Stadt.',
        format: 'Live per Video',
        where: 'Überall',
        forWho: ['Sie sind oft unterwegs', 'Sie wollen überall denselben Trainer', 'Sie haben oft wenig Geräte'],
        session: ['Check in', 'Aufwärmen', 'Hauptteil', 'Finisher', 'Rückblick'],
      },
    },
  },

  method: {
    title: 'So funktioniert es',
    intro: 'Vom ersten Gespräch bis zum ersten Review.',
    step: 'Schritt',
    items: [
      { title: 'Erstgespräch', text: '20 Minuten, kostenlos, über Ihre Ziele und Ihre Woche.' },
      { title: 'Analyse', text: 'Wie Sie sich bewegen, wie stark Sie sind, wie Sie sich erholen.' },
      { title: 'Ihr Plan', text: 'Training und Ernährung, passend zu Ihrem Kalender.' },
      { title: 'Training', text: 'Zu Hause, im Hotel, im Studio oder draussen.' },
      { title: 'Review', text: 'Alle sechs Wochen, mit Messwerten.' },
    ],
  },

  locations: {
    title: 'Wo Sie trainieren',
    intro: 'Idael kommt zu Ihnen. Immer nur Sie beide.',
    available: 'Verfügbare Zeiten',
    bookTime: 'Termin wählen',
    zones: {
      studio: { name: 'Privates Studio', detail: 'Immer nur ein Kunde.' },
      residence: { name: 'Bei Ihnen zu Hause', detail: 'Idael bringt die Geräte mit.' },
      hotel: { name: 'Hotels und private Studios', detail: 'In der ganzen Schweiz.' },
      outdoors: { name: 'Draussen', detail: 'Am See, wenn das Wetter mitspielt.' },
      online: { name: 'Online', detail: 'Wenn Sie unterwegs sind.' },
    },
  },

  availabilitySummary: [
    { label: 'Montag bis Freitag', value: '6:00 bis 21:00' },
    { label: 'Samstag', value: '8:00 bis 13:00' },
    { label: 'Sonntag', value: 'Auf Anfrage' },
  ],

  // PLATZHALTER: Beispielzitate. Durch echte, freigegebene Zitate ersetzen.
  testimonials: {
    title: 'Was Kunden sagen',
    intro: 'Ohne Namen, auf Wunsch der Kunden.',
    prev: 'Zurück',
    next: 'Weiter',
    items: [
      { quote: 'Der erste Trainer, der sich nach meinem Kalender richtet und nicht umgekehrt.', attribution: 'Gründer', place: 'Zürich' },
      { quote: 'Um sechs Uhr bei mir zu Hause, um sieben fertig. Ich merke es den ganzen Tag.', attribution: 'Private Banker', place: 'Zug' },
      { quote: 'Latin Conditioning ist das einzige Ausdauertraining, auf das wir uns beide freuen.', attribution: 'Unternehmer', place: 'Luzern' },
      { quote: 'Ich bin zwei Wochen im Monat unterwegs und habe trotzdem denselben Trainer.', attribution: 'Geschäftsführerin', place: 'Genf' },
    ],
  },

  faq: {
    title: 'Fragen',
    intro: 'Noch etwas offen? Schreiben Sie Idael auf',
    items: [
      { q: 'Muss ich fit sein, um anzufangen?', a: 'Nein. Die Analyse zeigt, wo Sie stehen, und der Plan beginnt dort.' },
      { q: 'Helfen Sie auch bei der Ernährung?', a: 'Ja. Ernährung ist Teil des Plans, mit einfachen Regeln für Restaurants und Reisen.' },
      { q: 'Was passiert, wenn ich reise?', a: 'Das Training läuft online weiter, mit einem Plan für das Studio in Ihrem Hotel.' },
      { q: 'Wie läuft der erste Termin ab?', a: 'Buchen Sie unten ein kostenloses Erstgespräch. Alles Weitere besprechen Sie direkt mit Idael.' },
      { q: 'Bleibt alles vertraulich?', a: 'Ja. Keine Fotos, keine Namen, nichts in sozialen Medien ohne Ihre schriftliche Zustimmung.' },
    ],
  },

  booking: {
    steps: ['Termin', 'Datum und Zeit', 'Ihre Angaben'],
    typeTitle: 'Termin wählen',
    typeHint: 'Unsicher? Beginnen Sie mit dem kostenlosen Erstgespräch.',
    startHere: 'Hier starten',
    min: 'Min',
    chooseTime: 'Zeit wählen',
    types: {
      consultation: { name: 'Kostenloses Erstgespräch', format: 'Telefon oder Video', note: 'Ihre Ziele, Ihre Woche und wie Idael helfen kann.' },
      meeting: { name: 'Persönliches Treffen', format: 'Studio, zu Hause oder Hotel', note: 'Ein erstes Treffen mit kurzem Bewegungscheck.' },
    },
    places: {
      video: 'Videoanruf',
      phone: 'Telefon',
      studio: 'Privates Studio',
      home: 'Bei mir zu Hause',
      hotel: 'Hotel oder privates Studio',
    },
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    prevMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    timesAvailable: (n) => `${n} Zeiten frei`,
    unavailable: 'ausgebucht',
    checking: 'Verfügbarkeit wird geprüft',
    legend: 'Markiert heute. Blasse Tage sind ausgebucht.',
    timeTitle: 'Datum und Zeit wählen',
    timeIntro: (name, minutes) => `${name}, ${minutes} Minuten. Schweizer Zeit.`,
    chooseDay: 'Tag wählen',
    loadError: 'Die Verfügbarkeit konnte nicht geladen werden. Bitte versuchen Sie es erneut oder schreiben Sie Idael auf WhatsApp.',
    noneThisMonth: 'Diesen Monat ist nichts mehr frei. Versuchen Sie den nächsten Monat.',
    startTime: 'Beginn',
    timesFree: (n) => `${n} ${n === 1 ? 'Zeit' : 'Zeiten'} an diesem Tag frei`,
    until: 'bis',
    swissTime: 'Schweizer Zeit',
    parts: ['Morgen', 'Nachmittag', 'Abend'],
    back: 'Zurück',
    addDetails: 'Weiter zu Ihren Angaben',
    detailsTitle: 'Ihre Angaben',
    detailsNote: 'Nur Idael sieht diese Angaben.',
    name: 'Ihr Name',
    email: 'Mail',
    phone: 'Telefon',
    phoneHint: 'Für eine Erinnerung am Vortag.',
    where: 'Wo möchten Sie sich treffen?',
    goals: 'Was möchten Sie verändern? (optional)',
    goalsHint: 'Ziele, Verletzungen, alles, was Idael wissen sollte.',
    referral: 'Empfohlen von (optional)',
    consent: 'Idael darf mich zu diesem Termin per Mail, Telefon oder WhatsApp kontaktieren.',
    errors: {
      name: 'Bitte geben Sie Ihren vollständigen Namen ein.',
      email: 'Bitte geben Sie eine Mailadresse wie name@beispiel.ch ein.',
      phone: 'Bitte geben Sie eine Telefonnummer mit Ländervorwahl ein, zum Beispiel +41.',
      place: 'Bitte wählen Sie einen Treffpunkt.',
      consent: 'Bitte bestätigen Sie, damit Idael den Termin bestätigen kann.',
    },
    sending: 'Wird gesendet',
    request: 'Diese Zeit anfragen',
    confirm: 'Erstgespräch buchen',
    taken: 'Diese Zeit wurde gerade vergeben. Bitte wählen Sie eine andere.',
    failed: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie Idael auf WhatsApp.',
    received: 'Anfrage erhalten',
    confirmed: 'Gebucht',
    thanks: 'Vielen Dank,',
    receivedText: 'Idael bestätigt Ihren Termin persönlich, meist innerhalb weniger Stunden.',
    confirmedText: 'Sie erhalten ein Mail mit allen Details und am Vortag eine Erinnerung.',
    summary: { session: 'Termin', when: 'Wann', where: 'Wo', status: 'Status' },
    awaiting: 'Wartet auf Bestätigung',
    addToCalendar: 'In den Kalender',
    backHome: 'Zur Startseite',
    whatsapp: 'Lieber direkt sprechen? Idael schreiben',
    personal: 'Jede Anfrage geht direkt an Idael.',
    whatsappText: (name, when) => `Hallo Idael, ich möchte gerne ${name ? `ein ${name}` : 'einen Termin'}${when ? ` am ${when}` : ''} buchen.`,
    pageTitle: 'Ein erstes',
    pageTitleEm: 'Gespräch buchen',
    pageIntro: 'Termin und Zeit wählen, dann Ihre Angaben. Etwa zwei Minuten.',
    icsTitle: (name) => `${name} mit Idael Alfonso`,
    icsRequested: 'Angefragt. Idael bestätigt den Termin.',
    icsConfirmed: 'Gebucht.',
  },

  footer: {
    title: 'Beginnen Sie mit einem',
    titleEm: 'kostenlosen Gespräch.',
    intro: 'Zwanzig Minuten per Telefon oder Video. Unverbindlich.',
    cta: 'Erstgespräch buchen',
    where: 'Wo',
    whereText: 'Bei Ihnen zu Hause, im Hotel, draussen oder im privaten Studio.',
    availability: 'Verfügbarkeit',
    contact: 'Kontakt',
    message: 'Idael schreiben',
    explore: 'Mehr',
    about: 'Über Idael',
    services: 'Angebot',
    book: 'Erstgespräch buchen',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    photos: 'Beispielfotos von Unsplash',
  },

  aboutPage: {
    title: 'Über Idael',
    based: 'Standort',
    languages: 'Sprachen',
    languageList: 'Spanisch, Deutsch, Englisch',
    intro:
      'Idael hat ein Diplom in Personal Training der Swiss Academy of Fitness and Sports und leitet Programme in führenden Sportzentren der Schweiz.',
    story: [
      'Idael ist in Kuba mit Musik und Tanz aufgewachsen. Rhythmus, Gleichgewicht und ein Gefühl für Bewegung prägen jede Einheit.',
      'Er arbeitet mit wenigen privaten Kunden. So bleibt Zeit für gute Vorbereitung und Flexibilität, wenn sich Pläne ändern.',
      'Training und Ernährung plant er gemeinsam, denn das eine hält selten ohne das andere.',
    ],
    principlesTitle: 'So arbeitet er',
    principles: [
      { title: 'Diskretion', text: 'Keine Fotos, keine Namen, nichts ohne Ihre Zustimmung.' },
      { title: 'Ein Plan', text: 'Training, Ernährung und Erholung, passend zu Ihrem Kalender.' },
      { title: 'Gute Energie', text: 'Harte Arbeit geht mit Musik und einem Lächeln leichter.' },
    ],
    credentialsTitle: 'Ausbildung und Erfahrung',
    cta: 'Kostenloses Erstgespräch',
    services: 'Zum Angebot',
    portraitAlt: 'Idael Alfonso am Zurich Film Festival',
  },

  servicePage: {
    all: 'Alle Angebote',
    session: 'Einheit',
    format: 'Format',
    where: 'Wo',
    book: 'Erstgespräch buchen',
    plan: 'Ablauf der Einheit',
    planTitle: (minutes) => `So sehen ${minutes} Minuten aus`,
    planIntro: 'Ein fester Ablauf, angepasst an den Tag. Der goldene Block ist der Hauptteil.',
    minutes: 'Min',
    range: (from, to) => `${from} bis ${to} Min`,
    suitsYou: 'Das passt zu Ihnen, wenn',
    start: 'So starten Sie',
    startText: 'Buchen Sie ein kostenloses Erstgespräch. Idael schlägt Ihnen den Einstieg vor.',
    next: 'Nächstes Angebot',
  },

  legal: {
    label: 'Rechtliches',
    privacy: {
      title: 'Datenschutz',
      intro: 'Wie Ihre Daten auf dieser Website behandelt werden.',
      sections: [
        { h: 'Was wir erfassen', p: 'Name, Mailadresse, Telefonnummer und den gebuchten Termin. Keine Cookies für Werbung oder Tracking.' },
        { h: 'Wozu', p: 'Nur um Ihren Termin zu vereinbaren und zu bestätigen.' },
        { h: 'Wer sie sieht', p: 'Idael Alfonso und der Buchungsdienst für den Kalender. Nie verkauft oder weitergegeben.' },
        { h: 'Ihre Rechte', p: 'Sie können Ihre Daten jederzeit einsehen, korrigieren oder löschen lassen.' },
      ],
    },
    imprint: {
      title: 'Impressum',
      intro: 'Rechtliche Angaben zu dieser Website.',
      sections: [
        { h: 'Verantwortlich', p: 'Idael Alfonso, Zürich. Vollständige Adresse folgt.' },
        { h: 'Kontakt', p: 'Siehe Kontaktangaben in der Fusszeile.' },
        { h: 'Haftung', p: 'Trainingshinweise auf dieser Website ersetzen keine persönliche Abklärung.' },
      ],
    },
  },

  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite gibt es nicht, oder der Link ist veraltet.',
    home: 'Zur Startseite',
    book: 'Erstgespräch buchen',
  },

  routes: { about: 'Über Idael', book: 'Termin', privacy: 'Datenschutz', imprint: 'Impressum', lost: 'Verlaufen?' },
}

export default de
