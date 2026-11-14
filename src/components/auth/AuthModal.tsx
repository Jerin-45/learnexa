import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  Compass, 
  CheckCircle2, 
  Database,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    updateCurrentUser, 
    careers, 
    setCareerGoal, 
    switchProfile, 
    showNotification 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'supabase'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [education, setEducation] = useState('B.S. in Computer Science');
  const [selectedCareer, setSelectedCareer] = useState(currentUser.careerGoal);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    updateCurrentUser({
      name: name || email.split('@')[0],
      email: email
    });
    showNotification(`Welcome, ${name || email.split('@')[0]}! Signed in successfully.`);
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    updateCurrentUser({
      name,
      email,
      education,
      careerGoal: selectedCareer
    });
    setCareerGoal(selectedCareer);
    showNotification(`Account created for ${name}! Roadmap generated.`);
    onClose();
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('skillpath_supabase_url', supabaseUrl);
    localStorage.setItem('skillpath_supabase_key', supabaseKey);
    showNotification('Supabase connection parameters saved!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl glass-panel shadow-2xl border border-purple-500/30 overflow-hidden flex flex-col">
        {/* Header Tabs */}
        <div className="p-4 gradient-brand flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base">
              SkillPath AI Authentication
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/40 dark:bg-brand-950/40'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === 'signup'
                ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/40 dark:bg-brand-950/40'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode('supabase')}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === 'supabase'
                ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/40 dark:bg-brand-950/40'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Supabase DB
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all"
              >
                Sign In & Synchronize
              </button>

              {/* Demo 1-Click Personas */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                  Or Test Hackathon Demo Profiles (1-Click)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { switchProfile('alex'); onClose(); }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 text-center"
                  >
                    Alex (Full Stack)
                  </button>
                  <button
                    type="button"
                    onClick={() => { switchProfile('sarah'); onClose(); }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 text-center"
                  >
                    Sarah (AI Eng)
                  </button>
                  <button
                    type="button"
                    onClick={() => { switchProfile('david'); onClose(); }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 text-center"
                  >
                    David (Cyber)
                  </button>
                </div>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="alex@stanford.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Education / University
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="B.S. in Computer Science (Junior)"
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Career Goal
                </label>
                <select
                  value={selectedCareer}
                  onChange={e => setSelectedCareer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {careers.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all"
              >
                Create Account & Initialize AI Agents
              </button>
            </form>
          )}

          {mode === 'supabase' && (
            <form onSubmit={handleSaveSupabase} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <span className="font-bold">Enterprise Cloud Integration:</span> Enter your Supabase project credentials for distributed synchronization across browsers.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={supabaseUrl}
                  onChange={e => setSupabaseUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Supabase Anon Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={e => setSupabaseKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all"
              >
                Save Database Config
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
