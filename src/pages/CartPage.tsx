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
    <div className="min-h-screen bg-black text-white px-4 md:px-10 lg:px-20 py-16 md:py-24">

      {/* TITLE */}
      <h1 className="text-2xl md:text-4xl font-bold mb-10">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 p-4 md:p-5 bg-[#111] rounded-xl"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-14 h-14 md:w-16 md:h-16 object-contain bg-black border border-white/10 rounded"
                  />

                  <div>
                    <h3 className="font-medium text-sm md:text-base">
                      {item.name}
                    </h3>
                    <p className="text-[#D4AF37] text-sm">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>

                </div>

                {/* RIGHT CONTROLS */}
                <div className="flex items-center justify-between md:justify-end gap-4">

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 border border-white/10 px-3 py-1 rounded">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 text-lg"
                    >
                      -
                    </button>

                    <span className="text-sm">{item.quantity}</span>

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
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <Trash className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* TOTAL SECTION */}
          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <h2 className="text-lg md:text-xl">
              Total: <span className="text-[#D4AF37] font-semibold">${total}</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4">

              <button
                onClick={clearCart}
                className="border border-white/20 px-5 py-2 rounded hover:bg-white/5 transition"
              >
                Clear Cart
              </button>

              <button
                onClick={checkoutWhatsApp}
                className="bg-[#D4AF37] text-black px-6 py-3 font-medium rounded hover:opacity-90 transition"
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