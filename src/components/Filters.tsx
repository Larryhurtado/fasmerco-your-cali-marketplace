import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { categoryStoresMap } from "@/data/products";
import { categorySubcategories } from "@/data/megamenu";

interface FiltersProps {
  category?: string;
  selectedStores?: string[];
  onStoreChange?: (stores: string[]) => void;
  selectedPrices?: string[];
  onPriceChange?: (prices: string[]) => void;
  selectedDelivery?: string[];
  onDeliveryChange?: (delivery: string[]) => void;
  selectedSubcategories?: string[];
  onSubcategoryChange?: (subs: string[]) => void;
  // Category-specific
  selectedSizes?: string[];
  onSizeChange?: (v: string[]) => void;
  selectedColors?: string[];
  onColorChange?: (v: string[]) => void;
  selectedBrands?: string[];
  onBrandChange?: (v: string[]) => void;
}

const FilterSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
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
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5" />
    {label}
  </label>
);

const priceRanges = [
  { label: "Menos de $30.000", value: "0-30000" },
  { label: "$30.000 - $80.000", value: "30000-80000" },
  { label: "$80.000 - $150.000", value: "80000-150000" },
  { label: "$150.000 - $500.000", value: "150000-500000" },
  { label: "Más de $500.000", value: "500000-99999999" },
];

const deliveryOptions = [
  { label: "Entrega inmediata", value: "inmediata" },
  { label: "1 - 2 días", value: "1-2" },
];

// Category-specific filter options
const modaSizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];
const modaColors = ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Beige", "Gris", "Rosa"];
const techBrands = ["Samsung", "Apple", "Xiaomi", "JBL", "ASUS", "Logitech"];
const bellezaTypes = ["Piel seca", "Piel grasa", "Piel mixta", "Todo tipo"];
const deportesSizes = ["S", "M", "L", "XL"];

const toggleArray = (arr: string[], val: string, setter?: (v: string[]) => void) => {
  if (!setter) return;
  setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
};

const Filters = ({
  category, selectedStores = [], onStoreChange, selectedPrices = [], onPriceChange,
  selectedDelivery = [], onDeliveryChange, selectedSubcategories = [], onSubcategoryChange,
  selectedSizes = [], onSizeChange, selectedColors = [], onColorChange,
  selectedBrands = [], onBrandChange,
}: FiltersProps) => {
  const storesForCategory = useMemo(() => {
    if (!category) return [...new Set(Object.values(categoryStoresMap).flat())];
    return categoryStoresMap[category] ?? [];
  }, [category]);

  const subcategories = useMemo(() => {
    if (!category) return [];
    return categorySubcategories[category] ?? [];
  }, [category]);

  return (
    <aside className="w-56 flex-shrink-0 hidden md:block">
      <div className="sticky top-28 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <div className="flex items-center gap-2 text-base font-bold mb-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filtros
        </div>

        {/* Subcategorías - solo si hay categoría */}
        {subcategories.length > 0 && (
          <FilterSection title="Subcategoría">
            {subcategories.map((s) => (
              <CheckItem key={s} label={s} checked={selectedSubcategories.includes(s)} onChange={() => toggleArray(selectedSubcategories, s, onSubcategoryChange)} />
            ))}
          </FilterSection>
        )}

        {/* Base: Precio */}
        <FilterSection title="Rango de precio">
          {priceRanges.map((r) => (
            <CheckItem key={r.value} label={r.label} checked={selectedPrices.includes(r.value)} onChange={() => toggleArray(selectedPrices, r.value, onPriceChange)} />
          ))}
        </FilterSection>

        {/* Base: Tienda */}
        <FilterSection title="Tienda">
          {storesForCategory.map((s) => (
            <CheckItem key={s} label={s} checked={selectedStores.includes(s)} onChange={() => toggleArray(selectedStores, s, onStoreChange)} />
          ))}
        </FilterSection>

        {/* ── Category-specific filters ── */}

        {/* Moda: Talla, Color */}
        {category === "Moda" && (
          <>
            <FilterSection title="Talla">
              {modaSizes.map((s) => (
                <CheckItem key={s} label={s} checked={selectedSizes.includes(s)} onChange={() => toggleArray(selectedSizes, s, onSizeChange)} />
              ))}
            </FilterSection>
            <FilterSection title="Color">
              {modaColors.map((c) => (
                <CheckItem key={c} label={c} checked={selectedColors.includes(c)} onChange={() => toggleArray(selectedColors, c, onColorChange)} />
              ))}
            </FilterSection>
          </>
        )}

        {/* Tecnología: Marca */}
        {category === "Tecnología" && (
          <FilterSection title="Marca">
            {techBrands.map((b) => (
              <CheckItem key={b} label={b} checked={selectedBrands.includes(b)} onChange={() => toggleArray(selectedBrands, b, onBrandChange)} />
            ))}
          </FilterSection>
        )}

        {/* Belleza: Tipo de piel */}
        {category === "Belleza" && (
          <FilterSection title="Tipo de piel" defaultOpen={false}>
            {bellezaTypes.map((t) => (
              <CheckItem key={t} label={t} checked={false} onChange={() => {}} />
            ))}
          </FilterSection>
        )}

        {/* Deportes: Talla */}
        {category === "Deportes" && (
          <FilterSection title="Talla">
            {deportesSizes.map((s) => (
              <CheckItem key={s} label={s} checked={selectedSizes.includes(s)} onChange={() => toggleArray(selectedSizes, s, onSizeChange)} />
            ))}
          </FilterSection>
        )}

        {/* Base: Ubicación */}
        <FilterSection title="Ubicación en Cali" defaultOpen={false}>
          <CheckItem label="Cali - Sur" checked={false} onChange={() => {}} />
          <CheckItem label="Cali - Norte" checked={false} onChange={() => {}} />
          <CheckItem label="Cali - Centro" checked={false} onChange={() => {}} />
        </FilterSection>

        {/* Base: Entrega */}
        <FilterSection title="Entrega">
          {deliveryOptions.map((d) => (
            <CheckItem key={d.value} label={d.label} checked={selectedDelivery.includes(d.value)} onChange={() => toggleArray(selectedDelivery, d.value, onDeliveryChange)} />
          ))}
        </FilterSection>
      </div>
    </aside>
  );
};

export default Filters;
