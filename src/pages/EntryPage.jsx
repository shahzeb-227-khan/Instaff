import { useNavigate } from 'react-router-dom';
import './EntryPage.css';

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="entry-root">
      {/* ── NAVBAR ── */}
      <nav className="entry-nav">
        <div className="entry-nav__inner">
          <span className="entry-nav__logo">InStaff</span>
          <div className="entry-nav__links">
            <button
              className="entry-nav__link entry-nav__link-btn"
              onClick={() => navigate('/about')}
            >
              About
            </button>
            <button
              className="entry-nav__link entry-nav__link-btn"
              onClick={() => navigate('/help')}
            >
              Help
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <main className="entry-main">
        {/* Decorative blobs */}
        <div className="entry-blob entry-blob--blue" aria-hidden="true" />
        <div className="entry-blob entry-blob--green" aria-hidden="true" />

        <div className="entry-hero">
          <span className="entry-hero__eyebrow label-sm">Workforce Platform</span>
          <h1 className="entry-hero__title">InStaff</h1>
          <p className="entry-hero__tagline">Share Talent. Build Together.</p>
          <p className="entry-hero__desc">
            Connecting skilled professionals with employers — efficiently, transparently, and at scale.
          </p>
        </div>

        {/* ── ROLE CARDS ── */}
        <section className="entry-cards" aria-label="Choose your role">
          {/* CARD 1: Job Seeker */}
          <div
            className="role-card role-card--seeker"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/job-seeker/home')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/job-seeker/home')}
            aria-label="Continue as Job Seeker"
          >
            <div className="role-card__icon-wrap role-card__icon-wrap--seeker">
              {/* Briefcase icon */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="8" y="18" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2.2" fill="none"/>
                <path d="M14 18V14a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="8" y1="25" x2="32" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="20" cy="25" r="2.5" fill="currentColor"/>
              </svg>
            </div>

            <h2 className="role-card__title">Find Work</h2>
            <p className="role-card__desc">
              Explore curated job opportunities, showcase your skills, and apply with ease.
            </p>

            <ul className="role-card__features" aria-label="Features for job seekers">
              <li>
                <span className="feature-dot feature-dot--seeker" />
                Browse thousands of openings
              </li>
              <li>
                <span className="feature-dot feature-dot--seeker" />
                One-tap applications
              </li>
              <li>
                <span className="feature-dot feature-dot--seeker" />
                Track your progress in real time
              </li>
            </ul>

            <button
              className="role-card__btn role-card__btn--seeker"
              tabIndex={-1}     /* parent div handles focus */
              aria-hidden="true"
            >
              Continue as Job Seeker
              <span className="role-card__btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>

          {/* Divider */}
          <div className="entry-cards__divider" aria-hidden="true">
            <span>or</span>
          </div>

          {/* CARD 2: Employer */}
          <div
            className="role-card role-card--employer"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/employer/home')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/employer/home')}
            aria-label="Continue as Employer"
          >
            <div className="role-card__icon-wrap role-card__icon-wrap--employer">
              {/* Building icon */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="7" y="12" width="26" height="22" rx="2" stroke="currentColor" strokeWidth="2.2" fill="none"/>
                <rect x="14" y="22" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                <rect x="22" y="22" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                <rect x="14" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="22" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.4"/>
                <path d="M13 12V9a7 7 0 0 1 14 0v3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="7" y1="34" x2="33" y2="34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>

            <h2 className="role-card__title">Hire Talent</h2>
            <p className="role-card__desc">
              Post jobs, review vetted candidates, and build the team that drives your business forward.
            </p>

            <ul className="role-card__features" aria-label="Features for employers">
              <li>
                <span className="feature-dot feature-dot--employer" />
                Post jobs in minutes
              </li>
              <li>
                <span className="feature-dot feature-dot--employer" />
                Access pre-screened talent
              </li>
              <li>
                <span className="feature-dot feature-dot--employer" />
                Manage hiring from a dashboard
              </li>
            </ul>

            <button
              className="role-card__btn role-card__btn--employer"
              tabIndex={-1}
              aria-hidden="true"
            >
              Continue as Employer
              <span className="role-card__btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        {/* ── FOOTER NOTE ── */}
        <p className="entry-footer-note">
          No account required to get started. &nbsp;·&nbsp; Always free to browse.
        </p>
      </main>
    </div>
  );
}
