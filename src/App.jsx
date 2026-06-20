import React from 'react';
import './index.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import Collections from './components/Collections';
import Craftsmanship from './components/Craftsmanship';
import Editorial from './components/Editorial';
import Heritage from './components/Heritage';
import Shop from './components/Shop';
import PressQuotes from './components/PressQuotes';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Collections />
        <Craftsmanship />
        <Editorial />
        <Heritage />
        <Shop />
        <PressQuotes />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

