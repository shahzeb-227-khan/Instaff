import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  CreditCard,
  Building2,
  User,
  Mail,
  MapPin,
  Lock,
  CheckCircle,
  XCircle,
  Loader,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  X,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import './PaymentPage.css';

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
const formatCardNumber = (val) =>
  val
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (val) => {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
};

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidCard = (v) => v.replace(/\s/g, '').length === 16;
const isValidExpiry = (v) => {
  const [mm, yy] = v.split('/');
  if (!mm || !yy) return false;
  const m = parseInt(mm, 10);
  const y = parseInt('20' + yy, 10);
  if (m < 1 || m > 12) return false;
  const now = new Date();
  return new Date(y, m) > now;
};
const isValidCVV = (v) => /^\d{3,4}$/.test(v.trim());

const generateTxId = () =>
  'TXN-' +
  Math.random().toString(36).substring(2, 8).toUpperCase() +
  '-' +
  Date.now().toString().slice(-5);

/* ══════════════════════════════════════
   ORDER SUMMARY
══════════════════════════════════════ */
const OrderSummary = ({ plan, onPay, isLoading, isValid }) => (
  <aside className="order-summary">
    <div className="os-header">
      <h2 className="os-title">Order Summary</h2>
    </div>

    <div className="os-item">
      <div className="os-item-info">
        <span className="os-item-name">{plan.name}</span>
        <span className="os-item-desc">{plan.description}</span>
      </div>
      <span className="os-item-price">${plan.price.toFixed(2)}</span>
    </div>

    <div className="os-divider" />

    <div className="os-line">
      <span>Subtotal</span>
      <span>${plan.price.toFixed(2)}</span>
    </div>
    <div className="os-line">
      <span>Tax (8%)</span>
      <span>${(plan.price * 0.08).toFixed(2)}</span>
    </div>

    <div className="os-divider" />

    <div className="os-total">
      <span>Total</span>
      <span>${(plan.price * 1.08).toFixed(2)}</span>
    </div>

    <button
      className="pay-now-btn"
      onClick={onPay}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader size={18} className="spinner" />
          Processing…
        </>
      ) : (
        <>
          <Lock size={16} />
          Pay ${(plan.price * 1.08).toFixed(2)}
        </>
      )}
    </button>

    <div className="os-security">
      <ShieldCheck size={14} />
      <span>256-bit SSL encrypted · Secure payment</span>
    </div>
  </aside>
);

/* ══════════════════════════════════════
   SUCCESS SCREEN
══════════════════════════════════════ */
const SuccessScreen = ({ txId, amount, onHome }) => (
  <div className="result-screen">
    <div className="result-icon-wrap success-bg">
      <CheckCircle size={52} className="result-icon success-color" />
    </div>
    <h2 className="result-title">Payment Successful ✅</h2>
    <p className="result-sub">
      Your payment has been processed. A receipt has been sent to your email.
    </p>
    <div className="result-details">
      <div className="result-detail-row">
        <span>Transaction ID</span>
        <span className="result-detail-val">{txId}</span>
      </div>
      <div className="result-detail-row">
        <span>Amount Paid</span>
        <span className="result-detail-val success-color">${amount}</span>
      </div>
      <div className="result-detail-row">
        <span>Status</span>
        <span className="status-pill success">Completed</span>
      </div>
    </div>
    <button className="pay-now-btn" onClick={onHome}>
      Back to Home
    </button>
  </div>
);

/* ══════════════════════════════════════
   FAILURE SCREEN
══════════════════════════════════════ */
const FailureScreen = ({ onRetry }) => (
  <div className="result-screen">
    <div className="result-icon-wrap failure-bg">
      <XCircle size={52} className="result-icon failure-color" />
    </div>
    <h2 className="result-title">Payment Failed ❌</h2>
    <p className="result-sub">
      We couldn't process your payment. Please check your card details and try again.
    </p>
    <button className="pay-now-btn retry-btn" onClick={onRetry}>
      Try Again
    </button>
  </div>
);

/* ══════════════════════════════════════
   PAYMENT FORM
══════════════════════════════════════ */
const INITIAL_FORM = {
  fullName: '',
  email: '',
  payMethod: 'card',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardHolder: '',
  country: '',
  city: '',
  zip: '',
};

