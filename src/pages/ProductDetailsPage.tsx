import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useData } from '@/contexts/DataContext';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, loading } = useData();
  const { addToCart } = useCart();

  // Memoize the product lookup
  const product = useMemo(() => {
    return products.find((p: any) => String(p.id) === id);
  }, [id, products]);

  // 1. Recently Viewed Logic
  useEffect(() => {
    if (!product) return;
    const storageKey = 'recently_viewed';
    const rawData = localStorage.getItem(storageKey);
    let viewedIds: string[] = rawData ? JSON.parse(rawData) : [];
    viewedIds = [String(product.id), ...viewedIds.filter((itemId) => itemId !== String(product.id))];
    localStorage.setItem(storageKey, JSON.stringify(viewedIds.slice(0, 5)));
  }, [product]);

  const recentlyViewedProducts = useMemo(() => {
    const rawData = localStorage.getItem('recently_viewed');
    if (!rawData || products.length === 0) return [];
    const viewedIds: string[] = JSON.parse(rawData);
    return viewedIds
      .filter((viewedId) => viewedId !== id)
      .map((viewedId) => products.find((p: any) => String(p.id) === viewedId))
      .filter(Boolean)
      .slice(0, 4);
  }, [id, products]);

  // 2. Smart Recommendations Logic
  const recommendedProducts = useMemo(() => {
    if (!product || products.length === 0) return [];
    const priceMin = product.price * 0.8;
    const priceMax = product.price * 1.2;
    return products
      .filter((p: any) => {
        if (String(p.id) === id) return false;
        const isSameCategory = p.category === product.category;
        const isSimilarPrice = p.price >= priceMin && p.price <= priceMax;
        return isSameCategory || isSimilarPrice;
      })
      .sort((a: any, b: any) => {
        const scoreA = (a.category === product.category ? 2 : 0) + (a.price >= priceMin && a.price <= priceMax ? 1 : 0);
        const scoreB = (b.category === product.category ? 2 : 0) + (b.price >= priceMin && b.price <= priceMax ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 4);
  }, [product, products, id]);

  /**
   * RENDER LOGIC FIX:
   * 1. If loading AND products are empty: We are truly fetching. Show Loader.
   * 2. If NOT loading AND product is missing: Definitely not found. Show 404.
   * 3. If product exists: Render page (even if 'loading' is still true in the background).
   */
  
  if (loading && products.length === 0) {
    return (
      <div className="bg-[#0F0F10] text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="bg-[#0F0F10] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-6">Product not found</p>
          <Link to="/products" className="text-[#D4AF37] border border-[#D4AF37]/30 px-6 py-2 text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // If products are loaded but this specific ID doesn't exist YET while loading is true, 
  // we stay in a loading state to prevent the "Not Found" flicker.
  if (!product) {
    return <div className="bg-[#0F0F10] min-h-screen" />;
  }

  const ProductCard = ({ item, type = 'recommended' }: { item: any, type?: 'recommended' | 'recent' }) => {
    const isRecent = type === 'recent';
    return (
      <Link 
        to={`/product/${item.id}`}
        className={`group block flex-shrink-0 transition-all duration-300 ${isRecent ? 'w-[120px] md:w-full' : 'w-[150px] md:w-full'}`}
      >
        <div className="relative w-full aspect-[4/5] bg-[#111] border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-white/20">
          <div className={`absolute inset-0 flex items-center justify-center ${isRecent ? 'p-3' : 'p-6'}`}>
            {item.image ? (
              <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="text-gray-600 text-[8px] uppercase tracking-widest text-center">No Image</div>
            )}
          </div>
        </div>
        <div className="mt-3 px-1">
          <p className="text-[8px] text-[#D4AF37] uppercase tracking-[0.15em] mb-1 truncate">{item.category}</p>
          <h3 className={`${isRecent ? 'text-[10px]' : 'text-[11px] md:text-sm'} font-light text-gray-200 line-clamp-1 group-hover:text-white transition-colors`}>{item.name}</h3>
          <p className={`${isRecent ? 'text-[11px]' : 'text-xs md:text-sm'} mt-1 text-white font-medium`}>${item.price}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-[#0F0F10] text-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <Link to="/products" className="text-xs tracking-[0.15em] uppercase text-gray-400 hover:text-white transition-colors">
          ← Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mt-10 items-start">
          <div className="relative w-full aspect-square md:aspect-[4/5] bg-[#111] border border-white/10 overflow-hidden flex items-center justify-center p-8">
            {product.image && product.image.trim() !== '' ? (
              <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain" />
            ) : (
              <div className="text-gray-500 text-sm">No Image Available</div>
            )}
          </div>

          <div>
            <p className="text-xs text-[#D4AF37] uppercase tracking-[0.2em]">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-light mt-2 tracking-wide">{product.name}</h1>
            <div className="mt-5 flex items-center gap-3">
              {product.oldPrice && <span className="text-gray-500 line-through">${product.oldPrice}</span>}
              <span className="text-[#D4AF37] text-2xl">${product.price}</span>
            </div>
            <p className="text-gray-400 mt-6 leading-relaxed text-sm">{product.description || 'Premium product from our collection.'}</p>

            <div className="mt-8 flex flex-col gap-3">
              <button onClick={() => addToCart(product)} className="bg-[#D4AF37] text-black py-4 uppercase text-sm tracking-[0.15em] font-medium hover:bg-[#e5c14f] transition-all active:scale-95">
                Add to Cart
              </button>
              <a href={`https://wa.me/96179467530?text=Hello, I'm interested in ${product.name}`} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white py-4 uppercase text-sm tracking-[0.15em] text-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-base font-light tracking-[0.2em] uppercase mb-8 border-b border-white/10 pb-4">Recommended for you</h2>
            <div className="flex overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide snap-x snap-mandatory">
              {recommendedProducts.map((item: any) => (
                <div key={item.id} className="snap-center"><ProductCard item={item} type="recommended" /></div>
              ))}
            </div>
          </div>
        )}

        {recentlyViewedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-[9px] font-light tracking-[0.2em] uppercase mb-6 text-gray-500">Recently Viewed</h2>
            <div className="flex overflow-x-auto pb-4 gap-3 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide">
              {recentlyViewedProducts.map((item: any) => (
                <div key={item.id}><ProductCard item={item} type="recent" /></div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}