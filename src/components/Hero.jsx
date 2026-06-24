import React, { useEffect, useRef, useState } from 'react';

/* ——— Helper: build tick marks ——— */
function Ticks({ count = 60, r = 156, innerR, color = '#2a2a2a', goldAt = [] }) {
  const ticks = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360;
    const rad = (angle * Math.PI) / 180;
    const isGold = goldAt.includes(i);
    const len = i % 5 === 0 ? 14 : 7;
    const ir = innerR || r - len;
    const x1 = 180 + r * Math.sin(rad);
    const y1 = 180 - r * Math.cos(rad);
    const x2 = 180 + ir * Math.sin(rad);
    const y2 = 180 - ir * Math.cos(rad);
    ticks.push(
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isGold ? '#c9b97a' : i % 5 === 0 ? '#444' : color}
        strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
      />
    );
  }
  return <>{ticks}</>;
}

/* ——— Hour numerals ——— */
function HourNumerals({ r = 130, dial = 'main' }) {
  const nums = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const colors = { main: '#3a3836', eclipse: '#2a2a2a', nocturne: '#2a3050' };
  return (
    <>
      {nums.map((n, i) => {
        const angle = ((i / 12) * 360 * Math.PI) / 180;
        const x = 180 + r * Math.sin(angle);
        const y = 180 - r * Math.cos(angle) + 4.5;
        return (
          <text
            key={n}
            x={x} y={y}
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontSize="11"
            fontWeight="400"
            fill={n % 3 === 0 ? '#555' : colors[dial] || '#2e2e2e'}
            letterSpacing="0.03em"
          >
            {n}
          </text>
        );
      })}
    </>
  );
}

