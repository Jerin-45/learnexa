import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Award, 
  Flame, 
  Zap, 
  Play, 
  ExternalLink,
  ChevronRight,
  Target,
  BarChart2,
  Compass
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    activeRoadmap, 
    agentData, 
    setActiveTab, 
    updateStepStatus, 
    openAssessment,
    toggleChat
  } = useApp();

  // Compute metrics
  const completedSteps = activeRoadmap.filter(s => s.status === 'COMPLETED').length;
  const totalSteps = activeRoadmap.length;
  const roadmapCompletionRate = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const matchPercentage = agentData?.careerMatch?.matchPercentage ?? 68;
  const missingSkills = agentData?.careerMatch?.missingSkills ?? [
    { name: "React.js", importance: "Essential" },
    { name: "Node.js", importance: "Essential" },
    { name: "Database Management", importance: "Essential" }
  ];

  // Active step (the first step that is IN_PROGRESS or NEXT_UP)
  const currentActiveStep = activeRoadmap.find(s => s.status === 'IN_PROGRESS' || s.status === 'NEXT_UP') || activeRoadmap[0];

  // Weekly Activity Chart Data
  const weeklyStudyData = [
    { day: 'Mon', hours: 2.5, completedTasks: 2 },
    { day: 'Tue', hours: 3.0, completedTasks: 3 },
    { day: 'Wed', hours: 1.5, completedTasks: 1 },
    { day: 'Thu', hours: 3.5, completedTasks: 4 },
    { day: 'Fri', hours: 2.0, completedTasks: 2 },
    { day: 'Sat', hours: 4.0, completedTasks: 5 },
    { day: 'Sun', hours: 2.5, completedTasks: 3 },
  ];

  // Skill Competency Radar / Bar Data
  const skillDistributionData = [
    { category: 'Frontend', score: 85 },
    { category: 'JavaScript', score: 75 },
    { category: 'Backend', score: 45 },
    { category: 'Databases', score: 35 },
    { category: 'DevOps & Git', score: 65 },
    { category: 'AI Tools', score: 50 },
  ];

  // Recommended courses from active step and missing skills
  const recommendedCourses = (currentActiveStep?.courses || []).concat(
    (agentData?.recommendedCourses || []).slice(0, 3)
  ).slice(0, 4);

  // Upcoming activities
  const upcomingActivities = [
    {
      id: 'act-1',
      title: `${currentActiveStep?.skill || 'JavaScript'} Practice Quiz`,
      type: 'Assessment',
      dueDate: 'Tomorrow',
      action: () => openAssessment(currentActiveStep?.skill || 'JavaScript')
    },
    {
      id: 'act-2',
      title: `Build Milestone Project: ${currentActiveStep?.project?.title || 'SaaS Dashboard'}`,
      type: 'Project',
      dueDate: 'In 3 days',
      action: () => setActiveTab('roadmap')
    },
    {
      id: 'act-3',
      title: 'Review System Architecture with AI Mentor',
      type: 'Mentor Session',
      dueDate: 'This Weekend',
      action: () => toggleChat()
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl gradient-brand-subtle border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-brand-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Role: {currentCareer.title}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your 4 AI agents evaluated your latest progress. You are currently on track with an 
              <span className="font-bold text-brand-600 dark:text-brand-400"> {matchPercentage}% Career Match</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-2xl glass-panel text-center">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-lg justify-center">
                <Flame className="w-5 h-5 fill-amber-500" />
                <span>{currentUser.streakDays} Days</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Study Streak</p>
            </div>

            <div className="px-4 py-3 rounded-2xl glass-panel text-center">
              <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold text-lg justify-center">
                <Clock className="w-5 h-5" />
                <span>{currentUser.weeklyHours} hrs</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Weekly Pace</p>
            </div>

            <button
              onClick={() => setActiveTab('skills')}
              className="px-5 py-3 rounded-2xl font-bold text-xs gradient-brand shadow-lg shadow-brand-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <span>Audit Skill Gaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Career Readiness */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Career Readiness</span>
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 dark:text-white">{matchPercentage}%</p>
              <span className="text-xs text-emerald-600 font-bold">+5% this week</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-600 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Roadmap Progress */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Roadmap Steps</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 dark:text-white">{roadmapCompletionRate}%</p>
              <span className="text-xs text-slate-500 font-medium">{completedSteps} of {totalSteps} done</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${roadmapCompletionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Verified Skills */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Skills</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 dark:text-white">{currentUser.skills.length}</p>
              <span className="text-xs text-slate-500 font-medium">Acquired</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">
              {currentUser.skills.map(s => s.name).slice(0, 3).join(', ')}
            </p>
          </div>
        </div>

        {/* Skills to Improve */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skills to Acquire</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 dark:text-white">{missingSkills.length}</p>
              <span className="text-xs text-amber-600 font-bold">Priority gaps</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">
              {missingSkills.map((m: any) => m.name).slice(0, 2).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Sprint Roadmap + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Learning Milestone & Study Analytics */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Active Milestone Card */}
          {currentActiveStep && (
            <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-5 border-l-4 border-l-brand-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Active Learning Milestone • Step {currentActiveStep.stepNumber} of {totalSteps}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentActiveStep.title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 self-start sm:self-auto">
                  {currentActiveStep.duration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentActiveStep.description}
              </p>

              {/* Milestone Project Brief */}
              {currentActiveStep.project && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Practical Project: {currentActiveStep.project.title}
                    </p>
                    <span className="text-[10px] text-slate-500">Required for Capstone</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentActiveStep.project.description}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => updateStepStatus(currentActiveStep.id, 'COMPLETED')}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold gradient-brand shadow-md shadow-brand-500/20 hover:scale-[1.02] transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Step Completed</span>
                </button>

                <button
                  onClick={() => openAssessment(currentActiveStep.skill)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>Take {currentActiveStep.skill} Quiz</span>
                </button>

                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors ml-auto"
                >
                  View Full Roadmap →
                </button>
              </div>
            </div>
          )}

          {/* Interactive Learning Activity Chart */}
          <div className="glass-card rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-brand-600" />
                  Weekly Learning Velocity
                </h3>
                <p className="text-xs text-slate-500">Daily study hours tracked across learning milestones</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-brand-600 dark:text-brand-400">19.0 hrs total</span>
                <p className="text-[10px] text-emerald-500 font-bold">+18% vs past week</p>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStudyData}>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="h" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#1e293b', 
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {weeklyStudyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 5 ? '#a855f7' : '#3b82f6'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Recommended Courses & Upcoming Activities */}
        <div className="space-y-8">
          {/* Recommended Courses Card */}
          <div className="glass-card rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                Recommended Courses
              </h3>
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">AI Curated</span>
            </div>

            <div className="space-y-3">
              {recommendedCourses.map((c, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-brand-500/50 transition-colors group space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">
                      {c.name}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold shrink-0">
                      {c.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{c.provider}</span>
                    <a
                      href={c.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>Start Learning</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Activities */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Upcoming Learning Activities
            </h3>

            <div className="space-y-2.5">
              {upcomingActivities.map(act => (
                <div 
                  key={act.id}
                  onClick={act.action}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {act.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {act.type} • Due {act.dueDate}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges Mini Grid */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Unlocked Badges
              </h3>
              <button 
                onClick={() => setActiveTab('progress')}
                className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-center space-y-1">
                <div className="w-8 h-8 mx-auto rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold">
                  🚀
                </div>
                <p className="text-xs font-bold text-purple-900 dark:text-purple-200">First Milestone</p>
                <p className="text-[9px] text-purple-600 dark:text-purple-400">Completed 1+ steps</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-center space-y-1">
                <div className="w-8 h-8 mx-auto rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                  🔥
                </div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">Consistency</p>
                <p className="text-[9px] text-amber-600 dark:text-amber-400">8 Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
