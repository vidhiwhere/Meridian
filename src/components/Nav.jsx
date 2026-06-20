import React, { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <a href="#hero" className="nav-logo" aria-label="Meridian home">Meridian</a>

      <ul className="nav-links">
        <li><a href="#collections">Collections</a></li>
        <li><a href="#craftsmanship">Discipline</a></li>
        <li><a href="#editorial">Manufacture</a></li>
        <li><a href="#heritage">Heritage</a></li>
        <li><a href="#shop">Boutique</a></li>
      </ul>

      <a href="#shop" className="nav-bag" aria-label="Shopping bag" id="nav-bag-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </a>
    </nav>
  );
}

