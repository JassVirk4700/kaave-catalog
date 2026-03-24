"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FiGrid, FiPlusSquare, FiUser, FiChevronRight } from "react-icons/fi";

const NAV_ITEMS = [
    { label: "Dashboard", icon: FiGrid, href: "/dashboard" },
    { label: "Create Product", icon: FiPlusSquare, href: "/create" },
    { label: "Admin Profile", icon: FiUser, href: "/profile" },
];

export function DesktopSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(min-width: 1280px)");
        const updateByViewport = (event?: MediaQueryListEvent) => {
            setCollapsed(!(event ? event.matches : mediaQuery.matches));
        };

        updateByViewport();
        mediaQuery.addEventListener("change", updateByViewport);
        return () => mediaQuery.removeEventListener("change", updateByViewport);
    }, []);

    // All hooks must be called before any conditional returns (Rules of Hooks)
    if (!mounted || pathname?.includes("/login")) return null;

    return (
        <>
            <aside
                className={`hidden md:flex fixed top-0 left-0 bottom-0 z-40 flex-col bg-white border-r border-[#eae6df] transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
                aria-label="Admin Navigation"
            >
                {/* Logo Section */}
                <div className="flex items-center justify-center h-18 border-b border-[#eae6df] shrink-0">
                    <Link href="/dashboard" className={`flex items-center gap-3 transition-all duration-300 w-full ${collapsed ? "justify-center px-0" : "px-6"}`}>
                        <div className="relative shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#fcfaf7] border border-[#f0ede6] overflow-hidden">
                            <Image
                                src="/images/assets/indian-cultural-elephant.png"
                                width={34}
                                height={34}
                                alt="KAAVE Admin"
                                className="object-contain"
                            />
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden flex flex-col items-start pt-1">
                                <span className="text-gray-800 font-serif font-bold text-xl leading-none tracking-tight">KAAVE</span>
                                <span className="text-[#873d3d] text-[9px] tracking-[0.2em] uppercase font-bold mt-1">Admin</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 flex flex-col gap-1.5 pt-6 px-3 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`relative flex items-center gap-4 rounded-xl transition-all duration-200 group
                                    ${collapsed ? "py-3 px-3 mx-auto" : "py-3.5 px-4"}
                                    ${isActive
                                        ? "bg-[#873d3d]/5 text-[#873d3d] font-bold border border-[#873d3d]/10"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-[#fcfaf7] border border-transparent font-medium"
                                    }`}
                            >
                                {/* Active indicator line */}
                                {isActive && !collapsed && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-6 rounded-r-md bg-[#873d3d] shadow-sm shadow-[#873d3d]/20" />
                                )}

                                <span className={`shrink-0 flex items-center justify-center ${!collapsed && '-ml-0.5'}`}>
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                                </span>

                                <span className={`text-[13px] tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? "max-w-0 opacity-0 hidden" : "max-w-50 opacity-100 block"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Tagline Bottom */}
                <div className="shrink-0 flex items-center justify-center p-6 pb-8">
                    <p className={`${collapsed ? "hidden" : "block"} text-[10px] text-gray-400/80 tracking-[0.15em] uppercase text-center leading-relaxed font-bold`}>
                        Premium<br />E-Commerce
                    </p>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-25 z-50 hidden md:flex h-6 w-6 items-center justify-center rounded-full border border-[#eae6df] bg-white text-gray-400 hover:text-[#873d3d] shadow-sm transition-colors"
                >
                    <FiChevronRight size={14} strokeWidth={2.5} className={`transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`} />
                </button>
            </aside>

            {/* Content Spacer so main content doesn't slip under fixed sidebar */}
            <div className={`hidden md:block shrink-0 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`} aria-hidden="true" />
        </>
    );
}
