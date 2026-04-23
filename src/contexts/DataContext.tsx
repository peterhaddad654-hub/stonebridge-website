import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  startAfter, 
  limit,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import {
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
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  
  const lastDocRef = useRef<QueryDocumentSnapshot | null>(null);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);

  const fetchAllProducts = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;

    try {
      isFetchingRef.current = true;
      
      let q = query(
        collection(db, 'products'), 
        orderBy('name', 'asc'), 
        limit(50) 
      );

      if (lastDocRef.current) {
        q = query(q, startAfter(lastDocRef.current));
      }

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        hasMoreRef.current = false;
        setIsInitialLoadComplete(true);
      } else {
        const newBatch = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];

        setProducts(prev => {
          const combined = [...prev, ...newBatch];
          return Array.from(new Map(combined.map(item => [item.id, item])).values());
        });

        if (snapshot.docs.length === 50) {
          setTimeout(() => {
            isFetchingRef.current = false;
            fetchAllProducts();
          }, 1000);
        } else {
          hasMoreRef.current = false;
          setIsInitialLoadComplete(true);
        }
      }
    } catch (err) {
      console.error("Background Load Error:", err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();

    const loadMeta = async () => {
      try {
        const [c, m, hc, s] = await Promise.all([
          getCategories().catch(() => []),
          getMessages().catch(() => []),
          getHomeContent().catch(() => null),
          getSettings().catch(() => null),
        ]);
        setCategories(c);
        setMessages(m);
        setHomeContent(hc ?? { hero: {}, featuredProducts: [], stats: {} });
        setSettings(s ?? {});
      } catch (err) {
        console.error("Meta Error:", err);
      }
    };
    loadMeta();
  }, [fetchAllProducts]);

  const refresh = () => { 
    lastDocRef.current = null; 
    hasMoreRef.current = true; 
    setIsInitialLoadComplete(false);
    fetchAllProducts(); 
  };

  const createProduct = async (d: any) => { const res = await addProduct(d); refresh(); return res; };
  const editProduct = async (id: string, d: any) => { const res = await updateProduct(id, d); refresh(); return res; };
  const removeProduct = async (id: string) => { const res = await deleteProduct(id); refresh(); return res; };
  const createCategory = async (d: any) => { await addCategory(d); setCategories(await getCategories()); };
  const editCategory = async (id: string, d: any) => { await updateCategory(id, d); setCategories(await getCategories()); };
  const removeCategory = async (id: string) => { await deleteCategory(id); setCategories(await getCategories()); };
  const editHomeContent = async (d: any) => { await updateHomeContent(d); setHomeContent(await getHomeContent()); };
  const editSettings = async (d: any) => { await updateSettings(d); setSettings(await getSettings()); };

  return (
    <DataContext.Provider value={{
      products, categories, messages, homeContent, settings, loading, isInitialLoadComplete,
      createProduct, editProduct, removeProduct, createCategory, editCategory, removeCategory,
      editHomeContent, editSettings, refresh
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);