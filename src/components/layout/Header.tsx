import React from 'react';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#fcfaf7] sticky top-0 z-50 shadow-sm border-b border-[#f0ede6]">
      <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
      
      <div className="text-2xl font-serif font-bold tracking-widest text-[#5c2a2a] uppercase">
        KAAVE
      </div>

      <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
      </button>
    </header>
  );
};
