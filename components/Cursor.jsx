'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

// Cursore personalizzato: pallino + cerchio che si ingrandisce sugli elementi interattivi.
// data-cursor="hover" -> cerchio grande; data-cursor-label="..." -> etichetta dentro il cerchio.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' });
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' });
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input, textarea, label');
      const r = ring.current;
      if (!el) {
        r.classList.remove('is-hover', 'is-label', 'is-text');
        return;
      }
      const txt = el.getAttribute('data-cursor-label');
      if (el.matches('input, textarea')) {
        r.classList.add('is-text');
        r.classList.remove('is-hover', 'is-label');
      } else if (txt) {
        label.current.textContent = txt;
        r.classList.add('is-label');
        r.classList.remove('is-hover', 'is-text');
      } else {
        r.classList.add('is-hover');
        r.classList.remove('is-label', 'is-text');
      }
    };
    const down = () => ring.current.classList.add('is-down');
    const up = () => ring.current.classList.remove('is-down');
    const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span ref={label} className="cursor__label" />
      </div>
      <div className="cursor__dot" ref={dot} />
    </div>
  );
}
