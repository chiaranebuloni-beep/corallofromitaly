import localFont from 'next/font/local';
import { Archivo } from 'next/font/google';
import './globals.css';

// Forno (versione Trial: sostituire con i file su licenza prima della pubblicazione)
const forno = localFont({
  src: [
    { path: '../public/fonts/forno-regular.woff2', weight: '400' },
    { path: '../public/fonts/forno-medium.woff2', weight: '500' },
    { path: '../public/fonts/forno-bold.woff2', weight: '700' },
    { path: '../public/fonts/forno-black.woff2', weight: '900' },
  ],
  variable: '--font-forno',
  display: 'swap',
});

// Versione variabile solo per l'effetto "waffle" sui numeri (Safari disegna male alcune lettere)
const fornoVar = localFont({
  src: '../public/fonts/forno-var.woff2',
  variable: '--font-forno-var',
  weight: '0 900',
  display: 'swap',
});

// Archivo copre solo i caratteri che mancano nel Forno Trial (à è ù ’ “ ” …)
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-fallback',
  axes: ['wdth'],
  display: 'swap',
});

export const metadata = {
  // quando il dominio sarà collegato: impostare NEXT_PUBLIC_SITE_URL=https://www.corallofromitaly.com
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://corallofromitaly.vercel.app'),
  title: 'Corallo from Italy — Taste of Tradition',
  description:
    'Corallo from Italy: truffle bites siciliani modellati a mano. Cacao, pistacchio, nocciola e caramello. Tre generazioni di tradizione, ribaltate.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Corallo from Italy — Taste of Tradition',
    description: 'Truffle bites siciliani modellati a mano: cacao, pistacchio, nocciola e caramello.',
    siteName: 'Corallo from Italy',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Corallo from Italy — Taste of Tradition' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corallo from Italy — Taste of Tradition',
    description: 'Truffle bites siciliani modellati a mano.',
    images: ['/og.jpg'],
  },
  appleWebApp: { title: 'Corallo' },
};

export const viewport = { themeColor: '#e63329' };

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`has-heroB ${forno.variable} ${fornoVar.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        {/* intro già vista: nascondila prima del primo disegno */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('corallo-intro-seen')==='1'&&location.search.indexOf('intro')<0)document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
