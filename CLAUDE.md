# Corallo from Italy — sito vetrina

Sito one-page animato per corallofromitaly.com (truffle bites siciliani, mascotte "Luigi").
Riferimenti di stile scelti dal cliente: engine.land, bbang.it (fasce di colore, tipografia grossa, animazioni giocose).

## Stack
- Next.js 15 (App Router, JS), GSAP + ScrollTrigger (`@gsap/react`), Lenis per lo scroll fluido.
- Avvio: `npm run dev` → http://localhost:3010 (config in `.claude/launch.json`).

## Struttura
- `components/Site.jsx` monta tutto (Lenis, intro, header, sezioni).
- Sezioni in `components/sections/`: HeroB (+ Hero A), Ribbon (nastri ondulati), About, Quote, Flavors (orizzontale con pin su desktop), LuigiSection, Gallery, Catalogue, Contact, Footer.
- `components/Luigi.jsx` + `lib/logoPaths.js`: logo vettoriale (da CORALLO_LOGO.pdf) diviso in parti animabili (`data-part`).
- Testi IT/EN in `lib/i18n.js`; lingua salvata in localStorage (`lib/lang.js`). Italiano è la lingua principale.
- Immagini in `public/img` (estratte dal catalogo 2025/26 e dai piani editoriali), catalogo PDF in `public/files`.

## Palette (brand sheet)
ink #1d1d1b · rosso #e63329 · verde #9ac43c · rosa #f6b1af

## Versioni a confronto
- Hero: di default la **B** (fondo rosso, CORALLO gigante, Luigi adesivo con tartufi in orbita). La versione classica **A** si vede con `?hero=a` (http://localhost:3010/?hero=a). Quando il cliente sceglie, eliminare l'altra (`components/sections/Hero.jsx` contiene anche le animazioni di Luigi usate altrove: tenerle).

## Da sapere
- **Font Forno**: in `public/fonts` c'è la versione TRIAL (licenza "Personal Use Only", senza lettere accentate né virgolette tipografiche). I caratteri mancanti cadono su Archivo (Google Fonts). Prima di andare online serve la licenza web del Forno: sostituire `public/fonts/forno-var.woff2`.
- Il modulo contatti non ha server: apre il programma di posta con il messaggio precompilato verso info@corallofromitaly.com.
- Il caramello usa la foto del truffle al cacao (nel catalogo non c'è una foto dedicata).
- Caricamento: Luigi giocoliere con i tartufi stilizzati (`components/Truffle.jsx`), poi esplosione di cerchi colorati.
- Footer con il logo negativo ufficiale (`lib/logoNegative.js`, pagina 2 del brand sheet).
- Catalogo: libro 3D sfogliabile con le pagine in `public/img/catalogo`.
- Le foto in `foto truffle/` (alta risoluzione, fondo bianco) non sono ancora usate.
