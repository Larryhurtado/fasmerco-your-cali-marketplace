import { Laptop, Shirt, Home, Sparkles, PawPrint, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Tecnología", icon: Laptop },
  { name: "Moda", icon: Shirt },
  { name: "Hogar", icon: Home },
  { name: "Belleza", icon: Sparkles },
  { name: "Mascotas", icon: PawPrint },
  { name: "Deportes", icon: Dumbbell },
];

const FeaturedCategories = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="text-xl font-bold mb-5">Categorías Destacadas</h2>
      <div className="flex items-center justify-between gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => navigate(`/search?q=${encodeURIComponent(cat.name)}`)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <cat.icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
