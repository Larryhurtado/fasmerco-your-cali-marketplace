import { useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";
import ProductCard from "./ProductCard";
import { flashProducts } from "@/data/products";

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 3600 + 27 * 60 + 14);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-warning fill-warning" />
          <h2 className="text-xl font-bold">Flash Deals</h2>
          <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded font-semibold ml-2">
            Llega hoy
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-mono bg-foreground text-background px-3 py-1.5 rounded-md">
          <Clock className="h-4 w-4" />
          {pad(h)}:{pad(m)}:{pad(s)}
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {flashProducts.map((p) => (
          <div key={p.id} className="min-w-[220px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashDeals;
