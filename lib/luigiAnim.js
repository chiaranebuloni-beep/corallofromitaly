'use client';
import { gsap } from '@/lib/gsap';
import { PIVOTS } from '@/components/Luigi';

// Animazioni condivise di Luigi (idle e montaggio pezzo per pezzo)
export function luigiIdle(svg) {
  const q = (p) => svg.querySelectorAll(`[data-part="${p}"]`);
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });
  gsap.set(q('leaf'), { svgOrigin: PIVOTS.leaf });
  gsap.set(q('flower'), { svgOrigin: PIVOTS.flower });
  gsap.set(q('head'), { svgOrigin: PIVOTS.head });
  gsap.set(q('shoeL'), { svgOrigin: PIVOTS.shoeL });
  gsap.set(q('shoeR'), { svgOrigin: PIVOTS.shoeR });
  tl.to(q('leaf'), { rotation: -9, duration: 0.6 }, 0)
    .to(q('leaf'), { rotation: 5, duration: 0.6 }, 0.6)
    .to(q('flower'), { rotation: 10, duration: 0.6 }, 0)
    .to(q('flower'), { rotation: -6, duration: 0.6 }, 0.6)
    .to(q('head'), { rotation: 4, duration: 0.6 }, 0)
    .to(q('head'), { rotation: -4, duration: 0.6 }, 0.6)
    .to(q('shoeL'), { rotation: -14, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' }, 0)
    .to(q('shoeR'), { rotation: 14, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' }, 0.6)
    .to(q('leaf'), { rotation: 0, duration: 0.6 }, 1.2)
    .to(q('flower'), { rotation: 0, duration: 0.6 }, 1.2)
    .to(q('head'), { rotation: 0, duration: 0.6 }, 1.2);
  return tl;
}

// Luigi si "monta" pezzo per pezzo
export function luigiAssemble(svg, opts = {}) {
  const q = (p) => svg.querySelectorAll(`[data-part="${p}"]`);
  const tl = gsap.timeline(opts);
  const pop = { scale: 0, transformOrigin: '50% 50%', ease: 'back.out(2.2)', duration: 0.6 };
  tl.from(q('legs'), { ...pop, transformOrigin: '50% 0%', scaleY: 0, scale: 1 })
    .from(q('shoeL'), { ...pop }, '-=0.35')
    .from(q('shoeR'), { ...pop }, '<0.08')
    .from(q('body'), { ...pop, transformOrigin: '50% 100%' }, '-=0.45')
    .from(q('head'), { ...pop, y: 20, transformOrigin: '50% 100%', ease: 'elastic.out(1, 0.5)', duration: 1 }, '-=0.35')
    .from(q('hands'), { ...pop, y: 30 }, '-=0.8')
    .from(q('arcs'), { ...pop, ease: 'back.out(1.4)' }, '-=0.6')
    .from(q('leaf'), { scale: 0, rotation: -90, transformOrigin: '80% 90%', ease: 'elastic.out(1, 0.45)', duration: 1.2 }, '-=0.5')
    .from(q('flower'), { scale: 0, rotation: 90, transformOrigin: '20% 90%', ease: 'elastic.out(1, 0.45)', duration: 1.2 }, '<0.1');
  if (q('corallo').length) {
    tl.from(svg.querySelectorAll('[data-letter]'), { yPercent: 120, opacity: 0, rotation: () => gsap.utils.random(-25, 25), transformOrigin: '50% 100%', stagger: 0.05, ease: 'back.out(2)', duration: 0.7 }, '-=1')
      .from([...q('from'), ...q('italy')], { opacity: 0, x: (i) => (i ? 20 : -20), duration: 0.5 }, '-=0.6');
  }
  if (q('tagline').length) tl.from(q('tagline'), { opacity: 0, y: 10, duration: 0.5 }, '-=0.3');
  return tl;
}
