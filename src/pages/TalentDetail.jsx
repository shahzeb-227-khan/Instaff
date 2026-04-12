import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Briefcase, Star, CheckCircle, Clock,
  ArrowLeft, ExternalLink,
} from 'lucide-react';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
import './TalentDetail.css';

/* ── Same data as FindTalent ── */
const CANDIDATES = [
  {
    id:1, name:'Aisha Rahman', role:'Senior Frontend Engineer', location:'Remote',
    available:true, match:97, rate:48, exp:'6 years', expLevel:'Senior',
    skills:['React','TypeScript','CSS Architecture','Next.js','GraphQL','Testing'],
    bio:`Aisha is a results-driven frontend engineer with 6 years of experience building scalable, 
accessible web applications for fintech and SaaS companies. She has led frontend teams of up to 8 
engineers and has a strong track record of improving Core Web Vitals and conversion rates.`,
    portfolio:['Redesigned checkout flow (→ 23% conversion lift)','Built design system (100+ components)','Led migration React 17 → 18 with zero downtime'],
    availability:'Immediately available',
    education:'BSc Computer Science, MIT',
    avatar:['#d8e2ff','#003f8b'],
  },
  {
    id:2, name:'Carlos Méndez', role:'Full-Stack Developer', location:'New York, NY',
    available:true, match:91, rate:55, exp:'4 years', expLevel:'Mid',
    skills:['Node.js','React','PostgreSQL','Docker','Redis','REST APIs'],
    bio:`Carlos is a versatile full-stack developer with deep expertise in Node.js and React. He has 
built and maintained production systems processing millions of requests per day. Passionate about 
clean architecture and developer experience.`,
    portfolio:['Built real-time analytics dashboard (500k daily users)','Migrated monolith → microservices (40% latency reduction)','Authored open-source ORM plugin (2k+ stars)'],
    availability:'2 weeks notice',
    education:'BEng Software Engineering, Columbia',
    avatar:['#b6f2af','#1c5120'],
  },
  {
    id:3, name:'Lin Wei', role:'Data Scientist', location:'San Francisco',
    available:false, match:88, rate:72, exp:'5 years', expLevel:'Senior',
    skills:['Python','ML','TensorFlow','Scikit-learn','SQL','Spark'],
    bio:`Lin specialises in predictive modelling and NLP. She has deployed machine learning pipelines 
at scale for e-commerce recommendation systems, reducing customer churn by 17% at her previous role.`,
    portfolio:['Churn prediction model (17% reduction)','NLP pipeline for customer support (60% ticket deflection)','Real-time fraud detection system'],
    availability:'1 month notice',
    education:'MSc Machine Learning, Stanford',
    avatar:['#ffdea8','#583d00'],
  },
  {
    id:4, name:'Priya Sharma', role:'Product Designer', location:'Remote',
    available:true, match:85, rate:42, exp:'5 years', expLevel:'Mid',
    skills:['Figma','UX Research','Prototyping','Design Systems','Accessibility','User Testing'],
    bio:`Priya is a user-centred designer who bridges research and execution. She has designed 
products used by over 2M people and is known for high-fidelity prototypes that engineers love.`,
    portfolio:['Led redesign of mobile banking app (4.8★ App Store)','Built accessible design system for healthcare platform','Conducted 50+ usability sessions leading to 35% task success improvement'],
    availability:'Immediately available',
    education:'BA Design, Parsons School of Design',
    avatar:['#ffdad6','#93000a'],
  },
  {
    id:5, name:"James O'Brien", role:'DevOps / Cloud Engineer', location:'Austin, TX',
    available:true, match:93, rate:80, exp:'7 years', expLevel:'Senior',
    skills:['AWS','Kubernetes','Terraform','CI/CD','Docker','Helm'],
    bio:`James architects and manages cloud infrastructure for high-growth startups. He is certified 
AWS Solutions Architect (Professional) and has achieved 99.99% uptime SLAs for critical production systems.`,
    portfolio:['Designed multi-region AWS architecture (99.99% uptime)','Reduced cloud costs by 45% via right-sizing and reserved instances','Built zero-downtime deployment pipelines for 20+ microservices'],
    availability:'2 weeks notice',
    education:'BEng Computer Engineering, UT Austin',
    avatar:['#adc6ff','#003f8b'],
  },
  {
    id:6, name:'Fatima Al-Zahra', role:'Backend Engineer', location:'Remote',
    available:true, match:79, rate:38, exp:'2 years', expLevel:'Junior',
    skills:['Go','gRPC','PostgreSQL','REST APIs','Docker','Microservices'],
    bio:`Fatima is a fast-learning backend engineer specialising in Go microservices. Despite 
being early-career, she has shipped production features serving millions of requests monthly.`,
    portfolio:['Built gRPC service handling 5M req/day','Optimised PostgreSQL queries (3× speed improvement)','Contributed to open-source Go HTTP router'],
    availability:'Immediately available',
    education:'BSc Software Engineering, AUB',
    avatar:['#9bd595','#1c5120'],
  },
  {
    id:7, name:'Samuel Torres', role:'Mobile Developer (iOS)', location:'Miami, FL',
    available:false, match:82, rate:58, exp:'4 years', expLevel:'Mid',
    skills:['Swift','UIKit','SwiftUI','Xcode','CoreData','Firebase'],
    bio:`Samuel builds polished iOS apps with a focus on performance and user delight. He has 
shipped 6 apps to the App Store, all with 4.5+ ratings.`,
    portfolio:['Fitness tracker app (100k downloads, 4.7★)','Banking app with biometric auth','SwiftUI component library (open source)'],
    availability:'1 month notice',
    education:'BSc Computer Science, FIU',
    avatar:['#ffba20','#583d00'],
  },
  {
    id:8, name:'Mei Tanaka', role:'AI / ML Engineer', location:'Seattle, WA',
    available:true, match:96, rate:95, exp:'6 years', expLevel:'Senior',
    skills:['PyTorch','LLMs','Python','RLHF','MLOps','HuggingFace'],
    bio:`Mei is at the frontier of applied AI, specialising in large language models and RLHF. 
She has fine-tuned and deployed LLMs in production at scale and is a contributor to several 
prominent open-source AI projects.`,
    portfolio:['Fine-tuned LLM for legal document summarisation (87% accuracy)','Built MLOps pipeline reducing model deployment time by 70%','Published 2 papers on RLHF at NeurIPS'],
    availability:'Immediately available',
    education:'PhD Computer Science (AI), University of Washington',
    avatar:['#d8e2ff','#2557a7'],
  },
  {
    id:9, name:'Elias Novak', role:'Security Engineer', location:'Remote',
    available:true, match:88, rate:75, exp:'8 years', expLevel:'Senior',
    skills:['Pentesting','SIEM','Zero Trust','OWASP','SOC 2','Threat Modelling'],
    bio:`Elias is a seasoned security engineer with deep expertise in penetration testing and 
building secure architectures. He has helped 15+ companies achieve SOC 2 compliance.`,
    portfolio:['Led SOC 2 Type II certification for Series B startup','Discovered and coordinated disclosure of 3 CVEs','Built threat modelling framework adopted by 5 companies'],
    availability:'2 weeks notice',
    education:'BSc Cybersecurity, Charles University',
    avatar:['#b6f2af','#356a35'],
  },
  {
    id:10, name:'Zara Khan', role:'Engineering Manager', location:'Chicago, IL',
    available:true, match:90, rate:110, exp:'10 years', expLevel:'Lead',
    skills:['Leadership','Agile','React','System Design','Hiring','Roadmapping'],
    bio:`Zara is an experienced engineering leader who has built and scaled teams from 5 to 40 
engineers. She combines strong technical foundations with exceptional people management skills.`,
    portfolio:['Scaled engineering team from 5→40 in 18 months','Delivered platform rewrite (0 downtime, on schedule)','Established quarterly roadmap process adopted org-wide'],
    availability:'1 month notice',
    education:'MBA, Kellogg + BSc CS, Northwestern',
    avatar:['#ffdea8','#765300'],
  },
  {
    id:11, name:'David Park', role:'QA / Automation Engineer', location:'Remote',
    available:false, match:76, rate:36, exp:'3 years', expLevel:'Mid',
    skills:['Selenium','Cypress','Jest','Playwright','API Testing','CI/CD'],
    bio:`David builds comprehensive test automation frameworks that give teams confidence to 
ship fast. He has reduced regression test cycles from days to under 30 minutes.`,
    portfolio:['Reduced regression cycle from 2 days → 30 min','Achieved 92% automated test coverage','Built Playwright E2E suite for fintech platform'],
    availability:'2 weeks notice',
    education:'BSc Software Engineering, KAIST',
    avatar:['#e4e2e1','#434751'],
  },
  {
    id:12, name:'Nina Okafor', role:'UI Developer', location:'London (Remote)',
    available:true, match:84, rate:45, exp:'4 years', expLevel:'Mid',
    skills:['Vue.js','CSS','Accessibility','WCAG','Storybook','Design Systems'],
    bio:`Nina is an accessibility-focused UI developer who creates beautiful, inclusive 
interfaces. She holds a CPACC certification and has helped multiple products achieve WCAG 2.1 AA.`,
    portfolio:['Achieved WCAG 2.1 AA for government portal (50k users)','Built accessible component library (Vue 3)','Reduced CSS bundle by 60% via design token migration'],
    availability:'Immediately available',
    education:'BSc Web Development, University of Lagos',
    avatar:['#d8e2ff','#003f8b'],
  },
];

