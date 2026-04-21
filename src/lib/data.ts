import type { Product, Category, Message, HomeContent, SiteSettings } from '@/types';

const KEYS = {
  products: 'sb_products',
  categories: 'sb_categories',
  messages: 'sb_messages',
  homeContent: 'sb_home_content',
  settings: 'sb_settings',
  token: 'sb_admin_token',
};

// ─── Seed Data ───────────────────────────────────────────────

const seedProducts: Product[] = [
  // Whisky
  { id: 'p1', name: 'Macallan 18 Year Old', category: 'Whisky', description: 'A legendary single malt whisky matured exclusively in sherry oak casks for 18 years. Rich, complex, and impeccably balanced.', status: 'in-stock', image: '', createdAt: '2025-01-15', updatedAt: '2025-03-20' },
  { id: 'p2', name: 'Glenfiddich 21 Year Old', category: 'Whisky', description: 'Aged for 21 years and finished in Caribbean rum casks, delivering a rich and sweet character.', status: 'in-stock', image: '', createdAt: '2025-01-20', updatedAt: '2025-03-18' },
  { id: 'p3', name: 'Lagavulin 16 Year Old', category: 'Whisky', description: 'An intensely smoky Islay single malt with profound depth and maritime character.', status: 'limited', image: '', createdAt: '2025-02-01', updatedAt: '2025-03-15' },
  { id: 'p4', name: 'Yamazaki 12 Year Old', category: 'Whisky', description: "Japan's most awarded single malt, with notes of peach, pineapple, and vanilla.", status: 'in-stock', image: '', createdAt: '2025-02-05', updatedAt: '2025-03-10' },
  { id: 'p5', name: "Jack Daniel's Sinatra Select", category: 'Whisky', description: 'A premium expression with bold character and a smooth, refined finish.', status: 'in-stock', image: '', createdAt: '2025-02-10', updatedAt: '2025-03-08' },
  { id: 'p6', name: 'Hibiki Japanese Harmony', category: 'Whisky', description: 'A symphony of Japanese craftsmanship, blending malt and grain whiskies in perfect harmony.', status: 'limited', image: '', createdAt: '2025-02-12', updatedAt: '2025-03-05' },
  // Wines
  { id: 'p7', name: 'Chateau Margaux 2015', category: 'Wines', description: "One of Bordeaux's most prestigious first growths, offering extraordinary elegance and complexity.", status: 'limited', image: '', createdAt: '2025-01-10', updatedAt: '2025-03-22' },
  { id: 'p8', name: 'Opus One 2018', category: 'Wines', description: 'A legendary California-Napa Valley Bordeaux blend of exceptional depth and refinement.', status: 'in-stock', image: '', createdAt: '2025-01-18', updatedAt: '2025-03-20' },
  { id: 'p9', name: 'Tignanello 2019', category: 'Wines', description: 'Tuscany\'s iconic Super Tuscan, blending Sangiovese with Cabernet Sauvignon and Franc.', status: 'in-stock', image: '', createdAt: '2025-01-25', updatedAt: '2025-03-18' },
  { id: 'p10', name: 'Cloudy Bay Sauvignon Blanc', category: 'Wines', description: "New Zealand's most celebrated Sauvignon Blanc, vibrant and refreshing.", status: 'in-stock', image: '', createdAt: '2025-02-01', updatedAt: '2025-03-15' },
  { id: 'p11', name: 'Dom Perignon 2012', category: 'Wines', description: "The pinnacle of Champagne, representing the finest expression of Moet & Chandon's craft.", status: 'in-stock', image: '', createdAt: '2025-02-08', updatedAt: '2025-03-12' },
  { id: 'p12', name: "Penfolds Grange 2017", category: 'Wines', description: "Australia's most iconic wine, a powerful Shiraz of immense depth and longevity.", status: 'limited', image: '', createdAt: '2025-02-14', updatedAt: '2025-03-10' },
  // Spirits
  { id: 'p13', name: 'Grey Goose Vodka', category: 'Spirits', description: "France's premium vodka, crafted from the finest soft winter wheat and spring water.", status: 'in-stock', image: '', createdAt: '2025-01-12', updatedAt: '2025-03-25' },
  { id: 'p14', name: "Patron Anejo Tequila", category: 'Spirits', description: 'A premium aged tequila with rich, complex flavors of oak, vanilla, and raisins.', status: 'in-stock', image: '', createdAt: '2025-01-22', updatedAt: '2025-03-22' },
  { id: 'p15', name: "Hendrick's Gin", category: 'Spirits', description: 'A curiously crafted Scottish gin infused with rose and cucumber for a unique taste.', status: 'in-stock', image: '', createdAt: '2025-02-02', updatedAt: '2025-03-20' },
  { id: 'p16', name: 'Cointreau Liqueur', category: 'Spirits', description: "The world's premier triple sec, essential for crafting the finest cocktails.", status: 'in-stock', image: '', createdAt: '2025-02-06', updatedAt: '2025-03-18' },
  { id: 'p17', name: 'Grand Marnier Cordon Rouge', category: 'Spirits', description: 'A refined blend of cognac and bitter orange liqueur, luxurious and complex.', status: 'in-stock', image: '', createdAt: '2025-02-11', updatedAt: '2025-03-15' },
  { id: 'p18', name: 'Bacardi Reserva Limitada', category: 'Spirits', description: "Bacardi's most prestigious rum, aged in oak barrels for a deep, smooth character.", status: 'limited', image: '', createdAt: '2025-02-16', updatedAt: '2025-03-12' },
  // Soft Drinks
  { id: 'p19', name: 'Perrier Sparkling Water', category: 'Soft Drinks', description: 'The iconic French sparkling mineral water, naturally carbonated at the source.', status: 'in-stock', image: '', createdAt: '2025-01-08', updatedAt: '2025-03-28' },
  { id: 'p20', name: 'San Pellegrino Sparkling', category: 'Soft Drinks', description: "Italy's finest sparkling natural mineral water, served at the world's best tables.", status: 'in-stock', image: '', createdAt: '2025-01-16', updatedAt: '2025-03-25' },
  { id: 'p21', name: 'Fever-Tree Tonic Water', category: 'Soft Drinks', description: 'The world\'s leading premium mixer, crafted with naturally sourced quinine.', status: 'in-stock', image: '', createdAt: '2025-01-28', updatedAt: '2025-03-22' },
  { id: 'p22', name: 'Monin Syrups Collection', category: 'Soft Drinks', description: 'French premium syrups in over 100 flavors for crafting exceptional beverages.', status: 'in-stock', image: '', createdAt: '2025-02-03', updatedAt: '2025-03-20' },
  { id: 'p23', name: 'Red Bull Energy Drink', category: 'Soft Drinks', description: 'The global leader in energy drinks, delivering wings since 1987.', status: 'in-stock', image: '', createdAt: '2025-02-09', updatedAt: '2025-03-18' },
  { id: 'p24', name: 'Fentimans Botanical Drinks', category: 'Soft Drinks', description: 'Botanically brewed beverages crafted with natural ingredients and time-honored methods.', status: 'in-stock', image: '', createdAt: '2025-02-13', updatedAt: '2025-03-15' },
];

