import { Laptop, Shirt, Home, Sparkles, PawPrint, Dumbbell, MapPin } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const categories = [
  { name: "Tecnología", icon: Laptop },
  { name: "Moda", icon: Shirt },
  { name: "Hogar", icon: Home },
  { name: "Belleza", icon: Sparkles },
  { name: "Mascotas", icon: PawPrint },
  { name: "Deportes", icon: Dumbbell },
];

const CategoryNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto flex items-center gap-1 max-w-[1440px] px-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => navigate(`/search?q=${encodeURIComponent(cat.name)}`)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition whitespace-nowrap"
          >
            <cat.icon className="h-4 w-4" />
            {cat.name}
          </button>
        ))}
        <Link to="/stores" className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-primary-foreground bg-primary rounded-md hover:opacity-90 transition whitespace-nowrap ml-auto">
          <MapPin className="h-4 w-4" />
          Tiendas de Cali
        </Link>
      </div>
    </nav>
  );
};

export default CategoryNav;
