import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { updateProduct } from '@/lib/data';
import { Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCategories() {
  const { categories, products, createCategory, editCategory, removeCategory } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setName(''); setDescription(''); setEditingId(null); setModalOpen(true);
  };

  const openEdit = (cat: typeof categories[0]) => {
    setName(cat.name); setDescription(cat.description); setEditingId(cat.id); setModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) { toast.error('Category name is required'); return; }
    if (editingId) {
      const oldCat = categories.find((c) => c.id === editingId);
      editCategory(editingId, { name, description });
      // Update product categories
      if (oldCat && oldCat.name !== name) {
        products.filter((p) => p.category === oldCat.name).forEach((p) => {
          updateProduct(p.id, { category: name });
        });
      }
      toast.success('Category updated');
    } else {
      createCategory({ name, description });
      toast.success('Category created');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      removeCategory(deleteId);
      toast.success('Category deleted');
      setDeleteId(null);
    }
  };

  const getProductCount = (catName: string) => products.filter((p) => p.category === catName).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[#1C1C1E] text-lg font-medium uppercase tracking-[0.06em]">Categories</h2>
        <button
          onClick={openAdd}
          className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-4 py-2 hover:bg-[#E8C547] transition-colors"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-[#E5E5EA] p-6">
            <div className="w-12 h-12 bg-[#F2F0EB] flex items-center justify-center">
              <span className="font-display text-xl text-[#D4AF37] font-medium">{cat.name.charAt(0)}</span>
            </div>
            <h3 className="font-display text-lg font-medium text-[#1C1C1E] mt-4">{cat.name}</h3>
            <p className="font-body text-[13px] text-[#8E8E93] mt-1">{getProductCount(cat.name)} products</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => openEdit(cat)} className="p-1.5 text-[#8E8E93] hover:text-[#D4AF37] transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => setDeleteId(cat.id)} className="p-1.5 text-[#8E8E93] hover:text-[#FF3B30] transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[440px]">
            <div className="flex items-center justify-between p-5 border-b border-[#E5E5EA]">
              <h3 className="font-display text-lg font-medium text-[#1C1C1E]">
                {editingId ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E8E93] hover:text-[#1C1C1E]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-[#E5E5EA]">
              <button onClick={() => setModalOpen(false)} className="font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] px-6 py-2.5">
                Cancel
              </button>
              <button onClick={handleSave} className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-6 py-2.5 hover:bg-[#E8C547]">
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[400px] p-8 text-center">
            <Trash2 className="w-8 h-8 text-[#FF9F0A] mx-auto" />
            <h3 className="font-display text-lg font-medium text-[#1C1C1E] mt-4">Delete Category?</h3>
            {(() => {
              const cat = categories.find((c) => c.id === deleteId);
              const count = cat ? getProductCount(cat.name) : 0;
              return (
                <p className="font-body text-sm text-[#8E8E93] mt-2">
                  {count > 0
                    ? `This category contains ${count} products. Deleting it will set those products to "Uncategorized".`
                    : 'Are you sure? This action cannot be undone.'}
                </p>
              );
            })()}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="flex-1 font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] py-2.5">Cancel</button>
              <button onClick={handleDelete} className="flex-1 font-body text-[13px] bg-[#FF3B30] text-white py-2.5 hover:bg-[#E02E24]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
