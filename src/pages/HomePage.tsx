import { useData } from '@/contexts/DataContext';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

/* ───────────────── HOME ───────────────── */
export default function HomePage() {
  const { products } = useData();

  // 💎 TOP 10 MOST EXPENSIVE PRODUCTS (MEMOIZED)
  const featured = useMemo(() => {
    return [...products]
      .filter(p => p.price)
      .sort((a, b) => (b.price || 0) - (a.price || 0))
      .slice(0, 10);
  }, [products]);

  // 💸 DISCOUNTED PRODUCTS (MEMOIZED)
  const discounted = useMemo(() => {
    return products.filter(p => p.discount);
  }, [products]);

  return (
    <div className="bg-[#0F0F10] text-white overflow-x-hidden">

      <Hero />

      <TrustStrip />

      <FeaturedSection products={featured} />

      <DiscountSection products={discounted} />

      <CTA />

      <Footer />

    </div>
  );
}

/* ───────────────── HERO ───────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
      >
        <source src="/videos/home-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85" />

      <div className="relative z-10 px-4">

        <p className="text-[#D4AF37] tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-4">
          Premium Beverage Distribution
        </p>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase">
          STONEBRIDGE
        </h1>

        <div className="w-20 sm:w-24 h-[1px] bg-[#D4AF37] mx-auto my-5 sm:my-6" />

        <p className="text-gray-300 max-w-xs sm:max-w-xl mx-auto text-xs sm:text-sm">
          Luxury import and distribution of premium beverages across Lebanon.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">

          <Link
            to="/products"
            className="bg-[#D4AF37] text-black px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-[0.15em]"
          >
            Explore Products
          </Link>

          <Link
            to="/contact"
            className="border border-white/20 px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-[0.15em]"
          >
            Contact
          </Link>

        </div>

      </div>
    </section>
  );
}

/* ───────────────── TRUST ───────────────── */
function TrustStrip() {
  return (
    <div className="border-y border-white/10 py-6 text-center text-[10px] sm:text-xs text-gray-400 flex flex-wrap justify-center gap-4 sm:gap-10 uppercase tracking-[0.2em] bg-black">
      <span>Premium Brands</span>
      <span>Luxury Import</span>
      <span>Lebanon Coverage</span>
      <span>Fast Distribution</span>
    </div>
  );
}

/* ───────────────── FEATURED PRODUCTS ───────────────── */
function FeaturedSection({ products }: any) {
  return (
    <section className="py-16 sm:py-24 md:py-28 max-w-7xl mx-auto px-4 sm:px-6">

      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <h2 className="text-[10px] sm:text-sm tracking-[0.3em] uppercase text-white/60">
          Featured Selection
        </h2>
        <div className="w-14 sm:w-24 h-[1px] bg-[#D4AF37]/40" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">

        {products.map((p: any) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className="bg-[#111] border border-white/5 hover:border-[#D4AF37]/40 transition p-3 sm:p-6 group block"
          >

            <div className="h-28 sm:h-44 md:h-64 flex items-center justify-center relative">

              <div className="absolute w-24 sm:w-40 h-24 sm:h-40 bg-[#D4AF37]/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

              {p.image ? (
                <img
                  src={p.image}
                  loading="lazy"
                  width="300"
                  height="300"
                  className="h-full object-contain group-hover:scale-105 transition duration-500"
                />
              ) : (
                <span className="text-gray-500 text-xs">No Image</span>
              )}

            </div>

            <p className="text-[#D4AF37] text-[9px] sm:text-[11px] uppercase tracking-[0.2em] mt-3 sm:mt-5">
              {p.category}
            </p>

            <h3 className="text-xs sm:text-lg font-light mt-1 sm:mt-2">
              {p.name}
            </h3>

            <p className="text-[#D4AF37] text-xs sm:text-base mt-1 sm:mt-2">
              ${p.price}
            </p>

          </Link>
        ))}

      </div>
    </section>
  );
}

/* ───────────────── DISCOUNT ───────────────── */
function DiscountSection({ products }: any) {
  if (!products.length) return null;

  return (
    <section className="py-16 sm:py-24 bg-black text-center px-4">

      <h2 className="text-[10px] sm:text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-8 sm:mb-10">
        Exclusive Deals
      </h2>

      <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">

        {products.slice(0, 10).map((p: any) => (
          <div
            key={p.id}
            className="bg-[#111] border border-white/10 p-4 sm:p-6 w-44 sm:w-64"
          >

            <img
              src={p.image}
              loading="lazy"
              width="300"
              height="300"
              className="h-28 sm:h-40 mx-auto object-contain"
            />

            <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm">{p.name}</h3>

            <div className="flex justify-center gap-2 mt-2 text-xs sm:text-sm">
              <span className="line-through text-gray-500">${p.price}</span>
              <span className="text-[#D4AF37]">${p.discount}</span>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

/* ───────────────── CTA ───────────────── */
function CTA() {
  return (
    <section className="py-20 sm:py-28 text-center px-4">

      <h2 className="text-lg sm:text-3xl font-light tracking-[0.2em]">
        Ready to work with us?
      </h2>

      <p className="text-gray-500 mt-3 text-xs sm:text-sm">
        Premium distribution • Real partnerships
      </p>

      <Link
        to="/contact"
        className="inline-block mt-8 bg-[#D4AF37] text-black px-6 sm:px-10 py-3 uppercase text-xs sm:text-sm tracking-[0.15em]"
      >
        Contact Us
      </Link>

    </section>
  );
}

/* ───────────────── FOOTER ───────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-[10px] sm:text-xs text-gray-500 bg-black">

      <p className="tracking-[0.2em] uppercase">
        © 2026 STONEBRIDGE Distribution
      </p>

      <p className="mt-2 text-gray-600">
        All rights reserved.
      </p>

    </footer>
  );
}