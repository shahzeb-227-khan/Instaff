import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, ArrowLeftRight } from 'lucide-react';
import './EmployerNavbar.css';

/**
 * REUSABLE EMPLOYER NAVBAR
 * Links: Home | Find Talent | Post Job | Messages | Payment
 * Right: Switch Role + Logout → entry page
 * Mobile: Hamburger menu with all links
 */
const EmployerNavbar = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const links = [
    { to: '/employer/home',         label: 'Home'        },
    { to: '/employer/find-talent',  label: 'Find Talent' },
    { to: '/employer/post-job',     label: 'Post Job'    },
    { to: '/employer/messages',     label: 'Messages'    },
    { to: '/employer/payment',      label: 'Payment'     },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="emp-nav" aria-label="Employer navigation">
      <div className="emp-nav__inner">
        {/* Logo */}
        <Link to="/employer/home" className="emp-nav__brand" onClick={closeMenu}>InStaff</Link>

        {/* Centre links - desktop */}
        <div className="emp-nav__links" role="menubar">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              role="menuitem"
              className={`emp-nav__link ${isActive(to) ? 'emp-nav__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Switch Role + Logout */}
        <div className="emp-nav__right">
          {/* Switch Role — HCI: User control & flexibility */}
          <button
            className="emp-nav__switch-role"
            onClick={() => navigate('/')}
            aria-label="Switch to Job Seeker portal"
            title="Switch to Job Seeker"
          >
            <ArrowLeftRight size={14} />
            <span className="emp-nav__switch-label">Switch to Job Seeker</span>
          </button>

          <button
            className="emp-nav__logout"
            onClick={() => navigate('/')}
            aria-label="Logout and return to role selection"
          >
            <LogOut size={16} />
            Logout
          </button>

          {/* Hamburger toggle — mobile only */}
          <button
            className="emp-nav__hamburger"
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
        <div className="emp-nav__mobile-menu" role="dialog" aria-label="Mobile navigation">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`emp-nav__mobile-link ${isActive(to) ? 'emp-nav__mobile-link--active' : ''}`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <div className="emp-nav__mobile-divider" />
          <button
            className="emp-nav__mobile-switch"
            onClick={() => { closeMenu(); navigate('/'); }}
          >
            <ArrowLeftRight size={15} />
            Switch to Job Seeker
          </button>
          <button
            className="emp-nav__mobile-logout"
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

export default EmployerNavbar;
