import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, MapPin, Package, Heart, CreditCard, ShieldCheck, Bell, ChevronRight, Star, BadgeCheck, LogOut, Settings, HelpCircle, X, Truck, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fakeOrders = [
  {
    id: "ORD-20241201", date: "1 Dic 2024", status: "Entregado", total: 189000, items: 2, store: "TechCali",
    products: [
      { name: "Audífonos Bluetooth Pro", qty: 1, price: 129000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80" },
      { name: "Cargador Inalámbrico Fast", qty: 1, price: 49000, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&q=80" },
    ],
    address: "Calle 15 #45-30, Barrio Granada, Cali",
    tracking: "COO-2024120145",
    deliveredDate: "3 Dic 2024",
  },
  {
    id: "ORD-20241128", date: "28 Nov 2024", status: "En camino", total: 95000, items: 1, store: "ModaUrbana",
    products: [
      { name: "Jeans Slim Fit Hombre", qty: 1, price: 95000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&q=80" },
    ],
    address: "Av 6N #23-50, Edificio Plaza, Cali",
    tracking: "COO-2024112833",
    deliveredDate: null,
  },
  {
    id: "ORD-20241115", date: "15 Nov 2024", status: "Entregado", total: 320000, items: 3, store: "ElectroMax",
    products: [
      { name: "Teclado Mecánico Compact", qty: 1, price: 189000, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&q=80" },
      { name: "Mouse Inalámbrico RGB", qty: 1, price: 59000, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&q=80" },
      { name: "Protector Pantalla", qty: 1, price: 15000, image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=80&q=80" },
    ],
    address: "Calle 15 #45-30, Barrio Granada, Cali",
    tracking: "COO-2024111520",
    deliveredDate: "18 Nov 2024",
  },
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

const formatCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("pedidos");
  const [selectedOrder, setSelectedOrder] = useState<typeof fakeOrders[0] | null>(null);

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

          <nav className="bg-card border border-border rounded-xl overflow-hidden">
            {sidebarLinks.map((link) => {
              if (link.href) {
                return (
                  <Link key={link.label} to={link.href} className="flex items-center gap-3 px-5 py-3.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition border-b border-border last:border-0">
                    <link.icon className="h-4.5 w-4.5" />
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                );
              }
              return (
                <button key={link.label} onClick={() => setActiveTab(link.tab!)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition border-b border-border last:border-0
                    ${activeTab === link.tab ? "bg-primary/5 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <link.icon className="h-4.5 w-4.5" />
                  <span className="flex-1 text-left">{link.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
            <Link to="/login" className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-destructive hover:bg-destructive/5 transition">
              <LogOut className="h-4.5 w-4.5" />
              <span className="flex-1 text-left">Cerrar Sesión</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="space-y-6 relative">
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
                        <span className="font-bold text-foreground">{formatCOP(order.total)}</span>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>Ver detalle</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Detail Modal */}
              {selectedOrder && (
                <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                  <div className="bg-background border border-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b border-border">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{selectedOrder.id}</h3>
                        <p className="text-xs text-muted-foreground">{selectedOrder.date}</p>
                      </div>
                      <button onClick={() => setSelectedOrder(null)} className="p-1.5 rounded-lg hover:bg-muted transition">
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="p-5 space-y-5">
                      {/* Status */}
                      <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-4">
                        <div className={`p-2 rounded-full ${selectedOrder.status === "Entregado" ? "bg-success/10" : "bg-warning/10"}`}>
                          {selectedOrder.status === "Entregado" ? <Package className="h-5 w-5 text-success" /> : <Truck className="h-5 w-5 text-warning" />}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{selectedOrder.status}</p>
                          {selectedOrder.deliveredDate ? (
                            <p className="text-xs text-muted-foreground">Entregado el {selectedOrder.deliveredDate}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">Estimado: 1-2 días hábiles</p>
                          )}
                        </div>
                      </div>

                      {/* Products */}
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-3">Productos</h4>
                        <div className="space-y-3">
                          {selectedOrder.products.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Cant: {item.qty}</p>
                              </div>
                              <span className="text-sm font-semibold text-foreground">{formatCOP(item.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground text-sm">Envío</h4>
                        <div className="bg-muted/30 rounded-lg p-3 space-y-1.5">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{selectedOrder.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Guía: {selectedOrder.tracking}</span>
                          </div>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-lg font-bold text-primary">{formatCOP(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                      {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Principal</span>}
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
