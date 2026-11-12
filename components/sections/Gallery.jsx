'use client';
import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import { Line } from '../Split';

const ROW1 = ['post-scacchi', 'post-divano', 'post-specchio', 'post-tris', 'post-carrello', 'post-ferragosto'];
const ROW2 = ['post-abbeyroad', 'post-emozioni', 'post-pattern', 'post-unotiralaltro', 'post-farnemeno', 'post-scacchi'];

function Row({ items, className }) {
  return (
    <div className={`gallery__row ${className}`}>
      {items.map((src, i) => (
        <figure className="gallery__item" key={i} data-cursor="hover">
          <img src={`/img/${src}.webp`} alt="Corallo truffle bites" loading="lazy" draggable="false" />
        </figure>
      ))}
    </div>
  );
}

export default function Gallery() {
  const { t } = useLang();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true };
      gsap.fromTo('.gallery__row--a', { xPercent: 5 }, { xPercent: -35, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.gallery__row--b', { xPercent: -35 }, { xPercent: 5, ease: 'none', scrollTrigger: st });
      gsap.from('.gallery__title .line__inner', {
        yPercent: 110,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.gallery__title', start: 'top 85%' },
      });
      gsap.from('.gallery__item', {
        scale: 0.6,
        opacity: 0,
        rotation: () => gsap.utils.random(-15, 15),
        stagger: 0.05,
        duration: 0.9,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.gallery__rows', start: 'top 85%' },
      });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="gallery" ref={root}>
      <div className="gallery__head">
        <p className="label">
          <span className="label__dot" /> {t.gallery.label}
        </p>
        <h2 className="gallery__title">
          <Line>{t.gallery.title[0]}</Line>
          <Line className="is-green">{t.gallery.title[1]}</Line>
        </h2>
        <p className="gallery__text">{t.gallery.text}</p>
      </div>
      <div className="gallery__rows">
        <Row items={ROW1} className="gallery__row--a" />
        <Row items={ROW2} className="gallery__row--b" />
      </div>
    </section>
  );
}
