import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitFork, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Lock, 
  Play, 
  Sparkles, 
  Download, 
  Layers, 
  Check,
  Code2
} from 'lucide-react';
import { RoadmapStep } from '../../types';

export const RoadmapView: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    activeRoadmap, 
    updateStepStatus, 
    openAssessment,
    showNotification
  } = useApp();

  const [expandedStepId, setExpandedStepId] = useState<string | null>(activeRoadmap[0]?.id || null);

  const toggleExpand = (stepId: string) => {
    setExpandedStepId(prev => (prev === stepId ? null : stepId));
  };

  const completedCount = activeRoadmap.filter(s => s.status === 'COMPLETED').length;
  const totalCount = activeRoadmap.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleExportRoadmap = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      student: currentUser.name,
      careerGoal: currentCareer.title,
      generatedAt: new Date().toISOString(),
      overallProgress: `${progressPct}%`,
      milestones: activeRoadmap
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Learnexa_${currentCareer.id}_Roadmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Roadmap exported successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 mb-2">
            <GitFork className="w-3.5 h-3.5" />
            <span>AI Dynamic Curriculum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personalized Learning Roadmap
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tailored 7-stage learning journey to master <span className="font-bold text-brand-600 dark:text-brand-400">{currentCareer.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportRoadmap}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Plan</span>
          </button>
        </div>
      </div>

      {/* Overall Progress Progress Bar Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Roadmap Progress Overview
            </span>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {completedCount} of {totalCount} Milestones Completed ({progressPct}%)
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 self-start sm:self-auto">
            {progressPct >= 100 ? '🎓 Job Ready' : 'In Sprint Progression'}
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step by Step Roadmap Timeline */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-7 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:hidden sm:before:block">
        {activeRoadmap.map((step, idx) => {
          const isExpanded = expandedStepId === step.id;
          const isCompleted = step.status === 'COMPLETED';
          const isInProgress = step.status === 'IN_PROGRESS';
          const isNextUp = step.status === 'NEXT_UP';

          return (
            <div 
              key={step.id} 
              className={`relative sm:pl-16 transition-all duration-200`}
            >
              {/* Timeline Indicator Dot */}
              <div className="hidden sm:flex absolute left-4 top-6 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white dark:border-slate-950 items-center justify-center z-10 shadow-sm">
                {isCompleted ? (
                  <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : isInProgress ? (
                  <div className="w-full h-full rounded-full bg-brand-600 animate-pulse flex items-center justify-center text-white">
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-300 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                    {step.stepNumber}
                  </div>
                )}
              </div>

              {/* Main Step Card */}
              <div className={`glass-card rounded-2xl transition-all ${
                isCompleted 
                  ? 'border-emerald-300 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10' 
                  : isInProgress
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                  : ''
              }`}>
                {/* Header Row */}
                <div 
                  onClick={() => toggleExpand(step.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="sm:hidden px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      Step {step.stepNumber}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Completed ✓
                          </span>
                        )}
                        {isInProgress && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 animate-pulse">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        Target Skill: <span className="font-semibold text-slate-700 dark:text-slate-300">{step.skill}</span> • Est. Duration: {step.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {isExpanded ? 'Collapse' : 'Details'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-6 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Section 1: Recommended Courses */}
                    {step.courses && step.courses.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                          Recommended Free & Accredited Courses
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.courses.map((course, cIdx) => (
                            <div 
                              key={cIdx}
                              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs"
                            >
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{course.name}</p>
                                <p className="text-[11px] text-slate-500">{course.provider} • {course.duration}</p>
                              </div>
                              <a
                                href={course.url || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/80 transition-colors"
                                title="Open Course"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 2: Tutorials */}
                    {step.tutorials && step.tutorials.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Code2 className="w-4 h-4 text-brand-600" />
                          Deep Dive Tutorials & Documentation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.tutorials.map((tut, tIdx) => (
                            <span 
                              key={tIdx}
                              className="px-3 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              • {tut}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 3: Practical Hands-On Project */}
                    {step.project && (
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50/70 to-purple-50/70 dark:from-slate-800/80 dark:to-purple-950/20 border border-brand-200/80 dark:border-brand-900/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-amber-500" />
                            Milestone Portfolio Deliverable: {step.project.title}
                          </span>
                          <span className="text-[10px] text-slate-500">Proof of Work</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {step.project.description}
                        </p>
                        {step.project.techStack && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {step.project.techStack.map((tech, techIdx) => (
                              <span 
                                key={techIdx}
                                className="px-2 py-0.5 rounded text-[10px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step Action Controls */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => updateStepStatus(step.id, isCompleted ? 'IN_PROGRESS' : 'COMPLETED')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isCompleted
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                            : 'gradient-brand text-white shadow-md shadow-brand-500/20 hover:scale-[1.02]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isCompleted ? 'Mark as Incomplete' : 'Mark Milestone Completed'}</span>
                      </button>

                      <button
                        onClick={() => openAssessment(step.skill)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold border border-purple-200 dark:border-purple-800/80 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-purple-700 dark:text-purple-300 transition-colors flex items-center gap-1.5"
                      >
                        <Award className="w-4 h-4" />
                        <span>Test Out with {step.skill} Quiz</span>
                      </button>

                      {!isCompleted && !isInProgress && (
                        <button
                          onClick={() => updateStepStatus(step.id, 'IN_PROGRESS')}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          Set as Current Focus
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
