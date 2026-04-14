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

/* ── Tecnología ── */
const techNames = [
  "Audífonos Bluetooth Pro", "Parlante Portátil Bass", "Headset Gamer 7.1",
  "Tablet Stand Ajustable", "Cámara de Seguridad WiFi", "Reloj Smartwatch Ultra",
  "Mouse Inalámbrico RGB", "Teclado Mecánico Compact", "Monitor 24\" Full HD",
  "Cargador Inalámbrico Fast", "Hub USB-C 7 en 1", "Webcam HD 1080p",
  "SSD Portátil 1TB", "Luz LED Ring 10\"", "Micrófono Condensador USB",
  "Power Bank 20000mAh", "Cable HDMI 4K 2m", "Soporte Laptop Aluminio",
];
const techImgs = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
  "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80",
  "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
];
const techStores = ["TechCali", "ElectroMax", "GadgetZone", "ByteStore"];

/* ── Moda ── */
const modaNames = [
  "Zapatillas Urban Classic", "Camiseta Oversize Premium", "Jeans Slim Fit",
  "Gorra Snapback Street", "Chaqueta Bomber Urban", "Sneakers Retro 90s",
  "Sudadera Hoodie Fleece", "Bermuda Cargo Tactical", "Mochila Urban Pack",
  "Cinturón Cuero Genuino", "Vestido Casual Lino", "Falda Midi Plisada",
  "Blusa Crop Satin", "Pantalón Wide Leg", "Sandalias Platform",
  "Bolso Crossbody Mini", "Gafas de Sol Retro", "Sombrero Bucket Hat",
];
const modaImgs = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&q=80",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
  "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
  "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
  "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
];
const modaStores = ["ModaUrbana", "StyleHouse", "StreetVibes", "CaliFashion"];

/* ── Hogar ── */
const hogarNames = [
  "Humidificador Aroma LED", "Set Sábanas 300 Hilos", "Lámpara de Mesa Nordic",
  "Organizador Closet Bambú", "Juego Ollas Antiadherente", "Espejo Decorativo Redondo",
  "Cojín Decorativo Velvet", "Vela Aromática Lavanda", "Toallas Premium Set x4",
  "Cortina Blackout Térmica", "Reloj Pared Minimalista", "Maceta Cerámica Set x3",
  "Tapete Decorativo Boho", "Porta Vinos Madera", "Set Cocina Silicona 8pz",
  "Dispensador Jabón Auto", "Marco Fotos Collage", "Perchero Pared Industrial",
];
const hogarImgs = [
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
  "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&q=80",
  "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=400&q=80",
  "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=80",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
];
const hogarStores = ["HogarPlus", "CasaBella", "DecoValle", "ConfortHome"];

/* ── Belleza ── */
const bellezaNames = [
  "Set Skincare Premium 5pz", "Sérum Vitamina C 30ml", "Mascarilla Facial Oro",
  "Kit Maquillaje Profesional", "Crema Hidratante Noche", "Paleta Sombras 18 Tonos",
  "Aceite Argán Orgánico", "Labial Matte Long Lasting", "Rizador Cerámico Pro",
  "Secador Iónico 2200W", "Perfume Floral 100ml", "Set Brochas Maquillaje 12pz",
  "Exfoliante Corporal Café", "Tónico Facial Rosas", "Protector Solar SPF50",
  "Contorno Ojos Retinol", "Shampoo Sin Sulfatos", "Mascarilla Capilar Keratina",
];
const bellezaImgs = [
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=400&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
  "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80",
  "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80",
  "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
];
const bellezaStores = ["BeautyLab", "GlamCali", "SkinFirst", "NaturalGlow"];

/* ── Mascotas ── */
const mascotasNames = [
  "Collar LED Mascota", "Cama Ortopédica Perro L", "Juguete Interactivo Gato",
  "Arnés Reflectivo Ajustable", "Comedero Automático WiFi", "Shampoo Mascotas Natural",
  "Transportadora Rígida M", "Snacks Dentales x30", "Rascador Torre Gato 3N",
  "Correa Retráctil 5m", "Plato Antideslizante Doble", "Cepillo Deslanador Pro",
  "Dispensador Agua Fuente", "Abrigo Impermeable Perro", "Kit Aseo Mascotas 6pz",
  "Pelota Lanzador Auto", "Cama Colgante Gato", "Hueso Nylon Resistente",
];
const mascotasImgs = [
  "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
  "https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=400&q=80",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80",
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&q=80",
];
const mascotasStores = ["PetWorld", "HuellasCali", "MascotaFeliz", "PetShopValle"];

/* ── Deportes ── */
const deportesNames = [
  "Tenis Running Air Max", "Banda Resistencia Set x5", "Mancuernas Ajustables 20kg",
  "Esterilla Yoga Premium", "Botella Térmica 1L", "Guantes Gym Ventilados",
  "Reloj GPS Deportivo", "Camiseta Dry-Fit Pro", "Short Deportivo Quick Dry",
  "Balón Fútbol Profesional", "Rodillera Compresión Par", "Cuerda Saltar Speed",
  "Maleta Gym Compartimentos", "Gafas Ciclismo UV400", "Tobillera Ajustable Pro",
  "Foam Roller Masaje 45cm", "Chaleco Reflectivo Running", "Medias Compresión Deporte",
];
const deportesImgs = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80",
  "https://images.unsplash.com/photo-1461896836934-bd45ba8ee2cd?w=400&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80",
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80",
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=80",
  "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80",
];
const deportesStores = ["SportZone", "FitCali", "RunnersPro", "AthleticShop"];

/* ── Helper to generate products ── */
function generateProducts(
  category: string,
  names: string[],
  imgs: string[],
  stores: string[],
  idOffset: number,
  count = 18,
): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    name: names[i % names.length],
    price: Math.round((Math.random() * 180 + 20) * 1000),
    oldPrice: i % 3 === 0 ? Math.round((Math.random() * 200 + 120) * 1000) : undefined,
    image: imgs[i % imgs.length],
    store: stores[i % stores.length],
    rating: +(3.5 + Math.random() * 1.5).toFixed(1),
    verified: i % 4 !== 3,
    category,
  }));
}

/* ── Exported datasets ── */
export const techProductsList = generateProducts("Tecnología", techNames, techImgs, techStores, 1000);
export const modaProductsList = generateProducts("Moda", modaNames, modaImgs, modaStores, 2000);
export const hogarProductsList = generateProducts("Hogar", hogarNames, hogarImgs, hogarStores, 3000);
export const bellezaProductsList = generateProducts("Belleza", bellezaNames, bellezaImgs, bellezaStores, 4000);
export const mascotasProductsList = generateProducts("Mascotas", mascotasNames, mascotasImgs, mascotasStores, 5000);
export const deportesProductsList = generateProducts("Deportes", deportesNames, deportesImgs, deportesStores, 6000);

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
  oldPrice: Math.round((Math.random() * 200 + 100) * 1000),
}));

// Subsets for home carousels
export const bestSellerProducts: Product[] = allProducts.filter((_, i) => i % 6 === 0).slice(0, 8).map((p, i) => ({ ...p, id: 8000 + i }));
export const techProducts: Product[] = techProductsList.slice(0, 8).map((p, i) => ({ ...p, id: 8100 + i }));

// Category → stores mapping
export const categoryStoresMap: Record<string, string[]> = {
  "Tecnología": techStores,
  "Moda": modaStores,
  "Hogar": hogarStores,
  "Belleza": bellezaStores,
  "Mascotas": mascotasStores,
  "Deportes": deportesStores,
};
