import { Search, Heart, ShoppingCart, User } from "lucide-react";
import logo from "@/assets/fasmerco-logo.png";
import { useCart } from "@/context/CartContext";

interface MainHeaderProps {
  onCartOpen: () => void;
}

const MainHeader = ({ onCartOpen }: MainHeaderProps) => {
  const { totalItems } = useCart();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-3 gap-6 max-w-[1440px] px-6">
        {/* Logo */}
        <img src={logo} alt="Fasmerco" className="h-10 w-auto flex-shrink-0" />

        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Busca productos, tiendas o marcas locales..."
              className="w-full rounded-lg border border-border bg-muted/50 py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-md hover:opacity-90 transition">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition text-xs">
            <Heart className="h-5 w-5" />
            <span>Favoritos</span>
          </button>
          <button
            onClick={onCartOpen}
            className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition text-xs relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span>Carrito</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition text-xs">
            <User className="h-5 w-5" />
            <span>Mi Cuenta</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
