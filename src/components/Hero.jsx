import { shop } from '../shop';
import Cake from './Cake.jsx';

// Little gold sparkles around the cake (x, y in %, delay in s)
const SPARKLES = [
  [14, 22, 0], [82, 16, 1.2], [90, 58, 0.6], [8, 64, 1.8], [70, 84, 2.4], [24, 88, 0.9], [50, 8, 2],
];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow" data-reveal>
            Cake atelier · Made to order
          </p>
          <h1 className="hero__title" data-reveal style={{ '--d': '0.1s' }}>
            Cakes made for your <em>sweetest</em> moments.
          </h1>
          <p className="hero__sub" data-reveal style={{ '--d': '0.2s' }}>
            {shop.tagline} Choose a signature cake or design your own — then send your order straight to our
            Messenger.
          </p>
          <div className="hero__cta" data-reveal style={{ '--d': '0.3s' }}>
            <a href="#design" className="btn btn--dark">
              Design your cake
            </a>
            <a href="#cakes" className="btn btn--line">
              Browse cakes
            </a>
          </div>
          <ul className="hero__details" data-reveal style={{ '--d': '0.4s' }}>
            <li>Order {shop.leadDays.custom} days ahead</li>
            <li>Pickup &amp; delivery</li>
            <li>Custom messages</li>
          </ul>
        </div>

        <div className="hero__visual" data-reveal style={{ '--d': '0.15s' }}>
          <div className="arch">
            {SPARKLES.map(([x, y, d], i) => (
              <span key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />
            ))}
            <Cake
              look={{ frosting: 'ivory', drip: 'gold', topper: 'flowers', tiers: 3 }}
              size={300}
              build
              className="hero__cake"
            />
          </div>

          {/* Slowly rotating round badge */}
          <svg className="seal" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="58" />
            <text>
              <textPath href="#seal-circle">HANDCRAFTED · MADE TO ORDER ·</textPath>
            </text>
            <g className="seal__mark">
              <path d="M60 46 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
