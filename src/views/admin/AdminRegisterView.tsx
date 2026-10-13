import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { Shield, Loader2, AlertCircle, UserPlus } from 'lucide-react';

export const AdminRegisterView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteSecret, setInviteSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-invite-secret': inviteSecret
        },
        body: JSON.stringify({ name, email, password, inviteSecret })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création du compte');
      }

      login(data.token, data.user);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Impossible de créer le compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md trm-card p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#00151F] border border-[#70ba65]/40 flex items-center justify-center shadow-lg p-1">
              <img 
                src="/assets/logo.webp" 
                alt="Sofienne Boukhris Logo" 
                width="72" 
                height="72" 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#70ba65] text-[#00151F] flex items-center justify-center shadow-md">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white text-center">
            Nouvel Administrateur
          </h1>
          <p className="text-[#919ca1] text-sm text-center mt-2">
            Créer un compte pour gérer la plateforme.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#a8b4b9] mb-2">
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#001E2B] border border-[#0a3d54] rounded-xl px-4 py-3 text-white placeholder-[#607274] focus:outline-none focus:border-[#70ba65] transition-colors"
              placeholder="Admin Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#a8b4b9] mb-2">
              Email administrateur
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#001E2B] border border-[#0a3d54] rounded-xl px-4 py-3 text-white placeholder-[#607274] focus:outline-none focus:border-[#70ba65] transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#a8b4b9] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-[#001E2B] border border-[#0a3d54] rounded-xl px-4 py-3 text-white placeholder-[#607274] focus:outline-none focus:border-[#70ba65] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#a8b4b9] mb-2">
              Clé d'invitation secrète (ADMIN_INVITE_SECRET)
            </label>
            <input
              type="password"
              value={inviteSecret}
              onChange={(e) => setInviteSecret(e.target.value)}
              required
              className="w-full bg-[#001E2B] border border-[#0a3d54] rounded-xl px-4 py-3 text-white placeholder-[#607274] focus:outline-none focus:border-[#70ba65] transition-colors"
              placeholder="Clé secrète requise"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#70ba65] hover:bg-[#5da353] text-[#001E2B] font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>Créer le compte</span>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => navigate('/admin')} 
            className="text-[#919ca1] text-xs hover:text-[#70ba65] transition-colors"
          >
            Déjà un compte ? Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};
