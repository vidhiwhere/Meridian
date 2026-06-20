import React, { useState, useEffect, useRef } from 'react';
import { SolarisWatch, EclipseWatch, NocturneWatch } from './Hero';
import { AuroraWatch, MeridiemWatch, DiverWatch, PerpetualWatch } from './AuroraWatch';
import WatchDetail from './WatchDetail';

const ALL_WATCHES = [
  {
    id: 'solaris',
    collection: 'Solaris',
    name: 'Solaris I',
    caliber: 'M-01',
    price: 'CHF 28,500',
    material: 'Stainless Steel',
    diameter: '40mm',
    tag: 'Bestseller',
    desc: 'Sunburst gilt dial with hand-applied indices. The founding piece of Meridian.',
    specs: [
      ['Case', '316L Stainless Steel'],
      ['Diameter', '40mm · 10mm thick'],
      ['Caliber', 'M-01 Hand-wound'],
      ['Frequency', '28,800 vph'],
      ['Power Reserve', '72 hours'],
      ['Components', '316'],
      ['Water Resistance', '30m'],
      ['Crystal', 'AR-coated Sapphire'],
    ],
    materials: [
      ['Case Metal', '316L Stainless Steel'],
      ['Dial', 'Guilloché silver opaline'],
      ['Hands', 'Blued steel, Dauphine'],
      ['Strap', 'Barenia calfskin'],
      ['Buckle', 'Deployant clasp'],
      ['Crown', 'Onion-shaped'],
    ],
    story: 'The Solaris is where Meridian began. Designed in 1887 by Édouard Valence, the sunburst dial was intended to capture the quality of morning light in Le Brassus. Every detail — the hand-applied indices, the tapered lugs, the slightly domed crystal — remains unchanged to this day.',
    Watch: SolarisWatch,
  },
  {
    id: 'eclipse',
    collection: 'Eclipse',
    name: 'Eclipse Tourbillon',
    caliber: 'M-02',
    price: 'CHF 84,000',
    material: 'White Gold',
    diameter: '42mm',
    tag: 'Tourbillon',
    desc: 'Flying tourbillon at 6 o\'clock. Matte black dial, 18k white gold case.',
    specs: [
      ['Case', '18k White Gold'],
      ['Diameter', '42mm · 11.8mm thick'],
      ['Caliber', 'M-02 Flying Tourbillon'],
      ['Frequency', '18,000 vph'],
      ['Power Reserve', '56 hours'],
      ['Components', '412'],
      ['Water Resistance', '30m'],
      ['Crystal', 'Double-AR Sapphire'],
    ],
    materials: [
      ['Case Metal', '18k White Gold (5N)'],
      ['Dial', 'Matte black onyx PVD'],
      ['Hands', 'Polished gold, Baton'],
      ['Strap', 'Black alligator'],
      ['Buckle', '18k deployant'],
      ['Crown', 'Cabochon ruby set'],
    ],
    story: 'The Eclipse Tourbillon represents Meridian at its most audacious. The flying tourbillon — requiring 380 individual components just for its cage — is visible through the open dial aperture at 6 o\'clock. Each cage is assembled by a single watchmaker over 45 hours.',
    Watch: EclipseWatch,
  },
  {
    id: 'nocturne',
    collection: 'Nocturne',
    name: 'Nocturne Céleste',
    caliber: 'M-03',
    price: 'CHF 56,800',
    material: 'Titanium',
    diameter: '39mm',
    tag: 'Moon Phase',
    desc: 'Deep celestial dial with moon phase complication and hand-painted enamel.',
    specs: [
      ['Case', 'Grade 5 Titanium'],
      ['Diameter', '39mm · 10.5mm thick'],
      ['Caliber', 'M-03 Moon Phase'],
      ['Frequency', '28,800 vph'],
      ['Power Reserve', '68 hours'],
      ['Components', '388'],
      ['Water Resistance', '50m'],
      ['Crystal', 'Domed sapphire'],
    ],
    materials: [
      ['Case Metal', 'Grade 5 Titanium'],
      ['Dial', 'Deep blue lacquer + enamel'],
      ['Hands', 'Rhodium-plated, skeleton'],
      ['Strap', 'Midnight blue velvet'],
      ['Buckle', 'Titanium pin buckle'],
      ['Crown', 'Screw-down'],
    ],
    story: 'The Nocturne Céleste was born from a conversation between Henri Valence and the astronomer Claude Rémy about the accuracy of moon phase displays. This caliber is accurate to one day in 122 years — the most precise moon phase mechanism Meridian has ever produced.',
    Watch: NocturneWatch,
  },
  {
    id: 'aurora',
    collection: 'Aurora',
    name: 'Aurora Boréalis',
    caliber: 'M-04',
    price: 'CHF 42,000',
    material: 'Stainless Steel',
    diameter: '41mm',
    tag: 'Limited 88',
    desc: 'Aurora-inspired dial with hand-painted borealis effect. Limited to 88 pieces.',
    specs: [
      ['Case', '316L Stainless Steel'],
      ['Diameter', '41mm · 11mm thick'],
      ['Caliber', 'M-04 Automatic'],
      ['Frequency', '28,800 vph'],
      ['Power Reserve', '64 hours'],
      ['Components', '348'],
      ['Water Resistance', '50m'],
      ['Crystal', 'AR sapphire, curved'],
    ],
    materials: [
      ['Case Metal', '316L Stainless Steel'],
      ['Dial', 'Hand-painted aurora gradient'],
      ['Hands', 'Super-LumiNova, pointed'],
      ['Strap', 'Dark navy cordura'],
      ['Buckle', 'Deployant clasp'],
      ['Crown', 'Coin-edged'],
    ],
    story: 'Inspired by a research expedition to Tromsø, Norway, the Aurora Boréalis features a dial painted over three days by master enameler Margit Sölveig. Each piece is entirely unique — no two aurora dials are identical. Limited to 88 pieces worldwide.',
    Watch: AuroraWatch,
  },
  {
    id: 'meridiem',
    collection: 'Meridiem',
    name: 'Meridiem Classique',
    caliber: 'M-05',
    price: 'CHF 19,800',
    material: 'Rose Gold',
    diameter: '38mm',
    tag: 'Entry',
    desc: 'Elegant dress watch. Rose gold case with champagne guilloché dial.',
    specs: [
      ['Case', '18k Rose Gold'],
      ['Diameter', '38mm · 9.2mm thick'],
      ['Caliber', 'M-05 Hand-wound'],
      ['Frequency', '18,000 vph'],
      ['Power Reserve', '48 hours'],
      ['Components', '198'],
      ['Water Resistance', '30m'],
      ['Crystal', 'Box sapphire'],
    ],
    materials: [
      ['Case Metal', '18k Rose Gold (5N)'],
      ['Dial', 'Champagne guilloché opaline'],
      ['Hands', 'Rose gold Dauphine'],
      ['Strap', 'Cognac alligator Hornback'],
      ['Buckle', '18k deployant'],
      ['Crown', 'Polished rose gold'],
    ],
    story: 'The Meridiem Classique is an exercise in restraint. Where other watchmakers pile on complications, the Classique pursues perfection in simplicity. Every proportion — the case thickness, the lug width, the dial text — was refined over 36 prototypes before Valence approved the first production piece.',
    Watch: MeridiemWatch,
  },
  {
    id: 'abyssal',
    collection: 'Abyssal',
    name: 'Abyssal 300',
    caliber: 'M-06',
    price: 'CHF 24,200',
    material: 'Ceramic',
    diameter: '44mm',
    tag: '300m',
    desc: 'Professional diver. Ceramic case, unidirectional bezel, ISO 6425 certified.',
    specs: [
      ['Case', 'Black Ceramic + Titanium'],
      ['Diameter', '44mm · 13.5mm thick'],
      ['Caliber', 'M-06 Automatic'],
      ['Frequency', '28,800 vph'],
      ['Power Reserve', '72 hours'],
      ['Components', '312'],
      ['Water Resistance', '300m · ISO 6425'],
      ['Crystal', 'Flat sapphire, anti-glare'],
    ],
    materials: [
      ['Case Metal', 'Black zirconia ceramic'],
      ['Bezel', 'Ceramic, unidirectional'],
      ['Dial', 'Sunburst black + SuperLumiNova'],
      ['Hands', 'Broad sword, lume-filled'],
      ['Strap', 'Rubber + titanium clasp'],
      ['Crown', 'Screw-down, triple-gasket'],
    ],
    story: 'Born from Meridian\'s partnership with the CNRS deep-sea research program, the Abyssal 300 was tested at 600 meters of pressure before release. It is the only Meridian to bear the ISO 6425 diver certification — a standard Valence says "should be mandatory for anything calling itself a dive watch."',
    Watch: DiverWatch,
  },
  {
    id: 'perpetual',
    collection: 'Grand Complication',
    name: 'Perpetual Calendrier',
    caliber: 'M-07',
    price: 'CHF 128,000',
    material: 'Platinum',
    diameter: '41mm',
    tag: 'Grand Complication',
    desc: 'Perpetual calendar, moon phase, and minute repeater. In platinum.',
    specs: [
      ['Case', '950 Platinum'],
      ['Diameter', '41mm · 13mm thick'],
      ['Caliber', 'M-07 Grand Complication'],
      ['Frequency', '21,600 vph'],
      ['Power Reserve', '56 hours'],
      ['Components', '612'],
      ['Water Resistance', '30m'],
      ['Crystal', 'Sapphire case-back'],
    ],
    materials: [
      ['Case Metal', '950 Platinum'],
      ['Dial', 'Flinqué enamel champagne'],
      ['Hands', 'Blued steel, Fleur-de-Lys'],
      ['Strap', 'Platinum alligator'],
      ['Buckle', 'Platinum pin buckle'],
      ['Crown', 'Cabochon blue sapphire'],
    ],
    story: 'Twelve years in development. The Perpetual Calendrier is Meridian\'s magnum opus — a perpetual calendar that accounts for leap years until 2100, combined with a cathedral minute repeater that strikes the hours in the key of E minor. Only 12 are made per year.',
    Watch: PerpetualWatch,
  },
];

