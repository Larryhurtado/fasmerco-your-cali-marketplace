import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Descubre lo mejor del comercio local",
    subtitle: "Miles de productos de tiendas verificadas en Cali",
    gradient: "from-primary/90 to-primary/60",
  },
  {
    title: "Entrega el mismo día",
    subtitle: "Pedidos antes de las 2:00 PM llegan HOY a tu puerta",
    gradient: "from-primary/70 to-blue-400/80",
  },
  {
    title: "Vende con Fasmerco",
    subtitle: "Únete como vendedor y llega a miles de clientes en tu ciudad",
    gradient: "from-blue-600/80 to-primary/70",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full overflow-hidden rounded-xl" style={{ height: 340 }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-700 bg-gradient-to-r ${slide.gradient} ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <h2 className="text-4xl font-extrabold text-primary-foreground mb-3 drop-shadow-md">{slide.title}</h2>
          <p className="text-lg text-primary-foreground/90 font-medium max-w-lg">{slide.subtitle}</p>
        </div>
      ))}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background rounded-full p-2 shadow transition">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background rounded-full p-2 shadow transition">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
