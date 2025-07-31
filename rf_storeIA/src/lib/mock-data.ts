import type { Product, Category, BlogPost, PartnerBrand, Brand } from '@/lib/types';

export const categories: Category[] = [
  { id: 'all', name: 'Todos' },
  { id: 'laptops', name: 'Laptops' },
  { id: 'desktops', name: 'Desktops' },
  { id: 'monitors', name: 'Monitores' },
  { id: 'printers', name: 'Impresoras' },
  { id: 'networking', name: 'Redes' },
  { id: 'storage', name: 'Almacenamiento' },
  { id: 'peripherals', name: 'Periféricos' },
];

export const brands: Brand[] = [
  { id: 'lenovo', name: 'Lenovo' },
  { id: 'dell', name: 'Dell' },
  { id: 'hp', name: 'HP' },
  { id: 'cisco', name: 'Cisco' },
  { id: 'samsung', name: 'Samsung' },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'notebook-lenovo-thinkpad-l14',
    name: 'NOTEBOOK LENOVO THINKPAD L14',
    shortDescription: 'U5 125U / 16G / 512G / W11P / 3YOS',
    fullDescription: 'La ThinkPad L14 combina potencia, portabilidad y seguridad en un diseño robusto y confiable, ideal para el entorno empresarial moderno. Equipada con procesadores de última generación y características de seguridad avanzadas, está lista para cualquier desafío.',
    price: 1230.00,
    showIVA: true,
    category: 'laptops',
    brand: { id: 'lenovo', name: 'Lenovo' },
    imageUrls: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    status: 'visible',
    aiHint: 'lenovo thinkpad laptop',
    specifications: {
      'Procesador': 'Intel® Core Ultra 5 125U',
      'Memoria': '1x16 GB DDR5-5600MHz (SODIMM) (2 bancos removibles, máximo 64GB)',
      'Disco': '1x 512 GB SSD M.2 2280 PCIe Gen4 TLC Opal',
      'Segundo disco': 'No admite',
      'Gráficos': 'Intel Iris Xe Graphics',
      'Pantalla': '14" WUXGA (1920 x 1200), IPS, Anti-Glare, Non-Touch, 45%NTSC, 400 nits, 60Hz, DBEF5',
      'Puertos': '1x USB-A (Hi-Speed USB / USB 2.0), 2x USB-A (USB 5Gbps / USB 3.2 Gen 1), one Always On, 1x USB-C® (USB 20Gbps / USB 3.2 Gen 2x2), 1x USB-C® (Thunderbolt™ 4 / USB4® 40Gbps), 1x HDMI® 2.1, 1x Headphone / microphone combo jack (3.5mm), 1x Ethernet (RJ-45)',
      'Ethernet': 'Onboard vía RJ45',
      'Peso': '1.4 Kg',
      'Batería': 'Integrated Li-Polymer 46.5Wh battery',
      'Sistema Operativo': 'Windows 11 Pro 64-preinstalado de fábrica',
      'Wifi + Bluetooth': 'Intel® Wi-Fi 6E AX211 2x2 AX vPro & Bluetooth® 5.3',
      'Cámara': '720P HD RGB con ThinkShutter y lente de enfoque',
      'Micrófono': 'Dual array, far-field, Dolby Voice',
      'Parlantes': 'Stereo 2W x2, Dolby Audio',
      'Teclado antiderrame': 'Sí',
      'Teclado retroiluminado': 'Sí',
      'Teclado en español': 'Sí',
      'Lector de huellas': 'Sí',
      'Chip de seguridad': 'Discrete TPM 2.0, TCG certified',
      'Certificaciones': 'MIL-STD-810H',
      'Adaptador de energía': '65W USB-C con cable 3 en línea',
      'Garantía Oficial Lenovo': '3 Años carry in',
    }
  },
  {
    id: 'prod-002',
    slug: 'monitor-dell-ultrasharp-27-4k',
    name: 'Monitor Dell UltraSharp 27" 4K',
    shortDescription: 'USB-C Hub Monitor - U2723QE',
    fullDescription: 'Maximiza tu productividad con este monitor 4K que ofrece colores excepcionales y una conectividad increíble, incluyendo un hub USB-C para una configuración de escritorio más limpia.',
    price: 749.50,
    showIVA: true,
    category: 'monitors',
    brand: { id: 'dell', name: 'Dell' },
    imageUrls: ['https://placehold.co/600x600.png'],
    status: 'visible',
    aiHint: 'dell ultrasharp monitor',
    specifications: {
      'Tamaño': '27 pulgadas',
      'Resolución': '4K 3840x2160 a 60Hz',
      'Panel': 'IPS Black Technology',
      'Color': '1.07 mil millones de colores, 98% DCI-P3',
      'Hub USB-C': 'Sí, con Power Delivery de 90W'
    }
  },
  {
    id: 'prod-003',
    slug: 'servidor-hp-proliant-dl380-gen11',
    name: 'Servidor HP ProLiant DL380 Gen11',
    shortDescription: 'Rendimiento y versatilidad para cargas de trabajo exigentes.',
    fullDescription: 'El servidor HPE ProLiant DL380 Gen11 es la solución ideal para diversos entornos de TI, desde la virtualización hasta las bases de datos. Ofrece un rendimiento excepcional, seguridad mejorada y escalabilidad para el futuro.',
    price: 3500.00,
    showIVA: true,
    category: 'servers',
    brand: { id: 'hp', name: 'HP' },
    imageUrls: ['https://placehold.co/600x600.png'],
    status: 'visible',
    aiHint: 'hp proliant server',
    specifications: {
      'Procesador': 'Intel® Xeon® Scalable de 4ª generación (hasta 2)',
      'Memoria': 'Hasta 8TB DDR5',
      'Almacenamiento': 'Hasta 24 SFF SAS/SATA/NVMe',
      'Red': 'HPE Smart Array controllers',
      'Gestión': 'HPE iLO 6'
    }
  },
];

