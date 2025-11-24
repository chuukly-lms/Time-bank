import React, { useState } from 'react';
import { TimeLog, UserProfile } from '../types';
import Certificate from './Certificate';

// Helper to generate a simple mock hash
const generateHash = (data: string) => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
};

const Dashboard: React.FC = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [newLog, setNewLog] = useState({ org: '', hours: '', description: '', date: '' });
  
  // Mock State for the user
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Smith",
    school: "Lincoln High School",
    totalHours: 12,
    logs: [
      {
        id: '1',
        opportunityTitle: 'Food Pantry Assistant',
        organization: 'Community Care Center',
        hours: 4,
        date: '2023-10-15',
        hash: '0000a4f3b2c1d9e8',
        previousHash: '0000000000000000',
        verified: true,
        status: 'verified'
      },
      {
        id: '2',
        opportunityTitle: 'Park Cleanup',
        organization: 'Green Earth',
        hours: 8,
        date: '2023-11-02',
        hash: '00007c8d9e0f1a2b',
        previousHash: '0000a4f3b2c1d9e8',
        verified: true,
        status: 'verified'
      }
    ]
  });

  const handleLogHours = (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(newLog.hours);
    
    // Create new block
    const prevHash = user.logs.length > 0 ? user.logs[user.logs.length - 1].hash : '0000000000000000';
    const blockData = `${newLog.org}${hoursNum}${newLog.date}${prevHash}`;
    const newHash = generateHash(blockData);

    const logEntry: TimeLog = {
      id: Date.now().toString(),
      opportunityTitle: 'Volunteer Service',
      organization: newLog.org,
      hours: hoursNum,
      date: newLog.date,
      hash: newHash,
      previousHash: prevHash,
      verified: true, // Auto-verify for demo
      status: 'verified'
    };

    setUser(prev => ({
      ...prev,
      totalHours: prev.totalHours + hoursNum,
      logs: [...prev.logs, logEntry]
    }));

    setNewLog({ org: '', hours: '', description: '', date: '' });
  };

  if (showCertificate) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
            <button onClick={() => setShowCertificate(false)} className="mb-4 text-gray-600 hover:text-gray-900 flex items-center no-print">
                ← Back to Dashboard
            </button>
            <Certificate user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Stats */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                {user.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500">{user.school}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="text-sm text-gray-500 uppercase tracking-wide">Time Assets</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-4xl font-extrabold text-primary">{user.totalHours}</span>
                <span className="ml-2 text-gray-600 font-medium">Hours (Verified)</span>
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setShowCertificate(true)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-dark hover:bg-gray-800 transition-colors"
              >
                Generate Certificate
              </button>
            </div>
          </div>

          {/* New Log Form */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Log New Hours</h3>
            <form onSubmit={handleLogHours} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input required type="text" className="mt-1 block w-full rounded-lg border-gray-300 border p-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                       value={newLog.org} onChange={e => setNewLog({...newLog, org: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700">Date</label>
                   <input required type="date" className="mt-1 block w-full rounded-lg border-gray-300 border p-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700">Hours</label>
                   <input required type="number" step="0.5" className="mt-1 block w-full rounded-lg border-gray-300 border p-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          value={newLog.hours} onChange={e => setNewLog({...newLog, hours: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-secondary hover:bg-emerald-600 transition-colors">
                Submit to Chain
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Ledger Chain */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Time Ledger (Immutable)</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Blockchain Running
              </span>
            </div>
            <div className="p-6">
               <div className="relative">
                 {/* Connecting Line */}
                 <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>
                 
                 <ul className="space-y-8 relative">
                   {user.logs.map((log, index) => (
                     <li key={log.id} className="relative flex items-start group">
                       <div className="absolute left-8 -ml-3.5 h-7 w-7 rounded-full bg-white border-4 border-gray-100 shadow-sm flex items-center justify-center z-10">
                         <div className={`h-2.5 w-2.5 rounded-full ${index === user.logs.length - 1 ? 'bg-secondary animate-pulse' : 'bg-gray-400'}`}></div>
                       </div>
                       
                       <div className="ml-16 w-full">
                         <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group-hover:border-blue-200">
                            <div className="flex justify-between items-start">
                               <div>
                                   <h4 className="text-md font-bold text-gray-900">{log.organization}</h4>
                                   <p className="text-sm text-gray-500">Task: {log.opportunityTitle}</p>
                                   <p className="text-sm text-gray-500">Date: {log.date}</p>
                               </div>
                               <div className="text-right">
                                   <div className="text-xl font-bold text-secondary font-mono">{log.hours} hrs</div>
                                   <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                                     Deposited
                                   </span>
                               </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-50">
                                <p className="text-xs font-mono text-gray-400 break-all">
                                    <span className="font-semibold text-gray-500">Block Hash:</span> {log.hash}
                                </p>
                            </div>
                         </div>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;