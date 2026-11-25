import { occasions } from '../shop';

export default function OccasionStrip() {
  return (
    <div className="occasions" data-reveal>
      <div className="container occasions__inner">
        <span className="occasions__label">Cakes for</span>
        {occasions.map((o) => (
          <span className="occasions__item" key={o}>
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}