const FILTERS = ['All', 'Stainless Steel', 'White Gold', 'Rose Gold', 'Titanium', 'Ceramic', 'Platinum'];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sort, setSort] = useState('featured');
  const [detail, setDetail] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [particles, setParticles] = useState([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 4,
    })));
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const s = time.getSeconds() + time.getMilliseconds() / 1000;
  const m = time.getMinutes() + s / 60;
  const h = (time.getHours() % 12) + m / 60;
  const secDeg = s * 6;
  const minDeg = m * 6;
  const hourDeg = h * 30;
  const dayOfYear = Math.floor((time - new Date(time.getFullYear(), 0, 0)) / 86400000);

  const filtered = ALL_WATCHES.filter(w =>
    activeFilter === 'All' || w.material === activeFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return parseFloat(a.price.replace(/[^0-9]/g, '')) - parseFloat(b.price.replace(/[^0-9]/g, ''));
    if (sort === 'price-desc') return parseFloat(b.price.replace(/[^0-9]/g, '')) - parseFloat(a.price.replace(/[^0-9]/g, ''));
    return 0;
  });

  const addToCart = (watch) => {
    setCart(c => {
      const existing = c.find(i => i.id === watch.id);
      if (existing) return c.map(i => i.id === watch.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...watch, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));

  const cartTotal = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace(/[^0-9]/g, '')) * item.qty;
  }, 0);

  const detailWatch = detail ? {
    ...ALL_WATCHES.find(w => w.id === detail),
    hourDeg, minDeg, secDeg,
    ...(detail === 'perpetual' ? { dayOfYear } : {}),
  } : null;

  return (
    <section className="shop" id="shop" aria-label="Shop">
      {/* Particle background */}
      <div className="shop-particles" aria-hidden="true">
        {particles.map(p => (
          <div key={p.id} className="shop-particle"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.size}px`, height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="shop-header reveal" ref={headerRef}>
        <span className="shop-eyebrow">The Boutique</span>
        <h2 className="shop-title">Acquire a Meridian</h2>
        <p className="shop-subtitle">
          Each piece is delivered in a hand-crafted walnut box with full papers, an 8-year movement warranty, and a personal letter from the assembling watchmaker.
        </p>
      </div>

      {/* Controls */}
      <div className="shop-controls">
        <div className="shop-filters">
          {FILTERS.map(f => (
            <button key={f}
              className={`shop-filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
              id={`shop-filter-${f.toLowerCase().replace(/\s/g, '-')}`}
            >{f}</button>
          ))}
        </div>
        <div className="shop-sort">
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="shop-sort-select" id="shop-sort-select">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="shop-grid">
        {sorted.map((watch, idx) => (
          <ShopCard
            key={watch.id}
            watch={watch}
            idx={idx}
            hourDeg={hourDeg}
            minDeg={minDeg}
            secDeg={secDeg}
            dayOfYear={dayOfYear}
            onView={() => setDetail(watch.id)}
            onAdd={() => addToCart(watch)}
          />
        ))}
      </div>

      {/* Cart toggle */}
      <button className="shop-cart-fab" onClick={() => setCartOpen(o => !o)}
        id="shop-cart-fab" aria-label={`Shopping cart, ${cart.length} items`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {cart.length > 0 && <span className="shop-cart-count">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
      </button>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="cart-drawer">
          <div className="cart-header">
            <h3 className="cart-title">Your Selection</h3>
            <button className="cart-close" onClick={() => setCartOpen(false)} id="cart-close-btn">✕</button>
          </div>
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">{item.price}</span>
                    </div>
                    <div className="cart-item-actions">
                      <span className="cart-item-qty">×{item.qty}</span>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}
                        id={`cart-remove-${item.id}`} aria-label={`Remove ${item.name}`}>✕</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>CHF {cartTotal.toLocaleString()}</span>
                </div>
                <button className="cart-checkout" id="cart-checkout-btn">
                  Proceed to Enquiry
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Detail overlay */}
      {detailWatch && (
        <WatchDetail watch={detailWatch} onClose={() => setDetail(null)} />
      )}
    </section>
  );
}

