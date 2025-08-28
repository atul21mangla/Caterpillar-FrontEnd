// src/components/shared/Footer.jsx
import React from 'react';
import '../../styles/Footer.css';
import catLogo from '../../assets/Cat_logo.png';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand-area">
        <img src={catLogo} alt="Caterpillar Logo" className="footer-logo" />
        <span className="footer-brand">Caterpillar SmartRent</span>
      </div>
      <span className="footer-links">
        <a href="https://www.caterpillar.com/" target="_blank" rel="noopener noreferrer" className="footer-cat-btn">
          Visit Caterpillar
        </a>
        <span className="footer-sep">|</span>
        <a href="/privacy" className="footer-link">Privacy Policy</a>
        <span className="footer-sep">|</span>
        <a href="/terms" className="footer-link">Terms of Service</a>
      </span>
      <span className="footer-copy">© {new Date().getFullYear()} Caterpillar. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
