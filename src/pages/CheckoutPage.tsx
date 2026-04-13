import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CreditCard, Building2, Smartphone, Banknote, Truck, Store, Bike, Tag, ShieldCheck, ChevronLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const COUPONS: Record<string, number> = {
  FASMERCO10: 10,
  BIENVENIDO: 15,
  PROMO20: 20,
};

type PaymentMethod = "card" | "pse" | "nequi" | "efecty";
type ShippingMethod = "coordinadora" | "fasmerco" | "pickup";

const shippingOptions = [
  { id: "coordinadora" as ShippingMethod, name: "Coordinadora", desc: "Entrega en 1-2 días hábiles", price: 12000, icon: Truck },
  { id: "fasmerco" as ShippingMethod, name: "Repartidores Fasmerco", desc: "Entrega el mismo día (Cali)", price: 8000, icon: Bike },
  { id: "pickup" as ShippingMethod, name: "Recoger en tienda", desc: "Disponible hoy mismo", price: 0, icon: Store },
];

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("coordinadora");

  // Card form
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState<"debit" | "credit">("credit");

  // PSE
  const [pseBank, setPseBank] = useState("");
  const [psePersonType, setPsePersonType] = useState("natural");
  const [pseDocType, setPseDocType] = useState("CC");
  const [pseDocNumber, setPseDocNumber] = useState("");

  // Nequi
  const [nequiPhone, setNequiPhone] = useState("");

  // Efecty
  const [efectyEmail, setEfectyEmail] = useState("");

  const shippingCost = shippingOptions.find((s) => s.id === shippingMethod)?.price ?? 0;
  const discount = appliedCoupon ? Math.round(totalPrice * (appliedCoupon.percent / 100)) : 0;
  const grandTotal = totalPrice - discount + shippingCost;

  const applyCoupon = () => {
    const upper = couponCode.trim().toUpperCase();
    if (COUPONS[upper]) {
      setAppliedCoupon({ code: upper, percent: COUPONS[upper] });
      setCouponError("");
    } else {
      setCouponError("Cupón no válido");
      setAppliedCoupon(null);
    }
  };

  const handleSubmit = () => {
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-[1440px] px-6 py-16 text-center">
        <p className="text-muted-foreground mb-4">No tienes productos en tu carrito.</p>
        <Link to="/" className="text-primary hover:underline font-medium">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="h-4 w-4" /> Volver al carrito
      </Link>

      <h1 className="text-2xl font-bold mb-8">Pasarela de Pago</h1>

      <div className="flex gap-8">
        {/* Left column */}
        <div className="flex-1 space-y-8">

          {/* Shipping */}
          <section className="border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Método de envío</h2>
            <RadioGroup value={shippingMethod} onValueChange={(v) => setShippingMethod(v as ShippingMethod)} className="space-y-3">
              {shippingOptions.map((opt) => (
                <label key={opt.id} className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${shippingMethod === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"}`}>
                  <RadioGroupItem value={opt.id} id={`ship-${opt.id}`} />
                  <opt.icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{opt.name}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  <span className="font-bold text-sm">{opt.price === 0 ? "Gratis" : fmt(opt.price)}</span>
                </label>
              ))}
            </RadioGroup>
          </section>

          {/* Payment method */}
          <section className="border border-border rounded-xl p-6 space-y-5">
            <h2 className="font-bold text-lg flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Método de pago</h2>

            <div className="grid grid-cols-4 gap-3">
              {([
                { id: "card" as PaymentMethod, label: "Tarjeta", icon: CreditCard },
                { id: "pse" as PaymentMethod, label: "PSE", icon: Building2 },
                { id: "nequi" as PaymentMethod, label: "Nequi", icon: Smartphone },
                { id: "efecty" as PaymentMethod, label: "Efecty", icon: Banknote },
              ]).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex flex-col items-center gap-2 border rounded-xl p-4 transition text-sm font-medium ${paymentMethod === m.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-muted-foreground/30 text-muted-foreground"}`}
                >
                  <m.icon className="h-6 w-6" />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Card form */}
            {paymentMethod === "card" && (
              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <button onClick={() => setCardType("credit")} className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${cardType === "credit" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"}`}>
                    Crédito
                  </button>
                  <button onClick={() => setCardType("debit")} className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${cardType === "debit" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"}`}>
                    Débito
                  </button>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Número de tarjeta</Label>
                  <Input placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={19} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Nombre del titular</Label>
                  <Input placeholder="Como aparece en la tarjeta" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Fecha de vencimiento</Label>
                    <Input placeholder="MM/AA" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} maxLength={5} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">CVV</Label>
                    <Input placeholder="•••" type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} maxLength={4} />
                  </div>
                </div>
              </div>
            )}

            {/* PSE */}
            {paymentMethod === "pse" && (
              <div className="space-y-4 pt-2">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Banco</Label>
                  <select value={pseBank} onChange={(e) => setPseBank(e.target.value)} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Selecciona tu banco</option>
                    <option>Bancolombia</option>
                    <option>Davivienda</option>
                    <option>Banco de Bogotá</option>
                    <option>BBVA Colombia</option>
                    <option>Banco de Occidente</option>
                    <option>Banco Popular</option>
                    <option>Banco AV Villas</option>
                    <option>Scotiabank Colpatria</option>
                    <option>Nequi</option>
                    <option>Banco Falabella</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Tipo de persona</Label>
                    <select value={psePersonType} onChange={(e) => setPsePersonType(e.target.value)} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="natural">Persona Natural</option>
                      <option value="juridica">Persona Jurídica</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Tipo de documento</Label>
                    <select value={pseDocType} onChange={(e) => setPseDocType(e.target.value)} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="CC">Cédula de ciudadanía</option>
                      <option value="CE">Cédula de extranjería</option>
                      <option value="NIT">NIT</option>
                      <option value="PP">Pasaporte</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Número de documento</Label>
                  <Input placeholder="Ej: 1234567890" value={pseDocNumber} onChange={(e) => setPseDocNumber(e.target.value)} />
                </div>
              </div>
            )}

            {/* Nequi */}
            {paymentMethod === "nequi" && (
              <div className="space-y-4 pt-2">
                <div className="bg-[#e6007e]/5 border border-[#e6007e]/20 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-[#e6007e] mb-1">Pago con Nequi</p>
                  <p className="text-muted-foreground">Ingresa tu número de celular Nequi. Recibirás una notificación push en la app para aprobar el pago.</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Número de celular Nequi</Label>
                  <Input placeholder="3XX XXX XXXX" value={nequiPhone} onChange={(e) => setNequiPhone(e.target.value)} maxLength={10} />
                </div>
              </div>
            )}

            {/* Efecty */}
            {paymentMethod === "efecty" && (
              <div className="space-y-4 pt-2">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-amber-600 mb-1">Pago en Efecty</p>
                  <p className="text-muted-foreground">Recibirás un código de pago por correo electrónico. Presenta este código en cualquier punto Efecty para realizar tu pago en efectivo. Tienes 48 horas para completar el pago.</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Correo electrónico</Label>
                  <Input type="email" placeholder="tu@correo.com" value={efectyEmail} onChange={(e) => setEfectyEmail(e.target.value)} />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right column - summary */}
        <div className="w-96 flex-shrink-0">
          <div className="border border-border rounded-xl p-5 space-y-4 sticky top-28">
            <h3 className="font-bold text-lg">Resumen del pedido</h3>

            {/* Products list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover border border-border flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Cant: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold whitespace-nowrap">{fmt(item.price * item.qty)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Código de cupón"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); }}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
                <button onClick={applyCoupon} className="px-4 h-9 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition">
                  Aplicar
                </button>
              </div>
              {couponError && <p className="text-xs text-destructive">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Check className="h-3.5 w-3.5" />
                  Cupón {appliedCoupon.code} aplicado: -{appliedCoupon.percent}%
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{fmt(totalPrice)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-primary">
                  <span>Descuento ({appliedCoupon.percent}%)</span>
                  <span className="font-semibold">-{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío ({shippingOptions.find((s) => s.id === shippingMethod)?.name})</span>
                <span className="font-semibold">{shippingCost === 0 ? "Gratis" : fmt(shippingCost)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{fmt(grandTotal)}</span>
            </div>

            <button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Confirmar y pagar
            </button>

            <p className="text-xs text-center text-muted-foreground">Tus datos están protegidos con encriptación SSL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
