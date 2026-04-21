import { useParams, Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useData();
  const { addToCart } = useCart();

  const product = products.find((p: any) => String(p.id) === id);

  if (!product) {
    return (
      <div className="bg-[#0F0F10] text-white min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F10] text-white min-h-screen">

      <div className="max-w-[1200px] mx-auto px-6 py-16">

        {/* BACK */}
        <Link
          to="/products"
          className="text-xs tracking-[0.15em] uppercase text-gray-400 hover:text-white"
        >
          ← Back to products
        </Link>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-12 mt-10">

          {/* IMAGE (FIXED — NO EMPTY SRC BUG) */}
          <div className="bg-[#111] border border-white/10 p-8 flex items-center justify-center">

            {product.image && product.image.trim() !== '' ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[420px] object-contain"
              />
            ) : (
              <div className="text-gray-500 text-sm">
                No Image Available
              </div>
            )}

          </div>

          {/* INFO */}
          <div>

            <p className="text-xs text-[#D4AF37] uppercase tracking-[0.2em]">
              {product.category}
            </p>

            <h1 className="text-3xl md:text-4xl font-light mt-2 tracking-wide">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-5 flex items-center gap-3">

              {product.oldPrice && (
                <span className="text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
              )}

              <span className="text-[#D4AF37] text-2xl">
                ${product.price}
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-400 mt-6 leading-relaxed text-sm">
              {product.description || 'Premium product from our collection.'}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3">

              {/* ADD TO CART */}
              <button
                onClick={() => addToCart(product)}
                className="bg-[#D4AF37] text-black py-3 uppercase text-sm tracking-[0.15em] hover:scale-[1.02] transition"
              >
                Add to Cart
              </button>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/96179467530?text=Hello, I'm interested in ${product.name}`}
                target="_blank"
                className="border border-white/20 text-white py-3 uppercase text-sm tracking-[0.15em] text-center hover:border-[#D4AF37] transition"
              >
                Order via WhatsApp
              </a>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}