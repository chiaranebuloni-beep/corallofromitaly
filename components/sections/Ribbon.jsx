'use client';
import { useId, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';

const W = 1600;

// Onda sinusoidale come path SVG (curve di Bézier a tratti)
function wave(phase, amp, y0, freq = 2) {
  const pts = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const x = -300 + ((W + 600) * i) / steps;
    const y = y0 + Math.sin((x / W) * Math.PI * 2 * freq + phase) * amp;
    pts.push([x, y]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0p] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` Q${x0.toFixed(1)} ${y0p.toFixed(1)} ${mx.toFixed(1)} ${((y0p + y1) / 2).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

// Due nastri ondulati con il testo che scorre lungo la curva e l'onda che si muove allo scroll
export default function Ribbon() {
  const { t } = useLang();
  const root = useRef(null);
  const uid = useId().replace(/:/g, '');
  const text1 = Array(6).fill(t.marquee.join('  ✦  ')).join('  ✦  ');
  const text2 = Array(6).fill(t.marquee2.join('  ✦  ')).join('  ✦  ');

  useGSAP(
    () => {
      const p1 = root.current.querySelectorAll('[data-wave="1"]');
      const p2 = root.current.querySelectorAll('[data-wave="2"]');
      const tp1 = root.current.querySelector('[data-tp="1"]');
      const tp2 = root.current.querySelector('[data-tp="2"]');
      const st = { phase: 0, amp: 60, off1: 0, off2: -1800, boost: 0 };
      const draw = () => {
        const d1 = wave(st.phase, st.amp, 200);
        const d2 = wave(-st.phase * 0.8 + 1.4, st.amp * 0.8, 210, 1.6);
        p1.forEach((p) => p.setAttribute('d', d1));
        p2.forEach((p) => p.setAttribute('d', d2));
        tp1.setAttribute('startOffset', st.off1);
        tp2.setAttribute('startOffset', st.off2);
      };
      draw();
      if (reducedMotion()) return;

      const tick = () => {
        const speed = 1 + st.boost;
        st.off1 -= 1.2 * speed;
        st.off2 += 1.0 * speed;
        if (st.off1 < -1800) st.off1 += 1800;
        if (st.off2 > 0) st.off2 -= 1800;
        draw();
      };
      gsap.ticker.add(tick);

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          st.phase = self.progress * Math.PI * 3;
          st.amp = 40 + Math.sin(self.progress * Math.PI) * 50;
          const v = Math.min(Math.abs(self.getVelocity()) / 400, 6);
          gsap.to(st, { boost: v, duration: 0.2, overwrite: true, onComplete: () => gsap.to(st, { boost: 0, duration: 1.2 }) });
        },
      });
      return () => gsap.ticker.remove(tick);
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  return (
    <section className="ribbon" ref={root} aria-label={t.marquee.join(', ')}>
      <svg viewBox={`0 0 ${W} 420`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <path id={`w1${uid}`} data-wave="1" />
          <path id={`w2${uid}`} data-wave="2" />
        </defs>
        <use href={`#w2${uid}`} className="ribbon__band ribbon__band--2" />
        <text className="ribbon__text ribbon__text--2" dy="17">
          <textPath href={`#w2${uid}`} data-tp="2">
            {text2}
          </textPath>
        </text>
        <use href={`#w1${uid}`} className="ribbon__band ribbon__band--1" />
        <text className="ribbon__text ribbon__text--1" dy="22">
          <textPath href={`#w1${uid}`} data-tp="1">
            {text1}
          </textPath>
        </text>
      </svg>
    </section>
  );
}
