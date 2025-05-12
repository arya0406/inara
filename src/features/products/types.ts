export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  category: string;
  collections: string[];
  materials: string[];
  dimensions?: string;
  weight?: string;
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  rating: number;
  reviews: number;
}
