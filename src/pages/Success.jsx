import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import './Success.css';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <Navbar />

      <main className="success-main-content">
        <div className="success-container text-center">
          <div className="success-icon-wrapper">
             <div className="icon-glow"></div>
             <CheckCircle2 size={80} className="success-icon position-z-10 text-primary" />
          </div>
          
          <h1 className="headline-lg text-on-surface font-extrabold mb-4">Job Posted Successfully</h1>
          
          <p className="body-md text-on-surface-variant max-w-lg mb-10 mx-auto">
             Your job posting for "Senior Systems Architect" has been published to the ledger.
             Matching engines are now actively scoring potential candidates.
          </p>
          
          <div className="success-cta-group">
            <Button onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/post-job')}>
              Post Another Job <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
