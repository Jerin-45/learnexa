import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Target, 
  Layers, 
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';
import { Career } from '../../types';

export const CareerMatching: React.FC = () => {
  const { 
    currentUser, 
    careers, 
    currentCareer, 
    setCareerGoal, 
    setActiveTab, 
    agentData 
  } = useApp();

  const userSkillNames = new Set(currentUser.skills.map(s => s.name.toLowerCase()));

  // Calculate matching stats for any career
  const calculateCareerStats = (career: Career) => {
    const matched = career.requiredSkills.filter(req => 
      Array.from(userSkillNames).some(us => 
        us.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(us)
      )
    );
    const missing = career.requiredSkills.filter(req => 
      !Array.from(userSkillNames).some(us => 
        us.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(us)
      )
    );
    const matchPct = Math.round((matched.length / career.requiredSkills.length) * 100);
    return { matched, missing, matchPct };
  };

  const activeStats = calculateCareerStats(currentCareer);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Industry Alignment Matrix</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Career Matching & Market Requirements
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Compare your current skills against live industry requirements for leading technology roles.
        </p>
      </div>

      {/* Target Career Quick Switch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {careers.map(career => {
          const isSelected = career.id === currentUser.careerGoal;
          const { matchPct } = calculateCareerStats(career);

          return (
            <div
              key={career.id}
              onClick={() => setCareerGoal(career.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-50/90 dark:bg-brand-950/70 border-brand-500 shadow-md ring-2 ring-brand-500/30'
                  : 'glass-card hover:border-brand-500/50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {career.category.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-brand-600 text-white">
                      Active
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {career.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Match:</span>
                  <span className={`font-black ${matchPct >= 70 ? 'text-emerald-500' : matchPct >= 40 ? 'text-brand-500' : 'text-amber-500'}`}>
                    {matchPct}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Comparison for Currently Selected Career */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8">
        {/* Banner Details */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentCareer.title}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                {currentCareer.difficulty}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentCareer.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-center min-w-[120px]">
              <p className="text-xs text-slate-400">Avg Compensation</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {currentCareer.avgSalary}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-center min-w-[120px]">
              <p className="text-xs text-slate-400">Job Growth</p>
              <p className="text-sm font-bold text-emerald-500 mt-0.5">
                {currentCareer.growthRate}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-6 py-3.5 rounded-2xl font-bold text-xs gradient-brand shadow-lg shadow-brand-500/25 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <span>Build Roadmap for {currentCareer.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Requirements Comparison Matrix */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600" />
              Required Competencies Breakdown ({activeStats.matched.length} Matched / {activeStats.missing.length} Missing)
            </h3>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
              Overall Match: {activeStats.matchPct}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1: Matched Skills */}
            <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Acquired & Matched ({activeStats.matched.length})
                </span>
                <span>Verified</span>
              </div>

              {activeStats.matched.length > 0 ? (
                <div className="space-y-2">
                  {activeStats.matched.map((req, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/50 dark:border-emerald-900/40 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{req.name}</p>
                        <p className="text-[10px] text-slate-500">{req.category} • Required: {req.minLevel}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Match ✓
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic py-4 text-center">
                  No direct skills matched yet. Add your skills to calculate alignment.
                </p>
              )}
            </div>

            {/* Column 2: Missing Skills */}
            <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Skill Gaps to Close ({activeStats.missing.length})
                </span>
                <span>Needs Action</span>
              </div>

              <div className="space-y-2">
                {activeStats.missing.map((req, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{req.name}</p>
                      <p className="text-[10px] text-slate-500">{req.category} • Target: {req.minLevel}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      req.importance === 'Essential' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {req.importance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guidance Recommendation */}
        <div className="p-4 rounded-2xl gradient-brand-subtle border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Career Guidance Agent Assessment
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {agentData?.careerMatch?.guidanceNote || 
                `Closing the ${activeStats.missing.length} missing skill gaps will elevate your employability for ${currentCareer.title} above top candidate percentiles.`
              }
            </p>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 rounded-xl text-xs font-bold gradient-brand shrink-0 hover:scale-105 transition-all"
          >
            Launch Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
