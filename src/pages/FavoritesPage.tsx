import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { allProducts, flashProducts, type Product } from "@/data/products";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const initialFavorites = [...flashProducts.slice(0, 3), ...allProducts.slice(2, 6)];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>(initialFavorites);
  const { addItem } = useCart();

  const removeFav = (id: number) => setFavorites((prev) => prev.filter((p) => p.id !== id));

  const addToCart = (p: Product) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image, store: p.store });
  };

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition">Inicio</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Mis Favoritos</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-7 w-7 text-destructive fill-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Mis Favoritos</h1>
        <span className="text-muted-foreground text-sm">({favorites.length} productos)</span>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Heart className="h-16 w-16 text-muted-foreground/30" />
          <p className="text-lg text-muted-foreground">Aún no tienes productos favoritos</p>
          <Link to="/">
            <Button>Explorar productos</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((p) => (
            <div key={p.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300" />
                </Link>
                <button
                  onClick={() => removeFav(p.id)}
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-destructive hover:text-destructive-foreground transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {p.oldPrice && (
                  <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
                    -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <Link to={`/store/${p.store.toLowerCase().replace(/\s/g, "")}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition">
                  {p.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                  {p.store}
                </Link>

                <Link to={`/product/${p.id}`}>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition">{p.name}</h3>
                </Link>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(p.rating) ? "text-warning fill-warning" : "text-muted-foreground/30"}`} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{p.rating}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">{fmt(p.price)}</span>
                  {p.oldPrice && <span className="text-sm text-muted-foreground line-through">{fmt(p.oldPrice)}</span>}
                </div>

                <Button onClick={() => addToCart(p)} className="w-full mt-2 gap-2" size="sm">
                  <ShoppingCart className="h-4 w-4" />
                  Agregar al carrito
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
