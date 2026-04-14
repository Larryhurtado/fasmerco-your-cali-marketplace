import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { categoryStoresMap } from "@/data/products";

interface FiltersProps {
  category?: string;
  selectedStores?: string[];
  onStoreChange?: (stores: string[]) => void;
  selectedPrices?: string[];
  onPriceChange?: (prices: string[]) => void;
  selectedDelivery?: string[];
  onDeliveryChange?: (delivery: string[]) => void;
}

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-3">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold py-2">
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="space-y-2 mt-1">{children}</div>}
    </div>
  );
};

const CheckItem = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5"
    />
    {label}
  </label>
);

const priceRanges = [
  { label: "Menos de $30.000", value: "0-30000" },
  { label: "$30.000 - $80.000", value: "30000-80000" },
  { label: "$80.000 - $150.000", value: "80000-150000" },
  { label: "Más de $150.000", value: "150000-999999" },
];

const deliveryOptions = [
  { label: "Entrega inmediata", value: "inmediata" },
  { label: "1 - 2 días", value: "1-2" },
];

const Filters = ({ category, selectedStores = [], onStoreChange, selectedPrices = [], onPriceChange, selectedDelivery = [], onDeliveryChange }: FiltersProps) => {
  const storesForCategory = useMemo(() => {
    if (!category) {
      // All stores from all categories
      return [...new Set(Object.values(categoryStoresMap).flat())];
    }
    return categoryStoresMap[category] ?? [];
  }, [category]);

  const toggleArray = (arr: string[], val: string, setter?: (v: string[]) => void) => {
    if (!setter) return;
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  return (
    <aside className="w-56 flex-shrink-0 hidden md:block">
      <div className="sticky top-28 space-y-3">
        <div className="flex items-center gap-2 text-base font-bold mb-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filtros
        </div>

        <FilterSection title="Rango de precio">
          {priceRanges.map((r) => (
            <CheckItem
              key={r.value}
              label={r.label}
              checked={selectedPrices.includes(r.value)}
              onChange={() => toggleArray(selectedPrices, r.value, onPriceChange)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Tienda">
          {storesForCategory.map((s) => (
            <CheckItem
              key={s}
              label={s}
              checked={selectedStores.includes(s)}
              onChange={() => toggleArray(selectedStores, s, onStoreChange)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Ubicación">
          <CheckItem label="Cali - Sur" checked={false} onChange={() => {}} />
          <CheckItem label="Cali - Norte" checked={false} onChange={() => {}} />
          <CheckItem label="Cali - Centro" checked={false} onChange={() => {}} />
        </FilterSection>

        <FilterSection title="Entrega">
          {deliveryOptions.map((d) => (
            <CheckItem
              key={d.value}
              label={d.label}
              checked={selectedDelivery.includes(d.value)}
              onChange={() => toggleArray(selectedDelivery, d.value, onDeliveryChange)}
            />
          ))}
        </FilterSection>
      </div>
    </aside>
  );
};

export default Filters;
