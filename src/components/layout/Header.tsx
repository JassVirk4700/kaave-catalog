import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-[#fcfaf7] sticky top-0 z-50 shadow-sm border-b border-[#f0ede6]">
      <div className="w-15 h-15 pb-5 relative flex items-center justify-center opacity-100" aria-hidden="true">
        <Image
          src="/images/assets/indian-cultural-elephant.png"
          alt="Decorative Elephant"
          width={70}
          height={70}
          className="object-contain"
        />
      </div>

      <Link href="/" className="text-3xl font-serif font-bold tracking-widest text-[#5c2a2a] uppercase hover:opacity-80 transition-opacity">
        KAAVE
      </Link>

      <div className="w-15 h-15 pb-5 relative flex items-center justify-center opacity-100" aria-hidden="true">
        <Image
          src="/images/assets/indian-cultural-elephant.png"
          alt="Decorative Elephant Flipped"
          width={70}
          height={70}
          className="object-contain scale-x-[-1]"
        />
      </div>
    </header>
  );
};
