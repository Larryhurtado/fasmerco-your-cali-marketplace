import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, User, Store, Mail, Lock, Phone, Eye, EyeOff, Building2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Mode = "login" | "register";
type Role = "user" | "store";

const categories = ["Tecnología", "Belleza", "Mascotas", "Moda", "Hogar", "Deportes"];

const AuthPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "login");
  const [role, setRole] = useState<Role>((params.get("role") as Role) || "user");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      mode === "login"
        ? `Bienvenido de vuelta${role === "store" ? " a tu tienda" : ""}`
        : `Cuenta creada exitosamente${role === "store" ? " para tu tienda" : ""}`
    );
    navigate(role === "store" ? "/dashboard" : "/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/30 flex items-center justify-center p-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <Link
        to="/login"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-primary">Fas</span>
            <span className="text-foreground">merco</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {mode === "login" ? "Inicia sesión en tu cuenta" : "Crea tu cuenta en segundos"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 p-6 md:p-8 space-y-6">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
                role === "user"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              Usuario
            </button>
            <button
              type="button"
              onClick={() => setRole("store")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
                role === "store"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Store className="h-4 w-4" />
              Tienda
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex border-b border-border">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm font-semibold transition border-b-2 -mb-px ${
                mode === "login"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm font-semibold transition border-b-2 -mb-px ${
                mode === "register"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Social login */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => {
                toast.success(`${mode === "login" ? "Iniciando sesión" : "Registrando"} con Google...`);
                setTimeout(() => navigate(role === "store" ? "/dashboard" : "/"), 600);
              }}
              className="w-full flex items-center justify-center gap-3 h-11 rounded-md border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success(`${mode === "login" ? "Iniciando sesión" : "Registrando"} con Facebook...`);
                setTimeout(() => navigate(role === "store" ? "/dashboard" : "/"), 600);
              }}
              className="w-full flex items-center justify-center gap-3 h-11 rounded-md border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#1877F2" d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 5.99 4.39 10.95 10.13 11.85V15.47H7.08V12h3.05V9.36c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.96H15.83c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 17.99 24 12z"/>
              </svg>
              Continuar con Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">O continúa con email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                {role === "user" ? (
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" required placeholder="Juan Pérez" className="pl-9" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="storeName">Nombre del negocio</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="storeName" required placeholder="Mi Tienda Cali" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="category">Categoría</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <select
                          id="category"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Selecciona una categoría
                          </option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" required placeholder="+57 300 123 4567" className="pl-9" />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" required placeholder="tu@email.com" className="pl-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "register" && role === "store" && (
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción de la tienda</Label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  placeholder="Cuéntanos sobre tu negocio..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  Recordarme
                </label>
                <button type="button" className="text-primary hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full h-11 text-sm font-semibold">
              {mode === "login"
                ? `Iniciar sesión como ${role === "store" ? "Tienda" : "Usuario"}`
                : `Crear cuenta de ${role === "store" ? "Tienda" : "Usuario"}`}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-primary hover:underline font-semibold"
            >
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2024 Fasmerco. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
