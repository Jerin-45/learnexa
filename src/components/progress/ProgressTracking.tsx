import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Zap, 
  TrendingUp, 
  Target, 
  Play, 
  Star, 
  Calendar,
  Lock,
  ArrowRight,
  FileCheck2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

export const ProgressTracking: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    activeRoadmap, 
    agentData, 
    openAssessment, 
    setActiveTab 
  } = useApp();

  const completedSteps = activeRoadmap.filter(s => s.status === 'COMPLETED').length;
  const totalSteps = activeRoadmap.length;
  const completionPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const matchPercentage = agentData?.careerMatch?.matchPercentage ?? 68;

  // Assessments list
  const availableQuizzes = [
    { skill: "JavaScript", title: "JavaScript ES6+ & Core Architecture", duration: "10 mins", questions: 4 },
    { skill: "React.js", title: "React Component Architecture & Hooks", duration: "10 mins", questions: 3 },
    { skill: "Node.js", title: "Node.js Architecture & Streams", duration: "10 mins", questions: 2 },
    { skill: "Python", title: "Python Data Structures & Computational Logic", duration: "10 mins", questions: 2 }
  ];

  // Badges
  const allBadges = [
    {
      id: "b1",
      name: "First Milestone",
      description: "Completed your first roadmap milestone",
      icon: "🚀",
      unlocked: completedSteps >= 1,
      criteria: "Complete 1 Step"
    },
    {
      id: "b2",
      name: "Velocity Builder",
      description: "Completed 3 or more roadmap milestones",
      icon: "⚡",
      unlocked: completedSteps >= 3,
      criteria: "Complete 3 Steps"
    },
    {
      id: "b3",
      name: "Skill Mastery",
      description: "Achieved 75%+ on a verified skill assessment",
      icon: "🏆",
      unlocked: Object.values(currentUser.assessmentScores).some(a => (a.percentage || 0) >= 75),
      criteria: "Score 75%+ on Quiz"
    },
    {
      id: "b4",
      name: "Consistency Champion",
      description: "Logged 10+ hours of dedicated learning this week",
      icon: "🔥",
      unlocked: currentUser.weeklyHours >= 10,
      criteria: "10+ Hours/Week"
    },
    {
      id: "b5",
      name: "Full Stack Pioneer",
      description: "Conquered 70%+ of complete career readiness criteria",
      icon: "🌟",
      unlocked: matchPercentage >= 70,
      criteria: "70%+ Career Match"
    },
    {
      id: "b6",
      name: "Capstone Architect",
      description: "Complete all milestones and final capstone deploy",
      icon: "🎓",
      unlocked: completedSteps === totalSteps && totalSteps > 0,
      criteria: "Finish All Steps"
    }
  ];

  // Learning progression trend over last 4 weeks
  const trendData = [
    { week: 'Week 1', completion: 15, hours: 8 },
    { week: 'Week 2', completion: 28, hours: 12 },
    { week: 'Week 3', completion: 45, hours: 14 },
    { week: 'Week 4', completion: completionPercentage, hours: currentUser.weeklyHours },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Velocity & Verification Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Progress Tracking & Skill Verification
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Quantify your career momentum, take skill quizzes, and unlock verifiable achievement badges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openAssessment('JavaScript')}
            className="px-5 py-2.5 rounded-xl font-bold text-xs gradient-brand shadow-lg shadow-brand-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-white" />
            <span>Take Skill Assessment</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Completion</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{completionPercentage}%</p>
          <p className="text-xs text-slate-500">{completedSteps} of {totalSteps} milestones achieved</p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Match Score</span>
          <p className="text-3xl font-black text-brand-600 dark:text-brand-400">{matchPercentage}%</p>
          <p className="text-xs text-slate-500">{currentCareer.title}</p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weekly Commitment</span>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{currentUser.weeklyHours} hrs</p>
          <p className="text-xs text-slate-500">Accelerated Velocity</p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Study Streak</span>
          <p className="text-3xl font-black text-amber-500 flex items-center gap-1.5">
            <Flame className="w-7 h-7 fill-amber-500" />
            {currentUser.streakDays} Days
          </p>
          <p className="text-xs text-slate-500">Unbroken study discipline</p>
        </div>
      </div>

      {/* Interactive Skill Assessment Quizzes Hub */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Interactive Skill Assessment Quizzes
            </h3>
            <p className="text-xs text-slate-500">
              Verify competencies with real-world questions. Scoring 70%+ automatically updates your profile and unlocks badges.
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
            Instant grading & feedback
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableQuizzes.map(quiz => {
            const userScore = currentUser.assessmentScores[quiz.skill];

            return (
              <div 
                key={quiz.skill}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between space-y-4 hover:border-brand-500/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-brand-600 dark:text-brand-400">{quiz.skill}</span>
                    <span className="text-[10px] text-slate-400">{quiz.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {quiz.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">{quiz.questions} Architecture Questions</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  {userScore ? (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Last Score:</span>
                      <span className="font-extrabold text-emerald-500">
                        {userScore.percentage || Math.round((userScore.score / userScore.maxScore) * 100)}% Verified
                      </span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400">Not yet verified</p>
                  )}

                  <button
                    onClick={() => openAssessment(quiz.skill)}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/70 hover:text-brand-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{userScore ? 'Retake Quiz' : 'Start Assessment'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Analytics Chart */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              Monthly Growth & Mastery Trend
            </h3>
            <p className="text-xs text-slate-500">Velocity curve tracking cumulative skill milestone completion</p>
          </div>
          <span className="text-xs font-bold text-emerald-500">+30% MoM Acceleration</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#1e293b', 
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#6366f1" 
                strokeWidth={3} 
                dot={{ fill: '#a855f7', strokeWidth: 2, r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Achievement Badges & Micro-Credentials
            </h3>
            <p className="text-xs text-slate-500">Gamified milestone unlocks based on real performance</p>
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            {allBadges.filter(b => b.unlocked).length} of {allBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map(badge => (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.unlocked 
                  ? 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/60 shadow-sm' 
                  : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                badge.unlocked 
                  ? 'bg-gradient-to-br from-purple-500 to-brand-500 text-white shadow-md' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {badge.icon}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {badge.name}
                  </h4>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded">
                      Earned ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {badge.description}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold pt-1">
                  Req: {badge.criteria}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
