import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  LayoutDashboard, 
  Compass, 
  GitFork, 
  Bot, 
  BarChart3, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  UserCircle, 
  ChevronDown,
  CheckCircle2,
  Wand2,
  Lock,
  LogOut,
  User
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'signup', defaultEmail?: string) => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenProfile }) => {
  const { 
    currentUser, 
    isAuthenticated,
    logout,
    navigateWithAuth,
    switchProfile, 
    activeTab, 
    setActiveTab, 
    darkMode, 
    toggleDarkMode, 
    toggleChat
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home', public: true },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, public: false },
    { id: 'skills', label: 'Skill Analysis', icon: Wand2, public: false },
    { id: 'careers', label: 'Career Matching', icon: Compass, public: false },
    { id: 'roadmap', label: 'Roadmap', icon: GitFork, public: true },
    { id: 'agents', label: 'Multi-Agent AI', icon: Bot, badge: '4 Agents', public: false },
    { id: 'progress', label: 'Progress & Quizzes', icon: BarChart3, public: false },
  ];

  const handleNavClick = (linkId: string) => {
    navigateWithAuth(linkId, () => onOpenAuth('signup'));
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Learn<span className="gradient-text font-black">exa</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                AI v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Autonomous Career Intelligence
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            const isLocked = !isAuthenticated && !link.public;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/50 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
                title={isLocked ? 'Register or Sign In to access' : link.label}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.label}</span>
                {isLocked && (
                  <Lock className="w-3 h-3 text-slate-400" />
                )}
                {link.badge && (
                  <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-1.5 py-0.2 rounded font-semibold">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* AI Mentor Chat Drawer Button */}
          <button
            onClick={toggleChat}
            className="relative px-3 py-1.5 rounded-xl text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/80 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all flex items-center gap-1.5 shadow-sm"
            title="Chat with AI Career Mentor"
          >
            <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden md:inline">Ask Mentor</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Conditional Profile / Auth Button */}
          {isAuthenticated ? (
            /* Logged-In User Profile Menu */
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-brand-500/30 bg-brand-50/50 dark:bg-brand-950/40 hover:bg-brand-100/60 dark:hover:bg-brand-900/40 transition-all shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[110px]">
                    {currentUser.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-brand-600 dark:text-brand-400 font-medium leading-none">
                    Active Student
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {currentUser.email}
                    </p>
                    <div className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                      Goal: {currentUser.careerGoal.replace('-', ' ')}
                    </div>
                  </div>

                  <div className="p-1.5 space-y-1">
                    <button
                      onClick={() => { setActiveTab('dashboard'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-600" />
                      <span>Student Dashboard</span>
                    </button>

                    <button
                      onClick={() => { onOpenProfile(); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserCircle className="w-4 h-4 text-purple-600" />
                      <span>Edit Profile & Skills</span>
                    </button>
                  </div>

                  {/* Switch Demo Personas for Quick Hackathon Testing */}
                  <div className="px-3 pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hackathon Demo Switcher:
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => { switchProfile('alex'); setProfileDropdownOpen(false); }}
                        className="py-1 px-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 text-slate-700 dark:text-slate-300 text-center"
                      >
                        Alex
                      </button>
                      <button
                        onClick={() => { switchProfile('sarah'); setProfileDropdownOpen(false); }}
                        className="py-1 px-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 text-slate-700 dark:text-slate-300 text-center"
                      >
                        Sarah
                      </button>
                      <button
                        onClick={() => { switchProfile('david'); setProfileDropdownOpen(false); }}
                        className="py-1 px-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 text-slate-700 dark:text-slate-300 text-center"
                      >
                        David
                      </button>
                    </div>
                  </div>

                  {/* Log Out Button */}
                  <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800 px-2">
                    <button
                      onClick={() => { logout(); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated Visitor Controls */
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold gradient-brand text-white shadow-md shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all"
              >
                Sign Up Free
              </button>
            </div>
          )}

          {/* Quick Dashboard Entry Button */}
          {activeTab === 'landing' && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAuthenticated
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {!isAuthenticated && <Lock className="w-3.5 h-3.5 text-slate-400" />}
              <span>Dashboard</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-200">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            const isLocked = !isAuthenticated && !link.public;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive
                    ? 'gradient-brand text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isLocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                  {link.badge && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-1.5 py-0.5 rounded font-semibold">
                      {link.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>{currentUser.name} ({currentUser.careerGoal})</span>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-rose-500 text-xs font-bold hover:underline"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-xl text-xs font-bold gradient-brand text-white text-center shadow-sm"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
