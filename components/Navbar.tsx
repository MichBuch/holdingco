"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Grid, Wrench, ShieldCheck } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/products", label: "Products", icon: Grid },
  { href: "/dev-tools", label: "Dev Tools", icon: Wrench },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-slate-900/80 backdrop-blur border-b border-cyan-700/30 flex items-center px-6 gap-8">
      <Link href="/" className="flex items-center gap-2 mr-4">
        <span className="text-cyan-400 font-bold text-lg tracking-tight">
          Holding<span className="text-cyan-300">Co</span>
        </span>
      </Link>

      <div className="flex items-center gap-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-slate-800 text-cyan-400 border border-cyan-700/50"
                  : "text-cyan-300 hover:text-cyan-100 hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </div>

      <Link
        href="/admin"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cyan-300 hover:text-cyan-100 hover:bg-slate-800/60 transition-all duration-200"
      >
        <ShieldCheck className="w-4 h-4" />
        Admin
      </Link>
    </nav>
  );
}
