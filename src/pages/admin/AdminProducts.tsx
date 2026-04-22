import { useState, useMemo } from 'react';
import { useData } from '@/contexts/DataContext';
import type { Product, ProductStatus } from '@/types';
import { Eye, Pencil, Trash2, Search, X } from 'lucide-react';
import { toast } from 'sonner';

const statusConfig: Record<ProductStatus, { color: string; text: string }> = {
  'in-stock': { color: '#34C759', text: 'In Stock' },
  'limited': { color: '#FF9F0A', text: 'Limited' },
  'out-of-stock': { color: '#FF3B30', text: 'Out of Stock' },
};

const EMPTY_PRODUCT: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  category: '',
  description: '',
  price: 0,
  status: 'in-stock',
  image: '',
};

export default function AdminProducts() {
  const { products, categories, createProduct, editProduct, removeProduct } = useData();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_PRODUCT });
  const [imagePreview, setImagePreview] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    let r = products;
    if (catFilter !== 'All') r = r.filter((p) => p.category === catFilter);
    if (statusFilter !== 'All') r = r.filter((p) => p.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((p) => p.name.toLowerCase().includes(q));
    }
    return r;
  }, [products, catFilter, statusFilter, search]);

  const openAdd = () => {
    setForm({ ...EMPTY_PRODUCT });
    setImagePreview('');
    setEditingId(null);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      status: product.status,
      image: product.image,
      price: product.price ?? 0,
    });
    setImagePreview(product.image);
    setEditingId(product.id);
    setErrors({});
    setModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setForm((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (!form.category) e.category = 'Category is required';
    if (form.price === undefined || form.price === null || isNaN(form.price) || form.price < 0) {
      e.price = 'Valid price is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const dataToSave = { ...form, price: Number(form.price) };
      if (editingId) {
        await editProduct(editingId, dataToSave);
        toast.success('Product updated');
      } else {
        await createProduct(dataToSave);
        toast.success('Product created');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error('Could not save product');
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await removeProduct(deleteId);
        toast.success('Product deleted');
        setDeleteId(null);
      } catch (err) {
        toast.error('Error deleting product');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-display text-[#1C1C1E] text-lg font-medium uppercase tracking-[0.06em]">Products</h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const csv = products.map((p) => `${p.name},${p.category},${p.status}`).join('\n');
              const blob = new Blob([`Name,Category,Status\n${csv}`], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = 'products.csv'; a.click();
            }}
            className="font-body text-[13px] border border-[#1C1C1E] text-[#1C1C1E] px-4 py-2 hover:bg-[#1C1C1E] hover:text-white transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={openAdd}
            className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-4 py-2 hover:bg-[#E8C547] transition-colors"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5E5EA] p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#E5E5EA] pl-10 pr-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
        >
          <option value="All">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="limited">Limited</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5EA] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-[#FAFAFA]">
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Image</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Product Name</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Category</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Price</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Status</th>
              <th className="text-right font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5EA]">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-5 py-4">
                  <div className="w-12 h-12 border border-[#E5E5EA] bg-white flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="font-body text-[10px] text-[#8E8E93]">N/A</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 font-display text-sm font-medium text-[#1C1C1E]">{product.name}</td>
                <td className="px-5 py-4 font-body text-[13px] text-[#8E8E93] uppercase">{product.category}</td>
                <td className="px-5 py-4 font-body text-[13px] text-[#1C1C1E]">${product.price ?? 0}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig[product.status].color }} />
                    <span className="font-body text-[13px]" style={{ color: statusConfig[product.status].color }}>
                      {statusConfig[product.status].text}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setViewProduct(product)} className="p-1.5 text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => openEdit(product)} className="p-1.5 text-[#8E8E93] hover:text-[#D4AF37] transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(product.id)} className="p-1.5 text-[#8E8E93] hover:text-[#FF3B30] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-sm text-[#8E8E93]">No products found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#E5E5EA]">
              <h3 className="font-display text-lg font-medium text-[#1C1C1E]">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E8E93] hover:text-[#1C1C1E]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">
                  Product Image
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="border-2 border-dashed border-[#E5E5EA] h-[200px] flex items-center justify-center bg-[#FAFAFA]">
                      <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain p-4" />
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-[#E5E5EA] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.03)] transition-colors">
                      <span className="font-body text-sm text-[#8E8E93]">Click to upload or drag and drop</span>
                      <span className="font-body text-xs text-[#8E8E93] mt-1">PNG, JPG up to 5MB</span>
                    </label>
                  )}
                  <input type="file" accept="image/png,image/jpeg" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                {imagePreview && (
                  <label className="font-body text-[13px] text-[#D4AF37] cursor-pointer mt-2 inline-block hover:underline">
                    Change Image
                    <input type="file" accept="image/png,image/jpeg" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Macallan 18 Year Old"
                  className={`w-full border ${errors.name ? 'border-[#FF3B30]' : 'border-[#E5E5EA]'} px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors`}
                />
                {errors.name && <p className="font-body text-xs text-[#FF3B30] mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className={`w-full border ${errors.category ? 'border-[#FF3B30]' : 'border-[#E5E5EA]'} px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors`}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                </select>
                {errors.category && <p className="font-body text-xs text-[#FF3B30] mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Price *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="Enter price (USD)"
                  className={`w-full border ${errors.price ? 'border-[#FF3B30]' : 'border-[#E5E5EA]'} px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors`}
                />
                {errors.price && <p className="font-body text-xs text-[#FF3B30] mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter product description..."
                  rows={4}
                  maxLength={500}
                  className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-3 block">Inventory Status *</label>
                <div className="flex gap-6">
                  {(['in-stock', 'limited', 'out-of-stock'] as ProductStatus[]).map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={form.status === s}
                        onChange={() => setForm((prev) => ({ ...prev, status: s }))}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusConfig[s].color }} />
                      <span className="font-body text-sm text-[#1C1C1E]">{statusConfig[s].text}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-[#E5E5EA]">
              <button onClick={() => setModalOpen(false)} className="font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] px-6 py-2.5 hover:border-[#1C1C1E] transition-colors">Cancel</button>
              <button onClick={handleSave} className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-6 py-2.5 hover:bg-[#E8C547] transition-colors">Save Product</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[480px]">
            <div className="p-5 border-b border-[#E5E5EA] flex items-center justify-between">
              <h3 className="font-display text-lg font-medium text-[#1C1C1E]">Product Details</h3>
              <button onClick={() => setViewProduct(null)} className="text-[#8E8E93] hover:text-[#1C1C1E]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {viewProduct.image && (
                <div className="w-full h-[200px] bg-white flex items-center justify-center mb-4 border border-[#E5E5EA]">
                  <img src={viewProduct.image} alt={viewProduct.name} className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <h4 className="font-display text-xl font-medium text-[#1C1C1E]">{viewProduct.name}</h4>
              <span className="font-body text-[13px] text-[#D4AF37] uppercase tracking-[0.1em]">{viewProduct.category}</span>
              <p className="font-body text-sm text-[#8E8E93] mt-3 leading-relaxed">{viewProduct.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusConfig[viewProduct.status].color }} />
                <span className="font-body text-sm" style={{ color: statusConfig[viewProduct.status].color }}>
                  {statusConfig[viewProduct.status].text}
                </span>
              </div>
            </div>
            <div className="p-5 border-t border-[#E5E5EA]">
              <button onClick={() => setViewProduct(null)} className="w-full font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] py-2.5 hover:border-[#1C1C1E] transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[400px] p-8 text-center">
            <Trash2 className="w-8 h-8 text-[#FF9F0A] mx-auto" />
            <h3 className="font-display text-lg font-medium text-[#1C1C1E] mt-4">Delete Product?</h3>
            <p className="font-body text-sm text-[#8E8E93] mt-2">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="flex-1 font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] py-2.5 hover:border-[#1C1C1E] transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 font-body text-[13px] bg-[#FF3B30] text-white py-2.5 hover:bg-[#E02E24] transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}