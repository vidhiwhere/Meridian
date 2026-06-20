import React from 'react';

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
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isGold ? '#e8d5a3' : i % 5 === 0 ? '#3a3a5a' : color}
        strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
      />
    );
  }
  return <>{ticks}</>;
}

export function AuroraWatch({ hourDeg = 0, minDeg = 0, secDeg = 0 }) {
  const v = 360, c = 180;
  return (
    <svg viewBox={`0 0 ${v} ${v}`} xmlns="http://www.w3.org/2000/svg" aria-label="Meridian Aurora watch face">
      <defs>
        <radialGradient id="aurora-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d0820" />
          <stop offset="60%" stopColor="#080518" />
          <stop offset="100%" stopColor="#030210" />
        </radialGradient>
        <radialGradient id="aurora-glow" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="rgba(120,60,220,0.12)" />
          <stop offset="50%" stopColor="rgba(60,180,220,0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="aurora-band1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(120,60,220,0)" />
          <stop offset="30%" stopColor="rgba(120,60,220,0.08)" />
          <stop offset="70%" stopColor="rgba(60,180,220,0.06)" />
          <stop offset="100%" stopColor="rgba(60,220,180,0)" />
        </linearGradient>
      </defs>
      {/* Case */}
      <circle cx={c} cy={c} r="178" fill="#0a0815" stroke="#1a1535" strokeWidth="1.5" />
      <circle cx={c} cy={c} r="165" fill="url(#aurora-bg)" />
      <circle cx={c} cy={c} r="165" fill="url(#aurora-glow)" />

      {/* Aurora bands */}
      {[0.35, 0.45, 0.55].map((frac, i) => (
        <ellipse key={i} cx={c} cy={c * frac} rx="140" ry="25"
          fill="url(#aurora-band1)" opacity={0.6 - i * 0.15}
          transform={`rotate(${i * 15 - 10}, ${c}, ${c})`}
        />
      ))}

      {/* Stars */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const dist = 60 + (i % 7) * 15;
        return (
          <circle key={i}
            cx={c + dist * Math.cos(angle)}
            cy={c + dist * Math.sin(angle)}
            r={i % 5 === 0 ? 1.2 : 0.6}
            fill={`rgba(200,210,255,${0.3 + (i % 3) * 0.2})`}
          />
        );
      })}

      <Ticks count={60} r={158} color="#1a1535" goldAt={[0, 15, 30, 45]} />

      {/* Hour indices */}
      {[0, 3, 6, 9].map(i => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <rect key={i}
            x={c + 138 * Math.sin(angle) - 3}
            y={c - 138 * Math.cos(angle) - 1}
            width="6" height="2"
            fill="#e8d5a3"
            transform={`rotate(${i * 30}, ${c + 138 * Math.sin(angle)}, ${c - 138 * Math.cos(angle)})`}
          />
        );
      })}

      {/* Brand */}
      <text x={c} y={c - 40} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#2a2050" letterSpacing="0.25em">MERIDIAN</text>
      <text x={c} y={c - 28} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#1a1840" letterSpacing="0.18em">AURORA</text>

      {/* Hour hand */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 32} ${c - 4},${c - 62} ${c},${c - 78} ${c + 4},${c - 62}`} fill="#c8d4ff" opacity="0.88" />
      </g>
      {/* Minute hand */}
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 38} ${c - 2.5},${c - 112} ${c},${c - 128} ${c + 2.5},${c - 112}`} fill="#c8d4ff" opacity="0.78" />
      </g>
      {/* Second hand */}
      <g transform={`rotate(${secDeg}, ${c}, ${c})`}>
        <line x1={c} y1={c + 38} x2={c} y2={c - 138} stroke="#e8d5a3" strokeWidth="0.9" />
        <circle cx={c} cy={c} r="4" fill="#e8d5a3" />
      </g>
      <circle cx={c} cy={c} r="2.5" fill="#0a0815" stroke="#e8d5a3" strokeWidth="0.8" />
    </svg>
  );
}

