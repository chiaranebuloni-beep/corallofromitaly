'use client';
import { useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import Luigi from './Luigi';
import Truffle from './Truffle';

// Caricamento: Luigi fa il giocoliere con i tartufi mentre il contatore sale,
// poi un tartufo cade al centro ed esplode in cerchi di colore che aprono il sito.
export default function Intro({ onDone, finalColor = 'var(--paper)' }) {
  const root = useRef(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      // solo alla prima visita (per rivederlo: ?intro nell'indirizzo)
      let seen = false;
      try {
        seen = localStorage.getItem('corallo-intro-seen') === '1' && !location.search.includes('intro');
        localStorage.setItem('corallo-intro-seen', '1');
      } catch {}
      if (reducedMotion() || seen) {
        setGone(true);
        onDone();
        return;
      }
      const balls = gsap.utils.toArray('.intro__ball');
      const num = root.current.querySelector('.intro__num');
      const svg = root.current.querySelector('.intro__luigi svg');
      const hands = svg.querySelector('[data-part="hands"]');
      const head = svg.querySelector('[data-part="head"]');

      // Giocoleria a cascata
      const T = 0.42; // durata di un lancio
      const juggle = gsap.timeline({ repeat: -1 });
      balls.forEach((b, i) => {
        const tl = gsap.timeline({ repeat: -1, delay: (i * 2 * T) / 3 });
        tl.fromTo(b, { left: '14%' }, { left: '86%', duration: T, ease: 'none' }, 0)
          .fromTo(b, { yPercent: 0 }, { yPercent: -330, duration: T / 2, ease: 'power2.out' }, 0)
          .to(b, { yPercent: 0, duration: T / 2, ease: 'power2.in' }, T / 2)
          .to(b, { left: '14%', duration: T, ease: 'none' }, T)
          .to(b, { yPercent: -110, duration: T / 2, ease: 'power2.out' }, T)
          .to(b, { yPercent: 0, duration: T / 2, ease: 'power2.in' }, T * 1.5)
          .to(b, { rotation: '+=360', duration: 2 * T, ease: 'none' }, 0);
        juggle.add(tl, 0);
      });
      gsap.to(hands, { y: -4, duration: T / 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to(head, { rotation: 5, svgOrigin: '297 306', duration: T, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      const count = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      tl.from('.intro__luigi', { yPercent: 120, duration: 0.8, ease: 'back.out(1.6)' })
        .from('.intro__ball', { scale: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.3')
        .from('.intro__brand .c', { yPercent: 110, stagger: 0.025, duration: 0.6, ease: 'power3.out' }, 0.2)
        .from('.intro__tag', { opacity: 0, duration: 0.6 }, 0.5)
        .to(count, {
          v: 100,
          duration: 1.5,
          ease: 'power1.inOut',
          onUpdate: () => (num.textContent = String(Math.round(count.v)).padStart(3, '0')),
        }, 0.2)
        .to('.intro__num', { '--waff': 2, duration: 1.5, ease: 'none' }, 0.2)
        // fine: i tartufi cadono, Luigi salta via
        .add(() => juggle.pause())
        .to('.intro__ball', { y: () => window.innerHeight, rotation: 200, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: 'power2.in' })
        .to('.intro__luigi', { yPercent: -30, duration: 0.25, ease: 'power2.out' }, '<')
        .to('.intro__luigi', { y: () => window.innerHeight, autoAlpha: 0, duration: 0.5, ease: 'power3.in' })
        .to('.intro__brand .c, .intro__tag, .intro__num', { yPercent: 110, opacity: 0, duration: 0.4, stagger: 0.01, ease: 'power3.in' }, '<')
        // tartufo che cade al centro
        .fromTo('.intro__drop', { yPercent: -700, scale: 1 }, { yPercent: 0, duration: 0.55, ease: 'power3.in' }, '-=0.2')
        .to('.intro__drop', { scaleY: 0.75, scaleX: 1.2, duration: 0.08, ease: 'power2.out' })
        .to('.intro__drop', { scale: 0, duration: 0.25, ease: 'back.in(2)' })
        // esplosione di cerchi colorati
        .fromTo('.intro__burst', { scale: 0 }, { scale: 1, duration: 0.9, stagger: 0.12, ease: 'expo.out' }, '<0.1')
        .add(() => onDone(), '-=0.35')
        .to(root.current, { opacity: 0, duration: 0.35 }, '-=0.15');
    },
    { scope: root }
  );

  if (gone) return null;
  return (
    <div className="intro" ref={root} aria-hidden="true">
      <p className="intro__tag">Taste of Tradition</p>

      <div className="intro__stage">
        <div className="intro__balls">
          {['cacao', 'pistacchio', 'nocciola'].map((f) => (
            <div key={f} className="intro__ball">
              <Truffle flavor={f} />
            </div>
          ))}
        </div>
        <div className="intro__luigi">
          <Luigi variant="juggler" />
        </div>
      </div>

      <div className="intro__drop">
        <Truffle flavor="cacao" />
      </div>
      {['var(--red)', 'var(--green)', 'var(--pink)', finalColor].map((c, i) => (
        <span key={i} className="intro__burst" style={{ background: c }} />
      ))}

      <div className="intro__bottom">
        <p className="intro__brand">
          {'CORALLO FROM ITALY'.split(' ').map((word, w) => (
            <span key={w} className="intro__wordgrp">
              {word.split('').map((ch, j) => (
                <span key={j} className="line-c">
                  <span className="c">{ch}</span>
                </span>
              ))}
            </span>
          ))}
        </p>
        <p className="intro__num">000</p>
      </div>
    </div>
  );
}
