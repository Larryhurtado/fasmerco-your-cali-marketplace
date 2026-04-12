export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  store: string;
  rating: number;
  verified: boolean;
  category: string;
}

const imgs = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
  "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&q=80",
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80",
];

const stores = ["TechCali", "ModaUrbana", "HogarPlus", "BeautyLab", "PetWorld", "SportZone", "ElectroMax", "StyleHouse"];
const names = [
  "Audífonos Bluetooth Pro",
  "Reloj Smartwatch Ultra",
  "Cámara de Seguridad WiFi",
  "Zapatillas Running Air",
  "Set de Skincare Premium",
  "Sneakers Urban Classic",
  "Tenis Deportivos Flex",
  "Parlante Portátil Bass",
  "Collar Mascota LED",
  "Headset Gamer 7.1",
  "Humidificador Aroma",
  "Tablet Stand Ajustable",
];

const categories = ["Tecnología", "Moda", "Hogar", "Belleza", "Mascotas", "Deportes"];

export const flashProducts: Product[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: names[i],
  price: Math.round((Math.random() * 150 + 20) * 1000),
  oldPrice: Math.round((Math.random() * 200 + 100) * 1000),
  image: imgs[i],
  store: stores[i % stores.length],
  rating: +(3.5 + Math.random() * 1.5).toFixed(1),
  verified: true,
  category: categories[i % categories.length],
}));

export const allProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 100,
  name: names[i % names.length],
  price: Math.round((Math.random() * 200 + 15) * 1000),
  image: imgs[i % imgs.length],
  store: stores[i % stores.length],
  rating: +(3 + Math.random() * 2).toFixed(1),
  verified: i % 3 !== 2,
  category: categories[i % categories.length],
}));

// Subsets for home carousels
export const bestSellerProducts: Product[] = allProducts.slice(0, 8).map((p, i) => ({ ...p, id: 200 + i }));
export const techProducts: Product[] = allProducts.filter(p => p.category === "Tecnología").map((p, i) => ({ ...p, id: 300 + i }));
