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
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
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
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.5 },
  ];

  // Recommended courses from active step and missing skills
  const recommendedCourses = (currentActiveStep?.courses || []).concat(
    (agentData?.recommendedCourses || []).slice(0, 3)
  ).slice(0, 4);

  // Upcoming activities
  const upcomingActivities = [
    {
      id: 'act-1',
      title: `${currentActiveStep?.skill || 'Core Tech'} Practice Quiz`,
      type: 'Assessment',
      dueDate: 'Tomorrow',
      action: () => openAssessment(currentActiveStep?.skill || 'Core Tech')
    },
    {
      id: 'act-2',
      title: `Build Milestone Project: ${currentActiveStep?.project?.title || 'System Portfolio'}`,
      type: 'Project Deliverable',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Welcome Heading & Quick Stats */}
      <div className="panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="badge-neutral font-mono">
              Target: {currentCareer.title}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              • {currentUser.education}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Your 4 AI agents calibrated your learning progress. You are pacing at{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {matchPercentage}% Career Readiness
            </span>{' '}
            against live technology hiring benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-center">
            <div className="flex items-center justify-center gap-1.5 text-base font-bold text-neutral-900 dark:text-white">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{currentUser.streakDays} Days</span>
            </div>
            <p className="text-[10px] font-mono text-neutral-400">Streak</p>
          </div>

          <div className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-center">
            <div className="flex items-center justify-center gap-1.5 text-base font-bold text-neutral-900 dark:text-white">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>{currentUser.weeklyHours}h</span>
            </div>
            <p className="text-[10px] font-mono text-neutral-400">Pace / wk</p>
          </div>

          <button
            onClick={() => setActiveTab('skills')}
            className="btn-primary"
          >
            <span>Audit Skill Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Clean Metric & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-medium">
            <span>Career Readiness</span>
            <Target className="w-4 h-4 text-neutral-400" />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">
                {matchPercentage}%
              </span>
              <span className="badge-success text-[10px]">
                +5% this week
              </span>
            </div>
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-neutral-900 dark:bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-medium">
            <span>Roadmap Completion</span>
            <TrendingUp className="w-4 h-4 text-neutral-400" />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">
                {roadmapCompletionRate}%
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {completedSteps}/{totalSteps} steps
              </span>
            </div>
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-neutral-900 dark:bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${roadmapCompletionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-medium">
            <span>Acquired Skills</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">
                {currentUser.skills.length}
              </span>
              <span className="badge-neutral text-[10px]">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 truncate">
              {currentUser.skills.map(s => s.name).slice(0, 3).join(', ')}
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-medium">
            <span>Priority Gaps</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">
                {missingSkills.length}
              </span>
              <span className="badge-warning text-[10px]">
                To Acquire
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 truncate">
              {missingSkills.map((m: any) => m.name).slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

      </div>

      {/* Main Grid: Active Sprint Roadmap + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Learning Milestone & Study Analytics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Milestone Card */}
          {currentActiveStep && (
            <div className="panel rounded-2xl p-6 space-y-4 border-l-4 border-l-neutral-900 dark:border-l-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                    Active Milestone • Step {currentActiveStep.stepNumber} of {totalSteps}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {currentActiveStep.title}
                  </h3>
                </div>
                <span className="badge-neutral text-xs">
                  {currentActiveStep.duration}
                </span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {currentActiveStep.description}
              </p>

              {/* Milestone Project Brief */}
              {currentActiveStep.project && (
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Project: {currentActiveStep.project.title}</span>
                    </p>
                    <span className="text-[10px] font-mono text-neutral-400">Proof-of-work</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {currentActiveStep.project.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => updateStepStatus(currentActiveStep.id, 'COMPLETED')}
                  className="btn-primary"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Step Completed</span>
                </button>

                <button
                  onClick={() => openAssessment(currentActiveStep.skill)}
                  className="btn-secondary"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Take {currentActiveStep.skill} Quiz</span>
                </button>

                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="btn-ghost ml-auto text-xs"
                >
                  View Interactive Roadmap →
                </button>
              </div>
            </div>
          )}

          {/* Learning Activity Velocity Chart */}
          <div className="panel rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-neutral-500" />
                  <span>Weekly Study Velocity</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">Hours logged across learning milestones</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">19.0h total</span>
                <p className="text-[10px] text-emerald-600 font-medium">+18% this week</p>
              </div>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStudyData}>
                  <XAxis dataKey="day" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} unit="h" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#171717', 
                      borderColor: '#262626', 
                      borderRadius: '8px',
                      color: '#EDEDED',
                      fontSize: '11px'
                    }} 
                  />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                    {weeklyStudyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 5 ? '#171717' : '#737373'} 
                        className="dark:fill-white"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Curated Courses & Upcoming Activities */}
        <div className="space-y-6">
          
          {/* Recommended Modules */}
          <div className="panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-neutral-500" />
                <span>Recommended Modules</span>
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">Curated</span>
            </div>

            <div className="space-y-2.5">
              {recommendedCourses.map((course, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-neutral-900 dark:text-white truncate group-hover:underline">
                      {course.name}
                    </p>
                    <p className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {course.provider} • {course.duration}
                    </p>
                  </div>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white shrink-0"
                    title="Open course in new tab"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Activities & Deliverables */}
          <div className="panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span>Next Scheduled Actions</span>
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">Automated</span>
            </div>

            <div className="space-y-2.5">
              {upcomingActivities.map(act => (
                <div
                  key={act.id}
                  onClick={act.action}
                  className="p-3 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-600 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                      {act.type} • {act.dueDate}
                    </span>
                    <p className="text-xs font-medium text-neutral-900 dark:text-white mt-0.5">
                      {act.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
