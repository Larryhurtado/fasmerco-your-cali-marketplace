import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, User, Store, Mail, Lock, Phone, Eye, EyeOff, Building2, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "register";
type Role = "user" | "store";

const categories = ["Tecnología", "Belleza", "Mascotas", "Moda", "Hogar", "Deportes"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const AuthPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "login");
  const [role, setRole] = useState<Role>((params.get("role") as Role) || "user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Detectar rol real
        const uid = data.user?.id;
        if (uid) {
          const { data: roleRow } = await supabase
            .from("user_roles").select("role").eq("user_id", uid).maybeSingle();
          const realRole = roleRow?.role as "buyer" | "store" | undefined;
          toast.success("Sesión iniciada");
          navigate(realRole === "store" ? "/dashboard" : "/");
        } else {
          navigate("/");
        }
      } else {
        // Registro
        const appRole: "buyer" | "store" = role === "store" ? "store" : "buyer";
        const fullName = appRole === "store" ? storeName : name;

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName, phone, role: appRole },
          },
        });
        if (error) throw error;
        const uid = data.user?.id;
        if (!uid) {
          toast.success("Revisa tu correo para confirmar la cuenta");
          return;
        }

        // Si no hay sesión (email confirm activo), no podremos insertar role/store con RLS
        if (!data.session) {
          toast.success("Cuenta creada. Revisa tu correo para confirmar.");
          return;
        }

        // Insertar rol
        const { error: roleErr } = await supabase
          .from("user_roles").insert({ user_id: uid, role: appRole });
        if (roleErr && roleErr.code !== "23505") {
          console.error(roleErr);
        }

        // Si es tienda, crear store
        if (appRole === "store") {
          const baseSlug = slugify(storeName) || `tienda-${uid.slice(0, 6)}`;
          const slug = `${baseSlug}-${uid.slice(0, 4)}`;
          const { error: storeErr } = await supabase.from("stores").insert({
            owner_id: uid,
            name: storeName,
            slug,
            email,
            phone,
            category,
            description,
          });
          if (storeErr) {
            console.error(storeErr);
            toast.error("Cuenta creada pero hubo un problema creando la tienda");
          }
        }

        toast.success("¡Cuenta creada con éxito!");
        navigate(appRole === "store" ? "/dashboard" : "/");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error de autenticación";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/30 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl" />
      </div>

      <Link to="/login" className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-primary">Fas</span><span className="text-foreground">merco</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {mode === "login" ? "Inicia sesión en tu cuenta" : "Crea tu cuenta en segundos"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 p-6 md:p-8 space-y-6">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
            <button type="button" onClick={() => setRole("user")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${role === "user" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <User className="h-4 w-4" /> Usuario
            </button>
            <button type="button" onClick={() => setRole("store")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${role === "store" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <Store className="h-4 w-4" /> Tienda
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex border-b border-border">
            <button type="button" onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm font-semibold transition border-b-2 -mb-px ${mode === "login" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              Iniciar Sesión
            </button>
            <button type="button" onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm font-semibold transition border-b-2 -mb-px ${mode === "register" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              Registrarse
            </button>
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-md border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition disabled:opacity-50">
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">O continúa con email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                {role === "user" ? (
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Pérez" className="pl-9" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="storeName">Nombre del negocio</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="storeName" required value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Mi Tienda Cali" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="category">Categoría</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <select id="category" required value={category} onChange={(e) => setCategory(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <option value="" disabled>Selecciona una categoría</option>
                          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+57 300 123 4567" className="pl-9" />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="pl-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} required minLength={6}
                  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9" />
                <button type="button" onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "register" && role === "store" && (
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción de la tienda</Label>
                <textarea id="description" required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Cuéntanos sobre tu negocio..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-semibold">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> :
                mode === "login"
                  ? `Iniciar sesión`
                  : `Crear cuenta de ${role === "store" ? "Tienda" : "Usuario"}`}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-primary hover:underline font-semibold">
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">© 2026 Fasmerco. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default AuthPage;
