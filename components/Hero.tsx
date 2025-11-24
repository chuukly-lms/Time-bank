import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        
        {/* Top: Text Content (Centered) */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 font-serif-sc leading-tight mb-8">
            <span className="block">Where Minutes</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
              Become Milestones
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
             Harmonizing AI precision with Blockchain integrity. We transform your volunteer hours into a trusted, lifelong asset recognized by the world's top institutions.
          </p>
          
          <div className="mt-10 flex justify-center">
             <button
                onClick={onGetStarted}
                className="px-10 py-4 rounded-full bg-gray-900 text-white font-medium text-lg hover:bg-gray-800 hover:scale-105 transition-all shadow-xl shadow-gray-200"
              >
                Start Your Journey
              </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
             <div className="flex -space-x-3">
                 <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                 <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                 <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64" alt="User" />
             </div>
             <p className="font-medium">Joined by 10,000+ Students</p>
          </div>
        </div>

        {/* Bottom: Visual (Cinematic Wide) */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 group">
            <div className="aspect-[21/9] w-full bg-gray-200 relative">
               <img
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt="Volunteers working together"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white hidden md:block">
                 <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1 opacity-80">Community Project #829</p>
                        <p className="text-2xl font-serif">Urban Garden Initiative, New York</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/20 px-4 py-2 rounded-lg border border-white/30">
                        <span className="font-mono">1,204 Hours Banked</span>
                    </div>
                 </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;