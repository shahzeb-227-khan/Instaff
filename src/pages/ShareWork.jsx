import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, X, Plus, Briefcase, Globe, DollarSign } from 'lucide-react';
import JobSeekerNavbar from '../components/JobSeekerNavbar';
import EmployerFooter  from '../components/EmployerFooter';
import './ShareWork.css';

const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=]*)?$/i;

const SKILL_SUGGESTIONS = ['React','TypeScript','Figma','Python','Node.js','AWS','Swift','Go','UX Research','CSS','Vue.js','SQL'];

const INITIAL = {
  fullName: '', title: '', experience: '', rate: '', portfolio: '', description: '',
};

export default function ShareWork() {
  const navigate = useNavigate();

  const [form,     setForm]     = useState(INITIAL);
  const [skills,   setSkills]   = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [errors,   setErrors]   = useState({});
  const [success,  setSuccess]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const addSkill = (val) => {
    const s = (val || newSkill).trim();
    if (s && !skills.includes(s)) setSkills((p) => [...p, s]);
    setNewSkill('');
    if (errors.skills) setErrors((p) => ({ ...p, skills: '' }));
  };

  const removeSkill = (s) => setSkills((p) => p.filter((x) => x !== s));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())    e.fullName    = 'Full name is required.';
    if (!form.title.trim())       e.title       = 'Professional title is required.';
    if (skills.length === 0)      e.skills      = 'Add at least one skill.';
    if (!form.experience.trim())  e.experience  = 'Experience is required.';
    if (!form.rate.trim())        e.rate        = 'Hourly rate is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (form.portfolio.trim() && !URL_RE.test(form.portfolio.trim()))
      e.portfolio = 'Enter a valid URL (e.g. https://yoursite.com).';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`sw-${first}`)?.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    setSuccess(true);
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  /* ── Success ── */
  if (success) {
    return (
      <div className="sw-root">
        <JobSeekerNavbar />
        <main className="sw-main">
          <div className="sw-success">
            <div className="sw-success__icon-wrap">
              <CheckCircle size={56} className="sw-success__icon" />
            </div>
            <h1 className="sw-success__title">Profile Shared Successfully ✅</h1>
            <p className="sw-success__sub">
              Your professional profile for <strong>{form.fullName}</strong> is now live and discoverable
              by 500+ verified employers on InStaff.
            </p>
            <div className="sw-success__card">
              {[
                ['Name',       form.fullName],
                ['Title',      form.title],
                ['Skills',     skills.slice(0,3).join(', ') + (skills.length > 3 ? '…' : '')],
                ['Rate',       `$${form.rate}/hr`],
                ['Portfolio',  form.portfolio || 'Not provided'],
              ].map(([label, val]) => (
                <div key={label} className="sw-success__row">
                  <span className="sw-success__label">{label}</span>
                  <span className="sw-success__val">{val}</span>
                </div>
              ))}
            </div>
            <div className="sw-success__btns">
              <button className="sw-btn-primary" onClick={() => navigate('/job-seeker/find-jobs')}>
                Browse Jobs
              </button>
              <button className="sw-btn-ghost" onClick={() => { setSuccess(false); setForm(INITIAL); setSkills([]); }}>
                Edit Profile
              </button>
            </div>
          </div>
        </main>
        <EmployerFooter />
      </div>
    );
  }

  return (
    <div className="sw-root">
      <JobSeekerNavbar />

      <main className="sw-main">
        <div className="sw-layout">
          {/* ── LEFT: Form ── */}
          <div className="sw-form-col">
            <header className="sw-header">
              <h1 className="sw-title">Share Your Work</h1>
              <p className="sw-sub">
                Create a professional profile so employers can discover and reach out to you.
                Fields marked <span className="sw-req">*</span> are required.
              </p>
            </header>

            {/* Global error banner */}
            {Object.keys(errors).length > 0 && (
              <div className="sw-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>Please fill all required fields before sharing your profile.</span>
              </div>
            )}

            <form className="sw-form" onSubmit={handleSubmit} noValidate>
              {/* Row 1: Name + Title */}
              <div className="sw-row-2">
                <div id="sw-fullName" className={`sw-group ${errors.fullName ? 'sw-group--err':''}`}>
                  <label className="sw-label" htmlFor="fullName">
                    Full Name <span className="sw-req">*</span>
                  </label>
                  <input id="fullName" name="fullName" type="text" className="sw-input"
                    placeholder="e.g. Aisha Rahman"
                    value={form.fullName} onChange={handleChange} />
                  {errors.fullName && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.fullName}</span>}
                </div>

                <div id="sw-title" className={`sw-group ${errors.title ? 'sw-group--err':''}`}>
                  <label className="sw-label" htmlFor="title">
                    Professional Title <span className="sw-req">*</span>
                  </label>
                  <input id="title" name="title" type="text" className="sw-input"
                    placeholder="e.g. Senior Frontend Developer"
                    value={form.title} onChange={handleChange} />
                  {errors.title && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.title}</span>}
                </div>
              </div>

              {/* Skills */}
              <div id="sw-skills" className={`sw-group ${errors.skills ? 'sw-group--err':''}`}>
                <label className="sw-label">Skills <span className="sw-req">*</span></label>
                <div className="sw-skills-box">
                  {skills.map((s) => (
                    <span key={s} className="sw-skill-tag">
                      {s}
                      <button type="button" className="sw-skill-rm" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                        <X size={11}/>
                      </button>
                    </span>
                  ))}
                  <div className="sw-skill-add-row">
                    <input
                      type="text"
                      className="sw-skill-input"
                      placeholder="Add a skill…"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    />
                    <button type="button" className="sw-skill-add-btn" onClick={() => addSkill()}>
                      <Plus size={14}/> Add
                    </button>
                  </div>
                </div>
                {/* Suggestions */}
                <div className="sw-skill-suggestions">
                  <span className="sw-label" style={{ fontSize:'0.72rem' }}>Suggestions:</span>
                  {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0,6).map((s) => (
                    <button key={s} type="button" className="sw-suggest-btn" onClick={() => addSkill(s)}>
                      + {s}
                    </button>
                  ))}
                </div>
                {errors.skills && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.skills}</span>}
              </div>

              {/* Row: Experience + Rate */}
              <div className="sw-row-2">
                <div id="sw-experience" className={`sw-group ${errors.experience ? 'sw-group--err':''}`}>
                  <label className="sw-label" htmlFor="experience">
                    <Briefcase size={13} style={{marginRight:4}}/> Years of Experience <span className="sw-req">*</span>
                  </label>
                  <input id="experience" name="experience" type="text" className="sw-input"
                    placeholder="e.g. 5 years"
                    value={form.experience} onChange={handleChange} />
                  {errors.experience && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.experience}</span>}
                </div>

                <div id="sw-rate" className={`sw-group ${errors.rate ? 'sw-group--err':''}`}>
                  <label className="sw-label" htmlFor="rate">
                    <DollarSign size={13} style={{marginRight:4}}/> Hourly Rate (USD) <span className="sw-req">*</span>
                  </label>
                  <div className="sw-input-wrap">
                    <span className="sw-prefix">$</span>
                    <input id="rate" name="rate" type="text" className="sw-input sw-input--prefixed"
                      placeholder="e.g. 75"
                      value={form.rate} onChange={handleChange} />
                    <span className="sw-suffix">/hr</span>
                  </div>
                  {errors.rate && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.rate}</span>}
                </div>
              </div>

              {/* Portfolio link */}
              <div id="sw-portfolio" className={`sw-group ${errors.portfolio ? 'sw-group--err':''}`}>
                <label className="sw-label" htmlFor="portfolio">
                  <Globe size={13} style={{marginRight:4}}/> Portfolio / Website URL
                  <span className="sw-optional"> (optional)</span>
                </label>
                <input id="portfolio" name="portfolio" type="url" className="sw-input"
                  placeholder="https://yourportfolio.com"
                  value={form.portfolio} onChange={handleChange} />
                {errors.portfolio && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.portfolio}</span>}
              </div>

              {/* Description */}
              <div id="sw-description" className={`sw-group ${errors.description ? 'sw-group--err':''}`}>
                <div className="sw-label-row">
                  <label className="sw-label" htmlFor="description">
                    Professional Summary <span className="sw-req">*</span>
                  </label>
                  <span className="sw-char-count">{form.description.length}/600</span>
                </div>
                <textarea id="description" name="description" className="sw-input sw-textarea"
                  placeholder="Describe your expertise, notable projects, and what makes you stand out…"
                  rows={6} maxLength={600}
                  value={form.description} onChange={handleChange} />
                {errors.description && <span className="sw-err-msg"><AlertCircle size={13}/> {errors.description}</span>}
              </div>

              <button type="submit" className="sw-submit-btn" id="share-profile-btn">
                Share Profile on InStaff
              </button>
            </form>
          </div>

          {/* ── RIGHT: Preview & tips ── */}
          <aside className="sw-sidebar">
            {/* Live preview */}
            <div className="sw-preview-card">
              <div className="sw-preview__badge">LIVE PREVIEW</div>
              <div className="sw-preview__avatar">
                {form.fullName ? form.fullName.split(' ').map((n)=>n[0]).join('').slice(0,2) : '?'}
              </div>
              <div className="sw-preview__name">{form.fullName || 'Your Name'}</div>
              <div className="sw-preview__title">{form.title   || 'Your Title'}</div>
              {form.rate && (
                <div className="sw-preview__rate">${form.rate}/hr</div>
              )}
              <div className="sw-preview__skills">
                {skills.slice(0, 4).map((s) => <span key={s} className="sw-preview__skill">{s}</span>)}
                {skills.length === 0 && <span className="sw-preview__skill sw-preview__skill--placeholder">Your Skills</span>}
              </div>
            </div>

            {/* Tips */}
            <div className="sw-tips-card">
              <h3 className="sw-tips-title">Profile Tips</h3>
              <ul className="sw-tips-list">
                <li><span className="sw-tip-num">01</span> Profiles with 5+ skills get 3× more views.</li>
                <li><span className="sw-tip-num">02</span> A clear, specific job title attracts better-fit employers.</li>
                <li><span className="sw-tip-num">03</span> Link your portfolio to instantly showcase your quality of work.</li>
                <li><span className="sw-tip-num">04</span> Competitive rates = more offers. Research your market rate first.</li>
              </ul>
            </div>

            {/* Employers stat */}
            <div className="sw-stat-card">
              <div className="sw-stat__num">500+</div>
              <div className="sw-stat__label">Verified employers browse InStaff daily</div>
            </div>
          </aside>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
