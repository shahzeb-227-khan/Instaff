import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* ── Entry ── */
import EntryPage  from './pages/EntryPage';
import AboutPage  from './pages/AboutPage';
import HelpPage   from './pages/HelpPage';
import ErrorPage  from './pages/ErrorPage';

/* ── Legacy / shared ── */
import Home          from './pages/Home';
import Messages      from './pages/Messages';
import Payments      from './pages/Payments';
import Notifications from './pages/Notifications';
import Settings      from './pages/Settings';
import Dashboard     from './pages/Dashboard';
import PaymentPage   from './pages/PaymentPage';
import Success       from './pages/Success';

/* ══════════════════════════════════════════
   JOB SEEKER PORTAL
   /job-seeker/home
   /job-seeker/find-jobs
   /job-seeker/job-detail/:id
   /job-seeker/apply/:id
   /job-seeker/messages
   ══════════════════════════════════════════ */
import JobSeekerHome from './pages/JobSeekerHome';
import FindJobs      from './pages/FindJobs';
import JSJobDetail   from './pages/JSJobDetail';
import JSApplyForm   from './pages/JSApplyForm';
import JSMessages    from './pages/JSMessages';
import JSdashboard   from './pages/JSdashboard';

/* ══════════════════════════════════════════
   EMPLOYER PORTAL
   /employer/home
   /employer/find-talent
   /employer/talent-detail/:id
   /employer/hire/:id
   /employer/post-job
   /employer/messages
   /employer/payment
   ══════════════════════════════════════════ */
import EmployerHome     from './pages/EmployerHome';
import FindTalent       from './pages/FindTalent';
import TalentDetail     from './pages/TalentDetail';
import HireForm         from './pages/HireForm';
import EmployerPostJob  from './pages/EmployerPostJob';
import EmployerMessages from './pages/EmployerMessages';
import EmployerPayment  from './pages/EmployerPayment';
import EMPdashboard    from './pages/EMPdashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>

        {/* ── Entry ── */}
        <Route path="/"       element={<EntryPage />} />
        <Route path="/about"  element={<AboutPage />} />
        <Route path="/help"   element={<HelpPage />} />

        {/* ── Legacy home ── */}
        <Route path="/home"   element={<Home />} />

        {/* ══════════════════════════════════════
            JOB SEEKER PORTAL
            ══════════════════════════════════════ */}
        <Route path="/job-seeker/home"           element={<JobSeekerHome />} />
        <Route path="/job-seeker/find-jobs"      element={<FindJobs />} />
        <Route path="/job-seeker/job-detail/:id" element={<JSJobDetail />} />
        <Route path="/job-seeker/apply/:id"      element={<JSApplyForm />} />
        <Route path="/job-seeker/messages"       element={<JSMessages />} />
        <Route path="/job-seeker/dashboard"      element={<JSdashboard />} />

        {/* Share Work route removed — feature discontinued */}

        {/* ══════════════════════════════════════
            EMPLOYER PORTAL
            ══════════════════════════════════════ */}
        <Route path="/employer/home"              element={<EmployerHome />} />
        <Route path="/employer/find-talent"       element={<FindTalent />} />
        <Route path="/employer/talent-detail/:id" element={<TalentDetail />} />
        <Route path="/employer/hire/:id"          element={<HireForm />} />
        <Route path="/employer/post-job"          element={<EmployerPostJob />} />
        <Route path="/employer/messages"          element={<EmployerMessages />} />
        <Route path="/employer/payment"           element={<EmployerPayment />} />
        <Route path="/employer/dashboard"         element={<EMPdashboard />} />

        {/* ── Shared utilities ── */}
        <Route path="/success"       element={<Success />} />
        <Route path="/messages"      element={<Messages />} />
        <Route path="/payments"      element={<Payments />} />
        <Route path="/payment"       element={<PaymentPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings"      element={<Settings />} />
        <Route path="/dashboard"     element={<Dashboard />} />

        {/* ── 404 fallback ── */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;
