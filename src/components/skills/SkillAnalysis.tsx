import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Wand2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Layers, 
  Zap, 
  Cpu, 
  FileText, 
  FolderGit2, 
  ArrowRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { ProficiencyLevel } from '../../types';

export const SkillAnalysis: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    addSkill, 
    removeSkill, 
    runCollaboration, 
    isAnalyzing, 
    agentData, 
    setActiveTab, 
    openAssessment 
  } = useApp();

  // Input states for adding new skill
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>('Intermediate');
  const [newSkillYears, setNewSkillYears] = useState(1);

  // Suggested popular skills chips
  const popularSkills = [
    "JavaScript", "TypeScript", "React.js", "Node.js", "Python", 
    "SQL / PostgreSQL", "Docker", "Git & GitHub", "Tailwind CSS", "REST APIs", 
    "Figma", "AWS", "PyTorch", "Linux"
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      level: newSkillLevel,
      years: Number(newSkillYears),
      verified: false
    });
    setNewSkillName('');
  };

  const handleQuickAdd = (skillName: string) => {
    addSkill({
      name: skillName,
      level: 'Intermediate',
      years: 1,
      verified: false
    });
  };

  const matchPercentage = agentData?.careerMatch?.matchPercentage ?? 65;
  const gapPercentage = agentData?.careerMatch?.gapPercentage ?? (100 - matchPercentage);
  const matchedSkills = agentData?.careerMatch?.matchedSkills ?? [];
  const missingSkills = agentData?.careerMatch?.missingSkills ?? [];
  const strengths = agentData?.skillAnalysis?.strengths ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Autonomous Skill Diagnostic</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Skill Analysis & Gap Engine
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Audit your skills against benchmark requirements for <span className="font-bold text-brand-600 dark:text-brand-400">{currentCareer.title}</span>.
          </p>
        </div>

        <button
          onClick={() => runCollaboration()}
          disabled={isAnalyzing}
          className="px-6 py-3 rounded-2xl font-bold text-xs gradient-brand shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all flex items-center gap-2.5 self-start md:self-auto disabled:opacity-60"
        >
          {isAnalyzing ? (
            <>
              <Wand2 className="w-4 h-4 animate-spin text-white" />
              <span>Agents Auditing Skills...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Run Live AI Skill Analysis</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gap Percentage Meter */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skill Gap Diagnostic
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {gapPercentage}%
              </span>
              <span className="text-xs font-bold text-amber-500">Uncovered Gaps</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              You possess {matchPercentage}% of core skills required to be job-ready.
            </p>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
            <div 
              className="bg-brand-500 h-full transition-all duration-500"
              style={{ width: `${matchPercentage}%` }}
              title={`Matched: ${matchPercentage}%`}
            />
            <div 
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${gapPercentage}%` }}
              title={`Missing: ${gapPercentage}%`}
            />
          </div>
        </div>

        {/* Core Strengths */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Verified Strengths
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {currentUser.skills.length}
          </p>
          <p className="text-xs text-slate-500">
            Validated working proficiencies in modern web standards and development tools.
          </p>
        </div>

        {/* Priority Missing Skills */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Critical Skill Gaps
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {missingSkills.length}
          </p>
          <p className="text-xs text-slate-500">
            Required technologies blocking full qualification for {currentCareer.title}.
          </p>
        </div>
      </div>

      {/* Main Section: Skill Intake Form + Current vs Missing Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols): Add New Skills & Profile Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-600" />
              Add Skill to Your Profile
            </h3>

            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Skill / Technology Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. React.js, Docker, Python..."
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Proficiency
                  </label>
                  <select
                    value={newSkillLevel}
                    onChange={e => setNewSkillLevel(e.target.value as ProficiencyLevel)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Experience
                  </label>
                  <select
                    value={newSkillYears}
                    onChange={e => setNewSkillYears(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value={0.5}>&lt; 1 Year</option>
                    <option value={1}>1-2 Years</option>
                    <option value={3}>3+ Years</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs gradient-brand shadow-md shadow-brand-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill & Recalculate</span>
              </button>
            </form>

            {/* Quick Add Suggestions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Popular Quick Adds
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularSkills.map(s => {
                  const alreadyHas = currentUser.skills.some(cs => cs.name.toLowerCase() === s.toLowerCase());
                  if (alreadyHas) return null;
                  return (
                    <button
                      key={s}
                      onClick={() => handleQuickAdd(s)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950 text-slate-700 dark:text-slate-300 hover:text-brand-600 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-slate-400" />
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education & Projects Card */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-600" />
              Declared Projects & Background
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Education: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.education}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Experience Level: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.experienceLevel}</span>
              </div>
              <div className="space-y-1.5 pt-1">
                <span className="text-slate-400 font-medium">Portfolio Projects:</span>
                {currentUser.projects.map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Current Skills vs Missing Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Skills in Profile */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Your Current Verified Skills ({currentUser.skills.length})
              </h3>
              <span className="text-xs text-slate-400">Click quiz badge to verify level</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.skills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {skill.name}
                      </p>
                      {skill.verified && (
                        <span className="text-[10px] text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">{skill.level}</span>
                      <span>• {skill.years || 1} yrs exp</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openAssessment(skill.name)}
                      className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-950 transition-colors"
                      title={`Take ${skill.name} Assessment`}
                    >
                      <Award className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeSkill(skill.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Remove Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills & Recommendations */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Missing Skills for {currentCareer.title}
                </h3>
                <p className="text-xs text-slate-500">High priority competencies to reach 100% job match</p>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>View Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {missingSkills.map((req: any, idx: number) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {req.name}
                      </p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.importance === 'Essential' 
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {req.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Category: {req.category} • Min Target: {req.minLevel || 'Intermediate'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
                  >
                    View Curriculum
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Improvement Insights */}
          <div className="glass-card rounded-3xl p-6 space-y-3 bg-gradient-to-br from-purple-500/5 to-brand-500/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Skill Analysis Agent Diagnosis
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {agentData?.skillAnalysis?.summary || 
                `Based on your current baseline in ${currentUser.skills.map(s => s.name).join(', ')}, you possess solid web foundations. Mastering component state architecture in React and asynchronous backend I/O in Node.js will close 80% of your remaining skill gaps.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
