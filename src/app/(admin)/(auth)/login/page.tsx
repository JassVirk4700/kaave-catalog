'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { loginAction } from '@/app/actions/auth';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Process form
        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData);

        // If we receive a result, it means there was an error
        // (A successful login redirects the browser instead of returning)
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] px-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f0ede6]">

                {/* Header Section */}
                <div className="bg-[#eae6df]/30 px-8 py-10 text-center border-b border-[#f0ede6] flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
                        <Image
                            src="/images/assets/indian-cultural-elephant.png"
                            alt="KAAVE Elephant Logo"
                            width={75}
                            height={75}
                            className="object-contain drop-shadow-sm opacity-90"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-gray-800 tracking-tight">
                        KAAVE
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm font-light uppercase tracking-widest">
                        Admin Secure Portal
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 flex items-center">
                                <svg className="w-5 h-5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Administrator Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d] focus:border-transparent transition-all"
                                placeholder="admin@kaave.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Secure Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            e.currentTarget.form?.requestSubmit();
                                        }
                                    }}
                                    className="w-full px-4 py-3 pr-12 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d] focus:border-transparent transition-all"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#873d3d] hover:bg-[#722f2f] text-white py-4 rounded-xl font-medium tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
