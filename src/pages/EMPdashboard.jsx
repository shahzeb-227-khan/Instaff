import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area,
} from 'recharts';
import {
  LayoutGrid, TrendingUp, Users, Calendar, FileText,
  ArrowLeftRight, Zap, Briefcase, Leaf, UserCircle2,
  AlertTriangle, CheckCircle2,
} from 'lucide-react';
import {
  empStats, empUtilizationData, empCostData,
  empHeatmapData, empDeptLabels, empShiftLabels, empAlerts, jsNavLinks,
} from '../data/dashboardData';
import './EMPdashboard.css';

// ─────────────────────────────────────────────
//  Sidebar
// ─────────────────────────────────────────────
const NAV_ICONS = {
  grid:     <LayoutGrid size={18} />,
  trending: <TrendingUp size={18} />,
  users:    <Users      size={18} />,
  calendar: <Calendar   size={18} />,
  file:     <FileText   size={18} />,
};

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  return (
    <aside className="empd-sidebar">
      <div className="empd-sidebar__brand">
        <span className="empd-sidebar__brand-icon"><LayoutGrid size={20} /></span>
        <div>
          <div className="empd-sidebar__brand-name">Management</div>
          <div className="empd-sidebar__brand-sub">Professional Ledger</div>
        </div>
      </div>

      <nav className="empd-sidebar__nav">
        {jsNavLinks.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`empd-sidebar__link ${active === id ? 'empd-sidebar__link--active' : ''}`}
            onClick={() => setActive(id)}
          >
            {NAV_ICONS[icon]}
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button
        className="empd-sidebar__switch"
        onClick={() => navigate('/')}
      >
        <ArrowLeftRight size={15} />
        Switch Role
      </button>
    </aside>
  );
};

// ─────────────────────────────────────────────
//  Stat Cards
// ─────────────────────────────────────────────
const STAT_ICONS = {
  users:     <Users     size={20} />,
  leaf:      <Leaf      size={20} />,
  briefcase: <Briefcase size={20} />,
  zap:       <Zap       size={20} />,
};

// Mini bar chart for utilization card
const MiniBarChart = () => (
  <div className="empd-mini-bars">
    {[30, 50, 70, 55, 87].map((h, i) => (
      <div
        key={i}
        className="empd-mini-bar"
        style={{
          height: `${h * 0.32}px`,
          background: i === 4 ? '#1e3a8a' : '#bfdbfe',
        }}
      />
    ))}
  </div>
);

// Avatar stack for active jobs card
const AvatarStack = () => {
  const colors = ['#1e3a8a', '#475569', '#7c3aed'];
  return (
    <div className="empd-avatar-stack">
      {colors.map((c, i) => (
        <span
          key={i}
          className="empd-avatar"
          style={{ background: c, zIndex: colors.length - i }}
        >
          <UserCircle2 size={16} color="white" />
        </span>
      ))}
    </div>
  );
};

const StatCard = ({ stat }) => (
  <div className="empd-stat-card">
    <div className="empd-stat-card__top">
      <span className="empd-stat-card__icon">{STAT_ICONS[stat.icon]}</span>
      <span
        className="empd-stat-card__badge"
        style={{ color: stat.id === 'activejobs' ? '#16a34a' : stat.id === 'utilization' ? '#dc2626' : stat.id === 'savings' ? '#1e3a8a' : '#1e3a8a' }}
      >
        {stat.badge}
      </span>
    </div>
    <div className="empd-stat-card__value-row">
      <span className={`empd-stat-card__value ${stat.id === 'savings' ? 'empd-stat-card__value--money' : ''}`}>
        {stat.value}
      </span>
    </div>
    <div className="empd-stat-card__label">{stat.label}</div>

    {/* Sub elements */}
    {stat.chips.length > 0 && (
      <div className="empd-stat-card__chips">
        {stat.chips.map((c) => (
          <span key={c} className="empd-stat-card__chip">{c}</span>
        ))}
      </div>
    )}
    {stat.sub === 'progress' && (
      <div className="empd-stat-card__progress-wrap">
        <div className="empd-stat-card__progress-bar">
          <div className="empd-stat-card__progress-fill" style={{ width: '72%' }} />
        </div>
      </div>
    )}
    {stat.sub === 'avatars' && <AvatarStack />}
    {stat.sub === 'minibarchart' && <MiniBarChart />}
  </div>
);

// ─────────────────────────────────────────────
//  Heatmap (Workforce Density)
// ─────────────────────────────────────────────
const INTENSITY_COLORS = ['#e2e8f0', '#c7d2fe', '#818cf8', '#4f46e5', '#1e3a8a'];

