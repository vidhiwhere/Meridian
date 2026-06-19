import React from 'react';

const ITEMS = [
  { name: 'Solaris',   spec: 'Caliber M-01 · 28,800 vph' },
  { name: 'Eclipse',   spec: 'Caliber M-02 · Tourbillon' },
  { name: 'Nocturne',  spec: 'Caliber M-03 · Moon Phase' },
  { name: 'Meridian Perpetual', spec: 'Caliber M-04 · Perpetual Calendar' },
  { name: 'Solaris GMT', spec: 'Caliber M-05 · Dual Time Zone' },
  { name: 'Nocturne Chronograph', spec: 'Caliber M-06 · 1/10s Chrono' },
];

export default function MarqueeStrip() {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-section" aria-label="Collection marquee" role="marquee">
      <div className="marquee-track" aria-hidden="true">
        {[...doubled, ...doubled].map((item, i) => (
          <div className="marquee-inner" key={i}>
            <div className="marquee-item">
              <span className="marquee-item-name">{item.name}</span>
              <span className="marquee-item-spec">{item.spec}</span>
            </div>
            <span className="marquee-dot" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
