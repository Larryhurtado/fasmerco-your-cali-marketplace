import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, MapPin, Package, Heart, CreditCard, ShieldCheck, Bell, ChevronRight, Star, BadgeCheck, LogOut, Settings, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fakeOrders = [
  { id: "ORD-20241201", date: "1 Dic 2024", status: "Entregado", total: 189000, items: 2, store: "TechCali" },
  { id: "ORD-20241128", date: "28 Nov 2024", status: "En camino", total: 95000, items: 1, store: "ModaUrbana" },
  { id: "ORD-20241115", date: "15 Nov 2024", status: "Entregado", total: 320000, items: 3, store: "ElectroMax" },
];

const fakeAddresses = [
  { id: 1, label: "Casa", address: "Calle 15 #45-30, Barrio Granada", city: "Cali, Valle del Cauca", isDefault: true },
  { id: 2, label: "Oficina", address: "Av 6N #23-50, Edificio Plaza", city: "Cali, Valle del Cauca", isDefault: false },
];

const statusColor: Record<string, string> = {
  "Entregado": "bg-success/10 text-success",
  "En camino": "bg-warning/10 text-warning",
  "Procesando": "bg-primary/10 text-primary",
};

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("pedidos");

  const sidebarLinks = [
    { icon: Package, label: "Mis Pedidos", tab: "pedidos" },
    { icon: Heart, label: "Favoritos", href: "/favorites" },
    { icon: MapPin, label: "Direcciones", tab: "direcciones" },
    { icon: CreditCard, label: "Métodos de Pago", tab: "pagos" },
    { icon: Bell, label: "Notificaciones", tab: "notificaciones" },
    { icon: Settings, label: "Configuración", tab: "config" },
    { icon: HelpCircle, label: "Ayuda", tab: "ayuda" },
  ];

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition">Inicio</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Mi Cuenta</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-3">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg">Juan Pérez</h2>
              <p className="text-sm text-muted-foreground">juan.perez@email.com</p>
            </div>
            <div className="flex items-center justify-center gap-1 text-sm">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Miembro desde 2024</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="bg-card border border-border rounded-xl overflow-hidden">
            {sidebarLinks.map((link) => {
              if (link.href) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-3 px-5 py-3.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition border-b border-border last:border-0"
                  >
                    <link.icon className="h-4.5 w-4.5" />
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                );
              }
              return (
                <button
                  key={link.label}
                  onClick={() => setActiveTab(link.tab!)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition border-b border-border last:border-0
                    ${activeTab === link.tab ? "bg-primary/5 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <link.icon className="h-4.5 w-4.5" />
                  <span className="flex-1 text-left">{link.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
            <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-destructive hover:bg-destructive/5 transition">
              <LogOut className="h-4.5 w-4.5" />
              <span className="flex-1 text-left">Cerrar Sesión</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Pedidos */}
          {activeTab === "pedidos" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">Mis Pedidos</h2>
              <div className="space-y-4">
                {fakeOrders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground">{order.id}</span>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[order.status] || "bg-muted text-muted-foreground"}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date} · {order.items} producto(s) · {order.store}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-foreground">
                          {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(order.total)}
                        </span>
                        <Button variant="outline" size="sm">Ver detalle</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direcciones */}
          {activeTab === "direcciones" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-foreground">Mis Direcciones</h2>
                <Button size="sm" className="gap-2"><MapPin className="h-4 w-4" />Agregar dirección</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fakeAddresses.map((addr) => (
                  <div key={addr.id} className={`bg-card border rounded-xl p-5 space-y-2 ${addr.isDefault ? "border-primary" : "border-border"}`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Principal</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{addr.address}</p>
                    <p className="text-sm text-muted-foreground">{addr.city}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Eliminar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pagos */}
          {activeTab === "pagos" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-foreground">Métodos de Pago</h2>
                <Button size="sm" className="gap-2"><CreditCard className="h-4 w-4" />Agregar tarjeta</Button>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 text-center space-y-3">
                <CreditCard className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground">No tienes métodos de pago guardados</p>
                <Button variant="outline">Agregar método de pago</Button>
              </div>
            </div>
          )}

          {/* Notificaciones */}
          {activeTab === "notificaciones" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">Notificaciones</h2>
              <div className="space-y-3">
                {[
                  { title: "Tu pedido ORD-20241128 está en camino", time: "Hace 2 horas", read: false },
                  { title: "¡Flash Deal! 50% en audífonos Bluetooth", time: "Hace 1 día", read: false },
                  { title: "Tu pedido ORD-20241201 fue entregado", time: "Hace 3 días", read: true },
                  { title: "Bienvenido a Fasmerco 🎉", time: "Hace 1 semana", read: true },
                ].map((n, i) => (
                  <div key={i} className={`bg-card border border-border rounded-xl p-4 flex items-start gap-3 ${!n.read ? "border-l-4 border-l-primary" : ""}`}>
                    <Bell className={`h-5 w-5 mt-0.5 ${!n.read ? "text-primary" : "text-muted-foreground/40"}`} />
                    <div className="flex-1">
                      <p className={`text-sm ${!n.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Config */}
          {activeTab === "config" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">Configuración</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                {[
                  { label: "Nombre completo", value: "Juan Pérez" },
                  { label: "Correo electrónico", value: "juan.perez@email.com" },
                  { label: "Teléfono", value: "+57 312 456 7890" },
                  { label: "Contraseña", value: "••••••••" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-xs text-muted-foreground">{f.label}</p>
                      <p className="text-sm font-medium text-foreground">{f.value}</p>
                    </div>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ayuda */}
          {activeTab === "ayuda" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">Centro de Ayuda</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Package, title: "Seguimiento de pedidos", desc: "Rastrea tus pedidos en tiempo real" },
                  { icon: ShieldCheck, title: "Compra protegida", desc: "Garantía de devolución de 30 días" },
                  { icon: CreditCard, title: "Pagos y reembolsos", desc: "Información sobre pagos seguros" },
                  { icon: HelpCircle, title: "Preguntas frecuentes", desc: "Respuestas a las dudas más comunes" },
                ].map((item, i) => (
                  <button key={i} className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md hover:border-primary/30 transition space-y-2">
                    <item.icon className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
