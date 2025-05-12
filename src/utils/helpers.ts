import { config } from '../config';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.currency
  }).format(price);
};

export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const calculateTotalPrice = (items: { price: number; quantity: number }[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateShipping = (subtotal: number): number => {
  if (subtotal >= config.shipping.freeShippingThreshold) {
    return 0;
  }
  return config.shipping.standardShippingPrice;
};