export default function TalentDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const candidate = CANDIDATES.find((c) => c.id === Number(id));

  if (!candidate) {
    return (
      <div className="td-root">
        <EmployerNavbar />
        <div className="td-notfound">
          <h2>Candidate not found</h2>
          <button className="td-back-btn" onClick={() => navigate('/employer/find-talent')}>
            ← Back to Talent List
          </button>
        </div>
        <EmployerFooter />
      </div>
    );
  }

  const [bg, fg] = candidate.avatar;

  return (
    <div className="td-root">
      <EmployerNavbar />

      <main className="td-main">
        {/* Breadcrumb */}
        <div className="td-breadcrumb">
          <button className="td-back-btn" onClick={() => navigate('/employer/find-talent')} aria-label="Back to talent list">
            <ArrowLeft size={16} /> Back to Talent List
          </button>
        </div>

        <div className="td-layout">
          {/* ── LEFT: Profile ── */}
          <div className="td-profile-col">
            {/* Profile card */}
            <div className="td-card td-hero-card">
              <div className="td-avatar-wrap">
                <div className="td-avatar" style={{ background: bg, color: fg }}>
                  {candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                {candidate.available && (
                  <span className="td-avail-dot" title="Available" />
                )}
              </div>

              <h1 className="td-name">{candidate.name}</h1>
              <p className="td-role">{candidate.role}</p>

              <div className="td-meta-row">
                <span className="td-meta-chip">
                  <MapPin size={12} /> {candidate.location}
                </span>
                <span className="td-meta-chip">
                  <Briefcase size={12} /> {candidate.exp} exp
                </span>
                <span className={`td-avail-chip ${candidate.available ? 'avail-yes' : 'avail-no'}`}>
                  <span className="td-avail-dot-inline" />
                  {candidate.available ? 'Available' : 'Engaged'}
                </span>
              </div>

              <div className="td-rate-box">
                <div className="td-rate-value">${candidate.rate}<span>/hr</span></div>
                <div className="td-rate-label">Hourly Rate</div>
              </div>

              <div className="td-match-row">
                <Star size={14} className="td-star" />
                <span><strong>{candidate.match}% match</strong> with your profile</span>
              </div>

              <button
                className="td-hire-btn"
                id="hire-now-btn"
                onClick={() => navigate(`/employer/hire/${candidate.id}`)}
              >
                👉 Hire Now
              </button>
            </div>

            {/* Education & Availability */}
            <div className="td-card td-side-card">
              <h3 className="td-section-title">Details</h3>
              <div className="td-detail-row">
                <Clock size={14} className="td-detail-icon" />
                <div>
                  <div className="td-detail-label">Availability</div>
                  <div className="td-detail-val">{candidate.availability}</div>
                </div>
              </div>
              <div className="td-detail-row">
                <ExternalLink size={14} className="td-detail-icon" />
                <div>
                  <div className="td-detail-label">Education</div>
                  <div className="td-detail-val">{candidate.education}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="td-details-col">
            {/* Bio */}
            <div className="td-card">
              <h2 className="td-section-title">About</h2>
              <p className="td-bio">{candidate.bio}</p>
            </div>

            {/* Skills */}
            <div className="td-card">
              <h2 className="td-section-title">Skills</h2>
              <div className="td-skills">
                {candidate.skills.map((s) => (
                  <span key={s} className="td-skill">{s}</span>
                ))}
              </div>
            </div>

            {/* Portfolio / Highlights */}
            <div className="td-card">
              <h2 className="td-section-title">Key Achievements</h2>
              <ul className="td-portfolio-list">
                {candidate.portfolio.map((item, i) => (
                  <li key={i} className="td-portfolio-item">
                    <CheckCircle size={15} className="td-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA footer */}
            <div className="td-cta-bar">
              <div className="td-cta-info">
                <div className="td-cta-name">{candidate.name}</div>
                <div className="td-cta-sub">Ready to bring this talent on board?</div>
              </div>
              <button
                className="td-hire-btn td-hire-btn--bar"
                onClick={() => navigate(`/employer/hire/${candidate.id}`)}
              >
                👉 Hire Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
