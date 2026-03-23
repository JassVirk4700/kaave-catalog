import Image from 'next/image';
import React from 'react';

export const HeroSection = () => {
  return (
    <section className="text-center py-12 px-6 max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        {/* Using standard img for .ico since next/image doesn't optimize it well */}
        <Image
          src="/icons/logo.webp"
          alt="KAAVE Logo"
          className="w-16 h-16 object-contain"
          width={64}
          height={64}
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-4 leading-tight uppercase tracking-wide">
        Discover Traditional Elegance
      </h1>
      <p className="text-gray-500 text-sm md:text-base leading-relaxed">
        Browse curated traditional juttis designed to match your mood, moment, and lifestyle.
      </p>
    </section>
  );
};
