import Link from 'next/link';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';

export default function ProductNotFound() {
  return (
    <div className="font-sans bg-[#fcfaf7] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-[#eae6df] rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg
            className="w-12 h-12 text-[#873d3d] opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-3">Product Not Found</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
          We couldn&apos;t find the product you were looking for. It may have been removed or the link might be broken.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#873d3d] hover:bg-[#6e3030] text-white rounded-full font-medium tracking-wide transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Catalog
        </Link>
      </main>

      <Footer />
    </div>
  );
}
