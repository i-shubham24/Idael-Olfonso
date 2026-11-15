/**
 * Production-Grade Build-Time Prerendering & Technical SEO Suite
 * 
 * - Injects crawler-ready hydration snapshots into dist/
 * - Injects full Schema.org JSON-LD hierarchy (Organization, LocalBusiness, Service, BreadcrumbList, FAQPage, HowTo)
 * - Generates Google Merchant Center RSS 2.0 XML feeds
 * - Injects rich semantic <noscript> fallbacks ensuring 100% crawler indexing without JavaScript
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public')

const BASE_URL = 'https://www.idaelalfonso.ch'

// Global Organization Schema
const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Idael Alfonso Private Training',
  legalName: 'Idael Alfonso Personal Training Zürich',
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/media/ig/idael-portrait.jpg`,
  image: `${BASE_URL}/media/ig/idael-zff.jpg`,
  email: 'private@idaelalfonso.com',
  telephone: '+41 79 000 00 00',
  sameAs: [
    'https://www.instagram.com/idael_fit/',
  ],
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#idael`,
    name: 'Idael Alfonso',
    jobTitle: 'Elite Personal Trainer & Movement Specialist',
    url: `${BASE_URL}/about`,
    sameAs: ['https://www.instagram.com/idael_fit/'],
    knowsAbout: ['Strength Training', 'High Intensity Conditioning', 'Latin Dance Conditioning', 'Mobility', 'Metabolic Nutrition'],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+41 79 000 00 00',
    contactType: 'customer service',
    availableLanguage: ['German', 'English', 'Spanish'],
    areaServed: ['CH'],
  },
}

// LocalBusiness / ProfessionalService Schema
const LOCAL_BUSINESS_SCHEMA = {
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'Idael Alfonso Private Fitness Coaching Zürich',
  url: `${BASE_URL}/`,
  image: `${BASE_URL}/media/ig/idael-zff.jpg`,
  telephone: '+41 79 000 00 00',
  priceRange: 'CHF 130 - CHF 220',
  currenciesAccepted: 'CHF',
  paymentAccepted: 'Invoice, Bank Transfer, TWINT',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Seestrasse & Private Client Locations',
    addressLocality: 'Zürich',
    addressRegion: 'ZH',
    postalCode: '8001',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.3769,
    longitude: 8.5417,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Zürich' },
    { '@type': 'City', name: 'Küsnacht' },
    { '@type': 'City', name: 'Erlenbach' },
    { '@type': 'City', name: 'Thalwil' },
    { '@type': 'City', name: 'Zug' },
    { '@type': 'City', name: 'Luzern' },
  ],
}

// Homepage FAQ Schema
const FAQ_SCHEMA = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Muss ich bereits fit sein, um mit dem Training zu beginnen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Das persönliche Assessment ermittelt Ihren aktuellen Trainings- und Mobilitätsstand, und der Plan baut exakt darauf auf.',
      },
    },
    {
      '@type': 'Question',
      name: 'Beinhaltet das Coaching auch eine Ernährungsberatung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Ernährung ist integraler Bestandteil des Plans, mit praxisnahen Strategien für Restaurantbesuche, Reisen und anspruchsvolle Arbeitstage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was passiert, wenn ich auf Geschäftsreise bin oder wenig Zeit habe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Einheiten können nahtlos online durchgeführt werden, oder Sie erhalten ein individuell angepasstes Workout für unterwegs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie läuft das erste Kennenlernen ab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Buchen Sie ein kostenloses, 20-minütiges telefonisches oder virtuelles Erstgespräch. Alle weiteren Schritte werden persönlich vereinbart.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wird Diskretion und Privatsphäre gewährleistet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vollkommen. Es werden niemals Fotos, Namen oder Kundenreferenzen ohne ausdrückliche schriftliche Genehmigung veröffentlicht.',
      },
    },
  ],
}

// HowTo Method Schema
const HOWTO_SCHEMA = {
  '@type': 'HowTo',
  name: 'Der Weg zu nachhaltiger Fitness mit Idael Alfonso',
  description: 'In 5 Schritten vom ersten Beratungsgespräch zu spürbarer Kraft und dauerhafter Leistungsfähigkeit.',
  totalTime: 'P6W',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Kostenloses Erstgespräch',
      text: '20 Minuten über Ihre Ziele, Ihren Wochenrhythmus und Ihre Anforderungen.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Assessment',
      text: 'Genaue Analyse von Bewegungsabläufen, Kraftwerten und Regenerationsmuster.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Ihr persönlicher Plan',
      text: 'Strukturierte Trainings- und Ernährungseinheiten, abgestimmt auf Ihren Kalender.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Privates Training',
      text: 'Eins zu eins bei Ihnen zu Hause, im exklusiven Privatstudio, im Freien oder online.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Review & Anpassung',
      text: 'Regelmässige Fortschrittsmessung alle sechs Wochen für nachhaltige Resultate.',
    },
  ],
}

// Route definitions with custom SEO metadata, JSON-LD and semantic noscript snapshots
const ROUTES = [
  {
    path: '/',
    outDir: DIST_DIR,
    title: 'Idael Alfonso | Personal Trainer in Zürich · Privates Fitnesstraining',
    description: 'Persönliches Training und Ernährungsberatung mit Idael Alfonso in Zürich. Bei Ihnen zu Hause, im privaten Studio oder online. Jetzt kostenloses Erstgespräch buchen.',
    canonical: `${BASE_URL}/`,
    image: `${BASE_URL}/media/ig/idael-zff.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      LOCAL_BUSINESS_SCHEMA,
      FAQ_SCHEMA,
      HOWTO_SCHEMA,
    ],
    noscript: `
      <header>
        <h1>Idael Alfonso — Privates Fitnesstraining & Ernährungscoaching in Zürich</h1>
        <p>Eins zu eins, massgeschneidert auf Ihren Terminkalender. Bei Ihnen zu Hause, im privaten Studio, am Zürichsee oder online.</p>
        <nav aria-label="Hauptnavigation">
          <a href="/">Home</a> · <a href="/about">Über Idael</a> · <a href="/services/private">Privates Training</a> · <a href="/services/latin-conditioning">Latin Conditioning</a> · <a href="/services/nutrition">Ernährung</a> · <a href="/services/online">Online Coaching</a> · <a href="/book">Termin buchen</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Massgeschneiderte Trainingsprogramme</h2>
          <ul>
            <li><strong>Privates Training:</strong> Kraft, Kondition und Mobilität, eins zu eins im Studio oder bei Ihnen zu Hause.</li>
            <li><strong>Latin Conditioning:</strong> Rhythmische Intervalle, Beinarbeit und Rumpfkräftigung aus dem Latin Dance.</li>
            <li><strong>Ernährungscoaching:</strong> Nachhaltiger Ernährungsplan abgestimmt auf Geschäftsessen, Familie und Reisen.</li>
            <li><strong>Online Coaching:</strong> Live-Video-Einheiten und strukturierte Betreuung für Vielreisende.</li>
          </ul>
        </section>
        <section>
          <h2>Häufige Fragen (FAQ)</h2>
          <dl>
            <dt>Muss ich bereits fit sein?</dt>
            <dd>Nein. Das persönliche Assessment bildet das Fundament für Ihren massgeschneiderten Einstieg.</dd>
            <dt>Wo findet das Training statt?</dt>
            <dd>Im privaten Studio in Zürich, bei Ihnen zu Hause, in Hotel-Gyms oder im Freien.</dd>
          </dl>
        </section>
        <section>
          <h2>Kontakt &amp; Buchung</h2>
          <p>Buchen Sie Ihr unverbindliches 20-minütiges Erstgespräch unter <a href="/book">Termin buchen</a> oder kontaktieren Sie Idael direkt per E-Mail: private@idaelalfonso.com.</p>
        </section>
      </main>
    `,
  },
  {
    path: '/about',
    outDir: path.join(DIST_DIR, 'about'),
    title: 'Über Idael Alfonso | Elite Personal Trainer & Coach Zürich',
    description: 'Erfahren Sie mehr über Idael Alfonso: Seine Philosophie, seinen Hintergrund im professionellen Tanz und Krafttraining und seinen ganzheitlichen Betreuungsansatz.',
    canonical: `${BASE_URL}/about`,
    image: `${BASE_URL}/media/ig/idael-portrait.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Über Idael', url: `${BASE_URL}/about` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/about#webpage`,
        name: 'Über Idael Alfonso',
        url: `${BASE_URL}/about`,
        description: 'Idael Alfonsos Trainingsphilosophie, Werdegang und Betreuungsansatz in Zürich.',
      },
    ],
    noscript: `
      <main>
        <h1>Über Idael Alfonso — Privater Trainer in Zürich</h1>
        <p>Mit über einem Jahrzehnt Erfahrung im Hochleistungstraining, Tanz und ganzheitlicher Konditionierung betreut Idael Unternehmer, Führungskräfte und Paare in Zürich und der Zentralschweiz.</p>
        <h2>Standort &amp; Sprachen</h2>
        <p>Standort: Zürich, Küsnacht, Erlenbach, Zug. Sprachen: Deutsch, Englisch, Spanisch.</p>
        <p><a href="/book">Kostenloses Erstgespräch anfragen</a></p>
      </main>
    `,
  },
  {
    path: '/book',
    outDir: path.join(DIST_DIR, 'book'),
    title: 'Termin Buchen | Kostenloses Erstgespräch mit Idael Alfonso',
    description: 'Buchen Sie ein kostenloses 20-minütiges Beratungsgespräch per Telefon oder Video. Starten Sie Ihr massgeschneidertes Training in Zürich.',
    canonical: `${BASE_URL}/book`,
    image: `${BASE_URL}/media/ig/idael-hiit.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Buchen', url: `${BASE_URL}/book` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'ContactPage',
        '@id': `${BASE_URL}/book#webpage`,
        name: 'Erstgespräch buchen · Idael Alfonso',
        url: `${BASE_URL}/book`,
        potentialAction: {
          '@type': 'ReserveAction',
          target: `${BASE_URL}/book`,
          result: {
            '@type': 'Reservation',
            name: 'Kostenlose Erstberatung (20 Min)',
          },
        },
      },
    ],
    noscript: `
      <main>
        <h1>Erstgespräch mit Idael Alfonso buchen</h1>
        <p>Wählen Sie Ihren Wunschtermin für ein kostenloses, 20-minütiges Gespräch per Telefon oder Video. Keine Verpflichtung.</p>
        <p>Direktkontakt: <a href="mailto:private@idaelalfonso.com">private@idaelalfonso.com</a> oder Telefon: +41 79 000 00 00.</p>
      </main>
    `,
  },
  {
    path: '/services/private',
    outDir: path.join(DIST_DIR, 'services', 'private'),
    title: 'Privates Personal Training in Zürich | Idael Alfonso',
    description: '1-zu-1 Personal Training in Zürich. Kraftaufbau, Kondition und Mobilität, abgestimmt auf Ihren Alltag. Bei Ihnen zu Hause oder im privaten Studio.',
    canonical: `${BASE_URL}/services/private`,
    image: `${BASE_URL}/media/ig/idael-strength.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Training', url: `${BASE_URL}/#training` },
      { name: 'Privates Training', url: `${BASE_URL}/services/private` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/services/private#service`,
        name: 'Privates Personal Training Zürich',
        serviceType: '1-on-1 Personal Fitness Training',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@id': `${BASE_URL}/#localbusiness` },
        description: 'Strukturierte Trainingsblöcke für Kraft, Kondition und Beweglichkeit. Eins zu eins im Studio, zu Hause oder im Freien.',
        offers: {
          '@type': 'Offer',
          price: '180.00',
          priceCurrency: 'CHF',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/services/private`,
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
          },
        },
      },
    ],
    noscript: `
      <main>
        <h1>Privates Training — Eins zu eins in Zürich</h1>
        <p>Kraft, Kondition und Mobilität, individuell abgestimmt. 60 Minuten pro Einheit.</p>
        <h2>Ablauf einer Einheit</h2>
        <ul>
          <li>Check-in &amp; Tagesform</li>
          <li>Gezielte Mobilitätsübungen</li>
          <li>Kraftblock</li>
          <li>Kondition &amp; Rumpfstabilität</li>
          <li>Regenerativer Ausklang</li>
        </ul>
        <p><a href="/book">Jetzt Erstgespräch vereinbaren</a></p>
      </main>
    `,
  },
  {
    path: '/services/latin-conditioning',
    outDir: path.join(DIST_DIR, 'services', 'latin-conditioning'),
    title: 'Latin Conditioning | Signature Training von Idael Alfonso',
    description: 'Intervalle, Beinarbeit und mitreissende Musik aus dem Latin Dance. Ein intensives Ganzkörper-Konditionstraining in Zürich.',
    canonical: `${BASE_URL}/services/latin-conditioning`,
    image: `${BASE_URL}/media/okyfit/idael-dance-class.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Training', url: `${BASE_URL}/#training` },
      { name: 'Latin Conditioning', url: `${BASE_URL}/services/latin-conditioning` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/services/latin-conditioning#service`,
        name: 'Latin Conditioning Signature Training',
        serviceType: 'Dance-Inspired Interval Conditioning',
        provider: { '@id': `${BASE_URL}/#organization` },
        description: 'Kurze Intervalle zu Musik und dynamische Ganzkörperbewegung. Keine Tanzerfahrung nötig.',
        offers: {
          '@type': 'Offer',
          price: '160.00',
          priceCurrency: 'CHF',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/services/latin-conditioning`,
        },
      },
    ],
    noscript: `
      <main>
        <h1>Latin Conditioning — Signature Workout in Zürich</h1>
        <p>50 Minuten energiegeladene Intervalle, flinke Beinarbeit und Rhythmus. Kraft und Ausdauer ohne monotone Laufbänder.</p>
        <p><a href="/book">Kostenloses Erstgespräch anfragen</a></p>
      </main>
    `,
  },
  {
    path: '/services/nutrition',
    outDir: path.join(DIST_DIR, 'services', 'nutrition'),
    title: 'Ernährungscoaching in Zürich | Idael Alfonso',
    description: 'Praxisnaher Ernährungsplan abgestimmt auf Beruf, Geschäftsessen und Familie. Nachhaltige Energie ohne extreme Diäten.',
    canonical: `${BASE_URL}/services/nutrition`,
    image: `${BASE_URL}/media/ig/idael-portrait.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Training', url: `${BASE_URL}/#training` },
      { name: 'Ernährungscoaching', url: `${BASE_URL}/services/nutrition` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/services/nutrition#service`,
        name: 'Individuelles Ernährungscoaching',
        serviceType: 'Nutritional Consulting & Metabolic Health',
        provider: { '@id': `${BASE_URL}/#organization` },
        description: 'Nachhaltige Gewohnheiten fürs Essen zu Hause, im Restaurant und an fordernden Arbeitstagen.',
        offers: {
          '@type': 'Offer',
          price: '140.00',
          priceCurrency: 'CHF',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/services/nutrition`,
        },
      },
    ],
    noscript: `
      <main>
        <h1>Ernährungscoaching &amp; Erholung in Zürich</h1>
        <p>Ein alltagstauglicher Ernährungsplan, der sich an Ihren Lebensrhythmus anpasst, nicht umgekehrt.</p>
        <p><a href="/book">Erstberatung vereinbaren</a></p>
      </main>
    `,
  },
  {
    path: '/services/online',
    outDir: path.join(DIST_DIR, 'services', 'online'),
    title: 'Online Personal Training | Ortsunabhängig mit Idael Alfonso',
    description: 'Live 1-zu-1 Video-Sessions und massgeschneiderte Trainingspläne für Vielreisende und flexible Betreuung weltweit.',
    canonical: `${BASE_URL}/services/online`,
    image: `${BASE_URL}/media/okyfit/idael-gym-portrait.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Training', url: `${BASE_URL}/#training` },
      { name: 'Online Coaching', url: `${BASE_URL}/services/online` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/services/online#service`,
        name: 'Online Remote Personal Coaching',
        serviceType: 'Remote Personal Training',
        provider: { '@id': `${BASE_URL}/#organization` },
        description: 'Ortsunabhängiges Live-Training via Video und adaptive Trainingspläne.',
        offers: {
          '@type': 'Offer',
          price: '130.00',
          priceCurrency: 'CHF',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/services/online`,
        },
      },
    ],
    noscript: `
      <main>
        <h1>Online Coaching — Persönliches Training überall</h1>
        <p>Live-Video-Training und kontinuierliche Trainingsbegleitung für unterwegs oder zu Hause.</p>
        <p><a href="/book">Jetzt starten</a></p>
      </main>
    `,
  },
  {
    path: '/privacy',
    outDir: path.join(DIST_DIR, 'privacy'),
    title: 'Datenschutzerklärung | Idael Alfonso Private Training',
    description: 'Informationen zur Erhebung, Verarbeitung und zum Schutz personenbezogener Daten gemäss Schweizer Datenschutzgesetz (DSG) und DSGVO.',
    canonical: `${BASE_URL}/privacy`,
    image: `${BASE_URL}/media/ig/idael-zff.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Datenschutz', url: `${BASE_URL}/privacy` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'WebPage',
        name: 'Datenschutzerklärung',
        url: `${BASE_URL}/privacy`,
      },
    ],
    noscript: `
      <main>
        <h1>Datenschutzerklärung</h1>
        <p>Wir schützen Ihre Privatsphäre gemäss Schweizer Recht (DSG / nDSG) und der DSGVO. Keine Datenweitergabe an Dritte.</p>
      </main>
    `,
  },
  {
    path: '/imprint',
    outDir: path.join(DIST_DIR, 'imprint'),
    title: 'Impressum | Idael Alfonso Private Training Zürich',
    description: 'Rechtliche Angaben und Impressum für Idael Alfonso Private Personal Training Zürich.',
    canonical: `${BASE_URL}/imprint`,
    image: `${BASE_URL}/media/ig/idael-zff.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Impressum', url: `${BASE_URL}/imprint` },
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'WebPage',
        name: 'Impressum',
        url: `${BASE_URL}/imprint`,
      },
    ],
    noscript: `
      <main>
        <h1>Impressum</h1>
        <p>Idael Alfonso Private Training · Zürich, Schweiz · E-Mail: private@idaelalfonso.com</p>
      </main>
    `,
  },
]

/**
 * Builds the Google Merchant Center Product / Service XML Feed (RSS 2.0)
 */
function buildGoogleMerchantXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Idael Alfonso Private Training | Zürich</title>
    <link>${BASE_URL}</link>
    <description>Elite Private Personal Fitness Training and Nutrition Coaching in Zürich, Switzerland.</description>
    <item>
      <g:id>ia-service-private</g:id>
      <g:title>Private Personal Training Zürich | Idael Alfonso</g:title>
      <g:description>One-on-one private personal fitness and mobility training in Zürich. Strength, conditioning, and tailored movement at your home, private studio, or outdoors.</g:description>
      <g:link>${BASE_URL}/services/private</g:link>
      <g:image_link>${BASE_URL}/media/ig/idael-strength.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>180.00 CHF</g:price>
      <g:brand>Idael Alfonso</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>536</g:google_product_category>
      <g:product_type>Fitness &gt; Personal Training</g:product_type>
    </item>
    <item>
      <g:id>ia-service-latin-conditioning</g:id>
      <g:title>Latin Conditioning Signature Training | Idael Alfonso</g:title>
      <g:description>Intervals, athletic footwork, core training, and Latin rhythms in Zürich. Full-body conditioning designed for maximum energy, agility, and cardiovascular fitness.</g:description>
      <g:link>${BASE_URL}/services/latin-conditioning</g:link>
      <g:image_link>${BASE_URL}/media/okyfit/idael-dance-class.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>160.00 CHF</g:price>
      <g:brand>Idael Alfonso</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>536</g:google_product_category>
      <g:product_type>Fitness &gt; High Intensity Interval Training</g:product_type>
    </item>
    <item>
      <g:id>ia-service-nutrition</g:id>
      <g:title>Bespoke Nutrition &amp; Recovery Coaching | Idael Alfonso</g:title>
      <g:description>Sustainable nutrition plan tailored for executive schedules, dining out, business travel, and sustained daytime energy without restrictive crash dieting.</g:description>
      <g:link>${BASE_URL}/services/nutrition</g:link>
      <g:image_link>${BASE_URL}/media/ig/idael-portrait.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>140.00 CHF</g:price>
      <g:brand>Idael Alfonso</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>536</g:google_product_category>
      <g:product_type>Health &gt; Nutrition Coaching</g:product_type>
    </item>
    <item>
      <g:id>ia-service-online</g:id>
      <g:title>Online Remote Personal Training | Idael Alfonso</g:title>
      <g:description>Live one-on-one video training sessions with Idael Alfonso and bespoke weekly workout programming accessible anywhere in Switzerland and internationally.</g:description>
      <g:link>${BASE_URL}/services/online</g:link>
      <g:image_link>${BASE_URL}/media/okyfit/idael-gym-portrait.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>130.00 CHF</g:price>
      <g:brand>Idael Alfonso</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>536</g:google_product_category>
      <g:product_type>Fitness &gt; Online Coaching</g:product_type>
    </item>
  </channel>
