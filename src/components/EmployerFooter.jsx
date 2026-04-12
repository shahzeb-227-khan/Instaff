import React from 'react';
import './EmployerFooter.css';

/**
 * SHARED MINIMAL FOOTER
 * Used on ALL employer and job seeker pages.
 * No fake / non-functional links.
 */
const EmployerFooter = () => (
  <footer className="emp-footer" role="contentinfo">
    <div className="emp-footer__inner">
      <div className="emp-footer__brand">
        <span className="emp-footer__logo">InStaff</span>
        <span className="emp-footer__tagline">© 2024 InStaff · The Curated Exchange</span>
      </div>
      <p className="emp-footer__note">
        Connecting top talent with forward-thinking companies.
      </p>
    </div>
  </footer>
);

export default EmployerFooter;
