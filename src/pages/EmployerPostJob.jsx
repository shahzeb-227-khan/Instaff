import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, X, Plus, Lightbulb, BadgeCheck, TrendingUp } from 'lucide-react';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
import './EmployerPostJob.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = {
  jobTitle:    '',
  companyName: '',
  location:    '',
  salary:      '',
  jobType:     '',
  description: '',
};

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];

export default function EmployerPostJob() {
  const navigate = useNavigate();

  const [form,    setForm]    = useState(INITIAL);
  const [skills,  setSkills]  = useState(['React', 'TypeScript']);
  const [newSkill,setNewSkill]= useState('');
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) setSkills((p) => [...p, s]);
    setNewSkill('');
  };

  const removeSkill = (s) => setSkills((p) => p.filter((x) => x !== s));

  const validate = () => {
    const e = {};
    if (!form.jobTitle.trim())    e.jobTitle    = 'Job title is required.';
    if (!form.companyName.trim()) e.companyName = 'Company name is required.';
    if (!form.location.trim())    e.location    = 'Location is required.';
    if (!form.salary.trim())      e.salary      = 'Salary / rate is required.';
    if (!form.jobType)            e.jobType     = 'Please select a job type.';
    if (!form.description.trim()) e.description = 'Job description is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`pj-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div className="epj-root">
        <EmployerNavbar />
        <main className="epj-main">
          <div className="epj-success">
            <div className="epj-success__icon-wrap">
              <CheckCircle size={56} className="epj-success__icon" />
            </div>
            <h1 className="epj-success__title">Job Posted Successfully ✅</h1>
            <p className="epj-success__sub">
              Your job listing for <strong>{form.jobTitle}</strong> at <strong>{form.companyName}</strong> is now live
              and visible to thousands of vetted professionals.
            </p>
            <div className="epj-success__card">
              {[
                ['Job Title',   form.jobTitle],
                ['Company',     form.companyName],
                ['Location',    form.location],
                ['Type',        form.jobType],
                ['Salary',      form.salary],
              ].map(([label, val]) => (
                <div key={label} className="epj-success__row">
                  <span className="epj-success__label">{label}</span>
                  <span className="epj-success__val">{val}</span>
                </div>
              ))}
            </div>
            {/* HCI: Error Recovery — soft reversal option */}
            <div className="epj-success__btns">
              <button
                className="epj-success__edit-btn"
                onClick={() => setSuccess(false)}
                aria-label="Edit job posting"
              >
                ✏️ Edit Submission
              </button>
              <button className="epj-btn-primary" onClick={() => navigate('/employer/find-talent')}>
                Browse Talent
              </button>
              <button className="epj-btn-ghost" onClick={() => { setSuccess(false); setForm(INITIAL); setSkills([]); }}>
                Post Another Job
              </button>
            </div>
          </div>
        </main>
        <EmployerFooter />
      </div>
    );
  }

  return (
    <div className="epj-root">
      <EmployerNavbar />

      <main className="epj-main">
        {/* ── Breadcrumb navigation — HCI: Navigation clarity ── */}
        <nav className="epj-breadcrumb" aria-label="Breadcrumb">
          <ol className="epj-breadcrumb__list">
            <li className="epj-breadcrumb__item">
              <button className="epj-breadcrumb__link" onClick={() => navigate('/employer/home')}>Home</button>
            </li>
            <li className="epj-breadcrumb__sep" aria-hidden="true">›</li>
            <li className="epj-breadcrumb__item epj-breadcrumb__item--current" aria-current="page">Post Job</li>
          </ol>
        </nav>
        <div className="epj-layout">
          {/* ── LEFT: Form ── */}
          <div className="epj-form-col">
            <header className="epj-header">
              <h1 className="epj-title">Post a New Job</h1>
              <p className="epj-sub">
                Craft a precise listing to attract the industry's top talent.
                Fields marked <span className="epj-req">*</span> are required.
              </p>
            </header>

            {/* Global error banner */}
            {Object.keys(errors).length > 0 && (
              <div className="epj-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>Please fill all required fields before submitting.</span>
              </div>
            )}

            <form className="epj-form" onSubmit={handleSubmit} noValidate>
              {/* Row 1: Title + Company */}
              <div className="epj-row-2">
                <div id="pj-jobTitle" className={`epj-group ${errors.jobTitle ? 'epj-group--err' : ''}`}>
                  <label className="epj-label" htmlFor="jobTitle">
                    Job Title <span className="epj-req">*</span>
                  </label>
                  <input id="jobTitle" name="jobTitle" type="text" className="epj-input"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={form.jobTitle} onChange={handleChange} aria-invalid={!!errors.jobTitle} />
                  {errors.jobTitle && <span className="epj-err-msg" role="alert"><AlertCircle size={13}/> {errors.jobTitle}</span>}
                </div>

                <div id="pj-companyName" className={`epj-group ${errors.companyName ? 'epj-group--err' : ''}`}>
                  <label className="epj-label" htmlFor="companyName">
                    Company Name <span className="epj-req">*</span>
                  </label>
                  <input id="companyName" name="companyName" type="text" className="epj-input"
                    placeholder="e.g. Acme Corp"
                    value={form.companyName} onChange={handleChange} aria-invalid={!!errors.companyName} />
                  {errors.companyName && <span className="epj-err-msg" role="alert"><AlertCircle size={13}/> {errors.companyName}</span>}
                </div>
              </div>

              {/* Row 2: Location + Job Type */}
              <div className="epj-row-2">
                <div id="pj-location" className={`epj-group ${errors.location ? 'epj-group--err' : ''}`}>
                  <label className="epj-label" htmlFor="location">
                    Location <span className="epj-req">*</span>
                  </label>
                  <input id="location" name="location" type="text" className="epj-input"
                    placeholder="Remote / City, Country"
                    value={form.location} onChange={handleChange} aria-invalid={!!errors.location} />
                  {errors.location && <span className="epj-err-msg" role="alert"><AlertCircle size={13}/> {errors.location}</span>}
                </div>

                <div id="pj-jobType" className={`epj-group ${errors.jobType ? 'epj-group--err' : ''}`}>
                  <label className="epj-label" htmlFor="jobType">
                    Job Type <span className="epj-req">*</span>
                  </label>
                  <select id="jobType" name="jobType" className="epj-input epj-select"
                    value={form.jobType} onChange={handleChange} aria-invalid={!!errors.jobType}>
                    <option value="">Select type…</option>
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.jobType && <span className="epj-err-msg" role="alert"><AlertCircle size={13}/> {errors.jobType}</span>}
                </div>
              </div>

              {/* Salary */}
              <div id="pj-salary" className={`epj-group ${errors.salary ? 'epj-group--err' : ''}`}>
                <label className="epj-label" htmlFor="salary">
                  Salary / Rate <span className="epj-req">*</span>
                </label>
                <input id="salary" name="salary" type="text" className="epj-input"
                  placeholder="e.g. $90,000 – $120,000 / year or $60/hr"
                  value={form.salary} onChange={handleChange} aria-invalid={!!errors.salary} />
                {errors.salary && <span className="epj-err-msg" role="alert"><AlertCircle size={13}/> {errors.salary}</span>}
              </div>

              {/* Skills */}
              <div className="epj-group">
                <label className="epj-label">Required Skills</label>
                <div className="epj-skills-box">
                  {skills.map((s) => (
                    <span key={s} className="epj-skill-tag">
                      {s}
                      <button type="button" className="epj-skill-remove" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  <div className="epj-skill-add-row">
                    <input
                      type="text"
                      className="epj-skill-input"
                      placeholder="Add a skill…"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    />
                    <button type="button" className="epj-skill-add-btn" onClick={addSkill}>
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div id="pj-description" className={`epj-group ${errors.description ? 'epj-group--err' : ''}`}>
                <div className="epj-label-row">
                  <label className="epj-label" htmlFor="description">
                    Job Description <span className="epj-req">*</span>
                  </label>
                  <span className="epj-char-count">{form.description.length}/1000</span>
                </div>
                <textarea id="description" name="description" className="epj-input epj-textarea"
                  placeholder="Describe the role, responsibilities, tech stack, and ideal candidate…"
                  rows={6} maxLength={1000}
                  value={form.description} onChange={handleChange} aria-invalid={!!errors.description} />
                {errors.description && <span className="epj-err-msg" role="alert"><AlertCircle size={13}/> {errors.description}</span>}
              </div>

              <button type="submit" className="epj-submit-btn" id="publish-job-btn">
                Publish Job Listing
              </button>
            </form>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="epj-sidebar">
            {/* Tips */}
            <div className="epj-tips-card">
              <div className="epj-tips-header">
                <Lightbulb size={18} className="epj-tips-icon" />
                <h3 className="epj-tips-title">Posting Tips</h3>
              </div>
              <ul className="epj-tips-list">
                <li><span className="epj-tip-num">01</span> Specific salary ranges attract 40% more qualified applicants.</li>
                <li><span className="epj-tip-num">02</span> List at least 5 required skills to filter for specialised expertise.</li>
                <li><span className="epj-tip-num">03</span> Mention your tech stack to attract culture-fit candidates.</li>
                <li><span className="epj-tip-num">04</span> Include remote/hybrid info to widen your candidate pool.</li>
              </ul>
            </div>

            {/* Financial summary */}
            <div className="epj-finance-card">
              <h3 className="epj-finance-title">Fees</h3>
              <div className="epj-finance-row">
                <span>Job post fee</span><strong>3%</strong>
              </div>
              <div className="epj-finance-row">
                <span>Platform fee</span><strong>5%</strong>
              </div>
              <div className="epj-cancel-row">
                <BadgeCheck size={15} className="epj-cancel-icon" />
                <span>Cancel anytime</span>
              </div>
            </div>


          </aside>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
