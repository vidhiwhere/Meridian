import React, { useEffect, useRef } from 'react';

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
];

export default function PressQuotes() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.2 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="press" id="press" aria-label="Press">
      <div className="press-inner">
        {QUOTES.map((q, i) => (
          <blockquote
            key={q.id}
            id={q.id}
            className="press-item"
            ref={el => refs.current[i] = el}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="press-rule" aria-hidden="true" />
            <p className="press-quote">"{q.quote}"</p>
            <cite className="press-publication">{q.publication}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
