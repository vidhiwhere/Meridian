import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <section className="newsletter" id="newsletter" aria-label="Newsletter subscription">
      <div className="newsletter-glow" aria-hidden="true" />
      <div className="newsletter-content">
        <span className="newsletter-eyebrow">The Meridian Register</span>
        <h2 className="newsletter-title">Receive Private Allocation News</h2>
        <p className="newsletter-desc">
          Members of the Register receive notifications for upcoming caliber releases, private boutique events, and allocation opportunities before they are made public.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
              aria-label="Email address"
              id="newsletter-email-input"
            />
            <button
              type="submit"
              className={`newsletter-submit${status === 'success' ? ' success' : ''}`}
              disabled={status === 'loading' || status === 'success'}
              id="newsletter-submit-btn"
            >
              {status === 'idle' && 'Subscribe'}
              {status === 'loading' && <span className="loader" />}
              {status === 'success' && 'Subscribed'}
            </button>
          </div>
        </form>

        {status === 'success' && (
          <p className="newsletter-status success-msg">
            Welcome to the Meridian Register. A confirmation email has been dispatched.
          </p>
        )}
      </div>
    </section>
  );
}
