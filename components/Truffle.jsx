// Tartufo stilizzato, nello stile piatto dell'illustrazione di Luigi
const PALETTE = {
  cacao: { base: '#7a4126', dark: '#5a2d18', light: '#9a5a38' },
  pistacchio: { base: '#9ac43c', dark: '#6f9227', light: '#c4dd7a' },
  nocciola: { base: '#e9c99a', dark: '#b07a48', light: '#f6e2c2' },
  caramello: { base: '#c97b2a', dark: '#94541a', light: '#e6a356' },
};

// puntini fissi (niente random: stesso disegno lato server e client)
const DOTS = [
  [-22, -18, 3.2], [8, -26, 2.6], [24, -8, 3.4], [-6, -4, 2.2], [14, 14, 3], [-24, 10, 2.8],
  [-10, 24, 2.4], [28, 18, 2.2], [0, 10, 1.8], [-30, -2, 2], [18, -20, 1.8], [-14, -30, 1.6],
];

export default function Truffle({ flavor = 'cacao', className = '', style }) {
  const c = PALETTE[flavor] || PALETTE.cacao;
  return (
    <svg className={`truffle ${className}`} viewBox="-50 -50 100 100" style={style} aria-hidden="true">
      <path
        d="M0-44C24-44 44-26 44 0C44 25 25 44 0 44C-25 44-44 25-44 1C-44-26-24-44 0-44Z"
        fill={c.base}
      />
      <path d="M-30-18C-24-34-8-40 6-40C-12-34-24-26-30-18Z" fill={c.light} opacity="0.7" />
      {DOTS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 0 ? c.light : c.dark} />
      ))}
    </svg>
  );
}
