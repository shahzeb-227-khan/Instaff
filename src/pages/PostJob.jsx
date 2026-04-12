import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import './PostJob.css';
import { ArrowLeft, ChevronDown, MapPin, X, Plus, BadgeCheck, Lightbulb, TrendingUp } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(['React.js', 'Tailwind CSS', 'TypeScript']);
  const [newSkill, setNewSkill] = useState('');
  const [description, setDescription] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    navigate('/success');
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="post-job-page">
      <Navbar />

      <main className="main-canvas flex-layout">
        {/* Left Column: Form */}
        <div className="form-column flex-1">
          {/* Breadcrumb and Back */}
          <div className="breadcrumb-nav">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} className="icon-mr" /> Back
            </button>
            <div className="vertical-divider"></div>
            <nav className="breadcrumbs text-on-surface-variant uppercase text-xs font-label opacity-60">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span className="text-primary">Post a New Job</span>
            </nav>
          </div>

          <header className="page-header">
            <h1 className="headline-lg font-extrabold text-on-surface">Post A New Job</h1>
            <p className="text-on-surface-variant font-body mt-2">Craft a precise brief to attract the industry's top technical talent.</p>
          </header>

          <form className="job-form" onSubmit={handlePost}>
            {/* Core Details */}
            <section className="form-section gap-y-lg">
              <div className="grid-2-col">
                <div className="col-span-2">
                  <Input 
                    label="Job Title" 
                    id="jobTitle" 
                    placeholder="e.g. Senior Systems Architect" 
                    required 
                  />
                </div>
                <div>
                  <label className="input-label">Job Type</label>
                  <div className="relative-container select-wrapper">
                    <select className="input-field select-field" required>
                      <option>Full-time Contract</option>
                      <option>Part-time</option>
                      <option>Fractional Leadership</option>
                      <option>Consulting</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="input-label">Location</label>
                  <div className="relative-container">
                    <input 
                      className="input-field pl-12" 
                      placeholder="Remote or City" 
                      required 
                    />
                    <MapPin className="absolute-icon left-icon text-primary" size={20} />
                  </div>
                </div>
              </div>
            </section>

            {/* Financials & Duration */}
            <section className="form-section bg-surface-low rounded-lg p-lg border-outline">
              <div className="grid-3-col">
                <Input label="Duration" id="duration" placeholder="6 Months" />
                <Input label="Min Budget (USD)" id="minBudget" type="number" placeholder="5,000" />
                <Input label="Max Budget (USD)" id="maxBudget" type="number" placeholder="12,000" />
              </div>
            </section>

            {/* Skills */}
            <section className="form-section gap-y-sm">
              <label className="input-label">Required Skills</label>
              <div className="skills-container bg-surface-lowest">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill} <X size={12} className="cursor-pointer" onClick={() => removeSkill(skill)} />
                  </span>
                ))}
                <button type="button" className="add-skill-btn">
                  <Plus size={14} /> Add Skill
                </button>
              </div>
            </section>

            {/* Description */}
            <section className="form-section gap-y-sm">
              <div className="flex-between">
                <label className="input-label">Job Description</label>
                <span className="text-10 font-label text-on-surface-variant opacity-50 uppercase">{description.length}/500 CHARACTERS</span>
              </div>
              <textarea 
                className="input-field textarea-field" 
                rows="6" 
                placeholder="Describe the mission, the tech stack, and the ideal candidate persona..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                required
              ></textarea>
            </section>
          </form>
        </div>

        {/* Right Column: Sidebar Panels */}
        <aside className="sidebar-panels w-80">
          <Card className="publishing-panel" highlightHover={true}>
            <h3 className="font-headline font-bold text-lg mb-4">Publishing</h3>
            <div className="flex-col gap-sm">
              <Button onClick={handlePost} style={{width: '100%'}}>Publish Job</Button>
              <Button variant="secondary" style={{width: '100%'}}>Preview Job</Button>
              <Button variant="tertiary" style={{width: '100%'}}>Save as Draft</Button>
            </div>
          </Card>

          <div className="financial-panel">
            <h3 className="font-headline font-bold text-lg mb-4">Financial Summary</h3>
            <div className="flex-col gap-md">
              <div className="flex-between text-sm">
                <span className="text-on-surface-variant">Job post fee</span>
                <span className="font-bold">3%</span>
              </div>
              <div className="flex-between text-sm">
                <span className="text-on-surface-variant">Platform fee</span>
                <span className="font-bold">5%</span>
              </div>
              <div className="cancel-anytime">
                <span className="font-label text-xs uppercase text-primary font-bold">Cancel Anytime</span>
                <BadgeCheck className="text-primary" size={16} />
              </div>
            </div>
          </div>

          <div className="posting-tips">
            <div className="tips-header">
               <Lightbulb className="text-tertiary" size={20} />
               <h3 className="font-headline font-bold text-sm tracking-widest uppercase text-tertiary">Posting Tips</h3>
            </div>
            <ul className="tips-list">
              <li>
                <div className="step-circle bg-tertiary-container-20">
                  <span className="text-10 text-tertiary font-bold">01</span>
                </div>
                <p className="text-xs text-on-surface-variant pl-3">Specific budget ranges attract 40% more qualified technical leads.</p>
              </li>
              <li>
                <div className="step-circle bg-tertiary-container-20">
                  <span className="text-10 text-tertiary font-bold">02</span>
                </div>
                <p className="text-xs text-on-surface-variant pl-3">List at least 5 required skills to filter for specialized expertise.</p>
              </li>
            </ul>
          </div>

          <div className="promotion-card glass-morphism">
             <div className="promotion-content position-z-10">
                <h4 className="font-bold mb-2">Need it faster?</h4>
                <p className="text-xs text-on-surface-variant mb-4">Promote your post to the top of "Find Work" for 48 hours.</p>
                <a href="#" className="boost-post-link items-center">
                  Boost Post <TrendingUp size={12} className="ml-1" />
                </a>
             </div>
             <div className="promotion-glow position-z-0"></div>
          </div>

        </aside>
      </main>
    </div>
  );
};

export default PostJob;
