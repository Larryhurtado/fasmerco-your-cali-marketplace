import { useParams, Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { getStoreBySlug } from "@/data/stores";
import { allProducts, flashProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const StorePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const store = getStoreBySlug(slug ?? "");

  if (!store) {
    return (
      <div className="container mx-auto max-w-[1440px] px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Tienda no encontrada</h1>
        <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const storeProducts = [...allProducts, ...flashProducts].filter(
    (p) => p.store.toLowerCase().replace(/\s/g, "") === slug
  );

  return (
    <div>
      {/* Banner */}
      <div className="relative h-56 overflow-hidden">
        <img src={store.banner} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      </div>

      <div className="container mx-auto max-w-[1440px] px-6">
        {/* Store info */}
        <div className="flex items-end gap-5 -mt-10 relative z-10 mb-8">
          <img src={store.logo} alt={store.name} className="h-20 w-20 rounded-xl border-4 border-background object-cover shadow-lg" />
          <div className="pb-1">
            <h1 className="text-2xl font-bold">{store.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3.5 w-3.5" /> {store.location}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(store.rating) ? "text-warning fill-warning" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold">{store.rating}</span>
              <span className="text-xs text-muted-foreground">({store.reviews} reseñas)</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{store.description}</p>
          </div>
        </div>

        {/* Products */}
        <h2 className="text-lg font-bold mb-4">Catálogo de {store.name}</h2>
        {storeProducts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8">Esta tienda aún no tiene productos listados.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-12">
            {storeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
