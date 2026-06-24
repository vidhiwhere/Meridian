import React, { useEffect, useRef, useState } from 'react';

export default function MaterialCloseUp() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;
      // Calculate progress (0 to 1) when the section passes through viewport
      const currentScroll = -rect.top;
      const pct = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute opacities for the 3 slides based on scroll progress
  // Slide 1 (Steel): 1.0 at progress=0, fades out between 0.25 and 0.4
  const op1 = Math.max(0, Math.min(1, (0.38 - progress) / 0.15));

  // Slide 2 (Ceramic): fades in between 0.25 and 0.4, fades out between 0.62 and 0.75
  let op2 = 0;
  if (progress < 0.38) {
    op2 = Math.max(0, Math.min(1, (progress - 0.23) / 0.15));
  } else if (progress < 0.62) {
    op2 = 1;
  } else {
    op2 = Math.max(0, Math.min(1, (0.77 - progress) / 0.15));
  }

  // Slide 3 (Leather): fades in between 0.62 and 0.77, reaches 1.0 at progress=0.77
  const op3 = Math.max(0, Math.min(1, (progress - 0.62) / 0.15));

  return (
    <div 
      ref={containerRef} 
      className="material-close-up-outer"
      id="material-closeup"
      aria-label="Material texture showcase"
    >
      <div className="sticky-wrapper">
        
        {/* Layer 1: Brushed Steel */}
        <div className="material-slide" style={{ opacity: op1, zIndex: 1 }}>
          <svg className="material-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="steel-base" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#303030" />
                <stop offset="50%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </linearGradient>
              <linearGradient id="steel-highlight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="35%" stopColor="rgba(255,255,255,0.01)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect width="1000" height="600" fill="url(#steel-base)" />
            <rect width="1000" height="600" fill="url(#steel-highlight)" />
            {/* Fine brush lines */}
            {Array.from({ length: 60 }).map((_, i) => (
              <line 
                key={i} 
                x1="-100" y1={i * 12} 
                x2="1100" y2={i * 12 + 60} 
                stroke="rgba(255,255,255,0.035)" 
                strokeWidth="0.8" 
              />
            ))}
            {/* Highlight sweeps */}
            <path d="M 0 0 L 400 0 L 1000 600 L 600 600 Z" fill="rgba(255, 255, 255, 0.012)" />
            <path d="M 300 0 L 500 0 L 1000 500 L 800 600 Z" fill="rgba(255, 255, 255, 0.008)" />
          </svg>
          <div className="slide-label">BRUSHED OYSTER STEEL · 316L GRADE</div>
        </div>

        {/* Layer 2: Matte Ceramic */}
        <div className="material-slide" style={{ opacity: op2, zIndex: 2 }}>
          <svg className="material-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <radialGradient id="ceramic-base" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#141416" />
                <stop offset="60%" stopColor="#0a0a0c" />
                <stop offset="100%" stopColor="#030304" />
              </radialGradient>
              <linearGradient id="ceramic-reflection" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.015)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.002)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect width="1000" height="600" fill="url(#ceramic-base)" />
            <rect width="1000" height="600" fill="url(#ceramic-reflection)" />
            {/* Soft geometric reflections mimicking faceted ceramic bezel */}
            <path d="M 0 100 L 1000 120 L 1000 250 L 0 200 Z" fill="rgba(255, 255, 255, 0.004)" />
            <path d="M 0 400 L 1000 350 L 1000 520 L 0 550 Z" fill="rgba(255, 255, 255, 0.004)" />
            {/* Subtle grain */}
            <rect width="1000" height="600" fill="rgba(200,200,220,0.005)" style={{ mixBlendMode: 'overlay' }} />
          </svg>
          <div className="slide-label">MATTE ZIRCONIA CERAMIC · SINTERED AT 1450°C</div>
        </div>

        {/* Layer 3: Alligator Leather */}
        <div className="material-slide" style={{ opacity: op3, zIndex: 3 }}>
          <svg className="material-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="leather-base" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1814" />
                <stop offset="100%" stopColor="#0e0a08" />
              </linearGradient>
            </defs>
            <rect width="1000" height="600" fill="url(#leather-base)" />
            
            {/* Hand-drawn alligator scales */}
            {/* Top row */}
            <path d="M -50 -50 L 220 -50 L 180 120 L -50 150 Z" fill="#181310" stroke="#070504" strokeWidth="2.5" />
            <path d="M 220 -50 L 480 -50 L 450 130 L 180 120 Z" fill="#1c1612" stroke="#070504" strokeWidth="2.5" />
            <path d="M 480 -50 L 780 -50 L 730 115 L 450 130 Z" fill="#17120e" stroke="#070504" strokeWidth="2.5" />
            <path d="M 780 -50 L 1050 -50 L 1050 140 L 730 115 Z" fill="#191410" stroke="#070504" strokeWidth="2.5" />
            
            {/* Mid row */}
            <path d="M -50 150 L 180 120 L 140 320 L -50 350 Z" fill="#16110e" stroke="#070504" strokeWidth="2.5" />
            <path d="M 180 120 L 450 130 L 400 330 L 140 320 Z" fill="#1a1410" stroke="#070504" strokeWidth="2.5" />
            <path d="M 450 130 L 730 115 L 680 315 L 400 330 Z" fill="#140f0c" stroke="#070504" strokeWidth="2.5" />
            <path d="M 730 115 L 1050 140 L 1050 340 L 680 315 Z" fill="#1c1612" stroke="#070504" strokeWidth="2.5" />

            {/* Bottom row */}
            <path d="M -50 350 L 140 320 L 110 520 L -50 560 Z" fill="#181310" stroke="#070504" strokeWidth="2.5" />
            <path d="M 140 320 L 400 330 L 350 515 L 110 520 Z" fill="#1b1511" stroke="#070504" strokeWidth="2.5" />
            <path d="M 400 330 L 680 315 L 630 510 L 350 515 Z" fill="#15100d" stroke="#070504" strokeWidth="2.5" />
            <path d="M 680 315 L 1050 340 L 1050 530 L 630 510 Z" fill="#1e1814" stroke="#070504" strokeWidth="2.5" />

            {/* Stitching paths on edges */}
            <line x1="20" y1="0" x2="20" y2="600" stroke="#c9b97a" strokeWidth="1.2" strokeDasharray="3 7" opacity="0.3" />
            <line x1="980" y1="0" x2="980" y2="600" stroke="#c9b97a" strokeWidth="1.2" strokeDasharray="3 7" opacity="0.3" />
          </svg>
          <div className="slide-label">MISSISSIPPIENSIS ALLIGATOR NOIR · HAND-STITCHED</div>
        </div>

        {/* Text Overlay */}
        <div className="text-overlay">
          <h2 className="overlay-heading">EVERY SURFACE CONSIDERED</h2>
        </div>

      </div>
    </div>
  );
}
