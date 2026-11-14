import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { CAREERS_DATA } from './data/careers.js';
import { ASSESSMENTS_DATA } from './data/assessments.js';
import { MultiAgentSystem } from './agents/orchestrator.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static frontend build if available
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

const agentSystem = new MultiAgentSystem(process.env.GEMINI_API_KEY);

// Demo user storage in memory
const DEMO_USERS = [
  {
    id: "usr_alex_01",
    name: "Alex Morgan",
    email: "alex.morgan@stanford.edu",
    education: "B.S. in Computer Science (Junior)",
    careerGoal: "full-stack-developer",
    skills: [
      { name: "HTML & CSS", level: "Advanced", years: 2 },
      { name: "JavaScript", level: "Intermediate", years: 1.5 },
      { name: "Git & Version Control", level: "Intermediate", years: 1 }
    ],
    experienceLevel: "Intermediate",
    projects: [
      "Personal Portfolio Site (HTML/CSS/JS)",
      "Weather Forecaster App (Fetch API)"
    ],
    roadmapProgress: {
      "step-1": { status: "COMPLETED", completedAt: "2025-01-10" },
      "step-2": { status: "IN_PROGRESS", progress: 65 }
    },
    assessmentScores: {
      "JavaScript": { score: 3, maxScore: 4, takenAt: "2025-01-12" }
    },
    weeklyHours: 14,
    streakDays: 8
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'Learnexa Core Service',
    version: '1.0.0',
    agentsOnline: [
      'Skill Analysis Agent',
      'Career Guidance Agent',
      'Learning Recommendation Agent',
      'Progress Evaluation Agent'
    ],
    timestamp: new Date().toISOString()
  });
});

// Careers Endpoints
app.get('/api/careers', (req, res) => {
  res.json({ success: true, count: CAREERS_DATA.length, data: CAREERS_DATA });
});

app.get('/api/careers/:id', (req, res) => {
  const career = CAREERS_DATA.find(c => c.id === req.params.id);
  if (!career) {
    return res.status(404).json({ success: false, message: 'Career path not found' });
  }
  res.json({ success: true, data: career });
});

