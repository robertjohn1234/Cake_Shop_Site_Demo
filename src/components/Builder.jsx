// "Design your cake": pick options, see the cake change live, get an estimated price,
// then add it to the order as a custom cake.
import { useState } from 'react';
import { builder, frostings, drips, toppers, occasions, shop } from '../shop';
import { useCart } from '../lib/cart.jsx';
import { peso } from '../lib/order';
import Cake from './Cake.jsx';

const START = {
  occasion: occasions[0],
  size: builder.sizes[0].id,
  flavor: builder.flavors[0].label,
  filling: builder.fillings[0].label,
  frosting: 'blush',
  drip: 'none',
  topper: 'flowers',
  message: '',
  notes: '',
};

// A row of selectable options (buttons)
function Options({ items, value, onChange, render }) {
  return (
    <div className="opts">
      {items.map((it) => {
        const id = it.id ?? it.label;
        return (
          <button
            key={id}
            type="button"
            className={`opt${value === id ? ' is-active' : ''}`}
            aria-pressed={value === id}
            onClick={() => onChange(id)}
          >
            {render ? render(it) : it.label}
          </button>
        );
      })}
    </div>
  );
}

const plus = (n) => (n ? <small>+{peso(n)}</small> : null);

export default function Builder({ onOpenCart }) {
  const { add } = useCart();
  const [c, setC] = useState(START);
  const set = (field) => (value) => setC((prev) => ({ ...prev, [field]: value }));

  const size = builder.sizes.find((s) => s.id === c.size);
  const flavor = builder.flavors.find((f) => f.label === c.flavor);
  const filling = builder.fillings.find((f) => f.label === c.filling);
  const price = size.price + flavor.add + filling.add + drips[c.drip].add + toppers[c.topper].add;
  const look = { frosting: c.frosting, drip: c.drip, topper: c.topper, tiers: size.tiers };
  // Cake drawing size: fits inside the preview frame (cqh/cqw = % of the frame's height/width),
  // and a 6" cake looks smaller than an 8"
  const scale = size.scale || 1;
  const fitHeight = { 1: 120, 2: 92, 3: 76 }[size.tiers];
  const cakeSize = `min(${Math.round(290 * scale)}px, ${Math.round(fitHeight * scale)}cqh, ${Math.round(72 * scale)}cqw)`;

  const addToOrder = () => {
    const finish = [frostings[c.frosting].label, c.drip !== 'none' && drips[c.drip].label, c.topper !== 'none' && toppers[c.topper].label]
      .filter(Boolean)
      .join(' · ');
    const details = [
      `Occasion: ${c.occasion}`,
      `Flavor: ${c.flavor} · Filling: ${c.filling}`,
      `Design: ${finish}`,
      c.message.trim() && `Message on cake: "${c.message.trim()}"`,
      c.notes.trim() && `Design notes: ${c.notes.trim()}`,
    ].filter(Boolean);

    add({
      key: `custom-${Date.now()}`,
      custom: true,
      name: 'Custom cake',
      size: size.label,
      price,
      look,
      details,
    });
    onOpenCart(); // opening the order drawer shows it was added
  };

  return (
    <section id="design" className="section builder">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Made just for you</p>
          <h2 className="section-title">
            Design your <em>own</em> cake
          </h2>
          <p className="section-sub">
            Pick your size, flavor and finish — watch your cake come together, then send it to us. Custom cakes need{' '}
            {shop.leadDays.custom} days' notice.
          </p>
        </div>

        <div className="builder__grid">
          {/* Live preview — every choice shows up here */}
          <div className="builder__preview" data-reveal>
            <div className="arch arch--preview">
              <span className="preview__label">
                {c.occasion} cake · {size.label}
              </span>
              <Cake look={look} size={cakeSize} message={c.message.trim()} build />
            </div>

            <div className="preview__row">
              {/* Cross-section showing the chosen flavor and filling */}
              <div className="slice-wrap">
                <span
                  className="slice"
                  style={{ '--sponge': flavor.color, '--filling': filling.color, '--frost': frostings[c.frosting].base }}
                  aria-hidden="true"
                />
                <span className="slice-wrap__text">
                  <small>Inside</small>
                  {c.flavor}
                  <br />
                  with {c.filling.toLowerCase()}
                </span>
              </div>

              <div className="builder__price">
                <span>Estimated</span>
                <strong key={price}>{peso(price)}</strong>
                <small>{size.serves}</small>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="builder__form" data-reveal style={{ '--d': '0.1s' }}>
            <fieldset className="step">
              <legend>
                <span>01</span> Occasion
              </legend>
              <Options items={occasions.map((o) => ({ label: o }))} value={c.occasion} onChange={set('occasion')} />
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>02</span> Size
              </legend>
              <Options
                items={builder.sizes}
                value={c.size}
                onChange={set('size')}
                render={(s) => (
                  <>
                    {s.label}
                    <small>{s.serves}</small>
                  </>
                )}
              />
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>03</span> Cake flavor
              </legend>
              <Options
                items={builder.flavors}
                value={c.flavor}
                onChange={set('flavor')}
                render={(f) => (
                  <>
                    {f.label}
                    {plus(f.add)}
                  </>
                )}
              />
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>04</span> Filling
              </legend>
              <Options
                items={builder.fillings}
                value={c.filling}
                onChange={set('filling')}
                render={(f) => (
                  <>
                    {f.label}
                    {plus(f.add)}
                  </>
                )}
              />
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>05</span> Frosting color <em>{frostings[c.frosting].label}</em>
              </legend>
              <div className="swatches">
                {Object.entries(frostings).map(([id, f]) => (
                  <button
                    key={id}
                    type="button"
                    className={`swatch${c.frosting === id ? ' is-active' : ''}`}
                    style={{ '--sw': f.base, '--sw-light': f.light }}
                    aria-label={f.label}
                    aria-pressed={c.frosting === id}
                    onClick={() => set('frosting')(id)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>06</span> Finish
              </legend>
              <Options
                items={Object.entries(drips).map(([id, d]) => ({ id, ...d }))}
                value={c.drip}
                onChange={set('drip')}
                render={(d) => (
                  <>
                    {d.color && <i className="dot" style={{ background: d.color }} />}
                    {d.label}
                    {plus(d.add)}
                  </>
                )}
              />
              <Options
                items={Object.entries(toppers).map(([id, t]) => ({ id, ...t }))}
                value={c.topper}
                onChange={set('topper')}
                render={(t) => (
                  <>
                    {t.label}
                    {plus(t.add)}
                  </>
                )}
              />
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>07</span> Message on the cake
              </legend>
              <label className="field">
                <input
                  value={c.message}
                  maxLength={builder.messageMax}
                  onChange={(e) => set('message')(e.target.value)}
                  placeholder="e.g. Happy 30th, Ana!"
                />
                <span className="field__count">
                  {c.message.length}/{builder.messageMax}
                </span>
              </label>
            </fieldset>

            <fieldset className="step">
              <legend>
                <span>08</span> Design notes <em>optional</em>
              </legend>
              <label className="field">
                <textarea
                  rows={3}
                  value={c.notes}
                  onChange={(e) => set('notes')(e.target.value)}
                  placeholder="Theme, colors, characters, or anything we should know"
                />
              </label>
              <p className="hint">Have a reference photo? Send it to us in Messenger together with your order.</p>
            </fieldset>

            <div className="builder__add">
              <div>
                <span>Estimated price</span>
                <strong>{peso(price)}</strong>
              </div>
              <button className="btn btn--dark" onClick={addToOrder}>
                Add custom cake to order
              </button>
            </div>
            <p className="hint hint--center">Final price is confirmed in Messenger, depending on your design.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
