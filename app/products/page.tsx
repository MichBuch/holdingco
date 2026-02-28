import { PRODUCTS } from "@/lib/products-data";
import InfiniteGrid from "@/components/InfiniteGrid";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-100">Products</h1>
        <p className="text-cyan-300 mt-1">
          {PRODUCTS.length} products — tiles are randomised on each visit so everything gets a turn.
        </p>
      </div>
      <InfiniteGrid products={PRODUCTS} />
    </div>
  );
}
