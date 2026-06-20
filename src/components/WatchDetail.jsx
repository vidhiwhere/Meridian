import React, { useState, useEffect, useRef } from 'react';

export default function WatchDetail({ watch, onClose }) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [tab, setTab] = useState('specs');
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setRotY(dx * 18);
    setRotX(-dy * 18);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const { Watch, name, price, desc, specs, story, materials, hourDeg, minDeg, secDeg } = watch;

  return (
    <div className="wd-overlay" onClick={onClose} aria-modal="true" role="dialog" aria-label={`${name} detail`}>
      <div className="wd-panel" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="wd-close" onClick={onClose} aria-label="Close detail view" id="wd-close-btn">
          <span />
          <span />
        </button>

        {/* Left — 3D Watch */}
        <div className="wd-watch-side"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="wd-3d-stage"
            style={{ transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)` }}>
            <Watch hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />
          </div>
          <p className="wd-tip">Move cursor to rotate</p>
        </div>

        {/* Right — Info */}
        <div className="wd-info-side">
          <span className="wd-category">{watch.collection}</span>
          <h2 className="wd-name">{name}</h2>
          <p className="wd-price">{price}</p>
          <p className="wd-desc">{desc}</p>

          {/* Tabs */}
          <div className="wd-tabs">
            {['specs', 'materials', 'story'].map(t => (
              <button key={t} className={`wd-tab${tab === t ? ' active' : ''}`}
                onClick={() => setTab(t)} id={`wd-tab-${t}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="wd-tab-content">
            {tab === 'specs' && (
              <ul className="wd-specs-list">
                {specs.map(([label, val]) => (
                  <li key={label} className="wd-spec-row">
                    <span className="wd-spec-label">{label}</span>
                    <span className="wd-spec-val">{val}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === 'materials' && (
              <ul className="wd-specs-list">
                {materials.map(([label, val]) => (
                  <li key={label} className="wd-spec-row">
                    <span className="wd-spec-label">{label}</span>
                    <span className="wd-spec-val">{val}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === 'story' && (
              <p className="wd-story">{story}</p>
            )}
          </div>

          <div className="wd-actions">
            <button className="wd-btn-primary" id={`wd-add-cart-${name.toLowerCase().replace(/\s/g, '-')}`}>
              Add to Cart
            </button>
            <button className="wd-btn-secondary" id={`wd-enquire-${name.toLowerCase().replace(/\s/g, '-')}`}>
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
