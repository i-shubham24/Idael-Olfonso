/*
  Deutsche Texte (Schweizer Rechtschreibung: ss statt ß, Anrede Sie).
  Direkte, präzise Übersetzung von en.js mit übereinstimmender Länge und Wortwahl.
*/
const de = {
  lang: 'de',
  locale: 'de-CH',

  meta: {
    title: 'Idael Alfonso | Privater Trainer in Zürich',
    description:
      'Persönliches Training und Ernährung mit Idael Alfonso in Zürich. Bei Ihnen zu Hause, im privaten Studio, draussen oder online. Buchen Sie ein kostenloses Erstgespräch.',
  },

  brand: {
    role: 'Privater Trainer',
    area: 'Zürich und Zentralschweiz',
  },

  nav: {
    about: 'Über Idael',
    why: 'Warum Idael',
    services: 'Leistungen',
    book: 'Buchen',
    menu: 'Menü',
    close: 'Schliessen',
    home: 'Home',
    skip: 'Zum Inhalt',
    language: 'Sprache',
    appointment: 'Nur nach Vereinbarung',
  },

  cursor: { view: 'Ansehen', drag: 'Ziehen', next: 'Weiter' },

  hero: {
    role: 'Privater Trainer in Zürich',
    headline: 'Privates Training,',
    headlineEm: 'nach Vereinbarung.',
    subline: 'Training und Ernährung, eins zu eins, wo immer Sie sind.',
    cta: 'Kostenloses Erstgespräch buchen',
    secondary: 'Kommt Ihnen das bekannt vor?',
    bridge: 'Die meisten Kunden kommen aus denselben Gründen zu Idael.',
    scroll: 'Scrollen',
  },

  pains: {
    title: 'Kommt Ihnen das bekannt vor?',
    answerLabel: 'Mit Idael',
    items: {
      time: { problem: 'Das Training wird als Erstes abgesagt.', answer: 'Flexible Einheiten, die in Ihren Alltag passen.' },
      travel: { problem: 'Ständig beschäftigt, immer auf dem Sprung.', answer: 'Einheiten vor Ort oder online halten Sie verlässlich auf Kurs.' },
      dining: { problem: 'Wenig Zeit zum Kochen, oft unterwegs essen.', answer: 'Ein praktischer Ernährungsplan für den echten Alltag.' },
      desk: { problem: 'Langes Sitzen am Schreibtisch, verspannter Rücken.', answer: 'Gezielte Mobilität und spürbare Entlastung in jeder Einheit.' },
      gyms: { problem: 'Volle Fitnessstudios, langes Warten, keine Betreuung.', answer: 'Fokussiertes Einzeltraining im privaten Studio oder zu Hause.' },
      energy: { problem: 'Müde am Nachmittag, wenig Energie.', answer: 'Training, Ernährung und Erholung vereint in einem Plan.' },
    },
  },

  trainer: {
    title: 'Lernen Sie Idael kennen',
    intro: 'Kubanische Wurzeln, Schweizer Diplom. Cheftrainer in führenden Schweizer Sportzentren, 186K Follower online.',
    credentials: [
      { title: 'Diplom in Personal Training', detail: 'Swiss Academy of Fitness and Sports' },
      { title: 'Programmleitung', detail: 'Führende Sportzentren in der Schweiz' },
      { title: 'Latin Dance und HIIT', detail: 'Erfinder der Workouts, denen 186K Menschen folgen' },
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
      { id: 'dance', label: 'Latin Beinarbeit' },
    ],
  },

  why: {
    title: 'Warum Idael',
    intro: 'Sechs Dinge, die Kunden im ersten Monat bemerken.',
    facts: [
      { value: '1:1', label: 'Jede Einheit nur Sie und Idael' },
      { value: '2 in 1', label: 'Training und Ernährung in einem Plan' },
      { value: '5', label: 'Orte zum Trainieren, inklusive Ihr Zuhause' },
      { value: '186K', label: 'Menschen folgen seinem Training auf Instagram' },
      { value: '0', label: 'Fotos oder Namen geteilt, jemals' },
      { value: 'CH', label: 'In der Schweiz qualifiziert und in Zürich ansässig' },
    ],
  },

  bookSection: {
    title: 'Buchen Sie ein',
    titleEm: 'Erstgespräch',
    intro: 'Kostenlos, 20 Minuten, per Telefon oder Video. Idael übernimmt ab da.',
  },

  services: {
    title: 'Möglichkeiten mit Idael zu trainieren',
    intro: 'Eins zu eins, oder zu zweit.',
    session: 'Einheit',
    format: 'Format',
    see: 'Einheit ansehen',
    items: {
      private: {
        name: 'Privates Training',
        kicker: 'Eins zu eins',
        summary: 'Kraft, Kondition und Mobilität, abgestimmt auf Ihre persönlichen Ziele.',
        description:
          'Strukturierte Trainingsblöcke, die sich an Ihren Zeitplan, Ihr Fitnesslevel und Ihre Tagesform anpassen. Zu Hause, im privaten Studio, draussen oder online.',
        format: 'Eins zu eins',
        where: 'Studio, zu Hause, draussen oder online',
        forWho: ['Sie wollen messbare und spürbare Fortschritte', 'Sie brauchen flexible Zeiten für Ihren Alltag', 'Sie schätzen persönliche Betreuung und Verlässlichkeit'],
        session: ['Check-in', 'Mobilität', 'Kraft', 'Kondition', 'Ausklang'],
      },
      nutrition: {
        name: 'Ernährungscoaching',
        kicker: 'Ernährung und Erholung',
        summary: 'Ein praktischer Ernährungsplan, der zu Familie, Beruf und Alltag passt.',
        description:
          'Nachhaltige Gewohnheiten fürs Essen zu Hause, unterwegs und an stressigen Tagen. Hand in Hand mit Ihrem Training aufgebaut.',
        format: 'Eins zu eins, persönlich oder per Video',
        where: 'Überall',
        forWho: ['Sie möchten gesund essen ohne extreme Diäten', 'Sie verbinden Beruf, Familie und Fitness', 'Sie wollen Energie, die den ganzen Tag anhält'],
        session: ['Check-in', 'Rückblick', 'Plan', 'Nächste Schritte'],
      },
      duo: {
        name: 'Duo-Einheiten',
        kicker: 'Für zwei',
        summary: 'Trainieren Sie mit Partner, Familienmitglied oder Freunden. Zwei Pläne, eine Stunde.',
        description: 'Sie trainieren zusammen, jede Person mit dem eigenen Trainingsplan. Ideal für Trainingspartner mit unterschiedlichen Fitnesszielen.',
        format: 'Zwei Personen',
        where: 'Studio, zu Hause oder draussen',
        forWho: ['Sie trainieren lieber gemeinsam mit einem Partner', 'Sie und Ihr Partner haben verschiedene Ziele', 'Sie möchten eine feste gemeinsame Trainingsstunde'],
        session: ['Check-in', 'Aufwärmen', 'Kraft', 'Partnerzirkel', 'Ausklang'],
      },
      'latin-conditioning': {
        name: 'Latin Conditioning',
        kicker: 'Signature-Einheit',
        summary: 'Intervalle, Beinarbeit und Musik aus dem Latin Dance.',
        description: 'Kurze Intervalle zu Musik und Ganzkörperbewegung. Keine Tanzerfahrung nötig, nur gute Schuhe.',
        format: 'Eins zu eins oder Duo',
        where: 'Studio, zu Hause, draussen oder online',
        forWho: ['Laufbänder langweilen Sie', 'Sie wollen Ihre Fitness schnell zurück', 'Sie mögen Musik beim Training'],
        session: ['Aufwärmen', 'Beinarbeit', 'Intervalle', 'Core', 'Ausklang'],
      },
      'body-flow': {
        name: 'Body Flow',
        kicker: 'Mobilität und Erholung',
        summary: 'Mobilität, Atmung und ruhige Kraft für das tägliche Wohlbefinden.',
        description: 'Für verspannte Rücken, steife Hüften und langes Sitzen. Gelenk für Gelenk, dann ruhige, kontrollierte Kraft.',
        format: 'Eins zu eins',
        where: 'Studio, zu Hause, draussen oder online',
        forWho: ['Sie fühlen sich steif vom Sitzen oder Alltagsstress', 'Sie kommen nach einer Verletzung zurück', 'Sie wollen besser schlafen und erholt aufwachen'],
        session: ['Atmung', 'Gelenkvorbereitung', 'Mobilitäts-Flow', 'Erholung'],
      },
      online: {
        name: 'Online-Coaching',
        kicker: 'Überall trainieren',
        summary: 'Live-Video-Einheiten und ein massgeschneiderter Plan für jeden Ort.',
        description: 'Trainieren Sie live per Video mit Idael und bleiben Sie mit jedem Equipment verlässlich dran.',
        format: 'Live-Video',
        where: 'Überall',
        forWho: ['Sie trainieren gerne flexibel zu Hause oder unterwegs', 'Sie wollen überall denselben engagierten Trainer', 'Sie bevorzugen das Training in Ihrer gewohnten Umgebung'],
        session: ['Check-in', 'Aufwärmen', 'Hauptblock', 'Finisher', 'Rückblick'],
      },
    },
  },

  method: {
    title: 'Wie es funktioniert',
    intro: 'Vom ersten Anruf bis zum ersten Review.',
    step: 'Schritt',
    items: [
      { title: 'Beratungsgespräch', text: 'Ein kostenloses 20-minütiges Gespräch über Ihre Ziele und Ihre Woche.' },
      { title: 'Einschätzung', text: 'Wie Sie sich bewegen, wie stark Sie sind, wie Sie sich erholen.' },
      { title: 'Ihr Plan', text: 'Training und Ernährung, um Ihren Kalender herum geschrieben.' },
      { title: 'Training', text: 'Zu Hause, im privaten Studio, draussen oder online.' },
      { title: 'Review', text: 'Alle sechs Wochen, mit Messungen.' },
    ],
  },

  locations: {
    title: 'Wo Sie trainieren',
    intro: 'Idael kommt zu Ihnen. Nur Sie beide, immer.',
    available: 'Verfügbare Zeiten',
    bookTime: 'Zeit buchen',
    zones: {
      studio: { name: 'Privates Studio', detail: 'Ein Kunde auf einmal.' },
      residence: { name: 'Ihr Zuhause', detail: 'Idael bringt die Ausrüstung mit.' },
      hotel: { name: 'Partnerstudio oder Arbeitsplatz', detail: 'Praktische Standorte in der Schweiz.' },
      outdoors: { name: 'Draussen', detail: 'Am See, wenn das Wetter gut ist.' },
      online: { name: 'Online', detail: 'Wenn Sie weg sind.' },
    },
  },

  availabilitySummary: [
    { label: 'Montag bis Freitag', value: '6:00 bis 21:00' },
    { label: 'Samstag', value: '8:00 bis 13:00' },
    { label: 'Sonntag', value: 'Auf Anfrage' },
  ],

  // BEISPIEL: Zitate von Klienten.
  testimonials: {
    title: 'Was Klienten sagen',
    intro: 'Namen zurückgehalten, wie von ihnen gewünscht.',
    prev: 'Zurück',
    next: 'Weiter',
    items: [
      { quote: 'Der erste Trainer, der sich nach meinem Kalender richtet und nicht umgekehrt.', attribution: 'Architekt', place: 'Zürich' },
      { quote: 'Um sechs Uhr morgens zu Hause, um sieben Uhr fertig. Den Energieschub spüre ich den ganzen Tag.', attribution: 'Software-Entwickler', place: 'Zug' },
      { quote: 'Latin Conditioning ist das einzige Workout, auf das meine Partnerin und ich uns freuen.', attribution: 'Lehrerin', place: 'Luzern' },
      { quote: 'Mit Beruf und Familie hat mich diese persönliche Betreuung verlässlich dranbleiben lassen.', attribution: 'Projektleiterin', place: 'Genf' },
    ],
  },

  faq: {
    title: 'Fragen',
    intro: 'Noch etwas? Schreiben Sie Idael auf',
    items: [
      { q: 'Muss ich fit sein, um anzufangen?', a: 'Nein. Die Einschätzung zeigt, wo Sie stehen, und der Plan beginnt dort.' },
      { q: 'Helfen Sie auch bei der Ernährung?', a: 'Ja. Ernährung ist Teil des Plans, mit praktischen Tipps für Familienessen, Restaurantbesuche und stressige Tage.' },
      { q: 'Was passiert, wenn ich unterwegs bin oder eine volle Woche habe?', a: 'Die Einheiten laufen online weiter, oder Sie erhalten ein angepasstes Workout für überall.' },
      { q: 'Wie funktioniert der erste Termin?', a: 'Buchen Sie unten ein kostenloses Erstgespräch. Alles Weitere wird mit Idael persönlich vereinbart.' },
      { q: 'Ist alles vertraulich?', a: 'Ja. Keine Fotos, keine Namen, nichts in sozialen Medien ohne Ihre schriftliche Zustimmung.' },
    ],
  },

  booking: {
    steps: ['Einheit', 'Datum und Zeit', 'Ihre Angaben'],
    typeTitle: 'Wählen Sie Ihren Termin',
    typeHint: 'Nicht sicher? Beginnen Sie mit dem kostenlosen Erstgespräch.',
    startHere: 'Hier starten',
    min: 'Min',
    chooseTime: 'Zeit wählen',
    types: {
      consultation: { name: 'Kostenloses Erstgespräch', format: 'Telefon oder Video', note: 'Ihre Ziele, Ihre Woche und wie Idael helfen kann.' },
      meeting: { name: 'Persönlich treffen', format: 'Studio, zu Hause oder draussen', note: 'Ein erstes Treffen und ein kurzer Bewegungscheck.' },
    },
    places: {
      video: 'Videoanruf',
      phone: 'Telefonanruf',
      studio: 'Privates Studio',
      home: 'Mein Zuhause',
      hotel: 'Arbeitsplatz oder Partnerstudio',
    },
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    prevMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    timesAvailable: (n) => `${n} Zeiten verfügbar`,
    unavailable: 'nicht verfügbar',
    checking: 'Verfügbarkeit wird geprüft',
    legend: 'Markiert heute. Blasse Tage sind ausgebucht.',
    timeTitle: 'Datum und Zeit wählen',
    timeIntro: (name, minutes) => `${name}, ${minutes} Minuten. Schweizer Zeit.`,
    chooseDay: 'Tag wählen',
    loadError: 'Verfügbarkeit konnte nicht geladen werden. Bitte erneut versuchen oder Idael auf WhatsApp schreiben.',
    noneThisMonth: 'Keine freien Zeiten mehr diesen Monat. Versuchen Sie den nächsten Monat.',
    startTime: 'Startzeit',
    timesFree: (n) => `${n} ${n === 1 ? 'Zeit' : 'Zeiten'} frei an diesem Tag`,
    until: 'bis',
    swissTime: 'Schweizer Zeit',
    parts: ['Morgen', 'Nachmittag', 'Abend'],
    back: 'Zurück',
    addDetails: 'Angaben hinzufügen',
    detailsTitle: 'Ihre Angaben',
    detailsNote: 'Nur Idael sieht diese.',
    name: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon',
    phoneHint: 'Für eine Erinnerung am Vortag.',
    where: 'Wo möchten Sie sich treffen?',
    goals: 'Was möchten Sie verändern? (optional)',
    goalsHint: 'Ziele, Verletzungen, alles was Idael wissen sollte.',
    referral: 'Empfohlen von (optional)',
    consent: 'Idael darf mich bezüglich dieses Termins per E-Mail, Telefon oder WhatsApp kontaktieren.',
    errors: {
      name: 'Bitte geben Sie Ihren vollständigen Namen ein.',
      email: 'Bitte geben Sie eine E-Mail-Adresse wie name@beispiel.ch ein.',
      phone: 'Bitte geben Sie eine Telefonnummer mit Ländervorwahl wie +41 ein.',
      place: 'Bitte wählen Sie, wo Sie sich treffen möchten.',
      consent: 'Bitte ankreuzen, damit Idael bestätigen kann.',
    },
    sending: 'Wird gesendet',
    request: 'Diese Zeit anfragen',
    confirm: 'Mein Erstgespräch buchen',
    taken: 'Diese Zeit wurde gerade vergeben. Bitte wählen Sie eine andere.',
    failed: 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder Idael auf WhatsApp schreiben.',
    received: 'Anfrage erhalten',
    confirmed: 'Gebucht',
    thanks: 'Vielen Dank,',
    receivedText: 'Idael wird Ihre Zeit persönlich bestätigen, normalerweise innerhalb weniger Stunden.',
    confirmedText: 'Sie erhalten eine E-Mail mit den Details und eine Erinnerung am Vortag.',
    summary: { session: 'Termin', when: 'Wann', where: 'Wo', status: 'Status' },
    awaiting: 'Wartet auf Bestätigung',
    addToCalendar: 'Zum Kalender hinzufügen',
    backHome: 'Zurück zur Startseite',
    whatsapp: 'Lieber sprechen? Schreiben Sie Idael',
    personal: 'Jede Anfrage geht an Idael persönlich.',
    whatsappText: (name, when) => `Hallo Idael, ich möchte gerne ${name ? `ein ${name.toLowerCase()}` : 'einen Termin'}${when ? ` am ${when}` : ''} buchen.`,
    pageTitle: 'Buchen Sie ein',
    pageTitleEm: 'Erstgespräch',
    pageIntro: 'Wählen Sie einen Termin und eine Zeit, dann fügen Sie Ihre Angaben hinzu. Etwa zwei Minuten.',
    icsTitle: (name) => `${name} mit Idael Alfonso`,
    icsRequested: 'Angefragt. Idael wird bestätigen.',
    icsConfirmed: 'Gebucht.',
  },

  footer: {
    title: 'Beginnen Sie mit einem',
    titleEm: 'kostenlosen Erstgespräch.',
    intro: 'Zwanzig Minuten per Telefon oder Video. Ohne Verpflichtung.',
    cta: 'Erstgespräch buchen',
    where: 'Wo',
    whereText: 'Ihr Zuhause, ein privates Studio, draussen oder online.',
    availability: 'Verfügbarkeit',
    contact: 'Kontakt',
    message: 'Idael schreiben',
    explore: 'Erkunden',
    about: 'Über Idael',
    services: 'Leistungen',
    book: 'Erstgespräch buchen',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    photos: 'Demo-Fotos von Unsplash',
  },

  aboutPage: {
    title: 'Über Idael',
    based: 'Ansässig in',
    languages: 'Sprachen',
    languageList: 'Spanisch, Deutsch, Englisch',
    intro:
      'Idael besitzt ein Diplom in Personal Training der Swiss Academy of Fitness and Sports und leitet Programme in führenden Schweizer Sportzentren.',
    story: [
      'Idael wuchs in Kuba mit Musik und Tanz auf. Rhythmus, Balance und ein Gefühl für Bewegung sind bis heute Teil jeder Einheit.',
      'Er arbeitet mit einer kleinen Gruppe privater Klienten, damit er sich richtig vorbereiten kann und flexibel bleibt, wenn sich Pläne ändern.',
      'Training und Ernährung werden zusammen geplant, weil das eine ohne das andere selten anhält.',
    ],
    principlesTitle: 'Wie er arbeitet',
    principles: [
      { title: 'Ihre Privatsphäre', text: 'Keine Fotos, keine Namen, nichts geteilt ohne Ihre Zustimmung.' },
      { title: 'Ein Plan', text: 'Training, Ernährung und Erholung, um Ihren Kalender herum geschrieben.' },
      { title: 'Gute Energie', text: 'Harte Arbeit geht besser mit Musik und einem Lächeln.' },
    ],
    credentialsTitle: 'Ausbildung und Erfahrung',
    cta: 'Kostenloses Erstgespräch buchen',
    services: 'Leistungen ansehen',
    portraitAlt: 'Idael Alfonso am Zurich Film Festival',
  },

  servicePage: {
    all: 'Alle Leistungen',
    session: 'Einheit',
    format: 'Format',
    where: 'Wo',
    book: 'Erstgespräch buchen',
    plan: 'Der Ablauf der Einheit',
    planTitle: (minutes) => `Wie ${minutes} Minuten aussehen`,
    planIntro: 'Ein fester Plan, am Tag angepasst. Der goldene Block ist der Hauptteil.',
    minutes: 'Min',
    range: (from, to) => `${from} bis ${to} Min`,
    suitsYou: 'Das passt zu Ihnen, wenn',
    start: 'Loslegen',
    startText: 'Buchen Sie ein kostenloses Erstgespräch. Idael schlägt vor, wie man anfängt.',
    next: 'Nächste Leistung',
  },

  legal: {
    label: 'Rechtliches',
    privacy: {
      title: 'Datenschutz',
      intro: 'Wie Ihre Informationen auf dieser Website behandelt werden.',
      sections: [
        { h: 'Was wir erfassen', p: 'Ihr Name, E-Mail, Telefonnummer und der Termin, den Sie buchen. Keine Werbe- oder Tracking-Cookies.' },
        { h: 'Warum', p: 'Nur um Ihren Termin zu vereinbaren und zu bestätigen.' },
        { h: 'Wer es sieht', p: 'Idael Alfonso und der Buchungsdienst für den Kalender. Niemals verkauft oder weitergegeben.' },
        { h: 'Ihre Rechte', p: 'Bitten Sie jederzeit darum, Ihre Angaben einzusehen, zu korrigieren oder zu löschen.' },
      ],
    },
    imprint: {
      title: 'Impressum',
      intro: 'Rechtliche Angaben für diese Website.',
      sections: [
        { h: 'Verantwortlich', p: 'Idael Alfonso, Zürich. Vollständige Adresse wird ergänzt.' },
        { h: 'Kontakt', p: 'Siehe Kontaktdaten in der Fusszeile.' },
        { h: 'Haftung', p: 'Trainingshinweise auf dieser Website ersetzen keine individuelle Beurteilung.' },
      ],
    },
  },

  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite existiert nicht oder der Link ist veraltet.',
    home: 'Zurück zur Startseite',
    book: 'Erstgespräch buchen',
  },

  routes: { about: 'Über Idael', book: 'Buchen', privacy: 'Datenschutz', imprint: 'Impressum', lost: 'Verloren?' },
}

export default de
