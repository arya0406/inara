export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const categories: Category[] = [
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Elegant bracelets crafted with precision and style',
    image: '/images/products/bracelet-1.jpg',
    slug: 'bracelets'
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    description: 'Beautiful necklaces for every occasion',
    image: '/images/products/necklace-1.jpg',
    slug: 'necklaces'
  },
  {
    id: 'rings',
    name: 'Rings',
    description: 'Stunning rings crafted with finest materials',
    image: '/images/products/ring-1.jpg',
    slug: 'rings'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Elegant earrings to complement your style',
    image: '/images/products/earrings-1.jpg',
    slug: 'earrings'
  },
  {
    id: 'pendants',
    name: 'Pendants',
    description: 'Unique pendants for a distinctive look',
    image: '/images/products/pendant-1.jpg',
    slug: 'pendants'
  }
];
