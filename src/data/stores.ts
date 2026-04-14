export interface Store {
  slug: string;
  name: string;
  banner: string;
  logo: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  category: string;
}

export const stores: Store[] = [
  // Tecnología
  { slug: "techcali", name: "TechCali", banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&q=80", rating: 4.7, reviews: 312, description: "Tu tienda de tecnología favorita en Cali. Productos originales con garantía local.", location: "Cali, Valle del Cauca", category: "Tecnología" },
  { slug: "electromax", name: "ElectroMax", banner: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80", logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&q=80", rating: 4.2, reviews: 88, description: "Electrónica, gadgets y accesorios al mejor precio.", location: "Cali, Valle del Cauca", category: "Tecnología" },
  { slug: "gadgetzone", name: "GadgetZone", banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&q=80", rating: 4.5, reviews: 176, description: "Los últimos gadgets y accesorios tech que necesitas.", location: "Cali, Valle del Cauca", category: "Tecnología" },
  { slug: "bytestore", name: "ByteStore", banner: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80", logo: "https://images.unsplash.com/photo-1517433456624-250a9b229850?w=100&q=80", rating: 4.3, reviews: 95, description: "Componentes, periféricos y todo para tu setup.", location: "Cali, Valle del Cauca", category: "Tecnología" },

  // Moda
  { slug: "modaurbana", name: "ModaUrbana", banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", logo: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&q=80", rating: 4.5, reviews: 189, description: "Moda urbana y streetwear con estilo caleño.", location: "Cali, Valle del Cauca", category: "Moda" },
  { slug: "stylehouse", name: "StyleHouse", banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80", logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&q=80", rating: 4.5, reviews: 134, description: "Moda femenina y accesorios con tendencia.", location: "Cali, Valle del Cauca", category: "Moda" },
  { slug: "streetvibes", name: "StreetVibes", banner: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80", logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&q=80", rating: 4.4, reviews: 210, description: "Streetwear auténtico directo de Cali.", location: "Cali, Valle del Cauca", category: "Moda" },
  { slug: "califashion", name: "CaliFashion", banner: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80", logo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&q=80", rating: 4.6, reviews: 267, description: "Tendencias de moda a precios accesibles.", location: "Cali, Valle del Cauca", category: "Moda" },

  // Hogar
  { slug: "hogarplus", name: "HogarPlus", banner: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80", logo: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&q=80", rating: 4.3, reviews: 97, description: "Todo para tu hogar: decoración, muebles y más.", location: "Cali, Valle del Cauca", category: "Hogar" },
  { slug: "casabella", name: "CasaBella", banner: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80", logo: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=100&q=80", rating: 4.6, reviews: 145, description: "Decoración elegante para cada rincón de tu hogar.", location: "Cali, Valle del Cauca", category: "Hogar" },
  { slug: "decovalle", name: "DecoValle", banner: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80", logo: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=100&q=80", rating: 4.1, reviews: 78, description: "Diseño interior y decoración del Valle.", location: "Cali, Valle del Cauca", category: "Hogar" },
  { slug: "conforthome", name: "ConfortHome", banner: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80", logo: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=100&q=80", rating: 4.4, reviews: 112, description: "Confort y estilo para tu casa.", location: "Cali, Valle del Cauca", category: "Hogar" },

  // Belleza
  { slug: "beautylab", name: "BeautyLab", banner: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80", logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&q=80", rating: 4.8, reviews: 245, description: "Skincare, maquillaje y cuidado personal premium.", location: "Cali, Valle del Cauca", category: "Belleza" },
  { slug: "glamcali", name: "GlamCali", banner: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80", logo: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=100&q=80", rating: 4.7, reviews: 198, description: "Glamour y belleza con los mejores productos.", location: "Cali, Valle del Cauca", category: "Belleza" },
  { slug: "skinfirst", name: "SkinFirst", banner: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80", logo: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&q=80", rating: 4.5, reviews: 156, description: "Tu piel primero. Productos dermatológicos.", location: "Cali, Valle del Cauca", category: "Belleza" },
  { slug: "naturalglow", name: "NaturalGlow", banner: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&q=80", logo: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&q=80", rating: 4.6, reviews: 132, description: "Belleza natural y orgánica.", location: "Cali, Valle del Cauca", category: "Belleza" },

  // Mascotas
  { slug: "petworld", name: "PetWorld", banner: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&q=80", rating: 4.6, reviews: 156, description: "Accesorios, alimentos y juguetes para tu mascota.", location: "Cali, Valle del Cauca", category: "Mascotas" },
  { slug: "huellascali", name: "HuellasCali", banner: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&q=80", logo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&q=80", rating: 4.4, reviews: 89, description: "Todo lo que tu peludo necesita.", location: "Cali, Valle del Cauca", category: "Mascotas" },
  { slug: "mascotafeliz", name: "MascotaFeliz", banner: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=1200&q=80", logo: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=100&q=80", rating: 4.3, reviews: 67, description: "Felicidad para tu mascota garantizada.", location: "Cali, Valle del Cauca", category: "Mascotas" },
  { slug: "petshopvalle", name: "PetShopValle", banner: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80", logo: "https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=100&q=80", rating: 4.5, reviews: 104, description: "La pet shop más completa del Valle.", location: "Cali, Valle del Cauca", category: "Mascotas" },

  // Deportes
  { slug: "sportzone", name: "SportZone", banner: "https://images.unsplash.com/photo-1461896836934-bd45ba8ee2cd?w=1200&q=80", logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80", rating: 4.4, reviews: 203, description: "Equipamiento deportivo y ropa fitness.", location: "Cali, Valle del Cauca", category: "Deportes" },
  { slug: "fitcali", name: "FitCali", banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80", logo: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=100&q=80", rating: 4.6, reviews: 178, description: "Fitness y bienestar para Cali.", location: "Cali, Valle del Cauca", category: "Deportes" },
  { slug: "runnerspro", name: "RunnersPro", banner: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80", logo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&q=80", rating: 4.5, reviews: 142, description: "Todo para corredores y atletas.", location: "Cali, Valle del Cauca", category: "Deportes" },
  { slug: "athleticshop", name: "AthleticShop", banner: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80", logo: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=100&q=80", rating: 4.3, reviews: 91, description: "Ropa y accesorios deportivos de calidad.", location: "Cali, Valle del Cauca", category: "Deportes" },
];

export const getStoreBySlug = (slug: string) => stores.find((s) => s.slug === slug);

export const storeCategories = ["Todas", "Tecnología", "Moda", "Hogar", "Belleza", "Mascotas", "Deportes"];
