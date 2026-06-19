import React, { useEffect, useRef, useState } from 'react';

/* ——— Mechanical movement schematic SVG ——— */
function MovementSchematic({ tick }) {
  // Gear rotation angles driven by tick (updates ~10/s)
  const escapeAngle    = tick * 1.1;
  const balanceAngle   = Math.sin(tick * 0.18) * 38;
  const mainGearAngle  = tick * 0.28;
  const secondGearAngle = -tick * 0.9;
  const thirdGearAngle  = tick * 0.45;
  const barrelAngle     = tick * 0.07;

  const v = 400;
  const cx = 200;
  const cy = 200;

  function Gear({ x, y, r, teeth, angle, color = '#1e1e1e', stroke = '#2a2a2a', goldRim = false }) {
    const pts = [];
    const toothH = r * 0.22;
    const inner = r - toothH;
    for (let i = 0; i < teeth; i++) {
      const a1 = ((i / teeth) * 360 - 5) * Math.PI / 180;
      const a2 = ((i / teeth) * 360 + 5) * Math.PI / 180;
      const a3 = (((i + 0.5) / teeth) * 360 - 3) * Math.PI / 180;
      const a4 = (((i + 0.5) / teeth) * 360 + 3) * Math.PI / 180;
      pts.push(`${x + r * Math.cos(a1)},${y + r * Math.sin(a1)}`);
      pts.push(`${x + (r + toothH) * Math.cos(a2)},${y + (r + toothH) * Math.sin(a2)}`);
      pts.push(`${x + (r + toothH) * Math.cos(a3)},${y + (r + toothH) * Math.sin(a3)}`);
      pts.push(`${x + r * Math.cos(a4)},${y + r * Math.sin(a4)}`);
    }
    return (
      <g transform={`rotate(${angle}, ${x}, ${y})`}>
        <polygon points={pts.join(' ')} fill={color} stroke={stroke} strokeWidth="0.6" />
        <circle cx={x} cy={y} r={inner * 0.75} fill={color} stroke={stroke} strokeWidth="0.5" />
        {/* Spoke arms */}
        {[0, 60, 120, 180, 240, 300].map(a => {
          const rad = (a * Math.PI) / 180;
          return (
            <line key={a}
              x1={x + 4 * Math.cos(rad)} y1={y + 4 * Math.sin(rad)}
              x2={x + inner * 0.72 * Math.cos(rad)} y2={y + inner * 0.72 * Math.sin(rad)}
              stroke={stroke} strokeWidth="1"
            />
          );
        })}
        {goldRim && <circle cx={x} cy={y} r={r + toothH + 1} fill="none" stroke="#c9b97a" strokeWidth="0.5" opacity="0.5" />}
        <circle cx={x} cy={y} r="3.5" fill="#111" stroke={goldRim ? '#c9b97a' : '#333'} strokeWidth="0.8" />
      </g>
    );
  }

  function BalanceWheel({ x, y, r, angle }) {
    return (
      <g transform={`rotate(${angle}, ${x}, ${y})`}>
        <circle cx={x} cy={y} r={r} fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
        <circle cx={x} cy={y} r={r * 0.7} fill="none" stroke="#1e1e1e" strokeWidth="0.8" />
        {[0, 90, 180, 270].map(a => {
          const rad = (a * Math.PI) / 180;
          return (
            <line key={a}
              x1={x} y1={y}
              x2={x + r * Math.cos(rad)} y2={y + r * Math.sin(rad)}
              stroke="#2e2e2e" strokeWidth="1.2"
            />
          );
        })}
        {/* Hairspring spiral */}
        {[1, 2, 3].map(n => (
          <circle key={n} cx={x} cy={y} r={n * 6} fill="none" stroke="#c9b97a" strokeWidth="0.4" opacity={0.3 - n * 0.05} />
        ))}
        <circle cx={x} cy={y} r="3" fill="#111" stroke="#c9b97a" strokeWidth="0.6" />
      </g>
    );
  }

  return (
    <svg
      className="schematic-svg"
      viewBox={`0 0 ${v} ${v}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Caliber M-01 mechanical movement schematic"
    >
      <defs>
        <radialGradient id="mvt-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0f0f" />
          <stop offset="100%" stopColor="#080808" />
        </radialGradient>
      </defs>

      {/* Plate */}
      <rect x="20" y="20" width="360" height="360" rx="4" fill="url(#mvt-bg)" stroke="#1a1a1a" strokeWidth="1" />
      {/* Bridge lines */}
      <rect x="30" y="30" width="340" height="340" rx="3" fill="none" stroke="#141414" strokeWidth="0.5" />
      <line x1="200" y1="30" x2="200" y2="370" stroke="#121212" strokeWidth="0.4" />
      <line x1="30"  y1="200" x2="370" y2="200" stroke="#121212" strokeWidth="0.4" />

      {/* Jewels (red) */}
      {[[90, 145], [165, 88], [240, 120], [300, 240], [130, 280], [210, 200]].map(([jx, jy], i) => (
        <circle key={i} cx={jx} cy={jy} r="3" fill="#8b1a1a" stroke="#600" strokeWidth="0.5" opacity="0.85" />
      ))}

      {/* Main barrel */}
      <Gear x={90}  y={145} r={38} teeth={60} angle={barrelAngle}     color="#141414" stroke="#222" goldRim />

      {/* Center / third wheel */}
      <Gear x={165} y={88}  r={20} teeth={30} angle={thirdGearAngle}  color="#131313" stroke="#1e1e1e" />
      <Gear x={240} y={120} r={16} teeth={24} angle={mainGearAngle}   color="#131313" stroke="#1e1e1e" />

      {/* Fourth / escape wheel */}
      <Gear x={300} y={240} r={22} teeth={18} angle={escapeAngle}     color="#141414" stroke="#1e1e1e" goldRim />

      {/* Intermediate */}
      <Gear x={130} y={280} r={14} teeth={20} angle={secondGearAngle} color="#131313" stroke="#1e1e1e" />

      {/* Balance wheel */}
      <BalanceWheel x={210} y={200} r={36} angle={balanceAngle} />

      {/* Pallet fork (escape lever) */}
      <g transform={`rotate(${balanceAngle * 0.4}, 270, 240)`}>
        <rect x="255" y="228" width="32" height="5" rx="1" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
        <rect x="255" y="218" width="5" height="14" rx="1" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
        <rect x="282" y="218" width="5" height="14" rx="1" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
        <circle cx="270" cy="230" r="2.5" fill="#111" stroke="#c9b97a" strokeWidth="0.5" />
      </g>

      {/* Hairspring coil lines */}
      {[20, 25, 30].map(r => (
        <circle key={r} cx={210} cy={200} r={r + 36} fill="none" stroke="#c9b97a" strokeWidth="0.3" opacity="0.12" />
      ))}

      {/* Label overlays */}
      <text x="90"  y="200" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#2e2e2e" letterSpacing="0.1em">BARREL</text>
      <text x="210" y="248" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#2e2e2e" letterSpacing="0.1em">BALANCE</text>
      <text x="300" y="272" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#c9b97a" letterSpacing="0.1em" opacity="0.6">ESCAPEMENT</text>

      {/* Caliber name */}
      <text x="200" y="355" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#2a2a2a" letterSpacing="0.22em">CALIBER M-01</text>
      <text x="200" y="365" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#1e1e1e" letterSpacing="0.15em">28,800 VPH · 72H POWER RESERVE · 316 COMPONENTS</text>
    </svg>
  );
}

export default function Editorial() {
  const [tick, setTick] = useState(0);
  const storyRef   = useRef(null);
  const schemaRef  = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    [storyRef, schemaRef].forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="editorial" id="editorial" aria-label="Editorial — The Manufacture">
      {/* Left — story */}
      <div className="editorial-story reveal" ref={storyRef}>
        <span className="editorial-tag">The Manufacture</span>

        <h2 className="editorial-heading">
          Precision is not<br />a feature.<br />It is the discipline.
        </h2>

        <p className="editorial-body">
          In Le Brassus, where the winters are long and the light unforgiving, Meridian has occupied the same stone building since 1887. The founders believed that a watch should outlive the man who wears it. They were right.
        </p>

        <p className="editorial-body">
          Every Caliber M-01 is assembled by a single watchmaker over 220 hours. The movement bridges are hand-chamfered. The pallet stones are individually selected under magnification. The balance spring — thinner than a human hair — is coiled and tempered in-house.
        </p>

        <p className="editorial-body">
          We do not use the word "artisanal" lightly. At Meridian, it is not a marketing device. It is a job description.
        </p>

        <div className="editorial-signature">
          <span className="editorial-signature-name">Henri Valence</span>
          <span className="editorial-signature-title">Maître Horloger · Meridian Manufacture</span>
        </div>
      </div>

      {/* Divider */}
      <div className="editorial-divider" aria-hidden="true" />

      {/* Right — schematic */}
      <div className="editorial-schematic reveal" ref={schemaRef} style={{ transitionDelay: '0.2s' }}>
        <span className="schematic-label">Caliber M-01 · Mechanical Movement · Scale 3:1</span>
        <MovementSchematic tick={tick} />
      </div>
    </section>
  );
}
