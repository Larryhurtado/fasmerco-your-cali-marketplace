import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const CartPage = () => {
  const { items, removeItem, addItem, totalPrice } = useCart();

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    (acc[item.store] ??= []).push(item);
    return acc;
  }, {});

  const storeSlug = (name: string) => name.toLowerCase().replace(/\s/g, "");

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <ShoppingBag className="h-6 w-6 text-primary" /> Mi Carrito
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
          <Link to="/" className="text-primary hover:underline font-medium">Seguir comprando</Link>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Items grouped by store */}
          <div className="flex-1 space-y-6">
            {Object.entries(grouped).map(([store, storeItems]) => (
              <div key={store} className="border border-border rounded-xl overflow-hidden">
                <div className="bg-secondary px-5 py-3 flex items-center justify-between">
                  <Link to={`/store/${storeSlug(store)}`} className="font-semibold text-sm text-primary hover:underline">
                    {store}
                  </Link>
                  <span className="text-xs text-muted-foreground">{storeItems.length} producto(s)</span>
                </div>
                <div className="divide-y divide-border">
                  {storeItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover border border-border" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} className="text-sm font-medium hover:text-primary transition line-clamp-1">{item.name}</Link>
                        <p className="text-base font-bold text-primary mt-1">{fmt(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() => {
                            if (item.qty <= 1) removeItem(item.id);
                            // For decrement we'd need a decrementItem — for now remove
                          }}
                          className="p-2 hover:bg-muted transition rounded-l-lg"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image, store: item.store })}
                          className="p-2 hover:bg-muted transition rounded-r-lg"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold w-28 text-right">{fmt(item.price * item.qty)}</p>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-80 flex-shrink-0">
            <div className="border border-border rounded-xl p-5 space-y-4 sticky top-28">
              <h3 className="font-bold text-lg">Resumen del pedido</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{fmt(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-primary font-semibold">Gratis</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{fmt(totalPrice)}</span>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition">
                Ir a pagar
              </button>
              <Link to="/" className="block text-center text-sm text-primary hover:underline">Seguir comprando</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
