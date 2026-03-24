import { ReactNode } from "react";
import { DesktopSidebar } from "@/components/admin/DesktopSidebar";
import { MobileBottomNav } from "@/components/admin/MobileBottomNav";
import { Header } from "@/components/layout/Header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fcfaf7]">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-24 md:pb-0">
        {/* Header: visible on mobile only, sidebar handles navigation on desktop */}
        <div className="md:hidden">
          <Header />
        </div>
        <div className="pt-2">
          {children}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
