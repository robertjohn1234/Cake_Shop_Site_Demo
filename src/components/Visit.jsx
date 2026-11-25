import { shop } from '../shop';

export default function Visit() {
  return (
    <section id="visit" className="section visit">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Visit the atelier</p>
          <h2 className="section-title">
            We'd love to <em>see you</em>
          </h2>
        </div>

        <div className="visit__grid">
          <div className="visit__card" data-reveal>
            <h3>Hours</h3>
            <ul className="hours">
              {shop.hours.map((h) => (
                <li key={h.days}>
                  <span>{h.days}</span>
                  <strong>{h.time}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="visit__card" data-reveal style={{ '--d': '0.1s' }}>
            <h3>Location</h3>
            <p>{shop.address}</p>
            <a className="link-arrow" href={shop.mapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>

          <div className="visit__card" data-reveal style={{ '--d': '0.2s' }}>
            <h3>Questions?</h3>
            <p>Message us anytime, or call {shop.phone}.</p>
            <a className="link-arrow" href={shop.messenger} target="_blank" rel="noreferrer">
              Chat on Messenger
            </a>
            <a className="link-arrow" href={`tel:${shop.phone.replace(/\s/g, '')}`}>
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
