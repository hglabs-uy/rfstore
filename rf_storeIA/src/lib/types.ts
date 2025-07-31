export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  showIVA: boolean;
  category: string;
  brand: Brand;
  imageUrls: string[];
  status: 'visible' | 'hidden';
  specifications: Record<string, string>;
  aiHint?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  aiHint?: string;
}

export interface PartnerBrand {
  name: string;
  logoUrl: string;
  aiHint?: string;
}
