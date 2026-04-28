import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, ArrowLeftRight } from 'lucide-react';
import './JobSeekerNavbar.css';

/**
 * REUSABLE JOB SEEKER NAVBAR
 * Links: Home | Find Jobs | Messages
 * Right: Switch Role + Logout → entry page
 * Mobile: Hamburger menu with all links
 */
const JobSeekerNavbar = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const links = [
    { to: '/job-seeker/home',      label: 'Home'      },
    { to: '/job-seeker/find-jobs', label: 'Find Jobs' },
    { to: '/job-seeker/dashboard', label: 'Dashboard' },
    { to: '/job-seeker/messages',  label: 'Messages'  },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="js-nav" aria-label="Job Seeker navigation">
      <div className="js-nav__inner">
        {/* Logo */}
        <Link to="/job-seeker/home" className="js-nav__brand" onClick={closeMenu}>InStaff</Link>

        {/* Centre links — desktop */}
        <div className="js-nav__links" role="menubar">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              role="menuitem"
              className={`js-nav__link ${isActive(to) ? 'js-nav__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Switch Role + Logout */}
        <div className="js-nav__right">
          {/* Switch Role — HCI: User control & flexibility */}
          <button
            className="js-nav__switch-role"
            onClick={() => navigate('/')}
            aria-label="Switch to Employer portal"
            title="Switch to Employer"
          >
            <ArrowLeftRight size={14} />
            <span className="js-nav__switch-label">Switch to Employer</span>
          </button>

          <button
            className="js-nav__logout"
            onClick={() => navigate('/')}
            aria-label="Logout and return to role selection"
          >
            <LogOut size={16} />
            Logout
          </button>

          {/* Hamburger toggle — mobile only */}
          <button
            className="js-nav__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="js-nav__mobile-menu" role="dialog" aria-label="Mobile navigation">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`js-nav__mobile-link ${isActive(to) ? 'js-nav__mobile-link--active' : ''}`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <div className="js-nav__mobile-divider" />
          <button
            className="js-nav__mobile-switch"
            onClick={() => { closeMenu(); navigate('/'); }}
          >
            <ArrowLeftRight size={15} />
            Switch to Employer
          </button>
          <button
            className="js-nav__mobile-logout"
            onClick={() => { closeMenu(); navigate('/'); }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default JobSeekerNavbar;