const WorkforceDensity = ({ data, rowLabels, colLabels }) => (
  <div className="empd-density">
    <div className="empd-density__col-labels">
      <span className="empd-density__dept-spacer" />
      {colLabels.map((l) => (
        <span key={l} className="empd-density__col-label">{l}</span>
      ))}
    </div>
    {data.map((row, ri) => (
      <div key={ri} className="empd-density__row">
        <span className="empd-density__row-label">{rowLabels[ri]}</span>
        {row.map((val, ci) => (
          <div
            key={ci}
            className="empd-density__cell"
            style={{ background: INTENSITY_COLORS[val] }}
            title={`${rowLabels[ri]} / ${colLabels[ci]}: ${val}`}
          />
        ))}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
//  Active Intelligence Panel
// ─────────────────────────────────────────────
const IntelligencePanel = () => (
  <div className="empd-intel">
    <div className="empd-intel__header">
      <span className="empd-intel__title">Active Intelligence</span>
      <span className="empd-intel__dot" />
    </div>
    {empAlerts.map((a) => (
      <div key={a.id} className={`empd-intel__alert empd-intel__alert--${a.type}`}>
        <span className={`empd-intel__alert-icon empd-intel__alert-icon--${a.type}`}>
          {a.type === 'warning' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
        </span>
        <div>
          <div className="empd-intel__alert-title">{a.title}</div>
          <div className="empd-intel__alert-desc">{a.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
//  Main Dashboard
// ─────────────────────────────────────────────
const TABS = ['Overview', 'Job Posts', 'Hired Employees'];

const EMPdashboard = () => {
  const [activeNav, setActiveNav] = useState('overview');
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="empd-layout">
      <Sidebar active={activeNav} setActive={setActiveNav} />

      <div className="empd-main">
        {/* Header */}
        <header className="empd-header">
          <span className="empd-header__badge">EMPLOYER DASHBOARD</span>
          <h1 className="empd-header__title">My Workspace</h1>
          <div className="empd-header__bottom">
            <p className="empd-header__sub">
              Manage your workforce and track collaboration with high-fidelity analytics.
            </p>
            {/* Tabs inline with header */}
            <div className="empd-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={activeTab === t}
                  className={`empd-tab ${activeTab === t ? 'empd-tab--active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Stat Cards */}
        <div className="empd-stats-row">
          {empStats.map((s) => <StatCard key={s.id} stat={s} />)}
        </div>

        {/* Charts Row */}
        <div className="empd-charts-row">
          {/* Workforce Utilization — grouped bar */}
          <div className="empd-chart-card">
            <div className="empd-chart-card__header">
              <div className="empd-chart-card__accent-bar" />
              <span className="empd-chart-card__title">Workforce Utilization</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={empUtilizationData} barGap={4} barSize={22}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                />
                <Bar dataKey="internal" name="Internal" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="shared"   name="Shared"   fill="#1e3a8a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="empd-chart-legend">
              <span className="empd-chart-legend__item"><span className="empd-chart-legend__dot" style={{ background: '#cbd5e1' }} />Internal</span>
              <span className="empd-chart-legend__item"><span className="empd-chart-legend__dot" style={{ background: '#1e3a8a' }} />Shared</span>
            </div>
          </div>

          {/* Cost Over Time — area chart */}
          <div className="empd-chart-card">
            <div className="empd-chart-card__header">
              <div className="empd-chart-card__accent-bar" style={{ background: '#f59e0b' }} />
              <span className="empd-chart-card__title">Cost Over Time</span>
              <span className="empd-chart-card__pill">FISCAL YEAR 2024</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={empCostData}>
                <defs>
                  <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }} />
                <YAxis hide />
                <Tooltip
                  formatter={(v) => [`$${v}K`, 'Cost']}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="url(#costGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#f59e0b', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workforce Density + Intelligence Panel */}
        <div className="empd-bottom-row">
          <div className="empd-density-card">
            <div className="empd-chart-card__header">
              <div className="empd-chart-card__accent-bar" />
              <span className="empd-chart-card__title">Workforce Density</span>
            </div>
            <p className="empd-density-card__sub">Resource allocation by department and shift intensity.</p>
            <WorkforceDensity
              data={empHeatmapData}
              rowLabels={empDeptLabels}
              colLabels={empShiftLabels}
            />
          </div>

          {/* Intelligence Panel — floating card */}
          <IntelligencePanel />
        </div>
      </div>
    </div>
  );
};

export default EMPdashboard;
