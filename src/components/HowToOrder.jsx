import { shop } from '../shop';

const steps = [
  {
    num: 'I',
    title: 'Choose or design',
    text: 'Pick one of our signature cakes, or design your own with the cake builder.',
  },
  {
    num: 'II',
    title: 'Set your date',
    text: `Ready designs need ${shop.leadDays.ready} days' notice, custom cakes ${shop.leadDays.custom} days. Choose pickup or delivery.`,
  },
  {
    num: 'III',
    title: 'Send via Messenger',
    text: 'We copy your order and open our Messenger — paste, send, and add your reference photo if you have one.',
  },
];

export default function HowToOrder() {
  return (
    <section id="how" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">How to order</p>
          <h2 className="section-title">
            Three simple <em>steps</em>
          </h2>
        </div>

        <ol className="steps">
          {steps.map((s, i) => (
            <li className="steps__item" key={s.num} data-reveal style={{ '--d': `${i * 0.12}s` }}>
              <span className="steps__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="payment" data-reveal>
          <div>
            <p className="eyebrow">Payment</p>
            <p>
              {shop.payment.note} GCash: <strong>{shop.payment.gcashNumber}</strong> ({shop.payment.gcashName}).
            </p>
          </div>
          <p className="payment__note">{shop.deliveryNote}</p>
        </div>
      </div>
    </section>
  );
}
