import HeroCarousel from "@/components/HeroCarousel";
import FlashDeals from "@/components/FlashDeals";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductCarouselSection from "@/components/ProductCarouselSection";
import StoreCarouselSection from "@/components/StoreCarouselSection";
import PromoBanners from "@/components/PromoBanners";
import { bestSellerProducts, techProducts2 as techProducts } from "@/data/products";

const Index = () => (
  <div className="container mx-auto max-w-[1440px] px-6 py-8 space-y-14">
    <HeroCarousel />
    <FlashDeals />
    <FeaturedCategories />
    <ProductCarouselSection title="Lo más vendido en Cali" products={bestSellerProducts} badge="🔥 Trending" />
    <StoreCarouselSection />
    <PromoBanners />
    <ProductCarouselSection title="Tecnología con entrega inmediata" products={techProducts} badge="⚡ Llega hoy" />
  </div>
);

export default Index;
