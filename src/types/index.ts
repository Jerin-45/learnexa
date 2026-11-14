export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  name: string;
  level: ProficiencyLevel;
  years?: number;
  verified?: boolean;
}

export interface CareerRequirement {
  name: string;
  category: string;
  importance: 'Essential' | 'Important' | 'Nice to have';
  minLevel: ProficiencyLevel;
}

export interface RoadmapCourse {
  name: string;
  provider: string;
  url: string;
  duration: string;
  skillTarget?: string;
  associatedProject?: string;
}

export interface RoadmapProject {
  title: string;
  description: string;
  deliverables?: string[];
  techStack?: string[];
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  skill: string;
  duration: string;
  description: string;
  courses: RoadmapCourse[];
  tutorials: string[];
  project: RoadmapProject;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NEXT_UP' | 'LOCKED' | 'SKIPPED_OR_TESTED';
  priority?: 'HIGH' | 'MEDIUM' | 'COMPLETED';
  recommendedAction?: string;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  avgSalary: string;
  growthRate: string;
  difficulty: string;
  requiredSkills: CareerRequirement[];
  defaultRoadmap: RoadmapStep[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  education: string;
  careerGoal: string;
  skills: UserSkill[];
  experienceLevel: string;
  projects: string[];
  roadmapProgress: Record<string, { status: string; completedAt?: string; progress?: number }>;
  assessmentScores: Record<string, { score: number; maxScore: number; takenAt: string; percentage?: number }>;
  weeklyHours: number;
  streakDays: number;
}

export interface AgentLog {
  step: number;
  agent: string;
  role: string;
  timestamp: string;
  action: string;
  message: string;
  status: 'success' | 'running' | 'pending';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor' | 'agent';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  agentMeta?: {
    agentName: string;
    icon: string;
  };
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correctIndex?: number;
  explanation?: string;
}

export interface Assessment {
  skill: string;
  title: string;
  timeLimit: number;
  questions: AssessmentQuestion[];
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
