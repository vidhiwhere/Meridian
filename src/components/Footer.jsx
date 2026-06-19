import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <span className="footer-logo">Meridian</span>

      <ul className="footer-links">
        <li><a href="#" id="footer-link-collections">Collections</a></li>
        <li><a href="#" id="footer-link-about">The Manufacture</a></li>
        <li><a href="#" id="footer-link-archive">Archive</a></li>
        <li><a href="#" id="footer-link-dealers">Retailers</a></li>
        <li><a href="#" id="footer-link-contact">Contact</a></li>
      </ul>

      <span className="footer-copy">
        © {new Date().getFullYear()} Meridian SA · Le Brassus, Switzerland
      </span>
    </footer>
  );
}
