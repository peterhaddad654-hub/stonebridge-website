import type {
  Product,
  Category,
  Message,
  HomeContent,
  SiteSettings,
} from '@/types';

import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';

// ─────────────────────────────
// PRODUCTS
// ─────────────────────────────

export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, 'products'), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Product),
    }));
  } catch {
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const snap = await getDoc(doc(db, 'products', id));

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...(snap.data() as Product),
    };
  } catch {
    return null;
  }
};

export const addProduct = async (data: Omit<Product, 'id'>) => {
  try {
    const ref = await addDoc(collection(db, 'products'), {
      ...data,
      created_at: new Date().toISOString(),
    });

    return { id: ref.id, ...data };
  } catch {
    return null;
  }
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    await updateDoc(doc(db, 'products', id), data);
    return { id, ...data };
  } catch {
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id));
    return true;
  } catch {
    return false;
  }
};

// ─────────────────────────────
// CATEGORIES
// ─────────────────────────────

export const getCategories = async (): Promise<Category[]> => {
  try {
    const snap = await getDocs(collection(db, 'categories'));

    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Category),
    }));
  } catch {
    return [];
  }
};

export const addCategory = async (data: Omit<Category, 'id'>) => {
  try {
    const ref = await addDoc(collection(db, 'categories'), data);
    return { id: ref.id, ...data };
  } catch {
    return null;
  }
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
  try {
    await updateDoc(doc(db, 'categories', id), data);
    return { id, ...data };
  } catch {
    return null;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'categories', id));
    return true;
  } catch {
    return false;
  }
};

// ─────────────────────────────
// MESSAGES
// ─────────────────────────────

export const getMessages = async (): Promise<Message[]> => {
  try {
    const snap = await getDocs(collection(db, 'messages'));

    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Message),
    }));
  } catch {
    return [];
  }
};

export const addMessage = async (data: Omit<Message, 'id'>) => {
  try {
    const ref = await addDoc(collection(db, 'messages'), {
      ...data,
      date: new Date().toISOString(),
      status: 'new',
    });

    return { id: ref.id, ...data };
  } catch {
    return null;
  }
};

// ─────────────────────────────
// HOME CONTENT
// ─────────────────────────────

export const getHomeContent = async (): Promise<HomeContent | null> => {
  try {
    const snap = await getDocs(collection(db, 'home_content'));

    if (snap.empty) return null;

    const docSnap = snap.docs[0];

    return {
      id: docSnap.id,
      ...(docSnap.data() as HomeContent),
    };
  } catch {
    return null;
  }
};

export const updateHomeContent = async (
  data: Partial<HomeContent>
): Promise<HomeContent | null> => {
  try {
    const snap = await getDocs(collection(db, 'home_content'));

    if (snap.empty) {
      const ref = await addDoc(collection(db, 'home_content'), data);
      return { id: ref.id, ...data } as HomeContent;
    }

    const docRef = doc(db, 'home_content', snap.docs[0].id);

    await updateDoc(docRef, data);

    return {
      id: snap.docs[0].id,
      ...data,
    } as HomeContent;
  } catch {
    return null;
  }
};

// ─────────────────────────────
// SETTINGS
// ─────────────────────────────

export const getSettings = async (): Promise<SiteSettings | null> => {
  try {
    const snap = await getDocs(collection(db, 'settings'));

    if (snap.empty) return null;

    const docSnap = snap.docs[0];

    return {
      id: docSnap.id,
      ...(docSnap.data() as SiteSettings),
    };
  } catch {
    return null;
  }
};

export const updateSettings = async (
  data: Partial<SiteSettings>
): Promise<SiteSettings | null> => {
  try {
    const snap = await getDocs(collection(db, 'settings'));

    if (snap.empty) {
      const ref = await addDoc(collection(db, 'settings'), data);
      return { id: ref.id, ...data } as SiteSettings;
    }

    const docRef = doc(db, 'settings', snap.docs[0].id);

    await updateDoc(docRef, data);

    return {
      id: snap.docs[0].id,
      ...data,
    } as SiteSettings;
  } catch {
    return null;
  }
};

// ─────────────────────────────
// STATS
// ─────────────────────────────

export const getStats = async () => {
  try {
    const [p, c, m] = await Promise.all([
      getDocs(collection(db, 'products')),
      getDocs(collection(db, 'categories')),
      getDocs(collection(db, 'messages')),
    ]);

    const products = p.docs.map((d) => d.data() as any);
    const messages = m.docs.map((d) => d.data() as any);

    return {
      totalProducts: products.length,
      totalCategories: c.size,
      newMessages: messages.filter((x) => x.status === 'new').length,
      inStockProducts: products.filter((x) => x.status === 'in-stock').length,
      limitedProducts: products.filter((x) => x.status === 'limited').length,
      outOfStockProducts: products.filter((x) => x.status === 'out-of-stock').length,
    };
  } catch {
    return {
      totalProducts: 0,
      totalCategories: 0,
      newMessages: 0,
      inStockProducts: 0,
      limitedProducts: 0,
      outOfStockProducts: 0,
    };
  }
};