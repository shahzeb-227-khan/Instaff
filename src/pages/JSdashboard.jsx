import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  LayoutGrid, TrendingUp, Users, Calendar, FileText,
  ArrowLeftRight, Rocket, Wallet, Clock, CheckCircle2,
  History, MoreHorizontal,
} from 'lucide-react';
import {
  jsStats, jsEarningsData, jsDistributionData,
  jsHeatmapData, jsActivity, jsNavLinks,
} from '../data/dashboardData';
import './JSdashboard.css';

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
    <aside className="jsd-sidebar">
      <div className="jsd-sidebar__brand">
        <span className="jsd-sidebar__brand-icon"><LayoutGrid size={20} /></span>
        <div>
          <div className="jsd-sidebar__brand-name">Management</div>
          <div className="jsd-sidebar__brand-sub">PROFESSIONAL LEDGER</div>
        </div>
      </div>

      <nav className="jsd-sidebar__nav">
        {jsNavLinks.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`jsd-sidebar__link ${active === id ? 'jsd-sidebar__link--active' : ''}`}
            onClick={() => setActive(id)}
          >
            {NAV_ICONS[icon]}
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button
        className="jsd-sidebar__switch"
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
  rocket:  <Rocket      size={20} />,
  wallet:  <Wallet      size={20} />,
  clock:   <Clock       size={20} />,
  check:   <CheckCircle2 size={20} />,
};

