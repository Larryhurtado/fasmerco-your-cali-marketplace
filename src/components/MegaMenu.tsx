import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { megamenuData } from "@/data/megamenu";

const MegaMenu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(name);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveCategory(null), 150);
  };

  const handleSubClick = (category: string, subcategory: string) => {
    setActiveCategory(null);
    navigate(`/search?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(subcategory)}`);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(null);
    navigate(`/search?q=${encodeURIComponent(category)}`);
  };

  const activeCat = megamenuData.find((c) => c.name === activeCategory);

  return (
    <nav className="bg-background border-b border-border relative z-50">
      <div className="container mx-auto flex items-center gap-0 max-w-[1440px] px-6">
        {megamenuData.map((cat) => (
          <div
            key={cat.name}
            className="relative"
            onMouseEnter={() => handleEnter(cat.name)}
            onMouseLeave={handleLeave}
          >
            <button
              onClick={() => handleCategoryClick(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                activeCategory === cat.name
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat.name}
              <ChevronRight className={`h-3 w-3 transition-transform ${activeCategory === cat.name ? "rotate-90" : ""}`} />
            </button>
          </div>
        ))}

        <Link
          to="/stores"
          className="flex items-center gap-1.5 px-4 py-3 text-sm font-bold text-primary-foreground bg-primary rounded-md hover:opacity-90 transition whitespace-nowrap ml-auto my-1.5"
        >
          <MapPin className="h-4 w-4" />
          Tiendas de Cali
        </Link>
      </div>

      {/* Mega dropdown panel */}
      {activeCat && (
        <div
          className="absolute left-0 right-0 bg-background border-b border-border shadow-lg z-50"
          onMouseEnter={() => handleEnter(activeCat.name)}
          onMouseLeave={handleLeave}
        >
          <div className="container mx-auto max-w-[1440px] px-6 py-6">
            <div className="grid grid-cols-4 gap-8">
              {activeCat.groups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                    {group.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleSubClick(activeCat.name, item.name)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 w-full text-left px-2 py-1.5 rounded-md transition"
                        >
                          <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-border">
              <button
                onClick={() => handleCategoryClick(activeCat.name)}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Ver todo en {activeCat.name} →
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MegaMenu;
