import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Search } from "lucide-react";
import { stores, storeCategories } from "@/data/stores";

const AllStoresPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [search, setSearch] = useState("");

  const filtered = stores.filter((s) => {
    const matchesCat = activeCategory === "Todas" || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      <h1 className="text-2xl font-bold mb-1">Tiendas de Cali</h1>
      <p className="text-sm text-muted-foreground mb-6">Descubre todas las tiendas locales verificadas en nuestra plataforma</p>

      {/* Search & category filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tienda..."
            className="w-full rounded-lg border border-border bg-muted/50 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {storeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} tienda(s)</p>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">No se encontraron tiendas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((store) => (
            <Link
              key={store.slug}
              to={`/store/${store.slug}`}
              className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition bg-background"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={store.banner} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <span className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {store.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img src={store.logo} alt={store.name} className="h-10 w-10 rounded-lg object-cover border border-border" />
                  <div>
                    <h3 className="font-bold text-sm">{store.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {store.location}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{store.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < Math.floor(store.rating) ? "text-warning fill-warning" : "text-border"}`} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold">{store.rating}</span>
                  <span className="text-xs text-muted-foreground">({store.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStoresPage;
