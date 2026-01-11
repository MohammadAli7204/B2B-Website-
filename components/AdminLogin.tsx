
import React, { useState } from 'react';
import { Lock, User, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (user: string, pass: string) => boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl shadow-xl mb-6">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Registry Access</h2>
          <p className="text-slate-500 font-medium">Authorized Personnel Only</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  required
                  type="text"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all font-medium"
                  placeholder="admin_id"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Secure Token</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  required
                  type="password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 animate-in shake duration-300">
                <ShieldAlert className="text-red-600" size={18} />
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Invalid Credentials</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-600 transition-all flex items-center justify-center gap-3 group tracking-widest text-sm"
            >
              AUTHENTICATE
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Secured by SteriPro Systems 2.4.0
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
