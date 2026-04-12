import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  Calendar,
  Users,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { jobsData } from '../data/jobs';
import './JobDetail.css';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find((j) => j.id === parseInt(jobId, 10));

  if (!job) {
    return (
      <div className="job-detail-page">
        <Navbar />
        <div className="job-not-found">
          <h2>Job not found</h2>
          <p>The job listing you are looking for does not exist or has been removed.</p>
          <button className="btn btn-primary cta-gradient" onClick={() => navigate('/find-work')}>
            <ArrowLeft size={18} /> Back to Find Work
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <Navbar />

      <main className="job-detail-main">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <nav className="breadcrumb">
              <Link to="/find-work" className="breadcrumb-link">Find Work</Link>
              <ChevronRight size={16} className="breadcrumb-sep" />
              <span className="breadcrumb-current">{job.title}</span>
            </nav>
          </div>
        </div>

        <div className="container job-detail-container">
          {/* Left Column — Main Content */}
          <div className="job-detail-content">
            {/* Hero Card */}
            <div className="job-hero-card">
              <div className="job-hero-header">
                <div className="job-hero-title-block">
                  <h1 className="job-hero-title">{job.title}</h1>
                  <div className="job-hero-company">
                    {job.verified && <CheckCircle size={18} className="verified-icon" />}
                    <span>{job.company}</span>
                  </div>
                </div>
                <div className="job-salary-hero">
                  <span className="salary-label">Annual Salary</span>
                  <span className="salary-amount">
                    ${job.salary.min.toLocaleString()} – ${job.salary.max.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="job-hero-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{job.remote ? 'Remote' : job.location}</span>
                </div>
                <div className="meta-item">
                  <Briefcase size={16} />
                  <span>{job.type}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{job.duration}</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{job.experienceLevel}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>

              <div className="job-tags-row">
                {job.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <h2 className="section-heading">About the Role</h2>
              <div className="job-description">
                {job.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="detail-section">
                <h2 className="section-heading">Requirements</h2>
                <ul className="requirements-list">
                  {job.requirements.map((req, i) => (
                    <li key={i}>
                      <CheckCircle size={16} className="req-check" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="detail-section">
                <h2 className="section-heading">Benefits</h2>
                <ul className="benefits-list">
                  {job.benefits.map((benefit, i) => (
                    <li key={i}>
                      <DollarSign size={16} className="benefit-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column — Sticky Apply Card */}
          <aside className="job-detail-sidebar">
            <div className="apply-card">
              <h3 className="apply-card-title">Ready to Apply?</h3>
              <p className="apply-card-sub">
                Submit your application for <strong>{job.title}</strong> at{' '}
                <strong>{job.company}</strong>.
              </p>

              <div className="apply-card-details">
                <div className="apply-detail-row">
                  <span className="apply-detail-label">Location</span>
                  <span className="apply-detail-value">
                    {job.remote ? 'Remote' : job.location}
                  </span>
                </div>
                <div className="apply-detail-row">
                  <span className="apply-detail-label">Type</span>
                  <span className="apply-detail-value">{job.type}</span>
                </div>
                <div className="apply-detail-row">
                  <span className="apply-detail-label">Salary</span>
                  <span className="apply-detail-value">
                    ${job.salary.min.toLocaleString()} – ${job.salary.max.toLocaleString()}
                  </span>
                </div>
                <div className="apply-detail-row">
                  <span className="apply-detail-label">Experience</span>
                  <span className="apply-detail-value">{job.experienceLevel}</span>
                </div>
              </div>

              <button
                className="btn btn-primary cta-gradient apply-now-btn"
                onClick={() => navigate(`/jobs/${job.id}/apply`)}
              >
                Apply Now
              </button>

              <button
                className="btn btn-outline back-btn"
                onClick={() => navigate('/find-work')}
              >
                <ArrowLeft size={16} /> Back to Listings
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
