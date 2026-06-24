import React, { useEffect, useRef, useState } from 'react';

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`brand-statement-section ${inView ? 'warm-dark-bg' : ''}`}
      id="statement"
      aria-label="Meridian Brand Statement"
    >
      <div className="statement-content">
        <h2 className="statement-text">TIME, PERFECTED.</h2>
        
        {/* Pulsing Logomark */}
        <div className="statement-logo-wrapper">
          <svg 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
            className="brand-pulse-logo"
            aria-hidden="true"
          >
            {/* Outermost abstract orbit */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#c9b97a" strokeWidth="0.6" opacity="0.1" />
            {/* Primary outer circle */}
            <circle cx="50" cy="50" r="36" fill="none" stroke="#c9b97a" strokeWidth="1.2" opacity="0.3" />
            {/* Inner secondary circle */}
            <circle cx="50" cy="50" r="26" fill="none" stroke="#c9b97a" strokeWidth="0.8" opacity="0.15" />
            {/* Bisecting Meridian line */}
            <line x1="50" y1="4" x2="50" y2="96" stroke="#c9b97a" strokeWidth="1.2" />
            {/* Center core */}
            <circle cx="50" cy="50" r="4.5" fill="#c9b97a" />
          </svg>
        </div>
      </div>
    </section>
  );
}
