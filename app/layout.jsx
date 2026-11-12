import localFont from 'next/font/local';
import { Archivo } from 'next/font/google';
import './globals.css';

// Forno (versione Trial: sostituire con i file su licenza prima della pubblicazione)
const forno = localFont({
  src: '../public/fonts/forno-var.woff2',
  variable: '--font-forno',
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
  metadataBase: new URL('https://www.corallofromitaly.com'),
  title: 'Corallo from Italy — Taste of Tradition',
  description:
    'Corallo from Italy: truffle bites siciliani modellati a mano. Cacao, pistacchio, nocciola e caramello. Tre generazioni di tradizione, ribaltate.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Corallo from Italy — Taste of Tradition',
    description: 'Truffle bites siciliani modellati a mano.',
    images: ['/img/luigi-trio.webp'],
  },
};

export const viewport = { themeColor: '#e63329' };

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${forno.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
