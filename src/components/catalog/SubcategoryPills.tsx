import React from 'react';
import { SubCategory } from '../../../types/product';

interface SubcategoryPillsProps {
  categories: SubCategory[];
  activeSubcategory: SubCategory | null;
  onSubcategoryChange: (subcategory: SubCategory | null) => void;
}

export const SubcategoryPills = ({
  categories,
  activeSubcategory,
  onSubcategoryChange,
}: SubcategoryPillsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10 px-6">
      <button
        onClick={() => onSubcategoryChange(null)}
        className={`px-5 py-2 rounded-full text-xs md:text-sm transition-all duration-300 ${
          activeSubcategory === null
            ? 'bg-[#873d3d] text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-[#873d3d] hover:text-[#873d3d]'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSubcategoryChange(category)}
          className={`px-5 py-2 rounded-full text-xs md:text-sm transition-all duration-300 ${
            activeSubcategory === category
              ? 'bg-[#873d3d] text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-[#873d3d] hover:text-[#873d3d]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
