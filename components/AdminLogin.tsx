
import React, { useState } from 'react';
import { Lock, User, ShieldAlert, ArrowRight, ShieldCheck, Loader2, Mail } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (user: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  onSignUp: (user: string, pass: string) => Promise<{ success: boolean; message?: string }>;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      const response = isRegisterMode 
        ? await onSignUp(username, password)
        : await onLogin(username, password);

      if (response.success) {
        if (isRegisterMode) {
          setSuccessMessage(response.message || 'Account created! Check your email to verify.');
          setIsRegisterMode(false);
          setPassword('');
        }
      } else {
        // Handle specific Supabase "Invalid login credentials" or "Email not confirmed"
        setErrorMessage(response.message || 'Authentication failed');
      }
    } catch (err) {
      setErrorMessage('Network error during authentication');
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl shadow-xl mb-6">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            {isRegisterMode ? 'Registry Enrollment' : 'Ledger Access'}
          </h2>
          <p className="text-slate-500 font-medium">
            {isRegisterMode ? 'Register a new administrative identity' : 'Authorized Personnel Only'}
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  required
                  disabled={isAuthenticating}
                  type="email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all font-medium"
                  placeholder="admin@careguard.com"
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
                  disabled={isAuthenticating}
                  type="password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex flex-col gap-1 animate-in shake duration-300">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-red-600 flex-shrink-0" size={18} />
                  <span className="text-xs font-black text-red-700 uppercase tracking-wider">Access Denied</span>
                </div>
                <p className="text-[10px] text-red-500 font-bold ml-7">{errorMessage}</p>
                {errorMessage.toLowerCase().includes('email not confirmed') && (
                  <p className="text-[9px] text-red-400 font-bold ml-7 mt-1">Please check your inbox or disable email confirmation in Supabase settings.</p>
                )}
              </div>
            )}

            {successMessage && (
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex flex-col gap-2 animate-in zoom-in duration-300">
                <div className="flex items-center gap-3">
                  <Mail className="text-emerald-600 flex-shrink-0" size={18} />
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">Verification Required</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-bold ml-7 leading-relaxed">{successMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-600 disabled:bg-slate-300 transition-all flex items-center justify-center gap-3 group tracking-widest text-sm"
            >
              {isAuthenticating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isRegisterMode ? 'INITIALIZE IDENTITY' : 'AUTHENTICATE'}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <button 
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {isRegisterMode ? (
                <>Already Registered? <span className="text-red-600">Login</span></>
              ) : (
                <>New Administrator? <span className="text-red-600">Register Account</span></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Cloud Authentication via Supabase | Institutional Standards
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
