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
  subcategory: string;
  brand?: string;
}

/* ── Tecnología ── */
const techProducts: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[] = [
  // Móviles > Smartphones
  { name: "Samsung Galaxy A54 5G", price: 1299000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", store: "TechCali", category: "Tecnología", subcategory: "Smartphones", brand: "Samsung" },
  { name: "Xiaomi Redmi Note 13", price: 899000, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80", store: "ElectroMax", category: "Tecnología", subcategory: "Smartphones", brand: "Xiaomi" },
  { name: "iPhone 15 Pro Max", price: 5499000, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80", store: "ByteStore", category: "Tecnología", subcategory: "Smartphones", brand: "Apple" },
  // Móviles > Tablets
  { name: "Tablet Samsung Galaxy Tab A9", price: 749000, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", store: "TechCali", category: "Tecnología", subcategory: "Tablets", brand: "Samsung" },
  { name: "iPad 10ª Generación", price: 2199000, image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&q=80", store: "ByteStore", category: "Tecnología", subcategory: "Tablets", brand: "Apple" },
  // Móviles > Smartwatches
  { name: "Reloj Smartwatch Ultra", price: 189000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", store: "GadgetZone", category: "Tecnología", subcategory: "Smartwatches", brand: "Xiaomi" },
  { name: "Apple Watch SE 2", price: 1299000, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80", store: "ByteStore", category: "Tecnología", subcategory: "Smartwatches", brand: "Apple" },
  // Accesorios
  { name: "Cargador Inalámbrico Fast", price: 49000, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", store: "ElectroMax", category: "Tecnología", subcategory: "Cargadores y Cables", brand: "Samsung" },
  { name: "Cable USB-C a Lightning 2m", price: 29000, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", store: "TechCali", category: "Tecnología", subcategory: "Cargadores y Cables", brand: "Apple" },
  { name: "Funda iPhone 15 Silicona", price: 35000, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", store: "GadgetZone", category: "Tecnología", subcategory: "Fundas (Cases)", brand: "Apple" },
  { name: "Protector Pantalla Galaxy A54", price: 15000, image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&q=80", store: "ElectroMax", category: "Tecnología", subcategory: "Protectores de Pantalla", brand: "Samsung" },
  // Audio
  { name: "Audífonos Bluetooth Pro", price: 129000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", store: "TechCali", category: "Tecnología", subcategory: "Audífonos Bluetooth", brand: "JBL" },
  { name: "AirPods Pro 2", price: 899000, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80", store: "ByteStore", category: "Tecnología", subcategory: "Audífonos Bluetooth", brand: "Apple" },
  { name: "Parlante Portátil Bass", price: 159000, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&q=80", store: "GadgetZone", category: "Tecnología", subcategory: "Parlantes Portátiles", brand: "JBL" },
  { name: "JBL Flip 6 Portátil", price: 459000, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80", store: "ElectroMax", category: "Tecnología", subcategory: "Parlantes Portátiles", brand: "JBL" },
  // Computación
  { name: "Laptop ASUS VivoBook 15", price: 2199000, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80", store: "TechCali", category: "Tecnología", subcategory: "Laptops", brand: "ASUS" },
  { name: "MacBook Air M2", price: 5999000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", store: "ByteStore", category: "Tecnología", subcategory: "Laptops", brand: "Apple" },
  { name: "Mouse Inalámbrico RGB", price: 59000, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", store: "GadgetZone", category: "Tecnología", subcategory: "Periféricos", brand: "Logitech" },
  { name: "Teclado Mecánico Compact", price: 189000, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", store: "TechCali", category: "Tecnología", subcategory: "Periféricos", brand: "Logitech" },
  { name: "Headset Gamer 7.1", price: 179000, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80", store: "GadgetZone", category: "Tecnología", subcategory: "Gaming", brand: "Logitech" },
  { name: "Silla Gamer Ergonómica", price: 699000, image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80", store: "ElectroMax", category: "Tecnología", subcategory: "Gaming", brand: "ASUS" },
];

/* ── Moda ── */
const modaProducts: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[] = [
  // Mujer
  { name: "Vestido Casual Lino", price: 89000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80", store: "ModaUrbana", category: "Moda", subcategory: "Vestidos" },
  { name: "Vestido Midi Floral", price: 119000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", store: "CaliFashion", category: "Moda", subcategory: "Vestidos" },
  { name: "Blusa Crop Satin", price: 59000, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80", store: "StyleHouse", category: "Moda", subcategory: "Blusas y Tops" },
  { name: "Top Halter Elegante", price: 49000, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80", store: "ModaUrbana", category: "Moda", subcategory: "Blusas y Tops" },
  { name: "Pantalón Wide Leg", price: 79000, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80", store: "CaliFashion", category: "Moda", subcategory: "Pantalones y Jeans" },
  { name: "Jeans Slim Fit Mujer", price: 99000, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80", store: "StreetVibes", category: "Moda", subcategory: "Pantalones y Jeans" },
  { name: "Set Ropa Interior Algodón x3", price: 45000, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80", store: "StyleHouse", category: "Moda", subcategory: "Ropa Interior" },
  // Hombre
  { name: "Camiseta Oversize Premium", price: 55000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", store: "StreetVibes", category: "Moda", subcategory: "Camisetas" },
  { name: "Camiseta Básica Pack x3", price: 75000, image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80", store: "ModaUrbana", category: "Moda", subcategory: "Camisetas" },
  { name: "Camisa Lino Manga Larga", price: 89000, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80", store: "CaliFashion", category: "Moda", subcategory: "Camisas" },
  { name: "Jeans Slim Fit Hombre", price: 95000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", store: "StreetVibes", category: "Moda", subcategory: "Jeans y Bermudas" },
  { name: "Bermuda Cargo Tactical", price: 69000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80", store: "ModaUrbana", category: "Moda", subcategory: "Jeans y Bermudas" },
  { name: "Chaqueta Bomber Urban", price: 149000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", store: "StyleHouse", category: "Moda", subcategory: "Chaquetas" },
  // Calzado
  { name: "Tenis Deportivos Urban", price: 159000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", store: "CaliFashion", category: "Moda", subcategory: "Tenis Deportivos" },
  { name: "Sneakers Retro 90s", price: 189000, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80", store: "StreetVibes", category: "Moda", subcategory: "Tenis Deportivos" },
  { name: "Zapatos Formales Oxford", price: 219000, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80", store: "ModaUrbana", category: "Moda", subcategory: "Zapatos Formales" },
  { name: "Sandalias Platform", price: 79000, image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400&q=80", store: "StyleHouse", category: "Moda", subcategory: "Sandalias y Chanclas" },
  // Accesorios
  { name: "Gafas de Sol Retro", price: 59000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", store: "CaliFashion", category: "Moda", subcategory: "Gafas de Sol" },
  { name: "Reloj Casual Hombre", price: 129000, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80", store: "ModaUrbana", category: "Moda", subcategory: "Relojes" },
  { name: "Gorra Snapback Street", price: 39000, image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&q=80", store: "StreetVibes", category: "Moda", subcategory: "Gorras" },
];

/* ── Belleza ── */
const bellezaProducts: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[] = [
  // Maquillaje
  { name: "Base de Maquillaje HD", price: 69000, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", store: "BeautyLab", category: "Belleza", subcategory: "Rostro" },
  { name: "Corrector Líquido Pro", price: 35000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", store: "GlamCali", category: "Belleza", subcategory: "Rostro" },
  { name: "Máscara de Pestañas Volume", price: 42000, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", store: "SkinFirst", category: "Belleza", subcategory: "Ojos" },
  { name: "Delineador Líquido Negro", price: 25000, image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80", store: "BeautyLab", category: "Belleza", subcategory: "Ojos" },
  { name: "Labial Matte Long Lasting", price: 32000, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80", store: "GlamCali", category: "Belleza", subcategory: "Labios" },
  { name: "Gloss Hidratante Cherry", price: 28000, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80", store: "NaturalGlow", category: "Belleza", subcategory: "Labios" },
  { name: "Paleta Sombras 18 Tonos", price: 89000, image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&q=80", store: "BeautyLab", category: "Belleza", subcategory: "Paletas de Sombras" },
  // Cuidado Personal
  { name: "Set Skincare Premium 5pz", price: 159000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80", store: "SkinFirst", category: "Belleza", subcategory: "Skincare" },
  { name: "Sérum Vitamina C 30ml", price: 79000, image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=400&q=80", store: "NaturalGlow", category: "Belleza", subcategory: "Skincare" },
  { name: "Protector Solar SPF50", price: 55000, image: "https://images.unsplash.com/photo-1532947974358-a218d18d8447?w=400&q=80", store: "SkinFirst", category: "Belleza", subcategory: "Skincare" },
  { name: "Shampoo Sin Sulfatos", price: 39000, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80", store: "NaturalGlow", category: "Belleza", subcategory: "Cuidado del Cabello" },
  { name: "Mascarilla Capilar Keratina", price: 45000, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80", store: "GlamCali", category: "Belleza", subcategory: "Cuidado del Cabello" },
  // Barbería
  { name: "Máquina Corte Profesional", price: 189000, image: "https://images.unsplash.com/photo-1621607505837-5765e2e86e89?w=400&q=80", store: "BeautyLab", category: "Belleza", subcategory: "Máquinas de Corte" },
  { name: "Kit Afeitado Premium", price: 79000, image: "https://images.unsplash.com/photo-1585747860019-8c62a3b1b53c?w=400&q=80", store: "GlamCali", category: "Belleza", subcategory: "Productos de Afeitado" },
  // Perfumería
  { name: "Perfume Floral 100ml", price: 129000, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80", store: "NaturalGlow", category: "Belleza", subcategory: "Fragancias Nacionales e Importadas" },
  { name: "Colonia Cítrica Hombre", price: 99000, image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&q=80", store: "SkinFirst", category: "Belleza", subcategory: "Fragancias Nacionales e Importadas" },
];

/* ── Mascotas ── */
const mascotasProducts: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[] = [
  // Perros
  { name: "Alimento Perro Adulto 15kg", price: 139000, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80", store: "PetWorld", category: "Mascotas", subcategory: "Alimento Perros" },
  { name: "Alimento Cachorro Premium 8kg", price: 99000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80", store: "HuellasCali", category: "Mascotas", subcategory: "Alimento Perros" },
  { name: "Juguete Interactivo Kong", price: 45000, image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&q=80", store: "MascotaFeliz", category: "Mascotas", subcategory: "Juguetes Perros" },
  { name: "Pelota Lanzador Auto", price: 129000, image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80", store: "PetShopValle", category: "Mascotas", subcategory: "Juguetes Perros" },
  { name: "Cama Ortopédica Perro L", price: 159000, image: "https://images.unsplash.com/photo-1541599468348-e603c130c5f0?w=400&q=80", store: "PetWorld", category: "Mascotas", subcategory: "Camas y Casas" },
  { name: "Casa Perro Madera M", price: 249000, image: "https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=400&q=80", store: "HuellasCali", category: "Mascotas", subcategory: "Camas y Casas" },
  { name: "Collar LED Mascota", price: 29000, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80", store: "MascotaFeliz", category: "Mascotas", subcategory: "Correas y Collares" },
  { name: "Arnés Reflectivo Ajustable", price: 55000, image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80", store: "PetWorld", category: "Mascotas", subcategory: "Correas y Collares" },
  // Gatos
  { name: "Alimento Gato Adulto 10kg", price: 119000, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80", store: "PetShopValle", category: "Mascotas", subcategory: "Alimento Gatos" },
  { name: "Arena Premium Aglutinante 10L", price: 39000, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80", store: "MascotaFeliz", category: "Mascotas", subcategory: "Arena e Higiene" },
  { name: "Rascador Torre Gato 3 Niveles", price: 189000, image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80", store: "HuellasCali", category: "Mascotas", subcategory: "Rascadores" },
  // Salud
  { name: "Vitaminas Perro Senior", price: 49000, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80", store: "PetWorld", category: "Mascotas", subcategory: "Vitaminas Mascotas" },
  { name: "Limpiador Enzimático Mascotas", price: 35000, image: "https://images.unsplash.com/photo-1450778869180-e59f0b958780?w=400&q=80", store: "PetShopValle", category: "Mascotas", subcategory: "Productos de Limpieza" },
];

/* ── Hogar ── */
const hogarProducts: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[] = [
  // Cocina
  { name: "Set Utensilios Silicona 8pz", price: 69000, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", store: "HogarPlus", category: "Hogar", subcategory: "Utensilios" },
  { name: "Juego Ollas Antiadherente 5pz", price: 189000, image: "https://images.unsplash.com/photo-1584990347449-a6d1ec729b7e?w=400&q=80", store: "CasaBella", category: "Hogar", subcategory: "Utensilios" },
  { name: "Air Fryer Digital 5.5L", price: 279000, image: "https://images.unsplash.com/photo-1648655552233-1ba71068ae00?w=400&q=80", store: "DecoValle", category: "Hogar", subcategory: "Pequeños Electrodomésticos" },
  { name: "Licuadora Turbo 1200W", price: 189000, image: "https://images.unsplash.com/photo-1570222094714-4e5f4e014e63?w=400&q=80", store: "ConfortHome", category: "Hogar", subcategory: "Pequeños Electrodomésticos" },
  { name: "Cafetera Espresso Automática", price: 349000, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80", store: "HogarPlus", category: "Hogar", subcategory: "Pequeños Electrodomésticos" },
  // Decoración
  { name: "Tira LED RGB 10m WiFi", price: 49000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", store: "DecoValle", category: "Hogar", subcategory: "Iluminación LED" },
  { name: "Lámpara de Mesa Nordic", price: 79000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80", store: "CasaBella", category: "Hogar", subcategory: "Iluminación LED" },
  { name: "Cuadro Decorativo Set x3", price: 89000, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80", store: "DecoValle", category: "Hogar", subcategory: "Cuadros" },
  { name: "Cojín Decorativo Velvet", price: 35000, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", store: "ConfortHome", category: "Hogar", subcategory: "Cojines" },
  { name: "Cojín Boho Set x2", price: 59000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", store: "CasaBella", category: "Hogar", subcategory: "Cojines" },
  // Organización
  { name: "Set Cajas Organizadoras x4", price: 55000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", store: "HogarPlus", category: "Hogar", subcategory: "Cajas Organizadoras" },
  { name: "Organizador Closet Bambú", price: 99000, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", store: "ConfortHome", category: "Hogar", subcategory: "Cajas Organizadoras" },
  { name: "Perchero Pared Industrial", price: 69000, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80", store: "DecoValle", category: "Hogar", subcategory: "Percheros y Armarios" },
  { name: "Armario Portátil Tela", price: 129000, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80", store: "HogarPlus", category: "Hogar", subcategory: "Percheros y Armarios" },
];

/* ── Deportes ── */
const deportesProducts: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[] = [
  // Ropa Deportiva
  { name: "Conjunto Gym Mujer 2pz", price: 89000, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", store: "SportZone", category: "Deportes", subcategory: "Conjuntos Gym" },
  { name: "Leggins Deportivos Compresión", price: 59000, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80", store: "FitCali", category: "Deportes", subcategory: "Conjuntos Gym" },
  { name: "Camiseta Dry-Fit Pro", price: 45000, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80", store: "RunnersPro", category: "Deportes", subcategory: "Camisetas Dry-Fit" },
  { name: "Tank Top Gym Hombre", price: 35000, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80", store: "AthleticShop", category: "Deportes", subcategory: "Camisetas Dry-Fit" },
  // Equipamiento
  { name: "Mancuernas Ajustables 20kg", price: 299000, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80", store: "FitCali", category: "Deportes", subcategory: "Pesas y Mancuernas" },
  { name: "Pesa Rusa Kettlebell 12kg", price: 99000, image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=400&q=80", store: "SportZone", category: "Deportes", subcategory: "Pesas y Mancuernas" },
  { name: "Banda Resistencia Set x5", price: 39000, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80", store: "RunnersPro", category: "Deportes", subcategory: "Bandas Elásticas" },
  { name: "Esterilla Yoga Premium", price: 69000, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80", store: "AthleticShop", category: "Deportes", subcategory: "Mats de Yoga" },
  { name: "Mat Yoga Antideslizante 6mm", price: 55000, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80", store: "FitCali", category: "Deportes", subcategory: "Mats de Yoga" },
  // Suplementación
  { name: "Proteína Whey Isolate 2lb", price: 159000, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c760?w=400&q=80", store: "SportZone", category: "Deportes", subcategory: "Proteínas" },
  { name: "Proteína Vegana 1kg", price: 129000, image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80", store: "RunnersPro", category: "Deportes", subcategory: "Proteínas" },
  { name: "Creatina Monohidrato 300g", price: 89000, image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=80", store: "FitCali", category: "Deportes", subcategory: "Creatinas" },
  { name: "Shaker Mezclador 700ml", price: 25000, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80", store: "AthleticShop", category: "Deportes", subcategory: "Shakers" },
];

/* ── Helper to finalize products ── */
function finalizeProducts(
  items: Omit<Product, "id" | "rating" | "verified" | "oldPrice">[],
  idOffset: number,
): Product[] {
  return items.map((item, i) => ({
    ...item,
    id: idOffset + i,
    rating: +(3.5 + Math.random() * 1.5).toFixed(1),
    verified: i % 4 !== 3,
    oldPrice: i % 3 === 0 ? Math.round(item.price * (1.2 + Math.random() * 0.3)) : undefined,
  }));
}

/* ── Exported datasets ── */
export const techProductsList = finalizeProducts(techProducts, 1000);
export const modaProductsList = finalizeProducts(modaProducts, 2000);
export const bellezaProductsList = finalizeProducts(bellezaProducts, 4000);
export const mascotasProductsList = finalizeProducts(mascotasProducts, 5000);
export const hogarProductsList = finalizeProducts(hogarProducts, 3000);
export const deportesProductsList = finalizeProducts(deportesProducts, 6000);

export const allProducts: Product[] = [
  ...techProductsList,
  ...modaProductsList,
  ...hogarProductsList,
  ...bellezaProductsList,
  ...mascotasProductsList,
  ...deportesProductsList,
];

export const flashProducts: Product[] = [
  techProductsList[0], modaProductsList[0], hogarProductsList[0],
  bellezaProductsList[0], mascotasProductsList[0], deportesProductsList[0],
].map((p, i) => ({
  ...p,
  id: 9000 + i,
  oldPrice: Math.round(p.price * 1.4),
}));

export const bestSellerProducts: Product[] = allProducts.filter((_, i) => i % 6 === 0).slice(0, 8).map((p, i) => ({ ...p, id: 8000 + i }));
export const techProducts2: Product[] = techProductsList.slice(0, 8).map((p, i) => ({ ...p, id: 8100 + i }));

// Category → stores mapping
const techStores = ["TechCali", "ElectroMax", "GadgetZone", "ByteStore"];
const modaStores = ["ModaUrbana", "StyleHouse", "StreetVibes", "CaliFashion"];
const hogarStores = ["HogarPlus", "CasaBella", "DecoValle", "ConfortHome"];
const bellezaStores = ["BeautyLab", "GlamCali", "SkinFirst", "NaturalGlow"];
const mascotasStores = ["PetWorld", "HuellasCali", "MascotaFeliz", "PetShopValle"];
const deportesStores = ["SportZone", "FitCali", "RunnersPro", "AthleticShop"];

export const categoryStoresMap: Record<string, string[]> = {
  "Tecnología": techStores,
  "Moda": modaStores,
  "Hogar": hogarStores,
  "Belleza": bellezaStores,
  "Mascotas": mascotasStores,
  "Deportes": deportesStores,
};
