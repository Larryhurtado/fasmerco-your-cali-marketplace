import { ChevronLeft, ChevronRight, Star, BadgeCheck } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { stores } from "@/data/stores";

const StoreCarouselSection = () => {
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
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Nuevas Tiendas Verificadas</h2>
          <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
            <BadgeCheck className="h-3.5 w-3.5" /> Verificadas
          </span>
        </div>
      </div>
      <div className="relative group">
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-2 rounded-full border border-border bg-background shadow-md hover:bg-secondary transition opacity-0 group-hover:opacity-100">
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-2 rounded-full border border-border bg-background shadow-md hover:bg-secondary transition opacity-0 group-hover:opacity-100">
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {stores.map((store) => (
            <Link
              to={`/store/${store.slug}`}
              key={store.slug}
              className="min-w-[260px] max-w-[260px] flex-shrink-0 rounded-xl border border-border bg-card hover:shadow-md transition-shadow overflow-hidden group/card"
            >
              <div className="h-24 overflow-hidden">
                <img src={store.banner} alt={store.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform" />
              </div>
              <div className="p-4 flex items-start gap-3">
                <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary flex-shrink-0 -mt-7 bg-background" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm truncate">{store.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {store.rating} · {store.reviews} reseñas
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{store.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreCarouselSection;
