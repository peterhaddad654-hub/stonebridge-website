import { useCart } from '@/contexts/CartContext';
import { Trash } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const checkoutWhatsApp = () => {
    if (!cart.length) return;

    let message = `Hello STONEBRIDGE, I want to place an order:%0A%0A`;

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} = $${(item.price || 0) * item.quantity}%0A`;
    });

    message += `%0A💰 Total: $${total}`;

    const phone = '96179467530';
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-white/10 p-4 bg-[#111]"
              >

                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">

                  {/* IMAGE (SAFE FIX) */}
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-14 h-14 object-contain bg-black border border-white/10"
                  />

                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-[#D4AF37]">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>

                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-3 border border-white/10 px-3 py-1">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 text-lg"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 text-lg"
                  >
                    +
                  </button>

                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash className="w-4 h-4" />
                </button>

              </div>
            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-10 text-right">

            <h2 className="text-xl">
              Total: <span className="text-[#D4AF37]">${total}</span>
            </h2>

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={clearCart}
                className="border border-white/20 px-5 py-2"
              >
                Clear Cart
              </button>

              <button
                onClick={checkoutWhatsApp}
                className="bg-[#D4AF37] text-black px-6 py-3 font-medium"
              >
                Checkout via WhatsApp
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
}