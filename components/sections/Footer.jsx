'use client';
import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import Arrow from '../Arrow';
import { CATALOGUE_URL, EMAIL, INSTAGRAM, LEGAL } from '@/lib/i18n';
import { LOGO_NEGATIVE } from '@/lib/logoNegative';

// Logo in negativo ufficiale (bianco su nero), dal brand sheet
function LogoNegative() {
  return (
    <svg className="footer__logo" viewBox="186 488 223 248" role="img" aria-label="Corallo from Italy — Taste of Tradition">
      {LOGO_NEGATIVE.map((g) => (
        <g key={g.id} data-part={g.id}>
          {g.paths.map((p, i) => (
            <path key={i} d={p.d} fill="var(--paper)" fillRule={p.eo ? 'evenodd' : 'nonzero'} data-letter={g.id === 'corallo' ? '' : undefined} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function Footer() {
  const { t } = useLang();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' } });
      tl.from('.footer__logo [data-part="mascot"]', { scale: 0, rotation: -12, transformOrigin: '50% 100%', duration: 1.1, ease: 'back.out(1.8)' })
        .from('.footer__logo [data-letter]', { yPercent: 120, opacity: 0, stagger: 0.05, duration: 0.6, ease: 'back.out(2)' }, '-=0.7')
        .from('.footer__logo [data-part="from"], .footer__logo [data-part="italy"], .footer__logo [data-part="tagline"]', { opacity: 0, y: 8, duration: 0.5, stagger: 0.1 }, '-=0.4');
      // leggero dondolio solo dopo che Luigi è comparso
      tl.add(() => {
        gsap.fromTo('.footer__logo [data-part="mascot"]', { rotation: -1.5 }, { rotation: 1.5, transformOrigin: '50% 100%', duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });
    },
    { scope: root }
  );

  return (
    <footer className="footer" ref={root}>
      <div className="footer__inner">
        <LogoNegative />
        <div className="footer__cols">
          <div>
            <p className="footer__small">Corallo from Italy</p>
            <p>Taste of Tradition</p>
          </div>
          <div>
            <a href={`mailto:${EMAIL}`} data-cursor="hover">{EMAIL}</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" data-cursor="hover">
              Instagram <Arrow />
            </a>
            <a href={CATALOGUE_URL} download data-cursor="hover">{t.catalogue} <Arrow dir="down" /></a>
          </div>
          <div className="footer__right">
            <a href="#top" data-cursor="hover">{t.footer.top} <Arrow dir="up" /></a>
            <a href="/privacy" data-cursor="hover">{t.footer.privacy}</a>
            <p className="footer__small">© {new Date().getFullYear()} Corallo from Italy. {t.footer.rights}</p>
            <p className="footer__small">
              {LEGAL.owner} · {LEGAL.city}
              {LEGAL.vat ? ` · ${t.footer.vat} ${LEGAL.vat}` : ''}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
