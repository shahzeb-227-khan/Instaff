import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import './ErrorPage.css';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <Navbar />

      <main className="error-main-content">
        <div className="error-container text-center">
          <div className="error-icon-wrapper">
             <div className="error-glow"></div>
             <AlertTriangle size={80} className="error-icon position-z-10" />
          </div>
          
          <h1 className="headline-lg font-extrabold mb-4" style={{color: 'var(--error)'}}>Ledger Sync Failed</h1>
          
          <div className="error-card glass-morphism text-left mx-auto mb-10 max-w-lg">
             <div className="flex-between mb-2">
                <span className="font-label text-xs uppercase tracking-widest text-on-error-container">Error Code: 504</span>
                <span className="font-label text-xs uppercase tracking-widest text-on-error-container">Gateway Timeout</span>
             </div>
             <p className="body-md text-on-surface">
                The connection to the decentralized architectural ledger timed out while attempting to verify 
                your transaction signature. Please ensure your local environment is stable and attempt to synchronize again.
             </p>
          </div>
          
          <div className="error-cta-group">
            <Button variant="danger" onClick={() => navigate('/post-job')}>
              Retry Connection
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
