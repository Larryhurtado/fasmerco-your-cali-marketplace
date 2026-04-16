import { Star, BadgeCheck, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const storeSlug = product.store.toLowerCase().replace(/\s/g, "");

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
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
        </div>
      </Link>

      <div className="p-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`} className="text-sm font-semibold leading-snug line-clamp-2 hover:text-primary transition flex-1">{product.name}</Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({ id: product.id, name: product.name, price: product.price, image: product.image, store: product.store });
            }}
            className="flex-shrink-0 bg-primary text-primary-foreground p-1.5 rounded-md hover:opacity-90 transition shadow-sm"
            title="Agregar al carrito"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">{fmt(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{fmt(product.oldPrice)}</span>}
        </div>
        <p className="text-xs text-muted-foreground">
          Vendido por: <Link to={`/store/${storeSlug}`} className="text-primary hover:underline font-medium">{product.store}</Link>
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
