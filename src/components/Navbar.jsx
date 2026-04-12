import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">InStaff</Link>
        <div className="navbar-links">
          <Link 
            to="/find-work" 
            className={`nav-link ${location.pathname === '/find-work' ? 'active' : ''}`}
          >
            Find Work
          </Link>
          <Link 
            to="/messages" 
            className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}
          >
            Messages
          </Link>
          <Link 
            to="/payments" 
            className={`nav-link ${location.pathname === '/payments' ? 'active' : ''}`}
          >
            Payments
          </Link>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-icons">
          <Link to="/notifications" aria-label="Notifications" className={`icon-btn ${location.pathname === '/notifications' ? 'text-primary' : ''}`}>
            <Bell size={24} />
          </Link>
          <Link to="/settings" aria-label="Settings" className={`icon-btn ${location.pathname === '/settings' ? 'text-primary' : ''}`}>
            <Settings size={24} />
          </Link>
        </div>
        
        <div className="navbar-profile-section">
          <div className="profile-wrapper">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3cMUC6lS84uDL4aeBUHZ0BKDbmCrdW0AAUhr_0VJwsG1ILTXKfulaLB7v_-VvUPc7WprBHbTFBzeYisN2I-kLIGt9oqSifBb2kiFziTwDpiy_bebjXMhMmFpXMp4WTHM49lFXo58d2SBcVif-vNx6ByLPqOFdtRkajWtpyg4HvkwbKGPL6KJ9lftgt_K5gLfrRwdw8OCA6CdHDnN_eAVEIaw3JUyH6qFFo921Z1IugKpxi9WLiJgBghLtBZJD102mrNt9xpIZ0QM" 
              alt="User Profile" 
              className="profile-img"
            />
            <span className="status-indicator"></span>
          </div>
          <Link to="/post-job" className="btn btn-primary cta-gradient">
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
