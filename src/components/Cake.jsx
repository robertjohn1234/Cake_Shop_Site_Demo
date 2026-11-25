// A layered cake drawn with CSS — no photos needed.
// look: { frosting, drip, topper, tiers, mini }  (names come from shop.js)
// size: number (px) or any CSS length, e.g. 'min(260px, 30vh)'
// message: optional text written on the bottom tier
import { frostings, drips } from '../shop';

const TIER_WIDTHS = {
  1: [100],
  2: [64, 100],
  3: [46, 72, 100],
};

function Topper({ type }) {
  if (type === 'berries') {
    return (
      <span className="topper topper--berries">
        <i />
        <i />
        <i />
        <b />
      </span>
    );
  }
  if (type === 'flowers') {
    return (
      <span className="topper topper--flowers">
        <i />
        <i />
        <i />
      </span>
    );
  }
  if (type === 'candles') {
    return (
      <span className="topper topper--candles">
        <i />
        <i />
        <i />
      </span>
    );
  }
  return null;
}

export default function Cake({ look, size = 220, message = '', build = false, className = '' }) {
  const f = frostings[look.frosting] || frostings.ivory;
  const drip = drips[look.drip]?.color;
  const tiers = Math.min(Math.max(look.tiers || 1, 1), 3);
  const widths = TIER_WIDTHS[tiers];
  const dark = look.frosting === 'cocoa';

  return (
    <div
      className={`cake cake--t${tiers}${build ? ' cake--build' : ''}${look.mini ? ' cake--mini' : ''} ${className}`}
      style={{
        '--size': typeof size === 'number' ? `${size}px` : size,
        '--f-light': f.light,
        '--f-base': f.base,
        '--f-dark': f.dark,
        '--drip': drip || 'transparent',
        '--msg': dark ? '#e6cc98' : '#8a6a3f',
      }}
      aria-hidden="true"
    >
      <Topper type={look.topper} />
      {widths.map((w, i) => (
        <div
          className={`cake__tier${drip ? ' has-drip' : ''}`}
          key={`${tiers}-${i}`}
          style={{ '--w': `${w}%`, '--i': tiers - 1 - i }}
        >
          <span className="cake__top" />
          {/* Message is written on the biggest (bottom) tier */}
          {message && i === widths.length - 1 && <span className="cake__message">{message}</span>}
          <span className="cake__pearls" />
        </div>
      ))}
      <span className="cake__board" />
    </div>
  );
}
