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
