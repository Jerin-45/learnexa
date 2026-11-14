import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Preloader } from './components/common/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { SkillAnalysis } from './components/skills/SkillAnalysis';
import { CareerMatching } from './components/careers/CareerMatching';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { MultiAgentVisualizer } from './components/agents/MultiAgentVisualizer';
import { ProgressTracking } from './components/progress/ProgressTracking';
import { MentorChatbot } from './components/chat/MentorChatbot';
import { AssessmentModal } from './components/assessment/AssessmentModal';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileSettingsModal } from './components/profile/ProfileSettingsModal';
import { Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, isAuthenticated, notification, showNotification } = useApp();
  const [authModal, setAuthModal] = useState<{ 
    isOpen: boolean; 
    mode: 'login' | 'signup' | 'forgot';
    defaultEmail?: string;
  }>({ isOpen: false, mode: 'signup', defaultEmail: '' });
  
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const openAuth = (mode: 'login' | 'signup' | 'forgot' = 'signup', defaultEmail: string = '') => {
    setAuthModal({ isOpen: true, mode, defaultEmail });
  };

  // Route protection: If user is not authenticated and tries to visit protected tabs
  useEffect(() => {
    if (!isAuthenticated && !['landing', 'roadmap'].includes(activeTab)) {
      setActiveTab('landing');
      setAuthModal({ isOpen: true, mode: 'signup', defaultEmail: '' });
      showNotification('Please register your student details or sign in to access your dashboard!');
    }
  }, [isAuthenticated, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#171717] dark:text-[#EDEDED] antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      
      {/* Premium Startup Preloader */}
      <Preloader />

      {/* Top Navbar */}
      <Navbar 
        onOpenAuth={openAuth}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage onOpenAuth={openAuth} />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'skills' && <SkillAnalysis />}
        {activeTab === 'careers' && <CareerMatching />}
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'agents' && <MultiAgentVisualizer />}
        {activeTab === 'progress' && <ProgressTracking />}
      </main>

      {/* Floating AI Mentor Chatbot */}
      <MentorChatbot />

      {/* Modals */}
      <AssessmentModal />
      <AuthModal 
        isOpen={authModal.isOpen} 
        initialMode={authModal.mode} 
        initialEmail={authModal.defaultEmail}
        onClose={() => setAuthModal(prev => ({ ...prev, isOpen: false }))} 
      />
      <ProfileSettingsModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up pointer-events-none">
          <div className="px-4 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-modal dark:shadow-modal-dark flex items-center gap-2 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
