import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Building2, Lock, CheckCircle, XCircle,
  Loader, ShieldCheck, AlertCircle, Star,
} from 'lucide-react';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
import './EmployerPayment.css';

/* ── Helpers ── */
const fmtCard   = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
const fmtExpiry = (v) => { const d = v.replace(/\D/g,'').slice(0,4); return d.length>=3 ? d.slice(0,2)+'/'+d.slice(2) : d; };
const validEmail  = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const validCard   = (v) => v.replace(/\s/g,'').length === 16;
const validExpiry = (v) => {
  const [mm,yy] = v.split('/');
  if (!mm||!yy) return false;
  const m=parseInt(mm,10), y=parseInt('20'+yy,10);
  if (m<1||m>12) return false;
  return new Date(y,m) > new Date();
};
const validCVV = (v) => /^\d{3,4}$/.test(v.trim());
const genTxId  = () => 'TXN-'+Math.random().toString(36).substring(2,8).toUpperCase()+'-'+Date.now().toString().slice(-5);

/* ── Plans ── */
const PLANS = [
  { key:'starter',  name:'Starter Plan',   desc:'3 job posts · 30 days · Basic analytics',                  price:29.99,  tag:'' },
  { key:'pro',      name:'Pro Plan',        desc:'Unlimited posts · Priority matching · Full analytics',      price:99.99,  tag:'POPULAR' },
  { key:'enterprise',name:'Enterprise',    desc:'Team access · Dedicated support · Custom integrations',     price:249.99, tag:'BEST VALUE' },
];

const INITIAL = { name:'', email:'', card:'', expiry:'', cvv:'', holder:'' };

