import React, { useEffect, useRef, useState } from 'react';
import { SolarisWatch, EclipseWatch, NocturneWatch } from './Hero';

const COLLECTIONS = [
  {
    id: 'solaris',
    number: '01',
    name: 'Solaris',
    desc: 'Sunburst gilt dial · 40mm · Sapphire caseback',
    detail1: 'Caliber M-01',
    detail2: '316 components',
    hero: true,
    Watch: SolarisWatch,
  },
  {
    id: 'eclipse',
    number: '02',
    name: 'Eclipse',
    desc: 'Matte black dial · 42mm · Tourbillon at 6',
    detail1: 'Caliber M-02',
    detail2: '412 components',
    hero: false,
    Watch: EclipseWatch,
  },
  {
    id: 'nocturne',
    number: '03',
    name: 'Nocturne',
    desc: 'Deep celestial dial · 39mm · Moon phase',
    detail1: 'Caliber M-03',
    detail2: '388 components',
    hero: false,
    Watch: NocturneWatch,
  },
];

function CollectionCard({ col, idx, hourDeg, minDeg, secDeg }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      key={col.id}
      className={`collection-col reveal${col.hero ? ' hero-col' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${idx * 0.13}s` }}
      id={`collection-${col.id}`}
      aria-label={`${col.name} collection`}
    >
      <span className="collection-number">{col.number}</span>

      <div className="collection-watch-wrap">
        <col.Watch
          hourDeg={hourDeg}
          minDeg={minDeg}
          secDeg={secDeg}
        />
      </div>

      <h2 className="collection-name">{col.name}</h2>
      <p className="collection-desc">{col.desc}</p>

      <div className="collection-detail">
        <span>{col.detail1}</span>
        <span>{col.detail2}</span>
      </div>
    </article>
  );
}

export default function Collections() {
  const headerRef = useRef(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const s = time.getSeconds() + time.getMilliseconds() / 1000;
  const m = time.getMinutes() + s / 60;
  const h = (time.getHours() % 12) + m / 60;

  const secDeg  = s * 6;
  const minDeg  = m * 6;
  const hourDeg = h * 30;

  return (
    <section className="collections" id="collections" aria-label="Collections">
      <div className="collections-header reveal" ref={headerRef}>
        <span className="collections-title">Our Collections</span>
        <a href="#" className="collections-all-link" id="view-all-collections-link">
          View All
        </a>
      </div>

      <div className="collections-grid">
        {COLLECTIONS.map((col, idx) => (
          <CollectionCard
            key={col.id}
            col={col}
            idx={idx}
            hourDeg={hourDeg}
            minDeg={minDeg}
            secDeg={secDeg}
          />
        ))}
      </div>
    </section>
  );
}
