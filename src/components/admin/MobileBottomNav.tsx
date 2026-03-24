"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiPlusSquare, FiUser } from "react-icons/fi";

const NAV_ITEMS = [
    { label: "Dashboard", outlineIcon: FiGrid, href: "/dashboard" },
    { label: "Create", outlineIcon: FiPlusSquare, href: "/create" },
    { label: "Profile", outlineIcon: FiUser, href: "/profile" },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Completely hide navigation if user is at the login screen
    if (pathname?.includes("/login") || !mounted) return null;

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-100 md:hidden flex justify-around items-center h-18 bg-white/95 backdrop-blur-xl border-t border-[#eae6df] shadow-[0_-8px_30px_rgba(0,0,0,0.04)]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.outlineIcon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`relative flex flex-col items-center justify-center flex-1 h-full gap-1.5 transition-colors ${isActive ? "text-[#873d3d]" : "text-gray-400"}`}
                    >
                        {/* Active Top Bar Indicator */}
                        {isActive && (
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.75 bg-[#873d3d] rounded-b-md shadow-sm" />
                        )}

                        <span className={`transition-all duration-300 ${isActive ? "-translate-y-0.5" : "translate-y-0.5"}`}>
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        </span>

                        <span className={`text-[10px] uppercase font-bold tracking-widest transition-all ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 absolute"}`}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
