import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Plus, CheckCircle, Clock, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Payments.css';

const billingHistory = [
  { id: 'TXN-AX7K2-91234', plan: 'Job Posting Package', date: '10 Apr 2026', amount: 53.99, status: 'paid' },
  { id: 'TXN-BM3P1-80923', plan: 'Premium Plan', date: '10 Mar 2026', amount: 161.99, status: 'paid' },
  { id: 'TXN-CZ9Q4-70011', plan: 'Talent Access', date: '10 Feb 2026', amount: 107.99, status: 'paid' },
];

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="pay-overview-page">
      <Navbar />

      <main className="pay-overview-main">
        <div className="pay-overview-container">

          {/* Header */}
          <div className="pov-header">
            <div>
              <h1 className="pov-title">Payments & Billing</h1>
              <p className="pov-sub">Manage your plans, billing history, and payment methods.</p>
            </div>
            <button
              className="pov-cta-btn"
              onClick={() => navigate('/payment', { state: { plan: 'job_post' } })}
            >
              <Plus size={18} /> Make a Payment
            </button>
          </div>

          {/* Plans */}
          <div className="pov-plan-grid">
            {[
              { key: 'job_post', name: 'Job Posting Package', price: '$49.99', desc: 'Post 1 job listing · 30 days', badge: null },
              { key: 'premium', name: 'Premium Plan', price: '$149.99', desc: 'Unlimited posts · Priority matching', badge: 'Popular' },
              { key: 'talent', name: 'Talent Access', price: '$99.99', desc: 'Browse 500+ vetted professionals', badge: null },
            ].map((plan) => (
              <div key={plan.key} className={`pov-plan-card ${plan.badge ? 'pov-plan-featured' : ''}`}>
                {plan.badge && <span className="pov-plan-badge">{plan.badge}</span>}
                <div className="pov-plan-name">{plan.name}</div>
                <div className="pov-plan-price">{plan.price}<span className="pov-plan-period"> / post</span></div>
                <div className="pov-plan-desc">{plan.desc}</div>
                <button
                  className="pov-plan-btn"
                  onClick={() => navigate('/payment', { state: { plan: plan.key } })}
                >
                  <CreditCard size={15} /> Purchase
                </button>
              </div>
            ))}
          </div>

          {/* Current Balance */}
          <div className="pov-balance-card">
            <div className="pov-balance-left">
              <div className="pov-balance-label">Current Balance Due</div>
              <div className="pov-balance-amount">$0.00</div>
              <p className="pov-balance-note">No active contracts billing to your account.</p>
            </div>
            <div className="pov-balance-icon">
              <CheckCircle size={40} className="pov-balance-check" />
            </div>
          </div>

          {/* Billing History */}
          <div className="pov-section">
            <h2 className="pov-section-title">
              <FileText size={18} /> Billing History
            </h2>
            <div className="pov-table-wrap">
              <table className="pov-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Plan</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((row) => (
                    <tr key={row.id}>
                      <td className="pov-tx-id">{row.id}</td>
                      <td>{row.plan}</td>
                      <td className="pov-date">{row.date}</td>
                      <td className="pov-amount">${row.amount.toFixed(2)}</td>
                      <td>
                        <span className={`pov-status-pill ${row.status}`}>
                          {row.status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Payments;
