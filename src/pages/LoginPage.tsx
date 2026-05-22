import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, User, ShoppingBag, TrendingUp, Package, Star, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  // Si ya está autenticado, redirigir según rol
  useEffect(() => {
    if (!loading && user) {
      navigate(role === "store" ? "/dashboard" : "/", { replace: true });
    }
  }, [user, role, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/30 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <Link to="/auth" className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 bg-card border border-border hover:border-primary/40 hover:text-primary text-foreground text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
        <LogIn className="h-4 w-4" /> Iniciar sesión / Registrarse
      </Link>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-primary">Fas</span><span className="text-foreground">merco</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">El marketplace de Cali para el mundo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link to="/account" className="group bg-card border border-border rounded-2xl p-8 text-left hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Soy Comprador</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explora miles de productos de tiendas locales en Cali con envíos rápidos y precios increíbles.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[{ icon: ShoppingBag, text: "Comprar" }, { icon: Star, text: "Reseñar" }, { icon: Package, text: "Rastrear" }].map((f) => (
                <span key={f.text} className="inline-flex items-center gap-1.5 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                  <f.icon className="h-3 w-3" /> {f.text}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
              Continuar como comprador <span className="text-lg">→</span>
            </div>
          </Link>

          <Link to="/dashboard" className="group bg-card border border-border rounded-2xl p-8 text-left hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Soy Tienda</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Administra tu negocio, sube productos, gestiona pedidos y haz crecer tus ventas desde un solo lugar.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[{ icon: Package, text: "Inventario" }, { icon: TrendingUp, text: "Ventas" }, { icon: Store, text: "Mi Tienda" }].map((f) => (
                <span key={f.text} className="inline-flex items-center gap-1.5 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                  <f.icon className="h-3 w-3" /> {f.text}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
              Continuar como tienda <span className="text-lg">→</span>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">© 2026 Fasmerco. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default LoginPage;
