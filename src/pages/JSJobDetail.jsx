import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Briefcase, CheckCircle, ArrowLeft, Building2 } from 'lucide-react';
import { JOBS } from './FindJobs';
import JobSeekerNavbar from '../components/JobSeekerNavbar';
import EmployerFooter  from '../components/EmployerFooter';
import './JSJobDetail.css';

/* ── Extended descriptions per job (keyed by id) ── */
const DESCRIPTIONS = {
  1:`We're looking for a passionate Senior React Developer to join our platform team. You'll architect and deliver high-performance, accessible web experiences used by millions of users globally.

Responsibilities:
• Lead frontend architecture decisions for new product features
• Collaborate with design and backend teams to ship pixel-perfect UIs
• Mentor junior engineers and conduct code reviews
• Champion accessibility and performance best practices`,

  2:`We are hiring a Product Manager to drive the roadmap for our core collaboration product. You'll work closely with engineering, design, and executive leadership to define what gets built and why.

Responsibilities:
• Define and prioritise product roadmap based on user research and data
• Write clear, detailed product specifications and user stories
• Own product metrics and communicate progress to stakeholders
• Identify and evaluate partnership and growth opportunities`,

  3:`Join our design team as a UI/UX Designer and help shape the experience for millions of merchants. You'll own end-to-end design for major product areas.

Responsibilities:
• Conduct user research and usability testing
• Create wireframes, prototypes, and high-fidelity mockups in Figma
• Collaborate with engineers to ensure design fidelity
• Contribute to and evolve our design system`,

  default:`We are seeking a talented professional to join our growing team. You will work on meaningful projects, collaborate with world-class colleagues, and have significant autonomy to make an impact.

Responsibilities:
• Work closely with cross-functional teams to deliver high-quality results
• Bring innovative solutions to complex, interesting problems
• Contribute to a culture of continuous improvement and learning
• Help shape the direction and culture of the team`,
};

const accentColor = (i) => {
  const p = ['#003f8b','#356a35','#583d00','#7c3aed','#0891b2','#c2410c'];
  return p[i % p.length];
};

export default function JSJobDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const job      = JOBS.find((j) => j.id === Number(id));
  const idx      = JOBS.findIndex((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="jd-root">
        <JobSeekerNavbar />
        <div className="jd-notfound">
          <h2>Job not found</h2>
          <button className="jd-back-btn" onClick={() => navigate('/job-seeker/find-jobs')}>← Back to Jobs</button>
        </div>
        <EmployerFooter />
      </div>
    );
  }

  const accent = accentColor(idx);
  const desc   = DESCRIPTIONS[job.id] || DESCRIPTIONS.default;

  return (
    <div className="jd-root">
      <JobSeekerNavbar />

      <main className="jd-main">
        {/* ── Breadcrumb navigation — HCI: Navigation clarity & recognition ── */}
        <nav className="jd-breadcrumb" aria-label="Breadcrumb">
          <ol className="jd-breadcrumb__list">
            <li className="jd-breadcrumb__item">
              <button className="jd-breadcrumb__link" onClick={() => navigate('/job-seeker/home')}>Home</button>
            </li>
            <li className="jd-breadcrumb__sep" aria-hidden="true">›</li>
            <li className="jd-breadcrumb__item">
              <button className="jd-breadcrumb__link" onClick={() => navigate('/job-seeker/find-jobs')}>Find Jobs</button>
            </li>
            <li className="jd-breadcrumb__sep" aria-hidden="true">›</li>
            <li className="jd-breadcrumb__item jd-breadcrumb__item--current" aria-current="page">
              Job Details
            </li>
          </ol>
        </nav>

        <div className="jd-layout">
          {/* ── LEFT: Job info ── */}
          <div className="jd-details">
            {/* Header card */}
            <div className="jd-card jd-header-card">
              <div className="jd-header-top">
                <div className="jd-logo" style={{ background: accent }}>
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
                <div className="jd-header-info">
                  <h1 className="jd-title">{job.title}</h1>
                  <p className="jd-company">{job.company}</p>
                </div>
                <span className="jd-posted-badge">{job.posted}</span>
              </div>

              <div className="jd-meta-row">
                <span className="jd-meta-chip"><MapPin size={13}/> {job.location}</span>
                <span className="jd-meta-chip"><Clock size={13}/> {job.type}</span>
                <span className="jd-meta-chip"><Briefcase size={13}/> {job.exp}</span>
                <span className="jd-meta-chip jd-meta-chip--salary"><Star size={13}/> {job.salary}</span>
              </div>

              <div className="jd-skills">
                {job.skills.map((s) => <span key={s} className="jd-skill">{s}</span>)}
              </div>
            </div>

            {/* Description */}
            <div className="jd-card">
              <h2 className="jd-section-title">Job Description</h2>
              <p className="jd-desc">{desc}</p>
            </div>

            {/* Requirements */}
            <div className="jd-card">
              <h2 className="jd-section-title">Requirements</h2>
              <ul className="jd-req-list">
                {[
                  `3+ years of professional experience as a ${job.title}`,
                  `Strong proficiency in ${job.skills.slice(0,2).join(' and ')}`,
                  'Excellent written and verbal communication skills',
                  'Ability to work in a fast-paced, agile environment',
                  'Portfolio or examples of previous work',
                  'Bonus: Open-source contributions or published projects',
                ].map((r, i) => (
                  <li key={i} className="jd-req-item">
                    <CheckCircle size={15} className="jd-req-icon" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA bar */}
            <div className="jd-cta-bar" style={{ background: `linear-gradient(135deg, ${accent}ee 0%, ${accent} 100%)` }}>
              <div>
                <div className="jd-cta-title">{job.title}</div>
                <div className="jd-cta-sub">at {job.company} · {job.salary}</div>
              </div>
              <button
                className="jd-apply-btn jd-apply-btn--bar"
                onClick={() => navigate(`/job-seeker/apply/${job.id}`)}
              >
                👉 Apply Now
              </button>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="jd-sidebar">
            <div className="jd-sidebar-card">
              <h2 className="jd-section-title">Overview</h2>
              {[
                ['Company',    job.company],
                ['Location',   job.location],
                ['Job Type',   job.type],
                ['Experience', job.exp],
                ['Salary',     job.salary],
                ['Posted',     job.posted],
              ].map(([label, val]) => (
                <div key={label} className="jd-overview-row">
                  <span className="jd-overview-label">{label}</span>
                  <span className="jd-overview-val">{val}</span>
                </div>
              ))}
            </div>

            <button
              className="jd-apply-btn"
              id="apply-now-btn"
              onClick={() => navigate(`/job-seeker/apply/${job.id}`)}
            >
              👉 Apply Now
            </button>

            <div className="jd-sidebar-card jd-company-card">
              <Building2 size={18} className="jd-company-icon" />
              <h3 className="jd-company-name">{job.company}</h3>
              <p className="jd-company-desc">
                A forward-thinking company building products that matter. Verified employer on InStaff since 2022.
              </p>
              <div className="jd-company-badges">
                <span className="jd-badge jd-badge--verified">✓ Verified Employer</span>
                <span className="jd-badge jd-badge--fast">⚡ Fast Responder</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
