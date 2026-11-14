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
  XAxis, 
  YAxis, 
  Tooltip, 
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
    { skill: "Node.js", title: "Node.js Architecture & Event Loop", duration: "10 mins", questions: 2 },
    { skill: "Python", title: "Python Computational Structures & Logic", duration: "10 mins", questions: 2 }
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
      name: "Career Pioneer",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-neutral font-mono">
              Telemetry • Velocity & Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Progress Tracking & Skill Verification
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Quantify your career momentum, take skill assessments, and unlock verifiable credential badges.
          </p>
        </div>

        <button
          onClick={() => openAssessment('JavaScript')}
          className="btn-primary"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Take Skill Assessment</span>
        </button>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="panel rounded-xl p-5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-neutral-400">Roadmap Progress</span>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">{completionPercentage}%</p>
          <p className="text-xs text-neutral-500">{completedSteps} of {totalSteps} milestones done</p>
        </div>

        <div className="panel rounded-xl p-5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-neutral-400">Target Match</span>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">{matchPercentage}%</p>
          <p className="text-xs text-neutral-500">{currentCareer.title}</p>
        </div>

        <div className="panel rounded-xl p-5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-neutral-400">Weekly Pace</span>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">{currentUser.weeklyHours}h</p>
          <p className="text-xs text-neutral-500">Accelerated Velocity</p>
        </div>

        <div className="panel rounded-xl p-5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-neutral-400">Study Streak</span>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{currentUser.streakDays} Days</span>
          </p>
          <p className="text-xs text-neutral-500">Unbroken consistency</p>
        </div>
      </div>

      {/* Interactive Skill Assessment Quizzes Hub */}
      <div className="panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-neutral-500" />
              <span>Interactive Skill Quizzes</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verify competencies with real questions. Scoring 70%+ updates your profile and unlocks achievement badges.
            </p>
          </div>
          <span className="badge-neutral font-mono text-[10px]">
            Automated Grading
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {availableQuizzes.map(quiz => {
            const userScore = currentUser.assessmentScores[quiz.skill];

            return (
              <div 
                key={quiz.skill}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between space-y-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900 dark:text-white">{quiz.skill}</span>
                    <span className="text-[10px] font-mono text-neutral-400">{quiz.duration}</span>
                  </div>
                  <h4 className="text-xs text-neutral-600 dark:text-neutral-300 leading-snug">
                    {quiz.title}
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-400">{quiz.questions} Questions</p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                  {userScore ? (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 text-[11px]">Score:</span>
                      <span className="badge-success text-[10px] font-mono">
                        {userScore.percentage || Math.round((userScore.score / userScore.maxScore) * 100)}% Pass
                      </span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-neutral-400 italic">Not yet attempted</p>
                  )}

                  <button
                    onClick={() => openAssessment(quiz.skill)}
                    className="btn-primary w-full py-1.5 text-[11px]"
                  >
                    <span>{userScore ? 'Retake Quiz' : 'Start Assessment'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Matrix */}
      <div className="panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-neutral-500" />
              <span>Verifiable Achievement Badges</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">Proof-of-work milestones earned through verified progress</p>
          </div>
          <span className="badge-neutral font-mono text-[10px]">
            {allBadges.filter(b => b.unlocked).length} / {allBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {allBadges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all ${
                badge.unlocked
                  ? 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#121212] shadow-xs'
                  : 'border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/20 opacity-60'
              }`}
            >
              <div className="text-2xl shrink-0 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                {badge.icon}
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {badge.name}
                  </h4>
                  {badge.unlocked ? (
                    <span className="badge-success text-[9px] py-0">Unlocked</span>
                  ) : (
                    <Lock className="w-3 h-3 text-neutral-400" />
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                  {badge.description}
                </p>
                <p className="text-[10px] font-mono text-neutral-400 mt-1">
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
