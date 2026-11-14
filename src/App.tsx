import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
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
import { CheckCircle2, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, notification } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar 
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage />}
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
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ProfileSettingsModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />

      {/* Global Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="px-5 py-3 rounded-2xl glass-panel border border-brand-500/40 text-slate-900 dark:text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
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
