import React from 'react';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import './JobCard.css';

const JobCard = ({ job, onViewDetail }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <div className="job-company">
            {job.verified && <CheckCircle size={16} className="verified-badge" />}
            <span>{job.company}</span>
          </div>
        </div>
        <div className="job-salary-badge">
          ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
        </div>
      </div>

      <div className="job-meta">
        <div className="job-location-type">
          <div className="location-info">
            <MapPin size={16} />
            <span>{job.remote ? 'Remote' : job.location}</span>
          </div>
          <div className="job-type-badge">{job.type}</div>
        </div>
        <span className="job-duration">{job.duration}</span>
      </div>

      <div className="job-tags">
        {job.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="job-footer">
        <span className="job-posted-time">{job.postedAt}</span>
        <button className="btn btn-outline" onClick={() => onViewDetail(job.id)}>
          View Detail <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
