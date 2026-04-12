import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
import './HireForm.css';

/* ── Candidate lookup (same list) ── */
const CANDIDATES = [
  { id:1,  name:'Aisha Rahman',    role:'Senior Frontend Engineer'     },
  { id:2,  name:'Carlos Méndez',   role:'Full-Stack Developer'          },
  { id:3,  name:'Lin Wei',         role:'Data Scientist'                },
  { id:4,  name:'Priya Sharma',    role:'Product Designer'              },
  { id:5,  name:"James O'Brien",   role:'DevOps / Cloud Engineer'       },
  { id:6,  name:'Fatima Al-Zahra', role:'Backend Engineer'              },
  { id:7,  name:'Samuel Torres',   role:'Mobile Developer (iOS)'        },
  { id:8,  name:'Mei Tanaka',      role:'AI / ML Engineer'              },
  { id:9,  name:'Elias Novak',     role:'Security Engineer'             },
  { id:10, name:'Zara Khan',       role:'Engineering Manager'           },
  { id:11, name:'David Park',      role:'QA / Automation Engineer'      },
  { id:12, name:'Nina Okafor',     role:'UI Developer'                  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = {
  yourName:    '',
  companyName: '',
  email:       '',
  projectDesc: '',
  budget:      '',
  duration:    '',
};

export default function HireForm() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const candidate = CANDIDATES.find((c) => c.id === Number(id));

  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.yourName.trim())    e.yourName    = 'Your name is required.';
    if (!form.companyName.trim()) e.companyName = 'Company name is required.';
    if (!form.email.trim())       e.email       = 'Email address is required.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.projectDesc.trim()) e.projectDesc = 'Project description is required.';
    if (!form.budget.trim())      e.budget      = 'Budget is required.';
    return e;
  };

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      /* Scroll to first error */
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(`hf-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="hf-root">
        <EmployerNavbar />
        <main className="hf-main">
          <div className="hf-success-screen">
            <div className="hf-success-icon-wrap">
              <CheckCircle size={56} className="hf-success-icon" />
            </div>
            <h1 className="hf-success-title">Candidate Hired Successfully ✅</h1>
            <p className="hf-success-sub">
              You've sent a hiring request to <strong>{candidate?.name}</strong>.
              They will be notified and will reach out shortly.
            </p>
            <div className="hf-success-card">
              <div className="hf-success-row">
                <span className="hf-success-label">Candidate</span>
                <span className="hf-success-val">{candidate?.name}</span>
              </div>
              <div className="hf-success-row">
                <span className="hf-success-label">Role</span>
                <span className="hf-success-val">{candidate?.role}</span>
              </div>
              <div className="hf-success-row">
                <span className="hf-success-label">Company</span>
                <span className="hf-success-val">{form.companyName}</span>
              </div>
              <div className="hf-success-row">
                <span className="hf-success-label">Budget</span>
                <span className="hf-success-val">{form.budget}</span>
              </div>
            </div>
            {/* HCI: Error Recovery — soft reversal option */}
            <div className="hf-success-actions">
              <button
                className="hf-success-edit-btn"
                onClick={() => setSuccess(false)}
                aria-label="Edit your hiring request"
              >
                ✏️ Edit Submission
              </button>
              <button
                className="hf-back-btn"
                onClick={() => navigate('/employer/find-talent')}
              >
                Back to Talent List
              </button>
            </div>
          </div>
        </main>
        <EmployerFooter />
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="hf-root">
      <EmployerNavbar />

      <main className="hf-main">
        {/* ── Breadcrumb navigation — HCI: Navigation clarity ── */}
        <nav className="hf-breadcrumb" aria-label="Breadcrumb">
          <ol className="hf-breadcrumb__list">
            <li className="hf-breadcrumb__item">
              <button className="hf-breadcrumb__link" onClick={() => navigate('/employer/home')}>Home</button>
            </li>
            <li className="hf-breadcrumb__sep" aria-hidden="true">›</li>
            <li className="hf-breadcrumb__item">
              <button className="hf-breadcrumb__link" onClick={() => navigate('/employer/find-talent')}>Find Talent</button>
            </li>
            <li className="hf-breadcrumb__sep" aria-hidden="true">›</li>
            <li className="hf-breadcrumb__item">
              <button className="hf-breadcrumb__link" onClick={() => navigate(`/employer/talent-detail/${id}`)}>Candidate Profile</button>
            </li>
            <li className="hf-breadcrumb__sep" aria-hidden="true">›</li>
            <li className="hf-breadcrumb__item hf-breadcrumb__item--current" aria-current="page">Hire</li>
          </ol>
        </nav>

        <div className="hf-layout">
          {/* ── Candidate summary ── */}
          {candidate && (
            <aside className="hf-candidate-panel">
              <div className="hf-cand-card">
                <div className="hf-cand-badge">HIRING</div>
                <div className="hf-cand-avatar">
                  {candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <h2 className="hf-cand-name">{candidate.name}</h2>
                <p className="hf-cand-role">{candidate.role}</p>
                <p className="hf-cand-hint">
                  Fill in the details below and we'll notify this candidate of your interest.
                </p>
              </div>
            </aside>
          )}

          {/* ── Form ── */}
          <div className="hf-form-col">
            <header className="hf-form-header">
              <h1 className="hf-form-title">Hiring Request</h1>
              <p className="hf-form-sub">
                Fill in the details below to send a hiring request.
                Fields marked <span className="hf-req-star">*</span> are required.
              </p>
            </header>

            {/* Global error banner */}
            {Object.keys(errors).length > 0 && (
              <div className="hf-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>Please fill all required fields before submitting.</span>
              </div>
            )}

            <form className="hf-form" onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div className="hf-row-2">
                <div id="hf-yourName" className={`hf-group ${errors.yourName ? 'hf-group--error' : ''}`}>
                  <label className="hf-label" htmlFor="yourName">
                    Your Name <span className="hf-req-star">*</span>
                  </label>
                  <input
                    id="yourName"
                    name="yourName"
                    type="text"
                    className="hf-input"
                    placeholder="e.g. Sarah Johnson"
                    value={form.yourName}
                    onChange={handleChange}
                    aria-describedby={errors.yourName ? 'err-yourName' : undefined}
                    aria-invalid={!!errors.yourName}
                  />
                  {errors.yourName && (
                    <span id="err-yourName" className="hf-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.yourName}
                    </span>
                  )}
                </div>

                <div id="hf-companyName" className={`hf-group ${errors.companyName ? 'hf-group--error' : ''}`}>
                  <label className="hf-label" htmlFor="companyName">
                    Company Name <span className="hf-req-star">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    className="hf-input"
                    placeholder="e.g. Acme Corp"
                    value={form.companyName}
                    onChange={handleChange}
                    aria-invalid={!!errors.companyName}
                  />
                  {errors.companyName && (
                    <span className="hf-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.companyName}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div id="hf-email" className={`hf-group ${errors.email ? 'hf-group--error' : ''}`}>
                <label className="hf-label" htmlFor="email">
                  Email Address <span className="hf-req-star">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="hf-input"
                  placeholder="e.g. sarah@acme.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span className="hf-error-msg" role="alert">
                    <AlertCircle size={13} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Project Description */}
              <div id="hf-projectDesc" className={`hf-group ${errors.projectDesc ? 'hf-group--error' : ''}`}>
                <label className="hf-label" htmlFor="projectDesc">
                  Project Description <span className="hf-req-star">*</span>
                </label>
                <textarea
                  id="projectDesc"
                  name="projectDesc"
                  className="hf-input hf-textarea"
                  placeholder="Describe the project, goals, tech stack, and what you expect from the candidate…"
                  rows={5}
                  value={form.projectDesc}
                  onChange={handleChange}
                  aria-invalid={!!errors.projectDesc}
                />
                {errors.projectDesc && (
                  <span className="hf-error-msg" role="alert">
                    <AlertCircle size={13} /> {errors.projectDesc}
                  </span>
                )}
              </div>

              {/* Row: Budget + Duration */}
              <div className="hf-row-2">
                <div id="hf-budget" className={`hf-group ${errors.budget ? 'hf-group--error' : ''}`}>
                  <label className="hf-label" htmlFor="budget">
                    Budget <span className="hf-req-star">*</span>
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    className="hf-input"
                    placeholder="e.g. $5,000 / month"
                    value={form.budget}
                    onChange={handleChange}
                    aria-invalid={!!errors.budget}
                  />
                  {errors.budget && (
                    <span className="hf-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.budget}
                    </span>
                  )}
                </div>

                <div className="hf-group">
                  <label className="hf-label" htmlFor="duration">
                    Duration <span className="hf-optional">(optional)</span>
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    className="hf-input"
                    placeholder="e.g. 3 months"
                    value={form.duration}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="hf-submit-btn" id="hf-submit">
                Send Hiring Request
              </button>
            </form>
          </div>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
