import React from 'react';
import { UserProfile } from '../types';

interface CertificateProps {
  user: UserProfile;
}

const Certificate: React.FC<CertificateProps> = ({ user }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-10 shadow-2xl mx-auto max-w-[800px] border-[10px] border-double border-gray-200 relative text-center">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="text-[150px] font-bold text-gray-900 rotate-[-15deg] font-serif">TimeBank</div>
        </div>

        <div className="relative z-10 py-10">
            <div className="mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-4 font-serif-sc tracking-widest">CERTIFICATE</h1>
                <h2 className="text-xl text-gray-500 uppercase tracking-widest border-t border-b border-gray-200 py-2 inline-block">Of Volunteer Service</h2>
            </div>

            <div className="my-16 space-y-6">
                <p className="text-lg text-gray-600">This certifies that</p>
                <h3 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-900 inline-block pb-2 px-10 font-serif-sc">
                    {user.name}
                </h3>
                <p className="text-lg text-gray-600">
                    has successfully deposited and stored
                </p>
                <div className="text-5xl font-bold text-primary font-mono my-4">{user.totalHours} Hours</div>
                <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                    of community service on the TimeBank platform. This time has been verified via blockchain technology and remains immutable.
                </p>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-20 text-left px-12">
                <div className="text-center">
                   <div className="w-32 h-16 border-b border-gray-400 mx-auto mb-2 relative">
                        {/* Mock Signature */}
                        <span className="font-serif italic text-2xl absolute bottom-0 left-0 right-0 text-gray-600">TimeBank AI</span>
                   </div>
                   <p className="font-bold text-gray-800 text-sm">Official Signature</p>
                   <p className="text-xs text-gray-400 font-mono mt-1">SIG: {Date.now().toString(16).substring(0,12)}...</p>
                </div>
                <div className="text-center">
                   <div className="w-32 h-16 border-b border-gray-400 mx-auto mb-2 flex items-end justify-center pb-1">
                        <span className="text-lg text-gray-700">{new Date().toLocaleDateString()}</span>
                   </div>
                   <p className="font-bold text-gray-800 text-sm">Date Issued</p>
                </div>
            </div>

            <div className="mt-16 text-xs text-gray-300 font-mono">
                BLOCK ID: {user.logs.length > 0 ? user.logs[user.logs.length-1].hash : 'GENESIS'}
            </div>
        </div>

        <button 
            onClick={handlePrint}
            className="no-print absolute top-6 right-6 bg-gray-900 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-800 transition-colors flex items-center text-sm font-medium"
        >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print / Download PDF
        </button>
    </div>
  );
};

export default Certificate;