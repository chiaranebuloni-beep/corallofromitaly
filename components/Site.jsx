'use client';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from '@/lib/gsap';
import { LangProvider } from '@/lib/lang';
import Header from './Header';
import Cursor from './Cursor';
import Intro from './Intro';
import HeroB from './sections/HeroB';
import Ribbon from './sections/Ribbon';
import About from './sections/About';
import Quote from './sections/Quote';
import LuigiSection from './sections/LuigiSection';
import Flavors from './sections/Flavors';
import Catalogue from './sections/Catalogue';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function Site() {
  const [ready, setReady] = useState(false);
  // Scroll fluido (Lenis) collegato a ScrollTrigger
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Link interni (#storia, #gusti...) con scroll animato
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Blocca lo scroll durante l'intro
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !ready);
    if (ready) {
      window.__lenis?.start();
      ScrollTrigger.refresh();
    } else window.__lenis?.stop();
  }, [ready]);

  // Ricalcola le posizioni quando i font sono caricati
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <LangProvider>
      <Intro onDone={() => setReady(true)} finalColor="var(--red)" />
      <Cursor />
      <Header />
      <main>
        <HeroB ready={ready} />
        <Ribbon />
        <About />
        <Quote />
        <Flavors />
        <LuigiSection />
        <Catalogue />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
