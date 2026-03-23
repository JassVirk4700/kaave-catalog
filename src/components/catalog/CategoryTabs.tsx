import React from 'react';
import { MainCategory } from '../../../types/product';

interface CategoryTabsProps {
  activeCategory: MainCategory;
  onCategoryChange: (category: MainCategory) => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex justify-center gap-8 border-b border-gray-200 mb-8 mx-6">
      <button
        onClick={() => onCategoryChange('Ladies Wear')}
        className={`pb-3 px-2 text-sm md:text-base font-medium transition-colors relative ${
          activeCategory === 'Ladies Wear'
            ? 'text-[#873d3d]'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        Ladies Wear
        {activeCategory === 'Ladies Wear' && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#873d3d]" />
        )}
      </button>

      <button
        onClick={() => onCategoryChange('Mens Wear')}
        className={`pb-3 px-2 text-sm md:text-base font-medium transition-colors relative flex items-center gap-2 ${
          activeCategory === 'Mens Wear'
            ? 'text-[#873d3d]'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        Mens Wear
        <span className="text-[10px] bg-[#f0ede6] text-gray-500 px-2 py-0.5 rounded-sm font-semibold tracking-wider">
          COMING SOON
        </span>
        {activeCategory === 'Mens Wear' && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#873d3d]" />
        )}
      </button>
    </div>
  );
};
