'use client';
import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import { Chars } from '../Split';

const FLAVORS = [
  { key: 'cacao', truffle: '/img/truffle-cacao.webp', tins: '/img/tins-cacao.webp', box: '/img/box-cacao.webp' },
  { key: 'pistacchio', truffle: '/img/truffle-pistacchio.webp', tins: '/img/tins-pistacchio.webp', box: '/img/box-pistacchio.webp' },
  { key: 'nocciola', truffle: '/img/truffle-nocciola.webp', tins: '/img/tins-nocciola.webp', box: '/img/box-nocciola.webp' },
  { key: 'caramello', truffle: '/img/truffle-cacao.webp', tins: '/img/tins-caramello.webp', box: '/img/box-caramello.webp' },
];

export default function Flavors() {
  const { t } = useLang();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();

      // Desktop: scorrimento orizzontale con pin
      mm.add('(min-width: 900px)', () => {
        const track = root.current.querySelector('.flavors__track');
        const dist = () => track.scrollWidth - window.innerWidth;
        const h = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + dist(),
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray('.flavor').forEach((panel) => {
          const st = { trigger: panel, containerAnimation: h, start: 'left right', end: 'right left', scrub: true };
          gsap.fromTo(panel.querySelector('.flavor__truffle'), { rotation: -200, xPercent: 60 }, { rotation: 160, xPercent: -60, ease: 'none', scrollTrigger: st });
          gsap.fromTo(panel.querySelector('.flavor__name'), { xPercent: 25 }, { xPercent: -25, ease: 'none', scrollTrigger: st });
          gsap.fromTo(panel.querySelector('.flavor__tins'), { yPercent: 30, rotation: 8 }, { yPercent: -20, rotation: -6, ease: 'none', scrollTrigger: st });
          gsap.fromTo(panel.querySelector('.flavor__box'), { yPercent: -10, rotation: -12 }, { yPercent: 30, rotation: 4, ease: 'none', scrollTrigger: st });
          gsap.from(panel.querySelectorAll('.flavor__name .c'), {
            yPercent: 100,
            rotation: () => gsap.utils.random(-30, 30),
            stagger: 0.03,
            ease: 'back.out(2)',
            duration: 0.8,
            scrollTrigger: { trigger: panel, containerAnimation: h, start: 'left 70%', toggleActions: 'play none none reverse' },
          });
        });
        gsap.from('.flavors__intro .c', {
          yPercent: 110,
          stagger: 0.04,
          ease: 'back.out(2)',
          duration: 0.8,
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        });
      });

      // Mobile: pannelli verticali con piccole animazioni
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.flavor').forEach((panel) => {
          gsap.fromTo(panel.querySelector('.flavor__truffle'), { rotation: -120 }, { rotation: 120, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true } });
          gsap.from(panel.querySelectorAll('.flavor__name .c'), { yPercent: 100, stagger: 0.03, duration: 0.7, ease: 'back.out(2)', scrollTrigger: { trigger: panel, start: 'top 75%' } });
        });
      });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="flavors" id="gusti" ref={root}>
      <div className="flavors__track">
        <div className="flavors__intro">
          <p className="label">
            <span className="label__dot" /> {t.flavors.label}
          </p>
          <h2 className="flavors__big" aria-label="Truffle Bites">
            <span className="line"><Chars text="TRUFFLE" /></span>
            <span className="line"><Chars text="BITES" /></span>
          </h2>
          <p className="flavors__title">{t.flavors.title}</p>
          <p className="flavors__hint" aria-hidden="true">
            <span>→</span>
          </p>
        </div>

        {FLAVORS.map((f, i) => (
          <article key={f.key} className={`flavor flavor--${f.key}`}>
            <div className="flavor__index">
              <span>0{i + 1}</span>
              <span>/04</span>
            </div>
            <h3 className="flavor__name" aria-label={t.flavors.names[f.key]}>
              <Chars text={t.flavors.names[f.key].toUpperCase()} />
            </h3>
            <img className="flavor__truffle" src={f.truffle} alt={`Truffle ${t.flavors.names[f.key]}`} loading="lazy" />
            <figure className="flavor__tins sticker">
              <img src={f.tins} alt={`Latte Corallo ${t.flavors.names[f.key]}`} loading="lazy" />
            </figure>
            <figure className="flavor__box sticker">
              <img src={f.box} alt={`Astuccio Corallo ${t.flavors.names[f.key]}`} loading="lazy" />
            </figure>
            <div className="flavor__info">
              <p className="flavor__tag">{t.flavors.handmade}</p>
              <p className="flavor__desc">{t.flavors.items[f.key]}</p>
              <p className="flavor__formats">{t.flavors.formats}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
