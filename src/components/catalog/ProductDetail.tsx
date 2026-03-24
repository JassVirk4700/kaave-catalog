'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '../../types/product';
import { useWhatsApp } from '../../hooks/useWhatsApp';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = (product.images || []).map((src) =>
    src.startsWith('http') || src.startsWith('/') ? src : `/${src}`
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <div
      className="fixed inset-0 z-100 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
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
          {/* Main Image */}
          <div className="relative h-56 sm:h-72 md:h-80 w-full bg-[#eae6df] overflow-hidden">
            {images.length > 0 ? (
              <Image
                key={activeIndex}
                src={images[activeIndex]}
                alt={`${product.name} - image ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain object-center"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 font-light">No images</span>
              </div>
            )}
          </div>

          {/* Thumbnail strip — shown only if ≥2 images */}
          {images.length >= 2 && (
            <div className="flex gap-2 px-3 py-2 bg-white border-b border-[#f0ede6]">
              {images.slice(0, 5).map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`relative shrink-0 w-16 h-16 overflow-hidden rounded-md transition-all ${i === activeIndex
                    ? 'ring-2 ring-[#873d3d]'
                    : 'opacity-50 hover:opacity-80'
                    }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

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
                {(product.specs || []).map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleWhatsAppClick(product)}
              className="w-full bg-[#128C7E] hover:bg-[#0c6b5f] text-white py-4 rounded-xl font-medium tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <FaWhatsapp size={26} />
              Inquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
