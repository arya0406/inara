export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  type: 'category' | 'collection';
}

export const categories: Category[] = [
  // Product Categories
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Elegant bracelets crafted with precision and style',
    image: '/images/products/bracelets/bracelet-main.jpg',
    slug: 'bracelets',
    type: 'category'
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    description: 'Beautiful necklaces for every occasion',
    image: '/images/products/necklace-1.jpg',
    slug: 'necklaces',
    type: 'category'
  },
  {
    id: 'rings',
    name: 'Rings',
    description: 'Stunning rings crafted with finest materials',
    image: '/images/products/ring-1.jpg',
    slug: 'rings',
    type: 'category'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Elegant earrings to complement your style',
    image: '/images/products/earrings-1.jpg',
    slug: 'earrings',
    type: 'category'
  },
  // Collections
  {
    id: 'ethereal',
    name: 'Ethereal Collection',
    description: "Delicate pieces inspired by nature's beauty",
    image: '/images/products/necklace-1.jpg',
    slug: 'ethereal',
    type: 'collection'
  },
  {
    id: 'modern-classics',
    name: 'Modern Classics',
    description: 'Timeless designs for the contemporary woman',
    image: '/images/products/ring-1.jpg',
    slug: 'modern-classics',
    type: 'collection'
  },
  {
    id: 'statement',
    name: 'Statement Pieces',
    description: 'Bold and unique jewelry that stands out',
    image: '/images/products/pendant-1.jpg',
    slug: 'statement',
    type: 'collection'
  }
];
