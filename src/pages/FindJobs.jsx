import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Search } from 'lucide-react';
import JobSeekerNavbar from '../components/JobSeekerNavbar';
import EmployerFooter  from '../components/EmployerFooter';
import './FindJobs.css';

/* ── Static job data ── */
export const JOBS = [
  { id:1,  title:'Senior React Developer',        company:'TechCorp Global',      location:'Remote / NYC',       salary:'$110k–$140k',  type:'Full-time',  exp:'Senior', skills:['React','TypeScript','Node.js'],            posted:'2 days ago'    },
  { id:2,  title:'Product Manager',               company:'Notion',               location:'San Francisco, CA',  salary:'$130k–$160k',  type:'Full-time',  exp:'Senior', skills:['Roadmapping','Agile','Analytics'],         posted:'1 day ago'     },
  { id:3,  title:'UI/UX Designer',               company:'Shopify',              location:'Remote',             salary:'$85k–$115k',   type:'Full-time',  exp:'Mid',    skills:['Figma','Prototyping','Design Systems'],    posted:'3 days ago'    },
  { id:4,  title:'DevOps Engineer',               company:'Stripe',               location:'Remote / Dublin',    salary:'$120k–$150k',  type:'Full-time',  exp:'Senior', skills:['AWS','Kubernetes','Terraform'],             posted:'5 hours ago'   },
  { id:5,  title:'Data Analyst',                  company:'Vercel',               location:'Remote',             salary:'$75k–$95k',    type:'Full-time',  exp:'Mid',    skills:['Python','SQL','Tableau'],                  posted:'1 week ago'    },
  { id:6,  title:'Backend Engineer (Go)',          company:'Cloudflare',           location:'Austin, TX',         salary:'$115k–$145k',  type:'Full-time',  exp:'Senior', skills:['Go','gRPC','PostgreSQL'],                  posted:'2 days ago'    },
  { id:7,  title:'iOS Developer',                 company:'Airbnb',               location:'San Francisco, CA',  salary:'$105k–$135k',  type:'Full-time',  exp:'Mid',    skills:['Swift','SwiftUI','CoreData'],               posted:'4 days ago'    },
  { id:8,  title:'Machine Learning Engineer',     company:'Hugging Face',         location:'Remote',             salary:'$140k–$180k',  type:'Full-time',  exp:'Senior', skills:['PyTorch','LLMs','Python'],                  posted:'6 hours ago'   },
  { id:9,  title:'Frontend Engineer (React)',     company:'Linear',               location:'Remote',             salary:'$95k–$125k',   type:'Full-time',  exp:'Mid',    skills:['React','CSS','TypeScript'],                 posted:'3 days ago'    },
  { id:10, title:'Marketing Manager',             company:'Buffer',               location:'Remote',             salary:'$80k–$105k',   type:'Full-time',  exp:'Mid',    skills:['SEO','Content','Analytics'],                posted:'1 week ago'    },
  { id:11, title:'QA Automation Engineer',        company:'Browserstack',         location:'Remote',             salary:'$70k–$90k',    type:'Contract',   exp:'Mid',    skills:['Selenium','Playwright','Jest'],              posted:'2 days ago'    },
  { id:12, title:'Technical Writer',              company:'GitLab',               location:'Remote',             salary:'$65k–$85k',    type:'Part-time',  exp:'Junior', skills:['Documentation','Markdown','APIs'],          posted:'5 days ago'    },
  { id:13, title:'Engineering Manager',           company:'Figma',                location:'San Francisco, CA',  salary:'$180k–$220k',  type:'Full-time',  exp:'Lead',   skills:['Leadership','React','System Design'],        posted:'8 hours ago'   },
  { id:14, title:'Security Engineer',             company:'1Password',            location:'Remote',             salary:'$120k–$155k',  type:'Full-time',  exp:'Senior', skills:['Pentesting','OWASP','Cryptography'],        posted:'3 days ago'    },
  { id:15, title:'Android Developer',             company:'Duolingo',             location:'Pittsburgh, PA',     salary:'$100k–$130k',  type:'Full-time',  exp:'Mid',    skills:['Kotlin','Jetpack Compose','Firebase'],      posted:'1 week ago'    },
];

const TYPES = ['Full-time','Part-time','Contract','Freelance'];
const EXPS  = ['Junior','Mid','Senior','Lead'];
const SALARY_RANGES = [
  { label:'Any',        min:0,      max:999999 },
  { label:'$0–$80k',   min:0,      max:80000  },
  { label:'$80k–$120k',min:80000,  max:120000 },
  { label:'$120k–$160k',min:120000,max:160000 },
  { label:'$160k+',    min:160000, max:999999 },
];

/* Parse min salary from string like "$110k–$140k" */
const parseSalary = (s) => {
  const m = s.match(/\$(\d+)k/);
  return m ? parseInt(m[1], 10) * 1000 : 0;
};

const accentColor = (i) => {
  const palette = ['#003f8b','#356a35','#583d00','#7c3aed','#0891b2','#c2410c'];
  return palette[i % palette.length];
};

