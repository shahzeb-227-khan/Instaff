import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const Notifications = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="dashboard-content pt-24 px-8 max-w-7xl mx-auto">
        <h1 className="headline-lg font-extrabold mb-8 text-on-surface">Notifications</h1>
        <Card className="p-8">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', borderBottom: '1px solid rgba(70, 69, 85, 0.1)', paddingBottom: '1rem', marginBottom: '1rem' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '6px' }}></div>
               <div>
                  <h4 className="text-on-surface font-semibold">Welcome to InStaff</h4>
                  <p className="text-sm text-on-surface-variant mt-1">Your ledger identity has been successfully created and verified.</p>
               </div>
            </div>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;
