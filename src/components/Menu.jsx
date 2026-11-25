import { useEffect, useRef, useState } from 'react';
import { categories, cakes } from '../shop';
import { useCart } from '../lib/cart.jsx';
import { peso } from '../lib/order';
import Cake from './Cake.jsx';

// Fade-out time when switching category — matches --menu-leave in index.css
function leaveDuration() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  const value = getComputedStyle(document.documentElement).getPropertyValue('--menu-leave');
  const n = parseFloat(value);
  if (Number.isNaN(n)) return 300;
  return value.trim().endsWith('ms') ? n : n * 1000;
}

function CakeCard({ cake, index, onAdded }) {
  const { add } = useCart();
  const [sizeIndex, setSizeIndex] = useState(0);
  const size = cake.sizes[sizeIndex];

  const handleAdd = () => {
    add({
      key: `${cake.id}|${size.label}`,
      name: cake.name,
      size: size.label,
      price: size.price,
      look: cake.look,
    });
    onAdded(`${cake.name} (${size.label}) added to your order`);
  };

  return (
    <article className="cake-card" style={{ '--i': index }}>
      <div className="cake-card__frame">
        {cake.tag && <span className="cake-card__tag">{cake.tag}</span>}
        <Cake look={cake.look} size={cake.look.mini ? 150 : 175} />
      </div>

      <div className="cake-card__body">
        <p className="cake-card__note">{cake.note}</p>
        <h3>{cake.name}</h3>
        <p className="cake-card__desc">{cake.desc}</p>

        {cake.sizes.length > 1 && (
          <div className="size-pick" role="radiogroup" aria-label={`${cake.name} size`}>
            {cake.sizes.map((s, i) => (
              <button
                key={s.label}
                role="radio"
                aria-checked={i === sizeIndex}
                className={i === sizeIndex ? 'is-active' : ''}
                onClick={() => setSizeIndex(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="cake-card__foot">
          <span className="price" key={size.price}>
            {peso(size.price)}
            {cake.sizes.length === 1 && <small> · {size.label}</small>}
          </span>
          <button className="btn btn--line btn--sm" onClick={handleAdd}>
            Add to order
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Menu({ onAdded }) {
  const [category, setCategory] = useState('All');
  const [shown, setShown] = useState('All');
  const [leaving, setLeaving] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (c) => {
    if (c === category) return;
    setCategory(c);
    setLeaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(c);
      setLeaving(false);
    }, leaveDuration());
  };

  const items = shown === 'All' ? cakes : cakes.filter((c) => c.category === shown);

  return (
    <section id="cakes" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">The collection</p>
          <h2 className="section-title">
            Our <em>signature</em> cakes
          </h2>
          <p className="section-sub">Ready designs, baked fresh for your date. Want something unique? Design your own below.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Cake categories" data-reveal>
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === category}
              className={c === category ? 'is-active' : ''}
              onClick={() => choose(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={`cake-grid${leaving ? ' is-leaving' : ''}`} key={shown}>
          {items.map((cake, i) => (
            <CakeCard key={cake.id} cake={cake} index={i} onAdded={onAdded} />
          ))}
        </div>
      </div>
    </section>
  );
}
