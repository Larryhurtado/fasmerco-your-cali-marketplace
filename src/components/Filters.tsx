import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface FiltersProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
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

const CheckItem = ({ label }: { label: string }) => (
  <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5" />
    {label}
  </label>
);

const Filters = (_props: FiltersProps) => (
  <aside className="w-56 flex-shrink-0">
    <div className="sticky top-28 space-y-3">
      <div className="flex items-center gap-2 text-base font-bold mb-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        Filtros
      </div>

      <FilterSection title="Rango de precio">
        <CheckItem label="Menos de $30.000" />
        <CheckItem label="$30.000 - $80.000" />
        <CheckItem label="$80.000 - $150.000" />
        <CheckItem label="Más de $150.000" />
      </FilterSection>

      <FilterSection title="Tienda">
        <CheckItem label="TechCali" />
        <CheckItem label="ModaUrbana" />
        <CheckItem label="HogarPlus" />
        <CheckItem label="BeautyLab" />
      </FilterSection>

      <FilterSection title="Ubicación">
        <CheckItem label="Cali - Sur" />
        <CheckItem label="Cali - Norte" />
        <CheckItem label="Cali - Centro" />
      </FilterSection>

      <FilterSection title="Entrega">
        <CheckItem label="Entrega inmediata" />
        <CheckItem label="1 - 2 días" />
      </FilterSection>
    </div>
  </aside>
);

export default Filters;
