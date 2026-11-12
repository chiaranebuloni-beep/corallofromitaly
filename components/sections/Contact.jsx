'use client';
import { useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap';
import { useLang } from '@/lib/lang';
import Arrow from '../Arrow';
import { EMAIL, PHONE, PHONE_HREF, INSTAGRAM } from '@/lib/i18n';
import { Line } from '../Split';
import Luigi from '../Luigi';
import Truffle from '../Truffle';

// Campo dentro la frase: si allarga mentre scrivi
function Blank({ value, onChange, placeholder, type = 'text', required, autoComplete, name }) {
  const len = Math.max((value || placeholder).length, 4);
  return (
    <span className="blank">
      <input
        className="blank__input"
        style={{ width: `${len * 0.64 + 1}em` }}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
    </span>
  );
}

// Modulo "frase da completare": compone l'email nel programma di posta dell'utente.
export default function Contact() {
  const { t } = useLang();
  const m = t.contact.mad;
  const root = useRef(null);
  const luigi = useRef(null);
  const [data, setData] = useState({ name: '', company: '', topic: 0, email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from('.contact__title .line__inner', { yPercent: 110, stagger: 0.1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.contact__title', start: 'top 85%' } });
      gsap.from('.mad > *', { y: 40, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.mad', start: 'top 80%' } });
      gsap.from('.crow', { yPercent: 60, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.contact__rows', start: 'top 90%' } });
      gsap.to('.mad__luigi', { y: -8, rotation: 4, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    },
    { scope: root, dependencies: [t], revertOnUpdate: true }
  );

  const submit = (e) => {
    e.preventDefault();
    const topic = m.topics[data.topic];
    const body = [
      `${m.hello} ${data.name} ${m.topicIntro} ${topic}.`,
      '',
      data.message,
      '',
      `${m.reply} ${data.email}`,
    ].join('\n');
    const subject = `${t.contact.form.subject} — ${topic} — ${data.name}`;
    setSent(true);

    // festa: Luigi salta e piovono tartufi
    const go = () => (window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    if (reducedMotion()) return go();
    const q = root.current;
    gsap.timeline({ onComplete: go })
      .to('.mad__luigi', { y: -60, rotation: -10, duration: 0.25, ease: 'power2.out' })
      .to('.mad__luigi', { y: 0, rotation: 0, duration: 0.6, ease: 'bounce.out' })
      .fromTo(
        q.querySelectorAll('.confetti'),
        { x: 0, y: 0, scale: 0, opacity: 1 },
        {
          x: () => gsap.utils.random(-320, 320),
          y: () => gsap.utils.random(-260, -60),
          scale: () => gsap.utils.random(0.6, 1.2),
          rotation: () => gsap.utils.random(-360, 360),
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.02,
        },
        0
      )
      .to(q.querySelectorAll('.confetti'), { y: '+=300', opacity: 0, duration: 0.8, ease: 'power2.in', stagger: 0.02 }, 0.7);
    setTimeout(() => setSent(false), 4000);
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
      <p className="contact__text">{t.contact.text}</p>

      <form className="mad" onSubmit={submit}>
        <p className="mad__line">
          {m.hello}{' '}
<Blank name="name" required autoComplete="name" placeholder={m.name} value={data.name} onChange={set('name')} />{' '}
          {m.topicIntro}…
        </p>

        <div className="mad__chips" role="radiogroup" aria-label={m.topicIntro}>
          {m.topics.map((tp, i) => (
            <button
              type="button"
              key={tp}
              role="radio"
              aria-checked={data.topic === i}
              className={`chip ${data.topic === i ? 'is-on' : ''}`}
              onClick={() => setData((d) => ({ ...d, topic: i }))}
              data-cursor="hover"
            >
              {tp}
            </button>
          ))}
        </div>

        <p className="mad__line">
          {m.reply}{' '}
          <Blank name="email" type="email" required autoComplete="email" placeholder={m.email} value={data.email} onChange={set('email')} />.
        </p>

        <div className="mad__bottom">
        <label className="mad__note">
          <span>{m.more}</span>
          <textarea rows={3} placeholder={m.morePh} value={data.message} onChange={set('message')} />
        </label>

        <div className="mad__send">
          <button type="submit" className="send" data-cursor="hover">
            <span className="send__label">{sent ? '✓' : m.send}</span>
            <span className="send__arrow" aria-hidden="true"><Arrow /></span>
          </button>
          <div className="mad__luigi" aria-hidden="true">
            <Luigi ref={luigi} variant="sticker" />
          </div>
          <div className="confetti-wrap" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span className="confetti" key={i}>
                <Truffle flavor={['cacao', 'pistacchio', 'nocciola', 'caramello'][i % 4]} />
              </span>
            ))}
          </div>
          <p className="mad__status" aria-live="polite">
            {sent ? m.sent : t.contact.form.note}
          </p>
        </div>
        </div>
      </form>

      <div className="contact__rows">
        <div className="crow">
          <span className="crow__k">{m.cards.person}</span>
          <span className="crow__v">Giulio Stracquadanio</span>
          <span className="crow__icon" aria-hidden="true">✦</span>
        </div>
        <a className="crow" href={`mailto:${EMAIL}`} data-cursor="hover">
          <span className="crow__k">{m.cards.mail}</span>
          <span className="crow__v">{EMAIL}</span>
          <span className="crow__icon" aria-hidden="true"><Arrow /></span>
        </a>
        <a className="crow" href={PHONE_HREF} data-cursor="hover">
          <span className="crow__k">{m.cards.phone}</span>
          <span className="crow__v">{PHONE}</span>
          <span className="crow__icon" aria-hidden="true"><Arrow /></span>
        </a>
        <a className="crow" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" data-cursor="hover">
          <span className="crow__k">{m.cards.ig}</span>
          <span className="crow__v">@corallofromitaly</span>
          <span className="crow__icon" aria-hidden="true"><Arrow /></span>
        </a>
      </div>
    </section>
  );
}
