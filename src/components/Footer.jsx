import { shop } from '../shop';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="logo logo--sm">
          Layer <em>&amp;</em> Lace
        </span>
        <span>
          © {new Date().getFullYear()} {shop.name} ·{' '}
          <a href={shop.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </span>
      </div>
    </footer>
  );
}
