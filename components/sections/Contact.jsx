'use client';
import { useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/i18n';
import { Line } from '../Split';

// Modulo senza server: compone l'email nel programma di posta dell'utente.
export default function Contact() {
  const { t } = useLang();
  const f = t.contact.form;
  const root = useRef(null);
  const [data, setData] = useState({ name: '', email: '', company: '', message: '' });

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from('.contact__title .line__inner', { yPercent: 110, stagger: 0.1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.contact__title', start: 'top 85%' } });
      gsap.from('.contact__info > *, .field, .contact__form .btn', {
        y: 40,
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__grid', start: 'top 80%' },
      });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const body = [
      data.message,
      '',
      '—',
      data.name,
      data.company,
      data.email,
    ]
      .filter((l) => l !== undefined && l !== null)
      .join('\n');
    const subject = `${f.subject}${data.name ? ' — ' + data.name : ''}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contatti" ref={root}>
      <p className="label">
        <span className="label__dot" /> {t.contact.label}
      </p>
      <h2 className="contact__title">
        <Line>{t.contact.title[0]}</Line>
        <Line className="is-red">{t.contact.title[1]}</Line>
      </h2>

      <div className="contact__grid">
        <div className="contact__info">
          <p className="contact__text">{t.contact.text}</p>
          <div className="contact__card">
            <p className="contact__small">{t.contact.person}</p>
            <p className="contact__name">Giulio Stracquadanio</p>
          </div>
          <a className="contact__big-link" href={`mailto:${EMAIL}`} data-cursor="hover">
            {EMAIL}
          </a>
          <a className="contact__big-link" href={PHONE_HREF} data-cursor="hover">
            {PHONE}
          </a>
        </div>

        <form className="contact__form" onSubmit={submit}>
          <label className="field">
            <span>{f.name}</span>
            <input required name="name" autoComplete="name" value={data.name} onChange={set('name')} />
          </label>
          <label className="field">
            <span>{f.email}</span>
            <input required type="email" name="email" autoComplete="email" value={data.email} onChange={set('email')} />
          </label>
          <label className="field">
            <span>{f.company}</span>
            <input name="company" autoComplete="organization" value={data.company} onChange={set('company')} />
          </label>
          <label className="field">
            <span>{f.message}</span>
            <textarea required name="message" rows={4} value={data.message} onChange={set('message')} />
          </label>
          <button type="submit" className="btn btn--ink btn--big" data-cursor="hover">
            <span className="btn__label">{f.send}</span>
            <span className="btn__icon" aria-hidden="true">→</span>
          </button>
          <p className="contact__note">{f.note}</p>
        </form>
      </div>
    </section>
  );
}
