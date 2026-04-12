import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
import './FindTalent.css';

/* ── Static candidate data ── */
const CANDIDATES = [
  { id:1,  name:'Aisha Rahman',    role:'Senior Frontend Engineer',    location:'Remote',          available:true,  match:97, skills:['React','TypeScript','CSS'],          exp:'Senior', rate:48  },
  { id:2,  name:'Carlos Méndez',   role:'Full-Stack Developer',         location:'New York, NY',    available:true,  match:91, skills:['Node.js','React','PostgreSQL'],       exp:'Mid',    rate:55  },
  { id:3,  name:'Lin Wei',         role:'Data Scientist',               location:'San Francisco',   available:false, match:88, skills:['Python','ML','TensorFlow'],           exp:'Senior', rate:72  },
  { id:4,  name:'Priya Sharma',    role:'Product Designer',             location:'Remote',          available:true,  match:85, skills:['Figma','UX Research','Prototyping'],  exp:'Mid',    rate:42  },
  { id:5,  name:'James O\'Brien',  role:'DevOps / Cloud Engineer',      location:'Austin, TX',      available:true,  match:93, skills:['AWS','Kubernetes','Terraform'],        exp:'Senior', rate:80  },
  { id:6,  name:'Fatima Al-Zahra', role:'Backend Engineer',             location:'Remote',          available:true,  match:79, skills:['Go','gRPC','PostgreSQL'],              exp:'Junior', rate:38  },
  { id:7,  name:'Samuel Torres',   role:'Mobile Developer (iOS)',       location:'Miami, FL',       available:false, match:82, skills:['Swift','UIKit','SwiftUI'],             exp:'Mid',    rate:58  },
  { id:8,  name:'Mei Tanaka',      role:'AI / ML Engineer',             location:'Seattle, WA',     available:true,  match:96, skills:['PyTorch','LLMs','Python'],             exp:'Senior', rate:95  },
  { id:9,  name:'Elias Novak',     role:'Security Engineer',            location:'Remote',          available:true,  match:88, skills:['Pentesting','SIEM','Zero Trust'],      exp:'Senior', rate:75  },
  { id:10, name:'Zara Khan',       role:'Engineering Manager',          location:'Chicago, IL',     available:true,  match:90, skills:['Leadership','Agile','React'],          exp:'Lead',   rate:110 },
  { id:11, name:'David Park',      role:'QA / Automation Engineer',     location:'Remote',          available:false, match:76, skills:['Selenium','Cypress','Jest'],           exp:'Mid',    rate:36  },
  { id:12, name:'Nina Okafor',     role:'UI Developer',                 location:'London (Remote)', available:true,  match:84, skills:['Vue.js','CSS','Accessibility'],        exp:'Mid',    rate:45  },
];

const AVATAR_COLORS = [
  ['#d8e2ff','#003f8b'],['#b6f2af','#1c5120'],['#ffdea8','#583d00'],
  ['#ffdad6','#93000a'],['#adc6ff','#003f8b'],['#9bd595','#1c5120'],
  ['#ffba20','#583d00'],['#d8e2ff','#2557a7'],['#b6f2af','#356a35'],
  ['#ffdea8','#765300'],['#e4e2e1','#434751'],['#d8e2ff','#003f8b'],
];

const EXP_LEVELS  = ['Junior','Mid','Senior','Lead'];
const RATE_MAX    = 120;

function matchBadgeClass(score) {
  if (score >= 90) return 'match-badge match-badge--gold';
  if (score >= 80) return 'match-badge match-badge--blue';
  return 'match-badge match-badge--grey';
}

