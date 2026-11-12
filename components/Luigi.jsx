'use client';
import { forwardRef } from 'react';
import { LOGO_GROUPS } from '@/lib/logoPaths';

const TEXT = ['from', 'italy', 'corallo', 'tagline'];

// Punti di rotazione (coordinate del disegno originale) usati dalle animazioni
export const PIVOTS = {
  leaf: '244 266',
  flower: '318 262',
  head: '297 306',
  shoeL: '262 432',
  shoeR: '345 428',
  hands: '297 270',
  arcs: '297 330',
  body: '297 340',
  legs: '297 345',
};

/**
 * Luigi, la mascotte. Ogni parte è un <g data-part="..."> animabile.
 * variant: "full" (logo completo) | "mascot" (solo il personaggio) | "lockup" (personaggio + CORALLO, senza tagline)
 */
const Luigi = forwardRef(function Luigi({ variant = 'mascot', className, title = 'Corallo from Italy', mono }, ref) {
  const box = {
    full: '140 200 315 355',
    lockup: '140 200 315 315',
    mascot: '198 204 196 260',
    juggler: '198 240 196 224',
    sticker: '190 196 212 276',
  }[variant];

  let groups = LOGO_GROUPS.filter((g) => {
    if (variant === 'mascot' || variant === 'sticker') return !TEXT.includes(g.id);
    if (variant === 'juggler') return !TEXT.includes(g.id) && !['leaf', 'flower', 'stem'].includes(g.id);
    if (variant === 'lockup') return g.id !== 'tagline';
    return true;
  });
  // senza foglia e fiore, gli archi vanno dietro le mani (altrimenti le punte spuntano sopra)
  if (variant === 'juggler') groups = [...groups.filter((g) => g.id === 'arcs'), ...groups.filter((g) => g.id !== 'arcs')];

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={box}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      style={mono ? { '--red': mono, '--green': mono, '--pink': mono, '--ink': mono } : undefined}
    >
      {variant === 'sticker' && (
        <g className="luigi-outline" fill="var(--paper)" stroke="var(--paper)" strokeWidth="9" strokeLinejoin="round">
          {groups.map((g) => (
            <g key={g.id} data-part={g.id}>
              {g.paths.map((p, i) => (
                <path key={i} d={p.d} />
              ))}
            </g>
          ))}
        </g>
      )}
      {groups.map((g) => (
        <g key={g.id} data-part={g.id}>
          {g.id === 'corallo'
            ? g.paths.map((p, i) => (
                <path key={i} data-letter d={p.d} fill={p.fill} fillRule={p.eo ? 'evenodd' : 'nonzero'} />
              ))
            : g.paths.map((p, i) => (
                <path
                  key={i}
                  d={p.d}
                  fill={mono && p.fill === '#fff' ? 'var(--paper)' : p.fill}
                  fillRule={p.eo ? 'evenodd' : 'nonzero'}
                />
              ))}
        </g>
      ))}
    </svg>
  );
});

export default Luigi;
