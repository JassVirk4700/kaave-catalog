import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 mt-12 border-t border-[#f0ede6] text-center">
      <div className="text-xl font-serif font-bold tracking-widest text-[#5c2a2a] mb-4">
        KAAVE
      </div>
      <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
        Premium traditional juttis designed to match your mood, moment, and lifestyle.
      </p>
      <div className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} KAAVE Catalog. All rights reserved.
      </div>
    </footer>
  );
};
