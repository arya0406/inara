export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  total: number;
}
