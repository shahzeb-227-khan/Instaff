// ════════════════════════════════════════════
//  InStaff Dashboard Mock Data
// ════════════════════════════════════════════

// ── JOB SEEKER DASHBOARD ─────────────────────

export const jsStats = [
  { id: 'active',    label: 'ACTIVE PROJECTS',   value: 2,      tag: '+1 this week',  unit: '',    icon: 'rocket'   },
  { id: 'earnings',  label: 'MONTHLY EARNINGS',   value: 7200,   tag: 'Gross profit',  unit: '$',   icon: 'wallet'   },
  { id: 'hours',     label: 'HOURS THIS MONTH',   value: 156,    tag: 'h/mo',          unit: '',    icon: 'clock'    },
  { id: 'completed', label: 'COMPLETED',          value: 8,      tag: 'Past projects', unit: '',    icon: 'check'    },
];

export const jsEarningsData = [
  { month: 'JAN', amount: 4200 },
  { month: 'FEB', amount: 5100 },
  { month: 'MAR', amount: 6300 },
  { month: 'APR', amount: 7200 },
];

export const jsDistributionData = [
  { name: 'Active',    value: 2,  color: '#1e3a8a' },
  { name: 'Completed', value: 8,  color: '#93c5fd' },
];

// 4 weeks × 7 days workload intensity (0-4)
export const jsHeatmapData = [
  [0, 2, 0, 0, 3, 0, 1],
  [2, 0, 4, 0, 3, 2, 0],
  [0, 1, 0, 2, 0, 3, 1],
  [4, 0, 1, 0, 0, 2, 0],
];

export const jsActivity = [
  { id: 1, time: '2 HOURS AGO',  color: '#1e3a8a', text: 'Payment of ', highlight: '$2,400', rest: ' processed for Cloud Infrastructure Audit.' },
  { id: 2, time: '5 HOURS AGO',  color: '#b45309', text: 'New application received for Lead UI/UX Designer at Vertex Solutions.', highlight: '', rest: '' },
  { id: 3, time: 'YESTERDAY',    color: '#475569', text: 'Project milestone ', highlight: 'Phase 2: Database Migration', rest: ' marked as ', status: 'Completed.' },
  { id: 4, time: 'YESTERDAY',    color: '#475569', text: 'Contract signed: Q3 Frontend Development contract is now active.', highlight: '', rest: '' },
  { id: 5, time: '2 DAYS AGO',   color: '#475569', text: 'Review request: Global Tech Inc. left a 5-star review on your profile.', highlight: '', rest: '' },
];

export const jsNavLinks = [
  { id: 'overview',   label: 'Overview',         icon: 'grid'     },
  { id: 'analytics',  label: 'Analytics',         icon: 'trending' },
  { id: 'team',       label: 'Team Management',   icon: 'users'    },
  { id: 'schedule',   label: 'Schedule',          icon: 'calendar' },
  { id: 'documents',  label: 'Documents',         icon: 'file'     },
];

// ── EMPLOYER DASHBOARD ────────────────────────

export const empStats = [
  { id: 'workforce',    label: 'TOTAL WORKFORCE',  value: '15',   badge: '+12% vs last mo', badgeColor: '#1e3a8a', sub: null,           chips: ['13 Internal', '2 Shared'], icon: 'users'   },
  { id: 'savings',      label: 'COST SAVINGS',     value: '$35K', badge: 'Optimal Range',   badgeColor: '#1e3a8a', sub: 'progress',     chips: [],                          icon: 'leaf'    },
  { id: 'activejobs',   label: 'ACTIVE JOBS',      value: '3',    badge: 'Live',            badgeColor: '#16a34a', sub: 'avatars',      chips: [],                          icon: 'briefcase'},
  { id: 'utilization',  label: 'UTILIZATION RATE', value: '87%',  badge: 'Critical',        badgeColor: '#dc2626', sub: 'minibarchart', chips: [],                          icon: 'zap'     },
];

export const empUtilizationData = [
  { week: 'Wk 01', internal: 60, shared: 30 },
  { week: 'Wk 02', internal: 45, shared: 20 },
  { week: 'Wk 03', internal: 80, shared: 55 },
];

export const empCostData = [
  { month: 'JAN', cost: 22 },
  { month: 'FEB', cost: 30 },
  { month: 'MAR', cost: 26 },
  { month: 'APR', cost: 38 },
  { month: 'MAY', cost: 45 },
  { month: 'JUN', cost: 35 },
];

// Workforce density heatmap — rows = departments, cols = shifts
export const empHeatmapData = [
  [0, 1, 2, 0, 2, 3, 0],
  [1, 0, 3, 4, 0, 2, 1],
  [0, 2, 0, 3, 1, 0, 2],
  [3, 1, 0, 2, 0, 4, 1],
];

export const empDeptLabels = ['Engineering', 'Marketing', 'Design', 'Operations'];
export const empShiftLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const empAlerts = [
  { id: 1, type: 'warning', icon: '!', title: 'Cost Cap Warning',    desc: 'Marketing shared team approaching budget limit.' },
  { id: 2, type: 'success', icon: '✓', title: 'Hire Confirmed',      desc: 'Senior Dev starting on Monday for Project Titan.' },
];
