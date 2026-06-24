import React, { useEffect, useState } from 'react';

const LEFT_SPECS = [
  "CALIBER M-01 · 28,800 VPH · 72H POWER RESERVE",
  "SAPPHIRE CRYSTAL · 316L STAINLESS STEEL CASE",
  "HAND-FINISHED BRIDGES · MIRROR ANGLAGE",
  "316 COMPONENTS · 35 RUBY JEWELS · CASING PRESS TESTED"
];

const RIGHT_COLLECTIONS = [
  "SOLARIS · ECLIPSE · NOCTURNE COLLECTIONS",
  "AURORA · MERIDIEM · ABYSSAL CHRONOMETRIC",
  "PRECISION WATCHMAKING SINCE 1887 · SWITZERLAND",
  "LE BRASSUS VALLEÉ DE JOUX · VALENCE MANUFACTURE"
];

export default function VerticalTickers() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % LEFT_SPECS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Left fixed spec ticker */}
      <div className="vertical-ticker left-ticker" aria-label="Meridian Technical Specifications">
        <div key={`left-${index}`} className="ticker-item">
          {LEFT_SPECS[index]}
        </div>
      </div>

      {/* Right fixed collection ticker */}
      <div className="vertical-ticker right-ticker" aria-label="Meridian Collections">
        <div key={`right-${index}`} className="ticker-item">
          {RIGHT_COLLECTIONS[index]}
        </div>
      </div>
    </>
  );
}
