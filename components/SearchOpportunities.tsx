import React, { useState } from 'react';
import { searchOpportunities } from '../services/geminiService';
import { SearchResult, ParsedOpportunity } from '../types';

const SearchOpportunities: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [selectedOpp, setSelectedOpp] = useState<ParsedOpportunity | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Application Form State
  const [appForm, setAppForm] = useState({ name: '', school: '', contact: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !location) return;

    setLoading(true);
    setResult(null);
    const data = await searchOpportunities(query, location);
    setResult(data);
    setLoading(false);
  };

  const handleApplyClick = (opp: ParsedOpportunity) => {
    setSelectedOpp(opp);
    setSubmitted(false);
    setAppForm({ name: '', school: '', contact: '' });
    setShowModal(true);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call to blockchain/backend
    setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        // Close modal after delay
        setTimeout(() => setShowModal(false), 2500);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 font-serif-sc">Find Volunteer Opportunities</h2>
        <p className="mt-3 text-gray-600">AI-powered search to match you with the best non-profit projects.</p>
      </div>

      <form onSubmit={handleSearch} className="bg-white shadow-xl rounded-2xl p-8 mb-12 border border-gray-100 max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">Interests / Skills</label>
            <input
              type="text"
              id="interest"
              placeholder="e.g. Elderly Care, Teaching, Environment"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border-gray-200 border p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">City / Region</label>
            <input
              type="text"
              id="location"
              placeholder="e.g. New York, London, Tokyo"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border-gray-200 border p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
              required
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-4 rounded-xl text-white font-semibold shadow-lg transition-all transform active:scale-95 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700 hover:shadow-primary/30'
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : 'Start Matching'}
          </button>
        </div>
      </form>

      {result && (
        <div className="animate-fade-in space-y-8">
          {/* Sources Section */}
          {result.sources.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <span className="text-sm text-gray-500 flex items-center mr-2">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Sources:
              </span>
              {result.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors border border-gray-200 shadow-sm"
                >
                   {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                </a>
              ))}
            </div>
          )}

          {/* Structured Cards */}
          {result.parsedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.parsedOpportunities.map((opp, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Volunteer</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{opp.name}</h3>
                    <p className="text-sm font-semibold text-secondary mb-4">{opp.role}</p>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-4">{opp.description}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <button
                      onClick={() => handleApplyClick(opp)}
                      className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group"
                    >
                      Apply Now
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Fallback text if parsing failed but text exists
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-700 whitespace-pre-wrap">{result.text}</p>
             </div>
          )}
        </div>
      )}

      {/* Application Modal */}
      {showModal && selectedOpp && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              {!submitted ? (
                <form onSubmit={submitApplication} className="p-8">
                  <div className="sm:flex sm:items-start mb-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Apply to: {selectedOpp.name}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please fill in your basic information. TimeBank will instantly send your application to the organization via smart contract.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            value={appForm.name} onChange={e => setAppForm({...appForm, name: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">School</label>
                        <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            value={appForm.school} onChange={e => setAppForm({...appForm, school: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact (Phone/Email)</label>
                        <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            value={appForm.contact} onChange={e => setAppForm({...appForm, contact: e.target.value})} />
                    </div>
                  </div>

                  <div className="mt-8 sm:flex sm:flex-row-reverse">
                    <button type="submit" disabled={submitting} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                      {submitting ? 'Sending...' : 'Submit Application'}
                    </button>
                    <button type="button" onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                      <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-4">
                        Your application has been recorded on the TimeBank blockchain. Please wait for the organization to review it; results will be sent to your contact info.
                    </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOpportunities;