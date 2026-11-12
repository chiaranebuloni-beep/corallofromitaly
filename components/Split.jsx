import { Fragment } from 'react';

// Divide un testo in parole (e opzionalmente lettere) dentro span animabili
export function Words({ text, className = 'w' }) {
  return text.split(' ').map((w, i, arr) => (
    <Fragment key={i}>
      <span className="word-wrap">
        <span className={className}>{w}</span>
      </span>
      {i < arr.length - 1 ? ' ' : ''}
    </Fragment>
  ));
}

export function Chars({ text, className = 'c' }) {
  return text.split('').map((c, i) => (
    <span key={i} className={className} aria-hidden="true">
      {c === ' ' ? ' ' : c}
    </span>
  ));
}

// Riga di titolo con maschera: il testo sale dal basso
export function Line({ children, className = '' }) {
  return (
    <span className={`line ${className}`}>
      <span className="line__inner">{children}</span>
    </span>
  );
}
