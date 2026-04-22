import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] bg-white/[0.04] border border-white/[0.1] p-10 md:p-12">

        <h1 className="text-white text-2xl text-center">STONEBRIDGE</h1>
        <p className="text-[#D4AF37] text-center mb-6">ADMIN LOGIN</p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent border border-white/20 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-transparent border border-white/20 text-white"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-3"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
}