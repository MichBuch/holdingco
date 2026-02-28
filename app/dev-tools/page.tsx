import { DEV_TOOLS } from "@/lib/products-data";
import DevToolTile from "@/components/DevToolTile";

const categories = [...new Set(DEV_TOOLS.map((t) => t.category))];

export default function DevToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-100">Dev Tools</h1>
        <p className="text-cyan-300 mt-1">Quick access to every tool in the stack.</p>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3 capitalize">
            {cat}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DEV_TOOLS.filter((t) => t.category === cat).map((tool) => (
              <DevToolTile key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
