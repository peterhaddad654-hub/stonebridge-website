import { useState, useMemo } from 'react';
import { useData } from '@/contexts/DataContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';

const categories = ['All Products', 'Whisky', 'Wines', 'Spirits', 'Soft Drinks'];

export default function ProductsPage() {
  const { products } = useData();
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState('All Products');
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== 'All Products') {
      result = result.filter((p: any) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, activeCategory, search]);

  const handleAdd = (product: any) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 900);
  };

  return (
    <div className="bg-[#0F0F10] text-white min-h-screen pb-10">

      {/* TOP BAR */}
      <div className="max-w-[1344px] mx-auto px-4 pt-24 md:pt-28">
        <div className="flex flex-col gap-6 mb-8">

          <h1 className="text-2xl md:text-3xl font-display uppercase tracking-widest border-l-2 border-[#D4AF37] pl-4">
            Products
          </h1>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">

            {/* CATEGORIES */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar w-full md:w-auto border-b border-white/5 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-wider whitespace-nowrap transition ${
                    activeCategory === cat ? 'text-[#D4AF37]' : 'text-white/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full md:w-64 bg-white/5 border border-white/10 px-4 py-2 text-xs outline-none focus:border-[#D4AF37] transition rounded-sm"
            />

          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-[1344px] mx-auto px-4">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">

          {filtered.map((product: any) => {
            const isAdded = added === product.id;

            const isOut = product.status === 'out-of-stock';
            const isLimited = product.status === 'limited';

            return (
              <div
                key={product.id}
                className="bg-[#121212] border border-white/5 p-4 rounded-2xl flex flex-col group"
              >

                {/* IMAGE */}
                <Link
                  to={`/product/${product.id}`}
                  className="relative h-40 md:h-48 flex items-center justify-center bg-white rounded-xl mb-4 p-4 overflow-hidden"
                >

                  {/* SAFE IMAGE FIX */}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-[10px] text-black/40">
                      No Image
                    </div>
                  )}

                  {/* STATUS */}
                  {isOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-[10px] uppercase tracking-widest font-bold border border-white/40 px-3 py-1 rounded">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {isLimited && !isOut && (
                    <div className="absolute top-2 right-2 bg-orange-600 text-[8px] text-white px-2 py-0.5 rounded-full uppercase font-bold">
                      Limited
                    </div>
                  )}

                </Link>

                {/* INFO */}
                <div className="flex flex-col flex-1 gap-1 mb-4">

                  <div className="flex justify-between items-start">

                    <span className="text-[9px] text-[#D4AF37] uppercase tracking-widest font-bold">
                      {product.category}
                    </span>

                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        isOut
                          ? 'bg-red-500'
                          : isLimited
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }`}
                    />

                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-[11px] font-medium uppercase line-clamp-1 text-white/90 group-hover:text-white">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[#D4AF37] font-bold text-sm">
                    ${product.price}
                  </p>

                </div>

                {/* BUTTON */}
                <button
                  disabled={isOut}
                  onClick={() => handleAdd(product)}
                  className={`w-full py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition flex items-center justify-center gap-2 rounded-xl ${
                    isAdded
                      ? 'bg-green-700 text-white'
                      : isOut
                      ? 'bg-white/5 text-white/10 cursor-not-allowed'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <><Check size={12} /> Added</>
                  ) : isOut ? (
                    'Out'
                  ) : (
                    <><Plus size={12} /> Add</>
                  )}
                </button>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}