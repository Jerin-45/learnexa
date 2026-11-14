import { Career, UserProfile, AgentLog, RoadmapStep, Assessment } from '../types';

const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
const API_BASE = '/api';

// Helper to check if backend is reachable
let backendAvailable = !isGitHubPages;

async function checkBackend() {
  if (isGitHubPages) {
    backendAvailable = false;
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    backendAvailable = res.ok;
  } catch (err) {
    backendAvailable = false;
  }
}
checkBackend();

export const apiService = {
  // Careers
  async getCareers(): Promise<Career[]> {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/careers`);
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (e) {
        backendAvailable = false;
        console.warn('Backend unavailable, falling back to local dataset');
      }
    }
    const { DEFAULT_CAREERS } = await import('../data/mockData');
    return DEFAULT_CAREERS;
  },

  // Multi-Agent Collaboration Run
  async runAgentCollaboration(payload: {
    skills: any[];
    careerId: string;
    experienceLevel: string;
    projects: string[];
    roadmapProgress: Record<string, any>;
    assessmentScores: Record<string, any>;
    weeklyHours: number;
  }) {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/agents/collaborate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        backendAvailable = false;
        console.warn('Backend unavailable, generating collaboration output locally');
      }
    }

    // Client-side fallback multi-agent simulation
    const { generateLocalCollaboration } = await import('../data/mockData');
    return generateLocalCollaboration(payload);
  },

  // AI Mentor Chat
  async sendChatMessage(message: string, userContext: any) {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, userContext })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        backendAvailable = false;
        console.warn('Backend chat unavailable, using local conversational engine');
      }
    }

    const { generateLocalChatReply } = await import('../data/mockData');
    return generateLocalChatReply(message, userContext);
  },

  // Assessments
  async getAssessment(skill: string): Promise<Assessment | null> {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/assessments/${encodeURIComponent(skill)}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        backendAvailable = false;
        console.warn('Backend assessment unavailable, using local quiz');
      }
    }

    const { LOCAL_ASSESSMENTS } = await import('../data/mockData');
    return LOCAL_ASSESSMENTS[skill] || null;
  },

  async submitAssessment(skill: string, answers: Record<string, number>) {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/assessments/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skill, answers })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        backendAvailable = false;
        console.warn('Backend assessment submit unavailable, grading locally');
      }
    }

    const { gradeLocalAssessment } = await import('../data/mockData');
    return gradeLocalAssessment(skill, answers);
  }
};
