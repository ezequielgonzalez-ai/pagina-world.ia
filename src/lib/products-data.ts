// WORLD.IA - Products Data for Store
// Amazon Affiliate ID: ezequielgonza-20

export interface Product {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: ProductCategory;
  rating: number;
  reviews: number;
  amazonId: string;
  featured?: boolean;
  bestseller?: boolean;
  discount?: number;
}

export type ProductCategory = 
  | 'laptops'
  | 'monitors'
  | 'peripherals'
  | 'books'
  | 'audio'
  | 'gaming'
  | 'cameras'
  | 'smartphone';

export const productCategories = [
  { id: 'laptops', name: 'Laptops & PCs', nameEs: 'Laptops & PCs', icon: '💻' },
  { id: 'monitors', name: 'Monitors', nameEs: 'Monitores', icon: '🖥️' },
  { id: 'peripherals', name: 'Peripherals', nameEs: 'Periféricos', icon: '🖱️' },
  { id: 'books', name: 'Books', nameEs: 'Libros', icon: '📚' },
  { id: 'audio', name: 'Audio', nameEs: 'Audio', icon: '🎧' },
  { id: 'gaming', name: 'Gaming', nameEs: 'Gaming', icon: '🎮' },
  { id: 'cameras', name: 'Cameras', nameEs: 'Cámaras', icon: '📷' },
  { id: 'smartphone', name: 'Smartphones', nameEs: 'Smartphones', icon: '📱' },
];

const AMAZON_ID = 'ezequielgonza-20';

