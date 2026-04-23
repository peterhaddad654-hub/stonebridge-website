import { useState, useMemo, useRef, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Check, Search, ChevronDown, X } from 'lucide-react';

export default function ProductsPage() {
  const { products, categories, loading } = useData();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All Products');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'low', label: 'Price: Low-High' },
    { id: 'high', label: 'Price: High-Low' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    let result = [...(products || [])];
    if (activeCategory !== 'All Products') {
      result = result.filter((p: any) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p: any) => p.name?.toLowerCase().includes(q));
    }
    if (sortBy === 'low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, activeCategory, search, sortBy]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return products.filter((p: any) => p.name?.toLowerCase().includes(q)).slice(0, 5);
  }, [products, search]);

  const handleAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <div className="bg-[#0F0F10] text-white min-h-screen pb-20 selection:bg-[#D4AF37]/30">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER */}
      <div className="max-w-[1344px] mx-auto px-4 pt-24 md:pt-32">
        <div className="flex flex-col gap-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-display uppercase tracking-widest border-l-2 border-[#D4AF37] pl-4">
            Our Products
          </h1>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* SEARCH */}
            <div className="relative w-full md:w-80">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4AF37] transition-colors" size={14} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/[0.03] border border-white/10 pl-10 pr-10 py-3 text-xs outline-none focus:border-[#D4AF37] transition-all rounded-full"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
              
              {/* SUGGESTIONS */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#161617] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[110] backdrop-blur-xl">
                  {suggestions.map((p: any) => (
                    <button
                      key={p.id}
                      onClick={() => { navigate(`/product/${p.id}`); setSearch(''); }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left"
                    >
                      <img src={p.image} alt="" className="w-8 h-8 object-contain shrink-0" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] font-medium text-white/90 truncate">{p.name}</span>
                        <span className="text-[9px] text-[#D4AF37] font-bold">${p.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SORT DROPDOWN */}
            <div className="relative w-full md:w-auto" ref={sortRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between w-full md:w-48 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all"
              >
                <span>Sort: <span className="text-[#D4AF37] ml-1">{sortOptions.find(o => o.id === sortBy)?.label}</span></span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-full md:w-48 bg-[#161617] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[100]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                      className={`w-full text-left px-5 py-3.5 text-[10px] uppercase tracking-widest transition-colors border-b border-white/5 last:border-0 ${
                        sortBy === opt.id ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/60 hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CATEGORY BUBBLES */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full py-2">
            {['All Products', ...categories].map((cat: any, index: number) => {
              const name = typeof cat === 'string' ? cat : cat?.name;
              const isActive = activeCategory === name;
              return (
                <button
                  key={index}
                  onClick={() => setActiveCategory(name)}
                  className={`px-5 py-2 rounded-full text-[9px] uppercase tracking-widest whitespace-nowrap transition-all border ${
                    isActive 
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1344px] mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse bg-white/5 rounded-2xl h-[300px]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
            {filtered.slice(0, visibleCount).map((product: any) => {
              const isAdded = added === product.id;
              return (
                <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                  {/* IMAGE */}
                  <div className="relative aspect-[4/5] bg-[#121212] border border-white/5 rounded-[2rem] overflow-hidden mb-4 transition-all duration-500 group-hover:border-[#D4AF37]/30">
                    <div className="w-full h-full flex items-center justify-center p-6 transition-transform duration-700 group-hover:scale-125">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 px-1">
                    <span className="text-[9px] text-[#D4AF37] uppercase tracking-widest font-bold mb-1">{product.category}</span>
                    
                    <div className="min-h-[2.5rem] mb-1">
                      <h3 className="text-[11px] font-medium uppercase tracking-wider text-white/90 leading-tight">{product.name}</h3>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-sm font-bold text-[#D4AF37]">${product.price}</span>
                      {product.oldPrice && <span className="text-[10px] text-white/20 line-through">${product.oldPrice}</span>}
                    </div>

                    {/* BUTTON - REVERTED TO "ADD" */}
                    <button
                      disabled={product.status === 'out-of-stock'}
                      onClick={(e) => handleAdd(e, product)}
                      className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all uppercase text-[9px] font-bold tracking-widest border ${
                        isAdded ? 'bg-green-700 border-green-700 text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 active:scale-95'
                      }`}
                    >
                      {isAdded ? <Check size={12} /> : <Plus size={12} />}
                      {isAdded ? 'Added' : 'Add'}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}