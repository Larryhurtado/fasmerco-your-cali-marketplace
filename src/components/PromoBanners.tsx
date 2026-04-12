import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import promoAudio from "@/assets/promo-audio.jpg";
import promoModa from "@/assets/promo-moda.jpg";
import promoHogar from "@/assets/promo-hogar.jpg";
import promoTech from "@/assets/promo-tech.jpg";

const banners = [
  {
    subtitle: "APROVECHA HOY",
    title: "SÚPER OFERTAS\nEN AUDIO",
    cta: "Compra ahora",
    image: promoAudio,
    overlay: "from-[hsl(142,50%,30%)/0.85] to-transparent",
    link: "/search?q=Audio",
  },
  {
    subtitle: "NUEVA COLECCIÓN",
    title: "MODA LOCAL\nDESDE CALI",
    cta: "Compra ahora",
    image: promoModa,
    overlay: "from-[hsl(220,15%,10%)/0.8] to-transparent",
    link: "/search?q=Moda",
  },
  {
    subtitle: "NUEVA TECNOLOGÍA EN",
    title: "ELECTRODOMÉSTICOS\nHASTA 20% OFF",
    cta: "Compra ahora",
    image: promoHogar,
    overlay: "from-[hsl(220,15%,10%)/0.8] to-transparent",
    link: "/search?q=Hogar",
  },
  {
    subtitle: "EXCLUSIVO ONLINE",
    title: "GADGETS TECH\nENVÍO GRATIS",
    cta: "Compra ahora",
    image: promoTech,
    overlay: "from-primary/80 to-transparent",
    link: "/search?q=Tecnología",
  },
];

const PromoBanners = () => (
  <section className="grid grid-cols-4 gap-4">
    {banners.map((b, i) => (
      <Link
        key={i}
        to={b.link}
        className="relative rounded-xl overflow-hidden min-h-[180px] hover:scale-[1.02] transition-transform group"
      >
        <img
          src={b.image}
          alt={b.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${b.overlay}`} />
        <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase opacity-90 mb-1">
              {b.subtitle}
            </p>
            <h3 className="text-base font-bold leading-tight whitespace-pre-line">
              {b.title}
            </h3>
          </div>
          <span className="text-xs font-semibold flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">
            {b.cta} <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    ))}
  </section>
);

export default PromoBanners;
