import React from 'react';
import Image from 'next/image';
import { Product } from '../../../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-[#f5f3f0] mb-4">
        {/* Render a placeholder div if images are just placeholders, or Image component once real images are available */}
        <div className="w-full h-full relative p-2 transition-transform duration-500 group-hover:scale-105">
           {/* In a real app, use next/image. Since we have '/images/products/placeholder.jpg', we will use an unoptimized img tag or a generic colored div based on the UI. For the sake of matching the PRD, we'll try next/image or fallback. Let's use standard img for now to avoid next/image strict config errors if not setup, or use a neutral background. */}
           <div className="absolute inset-0 flex items-center justify-center bg-[#eae6df]">
             <span className="text-gray-400 text-sm font-light">Image Area</span>
           </div>
        </div>
        
        {/* Badges */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-800 uppercase shadow-sm">
              {product.tag}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col grow">
        <h3 className="text-[15px] font-serif font-bold text-gray-800 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-[13px] text-gray-500 font-light">
          {product.shortDescription}
        </p>
      </div>
    </div>
  );
};
