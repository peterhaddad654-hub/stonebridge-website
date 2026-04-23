import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

// ===================================================
// PRODUCTS
// ===================================================

export const getProducts = async () => {
  try {
    // Removed strict pagination, limits, and specific ordering 
    // to ensure all ~300 documents are fetched.
    const snap = await getDocs(collection(db, 'products'));
    
    const data = snap.docs.map(d => ({ 
      id: d.id, 
      ...d.data() 
    }));

    return data;
  } catch (err) {
    // If there is a permission or connection error, we see it now
    console.error('getProducts error:', err);
    return [];
  }
};

export const addProduct = async (data: any) => {
  try {
    return await addDoc(collection(db, 'products'), data);
  } catch (err) {
    console.error('addProduct error:', err);
    return null;
  }
};

export const updateProduct = async (id: string, data: any) => {
  try {
    await updateDoc(doc(db, 'products', id), data);
  } catch (err) {
    console.error('updateProduct error:', err);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (err) {
    console.error('deleteProduct error:', err);
  }
};

// ===================================================
// CATEGORIES
// ===================================================

export const getCategories = async () => {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('getCategories error:', err);
    return [];
  }
};

export const addCategory = async (data: any) => {
  try {
    return await addDoc(collection(db, 'categories'), data);
  } catch (err) {
    console.error('addCategory error:', err);
    return null;
  }
};

export const updateCategory = async (id: string, data: any) => {
  try {
    await updateDoc(doc(db, 'categories', id), data);
  } catch (err) {
    console.error('updateCategory error:', err);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'categories', id));
  } catch (err) {
    console.error('deleteCategory error:', err);
  }
};

// ===================================================
// MESSAGES
// ===================================================

export const getMessages = async () => {
  try {
    const snap = await getDocs(collection(db, 'messages'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('getMessages error:', err);
    return [];
  }
};

export const addMessage = async (data: any) => {
  try {
    return await addDoc(collection(db, 'messages'), data);
  } catch (err) {
    console.error('addMessage error:', err);
    return null;
  }
};

// ===================================================
// HOME CONTENT (SAFE SINGLE DOC)
// ===================================================

export const getHomeContent = async () => {
  try {
    const snap = await getDocs(collection(db, 'home_content'));

    if (snap.empty) return null;

    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  } catch (err) {
    console.error('getHomeContent error:', err);
    return null;
  }
};

export const updateHomeContent = async (data: any) => {
  try {
    const snap = await getDocs(collection(db, 'home_content'));

    if (!snap.empty) {
      await updateDoc(doc(db, 'home_content', snap.docs[0].id), data);
    } else {
      await addDoc(collection(db, 'home_content'), data);
    }
  } catch (err) {
    console.error('updateHomeContent error:', err);
  }
};

// ===================================================
// SETTINGS (SAFE SINGLE DOC)
// ===================================================

export const getSettings = async () => {
  try {
    const snap = await getDocs(collection(db, 'settings'));

    if (snap.empty) return null;

    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  } catch (err) {
    console.error('getSettings error:', err);
    return null;
  }
};

export const updateSettings = async (data: any) => {
  try {
    const snap = await getDocs(collection(db, 'settings'));

    if (!snap.empty) {
      await updateDoc(doc(db, 'settings', snap.docs[0].id), data);
    } else {
      await addDoc(collection(db, 'settings'), data);
    }
  } catch (err) {
    console.error('updateSettings error:', err);
  }
};