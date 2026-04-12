import { useSearchParams } from "react-router-dom";
import { allProducts, flashProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const results = [...allProducts, ...flashProducts].filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.store.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-8">
      <h1 className="text-xl font-bold mb-1">
        Resultados para: <span className="text-primary">"{searchParams.get("q") ?? ""}"</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-6">{results.length} producto(s) encontrado(s)</p>

      <div className="flex gap-8">
        <Filters />
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
