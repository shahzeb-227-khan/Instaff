import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard-content pt-24 px-8 max-w-7xl mx-auto">
        <h1 className="headline-lg font-extrabold mb-8 text-on-surface">Employer Dashboard</h1>
        
        <div className="grid-3-col mb-8 gap-4">
          <Card>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Active Jobs</h3>
            <p className="text-4xl font-extrabold text-primary">3</p>
          </Card>
          <Card>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Candidates</h3>
            <p className="text-4xl font-extrabold text-primary">128</p>
          </Card>
          <Card>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Ledger Balance</h3>
            <p className="text-4xl font-extrabold text-primary">$12,400</p>
          </Card>
        </div>

        <section className="recent-activity">
          <h2 className="headline-md font-bold mb-4 text-on-surface">Recent Activity</h2>
          <Card className="p-6">
            <p className="text-on-surface-variant mb-2">No recent activity on your posted jobs.</p>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
