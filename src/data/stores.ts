export interface Store {
  slug: string;
  name: string;
  banner: string;
  logo: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
}

export const stores: Store[] = [
  { slug: "techcali", name: "TechCali", banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&q=80", rating: 4.7, reviews: 312, description: "Tu tienda de tecnología favorita en Cali. Productos originales con garantía local.", location: "Cali, Valle del Cauca" },
  { slug: "modaurbana", name: "ModaUrbana", banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", logo: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&q=80", rating: 4.5, reviews: 189, description: "Moda urbana y streetwear con estilo caleño. Envíos express en la ciudad.", location: "Cali, Valle del Cauca" },
  { slug: "hogarplus", name: "HogarPlus", banner: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80", logo: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&q=80", rating: 4.3, reviews: 97, description: "Todo para tu hogar: decoración, muebles y más.", location: "Cali, Valle del Cauca" },
  { slug: "beautylab", name: "BeautyLab", banner: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80", logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&q=80", rating: 4.8, reviews: 245, description: "Skincare, maquillaje y cuidado personal premium.", location: "Cali, Valle del Cauca" },
  { slug: "petworld", name: "PetWorld", banner: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&q=80", rating: 4.6, reviews: 156, description: "Accesorios, alimentos y juguetes para tu mascota.", location: "Cali, Valle del Cauca" },
  { slug: "sportzone", name: "SportZone", banner: "https://images.unsplash.com/photo-1461896836934-bd45ba8ee2cd?w=1200&q=80", logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80", rating: 4.4, reviews: 203, description: "Equipamiento deportivo y ropa fitness.", location: "Cali, Valle del Cauca" },
  { slug: "electromax", name: "ElectroMax", banner: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80", logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&q=80", rating: 4.2, reviews: 88, description: "Electrónica, gadgets y accesorios al mejor precio.", location: "Cali, Valle del Cauca" },
  { slug: "stylehouse", name: "StyleHouse", banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80", logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&q=80", rating: 4.5, reviews: 134, description: "Moda femenina y accesorios con tendencia.", location: "Cali, Valle del Cauca" },
];

export const getStoreBySlug = (slug: string) => stores.find((s) => s.slug === slug);
