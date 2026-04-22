import { createContext, useContext, useEffect, useState } from 'react';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getMessages,
  addMessage,
  getHomeContent,
  updateHomeContent,
  getSettings,
  updateSettings,
} from '@/lib/firebaseapi';

const DataContext = createContext<any>({});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [homeContent, setHomeContent] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // SAFE LOAD (NO CRASH)
  // -------------------------
  const loadData = async () => {
    try {
      setLoading(true);

      const [p, c, m, hc, s] = await Promise.all([
        getProducts().catch(() => []),
        getCategories().catch(() => []),
        getMessages().catch(() => []),
        getHomeContent().catch(() => null),
        getSettings().catch(() => null),
      ]);

      setProducts(p ?? []);
      setCategories(c ?? []);
      setMessages(m ?? []);
      setHomeContent(hc ?? {
        hero: {},
        featuredProducts: [],
        stats: {},
        testimonials: [],
      });

      setSettings(s ?? {});
    } catch (err) {
      console.error('Data load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------------------------
  // PRODUCTS
  // -------------------------
  const createProduct = async (data: any) => {
    const res = await addProduct(data);
    await loadData();
    return res;
  };

  const editProduct = async (id: string, data: any) => {
    const res = await updateProduct(id, data);
    await loadData();
    return res;
  };

  const removeProduct = async (id: string) => {
    const res = await deleteProduct(id);
    await loadData();
    return res;
  };

  // -------------------------
  // CATEGORIES
  // -------------------------
  const createCategory = async (data: any) => {
    const res = await addCategory(data);
    await loadData();
    return res;
  };

  const editCategory = async (id: string, data: any) => {
    const res = await updateCategory(id, data);
    await loadData();
    return res;
  };

  const removeCategory = async (id: string) => {
    const res = await deleteCategory(id);
    await loadData();
    return res;
  };

  // -------------------------
  // MESSAGES
  // -------------------------
  const createMessage = async (data: any) => {
    const res = await addMessage(data);
    await loadData();
    return res;
  };

  // -------------------------
  // HOME CONTENT
  // -------------------------
  const editHomeContent = async (data: any) => {
    const res = await updateHomeContent(data);
    await loadData();
    return res;
  };

  // -------------------------
  // SETTINGS
  // -------------------------
  const editSettings = async (data: any) => {
    const res = await updateSettings(data);
    await loadData();
    return res;
  };

  // -------------------------
  // SAFE STATS (NO CRASH)
  // -------------------------
  const stats = {
    totalProducts: products?.length ?? 0,
    totalCategories: categories?.length ?? 0,
    newMessages: messages?.filter((m: any) => m.status === 'new')?.length ?? 0,
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        messages,
        homeContent,
        settings,
        loading,

        createProduct,
        editProduct,
        removeProduct,

        createCategory,
        editCategory,
        removeCategory,

        createMessage,

        editHomeContent,
        editSettings,

        stats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);