"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-paper">
      <AdminNav />
      <div className="flex-1 overflow-x-hidden px-10 py-10">{children}</div>
    </div>
  );
}