export const featuredProducts: Product[] = products.slice(0, 4);

export const partnerBrands: PartnerBrand[] = [
  { name: 'TechCorp', logoUrl: 'https://placehold.co/128x48.png', aiHint: 'tech logo' },
  { name: 'Innovate Inc.', logoUrl: 'https://placehold.co/128x48.png', aiHint: 'innovate logo' },
  { name: 'Quantum Systems', logoUrl: 'https://placehold.co/128x48.png', aiHint: 'quantum logo' },
  { name: 'Apex Solutions', logoUrl: 'https://placehold.co/128x48.png', aiHint: 'apex logo' },
  { name: 'Synergy Labs', logoUrl: 'https://placehold.co/128x48.png', aiHint: 'synergy logo' },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'post-001',
    slug: '5-tendencias-tecnologicas-para-empresas-en-2024',
    title: '5 Tendencias Tecnológicas para Empresas Modernas',
    excerpt: 'Descubre las innovaciones que están transformando el panorama empresarial, desde la IA hasta la ciberseguridad.',
    content: 'El mundo empresarial está en constante evolución, y la tecnología es el motor principal de este cambio. En 2024, varias tendencias clave están configurando la forma en que las empresas operan, compiten y crecen. La inteligencia artificial generativa, por ejemplo, está revolucionando la creación de contenido y la automatización de tareas. La ciberseguridad, por otro lado, se ha vuelto más crucial que nunca, con soluciones avanzadas para proteger los datos corporativos. Además, el trabajo híbrido sigue impulsando la necesidad de herramientas de colaboración más eficientes y seguras. Adaptarse a estas tendencias no es solo una opción, sino una necesidad para mantenerse competitivo.',
    imageUrl: 'https://placehold.co/800x450.png',
    author: 'Equipo RF STORE',
    date: '2024-05-15',
    aiHint: 'technology trends'
  },
  {
    id: 'post-002',
    slug: 'como-elegir-el-equipamiento-informatico-adecuado',
    title: 'Guía para Elegir el Mejor Portátil para tu Empresa',
    excerpt: 'Una guía práctica para seleccionar portátiles que maximicen la productividad y se ajusten a tu presupuesto.',
    content: 'Seleccionar el equipamiento informático correcto es una decisión estratégica que impacta directamente en la productividad de tu equipo. No se trata solo de comprar los modelos más caros, sino de entender las necesidades específicas de cada rol. Para los desarrolladores, un portátil potente con mucha RAM y un monitor de alta resolución es esencial. Para el equipo de ventas, la portabilidad y la duración de la batería son prioritarias. En esta guía, desglosamos los factores clave a considerar, desde el rendimiento y la ergonomía hasta la seguridad y el coste total de propiedad, ayudándote a tomar la mejor decisión para tu empresa.',
    imageUrl: 'https://placehold.co/800x450.png',
    author: 'Equipo RF STORE',
    date: '2024-04-28',
    aiHint: 'office equipment'
  },
  {
    id: 'post-003',
    slug: 'la-importancia-de-la-ergonomia-en-el-espacio-de-trabajo',
    title: 'Optimizando el Espacio de Trabajo para Máxima Eficiencia',
    excerpt: 'Mejora el bienestar y la productividad de tus empleados invirtiendo en soluciones ergonómicas y tecnológicas.',
    content: 'Un espacio de trabajo ergonómico es fundamental para la salud y el bienestar de los empleados, lo que se traduce en una mayor productividad y una menor tasa de absentismo. Desde sillas ajustables y escritorios de altura variable hasta teclados y ratones ergonómicos, cada elemento cuenta. Un monitor a la altura de los ojos puede prevenir la tensión en el cuello, mientras que un buen soporte lumbar en la silla puede evitar dolores de espalda. Invertir en ergonomía no es un gasto, es una inversión en el activo más valioso de tu empresa: su gente.',
    imageUrl: 'https://placehold.co/800x450.png',
    author: 'Equipo RF STORE',
    date: '2024-04-10',
    aiHint: 'ergonomic workspace'
  },
];
