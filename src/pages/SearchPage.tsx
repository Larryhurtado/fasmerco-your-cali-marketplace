import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";

const categories = ["Tecnología", "Moda", "Hogar", "Belleza", "Mascotas", "Deportes"];

const sortOptions = [
  { label: "Relevancia", value: "relevance" },
  { label: "Menor precio", value: "price-asc" },
  { label: "Mayor precio", value: "price-desc" },
  { label: "Mejor calificación", value: "rating" },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const categoryParam = searchParams.get("category")?.trim() ?? "";
  const subParam = searchParams.get("sub")?.trim() ?? "";
  const queryLower = query.toLowerCase();

  const matchedCategory = categoryParam || categories.find((c) => c.toLowerCase() === queryLower) || "";

  const [sortBy, setSortBy] = useState("relevance");
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (subParam) {
      setSelectedSubcategories([subParam]);
    } else {
      setSelectedSubcategories([]);
    }
  }, [subParam]);

  useEffect(() => {
    setSelectedStores([]);
    setSelectedPrices([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
  }, [matchedCategory]);

  const results = useMemo(() => {
    let filtered = allProducts;

    // Category filter
    if (matchedCategory) {
      filtered = filtered.filter((p) => p.category === matchedCategory);
    } else if (queryLower) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(queryLower) ||
          p.store.toLowerCase().includes(queryLower) ||
          p.category.toLowerCase().includes(queryLower) ||
          p.subcategory.toLowerCase().includes(queryLower)
      );
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    // Store filter
    if (selectedStores.length > 0) {
      filtered = filtered.filter((p) => selectedStores.includes(p.store));
    }

    // Price filter
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((p) =>
        selectedPrices.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return p.price >= min && p.price <= max;
        })
      );
    }

    // Brand filter (Tecnología)
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
    }
    return sorted;
  }, [queryLower, matchedCategory, selectedSubcategories, selectedStores, selectedPrices, selectedBrands, sortBy]);

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">
            {matchedCategory ? (
              <>
                {selectedSubcategories.length === 1 ? (
                  <>
                    <span className="text-muted-foreground">{matchedCategory}</span>
                    <span className="mx-2 text-muted-foreground">/</span>
                    <span className="text-primary">{selectedSubcategories[0]}</span>
                  </>
                ) : (
                  <>Categoría: <span className="text-primary">{matchedCategory}</span></>
                )}
              </>
            ) : (
              <>Resultados para: <span className="text-primary">"{query}"</span></>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{results.length} producto(s) encontrado(s)</p>
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition"
          >
            <ArrowUpDown className="h-4 w-4" />
            Ordenar por: {sortOptions.find((o) => o.value === sortBy)?.label}
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-20 w-48">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition ${sortBy === opt.value ? "text-primary font-semibold" : "text-foreground"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        <Filters
          category={matchedCategory || undefined}
          selectedStores={selectedStores}
          onStoreChange={setSelectedStores}
          selectedPrices={selectedPrices}
          onPriceChange={setSelectedPrices}
          selectedDelivery={selectedDelivery}
          onDeliveryChange={setSelectedDelivery}
          selectedSubcategories={selectedSubcategories}
          onSubcategoryChange={setSelectedSubcategories}
          selectedSizes={selectedSizes}
          onSizeChange={setSelectedSizes}
          selectedColors={selectedColors}
          onColorChange={setSelectedColors}
          selectedBrands={selectedBrands}
          onBrandChange={setSelectedBrands}
        />
        {results.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center flex-1">No encontramos productos para tu búsqueda.</p>
        ) : (
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
