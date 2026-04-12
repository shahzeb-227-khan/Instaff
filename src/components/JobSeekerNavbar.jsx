import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './JobSeekerNavbar.css';

/**
 * REUSABLE JOB SEEKER NAVBAR
 * Links: Home | Find Jobs
 * Right: Logout → entry page
 */
const JobSeekerNavbar = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const links = [
    { to: '/job-seeker/home',      label: 'Home'      },
    { to: '/job-seeker/find-jobs', label: 'Find Jobs' },
    { to: '/job-seeker/messages',  label: 'Messages'  },
  ];

  return (
    <nav className="js-nav" aria-label="Job Seeker navigation">
      <div className="js-nav__inner">
        {/* Logo */}
        <Link to="/job-seeker/home" className="js-nav__brand">InStaff</Link>

        {/* Centre links */}
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

        {/* Right: Logout only */}
        <div className="js-nav__right">
          <button
            className="js-nav__logout"
            onClick={() => navigate('/')}
            aria-label="Logout and return to role selection"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default JobSeekerNavbar;
