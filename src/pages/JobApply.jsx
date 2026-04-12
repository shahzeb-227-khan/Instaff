import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Loader,
  X,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { jobsData } from '../data/jobs';
import './JobApply.css';

/* ─── Validation helpers ─── */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidPhone = (phone) =>
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,8}$/.test(
    phone.trim().replace(/\s/g, '')
  );

/* ─── Toast component ─── */
const Toast = ({ message, onClose }) => (
  <div className="toast toast-success" role="alert">
    <CheckCircle size={20} />
    <span>{message}</span>
    <button className="toast-close" onClick={onClose} aria-label="Close">
      <X size={16} />
    </button>
  </div>
);

const JobApply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const job = jobsData.find((j) => j.id === parseInt(jobId, 10));

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  if (!job) {
    return (
      <div className="job-apply-page">
        <Navbar />
        <div className="apply-not-found">
          <h2>Job not found</h2>
          <p>This job listing no longer exists.</p>
          <button className="btn btn-primary cta-gradient" onClick={() => navigate('/find-work')}>
            <ArrowLeft size={18} /> Back to Find Work
          </button>
        </div>
      </div>
    );
  }

  /* ─── Field change ─── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ─── Resume file change ─── */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setResume(file);
      if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const removeResume = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ─── Validation ─── */
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone = 'Invalid phone number format.';
    }
    if (!resume) newErrors.resume = 'Please upload your resume.';

    return newErrors;
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstErrorKey}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setSubmitted(true);
    setToast('Job Applied Successfully ✅');

    // Redirect to find-work after 3 seconds
    setTimeout(() => {
      navigate('/find-work');
    }, 3000);
  };

  /* ─── Success Screen ─── */
  if (submitted) {
    return (
      <div className="job-apply-page">
        <Navbar />
        {toast && (
          <Toast message={toast} onClose={() => setToast(null)} />
        )}
        <div className="apply-success-screen">
          <div className="success-icon-wrapper">
            <CheckCircle size={56} className="success-icon" />
          </div>
          <h1 className="success-title">Job Applied Successfully ✅</h1>
          <p className="success-sub">
            Your application for <strong>{job.title}</strong> at{' '}
            <strong>{job.company}</strong> has been submitted.
          </p>
          <p className="success-redirect">Redirecting you back to job listings…</p>
          <button className="btn btn-primary cta-gradient" onClick={() => navigate('/find-work')}>
            Back to Find Work
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-apply-page">
      <Navbar />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/find-work" className="breadcrumb-link">Find Work</Link>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <Link to={`/jobs/${job.id}`} className="breadcrumb-link">{job.title}</Link>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <span className="breadcrumb-current">Apply</span>
          </nav>
        </div>
      </div>

      <main className="apply-main">
        <div className="container apply-container">
          {/* Left — Form */}
          <div className="apply-form-wrapper">
            <div className="apply-form-header">
              <h1 className="apply-form-title">Submit Your Application</h1>
              <p className="apply-form-sub">
                Applying for <strong>{job.title}</strong> at <strong>{job.company}</strong>
              </p>
            </div>

            <form className="apply-form" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div
                id="field-fullName"
                className={`form-group ${errors.fullName ? 'has-error' : ''}`}
              >
                <label htmlFor="fullName" className="form-label">
                  <User size={16} /> Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sarah Johnson"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <span className="error-msg">{errors.fullName}</span>
                )}
              </div>

              {/* Email */}
              <div
                id="field-email"
                className={`form-group ${errors.email ? 'has-error' : ''}`}
              >
                <label htmlFor="email" className="form-label">
                  <Mail size={16} /> Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. sarah@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="error-msg">{errors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div
                id="field-phone"
                className={`form-group ${errors.phone ? 'has-error' : ''}`}
              >
                <label htmlFor="phone" className="form-label">
                  <Phone size={16} /> Phone Number <span className="required-star">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="e.g. +1 555 123 4567"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className="error-msg">{errors.phone}</span>
                )}
              </div>

              {/* Resume Upload */}
              <div
                id="field-resume"
                className={`form-group ${errors.resume ? 'has-error' : ''}`}
              >
                <label className="form-label">
                  <Upload size={16} /> Resume / CV <span className="required-star">*</span>
                </label>

                {resume ? (
                  <div className="file-selected">
                    <FileText size={20} className="file-icon" />
                    <span className="file-name">{resume.name}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={removeResume}
                      aria-label="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="file-drop-zone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={28} className="drop-icon" />
                    <p className="drop-text">
                      Drag & drop your resume here, or{' '}
                      <span className="drop-browse">browse</span>
                    </p>
                    <p className="drop-hint">PDF, DOC, DOCX — Max 5 MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="file-input-hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {errors.resume && (
                  <span className="error-msg">{errors.resume}</span>
                )}
              </div>

              {/* Cover Letter */}
              <div id="field-coverLetter" className="form-group">
                <label htmlFor="coverLetter" className="form-label">
                  <FileText size={16} /> Cover Letter{' '}
                  <span className="optional-label">(optional)</span>
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  className="form-textarea"
                  placeholder="Tell the employer why you're a great fit for this role…"
                  value={form.coverLetter}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary cta-gradient submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="spinner" />
                      Submitting…
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>

                <button
                  type="button"
                  className="back-link-btn"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <ArrowLeft size={16} /> Back to Job Detail
                </button>
              </div>
            </form>
          </div>

          {/* Right — Job Summary */}
          <aside className="apply-sidebar">
            <div className="apply-job-summary">
              <h3 className="summary-title">Job Summary</h3>
              <h4 className="summary-job-title">{job.title}</h4>
              <p className="summary-company">
                {job.verified && <CheckCircle size={15} className="summary-verified" />}
                {job.company}
              </p>

              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Location</span>
                  <span className="summary-value">{job.remote ? 'Remote' : job.location}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Type</span>
                  <span className="summary-value">{job.type}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Duration</span>
                  <span className="summary-value">{job.duration}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Salary</span>
                  <span className="summary-value salary-highlight">
                    ${job.salary.min.toLocaleString()} – ${job.salary.max.toLocaleString()}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Level</span>
                  <span className="summary-value">{job.experienceLevel}</span>
                </div>
              </div>

              <div className="summary-tags">
                {job.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default JobApply;
