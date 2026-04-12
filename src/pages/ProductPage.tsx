import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star, ShoppingCart, BadgeCheck, Truck, ShieldCheck, Heart,
  Share2, Minus, Plus, ChevronRight, ThumbsUp, RotateCcw, Package, MapPin
} from "lucide-react";
import { allProducts, flashProducts, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import ProductCard from "@/components/ProductCard";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

/* Fake reviews */
const fakeReviews = [
  { user: "Carlos M.", date: "Hace 3 días", rating: 5, text: "Excelente calidad, llegó antes de lo esperado. Lo recomiendo al 100%.", helpful: 12 },
  { user: "María L.", date: "Hace 1 semana", rating: 4, text: "Muy buen producto, cumple con lo prometido. El empaque podría mejorar.", helpful: 8 },
  { user: "Andrés R.", date: "Hace 2 semanas", rating: 5, text: "Increíble relación calidad-precio. Ya es mi segunda compra en esta tienda.", helpful: 15 },
  { user: "Valentina S.", date: "Hace 3 semanas", rating: 3, text: "Está bien pero esperaba un poco más de calidad en los acabados.", helpful: 4 },
  { user: "Jorge P.", date: "Hace 1 mes", rating: 5, text: "Perfecto, exactamente como en las fotos. Envío rapidísimo a Cali.", helpful: 20 },
];

const ratingDistribution = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 2 },
];

/* Fake specs */
const fakeSpecs = (product: Product) => [
  { label: "Marca", value: product.store },
  { label: "Categoría", value: product.category },
  { label: "Modelo", value: "2024" },
  { label: "Garantía", value: "12 meses" },
  { label: "Origen", value: "Colombia" },
  { label: "Peso", value: "0.5 kg" },
  { label: "Condición", value: "Nuevo" },
  { label: "Disponibilidad", value: "En stock" },
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const allPool = [...allProducts, ...flashProducts];
  const product = allPool.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto max-w-[1440px] px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
        <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const storeSlug = product.store.toLowerCase().replace(/\s/g, "");
  const relatedProducts = allPool.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);
  const specs = fakeSpecs(product);

  /* Fake gallery — same image repeated with slight variation */
  const gallery = [product.image, product.image.replace("w=400", "w=401"), product.image.replace("w=400", "w=402"), product.image.replace("w=400", "w=403")];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image, store: product.store });
    }
  };

  return (
    <div className="container mx-auto max-w-[1440px] px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition">Inicio</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/search?category=${product.category}`} className="hover:text-primary transition">{product.category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium truncate max-w-[300px]">{product.name}</span>
      </nav>

      {/* Main section */}
      <div className="flex gap-10">
        {/* Gallery */}
        <div className="w-[500px] flex-shrink-0 space-y-3">
          <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
            <img src={gallery[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${selectedImg === i ? "border-primary" : "border-border hover:border-primary/40"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              {product.verified && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded">
                  <BadgeCheck className="h-3.5 w-3.5" /> Vendedor Verificado
                </span>
              )}
              <h1 className="text-2xl font-bold leading-tight pr-4">{product.name}</h1>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2.5 rounded-full border transition ${liked ? "bg-destructive/10 border-destructive/30 text-destructive" : "border-border text-muted-foreground hover:text-destructive hover:border-destructive/30"}`}
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-muted-foreground">(127 reseñas)</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">+500 vendidos</span>
          </div>

          {/* Price */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{fmt(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{fmt(product.oldPrice)}</span>
                  <span className="text-sm font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Hasta 36 cuotas sin interés</p>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {product.store.charAt(0)}
            </div>
            <div className="flex-1">
              <Link to={`/store/${storeSlug}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                {product.store}
                {product.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
              </Link>
              <p className="text-xs text-muted-foreground">98% calificaciones positivas • 1,240 ventas</p>
            </div>
            <Link to={`/store/${storeSlug}`} className="text-xs font-medium text-primary hover:underline">
              Ver tienda
            </Link>
          </div>

          {/* Delivery info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <Truck className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Envío gratis</p>
                <p className="text-xs text-muted-foreground">Llega mañana a Cali</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Compra protegida</p>
                <p className="text-xs text-muted-foreground">Devolución gratis 30 días</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <RotateCcw className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Devolución fácil</p>
                <p className="text-xs text-muted-foreground">Puntos de entrega en Cali</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Stock disponible</p>
                <p className="text-xs text-muted-foreground">Quedan pocas unidades</p>
              </div>
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-muted transition rounded-l-lg">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2.5 hover:bg-muted transition rounded-r-lg">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-base"
            >
              <ShoppingCart className="h-5 w-5" /> Añadir al carrito
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Envío a <strong className="text-foreground">Cali, Valle del Cauca</strong></span>
            <button className="text-primary hover:underline text-xs ml-1">Cambiar</button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
            {[
              { value: "description", label: "Descripción" },
              { value: "specs", label: "Especificaciones" },
              { value: "reviews", label: "Reseñas (127)" },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-medium"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <div className="max-w-3xl space-y-4">
              <h3 className="text-lg font-semibold">Acerca de este producto</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Producto de alta calidad disponible en {product.store}. Diseñado para ofrecer la mejor experiencia
                en la categoría de {product.category}. Fabricado con materiales premium y respaldado por garantía
                de 12 meses.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Materiales de primera calidad para mayor durabilidad</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Diseño moderno y ergonómico</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Compatible con múltiples dispositivos y plataformas</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Garantía oficial de 12 meses por el fabricante</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Envío rápido desde bodega en Cali</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="pt-6">
            <div className="max-w-2xl">
              <div className="border border-border rounded-lg overflow-hidden">
                {specs.map((s, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                    <span className="w-40 flex-shrink-0 px-4 py-3 text-sm font-medium border-r border-border">{s.label}</span>
                    <span className="px-4 py-3 text-sm text-muted-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="flex gap-10">
              {/* Summary */}
              <div className="w-64 flex-shrink-0 space-y-4">
                <div className="text-center">
                  <p className="text-5xl font-bold">{product.rating}</p>
                  <div className="flex justify-center gap-0.5 my-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">127 reseñas</p>
                </div>
                <div className="space-y-2">
                  {ratingDistribution.map(r => (
                    <div key={r.stars} className="flex items-center gap-2 text-sm">
                      <span className="w-3 text-right">{r.stars}</span>
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <Progress value={r.pct} className="flex-1 h-2" />
                      <span className="w-8 text-right text-muted-foreground text-xs">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews list */}
              <div className="flex-1 space-y-5">
                {fakeReviews.map((review, i) => (
                  <div key={i} className="border-b border-border pb-5 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{review.user}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mt-2 transition">
                      <ThumbsUp className="h-3.5 w-3.5" /> Útil ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-6 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
