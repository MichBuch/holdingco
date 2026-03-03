"use client";
import { Product } from "@/types";
import { CATEGORY_COLORS, STATUS_COLORS, STATUS_LABELS } from "@/lib/products-data";
import { X, ExternalLink, Download, Mail, ShoppingCart } from "lucide-react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  const catColor = CATEGORY_COLORS[product.category] ?? "cyan";
  const statusColor = STATUS_COLORS[product.status] ?? "cyan";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-cyan-700/40 rounded-2xl w-full max-w-lg p-6 relative neon-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
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
          <h2 className="text-2xl font-bold text-cyan-100">{product.name}</h2>
          <p className="text-cyan-300 mt-1">{product.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-cyan-100/80 text-sm leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-slate-700 text-cyan-300 border border-cyan-700/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {product.url && product.status === "live" && (
            <a
              href={`${product.url}/pricing`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors neon-btn"
            >
              <ShoppingCart className="w-4 h-4" />
              View Pricing
            </a>
          )}
          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-cyan-700/50 hover:border-cyan-500 text-cyan-300 hover:text-cyan-100 px-4 py-2 rounded-lg text-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </a>
          )}
          {product.downloadUrl && (
            <a
              href={product.downloadUrl}
              className="flex items-center gap-2 border border-cyan-700/50 hover:border-cyan-500 text-cyan-300 hover:text-cyan-100 px-4 py-2 rounded-lg text-sm transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          )}
          {product.contactEmail && (
            <a
              href={`mailto:${product.contactEmail}`}
              className="flex items-center gap-2 border border-cyan-700/50 hover:border-cyan-500 text-cyan-300 hover:text-cyan-100 px-4 py-2 rounded-lg text-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
