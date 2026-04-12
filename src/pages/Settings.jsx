import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Settings = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="dashboard-content pt-24 px-8 max-w-7xl mx-auto">
        <h1 className="headline-lg font-extrabold mb-8 text-on-surface">Settings</h1>
        <div className="grid-2-col gap-4">
           <Card className="p-6">
              <h3 className="font-headline font-bold mb-4">Profile Identity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Input label="Full Name" placeholder="Jane Doe" />
                  <Input label="Email Address" placeholder="jane@example.com" type="email" />
                  <Button style={{ marginTop: '1rem' }}>Save Changes</Button>
              </div>
           </Card>
           
           <Card className="p-6">
              <h3 className="font-headline font-bold mb-4">Ledger Preferences</h3>
              <p className="text-sm text-on-surface-variant mb-4">
                 Configure your decentralized identity and how you appear to candidates.
              </p>
              <Button variant="outline">Manage Wallet</Button>
           </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
