"use client";
import { Product } from "@/types";
import { CATEGORY_COLORS, STATUS_COLORS, STATUS_LABELS } from "@/lib/products-data";
import { ExternalLink, Star } from "lucide-react";

interface Props {
  product: Product;
  onClick: (p: Product) => void;
}

export default function ProductTile({ product, onClick }: Props) {
  const catColor = CATEGORY_COLORS[product.category] ?? "cyan";
  const statusColor = STATUS_COLORS[product.status] ?? "cyan";

  return (
    <div
      onClick={() => onClick(product)}
      className="cursor-pointer rounded-xl border bg-slate-800 border-cyan-700/30 hover:border-cyan-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-105 neon-card neon-card-hover"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-full bg-${catColor}-500/10 border border-${catColor}-500/30 text-${catColor}-400`}
          >
            {product.category}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full bg-${statusColor}-500/10 border border-${statusColor}-500/30 text-${statusColor}-400`}
          >
            {STATUS_LABELS[product.status]}
          </span>
        </div>
        {product.featured && (
          <Star className="w-4 h-4 text-yellow-400 shrink-0" fill="currentColor" />
        )}
      </div>

      {/* Name & tagline */}
      <div>
        <h3 className="text-cyan-100 font-semibold text-base">{product.name}</h3>
        <p className="text-cyan-300 text-sm mt-0.5 line-clamp-2">{product.tagline}</p>
      </div>

      {/* Price / CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-cyan-400 text-sm font-medium">
          {product.priceLabel ?? (product.status === "live" ? "Free" : "—")}
        </span>
        <ExternalLink className="w-4 h-4 text-cyan-700" />
      </div>
    </div>
  );
}
