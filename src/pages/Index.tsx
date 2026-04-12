import HeroCarousel from "@/components/HeroCarousel";
import FlashDeals from "@/components/FlashDeals";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";

const Index = () => (
  <div className="container mx-auto max-w-[1440px] px-6 py-8 space-y-10">
    <HeroCarousel />
    <FlashDeals />
    <div className="flex gap-8">
      <Filters />
      <ProductGrid />
    </div>
  </div>
);

export default Index;
