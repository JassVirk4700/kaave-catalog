import React from 'react';
import Image from 'next/image';
import { Product } from '../../../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const firstImage = product.images[0];
  const hasImage = Boolean(firstImage);

  return (
    <button
      type="button"
      className="group flex flex-col text-left w-full outline-none"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-[#f5f3f0] mb-4">
        {hasImage ? (
          <Image
            src={firstImage.startsWith('/') ? firstImage : `/${firstImage}`}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#eae6df]">
            <span className="text-gray-400 text-sm font-light">No image</span>
          </div>
        )}

        {/* Badge */}
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
    </button>
  );
};
