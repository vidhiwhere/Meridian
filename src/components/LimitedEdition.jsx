import React, { useEffect, useRef, useState } from 'react';

export default function LimitedEdition() {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = null;
    const duration = 2200; // 2.2 seconds animation
    const run = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * 312));
      if (progress < 1) {
        window.requestAnimationFrame(run);
      }
    };
    window.requestAnimationFrame(run);
  }, [inView]);

  return (
    <section 
      ref={sectionRef} 
      className={`scarcity-section reveal ${inView ? 'visible' : ''}`}
      id="scarcity"
      aria-label="Limited Edition scarcity statistics"
    >
      <div className="scarcity-content">
        <span className="scarcity-eyebrow">Scarcity & Allocation</span>
        <h2 className="scarcity-title">Limited Manufacture</h2>
        
        {/* Large animating counter */}
        <div className="counter-digits" aria-live="polite">
          <span className="counter-active">{String(count).padStart(4, '0')}</span>
          <span className="counter-divider">/</span>
          <span className="counter-total">1920</span>
          <span className="counter-label">MADE</span>
        </div>

        <p className="scarcity-description">
          Each watch in this series is stamped with its unique build number. Once the run of 1,920 pieces is completed, the tooling blueprints are archived and will never be reproduced.
        </p>

        {/* Physical 1920 dots array */}
        <div className="dots-grid-container" aria-hidden="true">
          <div className="dots-grid">
            {Array.from({ length: 1920 }).map((_, i) => {
              const isGold = i < 312;
              return (
                <span 
                  key={i} 
                  className={`scarcity-dot ${isGold ? 'gold' : ''} ${inView ? 'active' : ''}`}
                  style={isGold && inView ? { transitionDelay: `${i * 3.5}ms` } : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
