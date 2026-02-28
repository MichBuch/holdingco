"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductCategory, ProductStatus } from "@/types";
import { Trash2, Plus, Edit2, Save, X } from "lucide-react";

const EMPTY: Partial<Product> = {
  id: "", name: "", tagline: "", description: "",
  category: "utility", status: "coming_soon",
  tags: [], featured: false,
};

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (!t) { router.push("/admin/login"); return; }
    setToken(t);
    fetch("/api/products").then((r) => r.json()).then(setProducts);
  }, [router]);

  async function save() {
    if (!editing) return;
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token! },
      body: JSON.stringify(editing),
    });
    const updated = await fetch("/api/products").then((r) => r.json());
    setProducts(updated);
    setEditing(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-token": token! },
      body: JSON.stringify({ id }),
    });
    setProducts((p) => p.filter((x) => x.id !== id));
  }

  if (!token) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cyan-100">Admin — Products</h1>
        <button
          onClick={() => { setEditing({ ...EMPTY }); setIsNew(true); }}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Edit / Add form */}
      {editing && (
        <div className="bg-slate-800 border border-cyan-700/40 rounded-2xl p-6 mb-8 neon-card">
          <h2 className="text-lg font-semibold text-cyan-100 mb-4">
            {isNew ? "New Product" : `Editing: ${editing.name}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(["id","name","tagline","url","downloadUrl","priceLabel","contactEmail"] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-cyan-400 mb-1 block capitalize">{field}</label>
                <input
                  value={(editing as Record<string,unknown>)[field] as string ?? ""}
                  onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-700/50 text-cyan-100 placeholder-cyan-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-cyan-400 mb-1 block">Price (pence)</label>
              <input
                type="number"
                value={editing.price ?? ""}
                onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-cyan-700/50 text-cyan-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 mb-1 block">Status</label>
              <select
                value={editing.status}
                onChange={(e) => setEditing({ ...editing, status: e.target.value as ProductStatus })}
                className="w-full bg-slate-900 border border-cyan-700/50 text-cyan-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {["live","beta","coming_soon","wip"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-cyan-400 mb-1 block">Category</label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value as ProductCategory })}
                className="w-full bg-slate-900 border border-cyan-700/50 text-cyan-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {["video","image","productivity","game","social","ai","directory","marketplace","education","utility","travel","music","property","community"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-cyan-400 mb-1 block">Description</label>
              <textarea
                rows={3}
                value={editing.description ?? ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full bg-slate-900 border border-cyan-700/50 text-cyan-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-cyan-400 mb-1 block">Tags (comma separated)</label>
              <input
                value={(editing.tags ?? []).join(", ")}
                onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                className="w-full bg-slate-900 border border-cyan-700/50 text-cyan-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={editing.featured ?? false}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="accent-cyan-500"
              />
              <label htmlFor="featured" className="text-sm text-cyan-300">Featured</label>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setEditing(null)} className="flex items-center gap-2 border border-cyan-700/50 hover:border-cyan-500 text-cyan-300 px-4 py-2 rounded-lg transition-all">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="rounded-xl border border-cyan-700/30 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-cyan-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-700/20">
            {products.map((p) => (
              <tr key={p.id} className="bg-slate-900 hover:bg-slate-800/60 transition-colors">
                <td className="px-4 py-3 text-cyan-100 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-cyan-300 capitalize">{p.category}</td>
                <td className="px-4 py-3 text-cyan-300">{p.status}</td>
                <td className="px-4 py-3 text-cyan-400">{p.priceLabel ?? "—"}</td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <button onClick={() => { setEditing({ ...p }); setIsNew(false); }} className="text-cyan-400 hover:text-cyan-100 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(p.id)} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
