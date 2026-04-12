import { useState } from "react";
import TopBar from "@/components/TopBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import HeroCarousel from "@/components/HeroCarousel";
import FlashDeals from "@/components/FlashDeals";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import TrustFooter from "@/components/TrustFooter";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <MainHeader onCartOpen={() => setCartOpen(true)} />
      <CategoryNav />

      <main className="container mx-auto max-w-[1440px] px-6 py-8 space-y-10 flex-1">
        <HeroCarousel />
        <FlashDeals />

        <div className="flex gap-8">
          <Filters />
          <ProductGrid />
        </div>
      </main>

      <TrustFooter />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