function ShopCard({ watch, idx, hourDeg, minDeg, secDeg, dayOfYear, onView, onAdd }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { Watch } = watch;
  const watchProps = { hourDeg, minDeg, secDeg };
  if (watch.id === 'perpetual') watchProps.dayOfYear = dayOfYear;

  return (
    <article
      ref={ref}
      className={`shop-card reveal${hovered ? ' hovered' : ''}`}
      style={{ transitionDelay: `${(idx % 4) * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`shop-card-${watch.id}`}
      aria-label={watch.name}
    >
      {watch.tag && <span className="shop-card-tag">{watch.tag}</span>}

      <div className="shop-card-watch" onClick={onView}>
        <div className="shop-card-watch-inner">
          <Watch {...watchProps} />
        </div>
      </div>

      <div className="shop-card-body">
        <span className="shop-card-collection">{watch.collection}</span>
        <h3 className="shop-card-name">{watch.name}</h3>
        <p className="shop-card-desc">{watch.desc}</p>
        <div className="shop-card-meta">
          <span className="shop-card-cal">Caliber {watch.caliber}</span>
          <span className="shop-card-size">{watch.diameter}</span>
        </div>
      </div>

      <div className="shop-card-footer">
        <span className="shop-card-price">{watch.price}</span>
        <div className="shop-card-btns">
          <button className="shop-card-view" onClick={onView} id={`shop-view-${watch.id}`}>Details</button>
          <button className="shop-card-add" onClick={onAdd} id={`shop-add-${watch.id}`}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}