const PLANS = {
  job_post: { name: 'Job Posting Package', description: 'Post 1 job listing for 30 days', price: 49.99 },
  premium: { name: 'Premium Plan', description: 'Unlimited job posts · Priority matching · Analytics', price: 149.99 },
  talent: { name: 'Talent Access', description: 'Browse & contact 500+ vetted professionals', price: 99.99 },
};

/* ══════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════ */
const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which plan to show (from navigation state or default)
  const planKey = location.state?.plan || 'job_post';
  const plan = PLANS[planKey] || PLANS.job_post;

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'failure'
  const [txId, setTxId] = useState('');

  /* Field handlers */
  const handleChange = useCallback((e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') value = formatCardNumber(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);

    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }, [errors]);

  /* Validation */
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!isValidEmail(form.email)) e.email = 'Invalid email format.';

    if (form.payMethod === 'card') {
      if (!form.cardNumber.trim()) e.cardNumber = 'Card number is required.';
      else if (!isValidCard(form.cardNumber)) e.cardNumber = 'Card number must be 16 digits.';
      if (!form.expiry.trim()) e.expiry = 'Expiry is required.';
      else if (!isValidExpiry(form.expiry)) e.expiry = 'Invalid or expired date.';
      if (!form.cvv.trim()) e.cvv = 'CVV is required.';
      else if (!isValidCVV(form.cvv)) e.cvv = 'CVV must be 3–4 digits.';
      if (!form.cardHolder.trim()) e.cardHolder = 'Cardholder name is required.';
    }
    return e;
  };

  /* Submit */
  const handlePay = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(`pf-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    // Simulate async payment (mock)
    await new Promise((res) => setTimeout(res, 2000));

    // 90% success rate (mock)
    const success = Math.random() > 0.1;
    setIsLoading(false);
    if (success) {
      setTxId(generateTxId());
      setStatus('success');
    } else {
      setStatus('failure');
    }
  };

  const handleRetry = () => {
    setStatus(null);
    setErrors({});
  };

  /* ── Render ── */
  return (
    <div className="payment-page">
      <Navbar />

      {/* Breadcrumb */}
      <div className="payment-breadcrumb-bar">
        <div className="payment-container">
          <nav className="payment-breadcrumb">
            <Link to="/" className="pb-link">Home</Link>
            <ChevronRight size={15} className="pb-sep" />
            <span className="pb-current">Checkout</span>
          </nav>
        </div>
      </div>

      <main className="payment-main">
        <div className="payment-container">

          {/* Result Screens */}
          {status === 'success' && (
            <SuccessScreen
              txId={txId}
              amount={(plan.price * 1.08).toFixed(2)}
              onHome={() => navigate('/')}
            />
          )}
          {status === 'failure' && <FailureScreen onRetry={handleRetry} />}

          {/* Payment Layout */}
          {!status && (
            <div className="payment-layout">

              {/* ── LEFT — Form ── */}
              <div className="payment-form-col">
                <div className="pf-section-card">
                  <h2 className="pf-section-title">
                    <User size={18} /> Contact Details
                  </h2>

                  <div id="pf-fullName" className={`pf-group ${errors.fullName ? 'has-error' : ''}`}>
                    <label className="pf-label">Full Name <span className="req">*</span></label>
                    <input
                      name="fullName" type="text" className="pf-input"
                      placeholder="e.g. Shahzeb Sardar"
                      value={form.fullName} onChange={handleChange}
                    />
                    {errors.fullName && <span className="pf-error">{errors.fullName}</span>}
                  </div>

                  <div id="pf-email" className={`pf-group ${errors.email ? 'has-error' : ''}`}>
                    <label className="pf-label">
                      <Mail size={13} /> Email Address <span className="req">*</span>
                    </label>
                    <input
                      name="email" type="email" className="pf-input"
                      placeholder="e.g. you@example.com"
                      value={form.email} onChange={handleChange}
                    />
                    {errors.email && <span className="pf-error">{errors.email}</span>}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="pf-section-card">
                  <h2 className="pf-section-title">
                    <CreditCard size={18} /> Payment Method
                  </h2>

                  <div className="pay-method-grid">
                    <label className={`pay-method-option ${form.payMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio" name="payMethod" value="card"
                        checked={form.payMethod === 'card'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <CreditCard size={20} />
                      <span>Credit / Debit Card</span>
                    </label>
                    <label className={`pay-method-option ${form.payMethod === 'bank' ? 'selected' : ''}`}>
                      <input
                        type="radio" name="payMethod" value="bank"
                        checked={form.payMethod === 'bank'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Building2 size={20} />
                      <span>Bank Transfer</span>
                    </label>
                  </div>

                  {/* Card form */}
                  {form.payMethod === 'card' && (
                    <div className="card-fields">
                      <div id="pf-cardNumber" className={`pf-group ${errors.cardNumber ? 'has-error' : ''}`}>
                        <label className="pf-label">Card Number <span className="req">*</span></label>
                        <div className="card-input-wrap">
                          <input
                            name="cardNumber" type="text" className="pf-input"
                            placeholder="1234 5678 9012 3456"
                            value={form.cardNumber} onChange={handleChange}
                            maxLength={19}
                          />
                          <CreditCard size={18} className="card-input-icon" />
                        </div>
                        {errors.cardNumber && <span className="pf-error">{errors.cardNumber}</span>}
                      </div>

                      <div className="pf-row-2">
                        <div id="pf-expiry" className={`pf-group ${errors.expiry ? 'has-error' : ''}`}>
                          <label className="pf-label">Expiry Date <span className="req">*</span></label>
                          <input
                            name="expiry" type="text" className="pf-input"
                            placeholder="MM/YY"
                            value={form.expiry} onChange={handleChange}
                            maxLength={5}
                          />
                          {errors.expiry && <span className="pf-error">{errors.expiry}</span>}
                        </div>
                        <div id="pf-cvv" className={`pf-group ${errors.cvv ? 'has-error' : ''}`}>
                          <label className="pf-label">CVV <span className="req">*</span></label>
                          <div className="card-input-wrap">
                            <input
                              name="cvv" type="password" className="pf-input"
                              placeholder="•••"
                              value={form.cvv} onChange={handleChange}
                              maxLength={4}
                            />
                            <Lock size={14} className="card-input-icon" />
                          </div>
                          {errors.cvv && <span className="pf-error">{errors.cvv}</span>}
                        </div>
                      </div>

                      <div id="pf-cardHolder" className={`pf-group ${errors.cardHolder ? 'has-error' : ''}`}>
                        <label className="pf-label">Cardholder Name <span className="req">*</span></label>
                        <input
                          name="cardHolder" type="text" className="pf-input"
                          placeholder="Name as on card"
                          value={form.cardHolder} onChange={handleChange}
                        />
                        {errors.cardHolder && <span className="pf-error">{errors.cardHolder}</span>}
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Notice */}
                  {form.payMethod === 'bank' && (
                    <div className="bank-notice">
                      <Building2 size={20} />
                      <div>
                        <p className="bank-notice-title">Bank Transfer Selected</p>
                        <p className="bank-notice-sub">
                          You will receive bank account details via email after confirming your order.
                          Payment must be completed within 48 hours.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing Address */}
                <div className="pf-section-card">
                  <h2 className="pf-section-title">
                    <MapPin size={18} /> Billing Address
                    <span className="pf-optional">(optional)</span>
                  </h2>

                  <div className="pf-row-3">
                    <div className="pf-group">
                      <label className="pf-label">Country</label>
                      <select name="country" className="pf-input pf-select" value={form.country} onChange={handleChange}>
                        <option value="">Select country</option>
                        <option value="PK">Pakistan</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AE">UAE</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                    </div>
                    <div className="pf-group">
                      <label className="pf-label">City</label>
                      <input
                        name="city" type="text" className="pf-input"
                        placeholder="e.g. Karachi"
                        value={form.city} onChange={handleChange}
                      />
                    </div>
                    <div className="pf-group">
                      <label className="pf-label">ZIP / Postal Code</label>
                      <input
                        name="zip" type="text" className="pf-input"
                        placeholder="e.g. 75600"
                        value={form.zip} onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT — Order Summary ── */}
              <OrderSummary
                plan={plan}
                onPay={handlePay}
                isLoading={isLoading}
                isValid={true}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