export const products: Product[] = [
  // LAPTOPS
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14" M3 Pro',
    nameEs: 'MacBook Pro 14" M3 Pro',
    description: 'The most advanced Mac laptop for demanding workflows',
    descriptionEs: 'El portátil Mac más avanzado para flujos de trabajo exigentes',
    price: '$1,999',
    originalPrice: '$2,199',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    category: 'laptops',
    rating: 4.9,
    reviews: 2341,
    amazonId: 'B0CM5SS8J8',
    featured: true,
    bestseller: true,
    discount: 9
  },
  {
    id: 'dell-xps-15',
    name: 'Dell XPS 15',
    nameEs: 'Dell XPS 15',
    description: 'Premium Windows laptop for creators and professionals',
    descriptionEs: 'Laptop Windows premium para creadores y profesionales',
    price: '$1,549',
    originalPrice: '$1,899',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    category: 'laptops',
    rating: 4.7,
    reviews: 1856,
    amazonId: 'B0CGVPF1BW',
    featured: true,
    discount: 18
  },
  {
    id: 'asus-rog',
    name: 'ASUS ROG Zephyrus G16',
    nameEs: 'ASUS ROG Zephyrus G16',
    description: 'Ultimate gaming laptop with RTX 4080',
    descriptionEs: 'La laptop gaming definitiva con RTX 4080',
    price: '$2,299',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    category: 'laptops',
    rating: 4.8,
    reviews: 987,
    amazonId: 'B0D5FMYGZC',
    bestseller: true
  },
  {
    id: 'lenovo-thinkpad',
    name: 'Lenovo ThinkPad X1 Carbon',
    nameEs: 'Lenovo ThinkPad X1 Carbon',
    description: 'Business ultrabook with legendary keyboard',
    descriptionEs: 'Ultrabook de negocios con teclado legendario',
    price: '$1,649',
    originalPrice: '$1,949',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
    category: 'laptops',
    rating: 4.6,
    reviews: 1234,
    amazonId: 'B0D5GQDXVY',
    discount: 15
  },

  // MONITORS
  {
    id: 'dell-ultrasharp-27',
    name: 'Dell UltraSharp 27 4K',
    nameEs: 'Dell UltraSharp 27 4K',
    description: 'Professional 4K monitor for creative work',
    descriptionEs: 'Monitor 4K profesional para trabajo creativo',
    price: '$549',
    originalPrice: '$699',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    category: 'monitors',
    rating: 4.8,
    reviews: 3456,
    amazonId: 'B0C9VXLZQX',
    featured: true,
    discount: 21
  },
  {
    id: 'lg-gram-32',
    name: 'LG 32UN880-B UltraFine',
    nameEs: 'LG 32UN880-B UltraFine',
    description: '32-inch 4K display with ergonomic stand',
    descriptionEs: 'Pantalla 4K de 32 pulgadas con soporte ergonómico',
    price: '$699',
    originalPrice: '$799',
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400',
    category: 'monitors',
    rating: 4.7,
    reviews: 892,
    amazonId: 'B08F7RF7MM',
    discount: 12
  },
  {
    id: 'samsung-odyssey',
    name: 'Samsung Odyssey G7 32"',
    nameEs: 'Samsung Odyssey G7 32"',
    description: 'Gaming monitor 240Hz QLED curved',
    descriptionEs: 'Monitor gaming 240Hz QLED curvo',
    price: '$799',
    originalPrice: '$999',
    image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400',
    category: 'monitors',
    rating: 4.6,
    reviews: 2134,
    amazonId: 'B08FSR2FM4',
    bestseller: true,
    discount: 20
  },

  // PERIPHERALS
  {
    id: 'logitech-mx-master-3',
    name: 'Logitech MX Master 3S',
    nameEs: 'Logitech MX Master 3S',
    description: 'Advanced wireless mouse for productivity',
    descriptionEs: 'Mouse inalámbrico avanzado para productividad',
    price: '$99',
    originalPrice: '$129',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    category: 'peripherals',
    rating: 4.9,
    reviews: 12456,
    amazonId: '0B097SZ6ZJZ',
    featured: true,
    bestseller: true,
    discount: 23
  },
  {
    id: 'keychron-q1',
    name: 'Keychron Q1 Pro',
    nameEs: 'Keychron Q1 Pro',
    description: 'Wireless mechanical keyboard QMK/VIA',
    descriptionEs: 'Teclado mecánico inalámbrico QMK/VIA',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400',
    category: 'peripherals',
    rating: 4.8,
    reviews: 2341,
    amazonId: 'B0BFJ3J9P8',
    featured: true
  },
  {
    id: 'razer-deathadder',
    name: 'Razer DeathAdder V3 Pro',
    nameEs: 'Razer DeathAdder V3 Pro',
    description: 'Professional gaming mouse 30K DPI',
    descriptionEs: 'Mouse gaming profesional 30K DPI',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=400',
    category: 'peripherals',
    rating: 4.7,
    reviews: 3456,
    amazonId: 'B0BVFYMQW9',
    bestseller: true
  },

  // BOOKS
  {
    id: 'deep-learning-book',
    name: 'Deep Learning (Adaptive Computation)',
    nameEs: 'Deep Learning (Computación Adaptativa)',
    description: 'The comprehensive textbook on deep learning',
    descriptionEs: 'El libro de texto completo sobre deep learning',
    price: '$59.99',
    originalPrice: '$85.00',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    category: 'books',
    rating: 4.9,
    reviews: 3456,
    amazonId: '0262035618',
    featured: true,
    discount: 29
  },
  {
    id: 'hands-on-ml',
    name: 'Hands-On Machine Learning',
    nameEs: 'Aprendizaje Automático Práctico',
    description: 'Best-selling guide to ML with Python',
    descriptionEs: 'La guía más vendida de ML con Python',
    price: '$44.99',
    originalPrice: '$69.99',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    category: 'books',
    rating: 4.9,
    reviews: 5678,
    amazonId: '1098125975',
    featured: true,
    bestseller: true,
    discount: 36
  },
  {
    id: 'python-data-science',
    name: 'Python for Data Analysis',
    nameEs: 'Python para Análisis de Datos',
    description: 'Essential guide for data science with Python',
    descriptionEs: 'Guía esencial para ciencia de datos con Python',
    price: '$39.99',
    originalPrice: '$54.99',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    category: 'books',
    rating: 4.8,
    reviews: 2341,
    amazonId: '1491957662',
    discount: 27
  },
  {
    id: 'ai-superpowers',
    name: 'AI Superpowers',
    nameEs: 'Súperpoderes de IA',
    description: "China, Silicon Valley, and the New World Order",
    descriptionEs: 'China, Silicon Valley y el Nuevo Orden Mundial',
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    category: 'books',
    rating: 4.6,
    reviews: 1876,
    amazonId: '1328606033'
  },

  // AUDIO
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    nameEs: 'Sony WH-1000XM5',
    description: 'Best noise canceling headphones',
    descriptionEs: 'Los mejores auriculares con cancelación de ruido',
    price: '$349',
    originalPrice: '$399',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'audio',
    rating: 4.9,
    reviews: 8765,
    amazonId: '09B09XS8XPH',
    featured: true,
    bestseller: true,
    discount: 12
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    nameEs: 'AirPods Pro 2',
    description: 'Apple wireless earbuds with ANC',
    descriptionEs: 'Auriculares inalámbricos Apple con ANC',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400',
    category: 'audio',
    rating: 4.8,
    reviews: 12345,
    amazonId: 'B0BDHWDR12',
    bestseller: true
  },
  {
    id: 'bose-quietcomfort',
    name: 'Bose QuietComfort 45',
    nameEs: 'Bose QuietComfort 45',
    description: 'Legendary comfort and sound',
    descriptionEs: 'Comodidad y sonido legendarios',
    price: '$279',
    originalPrice: '$329',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
    category: 'audio',
    rating: 4.7,
    reviews: 4532,
    amazonId: 'B098FKXT8K',
    discount: 15
  },

  // GAMING
  {
    id: 'ps5',
    name: 'PlayStation 5',
    nameEs: 'PlayStation 5',
    description: 'Next-gen gaming console',
    descriptionEs: 'Consola de videojuegos de nueva generación',
    price: '$499',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    category: 'gaming',
    rating: 4.9,
    reviews: 15678,
    amazonId: 'B0BCNKKZ92',
    featured: true,
    bestseller: true
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X',
    nameEs: 'Xbox Series X',
    description: 'Most powerful Xbox ever',
    descriptionEs: 'El Xbox más potente de la historia',
    price: '$499',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400',
    category: 'gaming',
    rating: 4.8,
    reviews: 8934,
    amazonId: 'B08H75RTZ8',
    bestseller: true
  },
  {
    id: 'meta-quest-3',
    name: 'Meta Quest 3',
    nameEs: 'Meta Quest 3',
    description: 'Mixed reality headset',
    descriptionEs: 'Auriculares de realidad mixta',
    price: '$499',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400',
    category: 'gaming',
    rating: 4.7,
    reviews: 3456,
    amazonId: 'B0C9VF2JQW',
    featured: true
  }
];

export const getAmazonUrl = (amazonId: string) => 
  `https://www.amazon.com/dp/${amazonId}?tag=${AMAZON_ID}`;

export const getProductsByCategory = (category: ProductCategory) =>
  products.filter(p => p.category === category);

export const getFeaturedProducts = () =>
  products.filter(p => p.featured);

export const getBestsellers = () =>
  products.filter(p => p.bestseller);
