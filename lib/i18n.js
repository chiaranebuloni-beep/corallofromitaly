// Testi del sito in italiano (lingua principale) e inglese.
// Fonte: catalogo Corallo 2025/2026 e piani editoriali.

export const CATALOGUE_URL = '/files/corallo-catalogo-2025-2026.pdf';
export const EMAIL = 'info@corallofromitaly.com';
export const PHONE = '+39 351 3577250';
export const PHONE_HREF = 'tel:+393513577250';
export const INSTAGRAM = 'https://www.instagram.com/corallofromitaly/';
// Dati legali (P.IVA da inserire appena il cliente la manda: comparirà da sola nel footer)
export const LEGAL = { owner: 'Giulio Stracquadanio', city: 'Modica (RG)', vat: '' };

export const dict = {
  it: {
    nav: { story: 'Storia', flavors: 'Gusti', luigi: 'Luigi', contact: 'Contatti' },
    catalogue: 'Scarica il catalogo',
    catalogueShort: 'Catalogo',
    langLabel: 'Lingua',
    hero: {
      kicker: 'Truffle bites dalla Sicilia',
      scroll: 'Scorri',
    },
    marquee: ['Truffle bites', 'Cacao', 'Pistacchio', 'Nocciola', 'Caramello', 'Fatti a mano', 'From Italy'],
    marquee2: ['Taste of tradition', 'Tre generazioni', 'Un nuovo corso', 'Sicilia nel mondo'],
    about: {
      label: 'La nostra storia',
      text:
        'Corallo nasce da una storia che ha attraversato tre generazioni e poi, ad un certo punto, ha deciso di esplodere in qualcosa di nuovo.',
      text2:
        'Oggi Corallo non si limita a custodire la tradizione siciliana: la reinventa, la ribalta, la porta altrove. Qui il gusto è una dichiarazione d’intenti, le materie prime sono scelte come si scelgono le parole giuste, e la qualità diventa un passaporto per il mondo.',
    },
    quote: {
      text: 'Un seme per fiorire deve cadere a terra.',
      author: 'Nonna Palmina',
      after:
        'È lì, in quell’impatto, che nasce la voglia di uscire dal perimetro sicuro e trasformare un mestiere antico in una visione capace di viaggiare.',
    },
    luigi: {
      label: 'Ti presento Luigi',
      title: ['L’ambasciatore', 'del gusto'],
      text:
        'Luigi, la nostra mascotte, è l’ambasciatore del gusto e del cuore italiano nel mondo, pronto a guidare un nuovo corso. Un percorso che non ha paura di cambiare idea, di rischiare, di sorprendere.',
      lessons: [
        { n: '01', t: 'Con il cioccolato non si ha mai fretta.' },
        { n: '02', t: 'Il tartufo vuole equilibrio.' },
        { n: '03', t: 'Il terzo lo scoprirai solo assaggiandomi.' },
      ],
      deckHint: 'Scorri per sfogliare il mazzo',
      lessonLabel: 'Luigi insegna',
    },
    flavors: {
      label: 'Truffle bites',
      title: 'Quattro gusti, un solo carattere.',
      handmade: 'Modellati a mano',
      items: {
        cacao:
          'La massa pura di cacao detta il tono: intenso, profondo, equilibrato. Una copertura di cacao di prima scelta ne amplifica la forza senza appesantirla. Ogni truffle è modellato a mano, perché certe intensità richiedono cura.',
        pistacchio:
          'Il pistacchio è scelto tra i migliori, tostato finché non libera il suo carattere più vero. Il risultato è un gusto che arriva dritto, senza compromessi. Ogni truffle è lavorato a mano, perché l’intensità nasce solo da gesti precisi.',
        nocciola:
          'Le nocciole selezionate e tostate in laboratorio rivelano un aroma pieno e autentico. Il truffle che ne nasce è essenziale, diretto, fedele alla materia prima. La lavorazione manuale ne definisce l’identità, pezzo dopo pezzo.',
        caramello:
          'Il caramello, preparato e lavorato con cura, rivela una dolcezza intensa e avvolgente. Il truffle che ne nasce è armonioso ed essenziale, capace di evocare ricordi semplici e autentici.',
      },
      names: { cacao: 'Cacao', pistacchio: 'Pistacchio', nocciola: 'Nocciola', caramello: 'Caramello' },
      formats: 'Disponibili in astuccio e in latta',
    },
    gallery: {
      label: 'Piccoli rituali',
      title: ['Uno tira', 'l’altro.'],
      text: 'Piccoli truffles, grandi momenti di piacere, con tutto il gusto e lo stile italiano di Corallo from Italy.',
    },
    cta: {
      label: 'Catalogo 2025 / 2026',
      title: ['Tutto il gusto', 'in un catalogo.'],
      text: 'Gusti, formati e confezioni: scarica il catalogo completo in PDF.',
      button: 'Scarica il PDF',
    },
    contact: {
      label: 'Contatti',
      title: ['Parliamo', 'di gusto.'],
      text: 'Distributori, negozi, ristoranti o semplici golosi: scrivici, ti rispondiamo noi.',
      person: 'Referente',
      mad: {
        hello: 'Ciao Corallo! Mi chiamo',
        name: 'nome e cognome',
        work: 'lavoro per',
        company: 'azienda (facoltativo)',
        topicIntro: 'e vi scrivo per',
        topics: ['distribuzione', 'il mio negozio', 'il mio ristorante o bar', 'regali aziendali', 'pura golosità'],
        reply: 'Potete rispondermi a',
        email: 'la tua email',
        more: 'Vuoi aggiungere qualcosa?',
        morePh: 'Scrivi qui il tuo messaggio…',
        send: 'Invia',
        sent: 'Grazie! Si apre la tua posta…',
        cards: { person: 'CEO', mail: 'Scrivici', phone: 'Chiamaci', ig: 'Seguici' },
      },
      form: {
        name: 'Nome e cognome',
        email: 'Email',
        company: 'Azienda (facoltativo)',
        message: 'Messaggio',
        send: 'Invia messaggio',
        note: '',
        subject: 'Richiesta dal sito',
      },
    },
    footer: {
      rights: 'Tutti i diritti riservati.',
      top: 'Torna su',
      privacy: 'Privacy',
      vat: 'P.IVA',
    },
  },

  en: {
    nav: { story: 'Story', flavors: 'Flavors', luigi: 'Luigi', contact: 'Contact' },
    catalogue: 'Download the catalogue',
    catalogueShort: 'Catalogue',
    langLabel: 'Language',
    hero: {
      kicker: 'Truffle bites from Sicily',
      scroll: 'Scroll',
    },
    marquee: ['Truffle bites', 'Cocoa', 'Pistachio', 'Hazelnut', 'Caramel', 'Handmade', 'From Italy'],
    marquee2: ['Taste of tradition', 'Three generations', 'A new chapter', 'Sicily to the world'],
    about: {
      label: 'Our story',
      text:
        'Corallo was born from a story that spans three generations and then, at a certain point, chose to break open into something new.',
      text2:
        'Today, Corallo doesn’t just preserve Sicilian tradition: it reinvents it, flips it, carries it further. Here, flavor is a statement of intent, ingredients are chosen the way you choose the right words, and quality becomes a passport to the world.',
    },
    quote: {
      text: 'A seed must fall to the ground in order to bloom.',
      author: 'Nonna Palmina',
      after:
        'And it’s in that moment, right at the impact, that the urge arises to step beyond the safe perimeter and turn an ancient craft into a vision ready to travel.',
    },
    luigi: {
      label: 'Meet Luigi',
      title: ['The ambassador', 'of taste'],
      text:
        'Luigi, our mascot, is the ambassador of Italian taste and heart around the globe, ready to lead a new chapter. A path unafraid to change direction, to take risks, to surprise.',
      lessons: [
        { n: '01', t: 'Chocolate is never in a hurry.' },
        { n: '02', t: 'A truffle needs balance.' },
        { n: '03', t: 'The third one? You’ll only find out by tasting me.' },
      ],
      deckHint: 'Scroll to deal the deck',
      lessonLabel: 'Luigi teaches',
    },
    flavors: {
      label: 'Truffle bites',
      title: 'Four flavors, one character.',
      handmade: 'Shaped by hand',
      items: {
        cacao:
          'Pure cacao mass sets the tone: intense, deep, balanced. A fine cacao coating amplifies its strength without weighing it down. Each truffle is shaped by hand, because certain intensities demand care.',
        pistacchio:
          'The pistachios are chosen among the very best, roasted until they release their truest character. The result is a flavor that comes through straight, with no compromises. Each truffle is handcrafted, because intensity is born only from precise gestures.',
        nocciola:
          'Selected hazelnuts, roasted in the workshop, reveal a full and authentic aroma. The truffle that emerges is essential, direct, faithful to the raw ingredient. Handcrafting defines its identity, piece by piece.',
        caramello:
          'The caramel, carefully prepared and crafted, reveals an intense, enveloping sweetness. The truffle is harmonious and essential, evoking simple, authentic memories.',
      },
      names: { cacao: 'Cocoa', pistacchio: 'Pistachio', nocciola: 'Hazelnut', caramello: 'Caramel' },
      formats: 'Available in boxes and tins',
    },
    gallery: {
      label: 'Little rituals',
      title: ['One leads', 'to another.'],
      text: 'Little truffles, big moments of pleasure, with all the Italian taste and style of Corallo from Italy.',
    },
    cta: {
      label: 'Catalogue 2025 / 2026',
      title: ['All the taste', 'in one catalogue.'],
      text: 'Flavors, formats and packaging: download the full catalogue as a PDF.',
      button: 'Download the PDF',
    },
    contact: {
      label: 'Contact',
      title: ['Let’s talk', 'taste.'],
      text: 'Distributors, shops, restaurants or simply sweet tooths: drop us a line, we’ll get back to you.',
      person: 'Contact person',
      mad: {
        hello: 'Hi Corallo! My name is',
        name: 'your full name',
        work: 'I work for',
        company: 'company (optional)',
        topicIntro: 'and I’m writing about',
        topics: ['distribution', 'my shop', 'my restaurant or bar', 'corporate gifts', 'pure sweet tooth'],
        reply: 'You can reply to',
        email: 'your email',
        more: 'Anything to add?',
        morePh: 'Write your message here…',
        send: 'Send',
        sent: 'Thank you! Opening your email…',
        cards: { person: 'CEO', mail: 'Write to us', phone: 'Call us', ig: 'Follow us' },
      },
      form: {
        name: 'Full name',
        email: 'Email',
        company: 'Company (optional)',
        message: 'Message',
        send: 'Send message',
        note: '',
        subject: 'Website enquiry',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      top: 'Back to top',
      privacy: 'Privacy',
      vat: 'VAT',
    },
  },
};
