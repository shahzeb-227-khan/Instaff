import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Upload, ArrowLeft, X } from 'lucide-react';
import { JOBS } from './FindJobs';
import JobSeekerNavbar from '../components/JobSeekerNavbar';
import EmployerFooter  from '../components/EmployerFooter';
import './JSApplyForm.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()\u00a0]{7,15}[\d]$/;

const INITIAL = { fullName:'', email:'', phone:'', coverLetter:'' };

export default function JSApplyForm() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const job      = JOBS.find((j) => j.id === Number(id));

  const [form,    setForm]    = useState(INITIAL);
  const [cvFile,  setCvFile]  = useState(null);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]:'' }));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setCvFile(f);
      if (errors.cv) setErrors((p) => ({ ...p, cv:'' }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) { setCvFile(f); if (errors.cv) setErrors((p) => ({ ...p, cv:'' })); }
  };

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName  = 'Full name is required.';
    if (!form.email.trim())     e.email     = 'Email address is required.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.phone.trim())     e.phone     = 'Phone number is required.';
    else if (!PHONE_RE.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (!cvFile)                e.cv        = 'Please upload your CV / résumé.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`ja-${firstKey}`)?.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    setSuccess(true);
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div className="ja-root">
        <JobSeekerNavbar />
        <main className="ja-main">
          <div className="ja-success">
            <div className="ja-success__icon-wrap">
              <CheckCircle size={56} className="ja-success__icon" />
            </div>
            <h1 className="ja-success__title">Application Submitted Successfully ✅</h1>
            <p className="ja-success__sub">
              Your application for <strong>{job?.title}</strong> at <strong>{job?.company}</strong> has been received.
              The hiring team will be in touch within 48 hours.
            </p>
            <div className="ja-success__card">
              {[
                ['Position',  job?.title],
                ['Company',   job?.company],
                ['Applicant', form.fullName],
                ['Email',     form.email],
                ['CV',        cvFile?.name],
              ].map(([label, val]) => (
                <div key={label} className="ja-success__row">
                  <span className="ja-success__label">{label}</span>
                  <span className="ja-success__val">{val}</span>
                </div>
              ))}
            </div>
            <button className="ja-submit-btn" onClick={() => navigate('/job-seeker/find-jobs')}>
              ← Back to Jobs
            </button>
          </div>
        </main>
        <EmployerFooter />
      </div>
    );
  }

  return (
    <div className="ja-root">
      <JobSeekerNavbar />

      <main className="ja-main">
        {/* Breadcrumb */}
        <div className="ja-breadcrumb">
          <button className="ja-back-btn" onClick={() => navigate(`/job-seeker/job-detail/${id}`)}>
            <ArrowLeft size={16} /> Back to Job
          </button>
        </div>

        <div className="ja-layout">
          {/* ── Left: Job summary ── */}
          {job && (
            <aside className="ja-job-panel">
              <div className="ja-job-card">
                <span className="ja-job-badge">APPLYING FOR</span>
                <div className="ja-job-logo">{job.company.slice(0,2).toUpperCase()}</div>
                <h2 className="ja-job-title">{job.title}</h2>
                <p className="ja-job-company">{job.company}</p>
                <div className="ja-job-meta">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                  <span>{job.salary}</span>
                </div>
                <div className="ja-job-skills">
                  {job.skills.map((s) => <span key={s} className="ja-skill">{s}</span>)}
                </div>
              </div>
            </aside>
          )}

          {/* ── Right: Form ── */}
          <div className="ja-form-col">
            <header className="ja-header">
              <h1 className="ja-form-title">Apply for This Job</h1>
              <p className="ja-form-sub">
                Complete the form below. Fields marked <span className="ja-req">*</span> are required.
              </p>
            </header>

            {/* Global error banner */}
            {Object.keys(errors).length > 0 && (
              <div className="ja-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>Please fill all required fields before submitting.</span>
              </div>
            )}

            <form className="ja-form" onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div id="ja-fullName" className={`ja-group ${errors.fullName ? 'ja-group--err':''}` }>
                <label className="ja-label" htmlFor="fullName">
                  Full Name <span className="ja-req">*</span>
                </label>
                <input id="fullName" name="fullName" type="text" className="ja-input"
                  placeholder="e.g. Aisha Rahman"
                  value={form.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} />
                {errors.fullName && <span className="ja-err-msg" role="alert"><AlertCircle size={13}/> {errors.fullName}</span>}
              </div>

              {/* Email */}
              <div id="ja-email" className={`ja-group ${errors.email ? 'ja-group--err':''}`}>
                <label className="ja-label" htmlFor="email">
                  Email Address <span className="ja-req">*</span>
                </label>
                <input id="email" name="email" type="email" className="ja-input"
                  placeholder="e.g. aisha@email.com"
                  value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                {errors.email && <span className="ja-err-msg" role="alert"><AlertCircle size={13}/> {errors.email}</span>}
              </div>

              {/* Phone */}
              <div id="ja-phone" className={`ja-group ${errors.phone ? 'ja-group--err':''}`}>
                <label className="ja-label" htmlFor="phone">
                  Phone Number <span className="ja-req">*</span>
                </label>
                <input id="phone" name="phone" type="tel" className="ja-input"
                  placeholder="e.g. +1 555 123 4567"
                  value={form.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                {errors.phone && <span className="ja-err-msg" role="alert"><AlertCircle size={13}/> {errors.phone}</span>}
              </div>

              {/* CV Upload */}
              <div id="ja-cv" className={`ja-group ${errors.cv ? 'ja-group--err':''}`}>
                <label className="ja-label">
                  Upload CV / Résumé <span className="ja-req">*</span>
                </label>
                <div
                  className={`ja-drop-zone ${cvFile ? 'ja-drop-zone--filled' : ''} ${errors.cv ? 'ja-drop-zone--err' : ''}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload CV area"
                  onKeyDown={(e) => e.key === 'Enter' && document.getElementById('cv-file-input').click()}
                >
                  {cvFile ? (
                    <div className="ja-file-preview">
                      <Upload size={18} className="ja-file-icon" />
                      <span className="ja-file-name">{cvFile.name}</span>
                      <button type="button" className="ja-file-remove"
                        onClick={() => setCvFile(null)} aria-label="Remove file">
                        <X size={14}/>
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload size={28} className="ja-drop-icon" />
                      <p className="ja-drop-text">
                        Drag &amp; drop your CV here, or{' '}
                        <label htmlFor="cv-file-input" className="ja-drop-link">browse files</label>
                      </p>
                      <p className="ja-drop-hint">PDF, DOC, or DOCX · Max 5MB</p>
                    </>
                  )}
                  <input
                    id="cv-file-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="ja-file-input"
                    onChange={handleFile}
                    aria-label="Upload CV file"
                  />
                </div>
                {errors.cv && <span className="ja-err-msg" role="alert"><AlertCircle size={13}/> {errors.cv}</span>}
              </div>

              {/* Cover letter */}
              <div className="ja-group">
                <label className="ja-label" htmlFor="coverLetter">
                  Cover Letter <span className="ja-optional">(optional)</span>
                </label>
                <textarea id="coverLetter" name="coverLetter" className="ja-input ja-textarea"
                  placeholder="Tell the employer why you're the perfect fit for this role…"
                  rows={5}
                  value={form.coverLetter} onChange={handleChange} />
              </div>

              <button type="submit" className="ja-submit-btn" id="ja-submit">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
