import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Star, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';

export default function AdminHomeContent() {
  const data = useData();

  const homeContent = data?.homeContent;
  const products: Product[] = data?.products ?? [];
  const editHomeContent = data?.editHomeContent;

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Safe defaults (IMPORTANT FIX)
  const [hero, setHero] = useState(
    homeContent?.hero ?? {
      enabled: false,
      brandName: '',
      tagline: '',
      primaryCta: '',
      secondaryCta: '',
    }
  );

  const [featuredIds, setFeaturedIds] = useState<string[]>(
    homeContent?.featuredProducts ?? []
  );

  const [stats, setStats] = useState(
    homeContent?.stats ?? {
      years: '',
      brands: '',
      countries: '',
    }
  );

  const [testimonials, setTestimonials] = useState<any[]>(
    homeContent?.testimonials ?? []
  );

  useEffect(() => {
    if (!homeContent) return;

    setHero(
      homeContent?.hero ?? {
        enabled: false,
        brandName: '',
        tagline: '',
        primaryCta: '',
        secondaryCta: '',
      }
    );
    setFeaturedIds(homeContent.featuredProducts ?? []);
    setStats(
      homeContent?.stats ?? {
        years: '',
        brands: '',
        countries: '',
      }
    );
    setTestimonials(homeContent.testimonials ?? []);
  }, [homeContent]);

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      editHomeContent?.({
        hero,
        featuredProducts: featuredIds,
        stats,
        testimonials,
      });

      setSaving(false);
      setSaved(true);
      toast.success('Home content saved');

      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const toggleFeatured = (id: string) => {
    setFeaturedIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 4) {
        toast.warning('Maximum 4 featured products');
        return prev;
      }
      return [...prev, id];
    });
  };

  const updateTestimonial = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setTestimonials((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, [field]: value } : t
      )
    );
  };

  return (
    <div className="space-y-6 pb-20">

      {/* HERO */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <h3 className="mb-4 font-medium">Hero Section</h3>

        <input
          value={hero.brandName}
          onChange={(e) =>
            setHero((p) => ({ ...p, brandName: e.target.value }))
          }
        />
      </div>

      {/* FEATURED */}
      <div className="bg-white border p-6">
        <h3 className="mb-3">Featured Products</h3>

        {(products ?? []).map((product: Product) => (
          <label key={product.id} className="flex gap-2">
            <input
              type="checkbox"
              checked={featuredIds.includes(product.id)}
              onChange={() => toggleFeatured(product.id)}
            />

            <span>
              {product.name}
              {product.price !== undefined && (
                <span className="ml-2 text-[#D4AF37]">
                  ${product.price}
                </span>
              )}
            </span>

            <span className="ml-auto text-xs uppercase">
              {product.category}
            </span>
          </label>
        ))}

        {featuredIds.length > 0 && (
          <div className="flex gap-2 mt-4">
            {featuredIds.map((id) => {
              const p = (products ?? []).find(
                (pr: Product) => pr.id === id
              );

              return p ? (
                <span key={id} className="bg-gray-200 px-2 py-1">
                  {p.name}
                  <button onClick={() => toggleFeatured(id)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* SAVE */}
      <button onClick={handleSave}>
        {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save'}
      </button>

    </div>
  );
}