import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEO } from '../../components/SEO';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Sign Up" />
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 relative overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Create an Account</h1>
            <p className="text-gray-400 mt-2">Join Zenvora Digital today</p>
          </div>

          <div className="card-base p-7">
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="mb-4">
                <label className="label-base">Email</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" className="input-base" autoComplete="email"
                />
              </div>

              <div className="mb-5">
                <label className="label-base">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" className="input-base pr-10" autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-5">
              Already have an account? <Link to="/login" className="text-violet-400 hover:text-violet-300">Log in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
