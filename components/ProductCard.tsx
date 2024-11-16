"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@/components/ui/dialog';
import { useCart } from '@/hooks/useCart';
import { Info, Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0);
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="product-card__header">
          <div>
            <h3 className="product-card__title">{product.name}</h3>
            <p className="product-card__price">{product.price.toFixed(2)} €</p>
          </div>
          <button
            onClick={() => setShowDetails(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Info size={20} />
          </button>
        </div>

        <div className="product-card__actions">
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
              disabled={quantity === 0}
            >
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Ajouter
          </button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <div className="modal">
          <div className="modal__content">
            <div className="modal__header">
              <h2 className="text-xl font-semibold">{product.name}</h2>
            </div>
            <div className="modal__body">
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-xl font-bold mt-4">{product.price.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}