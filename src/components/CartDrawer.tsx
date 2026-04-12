import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, removeItem, totalPrice } = useCart();

  // Group by store
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    (acc[item.store] ??= []).push(item);
    return acc;
  }, {});

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-foreground/30 z-50" onClick={onClose} />}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-background border-l border-border z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Mi Carrito
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-center text-muted-foreground mt-12 text-sm">Tu carrito está vacío</p>
          )}
          {Object.entries(grouped).map(([store, storeItems]) => (
            <div key={store} className="space-y-2">
              <p className="text-xs font-semibold text-primary">{store}</p>
              {storeItems.map((item) => (
                <div key={item.id} className="flex gap-3 bg-muted/50 rounded-lg p-2">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Cant: {item.qty}</p>
                    <p className="text-sm font-bold text-primary">{fmt(item.price * item.qty)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition self-center">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span className="text-primary">{fmt(totalPrice)}</span>
            </div>
            <button onClick={onClose} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition">
              <a href="/cart">Ver carrito completo</a>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
