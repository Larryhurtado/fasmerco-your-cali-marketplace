import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, BarChart3, Star, Store, Settings, LogOut, Plus, Search,
  TrendingUp, TrendingDown, Users, DollarSign, Eye, ChevronDown, Edit, Trash2, Image, Upload, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { megamenuData } from "@/data/megamenu";

const formatCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

/* ─── Fake Dashboard Data ─── */
const stats = [
  { label: "Ingresos del Mes", value: "$4.250.000", icon: DollarSign, trend: "+12%", up: true },
  { label: "Pedidos", value: "87", icon: ShoppingCart, trend: "+8%", up: true },
  { label: "Visitas al Perfil", value: "1.240", icon: Eye, trend: "+23%", up: true },
  { label: "Productos Activos", value: "34", icon: Package, trend: "-2", up: false },
];

const fakeOrders = [
  { id: "PED-001", customer: "María López", date: "15 Abr 2026", total: 189000, status: "Pendiente", items: 2 },
  { id: "PED-002", customer: "Carlos Ruiz", date: "14 Abr 2026", total: 350000, status: "Enviado", items: 1 },
  { id: "PED-003", customer: "Ana Gómez", date: "14 Abr 2026", total: 95000, status: "Entregado", items: 3 },
  { id: "PED-004", customer: "Juan Díaz", date: "13 Abr 2026", total: 420000, status: "Pendiente", items: 1 },
  { id: "PED-005", customer: "Laura Peña", date: "12 Abr 2026", total: 67000, status: "Entregado", items: 2 },
];

