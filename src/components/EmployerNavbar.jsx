import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './EmployerNavbar.css';

/**
 * REUSABLE EMPLOYER NAVBAR
 * Links: Home | Find Talent | Post Job | Messages | Payment
 * Right: Logout → entry page
 */
const EmployerNavbar = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const links = [
    { to: '/employer/home',         label: 'Home'        },
    { to: '/employer/find-talent',  label: 'Find Talent' },
    { to: '/employer/post-job',     label: 'Post Job'    },
    { to: '/employer/messages',     label: 'Messages'    },
    { to: '/employer/payment',      label: 'Payment'     },
  ];

  return (
    <nav className="emp-nav" aria-label="Employer navigation">
      <div className="emp-nav__inner">
        {/* Logo */}
        <Link to="/employer/home" className="emp-nav__brand">InStaff</Link>

        {/* Centre links */}
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

        {/* Right: Logout only */}
        <div className="emp-nav__right">
          <button
            className="emp-nav__logout"
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

export default EmployerNavbar;
