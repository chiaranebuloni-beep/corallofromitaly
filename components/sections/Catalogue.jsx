'use client';
import { useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import Arrow from '../Arrow';
import { CATALOGUE_URL } from '@/lib/i18n';
import { Line } from '../Split';

// Fogli del catalogo: [fronte, retro]
const LEAVES = [
  [0, 1],
  [2, 3],
  [4, 5],
  [7, 8],
  [10, 11],
  [13, 17],
  [18, 19],
];
const src = (n) => `/img/catalogo/p${String(n).padStart(2, '0')}.webp`;

// Anteprima: un libro 3D che si apre e si sfoglia con lo scroll
export default function Catalogue() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const btn = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const leaves = gsap.utils.toArray('.book__leaf');
      const n = leaves.length;
      const setZ = () =>
        leaves.forEach((l, i) => {
          l.style.zIndex = gsap.getProperty(l, 'rotationY') < -90 ? i + 1 : n - i;
        });
      setZ();

      gsap.from('.cta__title .line__inner', { yPercent: 110, stagger: 0.1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.cta__title', start: 'top 85%' } });

      const mm = gsap.matchMedia();
      // Desktop: si sfoglia con lo scroll
      mm.add('(min-width: 900px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onUpdate: setZ,
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * (n * 0.55 + 0.6),
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      // il libro chiuso si raddrizza e scivola al centro mentre si apre la copertina
      tl.fromTo('.book', { rotationX: 28, rotationZ: -8, xPercent: -25, scale: 0.85 }, { rotationX: 8, rotationZ: 0, xPercent: -25, scale: 1, duration: 0.6 })
        .to('.book', { xPercent: 0, rotationX: 4, duration: 1 }, '>-0.1');
      leaves.forEach((leaf, i) => {
        tl.to(leaf, { rotationY: -180, duration: 1 }, i === 0 ? '<' : '>-0.45');
        tl.to(leaf.querySelectorAll('.book__shade'), { opacity: 0.35, duration: 0.5, yoyo: true, repeat: 1 }, '<');
      });
      tl.to('.book', { xPercent: 25, rotationX: 10, rotationZ: 4, duration: 0.8 }, '>-0.3')
        .to({}, { duration: 0.3 });
      });
      // Mobile: libro chiuso, si sfoglia solo se vuoi (pulsante)
      mm.add('(max-width: 899px)', () => {
        gsap.set('.book', { xPercent: -25, rotationX: 10, rotationZ: -4 });
      });

      // Bottone magnetico
      const el = btn.current;
      if (!el || !window.matchMedia('(hover: hover)').matches) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  // Mobile: ogni tocco gira una pagina (avanti/indietro)
  const [page, setPage] = useState(0);
  const flip = (d) => {
    const leaves = gsap.utils.toArray('.book__leaf', root.current);
    const n = leaves.length;
    const next = Math.max(0, Math.min(n, page + d));
    if (next === page) return;
    const i = d > 0 ? page : next; // foglio che si muove
    const leaf = leaves[i];
    leaf.style.zIndex = 50;
    gsap.to(leaf, {
      rotationY: d > 0 ? -180 : 0,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => (leaf.style.zIndex = d > 0 ? i + 1 : n - i),
    });
    gsap.to('.book', {
      xPercent: next === 0 ? -25 : next === n ? 25 : 0,
      rotationX: next === 0 ? 10 : 4,
      rotationZ: next === 0 ? -4 : 0,
      duration: 0.9,
      ease: 'power3.inOut',
    });
    setPage(next);
  };

  return (
    <section className="cta" ref={root}>
      <div className="cta__panel">
        <div className="cta__top">
          <div>
            <p className="label label--light">
              <span className="label__dot" /> {t.cta.label}
            </p>
            <h2 className="cta__title">
              <Line>{t.cta.title[0]}</Line>
              <Line>{t.cta.title[1]}</Line>
            </h2>
          </div>
          <div className="cta__side">
            <p className="cta__text">{t.cta.text}</p>
            <a ref={btn} className="btn btn--big btn--paper" href={CATALOGUE_URL} download data-cursor="hover">
              <span className="btn__label">{t.cta.button}</span>
              <span className="btn__icon" aria-hidden="true"><Arrow dir="down" /></span>
            </a>
            {/* mobile: sfoglia + pulsantino download */}
            <div className="book__mobile">
              <button className="book__flip" onClick={() => flip(page === LEAVES.length ? -LEAVES.length : 1)}>
                {page === LEAVES.length ? (lang === 'en' ? 'Close' : 'Richiudi') : page === 0 ? (lang === 'en' ? 'Flip through' : 'Sfoglia il catalogo') : lang === 'en' ? 'Next page' : 'Pagina successiva'}
                <Arrow dir="right" />
              </button>
              <a className="book__dl" href={CATALOGUE_URL} download aria-label={t.cta.button}>
                <Arrow dir="down" />
              </a>
            </div>
          </div>
        </div>

        <div className="book-stage">
          <div className="book">
            {LEAVES.map(([f, b], i) => (
              <div className="book__leaf" key={i}>
                <div className="book__face book__face--front">
                  <img src={src(f)} alt={i === 0 ? 'Copertina del catalogo Corallo from Italy 2025/2026' : ''} loading="lazy" draggable="false" />
                  <span className="book__shade" />
                </div>
                <div className="book__face book__face--back">
                  <img src={src(b)} alt="" loading="lazy" draggable="false" />
                  <span className="book__shade" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
