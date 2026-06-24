import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Progress bar sweeps over 1.8 seconds. Staggered reveal takes about 1.8s too.
    // Trigger split curtains at 2.1s
    const splitTimer = setTimeout(() => {
      setComplete(true);
    }, 2100);

    // Remove from DOM / interaction after transition completes (approx 3.2s)
    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 3200);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  const word = "MERIDIAN";

  return (
    <div className={`preloader-overlay ${complete ? 'complete' : ''}`}>
      <div className="preloader-curtain top" />
      <div className="preloader-curtain bottom" />
      <div className="preloader-content">
        <div className="preloader-wordmark">
          {word.split('').map((char, index) => (
            <span
              key={index}
              className="preloader-letter"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="preloader-progress-track">
          <div className="preloader-progress-bar" />
        </div>
      </div>
    </div>
  );
}
