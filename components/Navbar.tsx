import React from 'react';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
  onViewAlliance?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, onViewAlliance }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Find Opportunities' },
    { id: 'dashboard', label: 'My Dashboard' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
                T
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-gray-900 block leading-none font-serif-sc">TimeBank</span>
              </div>
            </div>
          </div>
          
          {/* Center Nav */}
          <div className="hidden md:ml-8 md:flex md:space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`${
                  currentPage === item.id
                    ? 'text-gray-900 font-bold'
                    : 'text-gray-500 hover:text-primary font-medium'
                } px-1 py-2 text-sm transition-all duration-200`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action */}
          <div className="flex items-center">
            {onViewAlliance && (
              <button
                onClick={() => {
                   setPage('home');
                   setTimeout(onViewAlliance, 100);
                }}
                className="hidden sm:inline-flex items-center px-4 py-2 border border-amber-200 text-sm font-medium rounded-full text-amber-900 bg-amber-50 hover:bg-amber-100 hover:text-amber-950 transition-colors shadow-sm"
              >
                <span className="mr-1.5">★</span> Time Bank Alliance
              </button>
            )}
            <div className="flex items-center sm:hidden ml-4">
               <button onClick={() => setPage('dashboard')} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
               </button>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;