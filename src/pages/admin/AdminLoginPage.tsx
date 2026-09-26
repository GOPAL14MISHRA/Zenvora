import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEO } from '../../components/SEO';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname ?? '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let loginEmail = email.trim();
    if (loginEmail.toLowerCase() === 'admin') {
      loginEmail = 'admin@zenvora.com';
    }
    if (!loginEmail || !password) { setError('Please enter email and password.'); return; }
    setError('');
    setLoading(true);
    try {
      await login(loginEmail, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" noindex />
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E85D3F]/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#E85D3F" />
                <path d="M8 9h10l-8 7h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 16h8l-2 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#171717]">Admin Portal</h1>
            <p className="text-[#5F5A52] text-sm mt-1">Zenvora</p>
          </div>

          <div className="card-base p-7">
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="mb-4">
                <label className="label-base">Email</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zenvora.com" className="input-base" autoComplete="email"
                />
              </div>

              <div className="mb-5">
                <label className="label-base">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" className="input-base pr-10" autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F5A52] hover:text-[#171717]">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-[#5F5A52] text-xs mt-5">
              Please sign in with your administrator credentials.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
