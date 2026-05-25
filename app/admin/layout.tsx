"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isLoginPage = pathname === "/admin/login";
  if (isLoginPage) return <>{children}</>;

  const navItems = [
    { href: "/admin/leads", label: "פניות" },
    { href: "/admin/content", label: "עריכת תוכן" },
  ];

  return (
    <div className="min-h-screen bg-brand-black text-brand-white flex flex-col">
      {/* Admin header */}
      <header className="bg-brand-soft border-b border-white/10 px-4 sm:px-6 h-14 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-1">
          <Link href="/" className="text-brand-gray hover:text-brand-white text-sm transition-colors">
            האתר
          </Link>
          <span className="text-brand-gray/40 mx-2">/</span>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-brand-turquoise/15 text-brand-turquoise"
                  : "text-brand-gray hover:text-brand-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={logout}
          className="text-xs text-brand-gray/60 hover:text-brand-gray transition-colors"
        >
          יציאה
        </button>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
