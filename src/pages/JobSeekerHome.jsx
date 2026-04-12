import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircle2, Search, Zap, ShieldCheck, TrendingUp, CheckCircle,
  MapPin, Star, Clock, Briefcase,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import JobSeekerNavbar from '../components/JobSeekerNavbar';
import EmployerFooter  from '../components/EmployerFooter';
import './Home.css';

/* ─ Trusted strip ─ */
const TrustedSection = ({ label, names }) => (
  <section className="trusted-section">
    <div className="container trusted-inner">
      <p className="trusted-label">{label}</p>
      <div className="trusted-logos">
        {names.map((name) => <span key={name} className="trusted-logo-name">{name}</span>)}
      </div>
    </div>
  </section>
);

/* ─ Hero — SINGLE CTA: Find Jobs ─ */
const JSHero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-inner container">
        {/* Left */}
        <div className="hero-left">
          <span className="hero-badge">FOR JOB SEEKERS</span>
          <h1 className="hero-heading">Find Your Next<br />Opportunity.</h1>
          <p className="hero-desc">
            InStaff connects ambitious professionals to verified, high-quality roles
            at top companies. Your next career move starts here.
          </p>

          {/* Single action card — Find Jobs */}
          <div className="hero-role-cards" style={{ justifyContent: 'flex-start' }}>
            <Card className="hero-role-card" style={{ maxWidth: 300 }}>
              <div style={{ width:'100%', borderRadius:'0.75rem', marginBottom:'1rem', height:110, overflow:'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80"
                  alt="Job searching on laptop"
                  className="hero-role-img"
                  style={{ height:'100%', objectFit:'cover', width:'100%' }}
                />
              </div>
              <h3 className="hero-role-title">Find Jobs</h3>
              <p className="hero-role-desc">Browse 5,000+ verified job listings</p>
              <Button
                variant="primary"
                className="hero-role-btn"
                onClick={() => navigate('/job-seeker/find-jobs')}
              >
                Browse Jobs
              </Button>
            </Card>
          </div>

          <div className="hero-social-proof">
            <div className="hero-avatars">
              {['#1e3a8a','#7c3aed','#059669','#b45309','#0891b2'].map((c, i) => (
                <span key={i} className="hero-avatar" style={{ background: c, zIndex: 5 - i }}>
                  <UserCircle2 size={20} color="white" />
                </span>
              ))}
            </div>
            <p className="hero-proof-text">
              <strong>12,000+ professionals</strong> hired through InStaff this year
            </p>
          </div>
        </div>

        {/* Right — Featured Job card */}
        <div className="hero-right">
          <div className="hero-card-wrap">
            <div className="featured-job-card">
              <div className="fjc-header">
                <div className="fjc-company-info">
                  <div className="fjc-company-logo">TC</div>
                  <div>
                    <div className="fjc-company-name">TechCorp Global</div>
                    <div className="fjc-active">● Actively hiring</div>
                  </div>
                </div>
                <span className="fjc-badge" style={{ background:'#dcfce7', color:'#15803d' }}>New</span>
              </div>

              <h3 className="fjc-title">Senior React Developer</h3>

              <div className="fjc-meta-grid">
                <div className="fjc-meta-item">
                  <span className="fjc-meta-label"><MapPin size={10} /> Location</span>
                  <span className="fjc-meta-value">Remote / NYC</span>
                </div>
                <div className="fjc-meta-item">
                  <span className="fjc-meta-label"><Clock size={10} /> Type</span>
                  <span className="fjc-meta-value">Full-time</span>
                </div>
                <div className="fjc-meta-item fjc-meta-full">
                  <span className="fjc-meta-label"><Star size={10} /> Salary</span>
                  <span className="fjc-meta-value">$110k – $140k / year</span>
                </div>
              </div>

              <div className="fjc-tags">
                {['React','Node.js','TypeScript'].map((t) => <span key={t} className="fjc-tag">{t}</span>)}
              </div>

              <button
                className="fjc-apply-btn"
                onClick={() => navigate('/job-seeker/find-jobs')}
              >
                View & Apply →
              </button>

              <div className="fjc-trust-row">
                <CheckCircle size={14} className="fjc-trust-icon" />
                <span className="fjc-trust-text">Verified employer · Background-checked company</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─ How it works ─ */
const JS_HOW = [
  { num:'1', icon:<UserCircle2 size={28}/>, accent:'#1e3a8a',
    title:'Create Your Profile',
    desc:'Build a compelling profile and upload your CV. Let your skills and experience speak for themselves to attract the right employers.' },
  { num:'2', icon:<Search size={28}/>, accent:'#059669', active:true,
    title:'Discover & Apply',
    desc:'Browse thousands of verified job listings filtered to your skills. Apply in one click — no repetitive forms, no friction.' },
  { num:'3', icon:<Zap size={28}/>, accent:'#b45309',
    title:'Get Hired',
    desc:'Receive direct offers, schedule interviews, and manage your entire job search from a single intuitive dashboard.' },
];

const JSHowItWorks = () => (
  <section className="how-section">
    <div className="container">
      <div className="how-header">
        <h2 className="how-title">How InStaff Works for You</h2>
        <p className="how-sub">
          A streamlined job-search experience designed to put you in front of the right
          companies — faster than any other platform.
        </p>
      </div>
      <div className="how-cards">
        {JS_HOW.map((c) => (
          <div key={c.num} className={`how-card ${c.active ? 'how-card-active' : ''}`}>
            <div className="how-card-icon" style={{ color: c.accent }}>{c.icon}</div>
            <div className="how-card-num">{c.num}.</div>
            <h3 className="how-card-title">{c.title}</h3>
            <p className="how-card-desc">{c.desc}</p>
            <div className="how-card-bar" style={{ background: c.active ? c.accent : 'transparent' }} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─ Why choose ─ */
const JSWhyChoose = () => (
  <section className="why-section">
    <div className="container why-inner">
      <div className="why-left">
        <h2 className="why-title">Why Professionals Choose InStaff</h2>
        <div className="why-features">
          {[
            { Icon:ShieldCheck, cls:'feat-blue', title:'Verified Employers Only',
              desc:'Every company on InStaff is manually vetted. You only see legitimate, high-quality opportunities — zero spam or ghost jobs.' },
            { Icon:Zap, cls:'feat-green', title:'Fast-Track Hiring',
              desc:'Our smart matching surfaces your profile to employers seeking exactly your skills. Expect responses within 48 hours.' },
            { Icon:TrendingUp, cls:'feat-amber', title:'Career Growth Focus',
              desc:'Access salary insights, skill gap analysis, and personalised job recommendations to accelerate your career.' },
          ].map(({ Icon, cls, title, desc }) => (
            <div key={title} className="why-feature">
              <Icon size={20} className={`why-feat-icon ${cls}`} />
              <div>
                <h4 className="why-feat-title">{title}</h4>
                <p className="why-feat-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="why-right">
        <div className="why-grid">
          <div className="why-img-tall">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80" alt="Professional at work" className="why-photo" />
          </div>
          <div className="why-right-col">
            <div className="why-stat-card why-stat-blue">
              <div className="why-stat-value">48 hrs</div>
              <div className="why-stat-label">Avg. First Response</div>
            </div>
            <div className="why-stat-card why-stat-green">
              <div className="why-stat-value">5,000+</div>
              <div className="why-stat-label">Active Job Listings</div>
            </div>
            <div className="why-img-small">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80" alt="Team success" className="why-photo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─ CTA — Find Jobs only ─ */
const JSCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <h2 className="cta-title">Your next opportunity is waiting.</h2>
        <p className="cta-sub">
          Join 12,000+ professionals who found their dream role through InStaff this year.
          Start your search — it's completely free.
        </p>
        <div className="cta-btns">
          <button className="cta-btn-outline" onClick={() => navigate('/job-seeker/find-jobs')}>
            Browse Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

const JobSeekerHome = () => (
  <div className="home-page">
    <JobSeekerNavbar />
    <main>
      <JSHero />
      <TrustedSection
        label="JOBS FROM WORLD-CLASS COMPANIES"
        names={['GOOGLE','STRIPE','SHOPIFY','NOTION','VERCEL']}
      />
      <JSHowItWorks />
      <JSWhyChoose />
      <JSCTA />
    </main>
    <EmployerFooter />
  </div>
);

export default JobSeekerHome;