const seedCategories: Category[] = [
  { id: 'c1', name: 'Whisky', description: 'Premium single malt and blended whiskies from Scotland, Japan, and beyond.' },
  { id: 'c2', name: 'Wines', description: 'Fine wines from Bordeaux, Napa Valley, Tuscany, and leading New World regions.' },
  { id: 'c3', name: 'Spirits', description: 'Premium vodka, gin, tequila, rum, and liqueurs from the world\'s best distilleries.' },
  { id: 'c4', name: 'Soft Drinks', description: 'Artisanal mixers, sparkling waters, energy drinks, and premium non-alcoholic beverages.' },
];

const seedMessages: Message[] = [
];

const seedHomeContent: HomeContent = {
  hero: {
    enabled: true,
    brandName: 'STONEBRIDGE',
    tagline: 'Premium Beverage Distribution',
    primaryCta: 'Explore Products',
    secondaryCta: 'Contact Us',
    backgroundImage: '/images/home-hero.jpg',
  },
  featuredProducts: ['p1', 'p7', 'p13', 'p19'],
  stats: { years: '12+', brands: '500+', countries: '25+' },
  testimonials: [
    { quote: 'STONEBRIDGE has been instrumental in expanding our brand\'s presence across the GCC. Their professionalism and deep market knowledge are unmatched.', author: 'James Richardson', title: 'Export Director, William Grant & Sons', rating: 5 },
    { quote: 'Working with STONEBRIDGE transformed our distribution strategy. They understand the premium beverage market like no one else in the region.', author: 'Sarah Chen', title: 'Regional VP, Asia-Pacific, Pernod Ricard', rating: 5 },
    { quote: 'Reliable, efficient, and deeply committed to quality. STONEBRIDGE is more than a distributor — they\'re a true strategic partner.', author: 'Ahmed Al-Farsi', title: 'CEO, Arabian Beverage Group', rating: 5 },
  ],
};