const StatCard = ({ stat }) => (
  <div className="jsd-stat-card">
    <div className="jsd-stat-card__header">
      <span className="jsd-stat-card__label">{stat.label}</span>
      <span className="jsd-stat-card__icon">{STAT_ICONS[stat.icon]}</span>
    </div>
    <div className="jsd-stat-card__body">
      {stat.id === 'earnings' ? (
        <>
          <span className="jsd-stat-card__value jsd-stat-card__value--money">
            ${stat.value.toLocaleString()}
          </span>
          <span className="jsd-stat-card__sub">{stat.tag}</span>
        </>
      ) : (
        <>
          <span className="jsd-stat-card__value">{stat.value}</span>
          {stat.id === 'active' && (
            <span className="jsd-stat-card__tag">{stat.tag}</span>
          )}
          {stat.id === 'hours' && (
            <span className="jsd-stat-card__unit">{stat.tag}</span>
          )}
          {stat.id === 'completed' && (
            <span className="jsd-stat-card__sub">{stat.tag}</span>
          )}
        </>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  Heatmap
// ─────────────────────────────────────────────
const INTENSITY_COLORS = ['#e2e8f0', '#bfdbfe', '#93c5fd', '#3b82f6', '#1e3a8a'];

const Heatmap = ({ data }) => (
  <div className="jsd-heatmap">
    {data.map((week, wi) => (
      <div key={wi} className="jsd-heatmap__row">
        {week.map((val, di) => (
          <div
            key={di}
            className="jsd-heatmap__cell"
            style={{ background: INTENSITY_COLORS[val] }}
            title={`Week ${wi + 1}, Day ${di + 1}: Intensity ${val}`}
          />
        ))}
      </div>
    ))}
    <div className="jsd-heatmap__legend">
      <span>LOW INTENSITY</span>
      <div className="jsd-heatmap__legend-swatches">
        {INTENSITY_COLORS.map((c, i) => (
          <span key={i} style={{ background: c }} className="jsd-heatmap__swatch" />
        ))}
      </div>
      <span>HIGH PEAK</span>
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  Diamond / Donut chart label
// ─────────────────────────────────────────────
const DiamondLabel = ({ cx, cy, total }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
    <tspan x={cx} dy="-0.3em" className="jsd-donut-label-val" style={{ fontSize: 22, fontWeight: 700, fill: '#0f172a' }}>{total}</tspan>
    <tspan x={cx} dy="1.4em" style={{ fontSize: 11, fill: '#475569', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>TOTAL</tspan>
  </text>
);

// ─────────────────────────────────────────────
//  Activity Feed
// ─────────────────────────────────────────────
const ActivityFeed = () => (
  <aside className="jsd-activity">
    <div className="jsd-activity__header">
      <span className="jsd-activity__title">Recent Activity</span>
      <History size={18} className="jsd-activity__icon" />
    </div>
    <ul className="jsd-activity__list">
      {jsActivity.map((item) => (
        <li key={item.id} className="jsd-activity__item">
          <span className="jsd-activity__dot" style={{ background: item.color }} />
          <div>
            <div className="jsd-activity__time">{item.time}</div>
            <p className="jsd-activity__text">
              {item.text}
              {item.highlight && (
                <strong style={{ color: item.id === 1 ? '#1e3a8a' : undefined }}>{item.highlight}</strong>
              )}
              {item.rest}
              {item.status && <span style={{ color: '#1e3a8a', fontWeight: 600 }}>{item.status}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
    <button className="jsd-activity__cta">VIEW FULL LOG</button>
  </aside>
);

// ─────────────────────────────────────────────
//  Main Dashboard
// ─────────────────────────────────────────────
const TABS = ['Overview', 'Active Projects', 'Applications'];

const JSdashboard = () => {
  const [activeNav, setActiveNav] = useState('overview');
  const [activeTab, setActiveTab] = useState('Overview');

  const total = jsDistributionData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="jsd-layout">
      <Sidebar active={activeNav} setActive={setActiveNav} />

      <div className="jsd-main">
        {/* Header */}
        <header className="jsd-header">
          <h1 className="jsd-header__title">My Dashboard</h1>
          <p className="jsd-header__sub">Track your projects, applications and earnings.</p>
        </header>

        {/* Stat Cards */}
        <div className="jsd-stats-row">
          {jsStats.map((s) => <StatCard key={s.id} stat={s} />)}
        </div>

        <div className="jsd-content-row">
          {/* Left column */}
          <div className="jsd-content-main">
            {/* Tabs */}
            <div className="jsd-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={activeTab === t}
                  className={`jsd-tab ${activeTab === t ? 'jsd-tab--active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Charts row */}
            <div className="jsd-charts-row">
              {/* Earnings bar chart */}
              <div className="jsd-chart-card">
                <div className="jsd-chart-card__header">
                  <div>
                    <div className="jsd-chart-card__title">Earnings Overview</div>
                  </div>
                  <span className="jsd-chart-card__period">JAN — APR</span>
                </div>
                <ResponsiveContainer width="100%" height={170}>
                  <BarChart data={jsEarningsData} barSize={28}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }} />
                    <YAxis hide />
                    <Tooltip
                      formatter={(v) => [`$${v.toLocaleString()}`, 'Earnings']}
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {jsEarningsData.map((_, i) => (
                        <Cell key={i} fill={i === jsEarningsData.length - 1 ? '#1e3a8a' : '#93c5fd'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Project Distribution donut */}
              <div className="jsd-chart-card">
                <div className="jsd-chart-card__header">
                  <div className="jsd-chart-card__title">Project Distribution</div>
                  <MoreHorizontal size={18} style={{ color: '#94a3b8' }} />
                </div>
                <div className="jsd-donut-wrap">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={jsDistributionData}
                        cx="50%" cy="50%"
                        innerRadius={52} outerRadius={72}
                        paddingAngle={3}
                        dataKey="value"
                        startAngle={90} endAngle={-270}
                      >
                        {jsDistributionData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                        <DiamondLabel cx="50%" cy="50%" total={total} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="jsd-donut-legend">
                  {jsDistributionData.map((d) => (
                    <span key={d.name} className="jsd-donut-legend__item">
                      <span className="jsd-donut-legend__dot" style={{ background: d.color }} />
                      {d.name} ({d.value})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Workload Heatmap */}
            <div className="jsd-heatmap-card">
              <div className="jsd-heatmap-card__header">
                <div>
                  <div className="jsd-chart-card__title">Workload Intensity</div>
                  <p className="jsd-heatmap-card__sub">Heatmap of hours logged across the previous 4 weeks.</p>
                </div>
                <button className="jsd-heatmap-card__link">View Log</button>
              </div>
              <Heatmap data={jsHeatmapData} />
            </div>
          </div>

          {/* Right Activity Panel */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default JSdashboard;
