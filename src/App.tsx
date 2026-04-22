import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';

import PublicLayout from '@/components/PublicLayout';

import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';
import CartPage from '@/pages/CartPage';

import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminHomeContent from '@/pages/admin/AdminHomeContent';
import AdminSettings from '@/pages/admin/AdminSettings';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/home-content" element={<AdminHomeContent />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <AppRoutes />
            <Toaster position="top-right" />
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;