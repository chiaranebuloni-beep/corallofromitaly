'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/lang';
import Luigi from './Luigi';

function FlagIT() {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true">
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </svg>
  );
}
function FlagEN() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <clipPath id="uk-c">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#uk-c)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
        <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="12" />
        <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  );
}

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  const links = [
    ['#storia', t.nav.story],
    ['#gusti', t.nav.flavors],
    ['#luigi', t.nav.luigi],
    ['#contatti', t.nav.contact],
  ];

  return (
    <>
    <header ref={ref} className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#top" className="header__logo" aria-label="Corallo from Italy" data-cursor="hover">
        <Luigi variant="mascot" className="header__luigi" />
        <span className="header__word">
          Corallo
          <br />
          from Italy
        </span>
      </a>

      <nav className="header__nav" aria-label="Menu">
        {links.map(([href, label]) => (
          <a key={href} href={href} className="header__link" data-cursor="hover">
            <span className="header__link-in"><span data-text={label}>{label}</span></span>
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <div className="lang" role="group" aria-label={t.langLabel}>
          <button
            className={`lang__btn ${lang === 'it' ? 'is-active' : ''}`}
            onClick={() => setLang('it')}
            aria-pressed={lang === 'it'}
            aria-label="Italiano"
            data-cursor="hover"
          >
            <FlagIT />
            <span>IT</span>
          </button>
          <button
            className={`lang__btn ${lang === 'en' ? 'is-active' : ''}`}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
            aria-label="English"
            data-cursor="hover"
          >
            <FlagEN />
            <span>EN</span>
          </button>
        </div>

        <button
          className="header__burger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {links.map(([href, label], i) => (
          <a key={href} href={href} onClick={() => setOpen(false)} style={{ '--i': i }}>
            {label}
          </a>
        ))}

      </div>
    </>
  );
}