/* ——— Solaris dial (hero) ——— */
export function SolarisWatch({ size = 420, lume = false, hourDeg, minDeg, secDeg, bezelRotation = 0 }) {
  const v = 360;
  const c = v / 2;
  const lumeColor = '#7effa0';
  const handColor = lume ? lumeColor : '#e8e4dc';
  const secColor = '#c9b97a';

  return (
    <svg
      className="watch-svg"
      viewBox={`0 0 ${v} ${v}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Meridian Solaris watch face showing current time"
    >
      {/* Case */}
      <circle cx={c} cy={c} r="178" fill="#111" stroke="#222" strokeWidth="1.5" />
      <circle cx={c} cy={c} r="175" fill="none" stroke="#1a1a1a" strokeWidth="3" />

      {/* Rotatable Bezel Group */}
      <g
        className="bezel-group"
        style={{
          transform: `rotate(${bezelRotation}deg)`,
          transformOrigin: `${c}px ${c}px`,
          transition: 'transform 0.05s ease-out',
        }}
      >
        {/* Bezel ring */}
        <circle cx={c} cy={c} r="170" fill="none" stroke="#1e1e1e" strokeWidth="0.8" />
        {/* Ticks */}
        <Ticks count={60} r={158} goldAt={[0, 15, 30, 45]} color="#222" />
      </g>

      {/* Sunburst dial */}
      <defs>
        <radialGradient id="solaris-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#151515" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </radialGradient>
        <radialGradient id="solaris-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,185,122,0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r="165" fill="url(#solaris-bg)" />
      <circle cx={c} cy={c} r="165" fill="url(#solaris-glow)" />

      {/* Subtle sunburst lines */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i / 36) * 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={c} y1={c}
            x2={c + 160 * Math.sin(rad)}
            y2={c - 160 * Math.cos(rad)}
            stroke="rgba(201,185,122,0.025)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Hour numerals */}
      <HourNumerals r={128} dial="main" />

      {/* Sub-dial (seconds indicator ring) */}
      <circle cx={c} cy={c + 52} r="22" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      <circle cx={c} cy={c + 52} r="18" fill="#0e0e0e" stroke="#181818" strokeWidth="0.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = ((i / 12) * 360 * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={c + 15 * Math.sin(angle)}
            cy={c + 52 - 15 * Math.cos(angle)}
            r="1"
            fill={i === 0 ? '#c9b97a' : '#2a2a2a'}
          />
        );
      })}

      {/* Crown at 3 o'clock */}
      <rect x="337" y="174" width="14" height="12" rx="2" fill="#1a1a1a" stroke="#222" strokeWidth="0.8" />
      <rect x="340" y="170" width="8" height="20" rx="1.5" fill="#151515" stroke="#1e1e1e" strokeWidth="0.8" />

      {/* Hour hand */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <polygon
          points={`${c - 4},${c + 30}  ${c - 2.5},${c - 75}  ${c},${c - 82}  ${c + 2.5},${c - 75}  ${c + 4},${c + 30}`}
          fill={handColor}
          opacity={lume ? 0.9 : 0.92}
        />
        {lume && <polygon
          points={`${c - 4},${c + 30}  ${c - 2.5},${c - 75}  ${c},${c - 82}  ${c + 2.5},${c - 75}  ${c + 4},${c + 30}`}
          fill={lumeColor}
          opacity={0.3}
          filter="blur(4px)"
        />}
      </g>

      {/* Minute hand */}
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <polygon
          points={`${c - 3},${c + 35}  ${c - 1.5},${c - 120}  ${c},${c - 128}  ${c + 1.5},${c - 120}  ${c + 3},${c + 35}`}
          fill={handColor}
          opacity={lume ? 0.9 : 0.88}
        />
      </g>

      {/* Second hand — gold */}
      <g transform={`rotate(${secDeg}, ${c}, ${c})`} style={{ transition: 'transform 0.1s linear' }}>
        <line x1={c} y1={c + 45} x2={c} y2={c - 140} stroke={lume ? '#7effa0' : secColor} strokeWidth="1" />
        <circle cx={c} cy={c} r="5" fill={lume ? '#7effa0' : secColor} />
        <circle cx={c} cy={c + 45} r="2.5" fill={lume ? '#7effa0' : secColor} />
      </g>

      {/* Center cap */}
      <circle cx={c} cy={c} r="3" fill="#1a1a1a" stroke={lume ? lumeColor : secColor} strokeWidth="0.8" />

      {/* Brand name etched */}
      <text x={c} y={c - 42} textAnchor="middle"
        fontFamily="Cinzel, serif" fontSize="10" fontWeight="400"
        fill="#3a3836" letterSpacing="0.28em">
        MERIDIAN
      </text>
      <text x={c} y={c - 30} textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="300"
        fill="#2a2a2a" letterSpacing="0.2em">
        GENÈVE
      </text>
    </svg>
  );
}

/* ——— Eclipse dial ——— */
export function EclipseWatch({ hourDeg = 0, minDeg = 0, secDeg = 0 }) {
  const v = 360, c = 180;
  return (
    <svg viewBox={`0 0 ${v} ${v}`} xmlns="http://www.w3.org/2000/svg" aria-label="Meridian Eclipse watch face">
      <defs>
        <radialGradient id="eclipse-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r="178" fill="#0f0f0f" stroke="#191919" strokeWidth="1.5" />
      <circle cx={c} cy={c} r="165" fill="url(#eclipse-bg)" />
      {/* Concentric rings */}
      {[40, 70, 100, 130, 155].map(r => (
        <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="#161616" strokeWidth="0.5" />
      ))}
      <Ticks count={60} r={158} color="#1a1a1a" goldAt={[]} />
      {/* Bold indices at 12/3/6/9 */}
      {[0, 90, 180, 270].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return (
          <rect key={angle}
            x={c + 145 * Math.sin(rad) - 4}
            y={c - 145 * Math.cos(rad) - 1}
            width="8" height="2"
            fill="#c9b97a"
            transform={`rotate(${angle}, ${c + 145 * Math.sin(rad)}, ${c - 145 * Math.cos(rad)})`}
          />
        );
      })}
      <text x={c} y={c - 40} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#2a2a2a" letterSpacing="0.25em">MERIDIAN</text>
      <text x={c} y={c - 28} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#1e1e1e" letterSpacing="0.18em">ECLIPSE</text>
      {/* Hour */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <rect x={c - 3.5} y={c - 78} width="7" height="108" rx="1" fill="#d0ccc4" opacity="0.88" />
      </g>
      {/* Minute */}
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <rect x={c - 2} y={c - 125} width="4" height="160" rx="0.8" fill="#d0ccc4" opacity="0.82" />
      </g>
      {/* Second */}
      <g transform={`rotate(${secDeg}, ${c}, ${c})`}>
        <line x1={c} y1={c + 40} x2={c} y2={c - 135} stroke="#c9b97a" strokeWidth="1" />
        <circle cx={c} cy={c} r="4" fill="#c9b97a" />
      </g>
      <circle cx={c} cy={c} r="2.5" fill="#111" stroke="#c9b97a" strokeWidth="0.8" />
    </svg>
  );
}

/* ——— Nocturne dial ——— */
export function NocturneWatch({ hourDeg = 0, minDeg = 0, secDeg = 0 }) {
  const v = 360, c = 180;
  return (
    <svg viewBox={`0 0 ${v} ${v}`} xmlns="http://www.w3.org/2000/svg" aria-label="Meridian Nocturne watch face">
      <defs>
        <radialGradient id="noc-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0a0f1e" />
          <stop offset="100%" stopColor="#050810" />
        </radialGradient>
        <radialGradient id="noc-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="rgba(80,100,200,0.07)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r="178" fill="#0d1020" stroke="#1a1f35" strokeWidth="1.5" />
      <circle cx={c} cy={c} r="165" fill="url(#noc-bg)" />
      <circle cx={c} cy={c} r="165" fill="url(#noc-glow)" />
      {/* Stars */}
      {[
        [100, 80, 1], [130, 60, 0.8], [200, 55, 1.2], [240, 70, 0.9],
        [80, 140, 0.7], [260, 140, 1], [90, 220, 0.8], [250, 220, 1.1],
        [120, 260, 0.7], [220, 265, 0.9],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="rgba(200,210,255,0.5)" />
      ))}
      <Ticks count={60} r={158} color="#1a2035" goldAt={[0]} />
      <text x={c} y={c - 40} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#2a3050" letterSpacing="0.25em">MERIDIAN</text>
      <text x={c} y={c - 28} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#1e2540" letterSpacing="0.18em">NOCTURNE</text>
      {/* Moon phase sub-dial */}
      <circle cx={c} cy={c - 52} r="22" fill="#0a0f1e" stroke="#1a2035" strokeWidth="0.8" />
      <circle cx={c - 8} cy={c - 52} r="16" fill="#c9b97a" opacity="0.15" />
      <circle cx={c + 2} cy={c - 52} r="16" fill="#060a15" />
      {/* Hour */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 32} ${c - 4.5},${c - 60} ${c},${c - 78} ${c + 4.5},${c - 60}`} fill="#c8d4f0" opacity="0.85" />
      </g>
      {/* Minute */}
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 38} ${c - 3},${c - 110} ${c},${c - 128} ${c + 3},${c - 110}`} fill="#c8d4f0" opacity="0.78" />
      </g>
      {/* Second */}
      <g transform={`rotate(${secDeg}, ${c}, ${c})`}>
        <line x1={c} y1={c + 38} x2={c} y2={c - 138} stroke="#c9b97a" strokeWidth="0.9" />
        <circle cx={c} cy={c} r="4" fill="#c9b97a" />
      </g>
      <circle cx={c} cy={c} r="2.5" fill="#0a0f1e" stroke="#c9b97a" strokeWidth="0.8" />
    </svg>
  );
}

/* ——— Hero section ——— */
export default function Hero() {
  const [time, setTime] = useState(new Date());
  const [lume, setLume] = useState(false);

  // Parallax offsets
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Bezel drag/rotate states
  const [bezelRotation, setBezelRotation] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const watchRef = useRef(null);
  const dragStartAngle = useRef(0);
  const baseRotation = useRef(0);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(id);
  }, []);

  // Set up wheel listener directly on watch panel for bezel rotation
  useEffect(() => {
    const el = watchRef.current;
    if (!el) return;
    const preventScrollAndRotate = (e) => {
      e.preventDefault();
      setInteracted(true);
      setBezelRotation(prev => prev + e.deltaY * 0.15);
    };
    el.addEventListener('wheel', preventScrollAndRotate, { passive: false });
    return () => el.removeEventListener('wheel', preventScrollAndRotate);
  }, []);

  // Track global mouse move for drag rotation
  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      if (!watchRef.current) return;
      const rect = watchRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      const diff = currentAngle - dragStartAngle.current;
      setBezelRotation(baseRotation.current + diff);
    };
    const handleUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging]);

  // Track touch events for drag rotation
  useEffect(() => {
    if (!isDragging) return;
    const handleTouchMove = (e) => {
      if (!watchRef.current || e.touches.length === 0) return;
      const rect = watchRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const touch = e.touches[0];
      const currentAngle = Math.atan2(touch.clientY - cy, touch.clientX - cx) * (180 / Math.PI);
      const diff = currentAngle - dragStartAngle.current;
      setBezelRotation(baseRotation.current + diff);
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    if (!watchRef.current) return;
    setIsDragging(true);
    setInteracted(true);
    const rect = watchRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    dragStartAngle.current = startAngle;
    baseRotation.current = bezelRotation;
  };

  const handleTouchStart = (e) => {
    if (!watchRef.current || e.touches.length === 0) return;
    setIsDragging(true);
    setInteracted(true);
    const rect = watchRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const touch = e.touches[0];
    const startAngle = Math.atan2(touch.clientY - cy, touch.clientX - cx) * (180 / Math.PI);
    dragStartAngle.current = startAngle;
    baseRotation.current = bezelRotation;
  };

  // Parallax mouse tracker
  const handleHeroMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2); // -1 to 1
    const y = (clientY - innerHeight / 2) / (innerHeight / 2); // -1 to 1
    setParallaxOffset({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  const s = time.getSeconds() + time.getMilliseconds() / 1000;
  const m = time.getMinutes() + s / 60;
  const h = (time.getHours() % 12) + m / 60;

  const secDeg = s * 6;
  const minDeg = m * 6;
  const hourDeg = h * 30;

  return (
    <section 
      className={`hero${lume ? ' lume-mode' : ''}`} 
      id="hero" 
      aria-label="Hero"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layer (very subtle grain texture with offset) */}
      <div 
        className="hero-bg-parallax" 
        style={{
          transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`
        }} 
      />

      {/* Left — copy (Foreground layer: 1.8x shift) */}
      <div 
        className="hero-copy"
        style={{
          transform: `translate(${parallaxOffset.x * 1.8}px, ${parallaxOffset.y * 1.8}px)`
        }}
      >
        <span className="hero-eyebrow">Est. 1887 — Le Brassus, Switzerland</span>

        <h1 className="hero-title">
          The Art of<br />
          Measured<br />
          Time
        </h1>

        <p className="hero-subtitle">
          Caliber M-01. Hand-assembled over 220 hours. Each component finished to tolerances invisible to the naked eye.
        </p>

        <div className="hero-specs">
          <div className="hero-spec-item">
            <span className="hero-spec-value">316</span>
            <span className="hero-spec-label">Components</span>
          </div>
          <div className="hero-spec-item">
            <span className="hero-spec-value">72h</span>
            <span className="hero-spec-label">Power Reserve</span>
          </div>
          <div className="hero-spec-item">
            <span className="hero-spec-value">28.8k</span>
            <span className="hero-spec-label">VPH</span>
          </div>
        </div>

        <a href="#collections" className="hero-cta cta-hover" id="hero-cta-btn">
          View Solaris Collection
        </a>
      </div>

      {/* Divider */}
      <div className="hero-divider" aria-hidden="true" />

      {/* Right — watch (Midground layer: 1.0x shift) */}
      <div 
        className="hero-watch-panel"
        ref={watchRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          transform: `translate(${parallaxOffset.x * 1.0}px, ${parallaxOffset.y * 1.0}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <SolarisWatch
          lume={lume}
          hourDeg={hourDeg}
          minDeg={minDeg}
          secDeg={secDeg}
          bezelRotation={bezelRotation}
        />
        
        {/* ROTATE BEZEL Tooltip */}
        <div className={`bezel-tooltip ${interacted ? 'interacted' : ''}`}>
          ROTATE BEZEL
        </div>

        <button
          className="lume-toggle cta-hover"
          id="lume-toggle-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag triggering
            setLume(l => !l);
          }}
          aria-pressed={lume}
          aria-label="Toggle lume mode"
        >
          {lume ? '● Lume On' : '○ Lume Mode'}
        </button>
      </div>
    </section>
  );
}
