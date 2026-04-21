import { useCart } from '@/contexts/CartContext';
import { X } from 'lucide-react';

export default function CartDrawer({ open, setOpen }: any) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex">

      {/* BACKDROP */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60"
      />

      {/* PANEL */}
      <div className="ml-auto w-full max-w-md bg-[#0F0F10] text-white h-full relative p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg uppercase">Your Cart</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* ITEMS */}
        <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">

          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border border-white/10 p-4 flex justify-between"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-400">
                    ${item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}

        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              const message = cart
                .map((i) => `${i.name} x${i.quantity}`)
                .join('%0A');

              window.open(
                `https://wa.me/96179467530?text=Order:%0A${message}%0ATotal: $${total}`,
                '_blank'
              );
            }}
            className="w-full bg-[#D4AF37] text-black py-3 uppercase"
          >
            Checkout via WhatsApp
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-2 text-sm text-gray-400"
          >
            Clear Cart
          </button>

        </div>

      </div>
    </div>
  );
}