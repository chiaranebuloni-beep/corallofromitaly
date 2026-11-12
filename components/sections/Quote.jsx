'use client';
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import { LOGO_GROUPS } from '@/lib/logoPaths';
import { Words } from '../Split';
import Truffle from '../Truffle';

const part = (id) => LOGO_GROUPS.find((g) => g.id === id).paths;

function Bloom() {
  return (
    <svg className="quote__bloom" viewBox="228 200 140 112" aria-hidden="true">
      <path data-p="stem" d="M297 312C297 295 268 290 252 266" pathLength="1" />
      <path data-p="stem" d="M297 312C297 295 322 288 324 262" pathLength="1" />
      <g data-p="leaf">
        {part('leaf').map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} />
        ))}
      </g>
      <g data-p="flower">
        {part('flower').map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} />
        ))}
      </g>
    </svg>
  );
}

// "Un seme per fiorire deve cadere a terra": il truffle cade, tocca terra e sboccia il fiore
export default function Quote() {
  const { t } = useLang();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 0px)', () => {
        // Testo: compare una volta e resta
        const text = gsap.timeline({ paused: true })
          .fromTo('.quote__text .w', { yPercent: 105 }, { yPercent: 0, stagger: 0.035, duration: 0.7, ease: 'power4.out' })
          .fromTo('.quote__mark', { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.5)' }, 0.1)
          .fromTo('.quote__author, .quote__after', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, 0.3);

        // Seme che cade e fiore che sboccia: gira da solo in loop
        const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.25 });
        loop
          .set('.quote__seed', { y: () => -root.current.querySelector('.quote__stage').offsetHeight * 0.9, rotation: 0, x: 0, scaleX: 1, scaleY: 1, transformOrigin: '50% 100%' })
          .set('.quote__shadow', { scale: 0.15, opacity: 0 })
          .set('.quote__dust', { x: 0, y: 0, opacity: 0, scale: 1 })
          .set('.quote__bloom [data-p="stem"]', { strokeDashoffset: 1 })
          .set('.quote__bloom [data-p="flower"]', { scale: 0, rotation: -120, svgOrigin: '322 268' })
          .set('.quote__bloom [data-p="leaf"]', { scale: 0, rotation: 120, svgOrigin: '262 268' })
          // caduta con gravità, l'ombra cresce mentre si avvicina a terra
          .to('.quote__seed', { y: 0, duration: 0.55, ease: 'power3.in' })
          .to('.quote__shadow', { scale: 1, opacity: 0.22, duration: 0.55, ease: 'power3.in' }, '<')
          // impatto: si schiaccia e solleva un po' di polvere
          .to('.quote__seed', { scaleY: 0.72, scaleX: 1.22, duration: 0.07, ease: 'power1.out' })
          .to('.quote__dust', {
            x: (i) => (i % 2 ? 1 : -1) * gsap.utils.random(18, 70),
            y: () => gsap.utils.random(-30, -8),
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          }, '<')
          .to('.quote__dust', { opacity: 0, scale: 0.3, duration: 0.3 }, '>-0.05')
          // piccolo rimbalzo
          .to('.quote__seed', { y: -18, scaleY: 1.04, scaleX: 0.97, duration: 0.14, ease: 'power2.out' }, '<-0.3')
          .to('.quote__shadow', { scale: 0.85, opacity: 0.16, duration: 0.14, ease: 'power2.out' }, '<')
          .to('.quote__seed', { y: 0, scaleY: 1, scaleX: 1, duration: 0.12, ease: 'power2.in' })
          .to('.quote__shadow', { scale: 1, opacity: 0.22, duration: 0.12, ease: 'power2.in' }, '<')
          .to('.quote__seed', { scaleY: 0.9, scaleX: 1.08, duration: 0.05 })
          .to('.quote__seed', { scaleY: 1, scaleX: 1, duration: 0.12 })
          // il seme affonda nel terreno
          .to('.quote__seed', { y: () => root.current.querySelector('.quote__seed').offsetHeight * 1.05, duration: 0.35, ease: 'power2.in' }, '+=0.08')
          .to('.quote__shadow', { scale: 0.3, opacity: 0, duration: 0.3 }, '<')
          .to('.quote__bloom [data-p="stem"]', { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, '>-0.1')
          .to('.quote__bloom [data-p="flower"]', { scale: 1, rotation: 0, svgOrigin: '322 268', ease: 'elastic.out(1, 0.7)', duration: 0.8 }, '>-0.15')
          .to('.quote__bloom [data-p="leaf"]', { scale: 1, rotation: 0, svgOrigin: '262 268', ease: 'elastic.out(1, 0.7)', duration: 0.8 }, '<0.06')
          // resta sbocciato, poi si richiude e ricomincia
          .to('.quote__bloom [data-p="flower"], .quote__bloom [data-p="leaf"]', { scale: 0, duration: 0.35, ease: 'back.in(1.6)' }, '+=2.6')
          .to('.quote__bloom [data-p="stem"]', { strokeDashoffset: 1, duration: 0.3, ease: 'power2.in' }, '<0.15');

        loop.timeScale(1.6);
        // parte appena la sezione entra nello schermo e non si ferma più
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          once: true,
          onEnter: () => loop.play(),
        });
        // la frase entra subito, da sola
        ScrollTrigger.create({
          trigger: '.quote__body',
          start: 'top 95%',
          once: true,
          onEnter: () => text.timeScale(1.4).play(),
        });
      });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="quote" ref={root}>
      <div className="quote__stage">
        <Bloom />
        <div className="quote__drop" aria-hidden="true">
          <div className="quote__seed">
            <Truffle flavor="cacao" />
          </div>
        </div>
        <span className="quote__shadow" aria-hidden="true" />
        <div className="quote__ground" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="quote__dust" />
          ))}
        </div>
      </div>
      <blockquote className="quote__body">
        <p className="quote__text">
          <span className="quote__mark" aria-hidden="true">“</span>
          <Words text={t.quote.text} />
        </p>
        <footer className="quote__author">— {t.quote.author}</footer>
        <p className="quote__after">{t.quote.after}</p>
      </blockquote>
    </section>
  );
}