export default function EmployerPayment() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [method,   setMethod]   = useState('card');
  const [form,     setForm]     = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [status,   setStatus]   = useState(null); // null | 'success' | 'failure'
  const [txId,     setTxId]     = useState('');

  const plan = PLANS.find((p) => p.key === selectedPlan) || PLANS[1];

  const handleChange = useCallback((e) => {
    let { name, value } = e.target;
    if (name==='card')   value = fmtCard(value);
    if (name==='expiry') value = fmtExpiry(value);
    if (name==='cvv')    value = value.replace(/\D/g,'').slice(0,4);
    setForm((p) => ({ ...p, [name]:value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]:'' }));
  }, [errors]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!validEmail(form.email)) e.email = 'Enter a valid email address.';
    if (method === 'card') {
      if (!form.card.trim())   e.card   = 'Card number is required.';
      else if (!validCard(form.card)) e.card = 'Card number must be 16 digits.';
      if (!form.expiry.trim()) e.expiry = 'Expiry date is required.';
      else if (!validExpiry(form.expiry)) e.expiry = 'Invalid or expired date.';
      if (!form.cvv.trim())    e.cvv    = 'CVV is required.';
      else if (!validCVV(form.cvv))    e.cvv = 'CVV must be 3–4 digits.';
      if (!form.holder.trim()) e.holder = 'Cardholder name is required.';
    }
    return e;
  };

  const handlePay = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`ep-${firstKey}`)?.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const ok = Math.random() > 0.1;
    setLoading(false);
    if (ok) { setTxId(genTxId()); setStatus('success'); }
    else setStatus('failure');
  };

  const total = (plan.price * 1.08).toFixed(2);

  /* ── Success ── */
  if (status === 'success') {
    return (
      <div className="ep-root">
        <EmployerNavbar />
        <main className="ep-main ep-main--center">
          <div className="ep-result-card">
            <div className="ep-result-icon-wrap ep-result-icon-wrap--ok">
              <CheckCircle size={54} className="ep-result-icon ep-result-icon--ok" />
            </div>
            <h1 className="ep-result-title">Payment Successful ✅</h1>
            <p className="ep-result-sub">
              Your <strong>{plan.name}</strong> subscription is now active.
              A receipt has been sent to your email.
            </p>
            <div className="ep-result-details">
              {[['Transaction ID', txId],['Plan', plan.name],['Amount Paid', `$${total}`],['Status', 'Completed']].map(([l,v])=>(
                <div key={l} className="ep-result-row">
                  <span className="ep-result-label">{l}</span>
                  <span className={`ep-result-val ${l==='Status'?'ep-status-pill':''}`}>{v}</span>
                </div>
              ))}
            </div>
            <button className="ep-pay-btn" onClick={() => navigate('/employer/home')}>
              Back to Home
            </button>
          </div>
        </main>
        <EmployerFooter />
      </div>
    );
  }

  /* ── Failure ── */
  if (status === 'failure') {
    return (
      <div className="ep-root">
        <EmployerNavbar />
        <main className="ep-main ep-main--center">
          <div className="ep-result-card">
            <div className="ep-result-icon-wrap ep-result-icon-wrap--fail">
              <XCircle size={54} className="ep-result-icon ep-result-icon--fail" />
            </div>
            <h1 className="ep-result-title">Payment Failed ❌</h1>
            <p className="ep-result-sub">
              We couldn't process your payment. Please check your card details and try again.
            </p>
            <button className="ep-pay-btn ep-pay-btn--retry" onClick={() => setStatus(null)}>
              Try Again
            </button>
          </div>
        </main>
        <EmployerFooter />
      </div>
    );
  }

  return (
    <div className="ep-root">
      <EmployerNavbar />

      <main className="ep-main">
        <div className="ep-layout">
          {/* ── LEFT: Form ── */}
          <div className="ep-form-col">
            <header className="ep-header">
              <h1 className="ep-title">Choose a Plan &amp; Pay</h1>
              <p className="ep-sub">Select the plan that fits your hiring needs.</p>
            </header>

            {/* Plan selector */}
            <div className="ep-plans">
              {PLANS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`ep-plan-card ${selectedPlan===p.key ? 'ep-plan-card--selected' : ''}`}
                  onClick={() => setSelectedPlan(p.key)}
                >
                  {p.tag && <span className="ep-plan-tag">{p.tag}</span>}
                  <div className="ep-plan-check">
                    {selectedPlan===p.key && <CheckCircle size={18} />}
                  </div>
                  <div className="ep-plan-info">
                    <div className="ep-plan-name">{p.name}</div>
                    <div className="ep-plan-desc">{p.desc}</div>
                  </div>
                  <div className="ep-plan-price">${p.price}<span>/mo</span></div>
                </button>
              ))}
            </div>

            {/* Contact */}
            <div className="ep-section-card">
              <h2 className="ep-section-title">Contact Details</h2>

              {/* Global error banner */}
              {Object.keys(errors).length > 0 && (
                <div className="ep-error-banner" role="alert">
                  <AlertCircle size={15} />
                  <span>Please fill all required fields before paying.</span>
                </div>
              )}

              <div id="ep-name" className={`ep-group ${errors.name ? 'ep-group--err' : ''}`}>
                <label className="ep-label" htmlFor="ep-name-input">Full Name <span className="ep-req">*</span></label>
                <input id="ep-name-input" name="name" type="text" className="ep-input"
                  placeholder="e.g. Sarah Johnson"
                  value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
                {errors.name && <span className="ep-err-msg" role="alert"><AlertCircle size={13}/> {errors.name}</span>}
              </div>

              <div id="ep-email" className={`ep-group ${errors.email ? 'ep-group--err' : ''}`}>
                <label className="ep-label" htmlFor="ep-email-input">Email <span className="ep-req">*</span></label>
                <input id="ep-email-input" name="email" type="email" className="ep-input"
                  placeholder="e.g. you@company.com"
                  value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                {errors.email && <span className="ep-err-msg" role="alert"><AlertCircle size={13}/> {errors.email}</span>}
              </div>
            </div>

            {/* Payment method */}
            <div className="ep-section-card">
              <h2 className="ep-section-title">Payment Method</h2>

              <div className="ep-method-row">
                {[['card','Credit / Debit Card'],['bank','Bank Transfer']].map(([val,label]) => (
                  <label key={val} className={`ep-method-opt ${method===val ? 'ep-method-opt--active' : ''}`}>
                    <input type="radio" name="method" value={val}
                      checked={method===val} onChange={() => setMethod(val)} className="sr-only" />
                    {val==='card' ? <CreditCard size={18}/> : <Building2 size={18}/>}
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {method === 'card' && (
                <div className="ep-card-fields">
                  <div id="ep-card" className={`ep-group ${errors.card ? 'ep-group--err' : ''}`}>
                    <label className="ep-label" htmlFor="ep-card-input">Card Number <span className="ep-req">*</span></label>
                    <div className="ep-input-wrap">
                      <input id="ep-card-input" name="card" type="text" className="ep-input"
                        placeholder="1234 5678 9012 3456" maxLength={19}
                        value={form.card} onChange={handleChange} />
                      <CreditCard size={17} className="ep-input-icon" />
                    </div>
                    {errors.card && <span className="ep-err-msg" role="alert"><AlertCircle size={13}/> {errors.card}</span>}
                  </div>

                  <div className="ep-row-2">
                    <div id="ep-expiry" className={`ep-group ${errors.expiry ? 'ep-group--err' : ''}`}>
                      <label className="ep-label" htmlFor="ep-expiry-input">Expiry <span className="ep-req">*</span></label>
                      <input id="ep-expiry-input" name="expiry" type="text" className="ep-input"
                        placeholder="MM/YY" maxLength={5}
                        value={form.expiry} onChange={handleChange} />
                      {errors.expiry && <span className="ep-err-msg" role="alert"><AlertCircle size={13}/> {errors.expiry}</span>}
                    </div>

                    <div id="ep-cvv" className={`ep-group ${errors.cvv ? 'ep-group--err' : ''}`}>
                      <label className="ep-label" htmlFor="ep-cvv-input">CVV <span className="ep-req">*</span></label>
                      <div className="ep-input-wrap">
                        <input id="ep-cvv-input" name="cvv" type="password" className="ep-input"
                          placeholder="•••" maxLength={4}
                          value={form.cvv} onChange={handleChange} />
                        <Lock size={14} className="ep-input-icon" />
                      </div>
                      {errors.cvv && <span className="ep-err-msg" role="alert"><AlertCircle size={13}/> {errors.cvv}</span>}
                    </div>
                  </div>

                  <div id="ep-holder" className={`ep-group ${errors.holder ? 'ep-group--err' : ''}`}>
                    <label className="ep-label" htmlFor="ep-holder-input">Cardholder Name <span className="ep-req">*</span></label>
                    <input id="ep-holder-input" name="holder" type="text" className="ep-input"
                      placeholder="Name as on card"
                      value={form.holder} onChange={handleChange} />
                    {errors.holder && <span className="ep-err-msg" role="alert"><AlertCircle size={13}/> {errors.holder}</span>}
                  </div>
                </div>
              )}

              {method === 'bank' && (
                <div className="ep-bank-notice">
                  <Building2 size={20} />
                  <div>
                    <p className="ep-bank-title">Bank Transfer</p>
                    <p className="ep-bank-sub">You'll receive bank details via email after confirming. Payment must be completed within 48 hours.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <aside className="ep-summary">
            <h2 className="ep-summary-title">Order Summary</h2>

            <div className="ep-summary-item">
              <div>
                <div className="ep-summary-plan">{plan.name}</div>
                <div className="ep-summary-desc">{plan.desc}</div>
              </div>
              <div className="ep-summary-price">${plan.price.toFixed(2)}</div>
            </div>

            <div className="ep-summary-divider" />

            <div className="ep-summary-line"><span>Subtotal</span><span>${plan.price.toFixed(2)}</span></div>
            <div className="ep-summary-line"><span>Tax (8%)</span><span>${(plan.price*0.08).toFixed(2)}</span></div>

            <div className="ep-summary-divider" />

            <div className="ep-summary-total"><span>Total</span><span>${total}</span></div>

            <button className="ep-pay-btn" onClick={handlePay} disabled={loading} id="pay-now-btn">
              {loading ? <><Loader size={18} className="ep-spinner" /> Processing…</> : <><Lock size={15}/> Pay ${total}</>}
            </button>

            <div className="ep-security">
              <ShieldCheck size={14} />
              <span>256-bit SSL · Secure payment</span>
            </div>

            {/* Plan features */}
            <div className="ep-feature-list">
              {[
                `${plan.key==='starter' ? '3 job posts' : plan.key==='pro' ? 'Unlimited job posts' : 'Unlimited + team seats'}`,
                'Access to 12,000+ candidates',
                plan.key !== 'starter' ? 'Priority talent matching' : 'Standard matching',
                plan.key === 'enterprise' ? 'Dedicated account manager' : 'Email support',
              ].map((f) => (
                <div key={f} className="ep-feature">
                  <CheckCircle size={14} className="ep-feature-icon" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <EmployerFooter />
    </div>
  );
}