// Multi-Agent Pipeline Collaboration
app.post('/api/agents/collaborate', async (req, res) => {
  try {
    const payload = req.body || {};
    const result = await agentSystem.runCollaborationPipeline(payload);
    res.json(result);
  } catch (error) {
    console.error('Error in agent collaboration:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI Mentor Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], userContext = {} } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const {
      name = "Learner",
      careerGoal = "Full Stack Developer",
      skills = [],
      missingSkills = [],
      completionRate = 25
    } = userContext;

    // Intelligent AI response generation
    const lower = message.toLowerCase();
    let reply = "";
    let suggestedActions = [];

    if (lower.includes("gap") || lower.includes("missing")) {
      const topMissing = missingSkills.length > 0 
        ? missingSkills.map(s => typeof s === 'string' ? s : s.name).slice(0, 3).join(', ')
        : "React.js, Node.js, and Database Architecture";
      reply = `Hello ${name}! Looking closely at your path toward becoming a **${careerGoal}**, your most critical skill gaps right now are: **${topMissing}**.\n\nOur Learning Recommendation Agent suggests focusing on React component state first before jumping into backend services. Would you like me to add an intensive practical project to your roadmap?`;
      suggestedActions = [
        "Show me React exercises",
        "How do I learn Databases faster?",
        "Take a Skill Assessment"
      ];
    } else if (lower.includes("career") || lower.includes("switch") || lower.includes("goal")) {
      reply = `You're currently targeted for **${careerGoal}**. Switching or exploring alternative paths is seamless on Learnexa! \n\nFor example, if you consider **AI Engineer**, your analytical skills will carry over, but you will need Python and Deep Learning foundations. If you look at **UI/UX Designer**, your HTML/CSS experience is an enormous asset.\n\nWould you like to compare side-by-side or switch your target role now?`;
      suggestedActions = [
        "Compare Full Stack vs AI Engineer",
        "Switch goal to Data Scientist",
        "Keep current goal"
      ];
    } else if (lower.includes("project") || lower.includes("portfolio")) {
      reply = `Building hands-on projects is the single highest-impact way to prove competence to employers! For your current stage in **${careerGoal}**, I recommend building:
1. **Full Stack Collaborative Workspace** (React + Express + PostgreSQL + WebSockets)
2. **Interactive SaaS Analytics Dashboard** with real-time chart visualizations.
3. **Secure REST API with JWT Auth and Rate Limiting**.

Which one would you like to build first? I can generate a complete step-by-step milestone checklist for you!`;
      suggestedActions = [
        "Generate SaaS Dashboard Spec",
        "Generate REST API Checklist",
        "How to deploy on Docker/AWS?"
      ];
    } else if (lower.includes("quiz") || lower.includes("assessment") || lower.includes("test")) {
      reply = `Skill assessments validate your knowledge and automatically adjust your roadmap velocity! \n\nWe have active quizzes available for **JavaScript**, **React.js**, **Node.js**, and **Python**. Scoring 80%+ will unlock the 'Skill Mastery' achievement badge and mark prerequisite milestones as completed!`;
      suggestedActions = [
        "Start JavaScript Assessment",
        "Start React.js Assessment",
        "Check my current badges"
      ];
    } else {
      reply = `Great question, ${name}! As your dedicated Learnexa AI Mentor, I'm here to ensure you stay ahead of your learning milestones for **${careerGoal}**.\n\nWith a current completion rate of **${completionRate}%**, you're making steady headway. Our four AI agents are continually monitoring your progress, quiz scores, and practice hours to calibrate your personal roadmap.\n\nWhat would you like to conquer today?`;
      suggestedActions = [
        "What should I study today?",
        "Review my skill gaps",
        "Take a quiz to boost score"
      ];
    }

    res.json({
      success: true,
      sender: "Learnexa AI Mentor",
      reply,
      suggestedActions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Assessments
app.get('/api/assessments/:skill', (req, res) => {
  const { skill } = req.params;
  const assessment = ASSESSMENTS_DATA[skill];
  if (!assessment) {
    return res.status(404).json({ success: false, message: `Assessment not found for skill: ${skill}` });
  }
  // Strip correct answer from student view
  const safeQuestions = assessment.questions.map(q => ({
    id: q.id,
    question: q.question,
    code: q.code,
    options: q.options
  }));

  res.json({
    success: true,
    skill: assessment.skill,
    title: assessment.title,
    timeLimit: assessment.timeLimit,
    questions: safeQuestions
  });
});

app.post('/api/assessments/submit', (req, res) => {
  const { skill, answers = {} } = req.body;
  const assessment = ASSESSMENTS_DATA[skill];
  if (!assessment) {
    return res.status(404).json({ success: false, message: `Assessment not found for ${skill}` });
  }

  let score = 0;
  const total = assessment.questions.length;
  const breakdown = [];

  assessment.questions.forEach((q, idx) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    if (isCorrect) score += 1;
    breakdown.push({
      questionId: q.id,
      question: q.question,
      userAnswer,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    });
  });

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  let proficiency = "Beginner";
  if (percentage >= 90) proficiency = "Advanced / Master";
  else if (percentage >= 70) proficiency = "Intermediate";
  else if (percentage >= 50) proficiency = "Developing";

  res.json({
    success: true,
    skill,
    score,
    total,
    percentage,
    passed,
    proficiency,
    breakdown,
    feedback: passed 
      ? `Outstanding work! You scored ${percentage}% and verified ${proficiency} proficiency in ${skill}.`
      : `You scored ${percentage}%. Review the explanations below and re-test to upgrade your proficiency level.`
  });
});

// Mock Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = DEMO_USERS.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || DEMO_USERS[0];
  res.json({
    success: true,
    token: "mock-jwt-token-learnexa-" + Date.now(),
    user
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, education, careerGoal, skills = [] } = req.body;
  const newUser = {
    id: "usr_" + Math.random().toString(36).substring(2, 9),
    name: name || "New Learner",
    email: email || "user@example.com",
    education: education || "Self-taught / University",
    careerGoal: careerGoal || "full-stack-developer",
    skills: skills.length > 0 ? skills : [{ name: "HTML & CSS", level: "Beginner", years: 0.5 }],
    experienceLevel: "Beginner",
    projects: [],
    roadmapProgress: {},
    assessmentScores: {},
    weeklyHours: 10,
    streakDays: 1
  };
  DEMO_USERS.push(newUser);
  res.json({
    success: true,
    token: "mock-jwt-token-learnexa-" + Date.now(),
    user: newUser
  });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Learnexa Full-Stack Server listening on http://localhost:${PORT}`);
});
