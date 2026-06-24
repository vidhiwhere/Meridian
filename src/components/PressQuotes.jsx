import React, { useEffect, useRef, useState } from 'react';

const QUOTES = [
  {
    id: 'q1',
    quote: "In a market glutted with complication for its own sake, Meridian builds watches that justify every additional wheel and pinion. The Solaris is the most sincere watch made today.",
    publication: "Revolution Magazine",
  },
  {
    id: 'q2',
    quote: "The Caliber M-01 is a lesson in controlled obsession. The finishing on the bridges rivals anything coming out of Geneva at twice the price.",
    publication: "Hodinkee",
  },
  {
    id: 'q3',
    quote: "Meridian does not chase trends. It sets a standard, then quietly exceeds it. The Eclipse Tourbillon is a masterwork.",
    publication: "WatchTime",
  },
  {
    id: 'q4',
    quote: "To wear a Meridian is to carry 220 hours of single-minded focus on your wrist. It is horology stripped of compromise.",
    publication: "The New York Times",
  },
  {
    id: 'q5',
    quote: "Their dial finishing captures the high-altitude morning sun in a way that simply cannot be replicated by machinery. Exquisite.",
    publication: "GQ Editorial",
  }
];

export default function PressQuotes() {
  const trackRef = useRef(null);
  const [isDraggingState, setIsDraggingState] = useState(false);
  
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const lastX = useRef(0);
  const inertiaFrame = useRef(null);

  const handleMouseDown = (e) => {
    // Only drag with left mouse click
    if (e.button !== 0) return;

    isDown.current = true;
    setIsDraggingState(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    
    lastTime.current = performance.now();
    lastX.current = e.pageX;
    velocity.current = 0;
    
    // Disable scroll snap for free, fluid drag experience
    trackRef.current.style.scrollSnapType = 'none';
    cancelAnimationFrame(inertiaFrame.current);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    trackRef.current.scrollLeft = scrollLeft.current - walk;

    // Track instant velocity
    const now = performance.now();
    const dt = now - lastTime.current;
    const dx = e.pageX - lastX.current;
    if (dt > 0) {
      velocity.current = dx / dt;
    }
    lastTime.current = now;
    lastX.current = e.pageX;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsDraggingState(false);

    // Re-enable snapping to allow immediate browser lock-in
    trackRef.current.style.scrollSnapType = 'x mandatory';

    // Apply smooth inertia drift on release
    if (Math.abs(velocity.current) > 0.15) {
      applyInertia();
    }
  };

  const applyInertia = () => {
    let vel = velocity.current * 18; // scale coefficient
    const decay = 0.94; // friction decay

    const step = () => {
      if (Math.abs(vel) < 0.3) {
        cancelAnimationFrame(inertiaFrame.current);
        return;
      }
      if (trackRef.current) {
        trackRef.current.scrollLeft -= vel;
      }
      vel *= decay;
      inertiaFrame.current = requestAnimationFrame(step);
    };
    inertiaFrame.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(inertiaFrame.current);
  }, []);

  return (
    <section className="press-carousel-section" id="press" aria-label="Press and publications reviews">
      <div className="press-carousel-header">
        <span className="press-carousel-eyebrow">The Verdict</span>
        <h2 className="press-carousel-title">Notes from the Field</h2>
      </div>

      <div 
        ref={trackRef}
        className={`press-carousel-track ${isDraggingState ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        role="region"
        aria-live="polite"
      >
        {QUOTES.map((q) => (
          <blockquote key={q.id} className="press-quote-card">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p className="press-carousel-quote">{q.quote}</p>
            <cite className="press-carousel-publication">{q.publication}</cite>
          </blockquote>
        ))}
      </div>

      <div className="press-carousel-hint" aria-hidden="true">
        <span>DRAG TO EXPLORE</span>
      </div>
    </section>
  );
}
