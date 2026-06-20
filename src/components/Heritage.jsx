import React, { useState, useEffect, useRef } from 'react';

const TIMELINE_EVENTS = [
  {
    year: '1887',
    title: 'The Foundation',
    desc: 'Édouard Valence establishes the first workshop in Le Brassus, designing the legendary Solaris pocket watch.',
    stat: '1st Caliber',
  },
  {
    year: '1929',
    title: 'The Ultra-Thin Caliber',
    desc: 'Meridian introduces the Caliber 1929, breaking the world record for the thinnest hand-wound movement at 1.65mm.',
    stat: '1.65 mm',
  },
  {
    year: '1969',
    title: 'The Quartz Crisis Defiance',
    desc: 'While others turn to battery power, Meridian doubles down on high-complication mechanical engineering.',
    stat: '100% Mechanical',
  },
  {
    year: '2005',
    title: 'The Abyssal deep-dive',
    desc: 'Meridian partners with oceanographers to test the first titanium dive watch at extreme depths.',
    stat: '600m certified',
  },
  {
    year: '2026',
    title: 'A New Era: The Grand Complication',
    desc: 'Release of the Caliber M-07 Perpetual calendar, blending century-old finishing with future materials.',
    stat: '612 components',
  },
];

export default function Heritage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="heritage reveal" id="heritage" ref={sectionRef} aria-label="Heritage and Timeline">
      <div className="heritage-bg-glow" aria-hidden="true" />
      <div className="heritage-header">
        <span className="heritage-eyebrow">Our Journey</span>
        <h2 className="heritage-title">A Century of Uncompromising Craft</h2>
      </div>

      <div className="heritage-content">
        {/* Left Side: interactive timeline selector */}
        <div className="heritage-timeline">
          <div className="timeline-line" aria-hidden="true" />
          {TIMELINE_EVENTS.map((ev, i) => (
            <button
              key={ev.year}
              className={`timeline-btn${activeIdx === i ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
              id={`timeline-btn-${ev.year}`}
            >
              <div className="timeline-dot" />
              <span className="timeline-year">{ev.year}</span>
              <span className="timeline-event-title">{ev.title}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Showcase with 3D perspective look */}
        <div className="heritage-showcase">
          <div className="showcase-card">
            <div className="showcase-glow" />
            <span className="showcase-stat">{TIMELINE_EVENTS[activeIdx].stat}</span>
            <span className="showcase-year">{TIMELINE_EVENTS[activeIdx].year}</span>
            <h3 className="showcase-title">{TIMELINE_EVENTS[activeIdx].title}</h3>
            <p className="showcase-desc">{TIMELINE_EVENTS[activeIdx].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
