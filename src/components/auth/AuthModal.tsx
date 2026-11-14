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
  ShieldAlert
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'supabase';
  initialEmail?: string;
}

// Preset skills per career goal to make registration effortless
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

  const [mode, setMode] = useState<'login' | 'signup' | 'supabase'>(initialMode);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);

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
    }
  }, [isOpen, initialMode, initialEmail]);

  // When career changes, update default suggested skills
  useEffect(() => {
    if (CAREER_SUGGESTED_SKILLS[selectedCareer]) {
      // Pick first 2-3 skills as starting selection
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl glass-panel shadow-2xl border border-brand-500/30 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 gradient-brand flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {mode === 'signup' ? 'Student Registration & Career Onboarding' : mode === 'login' ? 'Student Sign In' : 'Cloud Database Config'}
              </h3>
              <p className="text-[11px] text-white/80">
                {mode === 'signup' 
                  ? 'Register your profile to unlock your personalized AI learning dashboard' 
                  : 'Welcome back to your personalized career roadmap'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-2 ${
              mode === 'signup'
                ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Register & Onboard</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              Required
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('supabase')}
            className={`py-3 px-4 text-center transition-colors ${
              mode === 'supabase'
                ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Supabase
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* ===================== SIGN UP / REGISTRATION ===================== */}
          {mode === 'signup' && (
            <div>
              {/* Progress Steps Header */}
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    signupStep === 1 
                      ? 'bg-brand-600 text-white' 
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {signupStep === 2 ? <Check className="w-3.5 h-3.5" /> : '1'}
                  </div>
                  <span className={`text-xs font-bold ${signupStep === 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                    1. Student Details
                  </span>
                </div>
                <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    signupStep === 2 
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-bold ${signupStep === 2 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                    2. Career & Skills
                  </span>
                </div>
              </div>

              {/* STEP 1: Personal and Academic Info */}
              {signupStep === 1 && (
                <form onSubmit={handleProceedToStep2} className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan or Aarav Patel"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        placeholder="student@university.edu"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Password <span className="text-slate-400 font-normal">(for future logins)</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Education / Academic Qualification
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <select
                        value={education}
                        onChange={e => setEducation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                        placeholder="Enter your university degree or program"
                        value={customEducation}
                        onChange={e => setCustomEducation(e.target.value)}
                        className="mt-2 w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-extrabold text-xs gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Continue: Choose Career & Skills</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Career Goal & Initial Skills */}
              {signupStep === 2 && (
                <form onSubmit={handleCompleteRegistration} className="space-y-5 animate-in fade-in">
                  
                  {/* Desired Career Role */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Select Your Target Career Goal <span className="text-rose-500">*</span>
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
                                ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/60 shadow-sm'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'gradient-brand text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}>
                              {c.id === 'full-stack-developer' && <Code2 className="w-4 h-4" />}
                              {c.id === 'ai-engineer' && <Cpu className="w-4 h-4" />}
                              {c.id === 'data-scientist' && <BarChart3 className="w-4 h-4" />}
                              {c.id === 'ui-ux-designer' && <Palette className="w-4 h-4" />}
                              {c.id === 'cybersecurity-analyst' && <ShieldAlert className="w-4 h-4" />}
                            </div>
                            <div className="overflow-hidden">
                              <p className={`text-xs font-bold truncate ${isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-slate-800 dark:text-slate-200'}`}>
                                {c.title}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">{c.category}</p>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-brand-600 ml-auto shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setExperienceLevel(lvl)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            experienceLevel === lvl
                              ? 'border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/20'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Existing Skills Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Select Your Existing Skills
                      </label>
                      <span className="text-[10px] text-slate-400">Click to toggle</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      {(CAREER_SUGGESTED_SKILLS[selectedCareer] || []).map(skill => {
                        const active = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                              active
                                ? 'bg-brand-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span>{skill}</span>
                            {active && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Add Custom Skill Input */}
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add another skill (e.g. Docker, Redis, C++)"
                        value={customSkillInput}
                        onChange={e => setCustomSkillInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAddCustomSkill(e); }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomSkill}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Submission & Back Buttons */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSignupStep(1)}
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl font-extrabold text-xs gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-extrabold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In & Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Hackathon Demo Personas 1-Click Fast Access */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block text-center">
                  Or Test Hackathon Demo Profiles (1-Click Instant Access)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { switchProfile('alex'); onClose(); }}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 text-center border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Alex (Full Stack)
                  </button>
                  <button
                    type="button"
                    onClick={() => { switchProfile('sarah'); onClose(); }}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 text-center border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Sarah (AI Eng)
                  </button>
                  <button
                    type="button"
                    onClick={() => { switchProfile('david'); onClose(); }}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 text-center border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    David (Cyber)
                  </button>
                </div>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline"
                >
                  Don't have an account? Register your details now →
                </button>
              </div>
            </form>
          )}

          {/* ===================== SUPABASE CONFIG ===================== */}
          {mode === 'supabase' && (
            <form onSubmit={handleSaveSupabase} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <span className="font-bold">Enterprise Cloud Integration:</span> Enter your Supabase project credentials for distributed synchronization across browsers.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={supabaseUrl}
                  onChange={e => setSupabaseUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Supabase Anon Public Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={e => setSupabaseKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-extrabold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all"
              >
                Save Supabase Cloud Configuration
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
