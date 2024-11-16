"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalAmount: 0,
      addToCart: (product, quantity) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        let newItems;
        if (existingItem) {
          newItems = currentItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...currentItems, { product, quantity }];
        }

        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalAmount });
      },
      removeFromCart: (productId) => {
        const newItems = get().items.filter(
          (item) => item.product.id !== productId
        );
        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalAmount });
      },
      updateQuantity: (productId, quantity) => {
        const newItems = get().items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalAmount });
      },
      clearCart: () => {
        set({ items: [], totalItems: 0, totalAmount: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);