import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Package, Tags, Mail, Home, Settings,
  LogOut, Menu,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: Tags, label: 'Categories', path: '/admin/categories' },
  { icon: Mail, label: 'Messages', path: '/admin/messages' },
  { icon: Home, label: 'Home Content', path: '/admin/home-content' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pageTitle = navItems.find((n) => n.path === location.pathname)?.label || 'Admin';

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#1C1C1E] z-50 transition-transform duration-300 ${
          isMobile
            ? sidebarOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full w-[260px]'
            : 'translate-x-0 w-[260px]'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="font-display text-white text-base font-medium uppercase tracking-[0.15em]">
            STONEBRIDGE
          </Link>
        </div>
        <p className="font-body text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase px-6 pt-4">ADMIN</p>

        {/* Nav Items */}
        <nav className="mt-6 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3.5 font-body text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[rgba(212,175,55,0.15)] border-l-[3px] border-[#D4AF37]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-3.5 font-body text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${isMobile ? 'ml-0' : 'ml-[260px]'}`}>
        {/* Top Bar */}
        <header className="h-[60px] bg-white border-b border-[#E5E5EA] flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} className="text-[#1C1C1E]">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-display text-[#1C1C1E] text-lg font-medium">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1C1C1E] flex items-center justify-center">
              <span className="font-display text-white text-xs">SB</span>
            </div>
            <span className="font-body text-sm text-[#8E8E93] hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 max-w-[1200px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