const fakeProducts = [
  { id: 1, name: "Audífonos Bluetooth Pro", price: 89000, stock: 45, category: "Tecnología", subcategory: "Audífonos Bluetooth", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80", status: "Activo" },
  { id: 2, name: "Cargador Inalámbrico", price: 49000, stock: 12, category: "Tecnología", subcategory: "Cargadores y Cables", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&q=80", status: "Activo" },
  { id: 3, name: "Funda iPhone 15", price: 35000, stock: 0, category: "Tecnología", subcategory: "Fundas (Cases)", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100&q=80", status: "Agotado" },
  { id: 4, name: "Parlante JBL Flip 6", price: 450000, stock: 8, category: "Tecnología", subcategory: "Parlantes Portátiles", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&q=80", status: "Activo" },
];

const fakeReviews = [
  { id: 1, customer: "María L.", product: "Audífonos Bluetooth Pro", rating: 5, comment: "Excelente calidad de sonido, muy cómodos.", date: "14 Abr 2026" },
  { id: 2, customer: "Carlos R.", product: "Cargador Inalámbrico", rating: 4, comment: "Buen producto, carga un poco lento.", date: "13 Abr 2026" },
  { id: 3, customer: "Ana G.", product: "Parlante JBL Flip 6", rating: 5, comment: "Increíble sonido y batería duradera.", date: "12 Abr 2026" },
  { id: 4, customer: "Pedro M.", product: "Funda iPhone 15", rating: 3, comment: "El color es diferente al de la foto.", date: "10 Abr 2026" },
];

const orderStatusColor: Record<string, string> = {
  Pendiente: "bg-warning/10 text-warning",
  Enviado: "bg-primary/10 text-primary",
  Entregado: "bg-success/10 text-success",
};

/* ─── Category-specific product form fields ─── */
const categoryFields: Record<string, { label: string; type: string; placeholder: string; options?: string[] }[]> = {
  Tecnología: [
    { label: "Marca", type: "text", placeholder: "Ej: Samsung, Apple..." },
    { label: "Modelo", type: "text", placeholder: "Ej: Galaxy A54" },
    { label: "Garantía (meses)", type: "number", placeholder: "12" },
    { label: "Especificaciones", type: "textarea", placeholder: "RAM, almacenamiento, procesador..." },
  ],
  Moda: [
    { label: "Talla", type: "select", placeholder: "Seleccionar", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { label: "Color", type: "text", placeholder: "Ej: Negro, Azul..." },
    { label: "Material", type: "text", placeholder: "Ej: Algodón, Poliéster..." },
    { label: "Género", type: "select", placeholder: "Seleccionar", options: ["Mujer", "Hombre", "Unisex"] },
  ],
  Belleza: [
    { label: "Tipo de Piel", type: "select", placeholder: "Seleccionar", options: ["Todo tipo", "Grasa", "Seca", "Mixta", "Sensible"] },
    { label: "Ingredientes", type: "textarea", placeholder: "Lista de ingredientes..." },
    { label: "Contenido (ml/g)", type: "text", placeholder: "Ej: 50ml" },
    { label: "Registro INVIMA", type: "text", placeholder: "Número de registro" },
  ],
  Mascotas: [
    { label: "Tipo de Mascota", type: "select", placeholder: "Seleccionar", options: ["Perro", "Gato", "Otro"] },
    { label: "Edad Recomendada", type: "select", placeholder: "Seleccionar", options: ["Cachorro", "Adulto", "Senior", "Todas las edades"] },
    { label: "Peso/Tamaño", type: "text", placeholder: "Ej: 1kg, Mediano..." },
  ],
  Hogar: [
    { label: "Material", type: "text", placeholder: "Ej: Acero, Madera..." },
    { label: "Dimensiones", type: "text", placeholder: "Ej: 30x20x15 cm" },
    { label: "Color", type: "text", placeholder: "Ej: Blanco, Negro..." },
    { label: "Voltaje", type: "select", placeholder: "Seleccionar", options: ["110V", "220V", "No aplica"] },
  ],
  Deportes: [
    { label: "Talla", type: "select", placeholder: "Seleccionar", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { label: "Peso (kg)", type: "text", placeholder: "Ej: 2.5" },
    { label: "Uso Recomendado", type: "select", placeholder: "Seleccionar", options: ["Gym", "Running", "Yoga", "CrossFit", "General"] },
    { label: "Sabor", type: "select", placeholder: "Seleccionar", options: ["No aplica", "Chocolate", "Vainilla", "Fresa", "Sin sabor"] },
  ],
};

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Package, label: "Productos", tab: "productos" },
  { icon: ShoppingCart, label: "Pedidos", tab: "pedidos" },
  { icon: BarChart3, label: "Ingresos", tab: "ingresos" },
  { icon: Star, label: "Reseñas", tab: "resenas" },
  { icon: Store, label: "Mi Tienda", tab: "tienda" },
  { icon: Settings, label: "Configuración", tab: "config" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [orderFilter, setOrderFilter] = useState("Todos");
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(fakeOrders.map(o => [o.id, o.status]))
  );
  const [configToggles, setConfigToggles] = useState<Record<string, boolean>>({
    "Notificaciones por Email": true,
    "Notificaciones Push": true,
    "Modo Vacaciones": false,
    "Envío Express": true,
  });

  const subcategories = selectedCategory
    ? megamenuData.find((c) => c.name === selectedCategory)?.groups.flatMap((g) => g.items.map((i) => i.name)) || []
    : [];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col min-h-screen sticky top-0">
        <div className="p-5 border-b border-border">
          <h1 className="text-xl font-extrabold">
            <span className="text-primary">Fas</span>
            <span className="text-foreground">merco</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Panel de Tienda</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => { setActiveTab(item.tab); setShowAddProduct(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
                ${activeTab === item.tab ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/5 transition"
          >
            <LogOut className="h-4.5 w-4.5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* ═══ DASHBOARD ═══ */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">¡Hola, TechCali! 👋</h2>
              <p className="text-muted-foreground text-sm">Resumen de tu tienda hoy</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <s.icon className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-foreground">{s.value}</span>
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? "text-success" : "text-destructive"}`}>
                      {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {s.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h3 className="font-semibold text-foreground">Pedidos Recientes</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("pedidos")}>Ver todos</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border text-muted-foreground">
                    <th className="text-left p-4 font-medium">Pedido</th>
                    <th className="text-left p-4 font-medium">Cliente</th>
                    <th className="text-left p-4 font-medium">Fecha</th>
                    <th className="text-left p-4 font-medium">Total</th>
                    <th className="text-left p-4 font-medium">Estado</th>
                  </tr></thead>
                  <tbody>
                    {fakeOrders.slice(0, 3).map((o) => (
                      <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="p-4 font-medium text-foreground">{o.id}</td>
                        <td className="p-4 text-muted-foreground">{o.customer}</td>
                        <td className="p-4 text-muted-foreground">{o.date}</td>
                        <td className="p-4 font-medium text-foreground">{formatCOP(o.total)}</td>
                        <td className="p-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${orderStatusColor[o.status]}`}>{o.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h3 className="font-semibold text-foreground">Últimas Reseñas</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("resenas")}>Ver todas</Button>
              </div>
              <div className="divide-y divide-border">
                {fakeReviews.slice(0, 2).map((r) => (
                  <div key={r.id} className="p-5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{r.customer}</span>
                      <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-warning text-warning" : "text-border"}`} />
                      ))}</div>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.product}</p>
                    <p className="text-sm text-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ PRODUCTOS ═══ */}
        {activeTab === "productos" && !showAddProduct && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground">Productos</h2>
              <Button onClick={() => setShowAddProduct(true)} className="gap-2"><Plus className="h-4 w-4" />Agregar Producto</Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar producto..." className="pl-9" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground bg-muted/30">
                  <th className="text-left p-4 font-medium">Producto</th>
                  <th className="text-left p-4 font-medium">Categoría</th>
                  <th className="text-left p-4 font-medium">Precio</th>
                  <th className="text-left p-4 font-medium">Stock</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr></thead>
                <tbody>
                  {fakeProducts.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.subcategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{p.category}</td>
                      <td className="p-4 font-medium text-foreground">{formatCOP(p.price)}</td>
                      <td className="p-4"><span className={p.stock === 0 ? "text-destructive font-medium" : "text-foreground"}>{p.stock}</span></td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.status === "Activo" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{p.status}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ ADD PRODUCT FORM ═══ */}
        {activeTab === "productos" && showAddProduct && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Agregar Producto</h2>
              <Button variant="ghost" onClick={() => setShowAddProduct(false)}><X className="h-4 w-4 mr-1" />Cancelar</Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              {/* Basic info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Información Básica</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Nombre del Producto *</label>
                    <Input placeholder="Ej: Audífonos Bluetooth Pro" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Precio (COP) *</label>
                    <Input type="number" placeholder="89000" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Precio Anterior (opcional)</label>
                    <Input type="number" placeholder="120000" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Stock *</label>
                    <Input type="number" placeholder="50" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Descripción</label>
                  <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]" placeholder="Describe tu producto..." />
                </div>
              </div>

              {/* Category selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Categorización</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Categoría *</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory(""); }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Seleccionar categoría</option>
                      {megamenuData.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Subcategoría *</label>
                    <select
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      disabled={!selectedCategory}
                    >
                      <option value="">Seleccionar subcategoría</option>
                      {subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic fields based on category */}
              {selectedCategory && categoryFields[selectedCategory] && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-sm">
                    Campos de {selectedCategory}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryFields[selectedCategory].map((field) => (
                      <div key={field.label} className={`space-y-1.5 ${field.type === "textarea" ? "md:col-span-2" : ""}`}>
                        <label className="text-sm font-medium text-foreground">{field.label}</label>
                        {field.type === "select" ? (
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option value="">{field.placeholder}</option>
                            {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]" placeholder={field.placeholder} />
                        ) : (
                          <Input type={field.type} placeholder={field.placeholder} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Images */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Imágenes</h3>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center space-y-3 hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Arrastra imágenes aquí o haz clic para subir</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB. Máximo 5 imágenes.</p>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Envío</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Tiempo de Entrega</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="same-day">Mismo día (Cali)</option>
                      <option value="1-2">1-2 días hábiles</option>
                      <option value="3-5">3-5 días hábiles</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Peso del paquete (kg)</label>
                    <Input type="number" placeholder="0.5" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="gap-2"><Plus className="h-4 w-4" />Publicar Producto</Button>
                <Button variant="outline" onClick={() => setShowAddProduct(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ PEDIDOS ═══ */}
        {activeTab === "pedidos" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Pedidos</h2>
            <div className="flex flex-wrap gap-2">
              {["Todos", "Pendiente", "Enviado", "Entregado"].map((f) => (
                <Button key={f} variant={orderFilter === f ? "default" : "outline"} size="sm" onClick={() => setOrderFilter(f)}>{f}</Button>
              ))}
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground bg-muted/30">
                  <th className="text-left p-4 font-medium">Pedido</th>
                  <th className="text-left p-4 font-medium">Cliente</th>
                  <th className="text-left p-4 font-medium">Fecha</th>
                  <th className="text-left p-4 font-medium">Items</th>
                  <th className="text-left p-4 font-medium">Total</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr></thead>
                <tbody>
                  {fakeOrders.filter(o => orderFilter === "Todos" || orderStatuses[o.id] === orderFilter).map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="p-4 font-medium text-foreground">{o.id}</td>
                      <td className="p-4 text-muted-foreground">{o.customer}</td>
                      <td className="p-4 text-muted-foreground">{o.date}</td>
                      <td className="p-4 text-muted-foreground">{o.items}</td>
                      <td className="p-4 font-medium text-foreground">{formatCOP(o.total)}</td>
                      <td className="p-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${orderStatusColor[orderStatuses[o.id]]}`}>{orderStatuses[o.id]}</span></td>
                      <td className="p-4">
                        <select
                          value={orderStatuses[o.id]}
                          onChange={(e) => setOrderStatuses(prev => ({ ...prev, [o.id]: e.target.value }))}
                          className="text-xs border border-input rounded-md px-2 py-1 bg-background"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Enviado">Enviado</option>
                          <option value="Entregado">Entregado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ INGRESOS ═══ */}
        {activeTab === "ingresos" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Ingresos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Ingresos Hoy", value: "$185.000", sub: "3 pedidos" },
                { label: "Ingresos Semana", value: "$1.250.000", sub: "18 pedidos" },
                { label: "Ingresos Mes", value: "$4.250.000", sub: "87 pedidos" },
              ].map((r) => (
                <div key={r.label} className="bg-card border border-border rounded-xl p-5 space-y-2">
                  <span className="text-sm text-muted-foreground">{r.label}</span>
                  <p className="text-2xl font-bold text-foreground">{r.value}</p>
                  <p className="text-xs text-muted-foreground">{r.sub}</p>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Ventas últimos 7 días</h3>
              <div className="flex items-end gap-3 h-48">
                {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-t-md relative" style={{ height: `${h}%` }}>
                      <div className="absolute inset-0 bg-primary rounded-t-md" style={{ height: `${h}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top products */}
            <div className="bg-card border border-border rounded-xl">
              <h3 className="font-semibold text-foreground p-5 border-b border-border">Productos Más Vendidos</h3>
              <div className="divide-y divide-border">
                {[
                  { name: "Audífonos Bluetooth Pro", sales: 42, revenue: 3738000 },
                  { name: "Parlante JBL Flip 6", sales: 15, revenue: 6750000 },
                  { name: "Cargador Inalámbrico", sales: 28, revenue: 1372000 },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-foreground text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sales} vendidos</p>
                    </div>
                    <span className="font-semibold text-foreground">{formatCOP(p.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ RESEÑAS ═══ */}
        {activeTab === "resenas" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Reseñas</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-5 text-center space-y-1">
                <p className="text-3xl font-bold text-foreground">4.5</p>
                <div className="flex justify-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-warning text-warning" : i < 5 ? "fill-warning/50 text-warning" : "text-border"}`} />
                ))}</div>
                <p className="text-xs text-muted-foreground">Promedio General</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center space-y-1">
                <p className="text-3xl font-bold text-foreground">{fakeReviews.length}</p>
                <p className="text-xs text-muted-foreground">Total Reseñas</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center space-y-1">
                <p className="text-3xl font-bold text-success">75%</p>
                <p className="text-xs text-muted-foreground">5 Estrellas</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {fakeReviews.map((r) => (
                <div key={r.id} className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {r.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{r.customer}</p>
                        <p className="text-xs text-muted-foreground">{r.product} · {r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-warning text-warning" : "text-border"}`} />
                    ))}</div>
                  </div>
                  <p className="text-sm text-foreground pl-12">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MI TIENDA ═══ */}
        {activeTab === "tienda" && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-foreground">Perfil de la Tienda</h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center relative group cursor-pointer">
                  <Store className="h-10 w-10 text-primary" />
                  <div className="absolute inset-0 bg-foreground/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Image className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">TechCali</h3>
                  <p className="text-sm text-muted-foreground">Tecnología y accesorios en Cali</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Nombre de la Tienda</label>
                  <Input defaultValue="TechCali" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
                  <Input defaultValue="contacto@techcali.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Teléfono</label>
                  <Input defaultValue="+57 312 456 7890" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Ubicación</label>
                  <Input defaultValue="Cali, Valle del Cauca" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Descripción</label>
                <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]" defaultValue="Los mejores productos de tecnología en Cali con envío el mismo día." />
              </div>

              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-foreground text-sm">Estadísticas del Perfil</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">1.240</p>
                    <p className="text-xs text-muted-foreground">Visitas este mes</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Seguidores</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">4.5</p>
                    <p className="text-xs text-muted-foreground">Calificación</p>
                  </div>
                </div>
              </div>

              <Button className="gap-2">Guardar Cambios</Button>
            </div>
          </div>
        )}

        {/* ═══ CONFIG ═══ */}
        {activeTab === "config" && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {Object.entries(configToggles).map(([label, enabled]) => {
                const desc: Record<string, string> = {
                  "Notificaciones por Email": "Recibe alertas de nuevos pedidos",
                  "Notificaciones Push": "Notificaciones en tiempo real",
                  "Modo Vacaciones": "Pausar la tienda temporalmente",
                  "Envío Express": "Habilitar entrega el mismo día",
                };
                return (
                  <div key={label} className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-medium text-foreground text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc[label]}</p>
                    </div>
                    <button
                      onClick={() => setConfigToggles(prev => ({ ...prev, [label]: !prev[label] }))}
                      className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${enabled ? "bg-primary" : "bg-border"}`}
                    >
                      <span className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-card border border-destructive/20 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-destructive text-sm">Zona de Peligro</h3>
              <p className="text-sm text-muted-foreground">Eliminar tu tienda permanentemente. Esta acción no se puede deshacer.</p>
              <Button variant="destructive" size="sm">Eliminar Tienda</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
