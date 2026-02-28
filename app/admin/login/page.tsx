"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    // Store token in sessionStorage for admin pages
    sessionStorage.setItem("admin_token", token.trim());
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-800 border border-cyan-700/30 rounded-2xl p-8 neon-card">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <h1 className="text-xl font-bold text-cyan-100">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="bg-slate-900 border border-cyan-700/50 text-cyan-100 placeholder-cyan-400/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 neon-input"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-colors neon-btn"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
