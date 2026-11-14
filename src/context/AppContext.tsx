import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Career, RoadmapStep, AgentLog, UserSkill } from '../types';
import { DEFAULT_CAREERS, DEMO_PROFILES, generateLocalCollaboration } from '../data/mockData';
import { apiService } from '../services/api';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  registerUser: (details: {
    name: string;
    email: string;
    education?: string;
    experienceLevel?: string;
    careerGoal?: string;
    skills?: UserSkill[];
  }) => void;
  loginUser: (email: string, name?: string) => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  switchProfile: (profileKey: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigateWithAuth: (tab: string, onRequireAuth?: () => void) => void;
  careers: Career[];
  currentCareer: Career;
  setCareerGoal: (careerId: string) => void;
  activeRoadmap: RoadmapStep[];
  updateStepStatus: (stepId: string, status: RoadmapStep['status']) => void;
  agentData: any;
  runCollaboration: (customPayload?: any) => Promise<void>;
  isAnalyzing: boolean;
  isChatOpen: boolean;
  toggleChat: () => void;
  activeAssessmentSkill: string | null;
  openAssessment: (skill: string) => void;
  closeAssessment: () => void;
  onAssessmentCompleted: (skill: string, result: any) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  addSkill: (skill: UserSkill) => void;
  removeSkill: (skillName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if authenticated, default to false for new visitors so they must sign up / register
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('learnexa_is_authenticated') === 'true';
  });

  // Load saved user or default to Alex Morgan
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('learnexa_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEMO_PROFILES.alex;
  });

  const [activeTab, setActiveTab] = useState<string>('landing');
  const [careers, setCareers] = useState<Career[]>(DEFAULT_CAREERS);
  const [agentData, setAgentData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [activeAssessmentSkill, setActiveAssessmentSkill] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return (localStorage.getItem('learnexa_theme') || localStorage.getItem('skillpath_theme')) === 'dark';
  });
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('learnexa_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('learnexa_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('learnexa_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const currentCareer = careers.find(c => c.id === currentUser.careerGoal) || careers[0];

  // Active roadmap derived from agent data or career default merged with user progress
  const activeRoadmap: RoadmapStep[] = (agentData?.learningRoadmap || currentCareer.defaultRoadmap).map((step: RoadmapStep) => {
    const userProgress = currentUser.roadmapProgress[step.id];
    if (userProgress) {
      return { ...step, status: userProgress.status as any };
    }
    return step;
  });

  // Run the multi-agent collaboration pipeline
  const runCollaboration = async (customPayload?: any) => {
    setIsAnalyzing(true);
    try {
      const payload = customPayload || {
        skills: currentUser.skills,
        careerId: currentUser.careerGoal,
        experienceLevel: currentUser.experienceLevel,
        projects: currentUser.projects,
        roadmapProgress: currentUser.roadmapProgress,
        assessmentScores: currentUser.assessmentScores,
        weeklyHours: currentUser.weeklyHours
      };

      const result = await apiService.runAgentCollaboration(payload);
      setAgentData(result);
      showNotification('Multi-Agent Analysis complete! Your roadmap has been updated.');
    } catch (err) {
      console.error(err);
      // Fallback
      const localResult = generateLocalCollaboration({
        skills: currentUser.skills,
        careerId: currentUser.careerGoal,
        roadmapProgress: currentUser.roadmapProgress,
        assessmentScores: currentUser.assessmentScores,
        weeklyHours: currentUser.weeklyHours
      });
      setAgentData(localResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Initial collaboration run on startup
  useEffect(() => {
    runCollaboration();
  }, [currentUser.careerGoal]);

  const registerUser = (details: {
    name: string;
    email: string;
    education?: string;
    experienceLevel?: string;
    careerGoal?: string;
    skills?: UserSkill[];
  }) => {
    const defaultSkills: UserSkill[] = details.skills && details.skills.length > 0
      ? details.skills
      : [
          { name: "HTML & CSS", level: "Beginner", years: 0.5, verified: false },
          { name: "JavaScript", level: "Beginner", years: 0.5, verified: false }
        ];

    const newUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: details.name.trim() || "Student Learner",
      email: details.email.trim(),
      education: details.education || "University Student",
      careerGoal: details.careerGoal || "full-stack-developer",
      skills: defaultSkills,
      experienceLevel: details.experienceLevel || "Beginner",
      projects: ["Initial Portfolio Project"],
      roadmapProgress: {},
      assessmentScores: {},
      weeklyHours: 12,
      streakDays: 1
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('learnexa_is_authenticated', 'true');
    localStorage.setItem('learnexa_user', JSON.stringify(newUser));
    setActiveTab('dashboard');

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
    showNotification(`Welcome to Learnexa, ${newUser.name}! Your personalized roadmap has been initialized 🚀`);

    runCollaboration({
      skills: newUser.skills,
      careerId: newUser.careerGoal,
      experienceLevel: newUser.experienceLevel,
      projects: newUser.projects,
      roadmapProgress: {},
      assessmentScores: {},
      weeklyHours: 12
    });
  };

  const loginUser = (email: string, name?: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('learnexa_is_authenticated', 'true');
    if (name) {
      setCurrentUser(prev => ({ ...prev, name, email }));
    } else {
      setCurrentUser(prev => ({ ...prev, email }));
    }
    setActiveTab('dashboard');
    showNotification(`Welcome back, ${name || currentUser.name}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('learnexa_is_authenticated', 'false');
    setActiveTab('landing');
    showNotification('You have signed out. Welcome back anytime!');
  };

  const navigateWithAuth = (tab: string, onRequireAuth?: () => void) => {
    // Anyone can freely view Home ('landing') and Roadmaps ('roadmap')
    if (tab === 'landing' || tab === 'roadmap') {
      setActiveTab(tab);
      return;
    }

    // Entering Dashboard, Skills, Careers, Progress requires authentication
    if (isAuthenticated) {
      setActiveTab(tab);
    } else {
      showNotification('Please register your student details or sign in to enter your dashboard!');
      if (onRequireAuth) {
        onRequireAuth();
      }
    }
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    showNotification('Profile updated successfully!');
  };

  const switchProfile = (profileKey: string) => {
    if (DEMO_PROFILES[profileKey]) {
      setCurrentUser(DEMO_PROFILES[profileKey]);
      setIsAuthenticated(true);
      localStorage.setItem('learnexa_is_authenticated', 'true');
      showNotification(`Loaded demo profile: ${DEMO_PROFILES[profileKey].name}!`);
    }
  };

  const setCareerGoal = (careerId: string) => {
    setCurrentUser(prev => ({ ...prev, careerGoal: careerId }));
    showNotification(`Target career updated to ${careers.find(c => c.id === careerId)?.title || careerId}! Recalibrating roadmap...`);
  };

  const updateStepStatus = (stepId: string, status: RoadmapStep['status']) => {
    setCurrentUser(prev => {
      const updatedProgress = {
        ...prev.roadmapProgress,
        [stepId]: {
          status,
          completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined
        }
      };
      return { ...prev, roadmapProgress: updatedProgress };
    });

    if (status === 'COMPLETED') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      showNotification('Milestone completed! Great progress towards your career goal! 🚀');
    }
  };

  const addSkill = (newSkill: UserSkill) => {
    if (currentUser.skills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      showNotification(`${newSkill.name} is already in your skills profile.`);
      return;
    }
    setCurrentUser(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    showNotification(`Added ${newSkill.name} to your profile! Recalculating gaps...`);
  };

  const removeSkill = (skillName: string) => {
    setCurrentUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase())
    }));
    showNotification(`Removed ${skillName} from your profile.`);
  };

  const toggleChat = () => setIsChatOpen(prev => !prev);
  const openAssessment = (skill: string) => setActiveAssessmentSkill(skill);
  const closeAssessment = () => setActiveAssessmentSkill(null);

  const onAssessmentCompleted = (skill: string, result: any) => {
    setCurrentUser(prev => {
      // Mark skill as verified in user profile
      const updatedSkills = prev.skills.map(s => {
        if (s.name.toLowerCase() === skill.toLowerCase()) {
          return { ...s, verified: true, level: (result.proficiency?.includes('Advanced') ? 'Advanced' : 'Intermediate') as any };
        }
        return s;
      });

      // If user didn't have the skill, add it
      if (!updatedSkills.some(s => s.name.toLowerCase() === skill.toLowerCase())) {
        updatedSkills.push({
          name: skill,
          level: (result.proficiency?.includes('Advanced') ? 'Advanced' : 'Intermediate') as any,
          years: 1,
          verified: true
        });
      }

      return {
        ...prev,
        skills: updatedSkills,
        assessmentScores: {
          ...prev.assessmentScores,
          [skill]: {
            score: result.score,
            maxScore: result.total,
            percentage: result.percentage,
            takenAt: new Date().toISOString()
          }
        }
      };
    });

    if (result.passed) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
      showNotification(`🎉 Congratulations! You scored ${result.percentage}% in ${skill} and unlocked Skill Mastery!`);
    } else {
      showNotification(`Assessment recorded: ${result.percentage}%. Review guidance and re-attempt to advance.`);
    }

    // Trigger adaptive recalculation
    setTimeout(() => {
      runCollaboration();
    }, 500);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        registerUser,
        loginUser,
        logout,
        updateCurrentUser,
        switchProfile,
        activeTab,
        setActiveTab,
        navigateWithAuth,
        careers,
        currentCareer,
        setCareerGoal,
        activeRoadmap,
        updateStepStatus,
        agentData,
        runCollaboration,
        isAnalyzing,
        isChatOpen,
        toggleChat,
        activeAssessmentSkill,
        openAssessment,
        closeAssessment,
        onAssessmentCompleted,
        darkMode,
        toggleDarkMode,
        notification,
        showNotification,
        addSkill,
        removeSkill
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
