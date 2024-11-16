"use client";

import { useState } from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CartButton from '@/components/CartButton';
import { useCart } from '@/hooks/useCart';
import { Dialog } from '@/components/ui/dialog';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { totalItems, totalAmount } = useCart();

  // Mock data - replace with API calls
  const categories = [
    { id: 'all', name: 'Tout' },
    { id: 'starters', name: 'Entrées' },
    { id: 'mains', name: 'Plats' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Boissons' },
  ];

  const products = [
    {
      id: '1',
      name: 'Burger Signature',
      description: 'Bœuf, cheddar, bacon, sauce maison',
      price: 14.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
      categoryId: 'mains'
    },
    // Add more products...
  ];

  return (
    <main className="pt-[120px] pb-24">
      <nav className="navbar">
        <div className="navbar__content">
          <Menu size={24} />
          <Search size={24} />
        </div>
        <div className="navbar__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-pill ${
                activeCategory === category.id ? 'category-pill--active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="container">
        {products
          .filter(
            (product) =>
              activeCategory === 'all' || product.categoryId === activeCategory
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {totalItems > 0 && (
        <CartButton
          totalItems={totalItems}
          totalAmount={totalAmount}
        />
      )}
    </main>
  );
}