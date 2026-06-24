import React, { useState } from 'react';

const STRAPS = [
  { name: "ALLIGATOR NOIR", color: "#1c1c1c", stroke: "#0c0c0c" },
  { name: "COGNAC CALFSKIN", color: "#8c5230", stroke: "#663b21" },
  { name: "ALLIGATOR GILT", color: "#b59c50", stroke: "#8c7435" },
  { name: "OCEAN RUBBER", color: "#1b293a", stroke: "#101924" },
  { name: "BRITISH GREEN", color: "#1e3825", stroke: "#102114" }
];

const DIALS = [
  { name: "SILVER SUNBURST", color: "#c8c6c0" },
  { name: "MATTE BLACK", color: "#121212" },
  { name: "DEEP CELESTIAL", color: "#0d1b32" }
];

const MODELS = [
  { id: 'solaris', label: 'SOLARIS' },
  { id: 'eclipse', label: 'ECLIPSE' },
  { id: 'nocturne', label: 'NOCTURNE' }
];

export default function ConfigurePanel() {
  const [configs, setConfigs] = useState({
    solaris: { strap: 0, dial: 0 },
    eclipse: { strap: 1, dial: 1 },
    nocturne: { strap: 3, dial: 2 }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeModelEnquiry, setActiveModelEnquiry] = useState('solaris');
  const [submitted, setSubmitted] = useState(false);

  const handleStrapSelect = (model, idx) => {
    setConfigs(prev => ({
      ...prev,
      [model]: { ...prev[model], strap: idx }
    }));
  };

  const handleDialSelect = (model, idx) => {
    setConfigs(prev => ({
      ...prev,
      [model]: { ...prev[model], dial: idx }
    }));
  };

  const handleOpenModal = (model) => {
    setActiveModelEnquiry(model);
    setModalOpen(true);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 2200);
  };

  return (
    <section className="configurator-section" id="customizer" aria-label="Configure your watch">
      <div className="configurator-header">
        <span className="configurator-eyebrow">Bespoke Manufacture</span>
        <h2 className="configurator-title">Configure Your Meridian</h2>
        <p className="configurator-subtitle">
          Select strap materials and dial finishes. Each combination is custom fitted in our workshops in Le Brassus to order.
        </p>
      </div>

      <div className="configurator-grid">
        {MODELS.map(model => {
          const config = configs[model.id];
          const strap = STRAPS[config.strap];
          const dial = DIALS[config.dial];

          return (
            <div key={model.id} className="configurator-card" id={`configurator-${model.id}`}>
              <div className="configurator-watch-container">
                {/* Custom SVG watch with changing fills */}
                <svg viewBox="0 0 360 420" className="config-watch-svg">
                  <defs>
                    <radialGradient id="dial-sunburst" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#e8e7e1" />
                      <stop offset="100%" stopColor="#bab8b2" />
                    </radialGradient>
                  </defs>

                  {/* Watch Strap (Top) */}
                  <path d="M145 10 L215 10 L202 130 L158 130 Z" fill={strap.color} stroke={strap.stroke} strokeWidth="1.5" />
                  <path d="M152 10 L163 125 M208 10 L197 125" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
                  
                  {/* Watch Strap (Bottom) */}
                  <path d="M158 250 L202 250 L215 370 L145 370 Z" fill={strap.color} stroke={strap.stroke} strokeWidth="1.5" />
                  <path d="M163 255 L152 370 M197 255 L208 370" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Lugs */}
                  <path d="M136 100 L158 132 L146 132 Z" fill="#1b1b1c" stroke="#2c2c2e" strokeWidth="0.8" />
                  <path d="M224 100 L202 132 L214 132 Z" fill="#1b1b1c" stroke="#2c2c2e" strokeWidth="0.8" />
                  <path d="M136 280 L158 248 L146 248 Z" fill="#1b1b1c" stroke="#2c2c2e" strokeWidth="0.8" />
                  <path d="M224 280 L202 248 L214 248 Z" fill="#1b1b1c" stroke="#2c2c2e" strokeWidth="0.8" />

                  {/* Outer Steel Case */}
                  <circle cx="180" cy="190" r="88" fill="#1c1c1d" stroke="#3a3a3c" strokeWidth="2.5" />
                  <circle cx="180" cy="190" r="82" fill="none" stroke="#111" strokeWidth="1.5" />

                  {/* Dial */}
                  <circle 
                    cx="180" 
                    cy="190" 
                    r="78" 
                    fill={dial.name === 'SILVER SUNBURST' ? 'url(#dial-sunburst)' : dial.color} 
                  />
                  
                  {/* Dial Ticks */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1={180 + 68 * Math.sin(angle)}
                        y1={190 - 68 * Math.cos(angle)}
                        x2={180 + 74 * Math.sin(angle)}
                        y2={190 - 74 * Math.cos(angle)}
                        stroke={dial.name === 'SILVER SUNBURST' ? '#1c1c1d' : '#c9b97a'}
                        strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                        opacity={i % 3 === 0 ? 0.8 : 0.4}
                      />
                    );
                  })}

                  {/* Watch hands (running stationary for customization) */}
                  <line x1="180" y1="190" x2="180" y2="138" stroke="#faf8f5" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="180" y1="190" x2="225" y2="190" stroke="#faf8f5" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="180" y1="190" x2="152" y2="224" stroke="#c9b97a" strokeWidth="0.8" />
                  <circle cx="180" cy="190" r="3.5" fill="#111" stroke="#c9b97a" strokeWidth="0.8" />
                </svg>
              </div>

              <div className="configurator-controls">
                <h3 className="configurator-model-name">{model.label}</h3>
                
                {/* Strap selection */}
                <div className="config-control-group">
                  <span className="control-label">STRAP swatch</span>
                  <div className="swatch-list">
                    {STRAPS.map((s, idx) => (
                      <button 
                        key={s.name}
                        className={`swatch-btn ${config.strap === idx ? 'active' : ''}`}
                        onClick={() => handleStrapSelect(model.id, idx)}
                        style={{ backgroundColor: s.color }}
                        title={s.name}
                        aria-label={`Select strap: ${s.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dial selection */}
                <div className="config-control-group">
                  <span className="control-label">DIAL swatch</span>
                  <div className="swatch-list">
                    {DIALS.map((d, idx) => (
                      <button 
                        key={d.name}
                        className={`swatch-btn dial-swatch ${config.dial === idx ? 'active' : ''}`}
                        onClick={() => handleDialSelect(model.id, idx)}
                        style={{ backgroundColor: d.color }}
                        title={d.name}
                        aria-label={`Select dial: ${d.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Readout */}
                <div className="configurator-readout" aria-live="polite">
                  {model.label} · {strap.name} · {dial.name}
                </div>

                {/* Enquiry CTA */}
                <button 
                  className="configurator-cta cta-hover"
                  onClick={() => handleOpenModal(model.id)}
                  id={`request-config-${model.id}`}
                >
                  REQUEST THIS CONFIGURATION
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-up modal */}
      <div 
        className={`enquiry-modal-overlay ${modalOpen ? 'open' : ''}`} 
        onClick={() => setModalOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Enquire for configured timepiece"
      >
        <div 
          className="enquiry-modal-content"
          onClick={(e) => e.stopPropagation()} // Prevent overlay close on modal body click
        >
          <button 
            className="modal-close-btn" 
            onClick={() => setModalOpen(false)}
            aria-label="Close modal"
          >
            ✕
          </button>
          
          <div className="modal-header">
            <span className="modal-eyebrow">A Bespoke Inquiry</span>
            <h3 className="modal-title">Request Allocation</h3>
            <p className="modal-subtitle">
              Configure details will be forwarded directly to your dedicated sales advisor in Switzerland.
            </p>
          </div>

          {submitted ? (
            <div className="modal-success-msg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9b97a" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h4>Enquiry Submitted</h4>
              <p>An advisor will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="enquiry-form">
              {/* Selected Config Readout */}
              <div className="form-summary">
                <span className="form-summary-label">Timepiece Configuration</span>
                <span className="form-summary-value">
                  {MODELS.find(m => m.id === activeModelEnquiry)?.label} · {STRAPS[configs[activeModelEnquiry]?.strap]?.name} · {DIALS[configs[activeModelEnquiry]?.dial]?.name}
                </span>
              </div>

              <div className="form-field">
                <label htmlFor="enquiry-name">Full Name</label>
                <input type="text" id="enquiry-name" required placeholder="Alexander Vance" />
              </div>

              <div className="form-field">
                <label htmlFor="enquiry-email">Email Address</label>
                <input type="email" id="enquiry-email" required placeholder="alexander@valence.com" />
              </div>

              <div className="form-field">
                <label htmlFor="enquiry-msg">Special Instructions</label>
                <textarea id="enquiry-msg" rows="3" placeholder="Sizing details or engraving requests..." />
              </div>

              <button type="submit" className="form-submit-btn" id="submit-enquiry-form">
                SUBMIT CONFIGURATION REQUEST
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
