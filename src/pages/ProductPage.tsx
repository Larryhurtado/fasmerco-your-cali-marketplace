import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, BadgeCheck, Truck, ShieldCheck } from "lucide-react";
import { allProducts, flashProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const product = [...allProducts, ...flashProducts].find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto max-w-[1440px] px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
        <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const storeSlug = product.store.toLowerCase().replace(/\s/g, "");

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      <div className="flex gap-10">
        {/* Image */}
        <div className="w-[480px] flex-shrink-0">
          <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          {product.verified && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded">
              <BadgeCheck className="h-3.5 w-3.5" /> Vendedor Verificado
            </span>
          )}
          <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-warning fill-warning" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{fmt(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{fmt(product.oldPrice)}</span>
                <span className="text-sm font-bold text-destructive">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Vendido por:{" "}
            <Link to={`/store/${storeSlug}`} className="text-primary hover:underline font-medium">
              {product.store}
            </Link>
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-primary" /> Llega hoy en Cali</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary" /> Compra protegida</span>
          </div>

          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, store: product.store })}
            className="w-full max-w-sm bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-base"
          >
            <ShoppingCart className="h-5 w-5" /> Añadir al carrito
          </button>

          <div className="border border-border rounded-lg p-4 space-y-2 mt-4">
            <h3 className="font-semibold text-sm">Descripción</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Producto de alta calidad disponible en {product.store}. Envío rápido dentro de Cali con garantía local. Categoría: {product.category}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
