'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/catalog/HeroSection';
import { CategoryTabs } from '@/components/catalog/CategoryTabs';
import { SubcategoryPills } from '@/components/catalog/SubcategoryPills';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { ProductDetail } from '@/components/catalog/ProductDetail';
import { MainCategory, SubCategory, Product } from '../types/product';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MainCategory>('Ladies Wear');
  const [activeSubcategory, setActiveSubcategory] = useState<SubCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Retrieve data from Supabase
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchProducts() {
      // Dynamic import to avoid SSR errors on client object
      const { createSupabaseClient } = await import('@/utils/supabase/client');
      const { mapProductRowToProduct } = await import('@/utils/supabase/mapper');
      const supabase = createSupabaseClient();
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (data) {
        setAllProducts(data.map(mapProductRowToProduct));
      } else if (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const availableSubcategories = useMemo(() => {
    return Array.from(new Set(
      allProducts
        .filter(p => p.category === activeCategory)
        .map(p => p.subcategory)
    ));
  }, [allProducts, activeCategory]);

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
    <div className="font-sans">
      <Header />

      <main>
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 font-medium tracking-wide">Loading Catalog...</p>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onProductClick={setSelectedProduct}
          />
        )}
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