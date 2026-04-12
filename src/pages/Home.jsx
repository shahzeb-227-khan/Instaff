import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Plus,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle,
  UserCircle2,
} from 'lucide-react';
import './Home.css';

/* ─── Navbar ─── */
const HomeNavbar = () => (
  <nav className="home-nav">
    <div className="home-nav-inner">
      <div className="home-nav-left">
        <Link to="/" className="home-nav-brand">InStaff</Link>
        <div className="home-nav-links">
          <Link to="/find-work" className="home-nav-link">Find Work</Link>
          <Link to="/messages" className="home-nav-link">Messages</Link>
          <Link to="/find-work" className="home-nav-link">Browse Talent</Link>
        </div>
      </div>
      <div className="home-nav-right">
        <Link to="/find-work" className="home-btn-ghost">Login</Link>
        <Link to="/post-job" className="home-btn-primary">Post Job</Link>
      </div>
    </div>
  </nav>
);

/* ─── Hero Section ─── */


import Card from '../components/Card';
import Button from '../components/Button';
import heroImg from '../assets/hero.png';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-inner container">
        <div className="hero-left">
          <span className="hero-badge">THE CURATED EXCHANGE</span>
          <h1 className="hero-heading">
            Share Talent.<br />Build Together.
          </h1>
          <p className="hero-desc">
            InStaff is the premier collaborative workforce platform. We connect
            high-growth companies to share vetted talent during peak cycles and
            transition periods.
          </p>
          <div className="hero-role-cards">
            <Card className="hero-role-card">
              <img
                src={heroImg}
                alt="Job Seeker"
                className="hero-role-img"
                style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1rem', objectFit: 'cover', height: 120 }}
              />
              <h3 className="hero-role-title">Find Work</h3>
              <p className="hero-role-desc">Find jobs and apply easily</p>
              <Button variant="primary" className="hero-role-btn" onClick={() => navigate('/find-work')}>
                Explore Jobs
              </Button>
            </Card>
            <Card className="hero-role-card">
              <img
                src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?w=400&q=80"
                alt="Employer"
                className="hero-role-img"
                style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1rem', objectFit: 'cover', height: 120 }}
              />
              <h3 className="hero-role-title">Hire Talent</h3>
              <p className="hero-role-desc">Post jobs and hire top talent</p>
              <Button variant="primary" className="hero-role-btn" onClick={() => navigate('/post-job')}>
                Post Job
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
              Joined by{' '}
              <strong>500+ premium companies</strong> this month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Trusted Companies ─── */
const TrustedCompanies = () => (
  <section className="trusted-section">
    <div className="container trusted-inner">
      <p className="trusted-label">TRUSTED BY FORWARD-THINKING TEAMS</p>
      <div className="trusted-logos">
        {['AURORA', 'QUANTUM', 'ZENITH', 'VORTEX', 'NEXUS'].map((name) => (
          <span key={name} className="trusted-logo-name">{name}</span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── How It Works ─── */
const howCards = [
  {
    num: '1',
    icon: <UserCircle2 size={28} />,
    title: 'Curate Your Profile',
    desc: 'Create a high-impact professional identity. We focus on hard skills and verifiable project histories.',
    accent: '#1e3a8a',
  },
  {
    num: '2',
    icon: <Users size={28} />,
    title: 'Match & Collaborative',
    desc: 'Our algorithm connects available talent from one company directly to open needs at another.',
    accent: '#059669',
    active: true,
  },
  {
    num: '3',
    icon: <Zap size={28} />,
    title: 'Accelerate Growth',
    desc: 'Deploy talent instantly. No long interview cycles. Direct placement between trusted partners.',
    accent: '#b45309',
  },
];

const HowItWorks = () => (
  <section className="how-section">
    <div className="container">
      <div className="how-header">
        <h2 className="how-title">How InStaff Works</h2>
        <p className="how-sub">
          A seamless ecosystem designed for both employers seeking high-end talent
          and professionals looking for their next impactful project.
        </p>
      </div>
      <div className="how-cards">
        {howCards.map((c) => (
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

/* ─── Why Choose InStaff ─── */
const WhyChoose = () => (
  <section className="why-section">
    <div className="container why-inner">
      {/* Left */}
      <div className="why-left">
        <h2 className="why-title">Why Choose InStaff</h2>
        <div className="why-features">
          <div className="why-feature">
            <ShieldCheck size={20} className="why-feat-icon feat-blue" />
            <div>
              <h4 className="why-feat-title">Vetted Ecosystem</h4>
              <p className="why-feat-desc">
                Every professional and company on InStaff undergoes a strict quality
                audit. We ensure only the best participate in our exchange.
              </p>
            </div>
          </div>
          <div className="why-feature">
            <Zap size={20} className="why-feat-icon feat-green" />
            <div>
              <h4 className="why-feat-title">Rapid Deployment</h4>
              <p className="why-feat-desc">
                Cut hiring time from months to days. Since talent is coming from
                trusted partners, the trust gap is already bridged.
              </p>
            </div>
          </div>
          <div className="why-feature">
            <TrendingUp size={20} className="why-feat-icon feat-amber" />
            <div>
              <h4 className="why-feat-title">Resource Optimization</h4>
              <p className="why-feat-desc">
                Turn bench time into revenue for your company while providing your
                employees with exciting new challenges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Image Grid */}
      <div className="why-right">
        <div className="why-grid">
          {/* Tall left image */}
          <div className="why-img-tall">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
              alt="Team collaboration"
              className="why-photo"
            />
          </div>

          {/* Right column — stat + image */}
          <div className="why-right-col">
            <div className="why-stat-card why-stat-blue">
              <div className="why-stat-value">12 Days</div>
              <div className="why-stat-label">Avg. Time to Hire</div>
            </div>
            <div className="why-stat-card why-stat-green">
              <div className="why-stat-value">98%</div>
              <div className="why-stat-label">Match Success Rate</div>
            </div>
            <div className="why-img-small">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                alt="Modern office"
                className="why-photo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── CTA Section ─── */
const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <h2 className="cta-title">Ready to transform your workforce?</h2>
        <p className="cta-sub">
          Join the curated exchange and start building more efficient, collaborative
          teams today.
        </p>
        <div className="cta-btns">
          <button className="cta-btn-outline" onClick={() => navigate('/post-job')}>
            Get Started as Employer
          </button>
          <button className="cta-btn-ghost" onClick={() => navigate('/find-work')}>
            Browse Available Work
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─── */
const HomeFooter = () => (
  <footer className="home-footer">
    <div className="container home-footer-inner">
      <div className="footer-left">
        <span className="footer-brand">InStaff</span>
        <span className="footer-tagline">© 2024 InStaff. The Curated Exchange.</span>
      </div>
      <nav className="footer-links">
        <a href="#" className="footer-link">Support</a>
        <a href="#" className="footer-link">Privacy Policy</a>
        <a href="#" className="footer-link">Terms of Service</a>
        <a href="#" className="footer-link">Help Center</a>
        <a href="#" className="footer-link">Contact Us</a>
      </nav>
    </div>
  </footer>
);

/* ─── Page Assembly ─── */
const Home = () => (
  <div className="home-page">
    <HomeNavbar />
    <main>
      <HeroSection />
      <TrustedCompanies />
      <HowItWorks />
      <WhyChoose />
      <CTASection />
    </main>
    <HomeFooter />
  </div>
);

export default Home;
