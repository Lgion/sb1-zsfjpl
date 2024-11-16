"use client";

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartButtonProps {
  totalItems: number;
  totalAmount: number;
}

export default function CartButton({ totalItems, totalAmount }: CartButtonProps) {
  const router = useRouter();

  return (
    <button
      className="cart-button"
      onClick={() => router.push('/cart')}
    >
      <div className="flex items-center gap-2">
        <ShoppingBag size={24} />
        <span>{totalItems} articles</span>
      </div>
      <span className="font-bold">{totalAmount.toFixed(2)} €</span>
    </button>
  );
}