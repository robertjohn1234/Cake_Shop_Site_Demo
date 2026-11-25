import { useEffect, useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import CartIcon from './CartIcon.jsx';

const links = [
  { label: 'Our cakes', href: '#cakes' },
  { label: 'Design your cake', href: '#design' },
  { label: 'How to order', href: '#how' },
  { label: 'Visit', href: '#visit' },
];

export default function Navbar({ onCartClick }) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  // Add a thin line + background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="logo">
          Layer <em>&amp;</em> Lace
        </a>

        <nav className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <button className="nav__cart" onClick={onCartClick} aria-label={`Open order, ${count} items`}>
          <CartIcon size={18} />
          <span className="nav__cart-text">Order</span>
          {count > 0 && (
            <span className="badge" key={count}>
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
