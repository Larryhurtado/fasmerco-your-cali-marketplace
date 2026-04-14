import {
  Smartphone, Tablet, Watch, BatteryCharging, Shield, Headphones, Speaker,
  Laptop, Mouse, Gamepad2,
  // Moda
  Shirt, UserRound, Footprints, Glasses, Clock, Crown,
  // Belleza
  Paintbrush, Sparkles, Scissors, Droplets,
  // Mascotas
  Dog, Cat, Heart,
  // Hogar
  CookingPot, Lamp, Package,
  // Deportes
  Dumbbell, FlaskConical, Trophy,
} from "lucide-react";

export interface SubcategoryItem {
  name: string;
  icon: any;
}

export interface SubcategoryGroup {
  title: string;
  items: SubcategoryItem[];
}

export interface MegamenuCategory {
  name: string;
  groups: SubcategoryGroup[];
}

export const megamenuData: MegamenuCategory[] = [
  {
    name: "Moda",
    groups: [
      {
        title: "Mujer",
        items: [
          { name: "Vestidos", icon: Shirt },
          { name: "Blusas y Tops", icon: Shirt },
          { name: "Pantalones y Jeans", icon: Shirt },
          { name: "Ropa Interior", icon: Shirt },
        ],
      },
      {
        title: "Hombre",
        items: [
          { name: "Camisetas", icon: UserRound },
          { name: "Camisas", icon: UserRound },
          { name: "Jeans y Bermudas", icon: UserRound },
          { name: "Chaquetas", icon: UserRound },
        ],
      },
      {
        title: "Calzado",
        items: [
          { name: "Tenis Deportivos", icon: Footprints },
          { name: "Zapatos Formales", icon: Footprints },
          { name: "Sandalias y Chanclas", icon: Footprints },
        ],
      },
      {
        title: "Accesorios",
        items: [
          { name: "Gafas de Sol", icon: Glasses },
          { name: "Relojes", icon: Clock },
          { name: "Gorras", icon: Crown },
        ],
      },
    ],
  },
  {
    name: "Tecnología",
    groups: [
      {
        title: "Móviles",
        items: [
          { name: "Smartphones", icon: Smartphone },
          { name: "Tablets", icon: Tablet },
          { name: "Smartwatches", icon: Watch },
        ],
      },
      {
        title: "Accesorios",
        items: [
          { name: "Cargadores y Cables", icon: BatteryCharging },
          { name: "Fundas (Cases)", icon: Shield },
          { name: "Protectores de Pantalla", icon: Shield },
        ],
      },
      {
        title: "Audio",
        items: [
          { name: "Audífonos Bluetooth", icon: Headphones },
          { name: "Parlantes Portátiles", icon: Speaker },
        ],
      },
      {
        title: "Computación",
        items: [
          { name: "Laptops", icon: Laptop },
          { name: "Periféricos", icon: Mouse },
          { name: "Gaming", icon: Gamepad2 },
        ],
      },
    ],
  },
  {
    name: "Belleza",
    groups: [
      {
        title: "Maquillaje",
        items: [
          { name: "Rostro", icon: Paintbrush },
          { name: "Ojos", icon: Paintbrush },
          { name: "Labios", icon: Paintbrush },
          { name: "Paletas de Sombras", icon: Paintbrush },
        ],
      },
      {
        title: "Cuidado Personal",
        items: [
          { name: "Skincare", icon: Sparkles },
          { name: "Cuidado del Cabello", icon: Sparkles },
        ],
      },
      {
        title: "Barbería",
        items: [
          { name: "Máquinas de Corte", icon: Scissors },
          { name: "Productos de Afeitado", icon: Scissors },
        ],
      },
      {
        title: "Perfumería",
        items: [
          { name: "Fragancias Nacionales e Importadas", icon: Droplets },
        ],
      },
    ],
  },
  {
    name: "Mascotas",
    groups: [
      {
        title: "Perros",
        items: [
          { name: "Alimento Perros", icon: Dog },
          { name: "Juguetes Perros", icon: Dog },
          { name: "Camas y Casas", icon: Dog },
          { name: "Correas y Collares", icon: Dog },
        ],
      },
      {
        title: "Gatos",
        items: [
          { name: "Alimento Gatos", icon: Cat },
          { name: "Arena e Higiene", icon: Cat },
          { name: "Rascadores", icon: Cat },
        ],
      },
      {
        title: "Salud y Bienestar",
        items: [
          { name: "Vitaminas Mascotas", icon: Heart },
          { name: "Productos de Limpieza", icon: Heart },
        ],
      },
    ],
  },
  {
    name: "Hogar",
    groups: [
      {
        title: "Cocina",
        items: [
          { name: "Utensilios", icon: CookingPot },
          { name: "Pequeños Electrodomésticos", icon: CookingPot },
        ],
      },
      {
        title: "Decoración",
        items: [
          { name: "Iluminación LED", icon: Lamp },
          { name: "Cuadros", icon: Lamp },
          { name: "Cojines", icon: Lamp },
        ],
      },
      {
        title: "Organización",
        items: [
          { name: "Cajas Organizadoras", icon: Package },
          { name: "Percheros y Armarios", icon: Package },
        ],
      },
    ],
  },
  {
    name: "Deportes",
    groups: [
      {
        title: "Ropa Deportiva",
        items: [
          { name: "Conjuntos Gym", icon: Trophy },
          { name: "Camisetas Dry-Fit", icon: Trophy },
        ],
      },
      {
        title: "Equipamiento",
        items: [
          { name: "Pesas y Mancuernas", icon: Dumbbell },
          { name: "Bandas Elásticas", icon: Dumbbell },
          { name: "Mats de Yoga", icon: Dumbbell },
        ],
      },
      {
        title: "Suplementación",
        items: [
          { name: "Proteínas", icon: FlaskConical },
          { name: "Creatinas", icon: FlaskConical },
          { name: "Shakers", icon: FlaskConical },
        ],
      },
    ],
  },
];

// Flat list of all subcategory names per category
export const categorySubcategories: Record<string, string[]> = {};
megamenuData.forEach((cat) => {
  categorySubcategories[cat.name] = cat.groups.flatMap((g) => g.items.map((i) => i.name));
});
