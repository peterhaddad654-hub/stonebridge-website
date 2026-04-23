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
  getCountFromServer,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';


// ─────────────────────────────
// PRODUCTS
// ─────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    // Never fetch full products collection. Always paginate.
    try {
      const q1 = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(24));
      const snap1 = await getDocs(q1);
      return snap1.docs.map(d => ({ id: d.id, ...d.data() })) as Product[];
    } catch {
      const q2 = query(collection(db, 'products'), orderBy('created_at', 'desc'), limit(24));
      const snap2 = await getDocs(q2);
      return snap2.docs.map(d => ({ id: d.id, ...d.data() })) as Product[];
    }
  } catch (error) {
    console.error('getProducts error:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as Product) : null;
  } catch (error) {
    console.error('getProductById error:', error);
    return null;
  }
}

export async function addProduct(product: Omit<Product, 'id'>) {
  try {
    const ref = await addDoc(collection(db, 'products'), product);
    return { id: ref.id, ...product };
  } catch (error) {
    console.error('addProduct error:', error);
    return null;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  try {
    await updateDoc(doc(db, 'products', id), updates);
    return { id, ...updates };
  } catch (error) {
    console.error('updateProduct error:', error);
    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, 'products', id));
    return true;
  } catch (error) {
    console.error('deleteProduct error:', error);
    return false;
  }
}


// ─────────────────────────────
// CATEGORIES
// ─────────────────────────────

export async function getCategories(): Promise<Category[]> {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Category[];
  } catch (error) {
    console.error('getCategories error:', error);
    return [];
  }
}

export async function addCategory(category: Omit<Category, 'id'>) {
  try {
    const ref = await addDoc(collection(db, 'categories'), category);
    return { id: ref.id, ...category };
  } catch (error) {
    console.error('addCategory error:', error);
    return null;
  }
}

export async function updateCategory(id: string, updates: Partial<Category>) {
  try {
    await updateDoc(doc(db, 'categories', id), updates);
    return { id, ...updates };
  } catch (error) {
    console.error('updateCategory error:', error);
    return null;
  }
}

export async function deleteCategory(id: string) {
  try {
    await deleteDoc(doc(db, 'categories', id));
    return true;
  } catch (error) {
    console.error('deleteCategory error:', error);
    return false;
  }
}


// ─────────────────────────────
// MESSAGES
// ─────────────────────────────

export async function getMessages(): Promise<Message[]> {
  try {
    const snap = await getDocs(collection(db, 'messages'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Message[];
  } catch (error) {
    console.error('getMessages error:', error);
    return [];
  }
}

export async function addMessage(message: Omit<Message, 'id'>) {
  try {
    const ref = await addDoc(collection(db, 'messages'), message);
    return { id: ref.id, ...message };
  } catch (error) {
    console.error('addMessage error:', error);
    return null;
  }
}


// ─────────────────────────────
// HOME CONTENT
// ─────────────────────────────

export async function getHomeContent(): Promise<HomeContent | null> {
  try {
    const snap = await getDocs(collection(db, 'home_content'));
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as HomeContent;
  } catch (error) {
    console.error('getHomeContent error:', error);
    return null;
  }
}

export async function updateHomeContent(updates: Partial<HomeContent>) {
  try {
    const snap = await getDocs(collection(db, 'home_content'));
    if (snap.empty) {
      const ref = await addDoc(collection(db, 'home_content'), updates);
      return { id: ref.id, ...updates };
    }
    await updateDoc(doc(db, 'home_content', snap.docs[0].id), updates);
    return { id: snap.docs[0].id, ...updates };
  } catch (error) {
    console.error('updateHomeContent error:', error);
    return null;
  }
}


// ─────────────────────────────
// SETTINGS
// ─────────────────────────────

export async function getSettings(): Promise<SiteSettings | null> {
  try {
    const snap = await getDocs(collection(db, 'settings'));
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as SiteSettings;
  } catch (error) {
    console.error('getSettings error:', error);
    return null;
  }
}

export async function updateSettings(updates: Partial<SiteSettings>) {
  try {
    const snap = await getDocs(collection(db, 'settings'));
    if (snap.empty) {
      const ref = await addDoc(collection(db, 'settings'), updates);
      return { id: ref.id, ...updates };
    }
    await updateDoc(doc(db, 'settings', snap.docs[0].id), updates);
    return { id: snap.docs[0].id, ...updates };
  } catch (error) {
    console.error('updateSettings error:', error);
    return null;
  }
}


// ─────────────────────────────
// STATS
// ─────────────────────────────

export async function getStats() {
  try {
    // Avoid full products collection fetch: use server-side counts.
    const [pCount, inStockCount, limitedCount, outOfStockCount, cSnap, mSnap] = await Promise.all([
      getCountFromServer(collection(db, 'products')),
      getCountFromServer(query(collection(db, 'products'), where('status', '==', 'in-stock'))),
      getCountFromServer(query(collection(db, 'products'), where('status', '==', 'limited'))),
      getCountFromServer(query(collection(db, 'products'), where('status', '==', 'out-of-stock'))),
      getDocs(collection(db, 'categories')),
      getDocs(collection(db, 'messages')),
    ]);

    const categories = cSnap.docs.map(d => d.data() as any);
    const messages = mSnap.docs.map(d => d.data() as any);

    return {
      totalProducts: pCount.data().count,
      totalCategories: categories.length,
      newMessages: messages.filter(m => m.status === 'new').length,
      inStockProducts: inStockCount.data().count,
      limitedProducts: limitedCount.data().count,
      outOfStockProducts: outOfStockCount.data().count,
    };
  } catch (error) {
    console.error('getStats error:', error);
    return {
      totalProducts: 0,
      totalCategories: 0,
      newMessages: 0,
      inStockProducts: 0,
      limitedProducts: 0,
      outOfStockProducts: 0,
    };
  }
}