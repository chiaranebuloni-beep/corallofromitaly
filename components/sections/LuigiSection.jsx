'use client';
import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import { Line } from '../Split';
import Luigi from '../Luigi';
import { luigiIdle } from '@/lib/luigiAnim';
import Truffle from '../Truffle';

const CARDS = ['/img/post-luigi-01.webp', '/img/post-luigi-02.webp', 'card-03'];
const TILT = [-4, 5, -7, 3];

export default function LuigiSection() {
  const { t } = useLang();
  const root = useRef(null);
  const svg = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from('.luigi__title .line__inner', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.luigi__title', start: 'top 80%' },
      });
      gsap.from('.luigi__text', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.luigi__text', start: 'top 88%' } });
      gsap.from('.luigi__mini', { scale: 0, rotation: -90, duration: 1.2, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: '.luigi__title', start: 'top 80%' } });
      if (svg.current) luigiIdle(svg.current);

      // Illustrazione che si apre a cerchio
      gsap.fromTo('.luigi__trio', { clipPath: 'circle(8% at 50% 50%)' }, {
        clipPath: 'circle(75% at 50% 50%)',
        ease: 'none',
        scrollTrigger: { trigger: '.luigi__trio', start: 'top 85%', end: 'center 45%', scrub: true },
      });
      gsap.fromTo('.luigi__trio img', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.luigi__trio', start: 'top bottom', end: 'bottom top', scrub: true } });

      // Mazzo di carte: allo scroll le carte vengono "lanciate" una alla volta
      const cards = gsap.utils.toArray('.deck__card');
      const lessons = gsap.utils.toArray('.deck__lesson');
      gsap.set(cards, { rotation: (i) => TILT[i], y: (i) => i * 10, scale: (i) => 1 - i * 0.04, zIndex: (i) => cards.length - i });
      gsap.set(lessons, { yPercent: (i) => (i ? 100 : 0), opacity: (i) => (i ? 0 : 1) });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.deck',
          start: 'top top',
          end: () => '+=' + window.innerHeight * (cards.length - 0.5),
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      // ingresso: il mazzo si apre a ventaglio e si richiude
      tl.to(cards, { rotation: (i) => (i - 1.5) * 9, x: (i) => (i - 1.5) * 40, duration: 0.5, ease: 'power2.out' })
        .to(cards, { rotation: (i) => TILT[i], x: 0, duration: 0.4, ease: 'power2.in' });
      cards.slice(0, -1).forEach((card, i) => {
        const dir = i % 2 ? 1 : -1;
        tl.to(card, { x: () => dir * window.innerWidth * 0.12, y: () => -window.innerHeight * 1.15, rotation: dir * 28, duration: 1, ease: 'power2.in' })
          .to(cards.slice(i + 1), { y: (j) => j * 10, scale: (j) => 1 - j * 0.04, rotation: (j) => (j === 0 ? 0 : TILT[i + 1 + j]), duration: 0.6, ease: 'power2.out' }, '-=0.4')
          .to(lessons[i], { yPercent: -100, opacity: 0, duration: 0.4 }, '<')
          .to(lessons[i + 1], { yPercent: 0, opacity: 1, duration: 0.4 }, '<0.1')
          .to({}, {
            duration: 0.01,
            onStart: () => (root.current.querySelector('.deck__count b').textContent = String(i + 2).padStart(2, '0')),
            onReverseComplete: () => (root.current.querySelector('.deck__count b').textContent = String(i + 1).padStart(2, '0')),
          }, '<');
      });
      tl.to({}, { duration: 0.4 });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="luigi" id="luigi" ref={root}>
      <div className="luigi__head">
        <p className="label">
          <span className="label__dot" /> {t.luigi.label}
        </p>
        <h2 className="luigi__title">
          <Line>{t.luigi.title[0]}</Line>
          <Line className="is-red">
            <span className="luigi__mini" aria-hidden="true">
              <Luigi ref={svg} variant="mascot" />
            </span>
            {t.luigi.title[1]}
          </Line>
        </h2>
        <p className="luigi__text">{t.luigi.text}</p>
      </div>

      <div className="luigi__trio">
        <img src="/img/luigi-trio.webp" alt="Luigi, la mascotte di Corallo from Italy, in tre versioni" loading="lazy" />
      </div>

      <div className="deck">
        <div className="deck__copy">
          <p className="label">{t.luigi.lessonLabel}</p>
          <p className="deck__count">
            <b>01</b>
            <span>/{String(CARDS.length).padStart(2, '0')}</span>
          </p>
          <div className="deck__lessons">
            {t.luigi.lessons.map((l) => (
              <p key={l.n} className="deck__lesson">
                {l.t}
              </p>
            ))}
          </div>
          <p className="deck__hint">{t.luigi.deckHint}</p>
        </div>
        <div className="deck__stack">
          {CARDS.map((src, i) =>
            src === 'card-03' ? (
              <figure className="deck__card lesson3" key={src} aria-label={`${t.luigi.lessonLabel} 03: ${t.luigi.lessons[2].t}`}>
                <div className="lesson3__top">
                  <span>
                    CORALLO
                    <br />
                    FROM ITALY
                  </span>
                  <span>“{t.luigi.lessonLabel.toUpperCase()}”</span>
                </div>
                <div className="lesson3__head">
                  <span className="lesson3__n">03</span>
                  <span className="lesson3__t">{t.luigi.lessons[2].t}</span>
                </div>
                <div className="lesson3__art">
                  <Luigi variant="mascot" className="lesson3__luigi" />
                  <div className="lesson3__mystery">
                    <Truffle flavor="caramello" />
                    <span>?</span>
                  </div>
                </div>
              </figure>
            ) : (
              <figure className="deck__card" key={src}>
                <img src={src} alt={`${t.luigi.lessonLabel} ${t.luigi.lessons[i].n}: ${t.luigi.lessons[i].t}`} loading="lazy" draggable="false" />
              </figure>
            )
          )}
        </div>
      </div>
    </section>
  );
}
