import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Package, Tags, Mail, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { stats, messages } = useData();

  // ✅ FIX: fallback to prevent crash
  const safeStats = stats || {
    totalProducts: 0,
    totalCategories: 0,
    newMessages: 0,
    inStockProducts: 0,
  };

  const safeMessages = messages || [];

  const recentMessages = safeMessages.slice(0, 5);

  const statCards = [
    { icon: Package, value: safeStats.totalProducts, label: 'Total Products', trend: `+${safeStats.totalProducts - 21} this month` },
    { icon: Tags, value: safeStats.totalCategories, label: 'Categories' },
    { icon: Mail, value: safeStats.newMessages, label: 'New Messages', alert: safeStats.newMessages > 0 },
    { icon: CheckCircle, value: safeStats.inStockProducts, label: 'In Stock', color: '#34C759' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white border border-[#E5E5EA] p-6 ${card.alert ? 'border-l-4 border-l-[#FF3B30]' : ''}`}
          >
            <card.icon className="w-6 h-6" style={{ color: card.color || '#D4AF37' }} />
            <p className="font-display text-[#1C1C1E] text-3xl font-medium mt-3">{card.value}</p>
            <p className="font-body text-xs text-[#8E8E93] uppercase tracking-[0.05em] mt-1">{card.label}</p>
            {card.trend && (
              <p className="font-body text-xs text-[#34C759] mt-1">{card.trend}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Messages + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-7 bg-white border border-[#E5E5EA]">
          <div className="p-6 border-b border-[#E5E5EA] flex items-center justify-between">
            <h3 className="font-display text-[#1C1C1E] text-sm font-medium uppercase tracking-[0.06em]">Recent Messages</h3>
            <Link to="/admin/messages" className="font-body text-[13px] text-[#D4AF37] hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="divide-y divide-[#E5E5EA]">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#FAFAFA] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm font-medium text-[#1C1C1E] truncate">{msg.name}</span>
                    {msg.status === 'new' && (
                      <span className="px-2.5 py-0.5 bg-[#FF3B30]/10 text-[#FF3B30] font-body text-[11px] rounded-full">New</span>
                    )}
                  </div>
                  <p className="font-body text-xs text-[#8E8E93] truncate">{msg.email}</p>
                </div>
                <span className="font-body text-xs text-[#8E8E93] hidden sm:block">{msg.subject}</span>
                <span className="font-body text-xs text-[#8E8E93] hidden md:block whitespace-nowrap">
                  {new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-5 bg-white border border-[#E5E5EA] p-6">
          <h3 className="font-display text-[#1C1C1E] text-sm font-medium uppercase tracking-[0.06em] mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/admin/products"
              className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-[#1C1C1E] font-body text-[13px] font-medium uppercase tracking-[0.05em] py-3 hover:bg-[#E8C547] transition-colors"
            >
              + Add New Product
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center justify-center gap-2 w-full bg-[#1C1C1E] text-white font-body text-[13px] font-medium uppercase tracking-[0.05em] py-3 hover:bg-[#333] transition-colors"
            >
              + Add New Category
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center justify-center gap-2 w-full border border-[#1C1C1E] text-[#1C1C1E] font-body text-[13px] font-medium uppercase tracking-[0.05em] py-3 hover:bg-[#1C1C1E] hover:text-white transition-colors"
            >
              View All Messages
            </Link>
            <Link
              to="/admin/home-content"
              className="flex items-center justify-center gap-2 w-full border border-[#1C1C1E] text-[#1C1C1E] font-body text-[13px] font-medium uppercase tracking-[0.05em] py-3 hover:bg-[#1C1C1E] hover:text-white transition-colors"
            >
              Edit Home Content
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}