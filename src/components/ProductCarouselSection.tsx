import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

interface ProductCarouselSectionProps {
  title: string;
  products: Product[];
  badge?: string;
}

const ProductCarouselSection = ({ title, products, badge }: ProductCarouselSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {badge && (
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-1.5 rounded-full border border-border hover:bg-secondary disabled:opacity-30 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-1.5 rounded-full border border-border hover:bg-secondary disabled:opacity-30 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
      >
        {products.map((p) => (
          <div key={p.id} className="min-w-[220px] max-w-[220px] flex-shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarouselSection;
