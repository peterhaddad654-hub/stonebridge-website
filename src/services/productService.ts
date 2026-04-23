import { db } from '@/lib/firebase';
import type { Product, ProductStatus } from '@/types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  orderBy,
  startAfter,
  updateDoc,
  writeBatch,
  where,
} from 'firebase/firestore';
import type { DocumentData, QueryConstraint, QueryDocumentSnapshot } from 'firebase/firestore';

export type ProductCursor = QueryDocumentSnapshot<DocumentData> | null;

export type ProductListParams = {
  pageSize?: number;
  cursor?: ProductCursor;
  category?: string | null;
  status?: ProductStatus | null;
};

export type ProductPage = {
  items: Product[];
  cursor: ProductCursor;
  hasMore: boolean;
};

function normalizeProduct(id: string, data: any): Product {
  const createdAt = data?.createdAt ?? data?.created_at ?? new Date(0).toISOString();
  const updatedAt = data?.updatedAt ?? data?.updated_at ?? createdAt;

  return {
    id,
    name: data?.name ?? '',
    category: data?.category ?? '',
    description: data?.description ?? '',
    price: Number(data?.price ?? 0),
    oldPrice: data?.oldPrice,
    discount: data?.discount,
    status: (data?.status ?? 'in-stock') as ProductStatus,
    image: data?.image ?? '',
    createdAt,
    updatedAt,
  };
}

export async function fetchProductsPage(params: ProductListParams = {}): Promise<ProductPage> {
  // RECOVERY MODE (per requirements):
  // Use a guaranteed working query ONLY: collection('products') + limit(50).
  // No where(), no orderBy(), no startAfter(), no fallback logic.
  const pageSize = params.pageSize ?? 50;
  const safeLimit = Math.min(50, Math.max(1, pageSize));

  console.log('[productService] fetchProductsPage recovery start', {
    collection: 'products',
    limit: safeLimit,
  });

  const q = query(collection(db, 'products'), limit(safeLimit));
  const snap = await getDocs(q);

  console.log('[productService] recovery snapshot size', snap.size);
  console.log('[productService] recovery first doc', snap.docs[0]?.id, snap.docs[0]?.data?.());

  const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Product[];

  console.log('[productService] fetchProductsPage recovery success', { returned: items.length });

  return {
    items,
    cursor: null,
    hasMore: false,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (!snap.exists()) return null;
    return normalizeProduct(snap.id, snap.data());
  } catch {
    return null;
  }
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  const ref = await addDoc(collection(db, 'products'), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: ref.id, ...normalizeProduct(ref.id, { ...data, createdAt: now, updatedAt: now }) };
}

export async function editProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt'>>) {
  const now = new Date().toISOString();
  await updateDoc(doc(db, 'products', id), {
    ...data,
    updatedAt: now,
  } as any);
  return true;
}

export async function removeProduct(id: string) {
  await deleteDoc(doc(db, 'products', id));
  return true;
}

export async function updateProductsCategory(oldCategory: string, newCategory: string) {
  if (!oldCategory || !newCategory || oldCategory === newCategory) return 0;

  let updated = 0;
  let cursor: ProductCursor = null;
  const pageSize = 300;

  while (true) {
    const constraints: QueryConstraint[] = [
      where('category', '==', oldCategory),
      orderBy('createdAt', 'desc'),
    ];
    if (cursor) constraints.push(startAfter(cursor));
    constraints.push(limit(pageSize));

    const q = query(collection(db, 'products'), ...constraints);
    const snap = await getDocs(q);
    if (snap.empty) break;

    const batch = writeBatch(db);
    snap.docs.forEach((d) => {
      batch.update(doc(db, 'products', d.id), { category: newCategory, updatedAt: new Date().toISOString() });
    });
    await batch.commit();

    updated += snap.docs.length;
    cursor = snap.docs[snap.docs.length - 1] ?? null;
    if (snap.docs.length < pageSize) break;
  }

  return updated;
}

