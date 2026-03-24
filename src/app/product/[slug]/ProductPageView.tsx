'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Product } from '../../../types/product';
import { useWhatsApp } from '../../../hooks/useWhatsApp';

interface ProductPageViewProps {
  product: Product;
}

export function ProductPageView({ product }: ProductPageViewProps) {
  const images = product.images.map((src) =>
    src.startsWith('/') ? src : `/${src}`
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <div className="font-sans bg-[#fcfaf7] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#873d3d] mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Catalog
        </Link>

        {/* Main Image */}
        <div className="relative h-72 sm:h-96 w-full bg-[#eae6df] rounded-2xl overflow-hidden mb-3">
          {images.length > 0 ? (
            <Image
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${product.name} - image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain object-center"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 font-light">No image</span>
            </div>
          )}
          {product.tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-800 uppercase shadow-sm">
                {product.tag}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length >= 2 && (
          <div className="flex gap-2 mb-6">
            {images.slice(0, 5).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`relative shrink-0 w-16 h-16 overflow-hidden rounded-lg transition-all ${i === activeIndex ? 'ring-2 ring-[#873d3d]' : 'opacity-50 hover:opacity-80'
                  }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt={`${product.name} thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="bg-white rounded-2xl border border-[#f0ede6] p-6 shadow-sm">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#fcfaf7] p-4 rounded-xl border border-[#f0ede6]">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Material</div>
              <div className="text-sm font-medium text-gray-800">{product.material}</div>
            </div>
            <div className="bg-[#fcfaf7] p-4 rounded-xl border border-[#f0ede6]">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Work Type</div>
              <div className="text-sm font-medium text-gray-800">{product.workType}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Specifications</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
              {product.specs.map((spec, i) => (
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
      </main>

      <Footer />
    </div>
  );
}
