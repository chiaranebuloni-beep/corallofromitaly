'use client';
import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import { Words } from '../Split';

export default function About() {
  const { t } = useLang();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      // Parole che si "accendono" mentre scorri
      gsap.fromTo(
        '.about__big .w',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.about__big', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );
      gsap.from('.about__text .w', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.012,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__text', start: 'top 85%' },
      });
      // la foto entra inclinata e si raddrizza; il tartufo davanti ruota
      gsap.fromTo('.about__card', { rotation: -9, y: 80 }, { rotation: -2, y: -20, ease: 'none', scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom 30%', scrub: true } });
      gsap.fromTo('.about__card img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.about__sticker', { scale: 0, rotation: -60, duration: 1, ease: 'back.out(2.2)', scrollTrigger: { trigger: '.about__visual', start: 'top 45%' } });
      gsap.fromTo('.about__bite', { rotation: -120, y: 120, scale: 0.7 }, { rotation: 60, y: -40, scale: 1, ease: 'none', scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.about__float img', { rotation: -90, y: 80 }, { rotation: 200, y: -120, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center top', scrub: true } });
      gsap.from('.about__label', { x: -40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: 'top 75%' } });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="about" id="storia" ref={root}>
      <p className="label about__label">
        <span className="label__dot" /> {t.about.label}
      </p>
      <div className="about__float" aria-hidden="true">
        <svg className="about__float-ring" viewBox="0 0 200 200">
          <defs>
            <path id="about-ring" d="M100 100 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0" />
          </defs>
          <text>
            <textPath href="#about-ring" textLength="550">
              SICILIA • TRE GENERAZIONI • FROM ITALY • SICILY • THREE GENERATIONS •
            </textPath>
          </text>
        </svg>
        <img src="/img/truffle-pistacchio.webp" alt="" />
      </div>
      <h2 className="about__big">
        <Words text={t.about.text} />
      </h2>
      <div className="about__grid">
        <div className="about__visual">
          <figure className="about__card">
            <img src="/img/post-morso.webp" alt="Un morso a un truffle al pistacchio Corallo" loading="lazy" />
          </figure>
          <img className="about__bite" src="/img/truffle-pistacchio.webp" alt="" aria-hidden="true" loading="lazy" />
          <span className="about__sticker">{t.flavors.handmade}</span>
        </div>
        <p className="about__text">
          <Words text={t.about.text2} />
        </p>
      </div>
    </section>
  );
}
