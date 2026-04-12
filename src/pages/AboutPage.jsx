import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Users, ShieldCheck, Zap } from 'lucide-react';
import './InfoPage.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="info-root">
      {/* Minimal header */}
      <header className="info-header">
        <button className="info-logo" onClick={() => navigate('/')}>InStaff</button>
        <nav className="info-header-nav">
          <button className="info-header-link" onClick={() => navigate('/help')}>Help</button>
          <button className="info-header-btn" onClick={() => navigate('/')}>Get Started</button>
        </nav>
      </header>

      <main className="info-main">
        {/* Hero */}
        <section className="info-hero">
          <span className="info-hero__tag">ABOUT INSTAFF</span>
          <h1 className="info-hero__title">The Curated Exchange for Work</h1>
          <p className="info-hero__sub">
            InStaff is a professional hiring platform that connects high-quality job seekers
            with forward-thinking employers — cutting out the noise and delivering only the
            most relevant matches on both sides.
          </p>
          <button className="info-cta-btn" onClick={() => navigate('/')}>
            Get Started <ArrowRight size={16} />
          </button>
        </section>

        {/* What is InStaff */}
        <section className="info-section">
          <h2 className="info-section__title">What is InStaff?</h2>
          <p className="info-section__body">
            InStaff is a dual-sided hiring marketplace. Employers can post jobs and discover
            pre-vetted talent. Job seekers can browse real opportunities and apply with a
            single click. Every interaction on InStaff is designed to be fast, focused,
            and frictionless.
          </p>
          <p className="info-section__body">
            Founded on the belief that hiring should be a human and intelligent process,
            InStaff uses smart matching algorithms and manual curation to ensure employers
            see only the profiles that matter — and job seekers only see genuine, high-quality
            roles posted by verified companies.
          </p>
        </section>

        {/* Who it's for */}
        <section className="info-section">
          <h2 className="info-section__title">Who is InStaff For?</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card__icon info-card__icon--blue">
                <Users size={24} />
              </div>
              <h3 className="info-card__title">Job Seekers</h3>
              <p className="info-card__body">
                Ambitious professionals — from entry-level to senior leadership — who want
                access to verified job listings, direct employer contact, and a fast,
                streamlined application experience.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card__icon info-card__icon--green">
                <Target size={24} />
              </div>
              <h3 className="info-card__title">Employers</h3>
              <p className="info-card__body">
                Startups, scale-ups, and enterprises that want to reduce time-to-hire,
                lower recruitment costs, and access a curated pool of pre-screened candidates
                without relying on expensive staffing agencies.
              </p>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="info-section">
          <h2 className="info-section__title">Our Core Values</h2>
          <div className="info-values">
            {[
              { Icon:ShieldCheck, label:'Trust', body:'Every employer is manually verified. Every candidate is background-checked before being featured.' },
              { Icon:Zap,         label:'Speed', body:'Smart algorithms surface the best matches within hours, not weeks.' },
              { Icon:Target,      label:'Precision', body:'We eliminate irrelevant noise so both sides only see what matters most to them.' },
            ].map(({ Icon, label, body }) => (
              <div key={label} className="info-value">
                <Icon size={20} className="info-value__icon" />
                <div>
                  <div className="info-value__label">{label}</div>
                  <div className="info-value__body">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="info-cta-section">
          <h2 className="info-cta-section__title">Ready to get started?</h2>
          <div className="info-cta-row">
            <button className="info-cta-btn" onClick={() => navigate('/')}>
              I'm a Job Seeker <ArrowRight size={16} />
            </button>
            <button className="info-cta-btn info-cta-btn--outline" onClick={() => navigate('/')}>
              I'm an Employer <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <footer className="info-footer">
        <span className="info-footer__logo">InStaff</span>
        <span className="info-footer__copy">© 2024 InStaff · The Curated Exchange</span>
      </footer>
    </div>
  );
}
