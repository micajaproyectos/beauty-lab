export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  volume: string;
  category: Category;
  gradient: string;
  badge?: string;
  featured?: boolean;
};

export type Category =
  | "Todos"
  | "Protección Solar"
  | "Hidratantes"
  | "Tratamientos";

export const CATEGORIES: Category[] = [
  "Todos",
  "Protección Solar",
  "Hidratantes",
  "Tratamientos",
];

export const products: Product[] = [
  {
    id: "tocobo-sun-stick",
    name: "TOCOBO Cotton Soft Sun Stick",
    description:
      "Protector solar en barra para uso facial. Fórmula sólida de fácil aplicación, no deja residuo blanco ni sensación pesada.",
    price: 24900,
    volume: "Barra",
    category: "Protección Solar",
    gradient: "from-[#F5E6C8] to-[#E8C97A]",
    badge: "",
    featured: true,
  },
  {
    id: "snature-aqua-squalane",
    name: "S. Nature Aqua Squalane",
    description:
      "Moisturizing cream con escualano de origen vegetal. Hidratación profunda de larga duración sin sensación grasa.",
    price: 39900,
    volume: "Crema",
    category: "Hidratantes",
    gradient: "from-[#D8EEF5] to-[#A0C8D8]",
    badge: "",
    featured: true,
  },
  {
    id: "tocobo-vitamin-spf",
    name: "Tocobo Vitamin Fruit Water SPF 50+",
    description:
      "Protector solar con Vitamina B12 y B3. Textura agua afrutada de absorción rápida, alta protección y luminosidad natural.",
    price: 24900,
    volume: "SPF 50+",
    category: "Protección Solar",
    gradient: "from-[#F5E0D0] to-[#E8A880]",
    badge: "SPF 50+",
    featured: true,
  },
  {
    id: "isntree-moist-cream",
    name: "Isntree Hyaluronic Moist Cream",
    description:
      "Crema con ácido hialurónico de alta concentración. Hidratación intensa, piel suave y jugosa desde la primera aplicación.",
    price: 23000,
    volume: "Crema",
    category: "Hidratantes",
    gradient: "from-[#E0EAF5] to-[#B0C8E8]",
    badge: "",
    featured: true,
  },
  {
    id: "puluk-toxtox-lash",
    name: "Puluk Toxtox Lash Treatment",
    description:
      "Mantiene la hidratación y nutrición posterior a un tratamiento de lifting de pestañas. Prolonga y cuida el resultado.",
    price: 15000,
    volume: "Tratamiento",
    category: "Tratamientos",
    gradient: "from-[#F0D8E8] to-[#D0A0C0]",
    badge: "",
    featured: false,
  },
  {
    id: "torriden-soothing-cream",
    name: "Torriden Soothing Cream",
    description:
      "Crema facial calmante de día y de noche. Hidratante, alivia la piel irritada, enrojecida o sensible.",
    price: 24900,
    volume: "Crema",
    category: "Hidratantes",
    gradient: "from-[#D8EEE0] to-[#A0C8A8]",
    badge: "",
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
