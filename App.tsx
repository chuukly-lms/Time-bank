import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchOpportunities from './components/SearchOpportunities';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const scrollToAlliance = () => {
    const section = document.getElementById('alliance-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allianceMembers = [
      { name: "Stanford University", type: "University", color: "bg-red-50 text-red-900" },
      { name: "MIT", type: "University", color: "bg-gray-100 text-gray-900" },
      { name: "UN Volunteers", type: "Organization", color: "bg-blue-50 text-blue-900" },
      { name: "Red Cross", type: "Organization", color: "bg-red-50 text-red-800" },
      { name: "Oxford University", type: "University", color: "bg-indigo-50 text-indigo-900" },
      { name: "WWF", type: "Organization", color: "bg-green-50 text-green-900" },
      { name: "Cambridge", type: "University", color: "bg-amber-50 text-amber-900" },
      { name: "Yale University", type: "University", color: "bg-blue-50 text-blue-900" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} onViewAlliance={scrollToAlliance} />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onGetStarted={() => setCurrentPage('search')} />
            
            <div className="relative py-24 bg-white">
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-50 blur-3xl"></div>
                  <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-amber-50 blur-3xl"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                   <h2 className="text-4xl font-bold text-gray-900 font-serif-sc mb-6">Invest in the Future</h2>
                   <p className="text-xl text-gray-500 font-light leading-relaxed">
                     Connect trust, store compassion, and build a verifiable future. TimeBank is more than a platform; it is the ledger of your social impact.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {/* Feature 1 */}
                  <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif-sc">Curated Discovery</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Our AI doesn't just search; it understands. It filters through noise to connect you with meaningful causes that resonate with your passions and location.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300"></div>
                     <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif-sc">Immutable Legacy</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Time is your most valuable asset. We secure your service history on an immutable blockchain ledger, ensuring your contributions are preserved forever.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300"></div>
                     <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif-sc">Verified Impact</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Generate official, digitally signed certificates that carry weight. Prove your dedication to universities and employers with absolute, verifiable trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Bank Alliance Section */}
            <div id="alliance-section" className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Official Partners</span>
                        <h2 className="text-3xl md:text-4xl font-serif-sc font-bold text-gray-900 mt-2">Time Bank Alliance</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg font-light">
                            Recognized by leading global institutions. Your TimeBank credits are accepted and valued by the world's most prestigious universities and organizations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {allianceMembers.map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-default">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-serif font-bold mb-4 ${member.color} group-hover:scale-110 transition-transform`}>
                                    {member.name[0]}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 text-center font-serif-sc">{member.name}</h3>
                                <span className="text-xs text-gray-400 uppercase tracking-wide mt-1">{member.type}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center text-primary font-semibold hover:text-blue-800 transition-colors">
                            View All 500+ Alliance Members 
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
          </>
        )}
        
        {currentPage === 'search' && <SearchOpportunities />}
        
        {currentPage === 'dashboard' && <Dashboard />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-0 no-print">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
           <div className="flex items-center gap-2 mb-4 md:mb-0 text-gray-900 font-bold">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">TB</div>
              <span className="font-serif-sc text-lg">TimeBank</span>
           </div>
           <p className="text-gray-400 text-sm">
             © {new Date().getFullYear()} TimeBank. Empowering the next generation of changemakers.
           </p>
        </div>
      </footer>
    </div>
  );
}

export default App;