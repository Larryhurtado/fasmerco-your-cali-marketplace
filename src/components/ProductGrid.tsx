import ProductCard from "./ProductCard";
import { allProducts } from "@/data/products";

const ProductGrid = () => (
  <section className="flex-1">
    <h2 className="text-xl font-bold mb-4">Productos para ti</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

export default ProductGrid;