export default function FindJobs() {
  const navigate = useNavigate();

  const [keyword,    setKeyword]    = useState('');
  const [location,   setLocation]   = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const [expFilter,  setExpFilter]  = useState([]);
  const [salaryIdx,  setSalaryIdx]  = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  /* HCI: Visibility of system status — debounced search feedback */
  const triggerSearch = () => {
    setIsSearching(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setIsSearching(false), 400);
  };

  const handleKeywordChange = (e) => { setKeyword(e.target.value); triggerSearch(); };
  const handleLocationChange = (e) => { setLocation(e.target.value); triggerSearch(); };

  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const salaryRange = SALARY_RANGES[salaryIdx];

  const results = useMemo(() => {
    return JOBS.filter((j) => {
      const kw = keyword.trim().toLowerCase();
      if (kw && !j.title.toLowerCase().includes(kw) &&
                !j.company.toLowerCase().includes(kw) &&
                !j.skills.some((s) => s.toLowerCase().includes(kw))) return false;
      if (location.trim() && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (typeFilter.length && !typeFilter.includes(j.type)) return false;
      if (expFilter.length  && !expFilter.includes(j.exp))  return false;
      const min = parseSalary(j.salary);
      if (min < salaryRange.min || min > salaryRange.max)    return false;
      return true;
    });
  }, [keyword, location, typeFilter, expFilter, salaryIdx]);

  const clearAll = () => {
    setKeyword(''); setLocation(''); setTypeFilter([]); setExpFilter([]); setSalaryIdx(0);
  };

  return (
    <div className="fj-root">
      <JobSeekerNavbar />

      {/* ── Search bar ── */}
      <div className="fj-search-bar">
        <div className="fj-search-bar__inner">
          <div className="fj-search-group">
            <Search size={17} className="fj-search-ico" />
            <input
              className="fj-search-input"
              placeholder="Job title, company, or skill…"
              value={keyword}
              onChange={handleKeywordChange}
              aria-label="Search jobs"
            />
          </div>
          <div className="fj-divider" />
          <div className="fj-search-group">
            <MapPin size={17} className="fj-search-ico" />
            <input
              className="fj-search-input"
              placeholder="Location or Remote"
              value={location}
              onChange={handleLocationChange}
              aria-label="Filter by location"
            />
          </div>
          <button className="fj-search-btn" onClick={() => {}}>Search Jobs</button>
        </div>
      </div>

      <div className="fj-layout">
        {/* ── Sidebar ── */}
        <aside className="fj-sidebar">
          <div className="fj-sidebar__hd">
            <span className="fj-sidebar__title">Filters</span>
            <button className="fj-sidebar__clear" onClick={clearAll}>Clear all</button>
          </div>

          {/* Job type */}
          <div className="fj-filter-group">
            <p className="fj-filter-label">Job Type</p>
            {TYPES.map((t) => (
              <label key={t} className="fj-checkbox-label">
                <input type="checkbox" className="fj-checkbox"
                  checked={typeFilter.includes(t)}
                  onChange={() => toggleArr(typeFilter, setTypeFilter, t)} />
                <span>{t}</span>
              </label>
            ))}
          </div>

          {/* Experience */}
          <div className="fj-filter-group">
            <p className="fj-filter-label">Experience Level</p>
            {EXPS.map((e) => (
              <label key={e} className="fj-checkbox-label">
                <input type="checkbox" className="fj-checkbox"
                  checked={expFilter.includes(e)}
                  onChange={() => toggleArr(expFilter, setExpFilter, e)} />
                <span>{e}</span>
              </label>
            ))}
          </div>

          {/* Salary */}
          <div className="fj-filter-group">
            <p className="fj-filter-label">Salary Range</p>
            {SALARY_RANGES.map((r, i) => (
              <label key={r.label} className="fj-radio-label">
                <input type="radio" className="fj-radio"
                  checked={salaryIdx === i}
                  onChange={() => setSalaryIdx(i)} />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="fj-main">
          <div className="fj-main-hd">
            <h1 className="fj-main-title">Browse Job Listings</h1>
            {/* HCI: Visibility of system status — live search feedback */}
            {isSearching ? (
              <span className="fj-status fj-status--searching" role="status" aria-live="polite">
                <span className="fj-spinner" aria-hidden="true" />
                Searching…
              </span>
            ) : (
              <span className="fj-status" role="status" aria-live="polite">
                {results.length} job{results.length !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          {results.length > 0 ? (
            <div className="fj-list">
              {results.map((job, i) => (
                <article key={job.id} className="fj-card" aria-label={`${job.title} at ${job.company}`}>
                  {/* Left accent bar */}
                  <div className="fj-card__bar" style={{ background: accentColor(i) }} />

                  <div className="fj-card__logo" style={{ background: accentColor(i) }}>
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="fj-card__body">
                    <div className="fj-card__top">
                      <div>
                        <h2 className="fj-card__title">{job.title}</h2>
                        <p className="fj-card__company">{job.company}</p>
                      </div>
                      <div className="fj-card__salary">{job.salary}</div>
                    </div>

                    <div className="fj-card__meta">
                      <span className="fj-chip fj-chip--loc"><MapPin size={11}/> {job.location}</span>
                      <span className="fj-chip fj-chip--type"><Clock size={11}/> {job.type}</span>
                      <span className="fj-chip fj-chip--exp">{job.exp}</span>
                      <span className="fj-chip fj-chip--time">{job.posted}</span>
                    </div>

                    <div className="fj-card__skills">
                      {job.skills.map((s) => <span key={s} className="fj-skill">{s}</span>)}
                    </div>
                  </div>

                  <button
                    className="fj-card__btn"
                    onClick={() => navigate(`/job-seeker/job-detail/${job.id}`)}
                  >
                    View Details
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="fj-empty">
              <div className="fj-empty__icon" aria-hidden="true">🔍</div>
              <p className="fj-empty__title">No jobs match your filters</p>
              <p className="fj-empty__sub">Try adjusting your search terms or removing a filter.</p>
              <button className="fj-empty__btn" onClick={clearAll}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>

      <EmployerFooter />
    </div>
  );
}
