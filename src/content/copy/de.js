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
    services: 'Training',
    places: 'Orte',
    book: 'Buchen',
    menu: 'Menü',
    close: 'Schliessen',
    home: 'Home',
    skip: 'Zum Inhalt',
    language: 'Sprache',
    appointment: 'Nur nach Vereinbarung',
  },


  hero: {
    headline: 'Privates Training|in Zürich',
    subline: 'Training und Ernährung, eins zu eins, passend zu Ihrem Kalender.',
    cta: 'Kostenloses Erstgespräch buchen',
    note: 'Kostenlos, 20 Minuten, unverbindlich.',
    scroll: 'Nach unten',
    aside: 'Training, Ernährung, Erholung',
  },


  pains: {
    title: 'Kommt Ihnen das bekannt vor?',
    lead: 'Die meisten kommen aus einem von drei Gründen zu Idael.',
    leadA: 'Die meisten kommen zu Idael',
    leadB: 'aus einem von drei Gründen.',
    card: { title: 'Kostenloses Erstgespräch', text: 'Zwanzig Minuten per Telefon oder Video. Unverbindlich.' },
    answerLabel: 'Mit Idael',
    featured: ['time', 'desk', 'energy'],
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
    kicker: 'Der Trainer',
    title: 'Lernen Sie Idael kennen',
    intro: 'Kubanische Wurzeln, Schweizer Diplom. Er betreut eine kleine Gruppe privater Kunden in Zürich und plant Training und Ernährung gemeinsam.',
    credentials: [
      { title: 'Diplom in Personal Training', detail: 'Swiss Academy of Fitness and Sports' },
      { title: 'Programmleitung', detail: 'Führende Sportzentren in der Schweiz' },
      { title: 'Latin Dance und HIIT', detail: 'Erfinder der Workouts, denen 186K Menschen folgen' },
    ],
    cta: 'Seine Geschichte',
  },

  gallery: {
    kicker: 'Auf Instagram',
    title: 'Idael im Training',
    intro: (n) => `Von seinem Instagram, wo ${n} Menschen seinen Workouts folgen.`,
    prev: 'Zurück',
    next: 'Weiter',
    labels: {
      hiit: 'HIIT',
      footwork: 'Latin Beinarbeit',
      knees: 'Kondition',
      night: 'Tanzabend',
      rhythm: 'Rhythmus',
      strength: 'Kraftbereich',
      group: 'Gruppenstunde',
      offduty: 'Nach dem Training',
    },
  },

  why: {
    kicker: 'Warum Idael',
    title: 'Was Kunden zuerst bemerken',
    facts: [
      { value: '1:1', label: 'Jede Einheit nur Sie und Idael. Keine Gruppen, kein Wechsel.' },
      { value: '2 in 1', label: 'Training und Ernährung in einem Plan, beides in dieselbe Richtung.' },
      { value: '5', label: 'Orte zum Trainieren, Ihr Zuhause und der See inklusive.' },
      { value: '186K', label: 'Menschen folgen seinem Training auf Instagram.' },
      { value: '0', label: 'Fotos oder Namen geteilt, ohne Ihre schriftliche Zustimmung.' },
      { value: 'CH', label: 'In der Schweiz qualifiziert und in Zürich zu Hause.' },
    ],
  },



  bookSection: {
    title: 'Kostenloses Erstgespräch buchen',
    intro: 'Zwanzig Minuten per Telefon oder Video. Nennen Sie Idael Ihr Ziel, er übernimmt ab da.',
  },

  services: {
    kicker: 'Training',
    title: 'So trainieren Sie',
    intro: 'Vier Wege, mit Idael zu arbeiten. Jeder beginnt mit einem kostenlosen Erstgespräch.',
    prev: 'Zurück',
    next: 'Weiter',
    session: 'Einheit',
    format: 'Format',
    see: 'Einheit ansehen',
    items: {
      private: {
        name: 'Privates Training',
        kicker: 'Eins zu eins',
        summary: 'Kraft, Kondition und Mobilität, allein oder zu zweit.',
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
    kicker: 'Ablauf',
    title: 'Vom ersten Gespräch bis zum ersten Review',
    items: [
      { title: 'Erstgespräch', text: 'Zwanzig Minuten über Ihre Ziele und Ihre Woche.' },
      { title: 'Einschätzung', text: 'Wie Sie sich bewegen, wie stark Sie sind, wie Sie sich erholen.' },
      { title: 'Ihr Plan', text: 'Training und Ernährung, passend zu Ihrem Kalender.' },
      { title: 'Training', text: 'Zu Hause, im privaten Studio, draussen oder online.' },
      { title: 'Review', text: 'Alle sechs Wochen, mit Messungen.' },
    ],
  },

  // BEISPIEL: Zitate von Kunden. Vor dem Start durch echte ersetzen, mit Erlaubnis.
  clients: {
    kicker: 'Bisherige Kunden',
    title: 'In ihren Worten',
    note: 'Namen auf Wunsch nicht genannt.',
    prev: 'Zurück',
    next: 'Weiter',
    items: [
      { quote: 'Der erste Trainer, der sich nach meinem Kalender richtet und nicht umgekehrt.', who: 'Architekt', place: 'Zürich' },
      { quote: 'Um sechs Uhr morgens zu Hause, um sieben fertig. Die Energie spüre ich den ganzen Tag.', who: 'Softwareentwickler', place: 'Zug' },
      { quote: 'Latin Conditioning ist das einzige Workout, auf das sich meine Partnerin und ich freuen.', who: 'Lehrerin', place: 'Luzern' },
      { quote: 'Mit Beruf und Familie hat mich seine Betreuung verlässlich dranbleiben lassen.', who: 'Projektleiterin', place: 'Genf' },
    ],
  },


  locations: {
    kicker: 'Orte',
    title: 'Wo Sie trainieren',
    intro: 'Idael kommt zu Ihnen. Nur Sie beide, immer.',
    featured: ['studio', 'residence', 'outdoors', 'online'],
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


  faq: {
    kicker: 'FAQ',
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
    steps: ['Ihr Ziel', 'Datum und Zeit', 'Ihre Angaben'],
    goalTitle: 'Was ist Ihr Ziel?',
    goalHint: 'Wählen Sie das Nächstliegende. Mehr erzählen Sie Idael im Gespräch.',
    goalOptions: {
      strength: 'Stärker werden',
      weight: 'Gewicht verlieren',
      move: 'Schmerzfrei bewegen',
      energy: 'Mehr Energie, weniger Stress',
    },
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
    summary: { session: 'Termin', goal: 'Ziel', when: 'Wann', where: 'Wo', status: 'Status' },
    awaiting: 'Wartet auf Bestätigung',
    addToCalendar: 'Zum Kalender hinzufügen',
    backHome: 'Zurück zur Startseite',
    whatsapp: 'Lieber sprechen? Schreiben Sie Idael',
    personal: 'Jede Anfrage geht an Idael persönlich.',
    whatsappText: (name, when) => `Hallo Idael, ich möchte gerne ${name ? `ein ${name.toLowerCase()}` : 'einen Termin'}${when ? ` am ${when}` : ''} buchen.`,
    pageTitle: 'Kostenloses Erstgespräch buchen',
    pageIntro: 'Wählen Sie Ihr Ziel, einen Tag und eine Zeit, dann Ihre Angaben. Etwa zwei Minuten.',
    icsTitle: (name) => `${name} mit Idael Alfonso`,
    icsRequested: 'Angefragt. Idael wird bestätigen.',
    icsConfirmed: 'Gebucht.',
  },

  footer: {
    kicker: 'Ihr erster Schritt',
    title: 'Beginnen Sie mit einem kostenlosen Erstgespräch.',
    intro: 'Zwanzig Minuten per Telefon oder Video. Ohne Verpflichtung.',
    cta: 'Erstgespräch buchen',
    where: 'Wo',
    whereText: 'Ihr Zuhause, ein privates Studio, draussen oder online.',
    availability: 'Verfügbarkeit',
    contact: 'Kontakt',
    message: 'Idael schreiben',
    explore: 'Erkunden',
    follow: 'Folgen',
    about: 'Über Idael',
    services: 'Training',
    book: 'Erstgespräch buchen',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    photos: 'Demo-Fotos von Unsplash',
  },

  newsletter: {
    kicker: 'Notizen von Idael',
    title: 'Bleiben Sie nah am Training.',
    text: 'Eine kurze Mail, wenn es etwas zu teilen gibt: neue Einheiten, Trainingstipps, Anlässe in Zürich. Ein paar Mal im Jahr, nie Angebote.',
    email: 'E-Mail-Adresse',
    cta: 'Auf dem Laufenden bleiben',
    sending: 'Wird gesendet',
    privacy: 'Abmeldung jederzeit möglich.',
    privacyLink: 'Datenschutz',
    done: 'Vielen Dank.',
    doneText: 'Sie sind auf der Liste. Schauen Sie in Ihr Postfach.',
    error: 'Bitte geben Sie eine E-Mail-Adresse wie name@beispiel.ch ein.',
    failed: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
    close: 'Schliessen',
    open: 'Newsletter',
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
    services: 'So trainieren Sie',
    portraitAlt: 'Idael Alfonso am Zurich Film Festival',
  },

  servicePage: {
    all: 'Alle Trainings',
    session: 'Einheit',
    format: 'Format',
    where: 'Wo',
    book: 'Erstgespräch buchen',
    plan: 'Der Ablauf der Einheit',
    planTitle: (minutes) => `Wie ${minutes} Minuten aussehen`,
    planIntro: 'Ein fester Plan, am Tag angepasst an Ihre Form.',
    minutes: 'Min',
    range: (from, to) => `${from} bis ${to} Min`,
    suitsYou: 'Das passt zu Ihnen, wenn',
    start: 'Loslegen',
    startText: 'Buchen Sie ein kostenloses Erstgespräch. Idael schlägt vor, wie man anfängt.',
    next: 'Weiter entdecken',
    more: 'Weitere Trainings',
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
