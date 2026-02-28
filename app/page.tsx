import Link from "next/link";
import { ArrowRight, Grid, Wrench, Zap } from "lucide-react";
import { PRODUCTS } from "@/lib/products-data";

const liveCount = PRODUCTS.filter((p) => p.status === "live").length;
const totalCount = PRODUCTS.length;

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Hero */}
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
          <Zap className="w-4 h-4" />
          {liveCount} products live · {totalCount} in the suite
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-cyan-100 leading-tight mb-4">
          A suite of tools
          <br />
          <span className="text-cyan-400">built for the future</span>
        </h1>

        <p className="text-cyan-300 text-lg mb-10 max-w-xl mx-auto">
          Video editors, AI agents, marketplaces, games and more. One place to
          discover, buy and access everything we build.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors neon-btn"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dev-tools"
            className="flex items-center gap-2 border border-cyan-700/50 hover:border-cyan-500 text-cyan-300 hover:text-cyan-100 px-6 py-3 rounded-lg font-medium transition-all"
          >
            <Wrench className="w-4 h-4" />
            Dev Tools
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {[
          { label: "Total Products", value: totalCount },
          { label: "Live Now", value: liveCount },
          { label: "In Beta", value: PRODUCTS.filter((p) => p.status === "beta").length },
          { label: "Coming Soon", value: PRODUCTS.filter((p) => p.status === "coming_soon").length },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border bg-slate-800 border-cyan-700/30 p-4 neon-card"
          >
            <p className="text-3xl font-bold text-cyan-400">{value}</p>
            <p className="text-cyan-300 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
