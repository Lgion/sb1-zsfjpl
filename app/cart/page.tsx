"use client";

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import GooglePayButton from '@google-pay/button-react';

export default function CartPage() {
  const router = useRouter();
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: '4488-1071-9411',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '4488-1071-9411',
      merchantName: 'Restaurant Name',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: totalAmount.toFixed(2),
      currencyCode: 'EUR',
      countryCode: 'FR',
    },
  };

  return (
    <main className="container pt-4 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Votre commande</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Votre panier est vide</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-primary font-medium"
          >
            Retourner au menu
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-primary font-bold">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg max-w-[480px] mx-auto">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold">{totalAmount.toFixed(2)} €</span>
            </div>
            <GooglePayButton
              environment="TEST"
              paymentRequest={paymentRequest}
              onLoadPaymentData={(paymentRequest) => {
                console.log('Success', paymentRequest);
              }}
              className="w-full"
            />
          </div>
        </>
      )}
    </main>
  );
}