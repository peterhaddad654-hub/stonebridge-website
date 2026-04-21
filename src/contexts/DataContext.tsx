import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, Category, Message, HomeContent, SiteSettings } from '@/types';
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
  markMessageAsRead,
  markAllMessagesAsRead,
  deleteMessage,
  getHomeContent,
  updateHomeContent,
  getSettings,
  updateSettings,
  getStats,
} from '@/lib/data';

interface DataContextType {
  products: Product[];
  categories: Category[];
  messages: Message[];
  homeContent: HomeContent;
  settings: SiteSettings;
  stats: ReturnType<typeof getStats>;
  refresh: () => void;

  // Product actions
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;

  // Category actions
  createCategory: (category: Omit<Category, 'id'>) => void;
  editCategory: (id: string, updates: Partial<Category>) => void;
  removeCategory: (id: string) => void;

  // Message actions
  createMessage: (message: Omit<Message, 'id' | 'date' | 'status'>) => void;
  readMessage: (id: string) => void;
  readAllMessages: () => void;
  removeMessage: (id: string) => void;

  // Home content
  editHomeContent: (updates: Partial<HomeContent>) => void;

  // Settings
  editSettings: (updates: Partial<SiteSettings>) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(() => ({
    products: getProducts(),
    categories: getCategories(),
    messages: getMessages(),
    homeContent: getHomeContent(),
    settings: getSettings(),
    stats: getStats(),
  }));

  const refresh = useCallback(() => {
    setData({
      products: getProducts(),
      categories: getCategories(),
      messages: getMessages(),
      homeContent: getHomeContent(),
      settings: getSettings(),
      stats: getStats(),
    });
  }, []);

  // 🔥 FIXED PRODUCT HANDLING (price-safe)
  const createProduct = useCallback(
    (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const safeProduct: typeof product = {
        ...product,
        price: Number(product.price ?? 0),
      };

      addProduct(safeProduct);
      refresh();
    },
    [refresh]
  );

  const editProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      updateProduct(id, {
        ...updates,
        price: updates.price !== undefined ? Number(updates.price) : undefined,
      });

      refresh();
    },
    [refresh]
  );

  const removeProduct = useCallback(
    (id: string) => {
      deleteProduct(id);
      refresh();
    },
    [refresh]
  );

  const createCategory = useCallback(
    (category: Omit<Category, 'id'>) => {
      addCategory(category);
      refresh();
    },
    [refresh]
  );

  const editCategory = useCallback(
    (id: string, updates: Partial<Category>) => {
      updateCategory(id, updates);
      refresh();
    },
    [refresh]
  );

  const removeCategory = useCallback(
    (id: string) => {
      deleteCategory(id);
      refresh();
    },
    [refresh]
  );

  const createMessage = useCallback(
    (message: Omit<Message, 'id' | 'date' | 'status'>) => {
      addMessage(message);
      refresh();
    },
    [refresh]
  );

  const readMessage = useCallback(
    (id: string) => {
      markMessageAsRead(id);
      refresh();
    },
    [refresh]
  );

  const readAllMessages = useCallback(() => {
    markAllMessagesAsRead();
    refresh();
  }, [refresh]);

  const removeMessage = useCallback(
    (id: string) => {
      deleteMessage(id);
      refresh();
    },
    [refresh]
  );

  const editHomeContent = useCallback(
    (updates: Partial<HomeContent>) => {
      updateHomeContent(updates);
      refresh();
    },
    [refresh]
  );

  const editSettings = useCallback(
    (updates: Partial<SiteSettings>) => {
      updateSettings(updates);
      refresh();
    },
    [refresh]
  );

  return (
    <DataContext.Provider
      value={{
        ...data,
        refresh,
        createProduct,
        editProduct,
        removeProduct,
        createCategory,
        editCategory,
        removeCategory,
        createMessage,
        readMessage,
        readAllMessages,
        removeMessage,
        editHomeContent,
        editSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};