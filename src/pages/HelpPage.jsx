import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Briefcase, Search, Send, CreditCard } from 'lucide-react';
import './InfoPage.css';

const FAQ = [
  {
    q: 'How do I start as a Job Seeker?',
    a: 'From the main entry page, click "I\'m a Job Seeker". You\'ll land on your personalised home page. From there, click "Browse Jobs" or use the top "Find Jobs" link to search thousands of verified listings.',
  },
  {
    q: 'How do I apply for a job?',
    a: 'Browse job listings on the Find Jobs page and click "View Details" on any role. On the job detail page, click the "Apply Now" button. Fill in your name, email, phone number, and upload your CV. Submit — done.',
  },
  {
    q: 'How does the job search filter work?',
    a: 'On the Find Jobs page, use the left sidebar to filter by job type (full-time, part-time, contract), experience level (junior to lead), and salary range. You can also search by keyword and location at the top.',
  },
  {
    q: 'How do I post a job as an Employer?',
    a: 'From the entry page, click "I\'m an Employer". Navigate to the "Post Job" page from the navbar. Fill in the job title, company name, location, job type, salary, required skills, and description. Click "Publish Job Listing".',
  },
  {
    q: 'How do I find and hire talent?',
    a: 'Use the Employer portal\'s "Find Talent" page to browse pre-vetted candidates. Filter by experience level, availability, and hourly rate. Click "View Details" to see a full profile, then "Hire Now" to send a request.',
  },
  {
    q: 'How do I message candidates or employers?',
    a: 'Use the "Messages" tab in the navbar of your portal (Job Seeker or Employer). You\'ll see a list of conversations on the left. Click any conversation to open the chat. Type and press Enter or click the send button.',
  },
  {
    q: 'How do I log out?',
    a: 'Click the "Logout" button in the top-right corner of any page. This will take you back to the main entry page where you can select your role again.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`help-faq__item ${open ? 'help-faq__item--open' : ''}`}>
      <button className="help-faq__q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="help-faq__a">{a}</div>}
    </div>
  );
}

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="info-root">
      {/* Header */}
      <header className="info-header">
        <button className="info-logo" onClick={() => navigate('/')}>InStaff</button>
        <nav className="info-header-nav">
          <button className="info-header-link" onClick={() => navigate('/about')}>About</button>
          <button className="info-header-btn" onClick={() => navigate('/')}>Get Started</button>
        </nav>
      </header>

      <main className="info-main">
        {/* Hero */}
        <section className="info-hero">
          <span className="info-hero__tag">HELP CENTER</span>
          <h1 className="info-hero__title">How Can We Help You?</h1>
          <p className="info-hero__sub">
            Find guidance on using the Job Seeker and Employer portals,
            navigating the application, and making the most of InStaff.
          </p>
        </section>

        {/* Quick guides */}
        <section className="info-section">
          <h2 className="info-section__title">Quick Start Guides</h2>
          <div className="info-cards">
            {/* Job Seeker guide */}
            <div className="info-card">
              <div className="info-card__icon info-card__icon--blue">
                <Search size={22} />
              </div>
              <h3 className="info-card__title">Job Seeker Flow</h3>
              <ol className="help-steps">
                <li><strong>Select Role:</strong> On the entry page, click "I'm a Job Seeker".</li>
                <li><strong>Browse Jobs:</strong> Use the "Find Jobs" navbar link or the home page button to see all listings.</li>
                <li><strong>Filter:</strong> Use the left sidebar to filter by job type, experience, and salary.</li>
                <li><strong>View Details:</strong> Click "View Details" on any job card to see the full description.</li>
                <li><strong>Apply:</strong> Click "Apply Now" and fill in your name, email, phone, and CV.</li>
                <li><strong>Messages:</strong> Check the "Messages" tab for employer responses.</li>
                <li><strong>Logout:</strong> Use the "Logout" button in the top-right at any time.</li>
              </ol>
            </div>

            {/* Employer guide */}
            <div className="info-card">
              <div className="info-card__icon info-card__icon--green">
                <Briefcase size={22} />
              </div>
              <h3 className="info-card__title">Employer Flow</h3>
              <ol className="help-steps">
                <li><strong>Select Role:</strong> On the entry page, click "I'm an Employer".</li>
                <li><strong>Post a Job:</strong> Use the "Post Job" navbar link. Fill in the form and publish.</li>
                <li><strong>Find Talent:</strong> Use "Find Talent" to browse pre-vetted candidates with filters.</li>
                <li><strong>View Profile:</strong> Click "View Details" on any candidate card for their full profile.</li>
                <li><strong>Hire:</strong> Click "Hire Now" on the talent detail page to send a hiring request.</li>
                <li><strong>Messages:</strong> Communicate with candidates through the "Messages" tab.</li>
                <li><strong>Payment:</strong> Manage your subscription plan in the "Payment" tab.</li>
                <li><strong>Logout:</strong> Use the "Logout" button in the top-right at any time.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Navigation guide */}
        <section className="info-section">
          <h2 className="info-section__title">Navigation Guide</h2>
          <div className="help-nav-guide">
            {[
              { icon:<Search size={18}/>, title:'Navbar', body:'Every portal page shows a consistent navbar at the top. Active pages are highlighted with a blue underline indicator.' },
              { icon:<Send size={18}/>,   title:'Messages', body:'Both portals have a Messages tab in the navbar for direct communication between job seekers and employers.' },
              { icon:<CreditCard size={18}/>, title:'Payment (Employers)', body:'Employers can manage subscription plans from the Payment tab. Choose from Starter, Pro, or Enterprise plans.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="help-nav-item">
                <div className="help-nav-item__icon">{icon}</div>
                <div>
                  <div className="help-nav-item__title">{title}</div>
                  <div className="help-nav-item__body">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="info-section">
          <h2 className="info-section__title">Frequently Asked Questions</h2>
          <div className="help-faq">
            {FAQ.map((item) => <FAQItem key={item.q} {...item} />)}
          </div>
        </section>

        {/* CTA */}
        <section className="info-cta-section">
          <h2 className="info-cta-section__title">Ready to get started?</h2>
          <div className="info-cta-row">
            <button className="info-cta-btn" onClick={() => navigate('/')}>
              Go to Main Page <ArrowRight size={16} />
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
