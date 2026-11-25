import { useEffect, useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import { shop } from '../shop';
import { peso, isoDaysFromToday, formatDate, buildOrderMessage, copyNow, copyAsync } from '../lib/order';
import Cake from './Cake.jsx';
import OrderSentModal from './OrderSentModal.jsx';

const DETAILS_KEY = 'layer-lace-details';
const EMPTY_FORM = {
  name: '',
  contact: '',
  type: 'pickup',
  date: '',
  time: '',
  address: '',
  payment: shop.paymentOptions[0],
  notes: '',
};

// Remember name/contact/address for returning customers
function loadForm() {
  try {
    const saved = JSON.parse(localStorage.getItem(DETAILS_KEY) || '{}');
    return { ...EMPTY_FORM, ...saved };
  } catch {
    return EMPTY_FORM;
  }
}

function validate(f, minDate) {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your name';
  if (f.contact.replace(/\D/g, '').length < 7) e.contact = 'Please enter a valid contact number';
  if (!f.date) e.date = 'Pick a date';
  else if (f.date < minDate) e.date = `Earliest date is ${formatDate(minDate)}`;
  if (!f.time) e.time = 'Pick a time';
  if (f.type === 'delivery' && !f.address.trim()) e.address = 'Please enter your delivery address';
  return e;
}

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, hasCustom, inc, dec, remove, clear } = useCart();
  const [form, setForm] = useState(loadForm);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(null); // { message, copied }

  // Custom cakes need more days' notice than ready designs
  const leadDays = hasCustom ? shop.leadDays.custom : shop.leadDays.ready;
  const minDate = isoDaysFromToday(leadDays);
  const errors = validate(form, minDate);
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && !sent && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, sent, onClose]);

  useEffect(() => {
    try {
      const { name, contact, address } = form;
      localStorage.setItem(DETAILS_KEY, JSON.stringify({ name, contact, address }));
    } catch {
      /* ignore */
    }
  }, [form]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const sendOrder = () => {
    setTried(true);
    if (hasErrors || items.length === 0) {
      document.querySelector('.drawer .field--error input, .drawer .field--error textarea')?.focus();
      return;
    }
    const message = buildOrderMessage(items, form, subtotal);

    // 1) copy the order, 2) open Messenger — both inside the same tap
    const copied = copyNow(message);
    setSent({ message, copied, hasCustom });
    copyAsync(message).then((ok) => ok && setSent((s) => (s ? { ...s, copied: true } : s)));
    window.open(shop.messenger, '_blank', 'noopener');
  };

  const finish = () => {
    clear();
    setForm((f) => ({ ...f, date: '', time: '', notes: '' }));
    setTried(false);
    setSent(null);
    onClose();
  };

  const fieldClass = (name) => `field${tried && errors[name] ? ' field--error' : ''}`;
  const err = (name) => (tried && errors[name] ? <span className="field__error">{errors[name]}</span> : null);

  return (
    <>
      <div className={`overlay${open ? ' is-open' : ''}`} onClick={onClose} />
      <aside className={`drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Your order" inert={!open}>
        <div className="drawer__head">
          <h2>Your order</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty">
            <Cake look={{ frosting: 'blush', drip: 'none', topper: 'none', tiers: 1, mini: true }} size={110} />
            <h3>Your order is empty</h3>
            <p>Choose a signature cake, or design your own.</p>
            <div className="empty__actions">
              <a href="#cakes" className="btn btn--line btn--sm" onClick={onClose}>
                Browse cakes
              </a>
              <a href="#design" className="btn btn--dark btn--sm" onClick={onClose}>
                Design a cake
              </a>
            </div>
          </div>
        ) : (
          <div className="drawer__body">
            <ul className="cart-list">
              {items.map((i) => (
                <li className="cart-item" key={i.key}>
                  <div className="cart-item__thumb">
                    <Cake look={{ ...i.look, mini: true, topper: 'none', tiers: 1 }} size={46} />
                  </div>
                  <div className="cart-item__info">
                    <strong>{i.name}</strong>
                    <span>
                      {i.size} · {peso(i.price)}
                    </span>
                    {i.details && (
                      <ul className="cart-item__details">
                        {i.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="cart-item__side">
                    <div className="qty">
                      <button onClick={() => dec(i.key)} aria-label={`Remove one ${i.name}`}>
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button onClick={() => inc(i.key)} aria-label={`Add one ${i.name}`}>
                        +
                      </button>
                    </div>
                    <button className="cart-item__remove" onClick={() => remove(i.key)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="subtotal">
              <span>{hasCustom ? 'Estimated total' : 'Subtotal'}</span>
              <strong>{peso(subtotal)}</strong>
            </div>

            <form className="order-form" onSubmit={(e) => e.preventDefault()} noValidate>
              <h3>Your details</h3>

              <label className={fieldClass('name')}>
                <span>Name *</span>
                <input value={form.name} onChange={set('name')} placeholder="Juan Dela Cruz" autoComplete="name" />
                {err('name')}
              </label>

              <label className={fieldClass('contact')}>
                <span>Contact number *</span>
                <input
                  value={form.contact}
                  onChange={set('contact')}
                  placeholder="0917 123 4567"
                  inputMode="tel"
                  autoComplete="tel"
                />
                {err('contact')}
              </label>

              <div className="toggle" role="radiogroup" aria-label="Pickup or delivery">
                {['pickup', 'delivery'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={form.type === t}
                    className={form.type === t ? 'is-active' : ''}
                    onClick={() => setForm((f) => ({ ...f, type: t }))}
                  >
                    {t === 'pickup' ? 'Pickup' : 'Delivery'}
                  </button>
                ))}
              </div>

              <div className="field-row">
                <label className={fieldClass('date')}>
                  <span>Date *</span>
                  <input type="date" value={form.date} min={minDate} onChange={set('date')} />
                  {err('date')}
                </label>
                <label className={fieldClass('time')}>
                  <span>Time *</span>
                  <input type="time" value={form.time} onChange={set('time')} />
                  {err('time')}
                </label>
              </div>
              <p className="hint">
                Earliest available: <strong>{formatDate(minDate)}</strong> ({leadDays} days' notice
                {hasCustom ? ' for custom cakes' : ''}).
              </p>

              {form.type === 'delivery' && (
                <label className={fieldClass('address')}>
                  <span>Delivery address *</span>
                  <textarea
                    rows={2}
                    value={form.address}
                    onChange={set('address')}
                    placeholder="House no., street, barangay, landmark"
                  />
                  {err('address')}
                </label>
              )}

              <label className="field">
                <span>Payment</span>
                <select value={form.payment} onChange={set('payment')}>
                  {shop.paymentOptions.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Notes (optional)</span>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={set('notes')}
                  placeholder="e.g. Bento message: “Happy Monthsary!” · Cupcake flavors"
                />
              </label>
            </form>
          </div>
        )}

        {items.length > 0 && (
          <div className="drawer__foot">
            <button className="btn btn--dark btn--block" onClick={sendOrder}>
              Send order via Messenger · {peso(subtotal)}
            </button>
            <p className="drawer__hint">We'll copy your order and open our Messenger — just paste &amp; send.</p>
          </div>
        )}
      </aside>

      {sent && (
        <OrderSentModal
          message={sent.message}
          copied={sent.copied}
          hasCustom={sent.hasCustom}
          onCopied={() => setSent((s) => ({ ...s, copied: true }))}
          onBack={() => setSent(null)}
          onDone={finish}
        />
      )}
    </>
  );
}