export function MeridiemWatch({ hourDeg = 0, minDeg = 0, secDeg = 0 }) {
  const v = 360, c = 180;
  return (
    <svg viewBox={`0 0 ${v} ${v}`} xmlns="http://www.w3.org/2000/svg" aria-label="Meridian Meridiem watch face">
      <defs>
        <radialGradient id="mer-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0c08" />
          <stop offset="100%" stopColor="#0d0503" />
        </radialGradient>
        <linearGradient id="mer-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d5a3" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r="178" fill="#18100a" stroke="#2a1a10" strokeWidth="2" />
      <circle cx={c} cy={c} r="175" fill="none" stroke="#241507" strokeWidth="3" />
      <circle cx={c} cy={c} r="165" fill="url(#mer-bg)" />

      {/* Guilloche pattern */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <line key={i}
            x1={c} y1={c}
            x2={c + 155 * Math.cos(angle)}
            y2={c + 155 * Math.sin(angle)}
            stroke="rgba(201,168,76,0.04)"
            strokeWidth="0.6"
          />
        );
      })}
      {[30, 60, 90, 120].map(r => (
        <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="0.4" />
      ))}

      <Ticks count={60} r={158} color="#1e1008" goldAt={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]} />

      {/* Roman numerals at 12/3/6/9 */}
      {[['XII', 0], ['III', 90], ['VI', 180], ['IX', 270]].map(([text, angle]) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <text key={angle}
            x={c + 125 * Math.sin(rad)}
            y={c - 125 * Math.cos(rad) + 4}
            textAnchor="middle" fontFamily="Cinzel, serif" fontSize="11"
            fill="#6a4a20" letterSpacing="0.05em"
          >{text}</text>
        );
      })}

      <text x={c} y={c - 42} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#3a2010" letterSpacing="0.25em">MERIDIAN</text>
      <text x={c} y={c - 28} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#2a1808" letterSpacing="0.18em">MERIDIEM</text>

      {/* Hour hand — Dauphine style */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 28} ${c - 5},${c - 55} ${c},${c - 72} ${c + 5},${c - 55}`} fill="url(#mer-gold)" opacity="0.9" />
      </g>
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 34} ${c - 3},${c - 115} ${c},${c - 130} ${c + 3},${c - 115}`} fill="url(#mer-gold)" opacity="0.82" />
      </g>
      <g transform={`rotate(${secDeg}, ${c}, ${c})`}>
        <line x1={c} y1={c + 40} x2={c} y2={c - 138} stroke="#c9b97a" strokeWidth="1" />
        <circle cx={c} cy={c} r="5" fill="#c9b97a" />
        <circle cx={c} cy={c + 35} r="3" fill="none" stroke="#c9b97a" strokeWidth="1" />
      </g>
      <circle cx={c} cy={c} r="3" fill="#18100a" stroke="#c9b97a" strokeWidth="0.8" />
    </svg>
  );
}

export function DiverWatch({ hourDeg = 0, minDeg = 0, secDeg = 0 }) {
  const v = 360, c = 180;
  return (
    <svg viewBox={`0 0 ${v} ${v}`} xmlns="http://www.w3.org/2000/svg" aria-label="Meridian Diver watch face">
      <defs>
        <radialGradient id="div-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#041520" />
          <stop offset="100%" stopColor="#020810" />
        </radialGradient>
        <radialGradient id="div-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,180,140,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Thick bezel */}
      <circle cx={c} cy={c} r="178" fill="#080d10" stroke="#0a1015" strokeWidth="2" />
      {/* Bezel with minute markers */}
      <circle cx={c} cy={c} r="172" fill="#0a1018" stroke="#0f1820" strokeWidth="1" />
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2;
        const r1 = 170;
        const r2 = i % 5 === 0 ? 158 : 163;
        return (
          <line key={i}
            x1={c + r1 * Math.sin(angle)} y1={c - r1 * Math.cos(angle)}
            x2={c + r2 * Math.sin(angle)} y2={c - r2 * Math.cos(angle)}
            stroke={i < 8 ? '#00c88a' : '#1a2830'} strokeWidth={i % 5 === 0 ? 2 : 1}
          />
        );
      })}
      {/* Triangle at 12 */}
      <polygon points={`${c},152 ${c - 5},162 ${c + 5},162`} fill="#00c88a" />

      <circle cx={c} cy={c} r="152" fill="url(#div-bg)" />
      <circle cx={c} cy={c} r="152" fill="url(#div-glow)" />

      {/* Hour dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 128;
        return (
          <rect key={i}
            x={c + r * Math.sin(angle) - (i % 3 === 0 ? 6 : 3)}
            y={c - r * Math.cos(angle) - 4}
            width={i % 3 === 0 ? 12 : 6} height="8"
            rx="1"
            fill={i === 0 ? '#00c88a' : '#e8e4dc'}
            transform={`rotate(${i * 30}, ${c + r * Math.sin(angle)}, ${c - r * Math.cos(angle)})`}
          />
        );
      })}

      <text x={c} y={c - 48} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fill="#1a3040" letterSpacing="0.25em">MERIDIAN</text>
      <text x={c} y={c - 36} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5.5" fill="#0f2030" letterSpacing="0.18em">ABYSSAL · 300M</text>

      {/* Bold hands */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <polygon points={`${c - 7},${c + 28} ${c - 5},${c - 65} ${c},${c - 78} ${c + 5},${c - 65} ${c + 7},${c + 28}`}
          fill="#e8e4dc" opacity="0.92" />
        <polygon points={`${c - 5},${c + 26} ${c - 3},${c - 63} ${c},${c - 75} ${c + 3},${c - 63} ${c + 5},${c + 26}`}
          fill="#00c88a" opacity="0.3" />
      </g>
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <polygon points={`${c - 5},${c + 34} ${c - 3},${c - 115} ${c},${c - 130} ${c + 3},${c - 115} ${c + 5},${c + 34}`}
          fill="#e8e4dc" opacity="0.85" />
      </g>
      <g transform={`rotate(${secDeg}, ${c}, ${c})`}>
        <line x1={c} y1={c + 42} x2={c} y2={c - 140} stroke="#00c88a" strokeWidth="1.2" />
        <circle cx={c} cy={c} r="5" fill="none" stroke="#00c88a" strokeWidth="2" />
        <circle cx={c} cy={c + 30} r="8" fill="none" stroke="#00c88a" strokeWidth="1.5" />
      </g>
      <circle cx={c} cy={c} r="3" fill="#041520" stroke="#00c88a" strokeWidth="0.8" />
    </svg>
  );
}

