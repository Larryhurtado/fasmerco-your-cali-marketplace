import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const banners = [
  {
    subtitle: "APROVECHA HOY",
    title: "SÚPER OFERTAS\nEN AUDIO",
    cta: "Compra ahora",
    bg: "bg-[hsl(142,50%,45%)]",
    link: "/search?q=Audio",
  },
  {
    subtitle: "NUEVA COLECCIÓN",
    title: "MODA LOCAL\nDESDE CALI",
    cta: "Compra ahora",
    bg: "bg-[hsl(220,15%,15%)]",
    link: "/search?q=Moda",
  },
  {
    subtitle: "NUEVA TECNOLOGÍA EN",
    title: "ELECTRODOMÉSTICOS\nHASTA 20% OFF",
    cta: "Compra ahora",
    bg: "bg-[hsl(220,15%,15%)]",
    link: "/search?q=Hogar",
  },
  {
    subtitle: "EXCLUSIVO ONLINE",
    title: "GADGETS TECH\nENVÍO GRATIS",
    cta: "Compra ahora",
    bg: "bg-primary",
    link: "/search?q=Tecnología",
  },
];

const PromoBanners = () => (
  <section className="grid grid-cols-4 gap-4">
    {banners.map((b, i) => (
      <Link
        key={i}
        to={b.link}
        className={`${b.bg} text-white rounded-xl p-6 flex flex-col justify-between min-h-[160px] hover:opacity-90 transition-opacity`}
      >
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80 mb-1">
            {b.subtitle}
          </p>
          <h3 className="text-lg font-bold leading-tight whitespace-pre-line">
            {b.title}
          </h3>
        </div>
        <span className="text-sm font-semibold flex items-center gap-1 mt-3">
          {b.cta} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    ))}
  </section>
);

export default PromoBanners;