export default function FindTalent() {
  const navigate = useNavigate();

  const [keyword,   setKeyword]   = useState('');
  const [availOnly, setAvailOnly] = useState(false);
  const [expFilter, setExpFilter] = useState([]);
  const [maxRate,   setMaxRate]   = useState(RATE_MAX);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  /* HCI: Visibility of system status — debounced search feedback */
  const triggerSearch = () => {
    setIsSearching(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setIsSearching(false), 400);
  };

  const handleKeywordChange = (e) => { setKeyword(e.target.value); triggerSearch(); };

  const toggleExp = (val) =>
    setExpFilter((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );

  const results = useMemo(() => {
    return CANDIDATES.filter((c) => {
      if (availOnly && !c.available) return false;
      if (expFilter.length && !expFilter.includes(c.exp)) return false;
      if (c.rate > maxRate) return false;
      if (keyword.trim()) {
        const kw = keyword.toLowerCase();
        return (
          c.name.toLowerCase().includes(kw) ||
          c.role.toLowerCase().includes(kw) ||
          c.skills.some((s) => s.toLowerCase().includes(kw))
        );
      }
      return true;
    });
  }, [keyword, availOnly, expFilter, maxRate]);

  return (
    <div className="ft-root">
      <EmployerNavbar />

      <div className="ft-layout">
        {/* ── SIDEBAR ── */}
        <aside className="ft-sidebar">
          <div className="ft-sidebar__header">
            <span className="ft-sidebar__title">Filters</span>
            <button
              className="ft-sidebar__clear"
              onClick={() => { setAvailOnly(false); setExpFilter([]); setMaxRate(RATE_MAX); setKeyword(''); }}
            >
              Clear all
            </button>
          </div>

          {/* Available now */}
          <div className="ft-filter-group">
            <label className="ft-toggle-label">
              <span>Available now</span>
              <div
                className={`ft-toggle ${availOnly ? 'ft-toggle--on' : ''}`}
                onClick={() => setAvailOnly(!availOnly)}
                role="switch"
                aria-checked={availOnly}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setAvailOnly(!availOnly)}
              >
                <div className="ft-toggle__thumb" />
              </div>
            </label>
          </div>

          {/* Experience */}
          <div className="ft-filter-group">
            <p className="ft-filter-group__label">Experience Level</p>
            {EXP_LEVELS.map((lvl) => (
              <label key={lvl} className="ft-checkbox-label">
                <input
                  type="checkbox"
                  checked={expFilter.includes(lvl)}
                  onChange={() => toggleExp(lvl)}
                  className="ft-checkbox"
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div>

          {/* Hourly Rate */}
          <div className="ft-filter-group">
            <p className="ft-filter-group__label">Max Hourly Rate</p>
            <div className="ft-salary-display">${maxRate}/hr</div>
            <input
              type="range"
              min={30}
              max={RATE_MAX}
              step={5}
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="ft-range"
              aria-label="Maximum hourly rate"
            />
            <div className="ft-range-labels"><span>$30</span><span>$120</span></div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="ft-main">
          {/* Search */}
          <div className="ft-search-wrap">
            <label htmlFor="ft-search" className="sr-only">Search talent</label>
            <svg className="ft-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="#737783" strokeWidth="1.8"/>
              <path d="M13 13l3.5 3.5" stroke="#737783" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              id="ft-search"
              className="ft-search"
              placeholder="Search by name, role, or skill…"
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>

          <div className="ft-main-header">
            <h1 className="ft-main-header__title">Browse Available Talent</h1>
            {/* HCI: Visibility of system status — live search feedback */}
            {isSearching ? (
              <span className="ft-status ft-status--searching" role="status" aria-live="polite">
                <span className="ft-spinner" aria-hidden="true" />
                Searching…
              </span>
            ) : (
              <span className="ft-status" role="status" aria-live="polite">
                {results.length} professional{results.length !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          {results.length > 0 ? (
            <div className="ft-grid">
              {results.map((c, i) => {
                const [bg, fg] = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <article key={c.id} className="ft-card" aria-label={`${c.name}, ${c.role}`}>
                    <span className={matchBadgeClass(c.match)} aria-label={`Match ${c.match}%`}>
                      {c.match}% match
                    </span>

                    <div className="ft-card__avatar" style={{ background: bg, color: fg }}>
                      {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>

                    <h2 className="ft-card__name">{c.name}</h2>
                    <p className="ft-card__role">{c.role}</p>

                    <div className="ft-card__meta">
                      <span className="ft-chip ft-chip--location">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.2"/>
                          <circle cx="6" cy="4.5" r="1" fill="currentColor"/>
                        </svg>
                        {c.location}
                      </span>
                      <span className={`ft-chip ${c.available ? 'ft-chip--avail' : 'ft-chip--busy'}`}>
                        <span className={`ft-dot ${c.available ? 'ft-dot--green' : 'ft-dot--grey'}`} />
                        {c.available ? 'Available' : 'Engaged'}
                      </span>
                      <span className="ft-chip ft-chip--location">${c.rate}/hr</span>
                    </div>

                    <div className="ft-card__skills">
                      {c.skills.map((s) => (
                        <span key={s} className="ft-skill-chip">{s}</span>
                      ))}
                    </div>

                    <button
                      className="ft-card__btn"
                      onClick={() => navigate(`/employer/talent-detail/${c.id}`)}
                    >
                      View Details
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="ft-empty">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="30" stroke="#c3c6d3" strokeWidth="2"/>
                <path d="M20 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#c3c6d3" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="32" cy="24" r="6" stroke="#c3c6d3" strokeWidth="2"/>
              </svg>
              <h3>No talent matched your filters</h3>
              <p>Try adjusting your search or clearing filters.</p>
              <button
                className="ft-empty__reset"
                onClick={() => { setKeyword(''); setAvailOnly(false); setExpFilter([]); setMaxRate(RATE_MAX); }}
              >
                Reset filters
              </button>
            </div>
          )}
        </main>
      </div>

      <EmployerFooter />
    </div>
  );
}
