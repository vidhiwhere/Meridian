import React, { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    id: 'hairspring',
    title: 'The Hairspring',
    category: 'Regulating Organ',
    desc: 'Coiled in-house and calibrated to within 0.1 micrograms. The heartbeat of every Meridian timepiece.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="50" cy="50" r="45" strokeOpacity="0.1" />
        <path d="M50 50 C55 42, 62 48, 55 58 C45 68, 32 55, 48 40 C65 22, 80 50, 50 72 C10 90, 15 25, 50 15" stroke="#c9b97a" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'anglage',
    title: 'Anglage Finishing',
    category: 'Hand decoration',
    desc: 'Bridges and plates are hand-beveled to a mirror polish. A craft that takes years to master.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M10 20 L90 20 L80 60 L20 60 Z" strokeOpacity="0.1" />
        <path d="M15 25 L85 25 L75 55 L25 55 Z" stroke="#c9b97a" strokeWidth="1.5" />
        <line x1="15" y1="25" x2="25" y2="55" stroke="#c9b97a" />
        <line x1="85" y1="25" x2="75" y2="55" stroke="#c9b97a" />
      </svg>
    ),
  },
  {
    id: 'cotes',
    title: 'Côtes de Genève',
    category: 'Guilloché',
    desc: 'The iconic linear wave decoration applied with precision abrasive rollers to raw brass plates.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        {[20, 35, 50, 65, 80].map((x, i) => (
          <path key={i} d={`M${x} 15 Q${x+5} 50 ${x} 85`} stroke="#c9b97a" strokeWidth="1.5" opacity={0.3 + (i%3)*0.3} />
        ))}
        <rect x="10" y="10" width="80" height="80" rx="4" strokeOpacity="0.1" />
      </svg>
    ),
  },
  {
    id: 'assembly',
    title: 'Final Assembly',
    category: 'Individual Craft',
    desc: 'One watchmaker, one caliber. From individual balance pivots to checking casing pressure over 5 days.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="50" cy="50" r="35" stroke="#c9b97a" strokeWidth="1.5" />
        <line x1="50" y1="15" x2="50" y2="85" stroke="#c9b97a" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="15" y1="50" x2="85" y2="50" stroke="#c9b97a" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="5" fill="#c9b97a" />
      </svg>
    ),
  },
];

export default function Craftsmanship() {
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
    <section className="craftsmanship reveal" id="craftsmanship" ref={sectionRef} aria-label="Craftsmanship details">
      <div className="craft-header">
        <span className="craft-eyebrow">The Discipline</span>
        <h2 className="craft-title">Obsessive Detailing</h2>
        <p className="craft-subtitle">
          Every component, even those hidden deep inside the gear train, is finished by hand. If it is not perfect, it does not exist.
        </p>
      </div>

      <div className="craft-grid">
        {STEPS.map((step, idx) => (
          <CraftCard key={step.id} step={step} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function CraftCard({ step, idx }) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    setRotY(px * 16);
    setRotX(-py * 16);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      className="craft-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
        transitionDelay: `${idx * 0.08}s`
      }}
      id={`craft-card-${step.id}`}
    >
      <div className="craft-card-glow" style={{
        background: `radial-gradient(circle at ${rotY * 10 + 50}% ${-rotX * 10 + 50}%, rgba(201, 185, 122, 0.08) 0%, transparent 60%)`
      }} />
      <div className="craft-icon-wrapper">
        {step.icon}
      </div>
      <span className="craft-card-cat">{step.category}</span>
      <h3 className="craft-card-title">{step.title}</h3>
      <p className="craft-card-desc">{step.desc}</p>
    </div>
  );
}