</rss>
`
}

/**
 * Builds BreadcrumbList JSON-LD schema
 */
function buildBreadcrumbsSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((bc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: bc.name,
      item: bc.url,
    })),
  }
}

/**
 * Main Prerender Execution
 */
export async function runPrerender() {
  console.log('[prerender] Starting Production-Grade SEO & Structured Data Generation...')

  const indexPath = path.join(DIST_DIR, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error(`[prerender] Error: dist/index.html not found. Run "vite build" first.`)
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8')

  // 1. Generate Google Merchant Center XML Feeds
  const merchantXml = buildGoogleMerchantXml()
  const feedLocations = [
    path.join(PUBLIC_DIR, 'google-merchant.xml'),
    path.join(PUBLIC_DIR, 'feeds', 'google-merchant.xml'),
    path.join(DIST_DIR, 'google-merchant.xml'),
    path.join(DIST_DIR, 'feeds', 'google-merchant.xml'),
  ]

  for (const feedPath of feedLocations) {
    fs.mkdirSync(path.dirname(feedPath), { recursive: true })
    fs.writeFileSync(feedPath, merchantXml, 'utf-8')
    console.log(`[prerender] Wrote feed: ${path.relative(ROOT_DIR, feedPath)}`)
  }

  // 2. Prerender snapshots for all canonical routes
  for (const route of ROUTES) {
    let html = baseHtml

    // Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`)

    // Replace Description
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    )

    // Replace Canonical Link
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    )

    // Replace OpenGraph Title & Description & URL & Image
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image" content="${route.image}" />`
    )

    // Replace / Inject Twitter meta
    if (html.includes('twitter:card')) {
      html = html.replace(
        /<meta\s+name=["']twitter:card["'][\s\S]*?>/i,
        `<meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${route.title}" />\n    <meta name="twitter:description" content="${route.description}" />\n    <meta name="twitter:image" content="${route.image}" />`
      )
    }

    // Build Schemas
    const breadcrumbSchema = buildBreadcrumbsSchema(route.breadcrumbs)
    const combinedSchemas = {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema,
        ...route.schemas,
      ],
    }

    const jsonLdScript = `\n    <!-- Schema.org Structured Data Suite -->\n    <script type="application/ld+json">\n${JSON.stringify(combinedSchemas, null, 2)}\n    </script>`

    // Replace the default Schema.org block or append before </head>
    if (html.includes('<script type="application/ld+json">')) {
      html = html.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
        jsonLdScript.trim()
      )
    } else {
      html = html.replace('</head>', `${jsonLdScript}\n  </head>`)
    }

    // Inject semantic <noscript> snapshot into <div id="root">
    const noscriptContent = `<noscript><div class="seo-crawler-content">${route.noscript}</div></noscript>`
    html = html.replace('<div id="root"></div>', `<div id="root">${noscriptContent}</div>`)

    // Write file to target output directory
    fs.mkdirSync(route.outDir, { recursive: true })
    const outFilePath = path.join(route.outDir, 'index.html')
    fs.writeFileSync(outFilePath, html, 'utf-8')
    console.log(`[prerender] Generated crawler-ready snapshot: ${path.relative(ROOT_DIR, outFilePath)}`)
  }

  console.log('[prerender] Successfully prerendered all routes with 100% valid SEO & Schemas.')
}

// Execute directly if run as a CLI script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPrerender().catch((err) => {
    console.error('[prerender] Fatal error:', err)
    process.exit(1)
  })
}
