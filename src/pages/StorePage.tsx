import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck, Share2, Heart, MessageCircle, ArrowUpDown } from "lucide-react";
import { getStoreBySlug } from "@/data/stores";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const sortOptions = [
  { label: "Relevancia", value: "relevance" },
  { label: "Menor precio", value: "price-asc" },
  { label: "Mayor precio", value: "price-desc" },
  { label: "Mejor calificación", value: "rating" },
];

const StorePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const store = getStoreBySlug(slug ?? "");
  const [activeTab, setActiveTab] = useState("productos");
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOpen, setSortOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  if (!store) {
    return (
      <div className="container mx-auto max-w-[1440px] px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Tienda no encontrada</h1>
        <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const storeProducts = allProducts.filter(
    (p) => p.store.toLowerCase().replace(/\s/g, "") === slug
  );

  const sortedProducts = [...storeProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  const subcategories = [...new Set(storeProducts.map(p => p.subcategory))];
  const avgRating = storeProducts.length > 0
    ? (storeProducts.reduce((s, p) => s + p.rating, 0) / storeProducts.length).toFixed(1)
    : store.rating;

  const fakeReviews = [
    { name: "María L.", rating: 5, comment: "Excelente tienda, productos originales y envío rápido.", date: "Hace 2 días" },
    { name: "Carlos R.", rating: 4, comment: "Buena atención al cliente, el producto llegó bien empacado.", date: "Hace 1 semana" },
    { name: "Ana G.", rating: 5, comment: "Muy satisfecha con mi compra, 100% recomendada.", date: "Hace 2 semanas" },
  ];

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-r from-primary/20 to-primary/5">
        <img src={store.banner} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto max-w-[1440px] px-6">
        {/* Store info card */}
        <div className="relative -mt-16 z-10 bg-card border border-border rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <img src={store.logo} alt={store.name} className="h-24 w-24 rounded-xl border-4 border-background object-cover shadow-md flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{store.name}</h1>
                <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verificada
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {store.location}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(store.rating) ? "text-warning fill-warning" : "text-border"}`} />
                  ))}
                  <span className="text-sm font-semibold ml-1">{avgRating}</span>
                  <span className="text-xs text-muted-foreground">({store.reviews} reseñas)</span>
                </div>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{storeProducts.length} productos</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{subcategories.length} categorías</span>
              </div>
              <p className="text-sm text-muted-foreground">{store.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant={following ? "default" : "outline"}
                size="sm"
                className="gap-1.5"
                onClick={() => setFollowing(!following)}
              >
                <Heart className={`h-4 w-4 ${following ? "fill-primary-foreground" : ""}`} />
                {following ? "Siguiendo" : "Seguir"}
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="h-4 w-4" /> Compartir
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border mb-6">
          {[
            { label: "Productos", value: "productos" },
            { label: "Reseñas", value: "resenas" },
            { label: "Sobre la tienda", value: "about" },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition ${activeTab === tab.value ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === "productos" && (
          <div className="pb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{storeProducts.length} productos</h2>
              <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/50 transition">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  {sortOptions.find(o => o.value === sortBy)?.label}
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-20 w-44">
                    {sortOptions.map(opt => (
                      <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/50 ${sortBy === opt.value ? "text-primary font-semibold" : ""}`}
                      >{opt.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {sortedProducts.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">Esta tienda aún no tiene productos listados.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {sortedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "resenas" && (
          <div className="pb-12 max-w-3xl">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{avgRating}</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(Number(avgRating)) ? "fill-warning text-warning" : "text-border"}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{store.reviews} reseñas</p>
              </div>
            </div>
            <div className="space-y-4">
              {fakeReviews.map((r, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{r.name[0]}</div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, j) => (
                      <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-warning text-warning" : "text-border"}`} />
                    ))}</div>
                  </div>
                  <p className="text-sm text-foreground pl-12">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="pb-12 max-w-2xl space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Acerca de {store.name}</h3>
              <p className="text-sm text-muted-foreground">{store.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{storeProducts.length}</p>
                  <p className="text-xs text-muted-foreground">Productos</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{store.reviews}</p>
                  <p className="text-xs text-muted-foreground">Reseñas</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{store.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">contacto@{slug}.com</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Categorías disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {subcategories.map(sc => (
                  <span key={sc} className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground">{sc}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
