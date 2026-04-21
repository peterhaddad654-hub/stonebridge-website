import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = login(username, password);
      setLoading(false);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] bg-white/[0.04] border border-white/[0.1] p-10 md:p-12">
        <h1 className="font-display text-white text-2xl font-medium uppercase tracking-[0.2em] text-center">
          STONEBRIDGE
        </h1>
        <p className="font-body text-[#D4AF37] text-xs tracking-[0.2em] uppercase text-center mt-2">
          ADMIN PANEL
        </p>
        <div className="w-[40px] h-[1px] bg-[#D4AF37] mx-auto my-6" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-white/60 mb-2 block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 text-white font-body text-base px-0 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-white/60 mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 text-white font-body text-base px-0 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-body text-[13px] text-[#FF3B30] text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-[#1C1C1E] font-display text-sm uppercase tracking-[0.1em] py-3.5 hover:bg-[#E8C547] transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
