import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ArrowLeft,
  Plus,
  Check,
  Briefcase,
  Zap,
  Code2,
  Cpu,
  BarChart3,
  Palette,
  ShieldAlert,
  Eye,
  EyeOff,
  KeyRound,
  RotateCcw
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot' | 'supabase';
  initialEmail?: string;
}

const CAREER_SUGGESTED_SKILLS: Record<string, string[]> = {
  'full-stack-developer': ['HTML & CSS', 'JavaScript', 'React.js', 'Node.js', 'Git', 'SQL', 'TypeScript', 'Tailwind CSS'],
  'ai-engineer': ['Python', 'Linear Algebra', 'NumPy', 'Machine Learning', 'PyTorch', 'Data Analysis', 'TensorFlow', 'LLMs'],
  'data-scientist': ['Python', 'SQL', 'Pandas', 'Statistics', 'Data Visualization', 'Tableau', 'Scikit-Learn', 'R'],
  'ui-ux-designer': ['Figma', 'Wireframing', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS', 'Usability Testing'],
  'cybersecurity-analyst': ['Computer Networks', 'Linux', 'Network Security', 'Ethical Hacking', 'Wireshark', 'Python', 'Cryptography']
};

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'signup',
  initialEmail = '' 
}) => {
  const { 
    currentUser, 
    careers, 
    registerUser,
    loginUser,
    switchProfile, 
    showNotification 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'supabase'>(initialMode);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [resetSent, setResetSent] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [education, setEducation] = useState('B.Tech / B.S. in Computer Science');
  const [customEducation, setCustomEducation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [selectedCareer, setSelectedCareer] = useState(currentUser?.careerGoal || 'full-stack-developer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['HTML & CSS', 'JavaScript']);
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialEmail) {
        setEmail(initialEmail);
      }
      setSignupStep(1);
      setResetSent(false);
    }
  }, [isOpen, initialMode, initialEmail]);

  useEffect(() => {
    if (CAREER_SUGGESTED_SKILLS[selectedCareer]) {
      setSelectedSkills(CAREER_SUGGESTED_SKILLS[selectedCareer].slice(0, 3));
    }
  }, [selectedCareer]);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      setCustomSkillInput('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, name || email.split('@')[0]);
    onClose();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setResetSent(true);
    showNotification(`Password reset link dispatched to ${email}`);
  };

  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showNotification('Please enter your full name and student email.');
      return;
    }
    setSignupStep(2);
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEducation = education === 'Other' ? (customEducation.trim() || 'Higher Education') : education;

    const formattedSkills = selectedSkills.map(skillName => ({
      name: skillName,
      level: experienceLevel,
      years: experienceLevel === 'Beginner' ? 0.5 : experienceLevel === 'Intermediate' ? 2 : 4,
      verified: true
    }));

    registerUser({
      name: name.trim(),
      email: email.trim(),
      education: finalEducation,
      experienceLevel,
      careerGoal: selectedCareer,
      skills: formattedSkills
    });

    onClose();
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('learnexa_supabase_url', supabaseUrl);
    localStorage.setItem('learnexa_supabase_key', supabaseKey);
    showNotification('Supabase connection parameters saved!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-modal dark:shadow-modal-dark overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50/50 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white dark:text-black" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white leading-tight">
                {mode === 'signup' && 'Create Your Student Account'}
                {mode === 'login' && 'Sign in to Learnexa'}
                {mode === 'forgot' && 'Reset Your Password'}
                {mode === 'supabase' && 'Database Configuration'}
              </h3>
              <p className="text-[11px] text-neutral-500">
                {mode === 'signup' && 'Register your details to unlock your personalized AI learning roadmap'}
                {mode === 'login' && 'Enter your credentials to access your student dashboard'}
                {mode === 'forgot' && 'We will send a secure recovery link to your inbox'}
                {mode === 'supabase' && 'Connect your distributed Supabase PostgreSQL instance'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 text-xs font-medium shrink-0 bg-neutral-50/30 dark:bg-neutral-900/20">
          <button
            type="button"
            onClick={() => { setMode('signup'); setSignupStep(1); }}
            className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold bg-white dark:bg-[#121212]'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <span>Register</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 text-center transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold bg-white dark:bg-[#121212]'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('forgot')}
            className={`py-2.5 px-4 text-center transition-colors ${
              mode === 'forgot'
                ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold bg-white dark:bg-[#121212]'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <span>Reset Password</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('supabase')}
            className={`py-2.5 px-4 text-center transition-colors ${
              mode === 'supabase'
                ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold bg-white dark:bg-[#121212]'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <span>Cloud DB</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* ===================== SIGN UP ===================== */}
          {mode === 'signup' && (
            <div>
              {/* Stepper Header */}
              <div className="mb-5 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    signupStep === 1 
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' 
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {signupStep === 2 ? <Check className="w-3 h-3" /> : '1'}
                  </div>
                  <span className={`text-xs font-semibold ${signupStep === 1 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
                    1. Account Credentials
                  </span>
                </div>
                <div className="h-[1px] w-12 bg-neutral-200 dark:border-neutral-800" />
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    signupStep === 2 
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' 
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-semibold ${signupStep === 2 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
                    2. Career & Skills
                  </span>
                </div>
              </div>

              {/* STEP 1: Account Information */}
              {signupStep === 1 && (
                <form onSubmit={handleProceedToStep2} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan or Aarav Patel"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="input-field pl-10"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Student / Professional Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        placeholder="student@university.edu"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Password <span className="text-neutral-400 font-normal">(8+ characters)</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input-field pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Academic Background
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <select
                        value={education}
                        onChange={e => setEducation(e.target.value)}
                        className="input-field pl-10 font-medium"
                      >
                        <option value="B.Tech / B.S. in Computer Science">B.Tech / B.S. in Computer Science</option>
                        <option value="B.E. Information Technology">B.E. Information Technology</option>
                        <option value="MCA / M.S. Data Science">MCA / M.S. Data Science</option>
                        <option value="College Undergraduate (Engineering)">College Undergraduate (Engineering)</option>
                        <option value="College Student (Non-CS Major)">College Student (Non-CS Major)</option>
                        <option value="Coding Bootcamp Student / Graduate">Coding Bootcamp Student / Graduate</option>
                        <option value="Self-Taught Developer">Self-Taught Developer</option>
                        <option value="Working Professional Pivoting to Tech">Working Professional Pivoting to Tech</option>
                        <option value="Other">Other (Custom degree)</option>
                      </select>
                    </div>

                    {education === 'Other' && (
                      <input
                        type="text"
                        placeholder="Enter degree or major"
                        value={customEducation}
                        onChange={e => setCustomEducation(e.target.value)}
                        className="input-field mt-2"
                      />
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-primary w-full py-2.5"
                    >
                      <span>Continue: Choose Career & Skills</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Career Goal & Initial Skills */}
              {signupStep === 2 && (
                <form onSubmit={handleCompleteRegistration} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Target Career Goal <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {careers.map(c => {
                        const isSelected = selectedCareer === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedCareer(c.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                              isSelected
                                ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-900'
                                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#121212]'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                            }`}>
                              {c.id === 'full-stack-developer' && <Code2 className="w-4 h-4" />}
                              {c.id === 'ai-engineer' && <Cpu className="w-4 h-4" />}
                              {c.id === 'data-scientist' && <BarChart3 className="w-4 h-4" />}
                              {c.id === 'ui-ux-designer' && <Palette className="w-4 h-4" />}
                              {c.id === 'cybersecurity-analyst' && <ShieldAlert className="w-4 h-4" />}
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                                {c.title}
                              </p>
                              <p className="text-[10px] text-neutral-400 truncate">{c.category}</p>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white ml-auto shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setExperienceLevel(lvl)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                            experienceLevel === lvl
                              ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Existing Skills (Click to toggle)
                      </label>
                      <span className="text-[10px] text-neutral-400">{selectedSkills.length} selected</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                      {(CAREER_SUGGESTED_SKILLS[selectedCareer] || []).map(skill => {
                        const active = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                              active
                                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                            }`}
                          >
                            <span>{skill}</span>
                            {active && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add another skill (e.g. Docker, Redis, C++)"
                        value={customSkillInput}
                        onChange={e => setCustomSkillInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAddCustomSkill(e); }}
                        className="input-field"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomSkill}
                        className="btn-secondary px-3 py-2.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSignupStep(1)}
                      className="btn-secondary px-4 py-2.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="btn-primary flex-1 py-2.5"
                    >
                      <span>Complete Registration & Enter Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===================== SIGN IN ===================== */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-field pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2.5"
              >
                <span>Sign In & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Profiles 1-Click Access */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block text-center">
                  Or Test Demo Hackathon Profiles (1-Click)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { switchProfile('alex'); onClose(); }}
                    className="btn-secondary py-2 text-[11px] justify-center"
                  >
                    Alex (Full Stack)
                  </button>
                  <button
                    type="button"
                    onClick={() => { switchProfile('sarah'); onClose(); }}
                    className="btn-secondary py-2 text-[11px] justify-center"
                  >
                    Sarah (AI Eng)
                  </button>
                  <button
                    type="button"
                    onClick={() => { switchProfile('david'); onClose(); }}
                    className="btn-secondary py-2 text-[11px] justify-center"
                  >
                    David (Cyber)
                  </button>
                </div>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setSignupStep(1); }}
                  className="text-xs text-neutral-600 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Need a student account? <span className="underline">Register now →</span>
                </button>
              </div>
            </form>
          )}

          {/* ===================== FORGOT PASSWORD ===================== */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              {resetSent ? (
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Password Reset Link Sent
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Check your inbox at <span className="font-mono text-neutral-800 dark:text-neutral-200">{email}</span> for instructions to reset your password.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setResetSent(false); setMode('login'); }}
                    className="btn-secondary w-full py-2 text-xs"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                    Enter the email associated with your Learnexa account and we will send you a secure verification link to reset your password.
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        placeholder="student@university.edu"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-field pl-10"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-2.5"
                  >
                    <span>Send Password Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===================== SUPABASE CONFIG ===================== */}
          {mode === 'supabase' && (
            <form onSubmit={handleSaveSupabase} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <span className="font-semibold text-neutral-900 dark:text-white">Cloud Database Sync:</span> Connect your live Supabase credentials for real-time distributed state persistence.
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={supabaseUrl}
                  onChange={e => setSupabaseUrl(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Supabase Anon Public Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={e => setSupabaseKey(e.target.value)}
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2.5"
              >
                Save Cloud Configuration
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
