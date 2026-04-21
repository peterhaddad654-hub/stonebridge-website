import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu and reset scroll on navigation
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-[#1C1C1E] shadow-2xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1344px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            to="/"
            className="z-[110] font-display text-white text-base font-medium uppercase tracking-[0.15em]"
          >
            STONEBRIDGE
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group font-body text-[13px] text-white/70 hover:text-white transition-colors duration-300 uppercase tracking-[0.06em]"
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-[#D4AF37] transition-all duration-400 ${
                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/admin/login"
                className="font-body text-[12px] text-white/70 hover:text-white border border-white/30 hover:border-white/60 px-4 py-2 uppercase tracking-[0.08em]"
              >
                Login
              </Link>

              <a
                href="https://wa.me/96179467530"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-[#D4AF37] flex items-center justify-center hover:bg-[#b8962d] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* 🛒 CART ICON */}
            <Link
              to="/cart"
              className="relative w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden text-white z-[110] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div 
          className={`lg:hidden fixed inset-0 bg-[#1C1C1E] z-[105] transition-transform duration-500 ease-in-out ${
            mobileOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-2xl font-display uppercase tracking-widest transition-colors ${
                  isActive(item.path) ? 'text-[#D4AF37]' : 'text-white/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="mt-auto mb-12 flex flex-col gap-6">
              <div className="h-[1px] bg-white/10 w-full" />
              <Link to="/admin/login" className="text-white/60 uppercase text-sm tracking-widest">
                Admin Access
              </Link>
              <a 
                href="https://wa.me/96179467530" 
                className="text-[#D4AF37] uppercase text-sm tracking-widest"
              >
                Contact WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
}