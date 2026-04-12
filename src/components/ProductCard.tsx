import { Star, ShoppingCart, BadgeCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow relative">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        {product.verified && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
            <BadgeCheck className="h-3 w-3" /> Verificado
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">
            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </span>
        )}
        {/* Hover add-to-cart */}
        <button
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, store: product.store })}
          className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-md hover:opacity-90"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold leading-snug line-clamp-2">{product.name}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">{fmt(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{fmt(product.oldPrice)}</span>}
        </div>
        <p className="text-xs text-muted-foreground">
          Vendido por: <a className="text-primary hover:underline font-medium cursor-pointer">{product.store}</a>
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-warning fill-warning" : "text-border"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
