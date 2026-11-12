'use client';
import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import Luigi, { PIVOTS } from '../Luigi';
import { luigiAssemble, luigiIdle } from '@/lib/luigiAnim';

const ORBIT = [
  '/img/truffle-pistacchio.webp',
  '/img/truffle-cacao.webp',
  '/img/truffle-nocciola.webp',
  '/img/truffle-pistacchio.webp',
  '/img/truffle-cacao.webp',
  '/img/truffle-nocciola.webp',
];

// Versione B: fondo rosso, CORALLO gigante, Luigi "adesivo" con i tartufi in orbita
export default function HeroB({ ready }) {
  const { t } = useLang();
  const root = useRef(null);
  const svg = useRef(null);

  useGSAP(
    () => {
      if (!ready || reducedMotion()) return;
      const s = svg.current;

      const tl = gsap.timeline();
      tl.from('.heroB__letter', {
        yPercent: 120,
        rotation: (i) => (i % 2 ? 12 : -12),
        stagger: 0.06,
        duration: 1,
        ease: 'back.out(1.7)',
      })
        .from('.heroB__sticker', { scale: 0, rotation: -40, duration: 1.1, ease: 'elastic.out(1, 0.55)' }, 0.3)
        .add(luigiAssemble(s), 0.4)
        .from('.heroB__chip', { scale: 0, rotation: (i) => (i ? 30 : -30), duration: 0.7, stagger: 0.1, ease: 'back.out(2.5)' }, 1)
        .from('.heroB__orbit', { opacity: 0, duration: 0.8 }, 0.8)
        .from('.heroB__bottom > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, 1)
        .add(() => luigiIdle(s));

      // Orbita dei tartufi intorno a Luigi (davanti/dietro)
      const items = gsap.utils.toArray('.heroB__orbit-item');
      const state = { a: 0, r: 1 };
      const tick = (time) => {
        const w = root.current.offsetWidth;
        const R = Math.min(w * 0.36, 520) * state.r;
        items.forEach((el, i) => {
          const a = time * 0.35 + (i / items.length) * Math.PI * 2;
          const z = Math.sin(a);
          const sc = 0.55 + 0.45 * ((z + 1) / 2);
          gsap.set(el, {
            x: Math.cos(a) * R,
            y: z * R * 0.22 - 20,
            scale: sc,
            zIndex: z > 0 ? 6 : 1,
            rotation: a * 40,
          });
        });
      };
      gsap.ticker.add(tick);

      // Luigi segue il mouse
      const rx = gsap.quickTo('.heroB__sticker', 'rotation', { duration: 0.8, ease: 'power3' });
      const mx = gsap.quickTo('.heroB__sticker', 'x', { duration: 1, ease: 'power3' });
      const lx = gsap.quickTo('.heroB__word', 'x', { duration: 1.4, ease: 'power3' });
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        rx(nx * 10);
        mx(nx * 30);
        lx(nx * -50);
      };
      window.addEventListener('pointermove', onMove);

      // Allo scroll: le lettere si separano, Luigi si avvicina, l'orbita si allarga
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
        .to('.heroB__letter', { xPercent: (i) => (i - 3) * 55, yPercent: (i) => Math.abs(i - 3) * -12, ease: 'none' }, 0)
        .to('.heroB__luigi', { scale: 1.25, yPercent: 18, ease: 'none' }, 0)
        .to(state, { r: 1.8, ease: 'none' }, 0)
        .to('.heroB__bottom', { opacity: 0, y: 40, ease: 'none' }, 0);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('pointermove', onMove);
      };
    },
    { scope: root, dependencies: [ready] }
  );

  const jump = () => {
    if (reducedMotion()) return;
    const q = (p) => svg.current.querySelectorAll(`[data-part="${p}"]`);
    gsap.timeline()
      .to('.heroB__sticker', { y: -50, rotation: '+=8', duration: 0.25, ease: 'power2.out' })
      .to('.heroB__sticker', { y: 0, rotation: '-=8', duration: 0.7, ease: 'bounce.out' })
      .to(q('flower'), { rotation: '+=360', svgOrigin: PIVOTS.flower, duration: 0.8, ease: 'back.out(1.5)' }, 0)
      .to(q('leaf'), { rotation: '-=360', svgOrigin: PIVOTS.leaf, duration: 0.8, ease: 'back.out(1.5)' }, 0);
  };

  return (
    <section className="heroB" id="top" ref={root}>
      <h1 className="heroB__word" aria-label="Corallo from Italy">
        {'CORALLO'.split('').map((c, i) => (
          <span key={i} className="heroB__letter" aria-hidden="true">
            {c}
          </span>
        ))}
      </h1>

      <div className="heroB__luigi">
        <div className="heroB__orbit" aria-hidden="true">
          {ORBIT.map((src, i) => (
            <img key={i} className="heroB__orbit-item" src={src} alt="" draggable="false" />
          ))}
        </div>
        <button className="heroB__sticker" onClick={jump} data-cursor-label="Ciao!" aria-label="Luigi">
          <Luigi ref={svg} variant="sticker" />
        </button>
        <span className="heroB__chip heroB__chip--from">From</span>
        <span className="heroB__chip heroB__chip--italy">Italy</span>
      </div>

      <div className="heroB__bottom">
        <p className="heroB__kicker">{t.hero.kicker}</p>
        <p className="heroB__tagline">Taste of Tradition</p>
        <p className="heroB__scroll">
          {t.hero.scroll} <span aria-hidden="true">↓</span>
        </p>
      </div>
    </section>
  );
}
