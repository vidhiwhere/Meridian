import React from 'react';
import './index.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import Collections from './components/Collections';
import Editorial from './components/Editorial';
import PressQuotes from './components/PressQuotes';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Collections />
        <Editorial />
        <PressQuotes />
      </main>
      <Footer />
    </>
  );
}