const seedSettings: SiteSettings = {
  companyName: 'STONEBRIDGE Distribution',
  contactEmail: 'info@stonebridge.com',
  contactPhone: '+961 79 467 530',
  whatsappNumber: '+961 79 467 530',
  businessAddress: 'Baabda, Lebanon',
};

// ─── Helpers ─────────────────────────────────────────────────

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function initIfEmpty(key: string, data: unknown): void {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// ─── Public API ──────────────────────────────────────────────

export function seedDatabase(): void {
  initIfEmpty(KEYS.products, seedProducts);
  initIfEmpty(KEYS.categories, seedCategories);
  initIfEmpty(KEYS.messages, seedMessages);
  initIfEmpty(KEYS.homeContent, seedHomeContent);
  initIfEmpty(KEYS.settings, seedSettings);
}

// Products
export function getProducts(): Product[] {
  return getItem<Product[]>(KEYS.products, seedProducts);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `p${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
  setItem(KEYS.products, [...products, newProduct]);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
  setItem(KEYS.products, products);
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  setItem(KEYS.products, filtered);
  return true;
}

// Categories
export function getCategories(): Category[] {
  return getItem<Category[]>(KEYS.categories, seedCategories);
}

export function addCategory(category: Omit<Category, 'id'>): Category {
  const categories = getCategories();
  const newCategory: Category = { ...category, id: `c${Date.now()}` };
  setItem(KEYS.categories, [...categories, newCategory]);
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  categories[idx] = { ...categories[idx], ...updates };
  setItem(KEYS.categories, categories);
  return categories[idx];
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();

  const categoryToDelete = categories.find((c) => c.id === id);
  if (!categoryToDelete) return false;

  const filtered = categories.filter((c) => c.id !== id);
  setItem(KEYS.categories, filtered);

  const products = getProducts();
  const updated = products.map((p) =>
    p.category === categoryToDelete.name
      ? { ...p, category: 'Uncategorized' }
      : p
  );

  setItem(KEYS.products, updated);

  return true;
}

// Messages
export function getMessages(): Message[] {
  return getItem<Message[]>(KEYS.messages, seedMessages);
}

export function addMessage(message: Omit<Message, 'id' | 'date' | 'status'>): Message {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: `m${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'new',
  };
  setItem(KEYS.messages, [newMessage, ...messages]);
  return newMessage;
}

export function markMessageAsRead(id: string): void {
  const messages = getMessages();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx !== -1) {
    messages[idx] = { ...messages[idx], status: 'read' };
    setItem(KEYS.messages, messages);
  }
}

export function markAllMessagesAsRead(): void {
  const messages = getMessages().map((m) => ({ ...m, status: 'read' as const }));
  setItem(KEYS.messages, messages);
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  setItem(KEYS.messages, filtered);
  return true;
}

// Home Content
export function getHomeContent(): HomeContent {
  return getItem<HomeContent>(KEYS.homeContent, seedHomeContent);
}

export function updateHomeContent(updates: Partial<HomeContent>): HomeContent {
  const current = getHomeContent();
  const updated = { ...current, ...updates };
  setItem(KEYS.homeContent, updated);
  return updated;
}

// Settings
export function getSettings(): SiteSettings {
  return getItem<SiteSettings>(KEYS.settings, seedSettings);
}

export function updateSettings(updates: Partial<SiteSettings>): SiteSettings {
  const current = getSettings();
  const updated = { ...current, ...updates };
  setItem(KEYS.settings, updated);
  return updated;
}

// Auth
export function login(username: string, password: string): boolean {
  if (username === 'admin' && password === 'stonebridge2025') {
    const token = btoa(JSON.stringify({ username, exp: Date.now() + 24 * 60 * 60 * 1000 }));
    localStorage.setItem(KEYS.token, token);
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(KEYS.token);
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(KEYS.token);
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
}

export function refreshToken(): void {
  const token = localStorage.getItem(KEYS.token);
  if (!token) return;
  try {
    const decoded = JSON.parse(atob(token));
    decoded.exp = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(KEYS.token, btoa(JSON.stringify(decoded)));
  } catch { /* ignore */ }
}

// Stats
export function getStats() {
  const products = getProducts();
  const categories = getCategories();
  const messages = getMessages();
  return {
    totalProducts: products.length,
    totalCategories: categories.length,
    newMessages: messages.filter((m) => m.status === 'new').length,
    inStockProducts: products.filter((p) => p.status === 'in-stock').length,
    limitedProducts: products.filter((p) => p.status === 'limited').length,
    outOfStockProducts: products.filter((p) => p.status === 'out-of-stock').length,
  };
}
