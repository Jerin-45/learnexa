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
  BarChart2,
  Check
} from 'lucide-react';
import { Career } from '../../types';

export const CareerMatching: React.FC = () => {
  const { 
    currentUser, 
    careers, 
    currentCareer, 
    setCareerGoal, 
    setActiveTab, 
    addSkill,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="badge-neutral font-mono">
            Benchmark • Market Calibration Matrix
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Career Matching & Market Requirements
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Compare your current proficiencies against live technology hiring rubrics across industry roles.
        </p>
      </div>

      {/* Target Career Quick Switch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {careers.map(career => {
          const isSelected = career.id === currentUser.careerGoal;
          const { matchPct } = calculateCareerStats(career);

          return (
            <div
              key={career.id}
              onClick={() => setCareerGoal(career.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-900 shadow-sm'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-[#121212]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    {career.category.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold">
                      Target
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                  {career.title}
                </h4>
              </div>

              <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 mt-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 text-[11px]">Match:</span>
                  <span className={`font-bold ${
                    matchPct >= 70 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : matchPct >= 40 
                      ? 'text-neutral-800 dark:text-neutral-200' 
                      : 'text-amber-500'
                  }`}>
                    {matchPct}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Comparison for Currently Selected Career */}
      <div className="panel rounded-2xl p-6 sm:p-8 space-y-8">
        
        {/* Banner Details */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-100 dark:border-neutral-800 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                {currentCareer.title}
              </h2>
              <span className="badge-neutral text-xs">
                {currentCareer.difficulty}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {currentCareer.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center min-w-[120px]">
              <p className="text-[10px] font-mono text-neutral-400">Avg Compensation</p>
              <p className="text-xs font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                {currentCareer.avgSalary}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center min-w-[120px]">
              <p className="text-[10px] font-mono text-neutral-400">Market Demand</p>
              <p className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                {currentCareer.growthRate}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="btn-primary"
            >
              <span>Build Roadmap for {currentCareer.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Requirements Comparison Matrix */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-neutral-500" />
              <span>Required Competencies Breakdown ({activeStats.matched.length} Matched / {activeStats.missing.length} Missing)</span>
            </h3>
            <span className="badge-neutral font-mono text-xs">
              Overall Readiness: {activeStats.matchPct}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Matched Skills */}
            <div className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Acquired & Verified ({activeStats.matched.length})</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-normal">Verified</span>
              </div>

              {activeStats.matched.length > 0 ? (
                <div className="space-y-2">
                  {activeStats.matched.map((req, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-[#121212] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white">{req.name}</p>
                        <p className="text-[10px] text-neutral-400">Target level: {req.importance}</p>
                      </div>
                      <span className="badge-success text-[10px] py-0">
                        Acquired
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 italic py-2">
                  No overlapping skills recorded yet. Complete onboarding or add skills.
                </p>
              )}
            </div>

            {/* Column 2: Missing Roadblocks */}
            <div className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Missing Requirements ({activeStats.missing.length})</span>
                </span>
                <span className="text-[10px] font-mono text-amber-500 font-normal">Priority</span>
              </div>

              {activeStats.missing.length > 0 ? (
                <div className="space-y-2">
                  {activeStats.missing.map((req, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-[#121212] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white">{req.name}</p>
                        <p className="text-[10px] text-neutral-400">Importance: {req.importance}</p>
                      </div>
                      <button
                        onClick={() => {
                          addSkill({
                            name: req.name,
                            level: 'Beginner',
                            years: 0.5,
                            verified: false
                          });
                        }}
                        className="btn-secondary px-2.5 py-1 text-[11px]"
                      >
                        Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-600 font-medium py-2">
                  🎉 Congratulations! You meet 100% of benchmark criteria for this role.
                </p>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
