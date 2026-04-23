import { db } from '@/lib/firebase';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';

export type SiteStats = {
  totalProducts: number;
  totalCategories: number;
  newMessages: number;
  inStockProducts: number;
  limitedProducts: number;
  outOfStockProducts: number;
};

export async function getSiteStats(): Promise<SiteStats> {
  try {
    const [products, categories, newMessages, inStock, limited, outOfStock] = await Promise.all([
      getCountFromServer(collection(db, 'products')),
      getCountFromServer(collection(db, 'categories')),
      getCountFromServer(query(collection(db, 'messages'), where('status', '==', 'new'))),
      getCountFromServer(query(collection(db, 'products'), where('status', '==', 'in-stock'))),
      getCountFromServer(query(collection(db, 'products'), where('status', '==', 'limited'))),
      getCountFromServer(query(collection(db, 'products'), where('status', '==', 'out-of-stock'))),
    ]);

    return {
      totalProducts: products.data().count,
      totalCategories: categories.data().count,
      newMessages: newMessages.data().count,
      inStockProducts: inStock.data().count,
      limitedProducts: limited.data().count,
      outOfStockProducts: outOfStock.data().count,
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
}

