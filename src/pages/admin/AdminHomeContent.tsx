import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Star, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminHomeContent() {
  const { homeContent, products, editHomeContent } = useData();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Local state
  const [hero, setHero] = useState(homeContent.hero);
  const [featuredIds, setFeaturedIds] = useState<string[]>(homeContent.featuredProducts);
  const [stats, setStats] = useState(homeContent.stats);
  const [testimonials, setTestimonials] = useState(homeContent.testimonials);

  useEffect(() => {
    setHero(homeContent.hero);
    setFeaturedIds(homeContent.featuredProducts);
    setStats(homeContent.stats);
    setTestimonials(homeContent.testimonials);
  }, [homeContent]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      editHomeContent({ hero, featuredProducts: featuredIds, stats, testimonials });
      setSaving(false);
      setSaved(true);
      toast.success('Home content saved');
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const toggleFeatured = (id: string) => {
    setFeaturedIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 4) { toast.warning('Maximum 4 featured products'); return prev; }
      return [...prev, id];
    });
  };

  const updateTestimonial = (index: number, field: string, value: string | number) => {
    setTestimonials((prev) => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C1E]">Hero Section</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hero.enabled}
              onChange={(e) => setHero((prev) => ({ ...prev, enabled: e.target.checked }))}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <span className="font-body text-sm text-[#8E8E93]">Enabled</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Brand Name</label>
            <input value={hero.brandName} onChange={(e) => setHero((p) => ({ ...p, brandName: e.target.value }))} className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none" />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Tagline</label>
            <input value={hero.tagline} onChange={(e) => setHero((p) => ({ ...p, tagline: e.target.value }))} className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none" />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Primary CTA</label>
            <input value={hero.primaryCta} onChange={(e) => setHero((p) => ({ ...p, primaryCta: e.target.value }))} className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none" />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Secondary CTA</label>
            <input value={hero.secondaryCta} onChange={(e) => setHero((p) => ({ ...p, secondaryCta: e.target.value }))} className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none" />
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <h3 className="font-display text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C1E] mb-2">Featured Products</h3>
        <p className="font-body text-sm text-[#8E8E93] mb-4">Select up to 4 products to feature on the homepage:</p>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {products.map((product) => (
            <label key={product.id} className="flex items-center gap-3 p-2 hover:bg-[#FAFAFA] cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={featuredIds.includes(product.id)}
                onChange={() => toggleFeatured(product.id)}
                className="w-4 h-4 accent-[#D4AF37]"
              />
              <span className="font-body text-sm text-[#1C1C1E]">
  {product.name}
  {product.price !== undefined && (
    <span className="text-[#D4AF37] ml-2">
      ${product.price}
    </span>
  )}
</span>
              <span className="font-body text-xs text-[#8E8E93] uppercase ml-auto">{product.category}</span>
            </label>
          ))}
        </div>
        {featuredIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {featuredIds.map((id) => {
              const p = products.find((pr) => pr.id === id);
              return p ? (
                <span key={id} className="bg-[#F2F0EB] px-3 py-1 font-body text-xs text-[#1C1C1E] flex items-center gap-2">
                  {p.name}
                  <button onClick={() => toggleFeatured(id)} className="text-[#8E8E93] hover:text-[#FF3B30]"><X className="w-3 h-3" /></button>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <h3 className="font-display text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C1E] mb-4">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Years of Excellence', key: 'years' as const },
            { label: 'Premium Brands', key: 'brands' as const },
            { label: 'Countries Served', key: 'countries' as const },
          ].map((s) => (
            <div key={s.key}>
              <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">{s.label}</label>
              <input
                value={stats[s.key]}
                onChange={(e) => setStats((prev) => ({ ...prev, [s.key]: e.target.value }))}
                className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <h3 className="font-display text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C1E] mb-4">Testimonials</h3>
        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-[#E5E5EA] p-4 space-y-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => updateTestimonial(i, 'rating', star)}>
                    <Star className={`w-4 h-4 ${star <= t.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#E5E5EA]'}`} />
                  </button>
                ))}
              </div>
              <textarea
                value={t.quote}
                onChange={(e) => updateTestimonial(i, 'quote', e.target.value)}
                placeholder="Quote"
                rows={3}
                className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={t.author}
                  onChange={(e) => updateTestimonial(i, 'author', e.target.value)}
                  placeholder="Author Name"
                  className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
                />
                <input
                  value={t.title}
                  onChange={(e) => updateTestimonial(i, 'title', e.target.value)}
                  placeholder="Author Title"
                  className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#D4AF37] text-[#1C1C1E] font-display text-sm uppercase tracking-[0.1em] px-8 py-3 hover:bg-[#E8C547] transition-colors shadow-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
