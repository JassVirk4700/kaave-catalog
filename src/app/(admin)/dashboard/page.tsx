import React from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient();

    // 1. Secure the route: Check if user is logged in
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        redirect('/login');
    }

    // 2. Fetch items for the table
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading products for dashboard:', error);
    }

    return (
        <div className="min-h-screen bg-[#fcfaf7] font-sans flex flex-col">
            <main className="grow w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 border-b border-[#eae6df] pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-800 tracking-tight">Catalog Dashboard</h1>
                        <p className="text-gray-500 mt-1 font-light text-sm md:text-base">
                            Manage your Supabase products directly from your portal.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">
                        <span className="text-xs font-medium text-gray-500 bg-white px-4 py-2 sm:py-1.5 rounded-full border border-[#eae6df] truncate max-w-full text-center">
                            Admin: {user.email}
                        </span>
                        <a
                            href="/"
                            className="text-sm px-5 py-2.5 border border-[#873d3d] text-[#873d3d] font-bold rounded-lg hover:bg-[#873d3d] hover:text-white transition-colors text-center shadow-sm"
                        >
                            View Live Store
                        </a>
                    </div>
                </div>

                {/* Supabase-style Table Container */}
                <div className="bg-white border border-[#eae6df] shadow-sm rounded-xl overflow-hidden">
                    <div className="overflow-x-auto subcategory-scroll">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-[#f5f3f0] text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-[#eae6df]">
                                    <th className="px-6 py-4 w-20">Image</th>
                                    <th className="px-6 py-4">Product Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Subcategory</th>
                                    <th className="px-6 py-4 w-32">Status</th>
                                    <th className="px-6 py-4 w-32 text-center">Images</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eae6df]">
                                {products?.map((product: any) => {
                                    const firstImage = product.image_urls?.[0];
                                    return (
                                        <tr key={product.id} className="hover:bg-[#fcfaf7] transition-colors group">
                                            <td className="px-6 py-4">
                                                <Link href={`/edit/${product.slug}`} className="block group/img">
                                                    {firstImage ? (
                                                        <div className="relative w-12 h-12 bg-[#eae6df] rounded-full overflow-hidden shadow-sm border border-[#eae6df] group-hover/img:ring-2 group-hover/img:ring-[#873d3d]/30 transition-all">
                                                            <Image
                                                                src={firstImage.startsWith('http') || firstImage.startsWith('/') ? firstImage : `/${firstImage}`}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="48px"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 bg-[#eae6df] rounded-full flex flex-col items-center justify-center border border-[#f0ede6] group-hover/img:bg-[#e0ddd5] transition-colors">
                                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">NA</span>
                                                        </div>
                                                    )}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/edit/${product.slug}`} className="block group/text">
                                                    <div className="text-sm font-medium text-gray-800 leading-snug group-hover/text:text-[#873d3d] transition-colors">{product.name}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5 font-mono">{product.short_description}</div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#eae6df] text-gray-700">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                                {product.subcategory}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.featured ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#873d3d]/10 text-[#873d3d] border border-[#873d3d]/20">
                                                        ✨ Featured
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 border border-gray-200">
                                                        Standard
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                    {product.image_urls?.length || 0} files
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm">
                                                <div className="flex items-center justify-end gap-3">
                                                    <a
                                                        href={`/product/${product.slug}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="font-medium text-[#128C7E] hover:text-[#0c6b5f] hover:underline"
                                                    >
                                                        Preview
                                                    </a>
                                                    <div className="w-px h-3 bg-[#eae6df]" />
                                                    <DeleteProductButton
                                                        productId={product.id}
                                                        productName={product.name}
                                                        slug={product.slug}
                                                        category={product.category}
                                                        subcategory={product.subcategory}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                                {(!products || products.length === 0) && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                <p className="text-gray-500 font-medium tracking-wide">No products found in the catalog.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
