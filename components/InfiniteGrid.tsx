"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types";
import ProductTile from "./ProductTile";
import ProductModal from "./ProductModal";

const PAGE_SIZE = 12;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function InfiniteGrid({ products }: { products: Product[] }) {
  const [shuffled] = useState(() => shuffle(products));
  const [visible, setVisible] = useState<Product[]>(shuffled.slice(0, PAGE_SIZE));
  const [selected, setSelected] = useState<Product | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisible((prev) => {
      if (prev.length >= shuffled.length) return prev;
      return shuffled.slice(0, prev.length + PAGE_SIZE);
    });
  }, [shuffled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((p) => (
          <ProductTile key={p.id} product={p} onClick={setSelected} />
        ))}
      </div>

      {/* Sentinel */}
      {visible.length < shuffled.length && (
        <div ref={loaderRef} className="h-16 flex items-center justify-center">
          <span className="text-cyan-700 text-sm animate-pulse">Loading more...</span>
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
