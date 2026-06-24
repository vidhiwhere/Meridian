import React, { useEffect, useRef, useState } from 'react';

export default function ExplodedView() {
  const sectionRef = useRef(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExploded(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`exploded-view-section reveal ${exploded ? 'is-exploded' : ''}`} 
      id="exploded-view"
      aria-label="Exploded schematic view of the caliber components"
    >
      <div className="exploded-header">
        <span className="exploded-eyebrow">The Anatomy</span>
        <h2 className="exploded-title">Caliber M-01 Blueprint</h2>
        <p className="exploded-subtitle">
          An exploded view demonstrating the sequential assembly layers of the Solaris model. Every component aligns on a single central axis, hand-stacked.
        </p>
      </div>

      <div className="exploded-diagram-container">
        <svg 
          viewBox="0 0 800 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="exploded-svg"
        >
          {/* Main Axis Hairline (Behind) */}
          <line 
            x1="400" y1="40" x2="400" y2="550" 
            stroke="#c9b97a" strokeWidth="0.8" 
            strokeDasharray="4 6" 
            className="axis-line"
            opacity="0.35"
          />

          {/* 1. CRYSTAL LAYER */}
          <g className="exploded-layer crystal-layer" style={{ transitionDelay: '360ms' }}>
            <ellipse cx="400" cy="280" rx="140" ry="40" fill="rgba(200,225,255,0.02)" stroke="#a0c0e0" strokeWidth="1.2" />
            <path d="M 310 270 Q 370 290 490 270" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="100 8" />
            <ellipse cx="400" cy="280" rx="138" ry="38" fill="none" stroke="rgba(160,200,240,0.15)" strokeWidth="0.8" />
            
            {/* Guide & Label */}
            <g className="exploded-label label-right">
              <line x1="530" y1="280" x2="610" y2="280" stroke="#c9b97a" strokeWidth="0.8" />
              <circle cx="530" cy="280" r="2.5" fill="#c9b97a" />
              <text x="625" y="284" fill="#e8e4dc" fontFamily="Cinzel, serif" fontSize="10" letterSpacing="0.1em">CRYSTAL LAYER</text>
              <text x="625" y="297" fill="#6a6760" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="0.05em">Double AR-coated domed sapphire</text>
            </g>
          </g>

          {/* 2. BEZEL LAYER */}
          <g className="exploded-layer bezel-layer" style={{ transitionDelay: '280ms' }}>
            {/* Inner ring */}
            <ellipse cx="400" cy="280" rx="145" ry="42" fill="none" stroke="#222" strokeWidth="6" />
            <ellipse cx="400" cy="280" rx="145" ry="42" fill="none" stroke="#c9b97a" strokeWidth="0.8" />
            {/* Outer ridges */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 360 * Math.PI / 180;
              const cos = Math.cos(angle);
              const sin = Math.sin(angle);
              const x1 = 400 + 145 * cos;
              const y1 = 280 + 42 * sin;
              const x2 = 400 + 148 * cos;
              const y2 = 280 + 43 * sin;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a3836" strokeWidth="0.8" />;
            })}

            {/* Guide & Label */}
            <g className="exploded-label label-left">
              <line x1="270" y1="280" x2="190" y2="280" stroke="#c9b97a" strokeWidth="0.8" />
              <circle cx="270" cy="280" r="2.5" fill="#c9b97a" />
              <text x="175" y="284" textAnchor="end" fill="#e8e4dc" fontFamily="Cinzel, serif" fontSize="10" letterSpacing="0.1em">BEZEL RING</text>
              <text x="175" y="297" textAnchor="end" fill="#6a6760" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="0.05em">Coin-edge stainless steel frame</text>
            </g>
          </g>

          {/* 3. DIAL LAYER */}
          <g className="exploded-layer dial-layer" style={{ transitionDelay: '200ms' }}>
            <ellipse cx="400" cy="280" rx="138" ry="38" fill="#151515" stroke="#333" strokeWidth="1" />
            {/* Gilt indexes */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
              const r = (angle * Math.PI) / 180;
              const x1 = 400 + 122 * Math.cos(r);
              const y1 = 280 + 33 * Math.sin(r);
              const x2 = 400 + 132 * Math.cos(r);
              const y2 = 280 + 36 * Math.sin(r);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9b97a" strokeWidth="1.5" />;
            })}
            {/* Brand etching */}
            <text x="400" y="272" textAnchor="middle" fill="#555" fontFamily="Cinzel, serif" fontSize="9" letterSpacing="0.2em">MERIDIAN</text>
            
            {/* Hands */}
            <line x1="400" y1="280" x2="360" y2="265" stroke="#e8e4dc" strokeWidth="2" strokeLinecap="round" />
            <line x1="400" y1="280" x2="450" y2="290" stroke="#e8e4dc" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="400" cy="280" r="3" fill="#c9b97a" />

            {/* Guide & Label */}
            <g className="exploded-label label-right">
              <line x1="535" y1="280" x2="615" y2="280" stroke="#c9b97a" strokeWidth="0.8" />
              <circle cx="535" cy="280" r="2.5" fill="#c9b97a" />
              <text x="630" y="284" fill="#e8e4dc" fontFamily="Cinzel, serif" fontSize="10" letterSpacing="0.1em">BRASS DIAL</text>
              <text x="630" y="297" fill="#6a6760" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="0.05em">Sunburst opaline with gold indexes</text>
            </g>
          </g>

          {/* 4. CROWN LAYER (Translates horizontally) */}
          <g className="exploded-layer crown-layer" style={{ transitionDelay: '160ms' }}>
            <rect x="390" y="272" width="16" height="15" rx="1.5" fill="#1f1e1c" stroke="#c9b97a" strokeWidth="0.8" />
            <circle cx="398" cy="280" r="4.5" fill="#0d0d0d" stroke="#c9b97a" strokeWidth="0.8" />
            <line x1="390" y1="280" x2="375" y2="280" stroke="#555" strokeWidth="1.5" />

            {/* Guide & Label */}
            <g className="exploded-label label-right">
              <line x1="412" y1="280" x2="610" y2="280" stroke="#c9b97a" strokeWidth="0.8" />
              <circle cx="412" cy="280" r="2.5" fill="#c9b97a" />
              <text x="625" y="284" fill="#e8e4dc" fontFamily="Cinzel, serif" fontSize="10" letterSpacing="0.1em">CROWN STEM</text>
              <text x="625" y="297" fill="#6a6760" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="0.05em">Triple gasket sealing mechanism</text>
            </g>
          </g>

          {/* 5. MOVEMENT LAYER */}
          <g className="exploded-layer movement-layer" style={{ transitionDelay: '100ms' }}>
            <ellipse cx="400" cy="280" rx="138" ry="38" fill="#121212" stroke="#222" strokeWidth="1" />
            {/* Gear overlays */}
            <circle cx="370" cy="275" r="30" fill="none" stroke="#2a2a2a" strokeWidth="0.8" strokeDasharray="3 4" />
            <circle cx="370" cy="275" r="18" fill="none" stroke="#c9b97a" strokeWidth="0.8" opacity="0.4" />
            <circle cx="430" cy="285" r="24" fill="none" stroke="#2a2a2a" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="430" cy="285" r="12" fill="none" stroke="#c9b97a" strokeWidth="0.8" opacity="0.4" />
            {/* Jewels */}
            <circle cx="380" cy="270" r="3.5" fill="#a81515" opacity="0.9" />
            <circle cx="420" cy="280" r="3.5" fill="#a81515" opacity="0.9" />
            <circle cx="400" cy="290" r="3.5" fill="#a81515" opacity="0.9" />

            {/* Guide & Label */}
            <g className="exploded-label label-left">
              <line x1="270" y1="280" x2="190" y2="280" stroke="#c9b97a" strokeWidth="0.8" />
              <circle cx="270" cy="280" r="2.5" fill="#c9b97a" />
              <text x="175" y="284" textAnchor="end" fill="#e8e4dc" fontFamily="Cinzel, serif" fontSize="10" letterSpacing="0.1em">CALIBER M-01</text>
              <text x="175" y="297" textAnchor="end" fill="#6a6760" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="0.05em">316-component hand-wound movement</text>
            </g>
          </g>

          {/* 6. CASE BACK LAYER */}
          <g className="exploded-layer caseback-layer" style={{ transitionDelay: '0ms' }}>
            <ellipse cx="400" cy="280" rx="145" ry="42" fill="none" stroke="#1c1c1c" strokeWidth="5" />
            <ellipse cx="400" cy="280" rx="145" ry="42" fill="none" stroke="#c9b97a" strokeWidth="0.8" />
            {/* Inscriptions */}
            <ellipse cx="400" cy="280" rx="110" ry="32" fill="none" stroke="rgba(201,185,122,0.12)" strokeWidth="0.8" />
            
            {/* Sapphire window */}
            <ellipse cx="400" cy="280" rx="90" ry="26" fill="rgba(100,150,200,0.03)" stroke="rgba(100,150,200,0.2)" strokeWidth="1.2" />

            {/* Guide & Label */}
            <g className="exploded-label label-right">
              <line x1="540" y1="280" x2="615" y2="280" stroke="#c9b97a" strokeWidth="0.8" />
              <circle cx="540" cy="280" r="2.5" fill="#c9b97a" />
              <text x="630" y="284" fill="#e8e4dc" fontFamily="Cinzel, serif" fontSize="10" letterSpacing="0.1em">EXHIBITION BACK</text>
              <text x="630" y="297" fill="#6a6760" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="0.05em">Platinum rim, screw down sapphire</text>
            </g>
          </g>

          {/* Secondary Central Alignment Ring (Front) */}
          <ellipse cx="400" cy="280" rx="148" ry="43" stroke="rgba(201,185,122,0.06)" strokeWidth="0.5" className="align-ellipse" />
        </svg>
      </div>
    </section>
  );
}
