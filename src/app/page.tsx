'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/catalog/HeroSection';
import { CategoryTabs } from '@/components/catalog/CategoryTabs';
import { SubcategoryPills } from '@/components/catalog/SubcategoryPills';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { ProductDetail } from '@/components/catalog/ProductDetail';
import { getProducts, getSubcategories } from '../../data/products';
import { MainCategory, SubCategory, Product } from '../../types/product';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MainCategory>('Ladies Wear');
  const [activeSubcategory, setActiveSubcategory] = useState<SubCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Retrieve data
  const allProducts = useMemo(() => getProducts(), []);
  const availableSubcategories = useMemo(() => getSubcategories(activeCategory), [activeCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchCategory = product.category === activeCategory;
      const matchSubcategory = activeSubcategory ? product.subcategory === activeSubcategory : true;
      return matchCategory && matchSubcategory;
    });
  }, [allProducts, activeCategory, activeSubcategory]);

  const handleCategoryChange = (category: MainCategory) => {
    setActiveCategory(category);
    setActiveSubcategory(null); // Reset subcategory when main category changes
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex flex-col relative font-sans">
      <Header />
      
      <main className="grow">
        <HeroSection />
        
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        {activeCategory === 'Ladies Wear' && (
          <SubcategoryPills 
            categories={availableSubcategories as SubCategory[]} 
            activeSubcategory={activeSubcategory}
            onSubcategoryChange={setActiveSubcategory}
          />
        )}
        
        <ProductGrid 
          products={filteredProducts} 
          onProductClick={setSelectedProduct} 
        />
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}