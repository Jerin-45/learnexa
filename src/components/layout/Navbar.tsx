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
  onOpenAuth: (mode?: 'login' | 'signup' | 'forgot', defaultEmail?: string) => void;
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
    <header className="sticky top-0 z-40 w-full glass-header transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none py-2"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white dark:text-black" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white">
              Learnexa
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 font-semibold border border-neutral-200 dark:border-neutral-700">
              AI
            </span>
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
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/90 font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
                }`}
                title={isLocked ? 'Register or Sign In to access' : link.label}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{link.label}</span>
                {isLocked && (
                  <Lock className="w-2.5 h-2.5 text-neutral-400" />
                )}
                {link.badge && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Mentor Chat Drawer Button */}
          <button
            onClick={toggleChat}
            className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"
            title="Chat with AI Career Mentor"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ask Mentor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-neutral-300" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          {/* Conditional Profile / Auth Button */}
          {isAuthenticated ? (
            /* Logged-In User Profile Menu */
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-all shadow-xs"
              >
                <div className="w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-[11px] font-bold">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </p>
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl panel shadow-elevated dark:shadow-elevated-dark py-1.5 z-50 animate-scale-in"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-neutral-100 dark:border-neutral-800">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {currentUser.email}
                    </p>
                    <div className="mt-1 inline-block text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {currentUser.careerGoal.replace('-', ' ')}
                    </div>
                  </div>

                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => { setActiveTab('dashboard'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Student Dashboard</span>
                    </button>

                    <button
                      onClick={() => { onOpenProfile(); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <UserCircle className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Edit Profile & Skills</span>
                    </button>
                  </div>

                  {/* Demo Switcher */}
                  <div className="px-3 pt-2 pb-1 border-t border-neutral-100 dark:border-neutral-800">
                    <p className="text-[10px] font-mono uppercase text-neutral-400 mb-1">
                      Test Personas:
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => { switchProfile('alex'); setProfileDropdownOpen(false); }}
                        className="py-1 px-1 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-center"
                      >
                        Alex
                      </button>
                      <button
                        onClick={() => { switchProfile('sarah'); setProfileDropdownOpen(false); }}
                        className="py-1 px-1 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-center"
                      >
                        Sarah
                      </button>
                      <button
                        onClick={() => { switchProfile('david'); setProfileDropdownOpen(false); }}
                        className="py-1 px-1 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-center"
                      >
                        David
                      </button>
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-1 mt-1 border-t border-neutral-100 dark:border-neutral-800 px-1">
                    <button
                      onClick={() => { logout(); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated Visitor Controls */
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="btn-ghost"
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="btn-primary"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Quick Dashboard Entry Button */}
          {activeTab === 'landing' && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="btn-secondary hidden sm:inline-flex"
            >
              {!isAuthenticated && <Lock className="w-3 h-3 text-neutral-400" />}
              <span>Dashboard</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden panel border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 pb-4 space-y-1 animate-slide-up">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            const isLocked = !isAuthenticated && !link.public;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isLocked && <Lock className="w-3 h-3 text-neutral-400" />}
                  {link.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {link.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            {isAuthenticated ? (
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {currentUser.name}
                </span>
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-rose-600 dark:text-rose-400 font-medium hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="btn-secondary w-full py-2 text-xs"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="btn-primary w-full py-2 text-xs"
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
