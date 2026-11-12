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
      <path data-p="stem" d="M297 312 C297 295 268 290 252 266" pathLength="1" />
      <path data-p="stem" d="M297 312 C297 295 322 288 324 262" pathLength="1" />
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
        const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
        loop
          .set('.quote__seed', { yPercent: -900, rotation: -260, scale: 1, scaleX: 1, scaleY: 1 })
          .set('.quote__bloom [data-p="stem"]', { strokeDashoffset: 1 })
          .set('.quote__bloom [data-p="flower"]', { scale: 0, rotation: -120, svgOrigin: '322 268' })
          .set('.quote__bloom [data-p="leaf"]', { scale: 0, rotation: 120, svgOrigin: '262 268' })
          .to('.quote__seed', { yPercent: 0, rotation: 0, ease: 'power2.in', duration: 0.9 })
          .to('.quote__seed', { scaleY: 0.6, scaleX: 1.35, duration: 0.1, ease: 'power2.out' })
          .fromTo('.quote__ground', { scaleX: 0.6 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, '<')
          .fromTo('.quote__ripple', { scale: 0, opacity: 1 }, { scale: 4, opacity: 0, duration: 0.7, stagger: 0.1 }, '<')
          .to('.quote__seed', { scaleY: 1.1, scaleX: 0.9, yPercent: 30, duration: 0.12 })
          .to('.quote__seed', { scale: 0, duration: 0.3, ease: 'back.in(2)' })
          .to('.quote__bloom [data-p="stem"]', { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, '<0.1')
          .to('.quote__bloom [data-p="flower"]', { scale: 1, rotation: 0, svgOrigin: '322 268', ease: 'elastic.out(1, 0.55)', duration: 1.2 }, '<0.35')
          .to('.quote__bloom [data-p="leaf"]', { scale: 1, rotation: 0, svgOrigin: '262 268', ease: 'elastic.out(1, 0.55)', duration: 1.2 }, '<0.1')
          .add(() => text.play(), '<0.2')
          // resta sbocciato, poi si richiude e ricomincia
          .to('.quote__bloom [data-p="flower"], .quote__bloom [data-p="leaf"]', { scale: 0, duration: 0.5, ease: 'back.in(1.6)' }, '+=2.2')
          .to('.quote__bloom [data-p="stem"]', { strokeDashoffset: 1, duration: 0.4, ease: 'power2.in' }, '<0.2');

        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 10%',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });
      });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="quote" ref={root}>
      <div className="quote__stage">
        <Bloom />
        <div className="quote__seed" aria-hidden="true">
          <Truffle flavor="cacao" />
        </div>
        <div className="quote__ground" aria-hidden="true">
          <span className="quote__ripple" />
          <span className="quote__ripple" />
          <span className="quote__ripple" />
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