export function PerpetualWatch({ hourDeg = 0, minDeg = 0, secDeg = 0, dayOfYear = 1 }) {
  const v = 360, c = 180;
  const monthAngle = (dayOfYear / 365) * 360;
  return (
    <svg viewBox={`0 0 ${v} ${v}`} xmlns="http://www.w3.org/2000/svg" aria-label="Meridian Perpetual calendar watch face">
      <defs>
        <radialGradient id="perp-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#12100e" />
          <stop offset="100%" stopColor="#080706" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r="178" fill="#100e0c" stroke="#1a1815" strokeWidth="1.5" />
      <circle cx={c} cy={c} r="165" fill="url(#perp-bg)" />

      {/* Subtle crosshatch */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h${i}`} x1="20" y1={20 + i * 16} x2="340" y2={20 + i * 16}
          stroke="rgba(201,185,122,0.015)" strokeWidth="0.4" />
      ))}

      <Ticks count={60} r={158} color="#1a1816" goldAt={[0]} />

      {/* Month ring sub-dial at top */}
      <circle cx={c} cy={c - 55} r="28" fill="#0c0a08" stroke="#1e1c18" strokeWidth="0.8" />
      {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => {
        const angle = ((i / 12) * Math.PI * 2) - Math.PI / 2;
        return (
          <text key={m} x={c + 20 * Math.cos(angle)} y={c - 55 + 20 * Math.sin(angle) + 3}
            textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="4.5"
            fill={i === (new Date().getMonth()) ? '#c9b97a' : '#2a2820'}
          >{m}</text>
        );
      })}
      {/* Month hand */}
      <g transform={`rotate(${monthAngle}, ${c}, ${c - 55})`}>
        <line x1={c} y1={c - 55} x2={c} y2={c - 55 - 18} stroke="#c9b97a" strokeWidth="0.8" />
      </g>

      {/* Day-of-week at bottom */}
      <circle cx={c} cy={c + 55} r="22" fill="#0c0a08" stroke="#1e1c18" strokeWidth="0.8" />
      {['M','T','W','T','F','S','S'].map((d, i) => {
        const angle = ((i / 7) * Math.PI * 2) - Math.PI / 2;
        return (
          <text key={i} x={c + 15 * Math.cos(angle)} y={c + 55 + 15 * Math.sin(angle) + 3}
            textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="4"
            fill={i === new Date().getDay() ? '#c9b97a' : '#222018'}
          >{d}</text>
        );
      })}

      <text x={c} y={c - 12} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8.5" fill="#2a2820" letterSpacing="0.25em">MERIDIAN</text>
      <text x={c} y={c - 1} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5.5" fill="#1e1c18" letterSpacing="0.18em">PERPETUAL</text>

      {/* Hands */}
      <g transform={`rotate(${hourDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 28} ${c - 4},${c - 62} ${c},${c - 78} ${c + 4},${c - 62}`} fill="#d4cfc8" opacity="0.88" />
      </g>
      <g transform={`rotate(${minDeg}, ${c}, ${c})`}>
        <polygon points={`${c},${c + 34} ${c - 2.5},${c - 112} ${c},${c - 128} ${c + 2.5},${c - 112}`} fill="#d4cfc8" opacity="0.82" />
      </g>
      <g transform={`rotate(${secDeg}, ${c}, ${c})`}>
        <line x1={c} y1={c + 38} x2={c} y2={c - 138} stroke="#c9b97a" strokeWidth="0.9" />
        <circle cx={c} cy={c} r="4" fill="#c9b97a" />
      </g>
      <circle cx={c} cy={c} r="2.5" fill="#100e0c" stroke="#c9b97a" strokeWidth="0.8" />
    </svg>
  );
}
