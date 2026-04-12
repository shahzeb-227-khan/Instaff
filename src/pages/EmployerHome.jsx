import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle2, Users, Zap, ShieldCheck, TrendingUp,
  CheckCircle, MapPin, Star, Briefcase, Building2,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
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

/* ─ Hero ─ */
const EmpHero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-inner container">
        {/* Left */}
        <div className="hero-left">
          <span className="hero-badge">FOR EMPLOYERS</span>
          <h1 className="hero-heading">Hire Top Talent<br />Faster.</h1>
          <p className="hero-desc">
            InStaff connects your company to a curated pool of pre-vetted professionals.
            Post a job or browse talent profiles — start building your team today.
          </p>

          <div className="hero-role-cards">
            {/* Card 1: Find Talent */}
            <Card className="hero-role-card">
              <div style={{ width:'100%', borderRadius:'0.75rem', marginBottom:'1rem', height:110, overflow:'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80"
                  alt="Business meeting with candidates"
                  className="hero-role-img"
                  style={{ height:'100%', objectFit:'cover', width:'100%' }}
                />
              </div>
              <h3 className="hero-role-title">Find Talent</h3>
              <p className="hero-role-desc">Browse pre-screened candidates instantly</p>
              <Button variant="primary" className="hero-role-btn" onClick={() => navigate('/employer/find-talent')}>
                Browse Candidates
              </Button>
            </Card>

            {/* Card 2: Post a Job — fixed professional image */}
            <Card className="hero-role-card">
              <div style={{ width:'100%', borderRadius:'0.75rem', marginBottom:'1rem', height:110, overflow:'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&q=80"
                  alt="Posting a job listing on a computer"
                  className="hero-role-img"
                  style={{ height:'100%', objectFit:'cover', width:'100%' }}
                />
              </div>
              <h3 className="hero-role-title">Post a Job</h3>
              <p className="hero-role-desc">Reach 12,000+ active professionals</p>
              <Button variant="secondary" className="hero-role-btn" onClick={() => navigate('/employer/post-job')}>
                Post Job Now
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
              Trusted by <strong>500+ premium companies</strong> this month
            </p>
          </div>
        </div>

        {/* Right — Featured Talent Profile Card */}
        <div className="hero-right">
          <div className="hero-card-wrap">
            <div className="featured-job-card">
              <div className="fjc-header">
                <div className="fjc-company-info">
                  <div className="fjc-company-logo" style={{ background:'linear-gradient(135deg,#059669,#065f46)' }}>AR</div>
                  <div>
                    <div className="fjc-company-name">Aisha Rahman</div>
                    <div className="fjc-active">● Open to opportunities</div>
                  </div>
                </div>
                <span className="fjc-badge" style={{ background:'#fef9c3', color:'#92400e' }}>97% Match</span>
              </div>

              <h3 className="fjc-title">Senior Frontend Engineer</h3>

              <div className="fjc-meta-grid">
                <div className="fjc-meta-item">
                  <span className="fjc-meta-label"><MapPin size={10} /> Location</span>
                  <span className="fjc-meta-value">Remote</span>
                </div>
                <div className="fjc-meta-item">
                  <span className="fjc-meta-label"><Briefcase size={10} /> Experience</span>
                  <span className="fjc-meta-value">6 years</span>
                </div>
                <div className="fjc-meta-item fjc-meta-full">
                  <span className="fjc-meta-label"><Star size={10} /> Hourly Rate</span>
                  <span className="fjc-meta-value">$48 / hr</span>
                </div>
              </div>

              <div className="fjc-tags">
                {['React','TypeScript','CSS Architecture'].map((t) => <span key={t} className="fjc-tag">{t}</span>)}
              </div>

              <button
                className="fjc-apply-btn"
                style={{ background:'linear-gradient(135deg,#059669,#065f46)' }}
                onClick={() => navigate('/employer/find-talent')}
              >
                View Full Profile →
              </button>

              <div className="fjc-trust-row">
                <CheckCircle size={14} className="fjc-trust-icon" />
                <span className="fjc-trust-text">Verified professional · Background checked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─ How It Works ─ */
const empHowCards = [
  { num:'1', icon:<Building2 size={28}/>, accent:'#1e3a8a',
    title:'Post a Job',
    desc:'Describe your role, required skills, and budget. Your listing goes live instantly and reaches thousands of candidates.' },
  { num:'2', icon:<Users size={28}/>, accent:'#059669', active:true,
    title:'Review Candidates',
    desc:'Browse ranked applicants surfaced by our matching algorithm. Shortlist and schedule interviews with ease.' },
  { num:'3', icon:<Zap size={28}/>, accent:'#b45309',
    title:'Hire & Collaborate',
    desc:'Extend offers, onboard seamlessly, and manage your growing team — all within InStaff.' },
];

const EmpHowItWorks = () => (
  <section className="how-section">
    <div className="container">
      <div className="how-header">
        <h2 className="how-title">How InStaff Works for Employers</h2>
        <p className="how-sub">
          A streamlined hiring pipeline designed to reduce time-to-hire and connect you
          with the right professionals — every time.
        </p>
      </div>
      <div className="how-cards">
        {empHowCards.map((c) => (
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

/* ─ Why Choose ─ */
const EmpWhyChoose = () => (
  <section className="why-section">
    <div className="container why-inner">
      <div className="why-left">
        <h2 className="why-title">Why Employers Choose InStaff</h2>
        <div className="why-features">
          {[
            { Icon:ShieldCheck, cls:'feat-blue', title:'Vetted Professionals',
              desc:'Every candidate has been assessed for skills, work history, and professionalism. You interview only the best.' },
            { Icon:Zap, cls:'feat-green', title:'Fast Talent Matching',
              desc:'Our algorithm surfaces the most compatible candidates within hours of your post going live.' },
            { Icon:TrendingUp, cls:'feat-amber', title:'Cost Efficiency',
              desc:"Cut recruitment agency fees by up to 60%. InStaff's direct placement model eliminates unnecessary intermediaries." },
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
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" alt="Business hiring team" className="why-photo" />
          </div>
          <div className="why-right-col">
            <div className="why-stat-card why-stat-blue">
              <div className="why-stat-value">12 Days</div>
              <div className="why-stat-label">Avg. Time to Hire</div>
            </div>
            <div className="why-stat-card why-stat-green">
              <div className="why-stat-value">60%</div>
              <div className="why-stat-label">Lower Recruiting Cost</div>
            </div>
            <div className="why-img-small">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80" alt="Team meeting" className="why-photo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─ CTA ─ */
const EmpCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <h2 className="cta-title">Build your team today.</h2>
        <p className="cta-sub">
          Join 500+ companies already using InStaff to hire faster and smarter.
          Your next great hire is waiting.
        </p>
        <div className="cta-btns">
          <button className="cta-btn-outline" onClick={() => navigate('/employer/post-job')}>Post a Job</button>
          <button className="cta-btn-ghost"   onClick={() => navigate('/employer/find-talent')}>Browse Talent</button>
        </div>
      </div>
    </section>
  );
};

const EmployerHome = () => (
  <div className="home-page">
    <EmployerNavbar />
    <main>
      <EmpHero />
      <TrustedSection
        label="TRUSTED BY FORWARD-THINKING TEAMS"
        names={['AURORA','QUANTUM','ZENITH','VORTEX','NEXUS']}
      />
      <EmpHowItWorks />
      <EmpWhyChoose />
      <EmpCTA />
    </main>
    <EmployerFooter />
  </div>
);

export default EmployerHome;
