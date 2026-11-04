/*
  Deutsche Texte (Schweizer Schreibweise: ss statt ß, Anrede Sie).
  Gleiche Struktur wie en.js. Höchste redaktionelle Qualität:
  ruhiger Schweizer Ton, präzise Formulierungen, diskreter Luxus.
*/
const de = {
  lang: 'de',
  locale: 'de-CH',

  meta: {
    title: 'Idael Alfonso | Privater Personal Trainer in Zürich',
    description:
      'Massgeschneidertes Personal Training und Longevity-Ernährung mit Idael Alfonso in Zürich. Bei Ihnen zu Hause, im Hotel oder im privaten Studio. Jetzt kostenloses Erstgespräch vereinbaren.',
  },

  brand: {
    role: 'Privater Personal Trainer',
    area: 'Zürich und Zentralschweiz',
  },

  nav: {
    about: 'Über Idael',
    why: 'Warum Idael',
    services: 'Angebot',
    book: 'Termin',
    menu: 'Menü',
    close: 'Schliessen',
    home: 'Startseite',
    skip: 'Zum Inhalt springen',
    language: 'Sprache',
    appointment: 'Ausschliesslich nach Vereinbarung',
  },

  cursor: { view: 'Entdecken', drag: 'Ziehen', next: 'Weiter' },

  hero: {
    role: 'Privater Personal Trainer in Zürich',
    headline: 'Massgeschneidertes Training,',
    headlineEm: 'nach Vereinbarung.',
    subline: 'Training und Longevity-Ernährung, eins zu eins, wo immer Sie sind.',
    cta: 'Kostenloses Erstgespräch buchen',
    secondary: 'Kommt Ihnen das bekannt vor?',
    bridge: 'Die meisten Kunden kommen aus denselben Gründen zu Idael.',
    scroll: 'Scrollen',
  },

  pains: {
    title: 'Kommt Ihnen das bekannt vor?',
    answerLabel: 'Mit Idael',
    items: {
      time: { problem: 'Das Training fällt als Erstes weg.', answer: 'Termine passen sich Ihrer Woche an, frühmorgens oder spätabends.' },
      travel: { problem: 'Jede Woche in einer anderen Stadt.', answer: 'Per Live-Video trainieren Sie nahtlos an jedem Ort weiter.' },
      dining: { problem: 'Geschäftsessen bestimmen Ihren Speiseplan.', answer: 'Ein pragmatischer Ernährungsplan, der im Restaurant funktioniert.' },
      desk: { problem: 'Lange Sitzungstage, Flüge, verspannter Rücken.', answer: 'Gezielte Mobilitäts- und Ausgleichsarbeit in jeder Einheit.' },
      gyms: { problem: 'Überfüllte Fitnessstudios. Gesehen werden.', answer: 'Diskret bei Ihnen zu Hause, im Hotel oder im privaten Studio.' },
      energy: { problem: 'Leistungseinbruch am Nachmittag.', answer: 'Kraft, Ernährung und Regeneration in einem ganzheitlichen Plan.' },
    },
  },

  trainer: {
    title: 'Das ist Idael',
    intro: 'Kubanische Wurzeln, Schweizer Diplom. Leitet Athletic-Programme in führenden Sportzentren, 186K Menschen folgen seinem Training online.',
    credentials: [
      { title: 'Diplomierter Personal Trainer', detail: 'Swiss Academy of Fitness and Sports (SAFS)' },
      { title: 'Programmleitung & Athletic Coaching', detail: 'Führende Sportzentren der Schweiz' },
      { title: 'Latin Dance & High-Intensity Conditioning', detail: 'Erprobte Trainingsmethoden mit 186K Followern' },
    ],
    cta: 'Seine Geschichte',
  },

  showreel: {
    title: 'Idael',
    titleEm: 'in Bewegung',
    intro: 'Auszüge aus seinem Training. Antippen für die nächste Sequenz.',
    prev: 'Vorheriger Clip',
    next: 'Nächster Clip',
    clips: [
      { id: 'core', label: 'Rumpfkraft & Stabilität' },
      { id: 'dance', label: 'Latin Footwork & Dynamik' },
    ],
  },

  why: {
    title: 'Warum Idael',
    intro: 'Sechs Unterschiede, die Kunden im ersten Monat spüren.',
    facts: [
      { value: '1:1', label: 'Jede Einheit ausschliesslich mit Idael persönlich' },
      { value: '2 in 1', label: 'Training und Longevity-Ernährung kombiniert' },
      { value: '5', label: 'Diskrete Trainingsorte, auch direkt bei Ihnen' },
      { value: '186K', label: 'Menschen folgen seinen Methoden auf Instagram' },
      { value: '0', label: 'Fotos oder Namen werden jemals öffentlich geteilt' },
      { value: 'CH', label: 'In der Schweiz diplomiert, in Zürich zu Hause' },
    ],
  },

  bookSection: {
    title: 'Vereinbaren Sie ein',
    titleEm: 'kostenloses Erstgespräch',
    intro: '20 Minuten, unverbindlich, per Telefon oder Video. Idael übernimmt die Planung.',
  },

  services: {
    title: 'Trainingsformate mit Idael',
    intro: 'Individuell als Einzeltraining oder zu zweit als Partnertraining.',
    session: 'Dauer',
    format: 'Format',
    see: 'Details ansehen',
    items: {
      private: {
        name: 'Persönliches Einzeltraining',
        kicker: '1:1 Einzeltraining',
        summary: 'Kraft, Athletik und Mobilität, massgeschneidert auf Ihre Physis.',
        description:
          'Sechs-Wochen-Zyklen, abgestimmt auf Ihren Terminkalender, Reisen und Ihr Tagesbefinden. Bei Ihnen zu Hause, im Hotel, im privaten Studio oder im Freien.',
        format: 'Eins zu eins',
        where: 'Privates Studio, zu Hause, Hotel oder im Freien',
        forWho: ['Sie wünschen messbare körperliche Resultate', 'Ihre Arbeitswoche ist unvorhersehbar', 'Sie schätzen einen vertrauten Trainer, der Sie genau kennt'],
        session: ['Check-in', 'Mobilität', 'Kraftaufbau', 'Konditionierung', 'Cool-down'],
      },
      nutrition: {
        name: 'Ernährungscoaching',
        kicker: 'Ernährung & Longevity',
        summary: 'Ein nachhaltiger Ernährungsplan für Restaurantbesuche, Reisen und späte Abende.',
        description:
          'Klare Richtlinien fürs Auswärtsessen, ein Konzept für Reisetage und ein wöchentlicher Check-in. Direkt synchronisiert mit Ihrem Trainingsplan.',
        format: 'Eins zu eins, persönlich oder per Video',
        where: 'Standortunabhängig',
        forWho: ['Sie essen häufig auswärts oder geschäftlich', 'Sie reisen regelmässig beruflich', 'Sie wollen konstante Energie über den gesamten Tag'],
        session: ['Status quo', 'Wochenrückblick', 'Feinjustierung', 'Konkrete Schritte'],
      },
      duo: {
        name: 'Partnertraining (Duo)',
        kicker: 'Training zu zweit',
        summary: 'Gemeinsam trainieren mit Partnerin, Partner oder Kollegen. Zwei Pläne, eine Einheit.',
        description: 'Sie trainieren zur selben Zeit, jeder mit eigenem individuellem Programm. Ideal für Paare mit unterschiedlichen sportlichen Schwerpunkten.',
        format: 'Zwei Personen',
        where: 'Privates Studio, zu Hause oder Hotel',
        forWho: ['Sie trainieren mit mehr Freude zu zweit', 'Sie verfolgen unterschiedliche Trainingsziele', 'Sie möchten eine feste gemeinsame Stunde im Kalender'],
        session: ['Check-in', 'Gemeinsames Aufwärmen', 'Individuelle Kraft', 'Partner-Zirkel', 'Cool-down'],
      },
      'latin-conditioning': {
        name: 'Latin Dance & Kondition',
        kicker: 'Idaels Signature-Format',
        summary: 'Konditionelle Intervalle, Koordination und Rhythmus aus dem Latin Dance.',
        description: 'Dynamische Intervalle zur Musik mit Ganzkörperbeanspruchung. Keine Vorkenntnisse erforderlich, lediglich Motivation und geeignete Sportschuhe.',
        format: 'Eins zu eins oder Duo',
        where: 'Privates Studio, zu Hause oder Hotel',
        forWho: ['Klassisches Cardio auf dem Laufband langweilt Sie', 'Sie möchten Ausdauer und Agilität schnell zurückgewinnen', 'Sie trainieren gerne energiegeladen mit Musik'],
        session: ['Aufwärmen', 'Schrittkombinationen', 'Intervalltraining', 'Core-Stabilität', 'Ausklang'],
      },
      'body-flow': {
        name: 'Body Flow & Mobilität',
        kicker: 'Mobilität & Regeneration',
        summary: 'Gelenkbeweglichkeit, Atemregulation und kontrollierte Tiefenkraft.',
        description: 'Speziell gegen Verspannungen nach Langstreckenflügen und intensiven Arbeitstagen. Gelenk für Gelenk mobilisieren, gefolgt von ruhiger Kräftigung.',
        format: 'Eins zu eins',
        where: 'Privates Studio, zu Hause, Hotel oder online',
        forWho: ['Sie fühlen sich nach Reisen verspannt und blockiert', 'Sie kehren nach einer Verletzung zurück', 'Sie möchten Ihre Schlafqualität nachhaltig verbessern'],
        session: ['Atemführung', 'Gelenkmobilisation', 'Flow-Bewegungen', 'Regeneration'],
      },
      online: {
        name: 'Online-Coaching & Reisebetreuung',
        kicker: 'Weltweit unterwegs',
        summary: 'Live-Einheiten per Video und strukturierte Pläne für jedes Hotel-Gym.',
        description: 'Trainieren Sie live per Videoverbindung mit Idael und behalten Sie Ihren gewohnten Trainingsrhythmus in jeder Stadt der Welt bei.',
        format: 'Live per Video',
        where: 'Weltweit ortsunabhängig',
        forWho: ['Sie verbringen viel Zeit im Ausland', 'Sie möchten überall denselben festen Trainer', 'Sie müssen oft mit begrenztem Gym-Equipment auskommen'],
        session: ['Check-in', 'Warm-up', 'Hauptblock', 'Finisher', 'Auswertung'],
      },
    },
  },

  method: {
    title: 'So funktioniert die Zusammenarbeit',
    intro: 'Vom ersten Gespräch bis zur kontinuierlichen Fortschrittskontrolle.',
    step: 'Schritt',
    items: [
      { title: 'Erstgespräch', text: 'Ein kostenloses, 20-minütiges Gespräch über Ihre Ziele, Ihren Kalender und gesundheitliche Aspekte.' },
      { title: 'Analyse & Screening', text: 'Präzise Überprüfung von Bewegungsmustern, Kraftstatus und Regenerationskapazität.' },
      { title: 'Ihr massgeschneiderter Plan', text: 'Ein persönlicher Trainings- und Ernährungsplan, abgestimmt auf Ihren geschäftlichen Kalender.' },
      { title: '1:1 Training', text: 'Begleitetes Training diskret bei Ihnen zu Hause, im Hotel, im privaten Studio oder draussen.' },
      { title: 'Fortschrittskontrolle', text: 'Regelmässige Messungen und datenbasierte Anpassung des Programms alle sechs Wochen.' },
    ],
  },

  locations: {
    title: 'Wo Sie trainieren',
    intro: 'Idael kommt direkt zu Ihnen. Diskret und ausschliesslich unter vier Augen.',
    available: 'Trainingszeiten',
    bookTime: 'Termin wählen',
    zones: {
      studio: { name: 'Privates Studio', detail: 'Ausschliesslich ein Kunde pro Zeitfenster.' },
      residence: { name: 'Bei Ihnen zu Hause', detail: 'Idael bringt das gesamte Equipment mit.' },
      hotel: { name: 'Hotels & Privatresidenzen', detail: 'In Zürich und der gesamten Zentralschweiz.' },
      outdoors: { name: 'Im Freien', detail: 'Direkt am Zürichsee bei angenehmem Wetter.' },
      online: { name: 'Online per Video', detail: 'Wenn Sie geschäftlich unterwegs sind.' },
    },
  },

  availabilitySummary: [
    { label: 'Montag bis Freitag', value: '06:00 bis 21:00 Uhr' },
    { label: 'Samstag', value: '08:00 bis 13:00 Uhr' },
    { label: 'Sonntag', value: 'Auf persönliche Anfrage' },
  ],

  // Diskretion gewahrt: Kundenzitate ohne Klarnamen
  testimonials: {
    title: 'Was Klienten sagen',
    intro: 'Namen auf Kundenwunsch vertraulich behandelt.',
    prev: 'Zurück',
    next: 'Weiter',
    items: [
      { quote: 'Der erste Trainer, der sich nach meinem Kalender richtet und nicht umgekehrt.', attribution: 'Unternehmer', place: 'Zürich' },
      { quote: 'Um sechs Uhr morgens bei mir zu Hause, um sieben Uhr fertig. Den Energieschub spüre ich den ganzen Tag.', attribution: 'Private Banker', place: 'Zug' },
      { quote: 'Latin Dance & Kondition ist das einzige Cardiotraining, auf das meine Frau und ich uns jede Woche freuen.', attribution: 'Geschäftsführer', place: 'Luzern' },
      { quote: 'Ich reise zwei Wochen im Monat und behalte dank der Videoeinheiten trotzdem denselben Trainer.', attribution: 'Vorstandsmitglied', place: 'Genf' },
    ],
  },

  faq: {
    title: 'Häufige Fragen',
    intro: 'Haben Sie weitere Fragen? Schreiben Sie Idael direkt via',
    items: [
      { q: 'Muss ich bereits fit sein, um anzufangen?', a: 'Nein. Das anfängliche Screening ermittelt Ihren aktuellen Leistungsstand und das Training setzt genau dort an.' },
      { q: 'Unterstützen Sie auch bei der Ernährung?', a: 'Ja. Die Longevity-Ernährung ist integraler Bestandteil des Konzepts, mit alltagstauglichen Leitlinien für Geschäftsessen und Reisen.' },
      { q: 'Was geschieht bei Geschäftsreisen?', a: 'Die Einheiten laufen nahtlos online weiter, mit massgeschneiderten Übungen für den Hotel-Fitnessraum.' },
      { q: 'Wie läuft die erste Kontaktaufnahme ab?', a: 'Buchen Sie unten ein kostenloses Erstgespräch. Alle weiteren Details besprechen Sie persönlich mit Idael.' },
      { q: 'Ist meine Privatsphäre gewährleistet?', a: 'Absolut. Keine Fotos, keine Kundennamen, keine Social-Media-Erwähnungen ohne ausdrückliche schriftliche Zustimmung.' },
    ],
  },

  booking: {
    steps: ['Terminart', 'Datum & Uhrzeit', 'Ihre Angaben'],
    typeTitle: 'Wählen Sie Ihre Terminart',
    typeHint: 'Sie sind sich unsicher? Beginnen Sie mit dem kostenlosen Erstgespräch.',
    startHere: 'Empfohlen',
    min: 'Min.',
    chooseTime: 'Uhrzeit auswählen',
    types: {
      consultation: { name: 'Kostenloses Erstgespräch', format: 'Telefon oder Video', note: 'Ihre Ziele, Ihr Zeitplan und wie Idael Sie gezielt unterstützen kann.' },
      meeting: { name: 'Persönliches Kennenlernen', format: 'Studio, zu Hause oder Hotel', note: 'Ein erstes Treffen vor Ort inklusive kurzem Bewegungsscreening.' },
    },
    places: {
      video: 'Videoanruf',
      phone: 'Telefonanruf',
      studio: 'Privates Studio (Zürich)',
      home: 'Bei mir zu Hause',
      hotel: 'Hotel oder privates Fitnessstudio',
    },
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    prevMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    timesAvailable: (n) => `${n} freie Termine`,
    unavailable: 'ausgebucht',
    checking: 'Verfügbarkeit wird geprüft',
    legend: 'Kennzeichnet den heutigen Tag. Ausgegraute Tage sind belegt.',
    timeTitle: 'Datum und Uhrzeit wählen',
    timeIntro: (name, minutes) => `${name}, ${minutes} Minuten. Schweizer Lokalzeit.`,
    chooseDay: 'Tag auswählen',
    loadError: 'Die Verfügbarkeit konnte nicht geladen werden. Bitte versuchen Sie es erneut oder kontaktieren Sie Idael direkt via WhatsApp.',
    noneThisMonth: 'In diesem Monat sind keine Termine mehr verfügbar. Bitte prüfen Sie den Folgemonat.',
    startTime: 'Startzeit',
    timesFree: (n) => `${n} ${n === 1 ? 'freier Termin' : 'freie Termine'} an diesem Tag`,
    until: 'bis',
    swissTime: 'Schweizer Zeit',
    parts: ['Vormittag', 'Nachmittag', 'Abend'],
    back: 'Zurück',
    addDetails: 'Angaben ergänzen',
    detailsTitle: 'Ihre Kontaktdaten',
    detailsNote: 'Werden ausschliesslich von Idael persönlich eingesehen.',
    name: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    phoneHint: 'Für eine diskrete Terminerinnerung am Vortag.',
    where: 'Wo möchten Sie sich treffen?',
    goals: 'Was möchten Sie erreichen oder verändern? (optional)',
    goalsHint: 'Ziele, gesundheitliche Besonderheiten oder Vorverletzungen.',
    referral: 'Empfohlen durch (optional)',
    consent: 'Idael darf mich bezüglich dieses Termins per E-Mail, Telefon oder WhatsApp kontaktieren.',
    errors: {
      name: 'Bitte geben Sie Ihren vollständigen Namen an.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@beispiel.ch).',
      phone: 'Bitte geben Sie eine Telefonnummer mit Ländervorwahl an (z.B. +41).',
      place: 'Bitte wählen Sie den gewünschten Treffpunkt.',
      consent: 'Bitte bestätigen Sie diesen Punkt, damit Idael Ihren Termin annehmen kann.',
    },
    sending: 'Wird übermittelt...',
    request: 'Diesen Termin anfragen',
    confirm: 'Kostenloses Erstgespräch anfragen',
    taken: 'Dieser Termin wurde soeben vergeben. Bitte wählen Sie eine andere Zeit.',
    failed: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie Idael via WhatsApp.',
    received: 'Anfrage erfolgreich erhalten',
    confirmed: 'Termin bestätigt',
    thanks: 'Vielen Dank,',
    receivedText: 'Idael wird Ihre Anfrage persönlich prüfen und sich in der Regel innerhalb weniger Stunden bei Ihnen melden.',
    confirmedText: 'Sie erhalten in Kürze eine E-Mail mit sämtlichen Details sowie eine diskrete Erinnerung am Vortag.',
    summary: { session: 'Terminart', when: 'Wann', where: 'Ort', status: 'Status' },
    awaiting: 'Wartet auf Bestätigung',
    addToCalendar: 'Zum Kalender hinzufügen',
    backHome: 'Zurück zur Startseite',
    whatsapp: 'Lieber direkt sprechen? Nachricht an Idael',
    personal: 'Jede Terminanfrage erreicht Idael persönlich.',
    whatsappText: (name, when) => `Grüezi Idael, ich möchte gerne ${name ? `ein ${name.toLowerCase()}` : 'einen Termin'}${when ? ` am ${when}` : ''} vereinbaren.`,
    pageTitle: 'Vereinbaren Sie ein',
    pageTitleEm: 'kostenloses Erstgespräch',
    pageIntro: 'Wählen Sie Ihr gewünschtes Format und ein passendes Zeitfenster. Zeitaufwand ca. zwei Minuten.',
    icsTitle: (name) => `${name} mit Idael Alfonso`,
    icsRequested: 'Angefragt. Bestätigung durch Idael folgt.',
    icsConfirmed: 'Bestätigt.',
  },

  footer: {
    title: 'Beginnen Sie mit einem',
    titleEm: 'kostenlosen Erstgespräch.',
    intro: '20 Minuten per Telefon oder Video. Vollkommen unverbindlich.',
    cta: 'Erstgespräch buchen',
    where: 'Standorte',
    whereText: 'Bei Ihnen zu Hause, im Hotel, im privaten Studio oder im Freien.',
    availability: 'Verfügbarkeit',
    contact: 'Kontakt',
    message: 'Nachricht an Idael',
    explore: 'Navigation',
    about: 'Über Idael',
    services: 'Angebot',
    book: 'Erstgespräch buchen',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    photos: 'Fotografie von Unsplash',
  },

  aboutPage: {
    title: 'Über Idael',
    based: 'Standort',
    languages: 'Sprachen',
    languageList: 'Spanisch, Deutsch, Englisch',
    intro:
      'Idael besitzt das Diplom in Personal Training der Swiss Academy of Fitness and Sports (SAFS) und leitet Athletic-Programme in führenden Sportzentren der Schweiz.',
    story: [
      'Idael wuchs in Kuba mit Musik, Tanz und Sport auf. Rhythmusgefühl, präzise Körperbeherrschung und Freude an der Bewegung prägen bis heute jede einzelne seiner Einheiten.',
      'Er betreut bewusst nur einen ausgewählten Kreis privater Klienten, um jede Einheit individuell vorzubereiten und bei kurzfristigen Terminänderungen maximal flexibel zu bleiben.',
      'Training, Ernährung und Regeneration werden stets als Einheit betrachtet, da isolierte Massnahmen erfahrungsgemäss selten dauerhafte Resultate erzielen.',
    ],
    principlesTitle: 'Seine Arbeitsweise',
    principles: [
      { title: 'Absolute Diskretion', text: 'Keine Fotos, keine Namen, keine Veröffentlichungen ohne Ihre ausdrückliche Zustimmung.' },
      { title: 'Ein ganzheitlicher Plan', text: 'Training, Ernährung und Erholung, exakt auf Ihren geschäftlichen Kalender abgestimmt.' },
      { title: 'Positive Trainingsenergie', text: 'Konsequente Arbeit führt mit der richtigen Atmosphäre und Musik zu nachhaltiger Freude.' },
    ],
    credentialsTitle: 'Qualifikationen & Erfahrung',
    cta: 'Kostenloses Erstgespräch buchen',
    services: 'Das Angebot ansehen',
    portraitAlt: 'Idael Alfonso am Zurich Film Festival',
  },

  servicePage: {
    all: 'Alle Formate',
    session: 'Einheit',
    format: 'Format',
    where: 'Ort',
    book: 'Erstgespräch buchen',
    plan: 'Ablauf der Einheit',
    planTitle: (minutes) => `So sind ${minutes} Minuten aufgebaut`,
    planIntro: 'Ein strukturierter Ablauf, der tagesaktuell feinjustiert wird. Der goldene Block bildet den Trainingsschwerpunkt.',
    minutes: 'Min.',
    range: (from, to) => `${from} bis ${to} Min.`,
    suitsYou: 'Dieses Format passt zu Ihnen, wenn',
    start: 'Der nächste Schritt',
    startText: 'Buchen Sie ein unverbindliches Erstgespräch. Idael berät Sie gerne bei der Auswahl.',
    next: 'Nächstes Format',
  },

  legal: {
    label: 'Rechtliches',
    privacy: {
      title: 'Datenschutzerklärung',
      intro: 'Informationen über den Umgang mit Ihren Daten auf dieser Website.',
      sections: [
        { h: 'Erfasste Daten', p: 'Ihr Name, Ihre E-Mail-Adresse, Ihre Telefonnummer sowie die gewählte Terminart. Keine Tracking- oder Werbe-Cookies.' },
        { h: 'Zweck', p: 'Ausschliesslich zur Organisation, Bestätigung und Durchführung Ihrer Terminanfragen.' },
        { h: 'Zugriff', p: 'Ausschliesslich Idael Alfonso persönlich sowie die für den Kalender genutzte Infrastruktur. Keine Weitergabe oder Verkauf an Dritte.' },
        { h: 'Ihre Rechte', p: 'Sie können jederzeit unentgeltlich Auskunft, Berichtigung oder Löschung Ihrer hinterlegten Daten verlangen.' },
      ],
    },
    imprint: {
      title: 'Impressum',
      intro: 'Gesetzliche Anbieterkennzeichnung dieser Website.',
      sections: [
        { h: 'Verantwortlich', p: 'Idael Alfonso, Zürich, Schweiz.' },
        { h: 'Kontakt', p: 'Siehe Kontaktdaten im Seitenfuss (E-Mail, Telefon und WhatsApp).' },
        { h: 'Haftungshinweis', p: 'Die bereitgestellten sportwissenschaftlichen Informationen ersetzen keine medizinische oder sportärztliche Untersuchung.' },
      ],
    },
  },

  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite existiert nicht oder der aufgerufene Link ist veraltet.',
    home: 'Zurück zur Startseite',
    book: 'Erstgespräch vereinbaren',
  },

  routes: { about: 'Über Idael', book: 'Termin', privacy: 'Datenschutz', imprint: 'Impressum', lost: 'Nicht gefunden' },
}

export default de
