'use client';

import React, { useEffect } from 'react';
import { Product } from '../../../types/product';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in the ${product.name} from the KAAVE catalog.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-100 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-[#fcfaf7] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition text-gray-800"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="overflow-y-auto w-full">
          {/* Image Header */}
          <div className="aspect-square md:aspect-16/10 bg-[#eae6df] relative w-full flex items-center justify-center">
            {/* Placeholder for Product Image */}
            <span className="text-gray-400 text-lg font-light">Image Gallery Area</span>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-6">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#f0ede6]">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Material</div>
                <div className="text-sm font-medium text-gray-800">{product.material}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#f0ede6]">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Work Type</div>
                <div className="text-sm font-medium text-gray-800">{product.workType}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Specifications</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            <button 
              onClick={handleWhatsAppClick}
              className="w-full bg-[#128C7E] hover:bg-[#0c6b5f] text-white py-4 rounded-xl font-medium tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.066.376-.05.39.462.534.607c.144.145.289.116.39.058s.65-.304.723-.578.072-.275.051-.304-.072-.043-.159-.087l-1.025-.491c-.131-.059-.226-.145-.304-.304z"/>
              </svg>
              Inquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
